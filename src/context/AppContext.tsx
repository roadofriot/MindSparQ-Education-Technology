import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, InstructorProfile, InstructionalPost, StudentInquiry, User, UserRole, Language, DailyPhotoSlide, PostComment, HomeContentConfig, TeacherLoginRequest, ReadingHistoryItem } from '../types';
import { initialCourses, initialInquiries, initialInstructors, initialPosts, initialDailyPhotos, initialHomeConfig, initialTeacherRequests, initialUsers } from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentRole: UserRole;
  switchRole: (role: UserRole, targetUser?: User) => void;
  currentUser: User | null;
  loginWithGoogle: (roleOrUser?: UserRole | User, instructorId?: string) => void;
  logout: () => void;
  instructors: InstructorProfile[];
  courses: Course[];
  posts: InstructionalPost[];
  dailyPhotos: DailyPhotoSlide[];
  inquiries: StudentInquiry[];
  homeConfig: HomeContentConfig;
  teacherRequests: TeacherLoginRequest[];
  users: User[];
  activeVideoUrl: string | null;
  setActiveVideoUrl: (url: string | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isVisualEditMode: boolean;
  setIsVisualEditMode: (enabled: boolean) => void;

  // Member Activity & Engagement State
  bookmarks: string[]; // List of bookmarked course/post IDs
  toggleBookmark: (id: string, title?: string, type?: 'course' | 'post') => void;
  readingHistory: ReadingHistoryItem[];
  recordReadingHistory: (item: { id: string; title: string; type: 'course' | 'post' }) => void;
  likedCourseIds: string[];
  toggleLikeCourse: (courseId: string) => void;
  subscribedInstructors: string[];
  toggleSubscribeInstructor: (instructorId: string) => void;
  
  // Actions
  updateHomeConfig: (newConfig: Partial<HomeContentConfig>) => void;
  addPost: (postData: Omit<InstructionalPost, 'id' | 'createdAt' | 'likes' | 'commentsCount'>) => void;
  updatePost: (postId: string, updatedPost: Partial<InstructionalPost>) => void;
  likePost: (postId: string) => void;
  deletePost: (postId: string) => void;
  addCommentToPost: (postId: string, text: string) => void;
  deleteCommentFromPost: (postId: string, commentId: string) => void;
  addDailyPhoto: (photoData: Omit<DailyPhotoSlide, 'id'>) => void;
  deleteDailyPhoto: (photoId: string) => void;
  addCourse: (courseData: Omit<Course, 'id' | 'createdAt'>) => void;
  updateCourse: (courseId: string, updatedCourse: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  updateInstructorProfile: (instructorId: string, updatedData: Partial<InstructorProfile>) => void;
  addInstructor: (instructorData: Omit<InstructorProfile, 'id' | 'joinedDate'>) => void;
  submitInquiry: (inquiryData: Omit<StudentInquiry, 'id' | 'status' | 'createdAt'>) => void;
  updateInquiryStatus: (id: string, status: StudentInquiry['status']) => void;
  
  // User & Role Management
  updateUserRole: (userId: string, newRole: UserRole) => void;
  deleteUser: (userId: string) => void;
  addUser: (userData: Omit<User, 'id'>) => void;

  // Teacher Requests Approval Actions
  submitTeacherLoginRequest: (reqData: Omit<TeacherLoginRequest, 'id' | 'status' | 'requestedAt'>) => void;
  approveTeacherRequest: (requestId: string) => void;
  rejectTeacherRequest: (requestId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'mindsparq_app_state_v3';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  // User Auth State
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem(`${LOCAL_STORAGE_KEY}_role`);
    return (savedRole as UserRole) || 'guest';
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user`);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isVisualEditMode, setIsVisualEditMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_visual_edit`);
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_visual_edit`, JSON.stringify(isVisualEditMode));
  }, [isVisualEditMode]);

  // Sync Auth with localStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_role`, currentRole);
    if (currentUser) {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_user`);
    }
  }, [currentRole, currentUser]);

  // Supabase Auth session listener & automatic session restoration on app load / OAuth redirect
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    // Listen for auth state changes (e.g. Google OAuth redirect finish)
    const { data: authSubscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const sbUser = session.user;
        const assignedRole: UserRole = (sbUser.user_metadata?.role as UserRole) || (sbUser.email?.includes('admin') ? 'admin' : 'student');
        const activeUser: User = {
          id: sbUser.id,
          name: sbUser.user_metadata?.full_name || sbUser.user_metadata?.name || sbUser.email?.split('@')[0] || 'Authenticated User',
          email: sbUser.email || 'user@supabase.io',
          avatar: sbUser.user_metadata?.avatar_url || sbUser.user_metadata?.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
          role: assignedRole
        };
        setCurrentUser(activeUser);
        setCurrentRole(assignedRole);
      }
    });

    // Restore active session on initial page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const sbUser = session.user;
        const assignedRole: UserRole = (sbUser.user_metadata?.role as UserRole) || (sbUser.email?.includes('admin') ? 'admin' : 'student');
        const activeUser: User = {
          id: sbUser.id,
          name: sbUser.user_metadata?.full_name || sbUser.user_metadata?.name || sbUser.email?.split('@')[0] || 'Authenticated User',
          email: sbUser.email || 'user@supabase.io',
          avatar: sbUser.user_metadata?.avatar_url || sbUser.user_metadata?.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
          role: assignedRole
        };
        setCurrentUser(activeUser);
        setCurrentRole(assignedRole);
      }
    });

    return () => {
      authSubscription.subscription.unsubscribe();
    };
  }, []);

  // Home Config State
  const [homeConfig, setHomeConfig] = useState<HomeContentConfig>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_home`);
    return saved ? JSON.parse(saved) : initialHomeConfig;
  });

  // Teacher Login Requests State
  const [teacherRequests, setTeacherRequests] = useState<TeacherLoginRequest[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_teacher_reqs`);
    return saved ? JSON.parse(saved) : initialTeacherRequests;
  });

  // Core collections
  const [instructors, setInstructors] = useState<InstructorProfile[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_instructors`);
    return saved ? JSON.parse(saved) : initialInstructors;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_courses`);
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [posts, setPosts] = useState<InstructionalPost[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_posts`);
    return saved ? JSON.parse(saved) : initialPosts;
  });

  const [dailyPhotos, setDailyPhotos] = useState<DailyPhotoSlide[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_photos`);
    return saved ? JSON.parse(saved) : initialDailyPhotos;
  });

  const [inquiries, setInquiries] = useState<StudentInquiry[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_inquiries`);
    return saved ? JSON.parse(saved) : initialInquiries;
  });

  // User Management State
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_users`);
    return saved ? JSON.parse(saved) : initialUsers;
  });

  // Member Engagement State
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_bookmarks`);
    return saved ? JSON.parse(saved) : ['course-1', 'post-1'];
  });

  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_history`);
    return saved ? JSON.parse(saved) : [
      { id: 'course-1', title: 'Full Stack Web Development Masterclass', type: 'course', visitedAt: new Date().toISOString() },
      { id: 'post-1', title: 'Generative AI Roadmap 2026', type: 'post', visitedAt: new Date().toISOString() }
    ];
  });

  const [likedCourseIds, setLikedCourseIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_liked_courses`);
    return saved ? JSON.parse(saved) : ['course-1'];
  });

  const [subscribedInstructors, setSubscribedInstructors] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_subs`);
    return saved ? JSON.parse(saved) : ['inst-1'];
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_users`, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_bookmarks`, JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_history`, JSON.stringify(readingHistory));
  }, [readingHistory]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_liked_courses`, JSON.stringify(likedCourseIds));
  }, [likedCourseIds]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_subs`, JSON.stringify(subscribedInstructors));
  }, [subscribedInstructors]);

  const toggleBookmark = (id: string, title?: string, type: 'course' | 'post' = 'course') => {
    setBookmarks(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        if (title) {
          recordReadingHistory({ id, title, type });
        }
        return [...prev, id];
      }
    });
  };

  const recordReadingHistory = (item: { id: string; title: string; type: 'course' | 'post' }) => {
    setReadingHistory(prev => {
      const filtered = prev.filter(h => h.id !== item.id);
      return [{ ...item, visitedAt: new Date().toISOString() }, ...filtered].slice(0, 20);
    });
  };

  const toggleLikeCourse = (courseId: string) => {
    setLikedCourseIds(prev =>
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  };

  const toggleSubscribeInstructor = (instructorId: string) => {
    setSubscribedInstructors(prev =>
      prev.includes(instructorId) ? prev.filter(id => id !== instructorId) : [...prev, instructorId]
    );
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => (u.id === userId ? { ...u, role: newRole } : u)));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, role: newRole } : null);
      setCurrentRole(newRole);
    }
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [...prev, newUser]);
  };

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_home`, JSON.stringify(homeConfig));
  }, [homeConfig]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_teacher_reqs`, JSON.stringify(teacherRequests));
  }, [teacherRequests]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_instructors`, JSON.stringify(instructors));
  }, [instructors]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_courses`, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_posts`, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_photos`, JSON.stringify(dailyPhotos));
  }, [dailyPhotos]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_inquiries`, JSON.stringify(inquiries));
  }, [inquiries]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const updateHomeConfig = (newConfig: Partial<HomeContentConfig>) => {
    setHomeConfig(prev => ({ ...prev, ...newConfig }));
  };

  const switchRole = (role: UserRole, targetUser?: User) => {
    setCurrentRole(role);
    if (targetUser) {
      setCurrentUser(targetUser);
      return;
    }

    if (role === 'guest') {
      setCurrentUser(null);
    } else if (role === 'admin') {
      setCurrentUser({
        id: 'user-admin',
        name: 'MindSparQ System Admin',
        email: 'roadofriot@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        role: 'admin'
      });
    } else if (role === 'instructor') {
      const defaultInst = instructors[0];
      setCurrentUser({
        id: `user-${defaultInst.id}`,
        name: defaultInst.name,
        email: defaultInst.email,
        avatar: defaultInst.avatar,
        role: 'instructor',
        instructorProfileId: defaultInst.id
      });
    } else if (role === 'student') {
      setCurrentUser({
        id: 'user-student-1',
        name: 'Aanand Sharma',
        email: 'aanand.sharma@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
        role: 'student'
      });
    }
  };

  const loginWithGoogle = async (roleOrUser: UserRole | User = 'instructor', instructorId?: string) => {
    let newUser: User;

    if (typeof roleOrUser === 'object' && roleOrUser !== null) {
      newUser = roleOrUser;
      setCurrentUser(newUser);
      setCurrentRole(newUser.role);
      setIsAuthModalOpen(false);
      return;
    }

    const role = roleOrUser as UserRole;
    if (role === 'admin') {
      newUser = {
        id: `user-google-${Date.now()}`,
        name: 'MindSparQ Admin (Google Auth)',
        email: 'roadofriot@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        role: 'admin'
      };
    } else if (role === 'guest' || role === 'student') {
      newUser = {
        id: `user-google-guest-${Date.now()}`,
        name: role === 'guest' ? 'Guest Explorer (Google Auth)' : 'Student Learner (Google Auth)',
        email: role === 'guest' ? 'guest.explorer@gmail.com' : 'roadofriot@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
        role: role
      };
    } else {
      let targetInst = instructors.find(i => i.id === instructorId) || instructors[0];
      newUser = {
        id: `user-google-${Date.now()}`,
        name: targetInst.name,
        email: targetInst.email,
        avatar: targetInst.avatar,
        role: 'instructor',
        instructorProfileId: targetInst.id
      };
    }

    setCurrentUser(newUser);
    setCurrentRole(role);
    setIsAuthModalOpen(false);
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase signOut notice:', err);
      }
    }
    setCurrentUser(null);
    setCurrentRole('guest');
  };

  const addPost = (postData: Omit<InstructionalPost, 'id' | 'createdAt' | 'likes' | 'commentsCount'>) => {
    const newPost: InstructionalPost = {
      ...postData,
      id: `post-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      likes: 0,
      likedByMe: false,
      commentsCount: 0,
      comments: []
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const likePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const liked = !p.likedByMe;
          return {
            ...p,
            likedByMe: liked,
            likes: liked ? p.likes + 1 : Math.max(0, p.likes - 1)
          };
        }
        return p;
      })
    );
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const addCommentToPost = (postId: string, text: string) => {
    if (!text.trim()) return;
    const authorName = currentUser?.name || 'Community Member';
    const authorAvatar = currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80';
    const authorRole = currentUser?.role || 'guest';

    const newComment: PostComment = {
      id: `comm-${Date.now()}`,
      postId,
      authorName,
      authorAvatar,
      authorRole,
      text: text.trim(),
      createdAt: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })
    };

    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const existingComments = p.comments || [];
          const updated = [...existingComments, newComment];
          return {
            ...p,
            comments: updated,
            commentsCount: updated.length
          };
        }
        return p;
      })
    );
  };

  const deleteCommentFromPost = (postId: string, commentId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const existingComments = p.comments || [];
          const updated = existingComments.filter(c => c.id !== commentId);
          return {
            ...p,
            comments: updated,
            commentsCount: updated.length
          };
        }
        return p;
      })
    );
  };

  const addDailyPhoto = (photoData: Omit<DailyPhotoSlide, 'id'>) => {
    const newPhoto: DailyPhotoSlide = {
      ...photoData,
      id: `photo-${Date.now()}`
    };
    setDailyPhotos(prev => [newPhoto, ...prev]);
  };

  const deleteDailyPhoto = (photoId: string) => {
    setDailyPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const addCourse = (courseData: Omit<Course, 'id' | 'createdAt'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCourses(prev => [newCourse, ...prev]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const updateInstructorProfile = (instructorId: string, updatedData: Partial<InstructorProfile>) => {
    setInstructors(prev =>
      prev.map(inst => (inst.id === instructorId ? { ...inst, ...updatedData } : inst))
    );
    if (currentUser?.instructorProfileId === instructorId) {
      setCurrentUser(prev => prev ? {
        ...prev,
        name: updatedData.name || prev.name,
        avatar: updatedData.avatar || prev.avatar,
        email: updatedData.email || prev.email
      } : null);
    }
  };

  const addInstructor = (instructorData: Omit<InstructorProfile, 'id' | 'joinedDate'>) => {
    const newInst: InstructorProfile = {
      ...instructorData,
      id: `inst-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setInstructors(prev => [...prev, newInst]);
  };

  const submitInquiry = (inquiryData: Omit<StudentInquiry, 'id' | 'status' | 'createdAt'>) => {
    const newInquiry: StudentInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: StudentInquiry['status']) => {
    setInquiries(prev =>
      prev.map(inq => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const updatePost = (postId: string, updatedPost: Partial<InstructionalPost>) => {
    setPosts(prev => prev.map(p => (p.id === postId ? { ...p, ...updatedPost } : p)));
  };

  const updateCourse = (courseId: string, updatedCourse: Partial<Course>) => {
    setCourses(prev => prev.map(c => (c.id === courseId ? { ...c, ...updatedCourse } : c)));
  };

  const submitTeacherLoginRequest = (reqData: Omit<TeacherLoginRequest, 'id' | 'status' | 'requestedAt'>) => {
    const newReq: TeacherLoginRequest = {
      ...reqData,
      id: `req-${Date.now()}`,
      status: 'pending',
      requestedAt: new Date().toISOString().split('T')[0]
    };
    setTeacherRequests(prev => [newReq, ...prev]);
  };

  const approveTeacherRequest = (requestId: string) => {
    const req = teacherRequests.find(r => r.id === requestId);
    if (!req) return;

    // Mark request as approved
    setTeacherRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status: 'approved' } : r))
    );

    // Automatically register as verified instructor if not already present
    const existingInst = instructors.find(i => i.email.toLowerCase() === req.email.toLowerCase());
    let newInstId = existingInst?.id;

    if (!existingInst) {
      newInstId = `inst-${Date.now()}`;
      const newInstProfile: InstructorProfile = {
        id: newInstId,
        name: req.name,
        email: req.email,
        avatar: req.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        designation: req.designation || 'Teacher / Instructor',
        bio: req.bio || 'Verified MindSparQ Instructor',
        qualifications: ['Approved MindSparQ Instructor'],
        expertise: ['Tech Instruction', 'STEM Pedagogy'],
        rating: 5.0,
        totalStudents: 0,
        totalCourses: 0,
        social: {},
        isVerified: true,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      setInstructors(prev => [...prev, newInstProfile]);
    } else {
      setInstructors(prev =>
        prev.map(i => (i.id === existingInst.id ? { ...i, isVerified: true } : i))
      );
    }
  };

  const rejectTeacherRequest = (requestId: string) => {
    setTeacherRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status: 'rejected' } : r))
    );
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currentRole,
        switchRole,
        currentUser,
        loginWithGoogle,
        logout,
        instructors,
        courses,
        posts,
        dailyPhotos,
        inquiries,
        homeConfig,
        teacherRequests,
        users,
        activeVideoUrl,
        setActiveVideoUrl,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isVisualEditMode,
        setIsVisualEditMode,
        bookmarks,
        toggleBookmark,
        readingHistory,
        recordReadingHistory,
        likedCourseIds,
        toggleLikeCourse,
        subscribedInstructors,
        toggleSubscribeInstructor,
        updateHomeConfig,
        addPost,
        updatePost,
        likePost,
        deletePost,
        addCommentToPost,
        deleteCommentFromPost,
        addDailyPhoto,
        deleteDailyPhoto,
        addCourse,
        updateCourse,
        deleteCourse,
        updateInstructorProfile,
        addInstructor,
        submitInquiry,
        updateInquiryStatus,
        updateUserRole,
        deleteUser,
        addUser,
        submitTeacherLoginRequest,
        approveTeacherRequest,
        rejectTeacherRequest
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  };
  return context;
};

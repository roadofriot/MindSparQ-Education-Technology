import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, InstructorProfile, InstructionalPost, StudentInquiry, User, UserRole, Language } from '../types';
import { initialCourses, initialInquiries, initialInstructors, initialPosts } from '../data/initialData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  currentUser: User | null;
  loginWithGoogle: (role?: UserRole, instructorId?: string) => void;
  logout: () => void;
  instructors: InstructorProfile[];
  courses: Course[];
  posts: InstructionalPost[];
  inquiries: StudentInquiry[];
  activeVideoUrl: string | null;
  setActiveVideoUrl: (url: string | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isGuideModalOpen: boolean;
  setIsGuideModalOpen: (open: boolean) => void;
  
  // Actions
  addPost: (postData: Omit<InstructionalPost, 'id' | 'createdAt' | 'likes' | 'commentsCount'>) => void;
  likePost: (postId: string) => void;
  deletePost: (postId: string) => void;
  addCourse: (courseData: Omit<Course, 'id' | 'createdAt'>) => void;
  deleteCourse: (courseId: string) => void;
  updateInstructorProfile: (instructorId: string, updatedData: Partial<InstructorProfile>) => void;
  addInstructor: (instructorData: Omit<InstructorProfile, 'id' | 'joinedDate'>) => void;
  submitInquiry: (inquiryData: Omit<StudentInquiry, 'id' | 'status' | 'createdAt'>) => void;
  updateInquiryStatus: (id: string, status: StudentInquiry['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'mindspack_app_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('np');
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

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

  const [inquiries, setInquiries] = useState<StudentInquiry[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_inquiries`);
    return saved ? JSON.parse(saved) : initialInquiries;
  });

  // Sync with localStorage
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
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_inquiries`, JSON.stringify(inquiries));
  }, [inquiries]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'guest') {
      setCurrentUser(null);
    } else if (role === 'admin') {
      setCurrentUser({
        id: 'user-admin',
        name: 'Mindspack Administrator',
        email: 'admin@mindspack.edu.np',
        avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&auto=format&fit=crop&q=80',
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

  const loginWithGoogle = (role: UserRole = 'instructor', instructorId?: string) => {
    let targetInst = instructors.find(i => i.id === instructorId) || instructors[0];
    const newUser: User = {
      id: `user-google-${Date.now()}`,
      name: role === 'admin' ? 'Mindspack Admin (Google Auth)' : targetInst.name,
      email: role === 'admin' ? 'roadofriot@gmail.com' : targetInst.email,
      avatar: role === 'admin' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' : targetInst.avatar,
      role: role,
      instructorProfileId: role === 'instructor' ? targetInst.id : undefined
    };

    setCurrentUser(newUser);
    setCurrentRole(role);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
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
      commentsCount: 0
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
    // Also update logged in user if applicable
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
        inquiries,
        activeVideoUrl,
        setActiveVideoUrl,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isGuideModalOpen,
        setIsGuideModalOpen,
        addPost,
        likePost,
        deletePost,
        addCourse,
        deleteCourse,
        updateInstructorProfile,
        addInstructor,
        submitInquiry,
        updateInquiryStatus
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

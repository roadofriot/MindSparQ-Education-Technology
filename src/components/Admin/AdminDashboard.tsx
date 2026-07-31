import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, InstructionalPost, InstructorProfile } from '../../types';
import { supabase, isSupabaseConfigured } from '../../utils/supabaseClient';
import { GoogleDriveEmbedModal } from '../Common/GoogleDriveEmbedModal';
import { AnalyticsView } from './CMS/AnalyticsView';
import { PageEditor } from './CMS/PageEditor';
import { MediaLibrary } from './CMS/MediaLibrary';
import { StudentManager } from './CMS/StudentManager';
import { FormsInbox } from './CMS/FormsInbox';
import { SettingsView } from './CMS/SettingsView';
import { AiAssistantModal } from './CMS/AiAssistantModal';
import { 
  ShieldCheck, 
  PlusCircle, 
  Users, 
  BookOpen, 
  MessageSquare, 
  CheckCircle, 
  Radio, 
  Trash2, 
  Video, 
  Send, 
  Activity, 
  Layers, 
  ShieldAlert,
  UserPlus,
  HelpCircle,
  Eye,
  Edit,
  Sparkles,
  Home,
  HardDrive,
  Clock,
  X,
  Save,
  Image as ImageIcon,
  Check,
  UserCheck,
  Folder,
  Globe,
  Settings,
  GraduationCap
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    instructors, 
    addInstructor, 
    updateInstructorProfile,
    courses, 
    addCourse,
    updateCourse,
    deleteCourse,
    posts, 
    addPost, 
    updatePost,
    deletePost, 
    inquiries, 
    updateInquiryStatus,
    homeConfig,
    updateHomeConfig,
    teacherRequests,
    approveTeacherRequest,
    rejectTeacherRequest,
    dailyPhotos,
    addDailyPhoto,
    deleteDailyPhoto,
    users,
    updateUserRole,
    deleteUser,
    addUser,
    language
  } = useApp();

  const isNp = language === 'np';

  // Active CMS Navigation Tab
  const [activeTab, setActiveTab] = useState<
    'analytics' | 'pages' | 'media' | 'students' | 'inquiries' | 'settings' | 'broadcast' | 'teacher_requests' | 'roles' | 'courses' | 'home_editor'
  >('analytics');

  // Role Management State
  const [userRoleFilter, setUserRoleFilter] = useState<string>('all');
  const [userSearchTerm, setUserSearchTerm] = useState<string>('');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'instructor' | 'student'>('student');

  // AI Content Assistant Modal
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Google Drive Modal state
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [targetDriveField, setTargetDriveField] = useState<'broadcast_video' | 'post_edit_drive' | 'course_preview' | 'home_video' | null>(null);

  // Broadcast Form State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastTitleNp, setBroadcastTitleNp] = useState('');
  const [broadcastContent, setBroadcastContent] = useState('');
  const [broadcastType, setBroadcastType] = useState<'announcement' | 'video' | 'photo' | 'resource'>('announcement');
  const [broadcastCategory, setBroadcastCategory] = useState('Official Notice');
  const [broadcastMediaUrl, setBroadcastMediaUrl] = useState('');
  const [broadcastVideoUrl, setBroadcastVideoUrl] = useState('');
  const [broadcastDriveUrl, setBroadcastDriveUrl] = useState('');
  const [broadcastTags, setBroadcastTags] = useState('Mindspack, Official, Notice');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Home Config Form State
  const [homeForm, setHomeForm] = useState(homeConfig);
  const [homeSaveSuccess, setHomeSaveSuccess] = useState(false);

  // Daily Photo Slide Form State
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCategory, setPhotoCategory] = useState<'Hackathon' | 'Workshop' | 'Classroom' | 'Guest Lecture' | 'Lab Session' | 'Event'>('Classroom');

  // Edit Course Modal State
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseForm, setCourseForm] = useState<Partial<Course>>({});

  // Edit Post Modal State
  const [editingPost, setEditingPost] = useState<InstructionalPost | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postForm, setPostForm] = useState<Partial<InstructionalPost>>({});

  // New Instructor Form State
  const [isAddingInstructor, setIsAddingInstructor] = useState(false);
  const [instName, setInstName] = useState('');
  const [instNameNp, setInstNameNp] = useState('');
  const [instEmail, setInstEmail] = useState('');
  const [instDesignation, setInstDesignation] = useState('');
  const [instBio, setInstBio] = useState('');
  const [instExpertise, setInstExpertise] = useState('React, TypeScript, Node.js');
  const [instAvatar, setInstAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80');

  const pendingRequests = teacherRequests.filter(r => r.status === 'pending');

  // Open Drive Modal with target callback setter
  const openDriveHelper = (target: 'broadcast_video' | 'post_edit_drive' | 'course_preview' | 'home_video') => {
    setTargetDriveField(target);
    setIsDriveModalOpen(true);
  };

  const handleDriveUrlSelected = (embedUrl: string) => {
    if (targetDriveField === 'broadcast_video') {
      setBroadcastVideoUrl(embedUrl);
      setBroadcastDriveUrl(embedUrl);
    } else if (targetDriveField === 'home_video') {
      setHomeForm(prev => ({ ...prev, featuredVideoUrl: embedUrl }));
    } else if (targetDriveField === 'course_preview') {
      setCourseForm(prev => ({ ...prev, previewVideoUrl: embedUrl, driveUrl: embedUrl }));
    } else if (targetDriveField === 'post_edit_drive') {
      setPostForm(prev => ({ ...prev, driveUrl: embedUrl, videoEmbedUrl: embedUrl }));
    }
  };

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastContent) return;

    const newPostData = {
      authorId: 'admin-1',
      authorName: 'Mindspack Admin Team',
      authorAvatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&auto=format&fit=crop&q=80',
      authorRole: 'admin' as const,
      title: broadcastTitle,
      titleNp: broadcastTitleNp || broadcastTitle,
      content: broadcastContent,
      contentNp: broadcastContent,
      type: broadcastType,
      mediaUrl: broadcastMediaUrl || (broadcastType === 'announcement' ? 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80' : undefined),
      videoEmbedUrl: broadcastVideoUrl || (broadcastType === 'video' ? 'https://www.youtube.com/embed/mU6anWqZJcc' : undefined),
      driveUrl: broadcastDriveUrl || undefined,
      category: broadcastCategory,
      tags: broadcastTags.split(',').map(t => t.trim()).filter(Boolean)
    };

    addPost(newPostData);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('posts').insert([newPostData]);
      } catch (err) {
        console.warn('Supabase post insert notice:', err);
      }
    }

    setBroadcastSuccess(true);
    setBroadcastTitle('');
    setBroadcastTitleNp('');
    setBroadcastContent('');
    setBroadcastMediaUrl('');
    setBroadcastVideoUrl('');
    setBroadcastDriveUrl('');
    setTimeout(() => setBroadcastSuccess(false), 4000);
  };

  const handleSaveHomeConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    updateHomeConfig(homeForm);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('home_config').upsert([{ id: 1, ...homeForm }]);
      } catch (err) {
        console.warn('Supabase home_config upsert notice:', err);
      }
    }

    setHomeSaveSuccess(true);
    setTimeout(() => setHomeSaveSuccess(false), 3000);
  };

  const handleAddDailyPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoTitle || !photoUrl) return;

    addDailyPhoto({
      title: photoTitle,
      caption: photoCaption || photoTitle,
      imageUrl: photoUrl,
      date: new Date().toISOString().split('T')[0],
      category: photoCategory,
      authorName: 'MindSparQ Admin'
    });

    setPhotoTitle('');
    setPhotoCaption('');
    setPhotoUrl('');
  };

  const handleAddInstructor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instName || !instEmail) return;

    addInstructor({
      name: instName,
      nameNp: instNameNp || instName,
      email: instEmail,
      avatar: instAvatar,
      designation: instDesignation,
      designationNp: instDesignation,
      bio: instBio,
      bioNp: instBio,
      qualifications: ['Certified Mindspack Instructor', 'Tech Specialist'],
      expertise: instExpertise.split(',').map(s => s.trim()),
      rating: 5.0,
      totalStudents: 0,
      totalCourses: 0,
      social: {},
      isVerified: true
    });

    setIsAddingInstructor(false);
    setInstName('');
    setInstNameNp('');
    setInstEmail('');
    setInstDesignation('');
    setInstBio('');
  };

  // Course Editing
  const handleOpenCourseModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setCourseForm(course);
    } else {
      setEditingCourse(null);
      setCourseForm({
        title: '',
        titleNp: '',
        description: '',
        category: 'Software Engineering',
        instructorId: instructors[0]?.id || 'inst-1',
        instructorName: instructors[0]?.name || 'MindSparQ Faculty',
        instructorAvatar: instructors[0]?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        level: 'Intermediate',
        duration: '8 Weeks',
        lessonsCount: 16,
        rating: 4.9,
        reviewsCount: 12,
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
        previewVideoUrl: 'https://www.youtube.com/embed/mU6anWqZJcc',
        price: 12000,
        modules: [
          { id: 'm1', title: 'Module 1: Foundations & Core Architecture', duration: '2 Weeks' }
        ]
      });
    }
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title) return;

    if (editingCourse) {
      updateCourse(editingCourse.id, courseForm);
      if (isSupabaseConfigured()) {
        try {
          await supabase.from('courses').update(courseForm).eq('id', editingCourse.id);
        } catch (err) {
          console.warn('Supabase course update notice:', err);
        }
      }
    } else {
      addCourse(courseForm as Omit<Course, 'id' | 'createdAt'>);
      if (isSupabaseConfigured()) {
        try {
          await supabase.from('courses').insert([courseForm]);
        } catch (err) {
          console.warn('Supabase course insert notice:', err);
        }
      }
    }
    setIsCourseModalOpen(false);
  };

  // Post Editing
  const handleOpenPostModal = (post: InstructionalPost) => {
    setEditingPost(post);
    setPostForm(post);
    setIsPostModalOpen(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !postForm.title) return;
    updatePost(editingPost.id, postForm);
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('posts').update(postForm).eq('id', editingPost.id);
      } catch (err) {
        console.warn('Supabase post update notice:', err);
      }
    }
    setIsPostModalOpen(false);
  };

  return (
    <div className="py-8 bg-slate-50 text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Admin Header Banner */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-black text-slate-900 tracking-tight">MINDSPARQ ENTERPRISE ADMIN CMS</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold">
                    PRODUCTION V4.0
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Supabase Real-Time Auth & Persistence: Active</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {isNp 
                    ? 'सम्पूर्ण वेबसाइट पृष्ठहरू, मिडिया लाइब्रेरी, विद्यार्थी रेकर्ड, एआई मद्दत र सेक्युरिटी व्यवस्थापन प्यानल' 
                    : 'Complete Control Panel: Manage Website Pages, Media Library, Students, Inquiries & AI Generation'}
                </p>
              </div>
            </div>

            {/* Header Right Action Bar */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white font-bold rounded-2xl text-xs shadow-md transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>{isNp ? 'एआई सामग्री सहायक' : 'AI Content Assistant'}</span>
              </button>

              <button
                onClick={() => openDriveHelper('home_video')}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-bold transition-all flex items-center space-x-1.5"
              >
                <HardDrive className="w-4 h-4 text-indigo-600" />
                <span>Drive Helper</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enterprise CMS Primary Toolbar Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-200">
          {[
            { id: 'analytics', label: 'Analytics & System Health', icon: Activity },
            { id: 'pages', label: 'Website Pages CMS', icon: Globe },
            { id: 'media', label: 'Media Library & Drive', icon: Folder },
            { id: 'roles', label: `Role Management (${users.length})`, icon: ShieldCheck },
            { id: 'teacher_requests', label: `Teacher Approvals (${pendingRequests.length})`, icon: Clock },
            { id: 'students', label: 'Students & Certificates', icon: GraduationCap },
            { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: MessageSquare },
            { id: 'broadcast', label: 'Direct Broadcast Feed', icon: Radio },
            { id: 'courses', label: 'Courses & Feed Directory', icon: BookOpen },
            { id: 'home_editor', label: 'Home Page Editor', icon: Home },
            { id: 'settings', label: 'Settings & Security', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.id === 'teacher_requests' && pendingRequests.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* TAB SWITCHING RENDERERS */}

        {/* 1. ANALYTICS & HEALTH */}
        {activeTab === 'analytics' && <AnalyticsView />}

        {/* 2. PAGES CMS */}
        {activeTab === 'pages' && <PageEditor />}

        {/* 3. MEDIA LIBRARY & DRIVE */}
        {activeTab === 'media' && <MediaLibrary />}

        {/* 4. STUDENTS & CERTIFICATES */}
        {activeTab === 'students' && <StudentManager />}

        {/* 5. INQUIRIES & FORMS INBOX */}
        {activeTab === 'inquiries' && <FormsInbox />}

        {/* 6. SETTINGS & SECURITY */}
        {activeTab === 'settings' && <SettingsView />}

        {/* 7. DIRECT BROADCAST */}
        {activeTab === 'broadcast' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Radio className="w-5 h-5 text-indigo-600 animate-pulse" />
                  <h2 className="text-lg font-bold text-slate-900">{isNp ? 'प्रत्यक्ष सूचना तथा भिडियो प्रसारण' : 'Direct Public Post Panel'}</h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isNp
                    ? 'एडमिनले यहाँबाट राखिएका कुनै पनि निर्देशन, भिडियो, फोटो वा सूचनाहरू सिधै सार्वजनिक फिडमा तत्काल पोस्ट हुनेछन्।'
                    : 'Admin tool to broadcast instructional materials, media, announcements directly to the public website.'}
                </p>
              </div>

              {broadcastSuccess && (
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{isNp ? 'सार्वजनिक रूपमा पोस्ट भयो!' : 'Live Broadcast Published!'}</span>
                </span>
              )}
            </div>

            <form onSubmit={handleBroadcast} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Broadcast Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    placeholder="e.g., Summer 2026 Batch Orientation Schedule"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">शीर्षक (नेपाली)</label>
                  <input
                    type="text"
                    value={broadcastTitleNp}
                    onChange={(e) => setBroadcastTitleNp(e.target.value)}
                    placeholder="उदा: नयाँ ब्याच ओरिएन्टेसन तालिका"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Content Format</label>
                  <select
                    value={broadcastType}
                    onChange={(e) => setBroadcastType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                  >
                    <option value="announcement">Official Announcement</option>
                    <option value="video">Instructional Video</option>
                    <option value="photo">Photo Gallery</option>
                    <option value="resource">Resource / Google Drive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={broadcastCategory}
                    onChange={(e) => setBroadcastCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tags</label>
                  <input
                    type="text"
                    value={broadcastTags}
                    onChange={(e) => setBroadcastTags(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                  />
                </div>
              </div>

              {/* Video / Google Drive Link Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">Video Embed / Google Drive Video URL</label>
                    <button
                      type="button"
                      onClick={() => openDriveHelper('broadcast_video')}
                      className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center space-x-1"
                    >
                      <HardDrive className="w-3 h-3" />
                      <span>{isNp ? 'गूगल ड्राइभ लिङ्क भर्नुहोस्' : 'Google Drive Embed Helper'}</span>
                    </button>
                  </div>
                  <input
                    type="url"
                    value={broadcastVideoUrl}
                    onChange={(e) => setBroadcastVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/embed/... or Google Drive preview link"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Photo / Cover Image URL</label>
                  <input
                    type="url"
                    value={broadcastMediaUrl}
                    onChange={(e) => setBroadcastMediaUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Instructional Content *</label>
                <textarea
                  rows={5}
                  required
                  value={broadcastContent}
                  onChange={(e) => setBroadcastContent(e.target.value)}
                  placeholder="Write clear instructions, announcements, or course updates..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-2"
              >
                <Radio className="w-4 h-4" />
                <span>{isNp ? 'लाइभ वेबसाइटमा तुरुन्त पोस्ट गर्नुहोस्' : 'Broadcast Instantly to Website Feed'}</span>
              </button>
            </form>
          </div>
        )}

        {/* ROLE MANAGEMENT & PERMISSIONS */}
        {activeTab === 'roles' && (
          <div className="space-y-6">
            {/* Header & Actions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-600" />
                    <span>User Role Management & Permissions</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage system users, assign roles (Admin, Teacher/Instructor, Student), and enforce sensitive portal access controls.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingUser(!isAddingUser)}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shrink-0"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{isAddingUser ? 'Cancel' : 'Add New User'}</span>
                </button>
              </div>

              {/* Add User Form */}
              {isAddingUser && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newUserName || !newUserEmail) return;
                    addUser({
                      name: newUserName,
                      email: newUserEmail,
                      role: newUserRole,
                      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80`,
                      isVerified: true,
                      joinedDate: new Date().toISOString().split('T')[0]
                    });
                    setNewUserName('');
                    setNewUserEmail('');
                    setIsAddingUser(false);
                  }}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                >
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Register New Account with Specific Role</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="e.g. Bishal Thapa"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="bishal@example.com"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Assign Role</label>
                      <select
                        value={newUserRole}
                        onChange={(e) => setNewUserRole(e.target.value as any)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-indigo-700"
                      >
                        <option value="student">Student / Member</option>
                        <option value="instructor">Teacher / Instructor</option>
                        <option value="admin">System Admin</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow transition"
                  >
                    Save & Create Account
                  </button>
                </form>
              )}

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <span className="text-xs font-semibold text-slate-600">Filter Role:</span>
                  <select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value)}
                    className="px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold text-slate-700"
                  >
                    <option value="all">All Roles ({users.length})</option>
                    <option value="admin">Admins</option>
                    <option value="instructor">Teachers / Instructors</option>
                    <option value="student">Students / Members</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Search user by name or email..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  className="w-full sm:w-64 px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="p-4">User</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Current Role</th>
                      <th className="p-4">Role Action</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs text-slate-800 font-medium">
                    {users
                      .filter(u => userRoleFilter === 'all' || u.role === userRoleFilter)
                      .filter(u => u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) || u.email.toLowerCase().includes(userSearchTerm.toLowerCase()))
                      .map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50/80 transition">
                          <td className="p-4 flex items-center space-x-3">
                            <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-xl object-cover border border-slate-200" />
                            <div>
                              <div className="font-bold text-slate-900">{u.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">ID: {u.id}</div>
                            </div>
                          </td>
                          <td className="p-4 text-slate-600 font-mono text-[11px]">{u.email}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                              u.role === 'admin'
                                ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                                : u.role === 'instructor'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : 'bg-slate-100 text-slate-800 border-slate-300'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="p-4">
                            <select
                              value={u.role}
                              onChange={(e) => updateUserRole(u.id, e.target.value as any)}
                              className="px-2.5 py-1 bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold text-indigo-700 focus:outline-none"
                            >
                              <option value="student">Student</option>
                              <option value="instructor">Teacher</option>
                              <option value="admin">Admin</option>
                            </select>
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center space-x-1 text-emerald-600 font-bold text-[11px]">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Verified</span>
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete user ${u.name}?`)) {
                                  deleteUser(u.id);
                                }
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                              title="Delete Account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 8. TEACHER APPROVALS */}
        {activeTab === 'teacher_requests' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-amber-500" />
                    <span>{isNp ? 'शिक्षक लगइन स्वीकृति अनुरोधहरू' : 'Teacher Access Approvals Inbox'}</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {isNp
                      ? 'शिक्षकहरूले गुगल लगइन वा अनुरोध फारम मार्फत पठाएका आवेदनहरू स्वीकार गरेपछि शिक्षक इन्स्ट्रक्सन प्यानल स्वतः खुल्छ।'
                      : 'When a teacher requests to log in, the admin accepts it here to unlock their Teacher Instruction Panel.'}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                  {pendingRequests.length} Pending
                </span>
              </div>

              {pendingRequests.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">{isNp ? 'कुनै पनि प्रतिक्षित शिक्षक अनुरोध छैन' : 'No Pending Teacher Requests'}</p>
                  <p className="text-[11px] text-slate-400">All teacher accounts have been verified and granted instruction panel access.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map((req) => (
                    <div key={req.id} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src={req.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
                          alt={req.name}
                          className="w-12 h-12 rounded-xl object-cover border border-amber-300 shrink-0"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-sm text-slate-900">{req.name}</h4>
                            <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-bold">
                              PENDING APPROVAL
                            </span>
                          </div>
                          <p className="text-xs text-indigo-700 font-semibold">{req.designation}</p>
                          <p className="text-xs text-slate-500 font-mono">{req.email} • Requested: {req.requestedAt}</p>
                          <p className="text-xs text-slate-600 italic">"{req.bio}"</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={() => rejectTeacherRequest(req.id)}
                          className="px-4 py-2 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition-all"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => approveTeacherRequest(req.id)}
                          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>{isNp ? 'स्वीकृत गर्नुहोस् (Approve Access)' : 'Approve & Unlock Panel'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Approved Instructors Directory */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <UserCheck className="w-5 h-5 text-indigo-600" />
                  <span>{isNp ? 'स्वीकृत शिक्षक सूची' : 'Verified Teacher Directory'} ({instructors.length})</span>
                </h3>
                <button
                  onClick={() => setIsAddingInstructor(!isAddingInstructor)}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center space-x-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{isNp ? '+ नयाँ शिक्षक थप्नुहोस्' : '+ Add Teacher'}</span>
                </button>
              </div>

              {isAddingInstructor && (
                <form onSubmit={handleAddInstructor} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
                  <h4 className="font-bold text-indigo-700">Add New Verified Instructor</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={instName}
                      onChange={(e) => setInstName(e.target.value)}
                      className="px-3 py-2 bg-white border rounded-lg"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Google Email"
                      value={instEmail}
                      onChange={(e) => setInstEmail(e.target.value)}
                      className="px-3 py-2 bg-white border rounded-lg"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Designation"
                    value={instDesignation}
                    onChange={(e) => setInstDesignation(e.target.value)}
                    className="w-full px-3 py-2 bg-white border rounded-lg"
                  />
                  <div className="flex justify-end space-x-2">
                    <button type="button" onClick={() => setIsAddingInstructor(false)} className="px-3 py-1 bg-slate-200 rounded-lg">Cancel</button>
                    <button type="submit" className="px-4 py-1 bg-indigo-600 text-white font-bold rounded-lg">Save</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {instructors.map((inst) => (
                  <div key={inst.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={inst.avatar} alt={inst.name} className="w-10 h-10 rounded-full object-cover border" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{inst.name}</p>
                        <p className="text-[10px] text-indigo-600 font-medium">{inst.designation}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{inst.email}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">APPROVED</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 9. COURSES & POSTS CONTROL */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{isNp ? 'पाठ्यक्रम तथा फिड सामग्री नियन्त्रण' : 'Courses & Post Stream Editor'}</h2>
              <button
                onClick={() => handleOpenCourseModal()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-1"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isNp ? '+ नयाँ पाठ्यक्रम सिर्जना गर्नुहोस्' : '+ Create New Course'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Manage Courses List */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>{isNp ? 'पाठ्यक्रम सूची (' + courses.length + ')' : 'Course Directory (' + courses.length + ')'}</span>
                </h3>

                <div className="space-y-3">
                  {courses.map((c) => (
                    <div key={c.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={c.thumbnail} alt={c.title} className="w-12 h-10 rounded-lg object-cover border" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{c.title}</h4>
                          <p className="text-[10px] text-slate-500">{c.category} • Instructor: {c.instructorName} • Rs. {c.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleOpenCourseModal(c)}
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                          title="Edit Course"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCourse(c.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-200 rounded-lg"
                          title="Remove Course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Manage Instructional Feed Posts List */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Radio className="w-4 h-4 text-indigo-600" />
                  <span>{isNp ? 'सार्वजनिक फिड पोस्ट सूची (' + posts.length + ')' : 'Published Feed Stream (' + posts.length + ')'}</span>
                </h3>

                <div className="space-y-3">
                  {posts.map((p) => (
                    <div key={p.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{p.title}</h4>
                        <p className="text-[10px] text-slate-500">Author: {p.authorName} • Format: {p.type}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleOpenPostModal(p)}
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                          title="Edit Post"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deletePost(p.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-200 rounded-lg"
                          title="Remove Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 10. HOME PAGE EDITOR */}
        {activeTab === 'home_editor' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <Home className="w-5 h-5 text-indigo-600" />
                    <span>{isNp ? 'गृहपृष्ठ सम्पादन मञ्च (Home Content Customizer)' : 'Modify Home Content & Hero Settings'}</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isNp
                      ? 'गृहपृष्ठको मुख्य शीर्षक, उप-शीर्षक, सूचना ब्यानर, तथ्यांक र भिडियो लिङ्क परिवर्तन गर्नुहोस्।'
                      : 'Customize Hero Headlines, Nepali translations, top announcement bar, stats, and featured orientation video.'}
                  </p>
                </div>

                {homeSaveSuccess && (
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{isNp ? 'गृहपृष्ठ अपडेट भयो!' : 'Home Updated Live!'}</span>
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveHomeConfig} className="space-y-4">
                {/* Hero Headlines */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={homeForm.heroTitleEn}
                      onChange={(e) => setHomeForm({ ...homeForm, heroTitleEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">मुख्य शीर्षक (नेपाली) *</label>
                    <input
                      type="text"
                      required
                      value={homeForm.heroTitleNp}
                      onChange={(e) => setHomeForm({ ...homeForm, heroTitleNp: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                {/* Subtitles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Subtitle (English)</label>
                    <textarea
                      rows={3}
                      value={homeForm.heroSubtitleEn}
                      onChange={(e) => setHomeForm({ ...homeForm, heroSubtitleEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">उप-शीर्षक (नेपाली)</label>
                    <textarea
                      rows={3}
                      value={homeForm.heroSubtitleNp}
                      onChange={(e) => setHomeForm({ ...homeForm, heroSubtitleNp: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                </div>

                {/* Banner Notices */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Top Announcement Bar (English)</label>
                    <input
                      type="text"
                      value={homeForm.bannerNoticeEn}
                      onChange={(e) => setHomeForm({ ...homeForm, bannerNoticeEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">शीर्ष सूचना ब्यानर (नेपाली)</label>
                    <input
                      type="text"
                      value={homeForm.bannerNoticeNp}
                      onChange={(e) => setHomeForm({ ...homeForm, bannerNoticeNp: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Stat: Trained Students</label>
                    <input
                      type="text"
                      value={homeForm.statsStudents}
                      onChange={(e) => setHomeForm({ ...homeForm, statsStudents: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Stat: Verified Instructors</label>
                    <input
                      type="text"
                      value={homeForm.statsInstructors}
                      onChange={(e) => setHomeForm({ ...homeForm, statsInstructors: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Stat: Placement Rate</label>
                    <input
                      type="text"
                      value={homeForm.statsPlacement}
                      onChange={(e) => setHomeForm({ ...homeForm, statsPlacement: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-bold"
                    />
                  </div>
                </div>

                {/* Featured Video */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">Hero Featured Orientation Video (YouTube or Google Drive Embed URL)</label>
                    <button
                      type="button"
                      onClick={() => openDriveHelper('home_video')}
                      className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center space-x-1"
                    >
                      <HardDrive className="w-3 h-3" />
                      <span>{isNp ? 'गूगल ड्राइभ लिङ्क भर्नुहोस्' : 'Google Drive Helper'}</span>
                    </button>
                  </div>
                  <input
                    type="url"
                    value={homeForm.featuredVideoUrl}
                    onChange={(e) => setHomeForm({ ...homeForm, featuredVideoUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isNp ? 'गृहपृष्ठ परिवर्तनहरू सुरक्षित गर्नुहोस्' : 'Save Live Home Settings'}</span>
                </button>
              </form>
            </div>

            {/* Daily Campus Photo Gallery Slide Manager */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-indigo-600" />
                <span>{isNp ? 'दैनिक क्याम्पस फोटो ग्यालरी सम्पादक' : 'Daily Campus Photo Slides Manager'} ({dailyPhotos.length})</span>
              </h3>

              {/* Add New Photo Form */}
              <form onSubmit={handleAddDailyPhoto} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                <h4 className="font-bold text-slate-800">{isNp ? 'नयाँ क्याम्पस फोटो स्लाइड थप्नुहोस्' : 'Add New Daily Campus Photo Slide'}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Photo Title (e.g. AI Hackathon 2026)"
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    className="px-3 py-2 bg-white border rounded-lg"
                  />
                  <input
                    type="url"
                    required
                    placeholder="Image URL (Unsplash or direct link)"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="px-3 py-2 bg-white border rounded-lg font-mono"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Caption..."
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    className="px-3 py-2 bg-white border rounded-lg"
                  />
                  <select
                    value={photoCategory}
                    onChange={(e) => setPhotoCategory(e.target.value as any)}
                    className="px-3 py-2 bg-white border rounded-lg"
                  >
                    <option value="Classroom">Classroom</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Guest Lecture">Guest Lecture</option>
                    <option value="Lab Session">Lab Session</option>
                    <option value="Event">Event</option>
                  </select>
                </div>
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm">
                  + Add Slide
                </button>
              </form>

              {/* Existing Slides Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {dailyPhotos.map((slide) => (
                  <div key={slide.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative group">
                    <img src={slide.imageUrl} alt={slide.title} className="w-full aspect-video rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{slide.title}</h4>
                      <p className="text-[10px] text-slate-500">{slide.category} • {slide.date}</p>
                    </div>
                    <button
                      onClick={() => deleteDailyPhoto(slide.id)}
                      className="absolute top-4 right-4 p-1.5 bg-white/90 text-rose-600 rounded-lg shadow hover:bg-rose-600 hover:text-white transition-all"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* EDIT/CREATE COURSE MODAL */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl text-slate-900 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-900">
                {editingCourse ? 'Edit Course Details' : 'Create New Course'}
              </h3>
              <button onClick={() => setIsCourseModalOpen(false)} className="p-1 rounded-lg bg-slate-100 text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Course Title *</label>
                <input
                  type="text"
                  required
                  value={courseForm.title || ''}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Category</label>
                  <input
                    type="text"
                    value={courseForm.category || ''}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Fee (NPR)</label>
                  <input
                    type="number"
                    value={courseForm.price || 0}
                    onChange={(e) => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Instructor Name</label>
                  <input
                    type="text"
                    value={courseForm.instructorName || ''}
                    onChange={(e) => setCourseForm({ ...courseForm, instructorName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Level</label>
                  <select
                    value={courseForm.level || 'Intermediate'}
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-700">Preview Video / Drive Link</label>
                  <button
                    type="button"
                    onClick={() => openDriveHelper('course_preview')}
                    className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center space-x-1"
                  >
                    <HardDrive className="w-3 h-3" />
                    <span>Drive Helper</span>
                  </button>
                </div>
                <input
                  type="url"
                  value={courseForm.previewVideoUrl || ''}
                  onChange={(e) => setCourseForm({ ...courseForm, previewVideoUrl: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Course Description</label>
                <textarea
                  rows={3}
                  value={courseForm.description || ''}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t">
                <button type="button" onClick={() => setIsCourseModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-md">Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT POST MODAL */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl text-slate-900 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-900">Edit Instructional Post</h3>
              <button onClick={() => setIsPostModalOpen(false)} className="p-1 rounded-lg bg-slate-100 text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Title (English) *</label>
                <input
                  type="text"
                  required
                  value={postForm.title || ''}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Title (Nepali)</label>
                <input
                  type="text"
                  value={postForm.titleNp || ''}
                  onChange={(e) => setPostForm({ ...postForm, titleNp: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-700">Video Embed / Google Drive Link</label>
                  <button
                    type="button"
                    onClick={() => openDriveHelper('post_edit_drive')}
                    className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center space-x-1"
                  >
                    <HardDrive className="w-3 h-3" />
                    <span>Drive Helper</span>
                  </button>
                </div>
                <input
                  type="url"
                  value={postForm.videoEmbedUrl || postForm.driveUrl || ''}
                  onChange={(e) => setPostForm({ ...postForm, videoEmbedUrl: e.target.value, driveUrl: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Instructional Content *</label>
                <textarea
                  rows={4}
                  required
                  value={postForm.content || ''}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t">
                <button type="button" onClick={() => setIsPostModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-md">Update Post</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI CONTENT ASSISTANT MODAL */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* GOOGLE DRIVE EMBED HELPER MODAL */}
      <GoogleDriveEmbedModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        onSelectEmbedUrl={handleDriveUrlSelected}
      />
    </div>
  );
};

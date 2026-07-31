import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InstructorProfile } from '../../types';
import { GoogleDriveEmbedModal } from '../Common/GoogleDriveEmbedModal';
import { 
  UserCheck, 
  Edit3, 
  PlusCircle, 
  Video, 
  Image, 
  BookOpen, 
  Sparkles, 
  Save, 
  Trash2, 
  GraduationCap, 
  TrendingUp, 
  CheckCircle,
  LogIn,
  Eye,
  Heart,
  Tag,
  Share2,
  HardDrive,
  Clock,
  ShieldAlert
} from 'lucide-react';

export const InstructorDashboard: React.FC = () => {
  const { 
    currentUser, 
    instructors, 
    updateInstructorProfile, 
    posts, 
    addPost, 
    deletePost, 
    courses, 
    addCourse, 
    deleteCourse,
    language,
    loginWithGoogle,
    setIsAuthModalOpen,
    setActiveVideoUrl,
    teacherRequests,
    submitTeacherLoginRequest
  } = useApp();

  const isNp = language === 'np';

  // Find current instructor profile or default to first
  const currentInstructor: InstructorProfile | undefined = 
    instructors.find(i => i.id === currentUser?.instructorProfileId) || instructors[0];

  const userTeacherRequest = currentUser?.email
    ? teacherRequests.find(r => r.email.toLowerCase() === currentUser.email?.toLowerCase())
    : undefined;

  const [activeTab, setActiveTab] = useState<'profile' | 'publish' | 'courses' | 'content'>('profile');

  // Google Drive Modal State
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [driveTarget, setDriveTarget] = useState<'post_video' | 'course_video' | null>(null);

  // Profile Edit State
  const [profileForm, setProfileForm] = useState<Partial<InstructorProfile>>({
    name: currentInstructor?.name || '',
    nameNp: currentInstructor?.nameNp || '',
    designation: currentInstructor?.designation || '',
    designationNp: currentInstructor?.designationNp || '',
    bio: currentInstructor?.bio || '',
    bioNp: currentInstructor?.bioNp || '',
    avatar: currentInstructor?.avatar || '',
    expertiseStr: currentInstructor?.expertise?.join(', ') || '',
    qualificationsStr: currentInstructor?.qualifications?.join('\n') || '',
    github: currentInstructor?.social?.github || '',
    linkedin: currentInstructor?.social?.linkedin || '',
    youtube: currentInstructor?.social?.youtube || ''
  });

  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // Post Publish State
  const [postTitle, setPostTitle] = useState('');
  const [postTitleNp, setPostTitleNp] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState<'video' | 'photo' | 'announcement' | 'resource'>('video');
  const [mediaUrl, setMediaUrl] = useState('');
  const [videoEmbedUrl, setVideoEmbedUrl] = useState('');
  const [postCategory, setPostCategory] = useState('AI & Web Tutorial');
  const [postTags, setPostTags] = useState('React, Python, Mindspack');
  const [postPublishSuccess, setPostPublishSuccess] = useState(false);

  // New Course State
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCategory, setCourseCategory] = useState<any>('Software Engineering');
  const [coursePrice, setCoursePrice] = useState('12000');
  const [courseDuration, setCourseDuration] = useState('8 Weeks');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseThumbnail, setCourseThumbnail] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80');
  const [courseVideoPreview, setCourseVideoPreview] = useState('https://www.youtube.com/embed/mU6anWqZJcc');
  const [courseSuccess, setCourseSuccess] = useState(false);

  // Open Drive Helper
  const openDriveHelper = (target: 'post_video' | 'course_video') => {
    setDriveTarget(target);
    setIsDriveModalOpen(true);
  };

  const handleDriveUrlSelect = (embedUrl: string) => {
    if (driveTarget === 'post_video') {
      setVideoEmbedUrl(embedUrl);
    } else if (driveTarget === 'course_video') {
      setCourseVideoPreview(embedUrl);
    }
  };

  // Filter posts belonging to current instructor
  const myPosts = posts.filter(p => p.authorId === currentInstructor?.id || p.authorName === currentInstructor?.name);
  const myCourses = courses.filter(c => c.instructorId === currentInstructor?.id || c.instructorName === currentInstructor?.name);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInstructor) return;

    const updatedData: Partial<InstructorProfile> = {
      name: profileForm.name,
      nameNp: profileForm.nameNp,
      designation: profileForm.designation,
      designationNp: profileForm.designationNp,
      bio: profileForm.bio,
      bioNp: profileForm.bioNp,
      avatar: profileForm.avatar,
      expertise: (profileForm as any).expertiseStr ? (profileForm as any).expertiseStr.split(',').map((s: string) => s.trim()) : currentInstructor.expertise,
      qualifications: (profileForm as any).qualificationsStr ? (profileForm as any).qualificationsStr.split('\n').filter((s: string) => s.trim()) : currentInstructor.qualifications,
      social: {
        github: (profileForm as any).github,
        linkedin: (profileForm as any).linkedin,
        youtube: (profileForm as any).youtube
      }
    };

    updateInstructorProfile(currentInstructor.id, updatedData);
    setProfileSaveSuccess(true);
    setTimeout(() => setProfileSaveSuccess(false), 4000);
  };

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postContent) return;

    addPost({
      authorId: currentInstructor?.id || 'inst-1',
      authorName: currentInstructor?.name || 'Mindspack Instructor',
      authorAvatar: currentInstructor?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      authorRole: 'instructor',
      title: postTitle,
      titleNp: postTitleNp || postTitle,
      content: postContent,
      contentNp: postContent,
      type: postType,
      mediaUrl: mediaUrl || (postType === 'video' ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80' : undefined),
      videoEmbedUrl: videoEmbedUrl || (postType === 'video' ? 'https://www.youtube.com/embed/mU6anWqZJcc' : undefined),
      category: postCategory,
      tags: postTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setPostPublishSuccess(true);
    setPostTitle('');
    setPostTitleNp('');
    setPostContent('');
    setMediaUrl('');
    setVideoEmbedUrl('');
    setTimeout(() => setPostPublishSuccess(false), 4000);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle || !courseDescription) return;

    addCourse({
      title: courseTitle,
      description: courseDescription,
      category: courseCategory,
      instructorId: currentInstructor?.id || 'inst-1',
      instructorName: currentInstructor?.name || 'Mindspack Instructor',
      instructorAvatar: currentInstructor?.avatar || '',
      level: 'Beginner',
      duration: courseDuration,
      lessonsCount: 24,
      rating: 5.0,
      reviewsCount: 1,
      thumbnail: courseThumbnail,
      previewVideoUrl: courseVideoPreview,
      price: Number(coursePrice),
      isFree: false,
      featured: true,
      modules: [
        { id: 'm1', title: 'Module 1: Foundations & Architecture', duration: '2 Weeks' },
        { id: 'm2', title: 'Module 2: Advanced Implementation & Project Build', duration: '6 Weeks' }
      ]
    });

    setCourseSuccess(true);
    setCourseTitle('');
    setCourseDescription('');
    setTimeout(() => setCourseSuccess(false), 4000);
  };

  return (
    <div className="py-10 bg-slate-50 text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner Card with Google Login Status */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={currentInstructor?.avatar}
                alt={currentInstructor?.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1 rounded-full">
                <CheckCircle className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-slate-900">{currentInstructor?.name}</h1>
                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold">
                  TEACHER PANEL
                </span>
              </div>
              <p className="text-xs text-indigo-600 font-medium">{currentInstructor?.designation}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Google Auth: <span className="text-emerald-600 font-mono font-semibold">{currentUser?.email || currentInstructor?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 transition-colors flex items-center space-x-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-600" />
              <span>{isNp ? 'अर्को गुगल खाताबाट साइन-इन' : 'Switch Google Account'}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Nav Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { id: 'profile', label: isNp ? 'प्रोफाइल अद्यावधिक' : 'Edit Profile & Bio', icon: Edit3 },
            { id: 'publish', label: isNp ? 'कन्टेन्ट तथा भिडियो पोस्ट' : 'Publish Media & Posts', icon: PlusCircle },
            { id: 'courses', label: isNp ? 'नयाँ पाठ्यक्रम जोड्नुहोस्' : 'Create Course', icon: BookOpen },
            { id: 'content', label: isNp ? 'मेरा सामग्रीहरू (' + (myPosts.length + myCourses.length) + ')' : 'My Published Content', icon: Video },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: EDIT PROFILE & BIO */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{isNp ? 'गुगल लगइन प्रोफाइल सम्पादन' : 'Update Instructor Profile'}</h2>
                <p className="text-xs text-slate-500">{isNp ? 'यहाँ राखिएका जानकारीहरू सार्वजनिक वेबसाइटमा सिधै देखिनेछन्।' : 'Changes made here reflect immediately on your public instructor card.'}</p>
              </div>
              {profileSaveSuccess && (
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{isNp ? 'प्रोफाइल सेभ भयो!' : 'Saved to Profile!'}</span>
                </span>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">पूरा नाम (नेपाली)</label>
                  <input
                    type="text"
                    value={profileForm.nameNp}
                    onChange={(e) => setProfileForm({ ...profileForm, nameNp: e.target.value })}
                    placeholder="उदा: इन्जिनियर सन्देश शर्मा"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Designation & Role *</label>
                  <input
                    type="text"
                    required
                    value={profileForm.designation}
                    onChange={(e) => setProfileForm({ ...profileForm, designation: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">पद / विशेषज्ञता (नेपाली)</label>
                  <input
                    type="text"
                    value={profileForm.designationNp}
                    onChange={(e) => setProfileForm({ ...profileForm, designationNp: e.target.value })}
                    placeholder="उदा: वरिष्ठ एआई इन्जिनियर"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Profile Photo URL (Avatar)</label>
                <input
                  type="url"
                  value={profileForm.avatar}
                  onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Biography / About Me (English)</label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">आफ्नो बारेमा (नेपाली विवरण)</label>
                <textarea
                  rows={3}
                  value={profileForm.bioNp}
                  onChange={(e) => setProfileForm({ ...profileForm, bioNp: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Key Tech Skills (comma-separated)</label>
                <input
                  type="text"
                  value={(profileForm as any).expertiseStr}
                  onChange={(e) => setProfileForm({ ...profileForm, expertiseStr: e.target.value } as any)}
                  placeholder="Python, PyTorch, React, Node.js, AWS"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Qualifications & Degrees (one per line)</label>
                <textarea
                  rows={3}
                  value={(profileForm as any).qualificationsStr}
                  onChange={(e) => setProfileForm({ ...profileForm, qualificationsStr: e.target.value } as any)}
                  placeholder="M.Sc. Computer Engineering&#10;AWS Certified Architect"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={(profileForm as any).github}
                    onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value } as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={(profileForm as any).linkedin}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value } as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">YouTube Channel URL</label>
                  <input
                    type="url"
                    value={(profileForm as any).youtube}
                    onChange={(e) => setProfileForm({ ...profileForm, youtube: e.target.value } as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isNp ? 'प्रोफाइल अद्यावधिक सेभ गर्नुहोस्' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: PUBLISH MEDIA & POSTS */}
        {activeTab === 'publish' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{isNp ? 'नयाँ इन्स्ट्रक्शनल कन्टेन्ट तथा भिडियो पोस्ट' : 'Publish Video & Lesson Content'}</h2>
                <p className="text-xs text-slate-500">{isNp ? 'यहाँबाट पोस्ट गरिएका सामग्रीहरू सार्वजनिक फिडमा तुरुन्तै देखिनेछन्।' : 'Your posts immediately appear on the public Instructional Feed.'}</p>
              </div>
              {postPublishSuccess && (
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{isNp ? 'सफलतापूर्वक पोस्ट भयो!' : 'Published Successfully!'}</span>
                </span>
              )}
            </div>

            <form onSubmit={handlePublishPost} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Post Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="e.g., Master Gemini API in 10 Minutes"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">शीर्षक (नेपाली)</label>
                  <input
                    type="text"
                    value={postTitleNp}
                    onChange={(e) => setPostTitleNp(e.target.value)}
                    placeholder="उदा: १० मिनेटमा Gemini API सिक्नुहोस्"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Post Format</label>
                  <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                  >
                    <option value="video">Video Tutorial</option>
                    <option value="photo">Photo Gallery / Visual</option>
                    <option value="announcement">Announcement / Notice</option>
                    <option value="resource">Code / Resource Tip</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    placeholder="e.g., AI Tutorial, Web Tips"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hashtags (comma separated)</label>
                  <input
                    type="text"
                    value={postTags}
                    onChange={(e) => setPostTags(e.target.value)}
                    placeholder="React, AI, Mindspack"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 font-mono"
                  />
                </div>
              </div>

              {postType === 'video' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700">YouTube Embed or Google Drive Video URL</label>
                      <button
                        type="button"
                        onClick={() => openDriveHelper('post_video')}
                        className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center space-x-1"
                      >
                        <HardDrive className="w-3 h-3" />
                        <span>Google Drive Helper</span>
                      </button>
                    </div>
                    <input
                      type="url"
                      value={videoEmbedUrl}
                      onChange={(e) => setVideoEmbedUrl(e.target.value)}
                      placeholder="https://www.youtube.com/embed/mU6anWqZJcc or Drive Preview Link"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Thumbnail Cover Image URL</label>
                    <input
                      type="url"
                      value={mediaUrl}
                      onChange={(e) => setMediaUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 font-mono"
                    />
                  </div>
                </div>
              )}

              {postType === 'photo' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Photo Image URL</label>
                  <input
                    type="url"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 font-mono font-mono"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Content Text / Instruction Details *</label>
                <textarea
                  rows={5}
                  required
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Describe your lesson, announcement, or step-by-step instructions..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center space-x-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isNp ? 'सार्वजनिक फिडमा पोस्ट प्रकाशित गर्नुहोस्' : 'Publish Directly to Feed'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: CREATE COURSE */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{isNp ? 'नयाँ पाठ्यक्रम निर्माण' : 'Create New Course'}</h2>
                <p className="text-xs text-slate-500">{isNp ? 'तपाईँको नाममा नयाँ IT कोर्स थप्नुहोस्।' : 'Add a new tech course assigned to your instructor profile.'}</p>
              </div>
              {courseSuccess && (
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{isNp ? 'पाठ्यक्रम जोडियो!' : 'Course Added!'}</span>
                </span>
              )}
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="e.g., Microservices Architecture with Docker & Go"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={courseCategory}
                    onChange={(e) => setCourseCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                  >
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="AI & Data Science">AI & Data Science</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fee (NPR)</label>
                  <input
                    type="number"
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={courseDuration}
                    onChange={(e) => setCourseDuration(e.target.value)}
                    placeholder="8 Weeks (40 Hours)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Course Description *</label>
                <textarea
                  rows={4}
                  required
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  placeholder="Syllabus breakdown, prerequisites, outcomes..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Thumbnail Cover Image URL</label>
                  <input
                    type="url"
                    value={courseThumbnail}
                    onChange={(e) => setCourseThumbnail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">Preview Video / Google Drive Video URL</label>
                    <button
                      type="button"
                      onClick={() => openDriveHelper('course_video')}
                      className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center space-x-1"
                    >
                      <HardDrive className="w-3 h-3" />
                      <span>Drive Helper</span>
                    </button>
                  </div>
                  <input
                    type="url"
                    value={courseVideoPreview}
                    onChange={(e) => setCourseVideoPreview(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                {isNp ? 'पाठ्यक्रम प्रकाशित गर्नुहोस्' : 'Publish Course'}
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: MY PUBLISHED CONTENT */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900">
              {isNp ? 'तपाईँद्वारा प्रकाशित सामग्रीहरू' : 'Your Published Media & Courses'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* My Posts */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-indigo-700 uppercase tracking-wider flex items-center space-x-2">
                  <Video className="w-4 h-4" />
                  <span>{isNp ? 'इन्स्ट्रक्शनल फिड पोस्टहरू' : 'Instructional Posts'} ({myPosts.length})</span>
                </h3>

                {myPosts.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">{isNp ? 'कुनै पोस्ट प्रकाशित भएको छैन' : 'No posts published yet.'}</p>
                ) : (
                  <div className="space-y-3">
                    {myPosts.map((p) => (
                      <div key={p.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{p.title}</h4>
                          <p className="text-[10px] text-slate-500">{p.createdAt} • {p.type}</p>
                        </div>
                        <button
                          onClick={() => deletePost(p.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-200 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* My Courses */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-indigo-700 uppercase tracking-wider flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{isNp ? 'सञ्चालित पाठ्यक्रमहरू' : 'Assigned Courses'} ({myCourses.length})</span>
                </h3>

                {myCourses.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">{isNp ? 'कुनै पाठ्यक्रम जोडिएको छैन' : 'No courses created yet.'}</p>
                ) : (
                  <div className="space-y-3">
                    {myCourses.map((c) => (
                      <div key={c.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{c.title}</h4>
                          <p className="text-[10px] text-slate-500">Rs. {c.price.toLocaleString()} • {c.duration}</p>
                        </div>
                        <button
                          onClick={() => deleteCourse(c.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-200 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Google Drive Embed Helper Modal */}
        <GoogleDriveEmbedModal
          isOpen={isDriveModalOpen}
          onClose={() => setIsDriveModalOpen(false)}
          onSelectEmbedUrl={handleDriveUrlSelect}
        />

      </div>
    </div>
  );
};

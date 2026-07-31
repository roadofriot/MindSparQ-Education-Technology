import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
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
  Sparkles
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    instructors, 
    addInstructor, 
    updateInstructorProfile,
    courses, 
    deleteCourse,
    posts, 
    addPost, 
    deletePost, 
    inquiries, 
    updateInquiryStatus,
    language,
    setIsGuideModalOpen
  } = useApp();

  const isNp = language === 'np';

  const [activeTab, setActiveTab] = useState<'broadcast' | 'instructors' | 'courses' | 'inquiries'>('broadcast');

  // Broadcast Form State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastTitleNp, setBroadcastTitleNp] = useState('');
  const [broadcastContent, setBroadcastContent] = useState('');
  const [broadcastType, setBroadcastType] = useState<'announcement' | 'video' | 'photo' | 'resource'>('announcement');
  const [broadcastCategory, setBroadcastCategory] = useState('Official Notice');
  const [broadcastMediaUrl, setBroadcastMediaUrl] = useState('');
  const [broadcastVideoUrl, setBroadcastVideoUrl] = useState('');
  const [broadcastTags, setBroadcastTags] = useState('Mindspack, Official, Notice');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // New Instructor Form State
  const [isAddingInstructor, setIsAddingInstructor] = useState(false);
  const [instName, setInstName] = useState('');
  const [instNameNp, setInstNameNp] = useState('');
  const [instEmail, setInstEmail] = useState('');
  const [instDesignation, setInstDesignation] = useState('');
  const [instBio, setInstBio] = useState('');
  const [instExpertise, setInstExpertise] = useState('React, TypeScript, Node.js');
  const [instAvatar, setInstAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80');

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastContent) return;

    addPost({
      authorId: 'admin-1',
      authorName: 'Mindspack Admin Team',
      authorAvatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&auto=format&fit=crop&q=80',
      authorRole: 'admin',
      title: broadcastTitle,
      titleNp: broadcastTitleNp || broadcastTitle,
      content: broadcastContent,
      contentNp: broadcastContent,
      type: broadcastType,
      mediaUrl: broadcastMediaUrl || (broadcastType === 'announcement' ? 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80' : undefined),
      videoEmbedUrl: broadcastVideoUrl || (broadcastType === 'video' ? 'https://www.youtube.com/embed/mU6anWqZJcc' : undefined),
      category: broadcastCategory,
      tags: broadcastTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setBroadcastSuccess(true);
    setBroadcastTitle('');
    setBroadcastTitleNp('');
    setBroadcastContent('');
    setBroadcastMediaUrl('');
    setBroadcastVideoUrl('');
    setTimeout(() => setBroadcastSuccess(false), 4000);
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

  return (
    <div className="py-10 bg-slate-50 text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Banner & Metrics */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-black text-slate-900">MINDSPACK POWER WORKING PANEL</h1>
                  <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold">
                    ADMIN SYSTEM
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{isNp ? 'सार्वजनिक प्रसारण, शिक्षक तथा पाठ्यक्रम नियन्त्रण कक्ष' : 'Full Broadcast Control & Instructor Management Center'}</p>
              </div>
            </div>

            <button
              onClick={() => setIsGuideModalOpen(true)}
              className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-2"
            >
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>{isNp ? 'सिस्टम आर्किटेक्चर तथा सेटअप गाइड' : 'System Setup Roadmap'}</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>{isNp ? 'शिक्षक संख्या' : 'Instructors'}</span>
                <Users className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl font-black text-slate-900">{instructors.length}</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>{isNp ? 'पाठ्यक्रमहरू' : 'Active Courses'}</span>
                <BookOpen className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-2xl font-black text-slate-900">{courses.length}</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>{isNp ? 'प्रकाशित पोस्ट' : 'Broadcast Posts'}</span>
                <Radio className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-2xl font-black text-slate-900">{posts.length}</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
                <span>{isNp ? 'प्राप्त आवेदन' : 'Inquiries'}</span>
                <MessageSquare className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-emerald-600">{inquiries.length}</p>
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { id: 'broadcast', label: isNp ? 'पावर वर्किङ प्यानल (Direct Broadcast)' : 'Direct Public Broadcast', icon: Radio },
            { id: 'instructors', label: isNp ? 'शिक्षक/इन्स्ट्रक्टर व्यवस्थापन (' + instructors.length + ')' : 'Instructors Manager', icon: Users },
            { id: 'courses', label: isNp ? 'पाठ्यक्रम तथा फिड नियन्त्रण' : 'Courses & Posts Control', icon: Layers },
            { id: 'inquiries', label: isNp ? 'विद्यार्थी आवेदन पत्र (' + inquiries.length + ')' : 'Student Inquiries Inbox', icon: MessageSquare },
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

        {/* TAB 1: DIRECT PUBLIC BROADCAST (POWER WORKING PANEL) */}
        {activeTab === 'broadcast' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Radio className="w-5 h-5 text-indigo-600 animate-pulse" />
                  <h2 className="text-lg font-bold text-slate-900">{isNp ? 'प्रत्यक्ष सूचना तथा भिडियो प्रसारण (Direct Public Broadcast)' : 'Direct Public Post Panel'}</h2>
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
                    placeholder="e.g., Spring 2026 Batch Orientation Schedule"
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
                    <option value="resource">Resource & Code</option>
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

              {broadcastType === 'video' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">YouTube Embed URL</label>
                    <input
                      type="url"
                      value={broadcastVideoUrl}
                      onChange={(e) => setBroadcastVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/embed/mU6anWqZJcc"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Media / Image Cover URL</label>
                    <input
                      type="url"
                      value={broadcastMediaUrl}
                      onChange={(e) => setBroadcastMediaUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                    />
                  </div>
                </div>
              )}

              {broadcastType !== 'video' && (
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
              )}

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

        {/* TAB 2: INSTRUCTORS MANAGER */}
        {activeTab === 'instructors' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{isNp ? 'शिक्षक तथा इन्स्ट्रक्टर सूची' : 'Mindspack Instructors Directory'}</h2>
              <button
                onClick={() => setIsAddingInstructor(!isAddingInstructor)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                <span>{isNp ? 'नयाँ शिक्षक खाता थप्नुहोस्' : 'Register New Instructor'}</span>
              </button>
            </div>

            {/* Add Instructor Modal / Form */}
            {isAddingInstructor && (
              <form onSubmit={handleAddInstructor} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-indigo-700">{isNp ? 'नयाँ शिक्षक विवरण भर्नुहोस्' : 'Add New Instructor Details'}</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name (English)"
                    value={instName}
                    onChange={(e) => setInstName(e.target.value)}
                    className="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="पूरा नाम (नेपाली)"
                    value={instNameNp}
                    onChange={(e) => setInstNameNp(e.target.value)}
                    className="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    required
                    placeholder="Google Auth Email (e.g. teacher@mindspack.edu.np)"
                    value={instEmail}
                    onChange={(e) => setInstEmail(e.target.value)}
                    className="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="Designation / Role"
                    value={instDesignation}
                    onChange={(e) => setInstDesignation(e.target.value)}
                    className="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Short Bio..."
                  value={instBio}
                  onChange={(e) => setInstBio(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingInstructor(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white rounded-xl shadow-sm"
                  >
                    Save Instructor Profile
                  </button>
                </div>
              </form>
            )}

            {/* Instructor List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructors.map((inst) => (
                <div key={inst.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <img src={inst.avatar} alt={inst.name} className="w-12 h-12 rounded-xl object-cover border border-indigo-100" />
                    <div>
                      <div className="flex items-center space-x-1">
                        <h3 className="text-sm font-bold text-slate-900">{inst.name}</h3>
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-600 fill-current text-white" />
                      </div>
                      <p className="text-[11px] text-indigo-600 font-medium">{inst.designation}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{inst.email}</p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
                    <span>Students: <strong className="text-slate-900">{inst.studentsCount || inst.totalStudents}</strong></span>
                    <span>Verified: <strong className="text-emerald-600">Yes</strong></span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: COURSES & POSTS CONTROL */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Manage Courses */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>{isNp ? 'पाठ्यक्रम नियन्त्रण' : 'Courses Control'} ({courses.length})</span>
              </h3>

              <div className="space-y-3">
                {courses.map((c) => (
                  <div key={c.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{c.title}</h4>
                      <p className="text-[10px] text-slate-500">Instructor: {c.instructorName} • Fee: Rs. {c.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => deleteCourse(c.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-200 rounded-lg"
                      title="Remove Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Manage Posts */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Radio className="w-4 h-4 text-indigo-600" />
                <span>{isNp ? 'फिड पोस्ट नियन्त्रण' : 'Public Feed Stream Control'} ({posts.length})</span>
              </h3>

              <div className="space-y-3">
                {posts.map((p) => (
                  <div key={p.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{p.title}</h4>
                      <p className="text-[10px] text-slate-500">Author: {p.authorName} • {p.type}</p>
                    </div>
                    <button
                      onClick={() => deletePost(p.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-200 rounded-lg"
                      title="Remove Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: STUDENT INQUIRIES INBOX */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <span>{isNp ? 'विद्यार्थी भर्ना आवेदन तथा परामर्श सन्देशहरू' : 'Student Admission Inquiries'}</span>
            </h2>

            {inquiries.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center">{isNp ? 'कुनै पनि नयाँ सन्देश छैन' : 'No student inquiries received yet.'}</p>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                      <div>
                        <span className="text-sm font-bold text-slate-900">{inq.name}</span>
                        <span className="text-xs text-slate-500 ml-2">({inq.phone} • {inq.email})</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        inq.status === 'new' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        Status: {inq.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700">
                      <p className="font-semibold text-indigo-700 mb-1">Course Interested: {inq.courseInterested}</p>
                      <p className="bg-white p-3 rounded-lg border border-slate-200 leading-relaxed text-slate-600">
                        "{inq.message || 'No specific message.'}"
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 pt-1 text-xs">
                      <span className="text-slate-400">{inq.createdAt}</span>
                      <div className="ml-auto flex items-center space-x-2">
                        <button
                          onClick={() => updateInquiryStatus(inq.id, 'contacted')}
                          className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg"
                        >
                          Mark Contacted
                        </button>
                        <button
                          onClick={() => updateInquiryStatus(inq.id, 'enrolled')}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm"
                        >
                          Mark Enrolled
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

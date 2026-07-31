import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Edit3, Search, Trash2, Eye, Save, Sparkles, X, Check, BookOpen, Layers, Image, MessageSquare, AlertTriangle, ArrowUpRight } from 'lucide-react';

export const VisualEditorToolbar: React.FC = () => {
  const { 
    isVisualEditMode, 
    setIsVisualEditMode, 
    currentRole, 
    homeConfig, 
    updateHomeConfig, 
    courses, 
    posts, 
    dailyPhotos,
    language
  } = useApp();

  const isNp = language === 'np';
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickEditOpen, setIsQuickEditOpen] = useState(false);
  const [activeQuickTab, setActiveQuickTab] = useState<'hero' | 'about' | 'courses' | 'feed' | 'photos'>('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Local draft states for quick editor modal
  const [heroForm, setHeroForm] = useState({
    heroTitleEn: homeConfig.heroTitleEn,
    heroTitleNp: homeConfig.heroTitleNp,
    heroSubtitleEn: homeConfig.heroSubtitleEn,
    heroSubtitleNp: homeConfig.heroSubtitleNp,
    bannerNoticeEn: homeConfig.bannerNoticeEn,
    bannerNoticeNp: homeConfig.bannerNoticeNp,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // The edit feature is ONLY available to administrators
  if (currentRole !== 'admin') {
    return null;
  }

  // Handle live search matching
  const searchResults = searchTerm.trim() === '' ? [] : [
    ...(homeConfig.heroTitleEn.toLowerCase().includes(searchTerm.toLowerCase()) || homeConfig.heroTitleNp.toLowerCase().includes(searchTerm.toLowerCase())
      ? [{ id: 'hero-title', section: 'Hero Headline', text: homeConfig.heroTitleEn, selector: '#hero-section' }] : []),
    ...(homeConfig.heroSubtitleEn.toLowerCase().includes(searchTerm.toLowerCase())
      ? [{ id: 'hero-sub', section: 'Hero Subtitle', text: homeConfig.heroSubtitleEn, selector: '#hero-section' }] : []),
    ...courses.filter(c => c.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) || c.titleNp?.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(c => ({ id: `course-${c.id}`, section: 'Course Directory', text: c.titleEn, selector: `#course-card-${c.id}` })),
    ...posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(p => ({ id: `post-${p.id}`, section: 'Instructional Post', text: p.title, selector: `#post-card-${p.id}` })),
    ...dailyPhotos.filter(dp => dp.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(dp => ({ id: `photo-${dp.id}`, section: 'Campus Photo Gallery', text: dp.title, selector: `#photo-card-${dp.id}` })),
  ];

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomeConfig(heroForm);
    showToast(isNp ? 'वेबसाइटको मुख्य पृष्ठ सफलतापूर्वक अद्यावधिक गरियो!' : 'Homepage section updated successfully!');
    setIsQuickEditOpen(false);
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-indigo-500/30 text-xs font-bold flex items-center space-x-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Visual Editor Dock Bar */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 bg-slate-900/95 backdrop-blur-md text-white p-2 sm:p-2.5 rounded-2xl shadow-2xl border border-slate-700/80 transition-all">
        
        {/* Toggle Button */}
        <button
          onClick={() => {
            const nextState = !isVisualEditMode;
            setIsVisualEditMode(nextState);
            showToast(nextState ? 'On-Site Direct Edit Mode: ACTIVATED' : 'On-Site Direct Edit Mode: OFF');
          }}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
            isVisualEditMode 
              ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg ring-2 ring-indigo-400/50' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Edit3 className={`w-4 h-4 ${isVisualEditMode ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">
            {isVisualEditMode ? 'Visual Editor: ON' : 'Visual Editor: OFF'}
          </span>
        </button>

        {isVisualEditMode && (
          <>
            <div className="h-5 w-px bg-slate-700 mx-1" />

            {/* Quick Find Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all"
              title="Search and Jump to any section text on page"
            >
              <Search className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">{isNp ? 'टेक्स्ट खोज्नुहोस्' : 'Find Text'}</span>
            </button>

            {/* Quick Edit Modal Trigger */}
            <button
              onClick={() => setIsQuickEditOpen(true)}
              className="px-2.5 py-2 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">{isNp ? 'प्रत्यक्ष सम्पादन' : 'Quick Edit Landing Page'}</span>
            </button>
          </>
        )}
      </div>

      {/* SEARCH AND JUMP MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-indigo-600" />
                <h3 className="font-black text-slate-900 text-sm">
                  {isNp ? 'वेबसाइटको कुनै पनि पाठ वा सेक्सन सिधै खोज्नुहोस्' : 'Find & Edit Any Text on Landing Page'}
                </h3>
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type headline, e.g. 'MindSparQ', 'Education Technology', 'Abacus', 'Robotics'..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            {/* Results List */}
            <div className="max-h-60 overflow-y-auto space-y-2 pt-2">
              {searchResults.length === 0 ? (
                <p className="text-center py-6 text-xs text-slate-400 font-medium">
                  {searchTerm.trim() === '' 
                    ? 'Start typing to locate any title, course, or feed post on the page...' 
                    : 'No matching text found. Try another keyword like "MindSparQ" or "Course".'}
                </p>
              ) : (
                searchResults.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      const el = document.querySelector(res.selector);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        el.classList.add('ring-4', 'ring-indigo-500', 'ring-offset-2');
                        setTimeout(() => el.classList.remove('ring-4', 'ring-indigo-500', 'ring-offset-2'), 3000);
                      }
                    }}
                    className="p-3 bg-slate-50 hover:bg-indigo-50 border border-slate-200 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">{res.section}</span>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-900 line-clamp-1">{res.text}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* DIRECT LANDING PAGE EDITOR MODAL */}
      {isQuickEditOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base">{isNp ? 'ल्यान्डिङ पेज प्रत्यक्ष सम्पादक (On-Site Editor)' : 'Landing Page Direct On-Site Visual Editor'}</h3>
                  <p className="text-xs text-slate-300">{isNp ? 'मुख्य पृष्ठको टेक्स्ट तथा शीर्षक सिधै हेरेर बदल्नुहोस्' : 'Modify titles, descriptions, and banners directly from the website'}</p>
                </div>
              </div>
              <button
                onClick={() => setIsQuickEditOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 space-x-2 shrink-0 overflow-x-auto">
              {[
                { id: 'hero', label: 'Hero Headline & Banner', icon: Sparkles },
                { id: 'about', label: 'Company Overview & About', icon: Layers },
                { id: 'courses', label: 'Courses Directory', icon: BookOpen },
                { id: 'feed', label: 'Instructional Feed', icon: MessageSquare },
                { id: 'photos', label: 'Campus Photos', icon: Image },
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveQuickTab(tab.id as any)}
                    className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center space-x-1.5 transition-all border-b-2 ${
                      activeQuickTab === tab.id
                        ? 'bg-white text-indigo-600 border-indigo-600 shadow-xs'
                        : 'text-slate-500 border-transparent hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Form Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-grow text-xs">
              
              {/* TAB 1: HERO */}
              {activeQuickTab === 'hero' && (
                <form onSubmit={handleSaveHero} className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center space-x-2 text-indigo-900 font-medium">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Edits made here update the main website hero section instantly and save to system memory.</span>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Top Banner Announcement Notice (English)</label>
                    <input
                      type="text"
                      value={heroForm.bannerNoticeEn}
                      onChange={(e) => setHeroForm({ ...heroForm, bannerNoticeEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Top Banner Announcement Notice (Nepali)</label>
                    <input
                      type="text"
                      value={heroForm.bannerNoticeNp}
                      onChange={(e) => setHeroForm({ ...heroForm, bannerNoticeNp: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Hero Main Title Headline (English)</label>
                    <textarea
                      rows={2}
                      value={heroForm.heroTitleEn}
                      onChange={(e) => setHeroForm({ ...heroForm, heroTitleEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Hero Main Title Headline (Nepali)</label>
                    <textarea
                      rows={2}
                      value={heroForm.heroTitleNp}
                      onChange={(e) => setHeroForm({ ...heroForm, heroTitleNp: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Hero Subtitle Paragraph (English)</label>
                    <textarea
                      rows={3}
                      value={heroForm.heroSubtitleEn}
                      onChange={(e) => setHeroForm({ ...heroForm, heroSubtitleEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md flex items-center space-x-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Hero Changes</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: ABOUT */}
              {activeQuickTab === 'about' && (
                <div className="space-y-4">
                  <p className="text-slate-600 font-medium leading-relaxed">
                    You can edit the Company Overview, Vision, Mission, and Core Values directly here or navigate directly to the About section on the live page while Visual Edit Mode is active!
                  </p>
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                    <p className="font-bold">Direct Section Edit Action:</p>
                    <p className="text-[11px]">Scroll down to the About Section on the website to click the floating "Edit About Section" button directly!</p>
                  </div>
                </div>
              )}

              {/* TAB 3: COURSES */}
              {activeQuickTab === 'courses' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h4 className="font-bold text-slate-900">Live Courses ({courses.length})</h4>
                  </div>
                  {courses.map(c => (
                    <div key={c.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900 text-xs">{c.titleEn}</p>
                        <p className="text-[10px] text-slate-500">{c.category} • NPR {c.price.toLocaleString()}</p>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded border border-emerald-200">ACTIVE</span>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: FEED */}
              {activeQuickTab === 'feed' && (
                <div className="space-y-3">
                  <p className="text-slate-600 font-medium">
                    Manage instructional posts and feed content directly from this panel or right on the live Feed card.
                  </p>
                  {posts.map(p => (
                    <div key={p.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900 text-xs">{p.title}</p>
                        <p className="text-[10px] text-slate-500">{p.authorName} • {p.createdAt}</p>
                      </div>
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded border border-indigo-200">{p.type.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: PHOTOS */}
              {activeQuickTab === 'photos' && (
                <div className="space-y-3">
                  <p className="text-slate-600 font-medium">Campus Gallery Slides ({dailyPhotos.length})</p>
                  {dailyPhotos.map(dp => (
                    <div key={dp.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-3">
                      <img src={dp.imageUrl} alt={dp.title} className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0" />
                      <div>
                        <p className="font-bold text-slate-900 text-xs">{dp.title}</p>
                        <p className="text-[10px] text-slate-500">{dp.date} • {dp.location || 'Kathmandu'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

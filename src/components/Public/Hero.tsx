import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, ArrowRight, Play, Sparkles, ShieldCheck, UserCheck, BookOpen, Video, Award, Edit3, Trash2, Check, X, Save } from 'lucide-react';
import { BatchAnnouncementSlider } from './BatchAnnouncementSlider';
import { BatchSlider } from './BatchSlider';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  const { language, setIsAuthModalOpen, setActiveVideoUrl, switchRole, homeConfig, updateHomeConfig, isVisualEditMode, currentRole } = useApp();
  const isNp = language === 'np';
  const isAdminVisualEdit = currentRole === 'admin' && isVisualEditMode;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);
  const [isEditingVideo, setIsEditingVideo] = useState(false);

  const [titleForm, setTitleForm] = useState({
    heroTitleEn: homeConfig.heroTitleEn,
    heroTitleNp: homeConfig.heroTitleNp,
  });

  const [subForm, setSubForm] = useState({
    heroSubtitleEn: homeConfig.heroSubtitleEn,
    heroSubtitleNp: homeConfig.heroSubtitleNp,
  });

  const [videoUrlForm, setVideoUrlForm] = useState(homeConfig.featuredVideoUrl || 'https://www.youtube.com/embed/mU6anWqZJcc');

  const handleSaveTitle = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomeConfig(titleForm);
    setIsEditingTitle(false);
  };

  const handleSaveSub = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomeConfig(subForm);
    setIsEditingSubtitle(false);
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomeConfig({ featuredVideoUrl: videoUrlForm });
    setIsEditingVideo(false);
  };

  const handleDeleteBanner = () => {
    if (window.confirm('Delete top announcement banner notice?')) {
      updateHomeConfig({ bannerNoticeEn: '', bannerNoticeNp: '' });
    }
  };

  return (
    <div id="hero-section" className={`relative bg-slate-50 text-slate-800 overflow-hidden pt-6 pb-16 lg:py-16 border-b border-slate-200 transition-all ${isAdminVisualEdit ? 'ring-2 ring-indigo-400/40 ring-inset' : ''}`}>
      
      {/* On-Site Visual Edit Badge (Admin Only) */}
      {isAdminVisualEdit && (
        <div className="bg-slate-900 text-indigo-300 py-1.5 px-4 text-center text-xs font-mono font-bold flex items-center justify-center space-x-2 border-b border-indigo-500/30">
          <Edit3 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>[ADMIN VISUAL EDITOR ACTIVE] Click any pencil icon to edit headline text directly on page!</span>
        </div>
      )}

      {/* Auto-Cycling Summer Batch & Notice Announcement Slider */}
      <div className="mb-6">
        <BatchAnnouncementSlider onNavigateTab={setActiveTab} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                {isNp
                  ? 'माइंडस्पार्क (MINDSPARQ) एजुकेशन एण्ड टेक्नोलोजी'
                  : 'MINDSPARQ EDUCATION & TECHNOLOGY PLATFORM'}
              </span>
            </div>

            {/* Main Headline with Direct On-Site Edit Control */}
            <div className="relative group">
              {isEditingTitle ? (
                <form onSubmit={handleSaveTitle} className="p-4 bg-white rounded-2xl border-2 border-indigo-500 shadow-xl space-y-3">
                  <p className="text-xs font-bold text-indigo-600 flex items-center space-x-1">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Direct Edit Main Headline</span>
                  </p>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">English Headline</label>
                    <textarea
                      rows={2}
                      value={titleForm.heroTitleEn}
                      onChange={(e) => setTitleForm({ ...titleForm, heroTitleEn: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">Nepali Headline</label>
                    <textarea
                      rows={2}
                      value={titleForm.heroTitleNp}
                      onChange={(e) => setTitleForm({ ...titleForm, heroTitleNp: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsEditingTitle(false)}
                      className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold flex items-center space-x-1"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Title</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="relative inline-block w-full">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 font-sans">
                    {isNp ? homeConfig.heroTitleNp : homeConfig.heroTitleEn}
                  </h1>

                  {isAdminVisualEdit && (
                    <button
                      onClick={() => setIsEditingTitle(true)}
                      className="mt-2 inline-flex items-center space-x-1 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shadow-md transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Headline Directly</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Subtitle with Direct On-Site Edit Control */}
            <div className="relative group">
              {isEditingSubtitle ? (
                <form onSubmit={handleSaveSub} className="p-4 bg-white rounded-2xl border-2 border-indigo-500 shadow-xl space-y-3">
                  <p className="text-xs font-bold text-indigo-600 flex items-center space-x-1">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Direct Edit Subtitle Paragraph</span>
                  </p>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">English Paragraph</label>
                    <textarea
                      rows={3}
                      value={subForm.heroSubtitleEn}
                      onChange={(e) => setSubForm({ ...subForm, heroSubtitleEn: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">Nepali Paragraph</label>
                    <textarea
                      rows={3}
                      value={subForm.heroSubtitleNp}
                      onChange={(e) => setSubForm({ ...subForm, heroSubtitleNp: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsEditingSubtitle(false)}
                      className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold flex items-center space-x-1"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Subtitle</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    {isNp ? homeConfig.heroSubtitleNp : homeConfig.heroSubtitleEn}
                  </p>
                  {isAdminVisualEdit && (
                    <button
                      onClick={() => setIsEditingSubtitle(true)}
                      className="mt-2 inline-flex items-center space-x-1 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shadow-md transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Subtitle Directly</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => setActiveTab('courses')}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>{isNp ? 'पाठ्यक्रमहरू हेर्नुहोस्' : 'Explore Courses'}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => {
                  switchRole('instructor');
                  setActiveTab('instructor_panel');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-sm shadow-sm transition-all"
              >
                <UserCheck className="w-4 h-4 text-amber-600" />
                <span>{isNp ? 'शिक्षक प्यानल' : 'Teacher Panel'}</span>
              </button>

              <button
                onClick={() => {
                  switchRole('admin');
                  setActiveTab('admin_panel');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-sm transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>{isNp ? 'एडमिन ड्यासबोर्ड' : 'Admin Panel'}</span>
              </button>
            </div>

            {/* Key Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{homeConfig.statsStudents}</p>
                <p className="text-xs text-slate-500 font-medium">{isNp ? 'विद्यार्थीहरू' : 'Students Trained'}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-indigo-600">{homeConfig.statsInstructors}</p>
                <p className="text-xs text-slate-500 font-medium">{isNp ? 'विशेषज्ञ प्रशिक्षक' : 'Verified Instructors'}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-600">{homeConfig.statsPlacement}</p>
                <p className="text-xs text-slate-500 font-medium">{isNp ? 'रोजगारी सफलता' : 'Placement Rate'}</p>
              </div>
            </div>

          </div>

          {/* Interactive Card & Video Preview Showcase */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Feature Showcase Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm relative overflow-hidden group">
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 mb-4 border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80" 
                  alt="MindSparQ Technology Learning" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Play Button Overlay */}
                <button 
                  onClick={() => setActiveVideoUrl(homeConfig.featuredVideoUrl || 'https://www.youtube.com/embed/mU6anWqZJcc')}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md backdrop-blur-sm transition-transform hover:scale-110"
                >
                  <Play className="w-6 h-6 ml-1 fill-current" />
                </button>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white">
                  <span className="bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700 backdrop-blur-sm flex items-center space-x-1">
                    <Video className="w-3.5 h-3.5 text-red-400" />
                    <span>{isNp ? 'माइंडस्पार्क ओरिएन्टेसन भिडियो' : 'MindSparQ Tech Intro'}</span>
                  </span>
                  <span className="text-cyan-300 font-mono">15:00 MIN</span>
                </div>
              </div>

              {/* Quick Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900">
                    {isNp ? 'पावर वर्किङ प्यानल तथा प्रोफाइल प्रबन्धन' : 'Power Admin & Teacher Working Panels'}
                  </h3>
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isNp 
                    ? 'शिक्षकहरूले आफ्नो प्रोफाइल अद्यावधिक गर्न, भिडियो, फोटो तथा पाठ्यसामग्री सिधै पोस्ट गर्न सक्छन्। एडमिनले सम्पूर्ण व्यवस्थापन नियन्त्रण गर्दछ।'
                    : 'Instructors can update profiles, post media, and lesson content. Admins get full broadcast & platform control.'}
                </p>
                
                <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-xs">
                  <button
                    onClick={() => {
                      switchRole('admin');
                      setActiveTab('admin_panel');
                    }}
                    className="text-indigo-600 font-bold hover:underline flex items-center space-x-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isNp ? 'एडमिन ड्यासबोर्डमा जानुहोस्' : 'Open Admin Panel'}</span>
                  </button>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-slate-600 font-bold hover:underline flex items-center space-x-1"
                  >
                    <span>{isNp ? 'गुगल लगइन' : 'Google Auth'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center space-x-3 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{isNp ? 'प्रशिक्षक प्रोफाइल' : 'Instructor Profiles'}</h4>
                  <p className="text-[10px] text-slate-500">{isNp ? 'लगइन र अद्यावधिक' : 'Google Auth Editable'}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center space-x-3 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{isNp ? 'पावर एडमिन' : 'Power Admin'}</h4>
                  <p className="text-[10px] text-slate-500">{isNp ? 'प्रत्यक्ष पोस्ट प्यानल' : 'Direct Public Broadcast'}</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Summer Batch 2026 Interactive Application Slider */}
        <div className="pt-2">
          <BatchSlider
            onNavigateTab={setActiveTab}
            onApplyBatch={(courseTitle) => {
              setActiveTab('contact');
            }}
          />
        </div>
      </div>
    </div>
  );
};


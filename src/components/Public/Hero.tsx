import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, ArrowRight, Play, Sparkles, ShieldCheck, UserCheck, BookOpen, Video, Award } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  const { language, setIsAuthModalOpen, setIsGuideModalOpen, setActiveVideoUrl, switchRole } = useApp();
  const isNp = language === 'np';

  return (
    <div className="relative bg-slate-50 text-slate-800 overflow-hidden pt-8 pb-16 lg:py-20 border-b border-slate-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                {isNp
                  ? 'माइन्डस्प्याक एजुकेशन एण्ड टेक्नोलोजी'
                  : 'MINDSPACK EDUCATION & TECHNOLOGY PLATFORM'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 font-sans">
              {isNp ? (
                <>
                  नेपालको अग्रणी <span className="text-indigo-600">आईटी तथा एआई</span> शिक्षा मञ्च
                </>
              ) : (
                <>
                  Empowering Future <span className="text-indigo-600">Software Engineers & AI Innovators</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {isNp
                ? 'हाम्रा अनुभवी प्रशिक्षकहरूद्वारा सञ्चालित अनलाइन तथा प्रत्यक्ष कक्षाहरू, भिडियो ट्यूटोरियलहरू र पावर एडमिन/शिक्षक ड्यासबोर्ड मार्फत प्रविधिको उच्च ज्ञान प्राप्त गर्नुहोस्।'
                : 'Interactive learning hub featuring certified instructor profiles, live instructional video feeds, full-stack course tracks, and direct admin & instructor content management.'}
            </p>

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
                <span>{isNp ? 'शिक्षक प्यानल' : 'Instructor Panel'}</span>
              </button>

              <button
                onClick={() => setIsGuideModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-medium text-xs transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>{isNp ? 'सिस्टम विश्लेषण' : 'System Specs'}</span>
              </button>
            </div>

            {/* Key Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">5,000+</p>
                <p className="text-xs text-slate-500 font-medium">{isNp ? 'विद्यार्थीहरू' : 'Students Trained'}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-indigo-600">15+</p>
                <p className="text-xs text-slate-500 font-medium">{isNp ? 'विशेषज्ञ प्रशिक्षक' : 'Verified Instructors'}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-600">98%</p>
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
                  alt="Mindspack Technology Learning" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Play Button Overlay */}
                <button 
                  onClick={() => setActiveVideoUrl('https://www.youtube.com/embed/mU6anWqZJcc')}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md backdrop-blur-sm transition-transform hover:scale-110"
                >
                  <Play className="w-6 h-6 ml-1 fill-current" />
                </button>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white">
                  <span className="bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700 backdrop-blur-sm flex items-center space-x-1">
                    <Video className="w-3.5 h-3.5 text-red-400" />
                    <span>{isNp ? 'माइन्डस्प्याक ओरिएन्टेसन भिडियो' : 'Mindspack Tech Intro'}</span>
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
                    ? 'शिक्षकहरूले आफ्नो प्रोफाइल अपडेट गर्न, भिडियो, फोटो तथा पाठ्यसामग्री सिधै पोस्ट गर्न सक्छन्। एडमिनले सम्पूर्ण व्यवस्थापन नियन्त्रण गर्दछ।'
                    : 'Instructors can update profiles via Google auth, post media and lesson content. Admins get full broadcast & platform control.'}
                </p>
                
                <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-xs">
                  <button
                    onClick={() => {
                      switchRole('admin');
                      setActiveTab('admin_panel');
                    }}
                    className="text-indigo-600 font-semibold hover:underline flex items-center space-x-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isNp ? 'एडमिन ड्यासबोर्डमा जानुहोस्' : 'Open Admin Panel'}</span>
                  </button>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-slate-600 font-semibold hover:underline flex items-center space-x-1"
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
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InstructorProfile } from '../../types';
import { 
  Users, 
  Star, 
  CheckCircle, 
  GraduationCap, 
  Linkedin, 
  Youtube, 
  Facebook, 
  Instagram, 
  Video, 
  Github, 
  Sparkles, 
  Award,
  Crown,
  BookOpen
} from 'lucide-react';

export const InstructorsSection: React.FC = () => {
  const { instructors, language, loginWithGoogle } = useApp();
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorProfile | null>(null);

  const isNp = language === 'np';

  // Categorize Instructors by MindSparQ Org Structure
  const founder = instructors.find(i => i.id === 'inst-1');
  const coFounder = instructors.find(i => i.id === 'inst-2');
  const manager = instructors.find(i => i.id === 'inst-3');
  const seniorTeachers = instructors.filter(i => ['inst-4', 'inst-5'].includes(i.id));
  const teachingTeam = instructors.filter(i => ['inst-6', 'inst-7', 'inst-8', 'inst-9'].includes(i.id));

  const renderSocialIcons = (social: InstructorProfile['social']) => {
    return (
      <div className="flex items-center space-x-2 pt-1">
        {social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600">
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        )}
        {social.facebook && (
          <a href={social.facebook} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600">
            <Facebook className="w-3.5 h-3.5" />
          </a>
        )}
        {social.youtube && (
          <a href={social.youtube} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-red-600">
            <Youtube className="w-3.5 h-3.5" />
          </a>
        )}
        {social.instagram && (
          <a href={social.instagram} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-600">
            <Instagram className="w-3.5 h-3.5" />
          </a>
        )}
        {social.tiktok && (
          <a href={social.tiktok} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900">
            <Video className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    );
  };

  return (
    <section className="py-16 bg-slate-50 text-slate-800 min-h-[600px] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            <Users className="w-3.5 h-3.5" />
            <span>{isNp ? 'हाम्रो आधिकारिक टोली' : 'Organizational Structure & Faculty'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            {isNp ? 'माइंडस्पार्क (MindSparQ) का नेतृत्व तथा शिक्षक टिम' : 'Meet MindSparQ Leadership & Teaching Team'}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {isNp
              ? 'नेपालमा आधुनिक शिक्षा, कृत्रिम बुद्धिमत्ता (AI) र भावी सीपहरूको अभिवृद्धिमा समर्पित संस्थापक, प्रबन्धक र प्रशिक्षकहरू।'
              : 'Our leadership and educators bring expertise in EdTech, AI, STEM, Abacus, and teacher capacity building.'}
          </p>
        </div>

        {/* 1. Executive Leadership */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50/60 p-2 rounded-xl border border-indigo-100">
            <Crown className="w-4 h-4 text-amber-500" />
            <span>{isNp ? 'संस्थापक तथा प्रबन्धकीय नेतृत्व (Executive Leadership)' : 'Executive Leadership & Founder'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[founder, coFounder, manager].filter(Boolean).map((inst) => (
              <div
                key={inst!.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 p-5 flex flex-col justify-between space-y-4 shadow-xs hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
                    {inst!.id === 'inst-1' ? 'Founder & CEO' : inst!.id === 'inst-2' ? 'Co-Founder' : 'Office Manager'}
                  </span>
                </div>

                <div>
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <img
                      src={inst!.avatar}
                      alt={inst!.name}
                      className="w-full h-full rounded-2xl object-cover border-2 border-indigo-500 shadow-sm"
                    />
                    {inst!.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1 rounded-full shadow-xs">
                        <CheckCircle className="w-3.5 h-3.5 fill-current" />
                      </div>
                    )}
                  </div>

                  <div className="text-center space-y-1">
                    <h3 className="text-base font-bold text-slate-900">
                      {isNp && inst!.nameNp ? inst!.nameNp : inst!.name}
                    </h3>
                    <p className="text-xs text-indigo-600 font-semibold">
                      {isNp && inst!.designationNp ? inst!.designationNp : inst!.designation}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed text-center mt-3 line-clamp-2">
                    {isNp && inst!.bioNp ? inst!.bioNp : inst!.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {renderSocialIcons(inst!.social)}
                  <button
                    onClick={() => setSelectedInstructor(inst!)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
                  >
                    {isNp ? 'विवरण' : 'Full Bio'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Senior Teachers */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 p-2 rounded-xl border border-slate-200">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>{isNp ? 'वरिष्ठ शिक्षकहरू (Senior Teachers)' : 'Senior Teachers & Domain Leads'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seniorTeachers.map((inst) => (
              <div
                key={inst.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 shadow-xs"
              >
                <img
                  src={inst.avatar}
                  alt={inst.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shrink-0"
                />
                <div className="space-y-1 text-center sm:text-left flex-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    {isNp && inst.nameNp ? inst.nameNp : inst.name}
                  </h3>
                  <p className="text-xs text-indigo-600 font-semibold">
                    {isNp && inst.designationNp ? inst.designationNp : inst.designation}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2">{isNp && inst.bioNp ? inst.bioNp : inst.bio}</p>
                  <button
                    onClick={() => setSelectedInstructor(inst)}
                    className="inline-block mt-2 text-xs text-indigo-600 font-bold hover:underline"
                  >
                    {isNp ? 'थप जानकारी →' : 'View Profile →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Teaching Team */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 p-2 rounded-xl border border-slate-200">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>{isNp ? 'शिक्षक टोली (Teaching Team)' : 'Teaching Team & Practical Instructors'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {teachingTeam.map((inst) => (
              <div
                key={inst.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={inst.avatar}
                    alt={inst.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      {isNp && inst.nameNp ? inst.nameNp : inst.name}
                    </h3>
                    <p className="text-[11px] text-indigo-600 font-medium line-clamp-1">
                      {isNp && inst.designationNp ? inst.designationNp : inst.designation}
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {isNp && inst.bioNp ? inst.bioNp : inst.bio}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  {renderSocialIcons(inst.social)}
                  <button
                    onClick={() => setSelectedInstructor(inst)}
                    className="text-[11px] text-slate-600 font-bold hover:text-indigo-600"
                  >
                    {isNp ? 'विवरण' : 'Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Instructor Profile Modal */}
      {selectedInstructor && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative text-slate-800">
            <button
              onClick={() => setSelectedInstructor(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
              <img
                src={selectedInstructor.avatar}
                alt={selectedInstructor.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-500 shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <h2 className="text-xl font-bold text-slate-900">
                    {isNp && selectedInstructor.nameNp ? selectedInstructor.nameNp : selectedInstructor.name}
                  </h2>
                  <CheckCircle className="w-4 h-4 text-indigo-600 fill-current" />
                </div>
                <p className="text-xs text-indigo-600 font-semibold">
                  {isNp && selectedInstructor.designationNp ? selectedInstructor.designationNp : selectedInstructor.designation}
                </p>
                <p className="text-xs text-slate-500">{selectedInstructor.email}</p>
                
                <div className="pt-2">
                  {renderSocialIcons(selectedInstructor.social)}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">{isNp ? 'योग्यता तथा अनुभव' : 'Qualifications'}</h3>
              <div className="space-y-1.5">
                {selectedInstructor.qualifications.map((q, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">{isNp ? 'विशेषज्ञता क्षेत्र' : 'Expertise & Programs'}</h3>
              <div className="flex flex-wrap gap-2">
                {selectedInstructor.expertise.map((exp) => (
                  <span key={exp} className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg text-xs font-mono">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  loginWithGoogle('instructor', selectedInstructor.id);
                  setSelectedInstructor(null);
                }}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-sm hover:bg-indigo-700 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isNp ? 'गुगल मार्फत सम्पादन लगइन' : 'Instructor Google Login'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InstructorProfile } from '../../types';
import { Users, Star, CheckCircle, GraduationCap, Github, Linkedin, Youtube, Twitter, Sparkles, BookOpen } from 'lucide-react';

export const InstructorsSection: React.FC = () => {
  const { instructors, language, loginWithGoogle } = useApp();
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorProfile | null>(null);

  const isNp = language === 'np';

  return (
    <section className="py-16 bg-slate-50 text-slate-800 min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            <Users className="w-3.5 h-3.5" />
            <span>{isNp ? 'हाम्रा विशेषज्ञ प्रशिक्षकहरू' : 'Verified Faculty & Instructors'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            {isNp ? 'माइन्डस्प्याकका प्रमाणित आईटी तथा एआई इन्जिनियरहरू' : 'Meet Mindspack Industry Experts'}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {isNp
              ? 'प्रविधि क्षेत्रमा वर्षौँको व्यावहारिक अनुभव हासिल गर्नुभएका मुख्य इन्जिनियर तथा अनुसन्धानकर्ताहरूसँग प्रत्यक्ष सिक्नुहोस्।'
              : 'Our courses are led by seasoned software architects, researchers, and tech leads.'}
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((inst) => (
            <div
              key={inst.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 p-5 flex flex-col justify-between space-y-4 shadow-sm hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                {/* Profile Avatar & Badge */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img
                    src={inst.avatar}
                    alt={inst.name}
                    className="w-full h-full rounded-2xl object-cover border-2 border-slate-100 group-hover:border-indigo-400 transition-colors shadow-sm"
                  />
                  {inst.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1 rounded-full shadow-sm" title="Verified Mindspack Instructor">
                      <CheckCircle className="w-4 h-4 fill-current" />
                    </div>
                  )}
                </div>

                {/* Name & Title */}
                <div className="text-center space-y-1">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {isNp && inst.nameNp ? inst.nameNp : inst.name}
                  </h3>
                  <p className="text-xs text-indigo-600 font-semibold">
                    {isNp && inst.designationNp ? inst.designationNp : inst.designation}
                  </p>
                </div>

                {/* Rating & Stats */}
                <div className="flex items-center justify-center space-x-4 my-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center space-x-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{inst.rating}</span>
                  </div>
                  <div className="text-slate-500">
                    <span className="font-bold text-slate-800">{inst.totalStudents}</span> {isNp ? 'विद्यार्थी' : 'Students'}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 leading-relaxed text-center line-clamp-3">
                  {isNp && inst.bioNp ? inst.bioNp : inst.bio}
                </p>

                {/* Expertise Badges */}
                <div className="flex flex-wrap justify-center gap-1 mt-3">
                  {inst.expertise.slice(0, 3).map((exp) => (
                    <span key={exp} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono border border-slate-200">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedInstructor(inst)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
                >
                  {isNp ? 'प्रोफाइल हेर्नुहोस्' : 'Full Bio & Qualifications'}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Instructor Details Modal */}
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
                
                <div className="flex items-center justify-center sm:justify-start space-x-3 pt-2">
                  {selectedInstructor.social.github && (
                    <a href={selectedInstructor.social.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-800">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {selectedInstructor.social.linkedin && (
                    <a href={selectedInstructor.social.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {selectedInstructor.social.youtube && (
                    <a href={selectedInstructor.social.youtube} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-red-600">
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">{isNp ? 'विशेषज्ञता प्रविधि' : 'Technical Skills'}</h3>
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
                <span>{isNp ? 'यो प्रोफाइल गुगल लगइन मार्फत सम्पादन गर्नुहोस्' : 'Login to Edit Profile'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

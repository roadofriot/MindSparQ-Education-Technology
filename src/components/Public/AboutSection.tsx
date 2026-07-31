import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Code2, Cpu, Cloud, ShieldCheck, CheckCircle2, Award, Terminal, Users, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { language } = useApp();
  const isNp = language === 'np';

  return (
    <section className="py-16 bg-slate-50 text-slate-800 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{isNp ? 'हाम्रो उद्देश्य' : 'Our Mission & Vision'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              {isNp ? (
                <>
                  माइन्डस्प्याक एजुकेशन एण्ड टेक्नोलोजी <br />
                  <span className="text-indigo-600">डिजिटल क्रान्तिको सहयात्री</span>
                </>
              ) : (
                <>
                  Mindspack Education & Technology <br />
                  <span className="text-indigo-600">Bridging Education with Industry Tech</span>
                </>
              )}
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              {isNp
                ? 'माइन्डस्प्याक एजुकेशन एण्ड टेक्नोलोजी नेपालमा सफ्टवेयर इन्जिनियरिङ, आर्टिफिसियल इन्टेलिजेन्स, क्लाउड कम्प्युटिङ र डिजिटल साक्षरता अभिवृद्धि गर्न समर्पित अग्रणी संस्था हो। हामी सैद्धान्तिक ज्ञान मात्र नभई वास्तविक उद्योगमा प्रयोग हुने प्रविधि तथा प्रोजेक्टहरूमा प्रत्यक्ष अभ्यास गराउँछौँ।'
                : 'Mindspack Education and Technology Pvt. Ltd. is an industry-driven tech institute in Nepal focused on Full Stack Web Architecture, Applied Generative AI, Cloud Infrastructure, and Mobile Development.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                isNp ? 'व्याहारिक रियल-वर्ल्ड प्रोजेक्टहरू' : 'Practical Hands-on Projects',
                isNp ? 'प्रमाणित इन्स्ट्रक्टर प्यानल' : 'Verified Instructor Dashboard',
                isNp ? 'पावर वर्किङ एडमिन प्यानल' : 'Power Admin Broadcast Panel',
                isNp ? 'जब प्लेसमेन्ट सहयोग' : 'Job Placement Support',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm hover:border-indigo-300 transition-colors">
              <Code2 className="w-8 h-8 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">{isNp ? 'आधुनिक टेक स्ट्याक' : 'Modern Tech Stack'}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                React, TypeScript, Node.js, Python, Flutter, Docker, Kubernetes & Gemini AI API.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm hover:border-indigo-300 transition-colors">
              <Cpu className="w-8 h-8 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">{isNp ? 'एआई र रोबोटिक्स' : 'AI & Deep Research'}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isNp ? 'जेनेरेटिभ एआई मोडलहरू र मेसिन लर्निङमा प्रयोगात्मक क्लास।' : 'Hands-on Generative AI and LLM building.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm hover:border-indigo-300 transition-colors">
              <Cloud className="w-8 h-8 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">{isNp ? 'क्लाउड र डेभओप्स' : 'Cloud Architecture'}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                AWS & GCP Cloud Deployment, Microservices and CI/CD Pipelines.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm hover:border-indigo-300 transition-colors">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">{isNp ? 'साइबर सुरक्षा' : 'Cyber Security'}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isNp ? 'नेटवर्क सुरक्षा र पेन टेस्टिङ।' : 'Ethical hacking & network security fundamentals.'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

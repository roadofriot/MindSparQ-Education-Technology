import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Mail, Phone, MapPin, Globe, Github, Linkedin, Youtube, Shield, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { language, setIsGuideModalOpen } = useApp();
  const isNp = language === 'np';

  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">MINDSPACK</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              {isNp
                ? 'माइन्डस्प्याक एजुकेशन एण्ड टेक्नोलोजी: नेपालका युवा तथा प्रोफेसनलहरूलाई उच्चस्तरीय प्रविधि, सफ्टवेयर इन्जिनियरिङ र एआई शिक्षा प्रदान गर्ने अग्रणी संस्था।'
                : 'Mindspack Education & Technology provides industry-standard IT training, full-stack software development, and AI tech masterclasses.'}
            </p>
            <div className="flex items-center space-x-3 pt-2 text-slate-500">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center hover:text-slate-900 hover:border-slate-300 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center hover:text-indigo-600 hover:border-indigo-300 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center hover:text-red-600 hover:border-red-300 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-4">
              {isNp ? 'नेभिगेसन' : 'Quick Links'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-indigo-600 transition-colors">{isNp ? 'गृह पृष्ठ (Home)' : 'Home'}</button></li>
              <li><button onClick={() => setActiveTab('courses')} className="hover:text-indigo-600 transition-colors">{isNp ? 'पाठ्यक्रमहरू (Courses)' : 'Explore Courses'}</button></li>
              <li><button onClick={() => setActiveTab('feed')} className="hover:text-indigo-600 transition-colors">{isNp ? 'भिडियो तथा कन्टेन्ट फिड' : 'Instructional Feed'}</button></li>
              <li><button onClick={() => setActiveTab('instructors')} className="hover:text-indigo-600 transition-colors">{isNp ? 'प्रशिक्षक प्रोफाइलहरू' : 'Instructors Profile'}</button></li>
              <li><button onClick={() => setActiveTab('about')} className="hover:text-indigo-600 transition-colors">{isNp ? 'माइन्डस्प्याकको बारेमा' : 'About Mindspack'}</button></li>
            </ul>
          </div>

          {/* Tech Domains */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-4">
              {isNp ? 'प्रविधि विधा' : 'Tech Tracks'}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /><span>Full Stack Web Dev</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /><span>Generative AI & LLMs</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /><span>Cloud Architecture (AWS/GCP)</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /><span>Flutter Mobile App Dev</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /><span>UI/UX Design Engineering</span></li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-4">
              {isNp ? 'सम्पर्क विवरण' : 'Contact Us'}
            </h3>
            <div className="flex items-start space-x-3 text-sm">
              <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-1" />
              <span>Kathmandu, Nepal (New Baneshwor / Tinkune Tech Hub)</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>+977 1-4105000 / +977 9841234567</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>info@mindspack.edu.np</span>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setIsGuideModalOpen(true)}
                className="inline-flex items-center space-x-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 px-3 py-2 rounded-lg transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{isNp ? 'सिस्टम आर्किटेक्चर तथा गाइड' : 'System Architecture Guide'}</span>
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} Mindspack Education and Technology Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span>Kathmandu, Nepal</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

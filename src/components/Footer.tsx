import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Mail, Phone, MapPin, Globe, Facebook, Linkedin, Youtube, Instagram, Video, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { language } = useApp();
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
              <span className="text-xl font-black tracking-wider text-slate-900">MINDSPARQ</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              {isNp
                ? 'माइंडस्पार्क (MindSparQ) एजुकेशन एण्ड टेक्नोलोजी: विद्यार्थी, शिक्षक र विद्यालयहरूलाई आधुनिक एआई, भावी सीप र डिजिटल साक्षरता प्रदान गर्ने अग्रणी EdTech संस्था।'
                : 'MindSparQ Education & Technology empowers students, teachers, and schools across Nepal with Artificial Intelligence (AI), Future Skills, and STEM solutions.'}
            </p>
            
            <div className="space-y-2 pt-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {isNp ? 'हाम्रा सामाजिक सञ्जालहरू' : 'Official Social Channels'}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook" className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn" className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center hover:bg-sky-700 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube" className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram" className="w-8 h-8 rounded-lg bg-pink-50 border border-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" title="TikTok" className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors">
                  <Video className="w-4 h-4" />
                </a>
              </div>
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
              <li><button onClick={() => setActiveTab('feed')} className="hover:text-indigo-600 transition-colors">{isNp ? 'कन्टेन्ट फिड' : 'Instructional Feed'}</button></li>
              <li><button onClick={() => setActiveTab('instructors')} className="hover:text-indigo-600 transition-colors">{isNp ? 'शिक्षक टिम' : 'Instructors & Team'}</button></li>
              <li><button onClick={() => setActiveTab('about')} className="hover:text-indigo-600 transition-colors">{isNp ? 'माइंडस्पार्कको बारेमा' : 'About MindSparQ'}</button></li>
              <li><button onClick={() => setActiveTab('contact')} className="hover:text-indigo-600 transition-colors">{isNp ? 'सम्पर्क तथा फारम' : 'Contact Us'}</button></li>
            </ul>
          </div>

          {/* Core Offerings */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-4">
              {isNp ? 'हाम्रा विधा तथा सेवाहरू' : 'Our Key Streams'}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /><span>Abacus & Mental Math</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /><span>Vedic Mathematics</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /><span>Artificial Intelligence (AI)</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /><span>Coding & Robotics</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /><span>Teacher Training (TOT)</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /><span>DMIT & Motivation</span></li>
            </ul>
          </div>

          {/* Official Contact & Placeholders */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-4">
              {isNp ? 'सम्पर्क विवरण' : 'Official Contact'}
            </h3>
            <div className="flex items-start space-x-3 text-sm">
              <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-slate-800">MindSparQ EdTech</p>
                <p className="text-xs text-slate-500 italic">*(Actual office address required — Pokhara / Kathmandu / Dang)*</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-mono text-xs">+977 9857058666 / +977 9706306382</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>info@mindsparq.edu.np</span>
            </div>
            <div className="flex items-center space-x-3 text-sm font-mono text-indigo-700">
              <Globe className="w-4 h-4 text-sky-600 shrink-0" />
              <span>www.mindsparq.edu.np</span>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} MindSparQ Education & Technology Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span>Nepal</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

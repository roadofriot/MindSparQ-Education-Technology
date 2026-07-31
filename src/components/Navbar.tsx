import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Globe, 
  ShieldCheck, 
  UserCheck, 
  User, 
  LogOut, 
  LogIn, 
  Sparkles,
  BookOpen,
  Rss,
  Users,
  Info,
  Send,
  HelpCircle,
  LayoutDashboard
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { 
    language, 
    setLanguage, 
    currentRole, 
    switchRole, 
    currentUser, 
    logout, 
    setIsAuthModalOpen,
    setIsGuideModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isNp = language === 'np';

  const navLinks = [
    { id: 'home', label: isNp ? 'गृह पृष्ठ' : 'Home', icon: BookOpen },
    { id: 'courses', label: isNp ? 'पाठ्यक्रमहरू' : 'Courses', icon: GraduationCap },
    { id: 'feed', label: isNp ? 'कन्टेन्ट फिड' : 'Instructional Feed', icon: Rss },
    { id: 'instructors', label: isNp ? 'प्रशिक्षकहरू' : 'Instructors', icon: Users },
    { id: 'about', label: isNp ? 'हाम्रो बारेमा' : 'About Us', icon: Info },
    { id: 'contact', label: isNp ? 'सम्पर्क' : 'Contact', icon: Send },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm font-bold text-xl">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">MINDSPACK</span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                  TECH
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                {isNp ? 'माइन्डस्प्याक एजुकेशन एण्ड टेक्नोलोजी' : 'Education & Technology'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Language, Dashboard Tabs, Role & Auth */}
          <div className="hidden lg:flex items-center space-x-3">
            
            {/* System Specs & Setup Guide Button */}
            <button
              onClick={() => setIsGuideModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs font-medium transition-colors"
              title="Requirements & System Setup Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>{isNp ? 'सिस्टम गाइड' : 'Setup Guide'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(isNp ? 'en' : 'np')}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>{isNp ? 'English 🇬🇧' : 'नेपाली 🇳🇵'}</span>
            </button>

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => {
                  switchRole('guest');
                  setActiveTab('home');
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  currentRole === 'guest' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isNp ? 'अतिथि' : 'Guest'}
              </button>
              <button
                onClick={() => {
                  switchRole('instructor');
                  setActiveTab('instructor_panel');
                }}
                className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  currentRole === 'instructor' ? 'bg-amber-600 text-white shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3 h-3" />
                <span>{isNp ? 'शिक्षक' : 'Teacher'}</span>
              </button>
              <button
                onClick={() => {
                  switchRole('admin');
                  setActiveTab('admin_panel');
                }}
                className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  currentRole === 'admin' ? 'bg-indigo-600 text-white shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3 h-3" />
                <span>{isNp ? 'एडमिन' : 'Admin'}</span>
              </button>
            </div>

            {/* Authentication Button */}
            {currentUser ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-8 h-8 rounded-full border border-indigo-200 object-cover" 
                />
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-slate-100 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>{isNp ? 'गुगल लगइन' : 'Google Login'}</span>
              </button>
            )}

          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setLanguage(isNp ? 'en' : 'np')}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200"
            >
              {isNp ? 'EN' : 'नेपाली'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-3">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              {isNp ? 'प्यानल चयन गर्नुहोस्' : 'Select Panel View'}
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  switchRole('guest');
                  setActiveTab('home');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-xs font-medium rounded-lg text-center ${
                  currentRole === 'guest' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {isNp ? 'अतिथि' : 'Guest'}
              </button>
              <button
                onClick={() => {
                  switchRole('instructor');
                  setActiveTab('instructor_panel');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-xs font-medium rounded-lg text-center ${
                  currentRole === 'instructor' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {isNp ? 'शिक्षक' : 'Teacher'}
              </button>
              <button
                onClick={() => {
                  switchRole('admin');
                  setActiveTab('admin_panel');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-xs font-medium rounded-lg text-center ${
                  currentRole === 'admin' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {isNp ? 'एडमिन' : 'Admin'}
              </button>
            </div>

            <button
              onClick={() => {
                setIsGuideModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-200"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{isNp ? 'कम्प्लिट रोडम्याप र सिस्टम रिक्वायरमेन्ट' : 'Requirements & Tech Analysis'}</span>
            </button>

            {currentUser ? (
              <div className="flex items-center justify-between p-3 bg-slate-100 border border-slate-200 rounded-xl">
                <div className="flex items-center space-x-3">
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{currentUser.name}</p>
                    <p className="text-xs text-slate-500">{currentUser.email}</p>
                  </div>
                </div>
                <button onClick={logout} className="p-2 text-red-600 hover:bg-slate-200 rounded-lg">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>{isNp ? 'गुगल लगइन गर्नुहोस्' : 'Google Sign In'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

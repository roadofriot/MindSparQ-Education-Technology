import React, { useState, useRef, useEffect } from 'react';
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
  BookOpen,
  Rss,
  Users,
  Info,
  Send,
  ChevronDown,
  Sparkles,
  Award
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
    instructors
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  const isNp = language === 'np';
  const isZh = language === 'zh';

  // Helper for 3-way multilingual text
  const t = (enText: string, npText: string, zhText: string) => {
    if (language === 'zh') return zhText;
    if (language === 'np') return npText;
    return enText;
  };

  const navLinks = [
    { id: 'home', label: t('Home', 'गृह पृष्ठ', '首页'), icon: BookOpen },
    { id: 'courses', label: t('Courses', 'पाठ्यक्रमहरू', '课程目录'), icon: GraduationCap },
    { id: 'feed', label: t('Community Feed', 'कन्टेन्ट फिड', '社区动态'), icon: Rss },
    { id: 'member', label: t('Member Portal', 'सदस्य पोर्टल', '会员中心'), icon: User },
    { id: 'instructors', label: t('Instructors', 'प्रशिक्षकहरू', '师资团队'), icon: Users },
    { id: 'about', label: t('About Us', 'हाम्रो बारेमा', '关于我们'), icon: Info },
    { id: 'contact', label: t('Contact', 'सम्पर्क', '联系我们'), icon: Send },
  ];

  const getRoleLabel = () => {
    switch (currentRole) {
      case 'admin':
        return { label: t('Admin Panel', 'एडमिन प्यानल', '管理员面板'), color: 'bg-indigo-600 text-white', icon: ShieldCheck };
      case 'instructor':
        return { label: t('Teacher Panel', 'शिक्षक / इन्स्ट्रक्टर', '教师面板'), color: 'bg-amber-600 text-white', icon: UserCheck };
      case 'student':
        return { label: t('Member Portal', 'सदस्य (Member)', '会员中心'), color: 'bg-emerald-600 text-white', icon: User };
      default:
        return { label: t('Guest Explorer', 'अतिथि (Guest)', '游客模式'), color: 'bg-slate-700 text-white', icon: User };
    }
  };

  const currentRoleInfo = getRoleLabel();
  const RoleIcon = currentRoleInfo.icon;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-800 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Title Area */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
            title={isNp ? 'गृह पृष्ठमा जानुहोस् (MindSparQ Home)' : 'Go to MindSparQ Home Page'}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-200 border border-indigo-400/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900">MINDSPARQ</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 border border-indigo-200 uppercase tracking-wider">
                  TECH
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-tight -mt-0.5 hidden sm:block">
                {isNp ? 'माइन्डस्पार्क एजुकेशन एण्ड टेक्नोलोजी' : 'MindSparQ Education & Tech'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  title={`${isNp ? 'यहाँ जानुहोस्:' : 'Navigate to'} ${link.label}`}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-700 font-bold shadow-2xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Minimal Language Toggle & Role Dropdown with Google Auth */}
          <div className="hidden lg:flex items-center space-x-2">
            
            {/* Minimal 3-Way Language Switcher Button (EN, NP, ZH) */}
            <button
              onClick={() => {
                if (language === 'en') setLanguage('np');
                else if (language === 'np') setLanguage('zh');
                else setLanguage('en');
              }}
              title={
                language === 'en' 
                  ? 'Switch to Nepali (नेपाली)' 
                  : language === 'np' 
                    ? 'Switch to Easy Chinese (简体中文)' 
                    : 'Switch to English'
              }
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 flex items-center space-x-1.5 border border-slate-200 transition-all font-bold text-xs"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-[11px]">
                {language === 'en' ? 'EN' : language === 'np' ? 'नेपा' : '中文'}
              </span>
            </button>

            {/* ROLE SWITCHER & GUEST FEATURE DROPDOWN WITH GOOGLE LOGIN */}
            <div className="relative" ref={roleDropdownRef}>
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                title={isNp ? 'रोल तथा लगइन प्यानल चयन गर्नुहोस्' : 'Switch Role or Google Sign In'}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-2xs ${currentRoleInfo.color} border-transparent hover:opacity-95`}
              >
                <RoleIcon className="w-3.5 h-3.5" />
                <span>{currentRoleInfo.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${roleDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-slate-800 space-y-1">
                  <div className="px-3.5 py-1.5 border-b border-slate-100 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {isNp ? 'रोल तथा लगइन प्यानल' : 'Guest & Role Navigation'}
                    </p>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                      {currentRole}
                    </span>
                  </div>

                  {/* GUEST FEATURE OPTION WITH GOOGLE LOGIN EMBEDDED */}
                  <div className={`p-2 rounded-xl mx-2 transition-colors ${currentRole === 'guest' ? 'bg-emerald-50/70 border border-emerald-200' : 'bg-slate-50/50 hover:bg-slate-100'}`}>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          switchRole('guest');
                          setActiveTab('home');
                          setRoleDropdownOpen(false);
                        }}
                        title={isNp ? 'अतिथि ब्राउजिङ मोडमा स्विच गर्नुहोस्' : 'Switch to Guest Browsing Mode'}
                        className="flex items-center space-x-2 text-left flex-1"
                      >
                        <User className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{isNp ? 'अतिथि मोड (Guest Explorer)' : 'Guest Explorer'}</p>
                          <p className="text-[10px] text-slate-500">{isNp ? 'पब्लिक भ्यु तथा पाठ्यक्रम अध्ययन' : 'Public course browsing'}</p>
                        </div>
                      </button>
                    </div>

                    {/* Integrated Google Login Button inside Guest Dropdown */}
                    <button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setRoleDropdownOpen(false);
                      }}
                      title={isNp ? 'गुगल मार्फत गेस्ट/विद्यार्थी लगइन गर्नुहोस्' : 'Google Sign In for Guest'}
                      className="w-full mt-2 py-1.5 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center space-x-1.5 shadow-2xs transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isNp ? 'गुगल लगइन (Google Sign In)' : 'Sign in with Google'}</span>
                    </button>
                  </div>

                  {/* Instructor Panel Option */}
                  <button
                    onClick={() => {
                      switchRole('instructor');
                      setActiveTab('instructor_panel');
                      setRoleDropdownOpen(false);
                    }}
                    title={isNp ? 'शिक्षक प्यानलमा जानुहोस्' : 'Switch to Teacher / Instructor Panel'}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center space-x-2.5 hover:bg-amber-50 transition-colors ${
                      currentRole === 'instructor' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-600'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <p className="text-slate-900 text-xs font-bold">{isNp ? 'शिक्षक प्यानल (Teacher Panel)' : 'Teacher / Instructor Panel'}</p>
                      <p className="text-[10px] text-slate-400">{isNp ? 'पोस्ट तथा कोर्स व्यवस्थापन' : 'Post updates, manage content'}</p>
                    </div>
                  </button>

                  {/* Admin Panel Option */}
                  <button
                    onClick={() => {
                      switchRole('admin');
                      setActiveTab('admin_panel');
                      setRoleDropdownOpen(false);
                    }}
                    title={isNp ? 'प्रणाली एडमिन प्यानलमा जानुहोस्' : 'Switch to System Admin Panel'}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center space-x-2.5 hover:bg-indigo-50 transition-colors ${
                      currentRole === 'admin' ? 'bg-indigo-50 text-indigo-900 font-bold' : 'text-slate-600'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div>
                      <p className="text-slate-900 text-xs font-bold">{isNp ? 'एडमिन प्यानल (Admin Dashboard)' : 'System Admin Panel'}</p>
                      <p className="text-[10px] text-slate-400">{isNp ? 'पूर्ण व्यवस्थापन र अधिकार' : 'Full site control & analytics'}</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Account Avatar / Auth Trigger */}
            {currentUser ? (
              <div className="flex items-center space-x-2 pl-1.5 border-l border-slate-200">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-8 h-8 rounded-lg border border-indigo-200 object-cover" 
                  title={`${currentUser.name} (${currentUser.role})`}
                />
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title={isNp ? 'खाताबाट लगआउट गर्नुहोस्' : 'Sign Out of Account'}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                title={isNp ? 'गुगल लगइन विन्डो खोल्नुहोस्' : 'Open Google Auth Modal'}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-2xs transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{isNp ? 'लगइन' : 'Login'}</span>
              </button>
            )}

          </div>

          {/* Mobile Navigation & Controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => {
                if (language === 'en') setLanguage('np');
                else if (language === 'np') setLanguage('zh');
                else setLanguage('en');
              }}
              title="Switch Language (EN / NP / 中文)"
              className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200 flex items-center space-x-1"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>{language === 'en' ? 'EN' : language === 'np' ? 'NP' : 'ZH'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              title={isNp ? 'मेनु खोल्नुहोस्/बन्द गर्नुहोस्' : 'Toggle Navigation Menu'}
              className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                  className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-3">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              {isNp ? 'रोल ड्रपडाउन चयन' : 'Working Panel Dropdown'}
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  switchRole('guest');
                  setActiveTab('home');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-xs font-bold rounded-xl text-center border ${
                  currentRole === 'guest' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 text-slate-600 border-slate-200'
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
                className={`py-2 text-xs font-bold rounded-xl text-center border ${
                  currentRole === 'instructor' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-100 text-slate-600 border-slate-200'
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
                className={`py-2 text-xs font-bold rounded-xl text-center border ${
                  currentRole === 'admin' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                {isNp ? 'एडमिन' : 'Admin'}
              </button>
            </div>

            {currentUser ? (
              <div className="flex items-center justify-between p-3 bg-slate-100 border border-slate-200 rounded-xl">
                <div className="flex items-center space-x-3">
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-500">{currentUser.email}</p>
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
                className="w-full flex items-center justify-center space-x-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm"
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


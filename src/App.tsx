import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Public/Hero';
import { DailyPhotoCarousel } from './components/Public/DailyPhotoCarousel';
import { CourseCatalog } from './components/Public/CourseCatalog';
import { InstructionalFeed } from './components/Public/InstructionalFeed';
import { InstructorsSection } from './components/Public/InstructorsSection';
import { AboutSection } from './components/Public/AboutSection';
import { ContactSection } from './components/Public/ContactSection';
import { InstructorDashboard } from './components/Instructor/InstructorDashboard';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { MemberPortal } from './components/Member/MemberPortal';
import { AITutorChatbot } from './components/Common/AITutorChatbot';
import { GoogleAuthModal } from './components/Auth/GoogleAuthModal';
import { VideoModal } from './components/Common/VideoModal';
import { VisualEditorToolbar } from './components/Admin/VisualEditorToolbar';
import { ShieldAlert, LogIn, ArrowLeft, UserCheck } from 'lucide-react';

interface ProtectedGuardProps {
  allowedRoles: string[];
  requiredRoleName: string;
  onGoHome: () => void;
  children: React.ReactNode;
}

const ProtectedGuard: React.FC<ProtectedGuardProps> = ({
  allowedRoles,
  requiredRoleName,
  onGoHome,
  children
}) => {
  const { currentRole, currentUser, setIsAuthModalOpen, language } = useApp();
  const isNp = language === 'np';

  const isAllowed = allowedRoles.includes(currentRole);

  if (!isAllowed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-rose-50 text-rose-600 border border-rose-200 rounded-3xl flex items-center justify-center mx-auto shadow-sm animate-pulse">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900">
              {isNp ? 'सुरक्षा प्रतिबन्ध: लगइन आवश्यक' : 'Protected Route: Authentication Required'}
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isNp 
                ? `यस क्षेत्रमा प्रवेश गर्न ${requiredRoleName} पहुँच अधिकार भएको गुगल खाता आवश्यक छ।`
                : `This sensitive area is restricted to verified ${requiredRoleName} accounts.`}
            </p>
          </div>

          {currentUser && (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
              <span className="text-slate-500 font-semibold">{isNp ? 'हालको खाता:' : 'Current Session:'}</span>
              <span className="font-bold text-slate-900 font-mono flex items-center space-x-1">
                <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>{currentUser.email} ({currentRole.toUpperCase()})</span>
              </span>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-indigo-200 flex items-center justify-center space-x-2 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>{isNp ? 'गुगल खाता मार्फत साइन इन गर्नुहोस्' : `Sign In as ${requiredRoleName} via Google`}</span>
            </button>

            <button
              onClick={onGoHome}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isNp ? 'मुख्य पृष्ठमा फर्कनुहोस्' : 'Return to Home'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [preselectedCourseTitle, setPreselectedCourseTitle] = useState<string>('');
  const { switchRole, setIsAuthModalOpen } = useApp();

  const handleSelectCourseForInquiry = (courseTitle: string) => {
    setPreselectedCourseTitle(courseTitle);
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPublisher = () => {
    setActiveTab('instructor_panel');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-600 selection:text-white flex flex-col justify-between">
      
      <div>
        {/* Top Navbar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Main Body Content */}
        <main>
          {activeTab === 'home' && (
            <>
              <Hero setActiveTab={setActiveTab} />
              <DailyPhotoCarousel />
              <InstructionalFeed onOpenPublisher={handleOpenPublisher} />
              <CourseCatalog onSelectCourseForInquiry={handleSelectCourseForInquiry} />
              <InstructorsSection />
              <AboutSection />
              <ContactSection preselectedCourseTitle={preselectedCourseTitle} />
            </>
          )}

          {activeTab === 'courses' && (
            <CourseCatalog onSelectCourseForInquiry={handleSelectCourseForInquiry} />
          )}

          {activeTab === 'feed' && (
            <>
              <DailyPhotoCarousel />
              <InstructionalFeed onOpenPublisher={handleOpenPublisher} />
            </>
          )}

          {activeTab === 'instructors' && (
            <InstructorsSection />
          )}

          {activeTab === 'about' && (
            <AboutSection />
          )}

          {activeTab === 'contact' && (
            <ContactSection preselectedCourseTitle={preselectedCourseTitle} />
          )}

          {activeTab === 'member' && (
            <MemberPortal onNavigateToCourse={() => setActiveTab('courses')} />
          )}

          {activeTab === 'instructor_panel' && (
            <ProtectedGuard 
              allowedRoles={['admin', 'instructor']} 
              requiredRoleName="Instructor or Admin" 
              onGoHome={() => setActiveTab('home')}
            >
              <InstructorDashboard />
            </ProtectedGuard>
          )}

          {activeTab === 'admin_panel' && (
            <ProtectedGuard 
              allowedRoles={['admin']} 
              requiredRoleName="Administrator" 
              onGoHome={() => setActiveTab('home')}
            >
              <AdminDashboard />
            </ProtectedGuard>
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Global Lightboxes, Visual Editor & Modals */}
      <VisualEditorToolbar />
      <GoogleAuthModal />
      <VideoModal />
      <AITutorChatbot onNavigateTab={(tab) => setActiveTab(tab)} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}


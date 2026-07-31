import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Public/Hero';
import { CourseCatalog } from './components/Public/CourseCatalog';
import { InstructionalFeed } from './components/Public/InstructionalFeed';
import { InstructorsSection } from './components/Public/InstructorsSection';
import { AboutSection } from './components/Public/AboutSection';
import { ContactSection } from './components/Public/ContactSection';
import { InstructorDashboard } from './components/Instructor/InstructorDashboard';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { GoogleAuthModal } from './components/Auth/GoogleAuthModal';
import { VideoModal } from './components/Common/VideoModal';
import { GuideModal } from './components/Common/GuideModal';

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
            <InstructionalFeed onOpenPublisher={handleOpenPublisher} />
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

          {activeTab === 'instructor_panel' && (
            <InstructorDashboard />
          )}

          {activeTab === 'admin_panel' && (
            <AdminDashboard />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Global Lightboxes & Modals */}
      <GoogleAuthModal />
      <VideoModal />
      <GuideModal />
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

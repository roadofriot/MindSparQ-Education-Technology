import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  UserCheck, 
  GraduationCap, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  Send, 
  Clock, 
  CheckCircle2, 
  User, 
  Lock, 
  Globe 
} from 'lucide-react';

export const GoogleAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    loginWithGoogle,
    instructors,
    teacherRequests,
    submitTeacherLoginRequest,
    language
  } = useApp();
  const isNp = language === 'np';

  const [portalTab, setPortalTab] = useState<'member' | 'teacher' | 'admin' | 'guest'>('member');
  const [showTeacherRequestForm, setShowTeacherRequestForm] = useState(false);

  // Teacher request form state
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqDesignation, setReqDesignation] = useState('');
  const [reqBio, setReqBio] = useState('');
  const [requestSubmittedSuccess, setRequestSubmittedSuccess] = useState(false);

  // Custom email state
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmitTeacherRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqName.trim() || !reqEmail.trim()) return;

    submitTeacherLoginRequest({
      name: reqName.trim(),
      email: reqEmail.trim(),
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      designation: reqDesignation.trim() || 'Teacher / Instructor',
      bio: reqBio.trim() || 'Applied for MindSparQ Teacher Instruction Access'
    });

    setRequestSubmittedSuccess(true);
    setReqName('');
    setReqEmail('');
    setReqDesignation('');
    setReqBio('');
  };

  const handleDirectGoogleLogin = () => {
    loginWithGoogle(portalTab === 'admin' ? 'admin' : portalTab === 'teacher' ? 'instructor' : 'student');
  };

  const handleCustomEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const email = customEmail.trim() || 'user.google@gmail.com';
    const name = customName.trim() || email.split('@')[0];
    const isAdmin = portalTab === 'admin' || email.toLowerCase() === 'roadofriot@gmail.com' || email.toLowerCase().includes('admin');
    const role = portalTab === 'teacher' ? 'instructor' : isAdmin ? 'admin' : 'student';

    loginWithGoogle({
      id: `user-google-${Date.now()}`,
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      role
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative text-slate-100 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsAuthModalOpen(false);
            setShowTeacherRequestForm(false);
            setRequestSubmittedSuccess(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 p-2.5 mx-auto shadow-md flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-extrabold text-white tracking-tight">
            {isNp ? 'लगइन तथा गेस्ट एक्सप्लोरर पोर्टल्स' : 'Unified Login & Guest Explorer Portal'}
          </h3>
          <p className="text-xs text-slate-400">
            {isNp
              ? 'गुगल साईन-इन, शिक्षक प्यानल, वा अतिथि माध्यमबाट सिधै प्रवेश गर्नुहोस्'
              : 'Direct Google Auth, specialized role portals, or instant guest access'}
          </p>
        </div>

        {/* Integrated Navigation Tabs */}
        <div className="grid grid-cols-4 bg-slate-950 p-1 rounded-2xl border border-slate-800 gap-1 text-[11px] font-bold">
          <button
            onClick={() => {
              setPortalTab('member');
              setShowTeacherRequestForm(false);
            }}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1 ${
              portalTab === 'member'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{isNp ? 'सदस्य' : 'Member'}</span>
          </button>

          <button
            onClick={() => {
              setPortalTab('teacher');
              setShowTeacherRequestForm(false);
            }}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1 ${
              portalTab === 'teacher'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{isNp ? 'शिक्षक' : 'Teacher'}</span>
          </button>

          <button
            onClick={() => {
              setPortalTab('admin');
              setShowTeacherRequestForm(false);
            }}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1 ${
              portalTab === 'admin'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isNp ? 'एडमिन' : 'Admin'}</span>
          </button>

          <button
            onClick={() => {
              setPortalTab('guest');
              setShowTeacherRequestForm(false);
            }}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1 ${
              portalTab === 'guest'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{isNp ? 'अतिथि' : 'Guest'}</span>
          </button>
        </div>

        {/* PRIMARY DIRECT GOOGLE SIGN-IN BUTTON */}
        <div className="space-y-3">
          <button
            onClick={handleDirectGoogleLogin}
            className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs flex items-center justify-center gap-3 shadow-lg transition transform active:scale-98"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>
              {isNp
                ? 'गुगलद्वारा सिधै साइन-इन गर्नुहोस् (Direct Google Sign-In)'
                : 'Continue Directly with Google Account'}
            </span>
            <ArrowRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-3 text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">
            {isNp ? 'वा भूमिका अनुसार साइन-इन गर्नुहोस्' : 'Or Select Specific Role Login'}
          </span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* TAB CONTENT: GUEST EXPLORER */}
        {portalTab === 'guest' && (
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Compass className="w-4 h-4" />
              <span>{isNp ? 'गेस्ट एक्सप्लोरर माध्यम (Instant Guest Mode)' : 'Guest Explorer Access'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isNp
                ? 'बिना पासवर्ड सम्पूर्ण कोर्स क्याटलग, ब्लग, र फोटो स्लाइडर अन्वेषण गर्नुहोस्।'
                : 'Explore course previews, blog publications, and educational photo galleries without full account setup.'}
            </p>
            <button
              onClick={() => loginWithGoogle('guest')}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <span>{isNp ? 'अतिथि रूपमा अन्वेषण सुरु गर्नुहोस्' : 'Explore Platform as Guest'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* TAB CONTENT: MEMBER / STUDENT LOGIN */}
        {portalTab === 'member' && (
          <form onSubmit={handleCustomEmailLogin} className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>{isNp ? 'विद्यार्थी तथा सदस्य पोर्टल' : 'Student & Member Account Portal'}</span>
            </div>

            <div className="space-y-2 text-xs">
              <input
                type="email"
                placeholder="Google / Gmail Email Address"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                placeholder="Full Name (Optional)"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl transition"
            >
              {isNp ? 'सदस्य खाता प्रवेश' : 'Enter Member Portal'}
            </button>
          </form>
        )}

        {/* TAB CONTENT: TEACHER PANEL LOGIN */}
        {portalTab === 'teacher' && (
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <UserCheck className="w-4 h-4 text-indigo-400" />
                <span>{isNp ? 'शिक्षक तथा इन्स्ट्रक्टर प्यानल' : 'Teacher Instruction Panel'}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowTeacherRequestForm(!showTeacherRequestForm)}
                className="text-[11px] font-bold text-indigo-400 hover:underline"
              >
                {showTeacherRequestForm ? 'Back' : '+ Request Access'}
              </button>
            </div>

            {requestSubmittedSuccess && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{isNp ? 'शिक्षक आवेदन दर्ता भयो! एडमिन स्वीकृतिको प्रतिक्षामा छ।' : 'Teacher request submitted! Pending admin approval.'}</span>
              </div>
            )}

            {!showTeacherRequestForm ? (
              <div className="space-y-2">
                <p className="text-[11px] text-slate-400">
                  {isNp ? 'स्वीकृत शिक्षक खाता छान्नुहोस्:' : 'Select approved teacher profile:'}
                </p>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {instructors.map((inst) => (
                    <button
                      key={inst.id}
                      onClick={() => loginWithGoogle('instructor', inst.id)}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 flex items-center justify-between text-left transition group"
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={inst.avatar} alt={inst.name} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-bold text-slate-200 group-hover:text-indigo-300">{inst.name}</p>
                          <p className="text-[10px] text-slate-400">{inst.email}</p>
                        </div>
                      </div>
                      <UserCheck className="w-4 h-4 text-indigo-400" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitTeacherRequest} className="space-y-2.5 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={reqName}
                  onChange={(e) => setReqName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={reqEmail}
                  onChange={(e) => setReqEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Designation / Specialty"
                  value={reqDesignation}
                  onChange={(e) => setReqDesignation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Teacher Request</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB CONTENT: ADMIN CMS LOGIN */}
        {portalTab === 'admin' && (
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{isNp ? 'माइंडस्पार्क इन्टरप्राइज एडमिन लगइन' : 'MindSparQ Enterprise Admin CMS'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isNp
                ? 'एडमिन लगइनले पाठ्यक्रम, ब्लग, दैनिक फोटो, शिक्षक अनुरोध र सुपाबेस रियल-टाइम डेटा व्यवस्थापन अधिकार दिन्छ।'
                : 'Grants master control over course catalog, broad broadcasts, teacher approvals, and Supabase database.'}
            </p>
            <button
              onClick={() => loginWithGoogle('admin')}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-xs rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isNp ? 'एडमिन ड्यासबोर्डमा प्रवेश गर्नुहोस्' : 'Login as Master System Admin'}</span>
            </button>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-2 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500">
            MindSparQ Auth & Guest Portal • Powered by Supabase & Google Cloud
          </p>
        </div>

      </div>
    </div>
  );
};

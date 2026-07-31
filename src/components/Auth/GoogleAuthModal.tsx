import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, UserCheck, CheckCircle2, Clock, Send, AlertCircle, Sparkles } from 'lucide-react';

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

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqDesignation, setReqDesignation] = useState('');
  const [reqBio, setReqBio] = useState('');
  const [requestSubmittedSuccess, setRequestSubmittedSuccess] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmitRequest = (e: React.FormEvent) => {
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

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-xl relative text-slate-900 max-h-[90vh] overflow-y-auto">
        
        {/* Close */}
        <button
          onClick={() => {
            setIsAuthModalOpen(false);
            setShowRequestForm(false);
            setRequestSubmittedSuccess(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Google Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 p-2.5 mx-auto shadow-sm flex items-center justify-center">
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

          <h3 className="text-lg font-bold text-slate-900">
            {isNp ? 'गुगल लगइन (Sign in with Google)' : 'Sign in with Google'}
          </h3>
          <p className="text-xs text-slate-500">
            {isNp
              ? 'माइंडस्पार्क एजुकेशन एण्ड टेक्नोलोजी ड्यासबोर्ड तथा गेस्ट/विद्यार्थी सुविधाका लागि साइन-इन गर्नुहोस्।'
              : 'Choose an account or request teacher panel login access'}
          </p>
        </div>

        {/* Teacher Request Confirmation Alert */}
        {requestSubmittedSuccess && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs space-y-1.5 animate-fadeIn">
            <div className="flex items-center space-x-2 font-bold text-amber-800">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{isNp ? 'शिक्षक लगइन अनुरोध दर्ता भयो!' : 'Teacher Login Request Submitted!'}</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {isNp
                ? 'तपाईंको शिक्षक लगइन अनुरोध एडमिन समक्ष पठाइएको छ। एडमिनले स्वीकृत गरेपछि शिक्षक इन्स्ट्रक्सन प्यानल स्वतः खुल्नेछ।'
                : 'Your login request has been sent to MindSparQ Admin. Upon approval, your Teacher Instruction Panel will be unlocked.'}
            </p>
          </div>
        )}

        {/* Toggle between standard account selection & custom Google email login & teacher request form */}
        {!showRequestForm ? (
          <div className="space-y-3 pt-1">

            {/* Custom Google Account Sign-In Form */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <p className="text-[11px] font-bold text-slate-700 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>{isNp ? 'व्यक्तिगत गुगल खाताद्वारा लगइन गर्नुहोस्' : 'Sign In with Any Google Account'}</span>
              </p>
              
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="e.g. roadofriot@gmail.com or user@gmail.com"
                  id="customGoogleEmailInput"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Full Name (e.g. Erish Joshi)"
                    id="customGoogleNameInput"
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  
                  <button
                    type="button"
                    onClick={() => {
                      const emailEl = document.getElementById('customGoogleEmailInput') as HTMLInputElement;
                      const nameEl = document.getElementById('customGoogleNameInput') as HTMLInputElement;
                      const email = emailEl?.value.trim() || 'user.google@gmail.com';
                      const name = nameEl?.value.trim() || email.split('@')[0];
                      const isAdmin = email.toLowerCase() === 'roadofriot@gmail.com' || email.toLowerCase().includes('admin');
                      
                      loginWithGoogle({
                        id: `user-google-${Date.now()}`,
                        name: name,
                        email: email,
                        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
                        role: isAdmin ? 'admin' : 'student'
                      });
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shrink-0 shadow-sm"
                  >
                    {isNp ? 'लगइन' : 'Sign In'}
                  </button>
                </div>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-2 text-[10px] text-slate-400 font-bold uppercase">{isNp ? 'वा द्रुत खाता छान्नुहोस्' : 'Or Select Quick Account'}</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>
            
            {/* Guest / Student Option */}
            <button
              onClick={() => loginWithGoogle('guest')}
              className="w-full p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 hover:border-emerald-600 flex items-center justify-between text-left transition-all group"
            >
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80"
                  alt="Guest Google Account"
                  className="w-9 h-9 rounded-full object-cover border border-emerald-500"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                    {isNp ? 'अतिथि / विद्यार्थी खाता (Guest Google Auth)' : 'Guest Explorer / Student Account'}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">guest.explorer@gmail.com</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-600 text-white text-[10px] font-bold">
                GUEST
              </span>
            </button>

            {/* Admin Account Option */}
            <button
              onClick={() => loginWithGoogle('admin')}
              className="w-full p-3 rounded-2xl bg-indigo-50/50 border border-indigo-200 hover:border-indigo-600 flex items-center justify-between text-left transition-all group"
            >
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&auto=format&fit=crop&q=80"
                  alt="Admin Google Account"
                  className="w-9 h-9 rounded-full object-cover border border-indigo-500"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">MindSparQ System Admin</p>
                  <p className="text-[10px] text-slate-500 font-mono">roadofriot@gmail.com</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-indigo-600 text-white text-[10px] font-bold">
                ADMIN
              </span>
            </button>

            {/* Verified Instructor Accounts */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {isNp ? 'स्वीकृत शिक्षक खाताहरू' : 'Approved Teacher Accounts'}
                </p>
                <button
                  type="button"
                  onClick={() => setShowRequestForm(true)}
                  className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center space-x-1"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{isNp ? '+ शिक्षक अनुरोध पठाउनुहोस्' : '+ Request Teacher Access'}</span>
                </button>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {instructors.map((inst) => (
                  <button
                    key={inst.id}
                    onClick={() => loginWithGoogle('instructor', inst.id)}
                    className="w-full p-2.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-600 flex items-center justify-between text-left transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={inst.avatar}
                        alt={inst.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-300"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">{inst.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{inst.email}</p>
                      </div>
                    </div>
                    <UserCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Pending Requests List */}
            {teacherRequests.length > 0 && (
              <div className="pt-2 border-t border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-amber-500" />
                  <span>{isNp ? 'प्रतिक्षित शिक्षक लगइन अनुरोधहरू' : 'Pending Teacher Login Requests'}</span>
                </p>
                <div className="space-y-1.5 max-h-28 overflow-y-auto">
                  {teacherRequests.map(req => (
                    <div key={req.id} className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800 text-[11px]">{req.name}</p>
                        <p className="text-[10px] text-slate-500">{req.email}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        req.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                        req.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                        'bg-amber-100 text-amber-700 animate-pulse'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Request Teacher Access Form */
          <form onSubmit={handleSubmitRequest} className="space-y-3 pt-1 text-xs">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <span>{isNp ? 'शिक्षक लगइन अनुरोध फारम' : 'Teacher Access Application'}</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowRequestForm(false)}
                className="text-slate-500 hover:text-slate-800 underline font-semibold text-[11px]"
              >
                {isNp ? 'रद्द गर्नुहोस्' : 'Back to login'}
              </button>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">{isNp ? 'पूरा नाम *' : 'Full Name *'}</label>
              <input
                type="text"
                required
                value={reqName}
                onChange={(e) => setReqName(e.target.value)}
                placeholder="e.g. Er. Erish Joshi"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">{isNp ? 'ईमेल *' : 'Email Address *'}</label>
              <input
                type="email"
                required
                value={reqEmail}
                onChange={(e) => setReqEmail(e.target.value)}
                placeholder="e.g. teacher@mindsparq.edu.np"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">{isNp ? 'पदमान / विषय (Designation)' : 'Designation / Specialty'}</label>
              <input
                type="text"
                value={reqDesignation}
                onChange={(e) => setReqDesignation(e.target.value)}
                placeholder="e.g. Senior AI & Robotics Instructor"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">{isNp ? 'संक्षिप्त विवरण (Bio)' : 'Short Bio / Qualifications'}</label>
              <textarea
                rows={2}
                value={reqBio}
                onChange={(e) => setReqBio(e.target.value)}
                placeholder="Describe your expertise and teaching background..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isNp ? 'एडमिनलाई अनुरोध पठाउनुहोस्' : 'Submit Access Request to Admin'}</span>
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-500">
            {isNp
              ? 'नोट: लगइन भएपछि आफ्नो भूमिका अनुरूप प्रोफाइल र सुविधाहरू अनलक हुन्छन्।'
              : 'Logging in authenticates your role and unlocks specialized tools.'}
          </p>
        </div>

      </div>
    </div>
  );
};


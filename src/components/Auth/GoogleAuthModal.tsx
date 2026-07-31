import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, UserCheck, CheckCircle2 } from 'lucide-react';

export const GoogleAuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithGoogle, instructors, language } = useApp();
  const isNp = language === 'np';

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-xl relative text-slate-900">
        
        {/* Close */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
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
              ? 'माइन्डस्प्याक एजुकेशन एण्ड टेक्नोलोजी शिक्षक तथा एडमिन ड्यासबोर्ड पहुँचका लागि।'
              : 'Choose an account to sign in to Mindspack Education & Technology Platform'}
          </p>
        </div>

        {/* Account Selection Options */}
        <div className="space-y-3 pt-2">
          
          {/* Admin Account Option */}
          <button
            onClick={() => loginWithGoogle('admin')}
            className="w-full p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-200 hover:border-indigo-600 flex items-center justify-between text-left transition-all group"
          >
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&auto=format&fit=crop&q=80"
                alt="Admin Google Account"
                className="w-9 h-9 rounded-full object-cover border border-indigo-500"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">Mindspack System Admin</p>
                <p className="text-[10px] text-slate-500 font-mono">roadofriot@gmail.com</p>
              </div>
            </div>
            <span className="px-2 py-1 rounded bg-indigo-600 text-white text-[10px] font-bold">
              ADMIN
            </span>
          </button>

          {/* Instructor Account Options */}
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center pt-2">
            {isNp ? 'शिक्षक खाताहरू (Instructor Accounts)' : 'Instructor Google Accounts'}
          </p>

          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {instructors.map((inst) => (
              <button
                key={inst.id}
                onClick={() => loginWithGoogle('instructor', inst.id)}
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-600 flex items-center justify-between text-left transition-all group"
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

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-500">
            {isNp
              ? 'नोट: लगइन भएपछि शिक्षकले प्रोफाइल सम्पादन तथा सामग्री पोस्ट गर्ने सुविधा प्राप्त गर्नुहुनेछ।'
              : 'Logging in authorizes profile customization & direct content publishing.'}
          </p>
        </div>

      </div>
    </div>
  );
};

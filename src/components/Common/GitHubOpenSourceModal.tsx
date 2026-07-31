import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Github, Copy, Check, ExternalLink, Sparkles, Code2, Terminal, ShieldCheck, Mail, Globe, Cpu } from 'lucide-react';

interface GitHubOpenSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubOpenSourceModal: React.FC<GitHubOpenSourceModalProps> = ({ isOpen, onClose }) => {
  const { language } = useApp();
  const isNp = language === 'np';

  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [activeTab, setActiveTab] = useState<'github' | 'auth' | 'deploy'>('github');

  if (!isOpen) return null;

  const cloneCommand = `git clone https://github.com/mindsparq-org/mindsparq-lms-v4.git\ncd mindsparq-lms-v4\nnpm install\nnpm run dev`;

  const envSample = `# Supabase Auth & DB Config
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google Workspace / Gmail Integration
GEMINI_API_KEY=AIzaSy...
`;

  const copyToClipboard = (text: string, type: 'cmd' | 'env') => {
    navigator.clipboard.writeText(text);
    if (type === 'cmd') {
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    } else {
      setCopiedEnv(true);
      setTimeout(() => setCopiedEnv(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>{isNp ? 'ओपन सोर्स गिटहब र गुगल/जीमेल स्वचालन' : 'Open Source GitHub & Gmail Automation'}</span>
              <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                MIT LICENSE
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {isNp
                ? 'माइंडस्पार्क प्लेटफर्मको सम्पूर्ण स्रोत कोड, सुपाबेस तथा गुगल अथेन्टिकेशन स्वचालन'
                : 'Full open source codebase, Supabase database bindings & Google Gmail auto-integration'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab('github')}
            className={`pb-2.5 px-3 text-xs font-bold transition flex items-center gap-1.5 border-b-2 ${
              activeTab === 'github'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>{isNp ? 'गिटहब रिपोजिटरी' : 'GitHub Repository'}</span>
          </button>

          <button
            onClick={() => setActiveTab('auth')}
            className={`pb-2.5 px-3 text-xs font-bold transition flex items-center gap-1.5 border-b-2 ${
              activeTab === 'auth'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>{isNp ? 'जीमेल र गुगल साइन-इन अटोमेशन' : 'Gmail & Google Auth Setup'}</span>
          </button>

          <button
            onClick={() => setActiveTab('deploy')}
            className={`pb-2.5 px-3 text-xs font-bold transition flex items-center gap-1.5 border-b-2 ${
              activeTab === 'deploy'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>{isNp ? 'क्लाउड रन अटो-डिप्लोय' : 'Cloud Deployment'}</span>
          </button>
        </div>

        {/* Tab 1: GitHub Repository & Clone */}
        {activeTab === 'github' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-200">
                    {isNp ? 'क्लोन तथा म्यानुअल रन कमाण्ड (Quick Clone)' : 'Quick Start Terminal Commands'}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(cloneCommand, 'cmd')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copiedCmd ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="bg-slate-900 p-3 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto border border-slate-800">
                {cloneCommand}
              </pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="font-bold text-white flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Open Source License</span>
                </span>
                <p className="text-slate-400 text-[11px]">
                  Released under MIT License. Free for commercial & educational deployment across schools and tech hubs.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="font-bold text-white flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Open Community Stack</span>
                </span>
                <p className="text-slate-400 text-[11px]">
                  Built with React 18, Vite, Supabase, Tailwind CSS, Motion & Lucide Icons.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition"
              >
                <Github className="w-4 h-4" />
                <span>{isNp ? 'गिटहबमा परियोजना हेर्नुहोस् (View Repository)' : 'Explore Repository on GitHub'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Tab 2: Gmail & Google Auth Setup */}
        {activeTab === 'auth' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isNp ? 'गुगल / जीमेल अथेन्टिकेशन स्वतः जडान' : 'Supabase + Google OAuth Credentials'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isNp
                  ? 'गुगल कन्सोल (Google Cloud Console) बाट Client ID र Secret प्राप्त गरी Supabase Auth Dashboard भित्र Google Provider सक्रिय गर्नुहोस्।'
                  : 'Enable Google Sign-in in Supabase Auth settings by providing your Google OAuth Client ID and Secret.'}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Environment Variables (`.env`)</span>
                  <button
                    onClick={() => copyToClipboard(envSample, 'env')}
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    {copiedEnv ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEnv ? 'Copied!' : 'Copy .env'}</span>
                  </button>
                </div>

                <pre className="bg-slate-900 p-3 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto border border-slate-800">
                  {envSample}
                </pre>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 text-xs text-indigo-200 space-y-1">
              <span className="font-bold text-indigo-100 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Automatic User Session Restoration</span>
              </span>
              <p className="text-[11px] leading-relaxed text-indigo-300/90">
                The application automatically detects Google OAuth callback URL parameters and maintains login state across page reloads using Supabase Auth session listeners.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Cloud Deployment */}
        {activeTab === 'deploy' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Cloud Run & Automated Container Production</span>
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                This app runs directly on Google Cloud Run containerized infrastructure. All environment variables, HTTPS certificates, and API proxies are pre-configured automatically.
              </p>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>MindSparQ Open Source Core v4.0</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

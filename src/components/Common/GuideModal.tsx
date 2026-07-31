import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, ShieldCheck, Key, Database, Globe, Smartphone, Monitor, Server, FileText } from 'lucide-react';

export const GuideModal: React.FC = () => {
  const { isGuideModalOpen, setIsGuideModalOpen, language } = useApp();
  const isNp = language === 'np';

  if (!isGuideModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-xl relative text-slate-900">
        
        <button
          onClick={() => setIsGuideModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-slate-200 pb-4 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>TECHNICAL ROADMAP & ANALYSIS</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            {isNp 
              ? 'Mindspack Education & Technology: वेबसाइट तथा प्रणाली विकास विश्लेषण' 
              : 'Technical Roadmap & Requirements Analysis for Mindspack'}
          </h2>
          <p className="text-xs text-slate-500">
            {isNp 
              ? 'तपाईँको चाहना बमोजिम मोबाइल, ट्याब्लेट र डेस्कटप रेस्पोन्सिभ, गुगल लगइन, पावर एडमिन र शिक्षक प्यानलका लागि आवश्यक सम्पूर्ण पूर्वाधारहरूको विश्लेषण।'
              : 'Complete structural breakdown for responsive layouts, Google auth, power admin panels, and backend setup.'}
          </p>
        </div>

        {/* Content Section 1: Responsive UI */}
        <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <h3 className="text-sm font-bold text-indigo-700 flex items-center space-x-2">
            <Smartphone className="w-4 h-4" />
            <span>1. डिभाइस रेस्पोन्सिभ डिजाइन (Mobile, Tablet & Desktop Responsiveness)</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Mobile View (320px - 640px):</strong> Sticky top header, slide-out drawer navigation, 1-column responsive cards, touch-optimized (min 44px target buttons).</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Tablet View (640px - 1024px):</strong> 2-column bento grids, compact controls, fluid layout.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Desktop View (1024px+):</strong> Multi-column dashboard layouts, sticky sidebar controls, high-density analytical graphs, full resolution video preview modal.</span>
            </li>
          </ul>
        </div>

        {/* Content Section 2: Google Login Auth */}
        <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <h3 className="text-sm font-bold text-indigo-700 flex items-center space-x-2">
            <Key className="w-4 h-4" />
            <span>2. गुगल लगइन तथा युजर/शिक्षक प्यानल (Google OAuth & Instructor Profiles)</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>Google OAuth 2.0 Credentials:</strong> Google Cloud Console मा नयाँ project सिर्जना गरी <code>Client ID</code> र <code>Client Secret</code> प्राप्त गर्नुपर्छ।</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>Instructor Profile Sync:</strong> लगइन भएका प्रत्येक शिक्षकले आफ्नो बायो, शैक्षिक योग्यता, प्रविधि दक्षता र सामाजिक लिङ्कहरू सम्पादन गर्न पाउनेछन्।</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>Instructor Content Publisher:</strong> शिक्षकहरूले आफूले बनाएका भिडियो ट्यूटोरियल (YouTube/Vimeo embed), फोटो र पाठ्य सामग्री सिधै पोस्ट गर्न सक्छन्।</span>
            </li>
          </ul>
        </div>

        {/* Content Section 3: Power Admin Working Panel */}
        <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <h3 className="text-sm font-bold text-indigo-700 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4" />
            <span>3. एडमिन पावर वर्किङ प्यानल (Power Admin Working Control Panel)</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>Direct Public Broadcast:</strong> एडमिनले जुनसुकै बेला आधिकारिक सूचना, भिडियो, फोटो वा निर्देशनहरू सिधै मुख्य वेबसाइटको फिडमा प्रकाशित गर्न सक्ने सुविधा।</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>Instructor Directory & Approvals:</strong> नयाँ शिक्षकहरू थप्ने, प्रमाणिकरण गर्ने वा पहुँच नियन्त्रण गर्ने क्षमता।</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span><strong>Inquiries Management:</strong> सार्वजनिक फारमबाट आएका विद्यार्थी परामर्श सन्देशहरू हेर्ने र व्यवस्थापन गर्ने।</span>
            </li>
          </ul>
        </div>

        {/* Content Section 4: Database & Hosting */}
        <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-bold text-emerald-400 flex items-center space-x-2">
            <Database className="w-4 h-4" />
            <span>4. डाटाबेस, स्टोरेज तथा डोमेन (Database & Production Hosting Setup)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <h4 className="font-bold text-white mb-1">Database Options</h4>
              <p className="text-[11px] text-slate-400">Firebase Firestore or Cloud SQL (PostgreSQL) for storing users, courses, posts, inquiries securely.</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <h4 className="font-bold text-white mb-1">Domain & SSL</h4>
              <p className="text-[11px] text-slate-400">Custom Domain <code>mindspack.edu.np</code> or <code>.com</code> with SSL HTTPS encryption.</p>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div className="pt-2 text-right">
          <button
            onClick={() => setIsGuideModalOpen(false)}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg"
          >
            {isNp ? 'बुझियो, धन्यवाद!' : 'Close Setup Guide'}
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Globe, 
  Lock, 
  Sliders, 
  Save, 
  CheckCircle, 
  Building, 
  Share2, 
  Key, 
  AlertTriangle,
  Zap,
  Check
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { homeConfig, updateHomeConfig, language } = useApp();
  const isNp = language === 'np';

  const [activeTab, setActiveTab] = useState<'general' | 'integrations' | 'seo' | 'security' | 'rbac'>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // General Company Form
  const [companyName, setCompanyName] = useState('MindSparQ Education & Technology');
  const [logoUrl, setLogoUrl] = useState('https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&auto=format&fit=crop&q=80');
  const [primaryColor, setPrimaryColor] = useState('#4f46e5');
  const [contactEmail, setContactEmail] = useState('info@mindsparq.edu.np');
  const [contactPhone, setContactPhone] = useState('+977 1 4589230');
  const [locationAddress, setLocationAddress] = useState('Putalisadak, Kathmandu, Nepal');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Personal Project & Integration Settings
  const [googleClientId, setGoogleClientId] = useState('789123456789-mindsparq.apps.googleusercontent.com');
  const [googleClientSecret, setGoogleClientSecret] = useState('GOCSPX-mindsparq_secret_key');
  const [webhookUrl, setWebhookUrl] = useState('https://api.yourproject.com/v1/mindsparq-webhook');
  const [personalApiKey, setPersonalApiKey] = useState('mspq_live_99824018247192348712');
  const [allowedOrigins, setAllowedOrigins] = useState('https://mindsparq.edu.np, http://localhost:3000, http://localhost:5173');

  // Social Links
  const [socials, setSocials] = useState({
    facebook: 'https://facebook.com/mindsparqnepal',
    linkedin: 'https://linkedin.com/company/mindsparqnepal',
    youtube: 'https://youtube.com/@mindsparqnepal',
    github: 'https://github.com/mindsparq-edu'
  });

  // Security Toggles
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnforced: true,
    csrfProtection: true,
    xssSanitizer: true,
    sessionTimeoutMinutes: 60,
    rateLimitingEnabled: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Settings Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Settings className="w-5 h-5 text-indigo-600" />
            <span>{isNp ? 'प्रणाली तथा सेक्युरिटी सेटिङहरू' : 'Enterprise Settings & Security Governance'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage branding, SEO meta tags, RBAC permission matrices, and system security controls.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs rounded-xl flex items-center space-x-1 animate-fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Settings Saved Successfully!</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'general', label: 'General & Brand', icon: Building },
          { id: 'integrations', label: 'Personal Project & APIs', icon: Key },
          { id: 'seo', label: 'SEO & Social Cards', icon: Globe },
          { id: 'security', label: 'Security & CSRF', icon: Lock },
          { id: 'rbac', label: 'RBAC Access Matrix', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: GENERAL */}
      {activeTab === 'general' && (
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900">Company Identity & Branding</h3>
            <p className="text-slate-500 text-[11px]">Configure organizational metadata, brand colors, and contact info</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company / Entity Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Primary Brand Accent Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono uppercase font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Support Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">HQ Physical Location Address</label>
            <input
              type="text"
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div>
              <p className="font-bold text-amber-900 text-xs">System Maintenance Mode</p>
              <p className="text-[11px] text-amber-700">When enabled, public visitors will see a maintenance screen while admins retain full CMS access.</p>
            </div>
            <button
              type="button"
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                maintenanceMode
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-300'
              }`}
            >
              {maintenanceMode ? 'ENABLED (OFFLINE)' : 'DISABLED (ONLINE)'}
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: PERSONAL PROJECT & APIS */}
      {activeTab === 'integrations' && (
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm text-xs">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                <Key className="w-4 h-4 text-indigo-600" />
                <span>Personal Project Integration & Google OAuth Credentials</span>
              </h3>
              <p className="text-slate-500 text-[11px]">Connect MindSparQ CMS directly to your external backend, personal project, or Google Cloud OAuth credentials</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-[10px] font-bold">
              API STATUS: ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Google OAuth Client ID</label>
              <input
                type="text"
                value={googleClientId}
                onChange={(e) => setGoogleClientId(e.target.value)}
                placeholder="apps.googleusercontent.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Google OAuth Client Secret</label>
              <input
                type="password"
                value={googleClientSecret}
                onChange={(e) => setGoogleClientSecret(e.target.value)}
                placeholder="GOCSPX-..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">External Webhook Dispatch Endpoint</label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://yourdomain.com/api/webhook"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Personal API Secret Token</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={personalApiKey}
                  className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-xl font-mono text-[11px] text-slate-700"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newKey = `mspq_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
                    setPersonalApiKey(newKey);
                  }}
                  className="px-3 py-2.5 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 shrink-0 text-[11px]"
                >
                  Regenerate
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">CORS Allowed Domain Whitelist</label>
            <input
              type="text"
              value={allowedOrigins}
              onChange={(e) => setAllowedOrigins(e.target.value)}
              placeholder="https://example.com, http://localhost:3000"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
            />
            <p className="text-[10px] text-slate-400 mt-1">Separate multiple domain URLs with commas. These origins are allowed to query MindSparQ REST endpoints.</p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
            <h4 className="font-bold text-indigo-900 flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>Personal Project Rest API OpenAPI JSON Schema</span>
            </h4>
            <p className="text-[11px] text-indigo-800 leading-relaxed">
              MindSparQ provides full REST endpoints for pages, courses, instructors, and student certificates. Download the OpenAPI spec to auto-generate client SDKs for Node.js, Python, or Go in your personal project.
            </p>
            <button
              type="button"
              onClick={() => {
                const schema = {
                  openapi: "3.0.0",
                  info: { title: "MindSparQ CMS API", version: "1.0.0" },
                  endpoints: ["/api/cms/pages", "/api/cms/courses", "/api/cms/instructors", "/api/cms/students", "/api/auth/google"]
                };
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(schema, null, 2));
                const dl = document.createElement('a');
                dl.setAttribute("href", dataStr);
                dl.setAttribute("download", "mindsparq_openapi_schema.json");
                document.body.appendChild(dl);
                dl.click();
                dl.remove();
              }}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs"
            >
              Download OpenAPI Schema
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Personal Project Integrations</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: SEO & SOCIAL */}
      {activeTab === 'seo' && (
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900">Global SEO & Social Media Integrations</h3>
            <p className="text-slate-500 text-[11px]">Set global default metadata and official social media handles</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Facebook Page URL</label>
              <input
                type="url"
                value={socials.facebook}
                onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">LinkedIn Page URL</label>
              <input
                type="url"
                value={socials.linkedin}
                onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">YouTube Channel URL</label>
              <input
                type="url"
                value={socials.youtube}
                onChange={(e) => setSocials({ ...socials, youtube: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">GitHub Organization</label>
              <input
                type="url"
                value={socials.github}
                onChange={(e) => setSocials({ ...socials, github: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Social Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: SECURITY */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Security Controls & Audit Compliance</span>
            </h3>
            <p className="text-slate-500 text-[11px]">System hardening, session management, and automated threat mitigation</p>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'Two-Factor Authentication (2FA) Enforcement',
                desc: 'Require all Super Admins and Instructors to authenticate via 2FA',
                key: 'twoFactorEnforced'
              },
              {
                title: 'CSRF Token Validation',
                desc: 'Validate anti-forgery tokens on all CMS forms and POST payloads',
                key: 'csrfProtection'
              },
              {
                title: 'XSS Payload Sanitizer',
                desc: 'Automatically strip malicious script tags from instructional posts and page content',
                key: 'xssSanitizer'
              },
              {
                title: 'API Rate Limiting',
                desc: 'Cap submission requests to 100 requests per minute per IP address',
                key: 'rateLimitingEnabled'
              }
            ].map((sec) => (
              <div key={sec.key} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">{sec.title}</p>
                  <p className="text-[11px] text-slate-500">{sec.desc}</p>
                </div>
                <button
                  onClick={() => setSecuritySettings(prev => ({ ...prev, [sec.key]: !prev[sec.key as keyof typeof prev] }))}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                    securitySettings[sec.key as keyof typeof securitySettings]
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {securitySettings[sec.key as keyof typeof securitySettings] ? 'ACTIVE' : 'OFF'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: RBAC */}
      {activeTab === 'rbac' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900">Role-Based Access Control (RBAC) Matrix</h3>
            <p className="text-slate-500 text-[11px]">Permissions breakdown for every user role in the MindSparQ ecosystem</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Feature / Capability</th>
                  <th className="p-3 text-center">Super Admin</th>
                  <th className="p-3 text-center">Teacher / Instructor</th>
                  <th className="p-3 text-center">Student</th>
                  <th className="p-3 text-center">Guest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {[
                  { feature: 'CMS Pages & Global Settings', super: true, teacher: false, student: false, guest: false },
                  { feature: 'Publish Courses & Lessons', super: true, teacher: true, student: false, guest: false },
                  { feature: 'Direct Broadcast Feed Posts', super: true, teacher: true, student: false, guest: false },
                  { feature: 'Approve Teacher Access Requests', super: true, teacher: false, student: false, guest: false },
                  { feature: 'Enroll & Access Courses', super: true, teacher: true, student: true, guest: false },
                  { feature: 'Comment & Like Posts', super: true, teacher: true, student: true, guest: true },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-semibold text-slate-800">{row.feature}</td>
                    <td className="p-3 text-center">{row.super ? <Check className="w-4 h-4 text-emerald-600 mx-auto font-bold" /> : '—'}</td>
                    <td className="p-3 text-center">{row.teacher ? <Check className="w-4 h-4 text-emerald-600 mx-auto font-bold" /> : '—'}</td>
                    <td className="p-3 text-center">{row.student ? <Check className="w-4 h-4 text-emerald-600 mx-auto font-bold" /> : '—'}</td>
                    <td className="p-3 text-center">{row.guest ? <Check className="w-4 h-4 text-emerald-600 mx-auto font-bold" /> : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

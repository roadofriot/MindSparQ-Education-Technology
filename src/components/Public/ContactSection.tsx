import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Globe, 
  Share2, 
  Facebook, 
  Linkedin, 
  Youtube, 
  Instagram, 
  Video,
  ExternalLink,
  Map
} from 'lucide-react';

interface ContactSectionProps {
  preselectedCourseTitle?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedCourseTitle = '' }) => {
  const { courses, submitInquiry, language } = useApp();
  const isNp = language === 'np';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [courseInterested, setCourseInterested] = useState(preselectedCourseTitle || courses[0]?.title || '');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    submitInquiry({
      name,
      email,
      phone,
      courseInterested,
      message
    });

    setIsSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', color: 'bg-blue-600 hover:bg-blue-700 text-white', icon: Facebook },
    { name: 'LinkedIn', url: 'https://linkedin.com', color: 'bg-sky-700 hover:bg-sky-800 text-white', icon: Linkedin },
    { name: 'YouTube', url: 'https://youtube.com', color: 'bg-red-600 hover:bg-red-700 text-white', icon: Youtube },
    { name: 'Instagram', url: 'https://instagram.com', color: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white', icon: Instagram },
    { name: 'TikTok', url: 'https://tiktok.com', color: 'bg-slate-900 hover:bg-black text-white', icon: Video },
  ];

  return (
    <section className="py-16 bg-slate-50 text-slate-800 min-h-[600px] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                <Send className="w-3.5 h-3.5" />
                <span>{isNp ? 'सम्पर्क तथा परामर्श' : 'Admission Inquiry & Official Contact'}</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900">
                {isNp ? 'हामीसँग सम्पर्क गर्नुहोस्' : 'Contact MindSparQ Education'}
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {isNp
                  ? 'पाठ्यक्रम, स्कुल पार्टनरसिप, शिक्षक तालिम वा भर्ना प्रक्रिया सम्बन्धी कुनै पनि जिज्ञासा भएमा तलको फारम भर्नुहोस् वा हाम्रा आधिकारिक सामाजिक सञ्जालमा जोडिनुहोस्।'
                  : 'Have questions about school partnership programs, teacher capacity building (TOT), or student courses? Reach out to our team.'}
              </p>
            </div>

            {/* Verified Contact Details Grid with Placeholders */}
            <div className="space-y-3.5 pt-2">
              
              {/* Address */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start space-x-3.5 shadow-xs">
                <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{isNp ? 'ठेगाना (Address)' : 'Office Address'}</h4>
                  <p className="text-xs text-slate-700 font-medium">MindSparQ Education & Technology Pvt. Ltd.</p>
                  <p className="text-[11px] text-slate-500 italic">*(Actual office address required — Pokhara / Kathmandu / Dang)*</p>
                </div>
              </div>

              {/* Phone */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start space-x-3.5 shadow-xs">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{isNp ? 'फोन / ह्वाट्सएप' : 'Official Phone / WhatsApp'}</h4>
                  <p className="text-xs text-slate-700 font-medium font-mono">+977 9857058666 / +977 9706306382</p>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start space-x-3.5 shadow-xs">
                <Mail className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{isNp ? 'इमेल ठेगाना' : 'Official Email'}</h4>
                  <p className="text-xs text-slate-700 font-medium">info@mindsparq.edu.np / admission@mindsparq.edu.np</p>
                  <p className="text-[11px] text-slate-500 italic">*(Official email address required)*</p>
                </div>
              </div>

              {/* Website */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start space-x-3.5 shadow-xs">
                <Globe className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{isNp ? 'वेबसाइट' : 'Official Website'}</h4>
                  <p className="text-xs text-slate-700 font-medium font-mono">www.mindsparq.edu.np</p>
                  <p className="text-[11px] text-slate-500 italic">*(Official domain)*</p>
                </div>
              </div>

              {/* Hours */}
              <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center space-x-3 text-xs text-indigo-900 font-medium">
                <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900">{isNp ? 'कार्यालय समय (Business Hours)' : 'Business Hours'}</p>
                  <p>{isNp ? 'आइतबार – शुक्रबार, बिहान ९:०० देखि साँझ ५:०० सम्म' : 'Sunday – Friday, 9:00 AM – 5:00 PM'}</p>
                </div>
              </div>

            </div>

            {/* Social Media Channels (Facebook, LinkedIn, YouTube, Instagram, TikTok) */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                <Share2 className="w-4 h-4 text-indigo-600" />
                <span>{isNp ? 'हाम्रा आधिकारिक सामाजिक सञ्जालहरू' : 'Connect on Social Media'}</span>
              </div>
              <p className="text-[11px] text-slate-500">
                {isNp
                  ? 'माइंडस्पार्क सम्बन्धी नयाँ सूचना तथा अपडेटहरू प्राप्त गर्न तलका प्लेटफर्ममा जोडिनुहोस्:'
                  : 'Follow MindSparQ for latest announcements, workshop recordings, and updates:'}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-1">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold shadow-xs transition-transform hover:scale-105 ${s.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{s.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">
              {isNp ? 'पाठ्यक्रम भर्ना तथा परामर्श फारम' : 'Online Counseling & Inquiry Form'}
            </h3>

            {isSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold">{isNp ? 'फारम सफलतापूर्वक पठाइयो!' : 'Inquiry Submitted Successfully!'}</h4>
                <p className="text-xs text-emerald-700">
                  {isNp
                    ? 'तपाईँको आवेदन प्राप्त भएको छ। माइन्डस्पार्क प्रतिनिधिले छिट्टै सम्पर्क गर्नुहुनेछ।'
                    : 'Your message has been logged. Our academic advisors will reach out shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isNp ? 'तपाईँको पूरा नाम' : 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isNp ? 'उदा: समय बुढाथोकी क्षेत्री' : 'e.g., Aanand Sharma'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isNp ? 'सम्पर्क फोन नम्बर' : 'Phone Number'} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98XXXXXXXX"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isNp ? 'इमेल ठेगाना' : 'Email Address'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isNp ? 'रुचि भएको कार्यक्रम / विधा' : 'Interested Program Stream'}
                  </label>
                  <select
                    value={courseInterested}
                    onChange={(e) => setCourseInterested(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                    <option value="Academic Programs">Academic Programs (Abacus, Vedic Math, DMIT)</option>
                    <option value="Technology Programs">Technology Programs (AI, Robotics, STEM)</option>
                    <option value="School Solutions">School Partnership & Teacher Training (TOT)</option>
                    <option value="General Inquiry">General Counseling / Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isNp ? 'सन्देश वा जिज्ञासा' : 'Message or Questions'}
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isNp ? 'तपाईँका जिज्ञासाहरू यहाँ लेख्नुहोस्...' : 'Describe your questions...'}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isNp ? 'आवेदन पठाउनुहोस्' : 'Submit Inquiry'}</span>
                </button>

              </form>
            )}

            {/* Google Maps Location Embed Frame Placeholder */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                <Map className="w-4 h-4 text-indigo-600" />
                <span>{isNp ? 'Google Maps Location Embed' : 'Google Maps Location'}</span>
              </div>
              <div className="w-full h-40 bg-slate-100 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-4 text-slate-500 space-y-1">
                <MapPin className="w-8 h-8 text-indigo-500 stroke-[1.5]" />
                <p className="text-xs font-bold text-slate-700">{isNp ? 'Google Maps Location' : 'Google Maps Location'}</p>
                <p className="text-[11px] italic text-slate-500">*(Embed after office location is finalized)*</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

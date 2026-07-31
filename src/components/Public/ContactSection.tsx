import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Send, Phone, Mail, MapPin, CheckCircle, Clock } from 'lucide-react';

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

  return (
    <section className="py-16 bg-slate-50 text-slate-800 min-h-[600px] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
                <Send className="w-3.5 h-3.5" />
                <span>{isNp ? 'सम्पर्क तथा परामर्श' : 'Admission Inquiry & Contact'}</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900">
                {isNp ? 'हामीसँग सम्पर्क गर्नुहोस्' : 'Get in Touch with Mindspack'}
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {isNp
                  ? 'पाठ्यक्रम, छात्रवृत्ति वा भर्ना प्रक्रिया सम्बन्धी कुनै पनि जिज्ञासा भएमा तलको फर्म भर्नुहोस्। हाम्रा काउन्सिलरहरूले तुरुन्त सम्पर्क गर्नुहुनेछ।'
                  : 'Have questions about tech courses, fee structures, or batch timings? Fill out the inquiry form below.'}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start space-x-3.5 shadow-sm">
                <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{isNp ? 'ठेगाना' : 'Office Location'}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Mindspack Tech Hub, New Baneshwor / Tinkune, Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start space-x-3.5 shadow-sm">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{isNp ? 'फोन / ह्वाट्सएप' : 'Phone / WhatsApp'}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">+977 01-4105000 / +977 9841234567</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start space-x-3.5 shadow-sm">
                <Mail className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{isNp ? 'इमेल' : 'Email Address'}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">admission@mindspack.edu.np / info@mindspack.edu.np</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center space-x-3 text-xs text-indigo-800">
              <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>{isNp ? 'कार्यालय समय: आइतबार - शुक्रबार (बिहान ७:०० देखि साँझ ६:०० सम्म)' : 'Office Hours: Sun - Fri (7:00 AM - 6:00 PM)'}</span>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">
              {isNp ? 'पाठ्यक्रम भर्ना तथा परामर्श फारम' : 'Online Course Inquiry Form'}
            </h3>

            {isSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold">{isNp ? 'फारम सफलतापूर्वक पठाइयो!' : 'Inquiry Submitted Successfully!'}</h4>
                <p className="text-xs text-emerald-700">
                  {isNp
                    ? 'तपाईँको आवेदन एडमिन प्यानलमा प्राप्त भएको छ। माइन्डस्प्याक प्रतिनिधिले छिट्टै सम्पर्क गर्नुहुनेछ।'
                    : 'Your inquiry has been received in the Admin Dashboard. Our academic team will contact you shortly.'}
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
                      placeholder={isNp ? 'उदा: आयुष कार्की' : 'e.g., Aanand Sharma'}
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
                      placeholder="9841234567"
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
                    {isNp ? 'रुचि भएको पाठ्यक्रम' : 'Interested Tech Course'}
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
                    <option value="General Tech Inquiry">{isNp ? 'अन्य / सामान्य परामर्श' : 'General Tech Counseling'}</option>
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

          </div>

        </div>

      </div>
    </section>
  );
};

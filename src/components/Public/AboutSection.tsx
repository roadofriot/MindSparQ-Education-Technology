import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Target, 
  Eye, 
  Heart, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Building2, 
  CheckCircle2, 
  Rocket, 
  Users, 
  UserCheck, 
  Layers, 
  Award,
  Globe2,
  Brain,
  Lightbulb,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { language, instructors } = useApp();
  const isNp = language === 'np';

  const coreValues = [
    { nameEn: 'Innovation', nameNp: 'नवप्रवर्तन (Innovation)', descEn: 'Pioneering AI and modern tech in education.', descNp: 'शिक्षामा एआई र आधुनिक प्रविधिको प्रयोग।' },
    { nameEn: 'Excellence', nameNp: 'उत्कृष्टता (Excellence)', descEn: 'Striving for highest quality standards.', descNp: 'उच्चतम गुणस्तर र प्रभावकारिता।' },
    { nameEn: 'Integrity', nameNp: 'इमानदारिता (Integrity)', descEn: 'Ethical, transparent, and student-first values.', descNp: 'नैतिक र पारदर्शी पठनपाठन।' },
    { nameEn: 'Lifelong Learning', nameNp: 'निरन्तर सिकाइ (Lifelong Learning)', descEn: 'Fostering continuous growth for students & teachers.', descNp: 'निरन्तर ज्ञान र सीप अभिवृद्धि।' },
    { nameEn: 'Collaboration', nameNp: 'सहकार्य (Collaboration)', descEn: 'Partnering closely with schools and educators.', descNp: 'विद्यालय र शिक्षकहरूसँग सहकार्य।' },
    { nameEn: 'Student-Centered', nameNp: 'विद्यार्थी-केन्द्रित (Student-Centered)', descEn: 'Focusing on individual brain development and skills.', descNp: 'विद्यार्थीको क्षमता विकासमा ध्यान।' },
    { nameEn: 'Technology for Impact', nameNp: 'प्रविधिबाट सकारात्मक प्रभाव', descEn: 'Leveraging tech for real social educational change.', descNp: 'प्रविधिलाई सकारात्मक शिक्षामा उपयोग।' },
  ];

  const academicServices = [
    'Abacus Mental Math',
    'Vedic Mathematics',
    'Handwriting Improvement',
    'Public Speaking',
    'DMIT Assessment',
    'Teacher Training (TOT)',
    'Parent Motivation Program',
    'Student Motivation Program',
  ];

  const techServices = [
    'Artificial Intelligence (AI)',
    'Coding & Robotics',
    'STEM Education',
    'Digital Literacy',
    'Future Skills Training',
    'AI Productivity Tools',
  ];

  const schoolSolutions = [
    'School Partnership Programs',
    'Curriculum Support',
    'Teacher Capacity Building',
    'Student Development Programs',
    'Educational Consultancy',
  ];

  const whyChooseUs = [
    { titleEn: 'AI-Powered Learning', titleNp: 'एआई-सञ्चालित सिकाइ', descEn: 'Integrating smart AI tutors & Gemini tools.' },
    { titleEn: 'Experienced Trainers', titleNp: 'अनुभवी प्रशिक्षकहरू', descEn: 'Certified educators & tech specialists.' },
    { titleEn: 'Practical Approach', titleNp: 'व्याहारिक प्रयोगात्मक अभ्यास', descEn: 'Hands-on projects rather than pure theory.' },
    { titleEn: 'School Partnership Model', titleNp: 'विद्यालय साझेदारी मोडल', descEn: 'Collaborative curriculum integration.' },
    { titleEn: 'Modern Curriculum', titleNp: 'आधुनिक पाठ्यक्रम', descEn: 'Updated with future skills requirements.' },
    { titleEn: 'Industry-Relevant Skills', titleNp: 'उद्योग-उपयोगी सीपहरू', descEn: 'Prepares students for real-world tech.' },
    { titleEn: 'Student-Centered', titleNp: 'विद्यार्थी-केन्द्रित पद्धति', descEn: 'Personalized attention & DMIT analysis.' },
    { titleEn: 'Continuous Innovation', titleNp: 'निरन्तर नवप्रवर्तन', descEn: 'Constantly upgrading educational tools.' },
  ];

  const longTermGoals = [
    'AI Learning Platform',
    'LMS (Learning Management System)',
    'School ERP',
    'Teacher Portal',
    'Student Portal',
    'Parent Portal',
    'AI Tutor',
    'Research & Innovation Center',
    'International Partnerships',
  ];

  // Official MindSparQ Team Members
  const leadershipTeam = [
    { name: 'Samay Budhoki Chhetri', nameNp: 'समय बुढाथोकी क्षेत्री', role: 'Founder & CEO', roleNp: 'संस्थापक एवं Chief Executive Officer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
    { name: 'Dipisha Chhetri', nameNp: 'दिपिषा क्षेत्री', role: 'Co-Founder', roleNp: 'सह-संस्थापक', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80' },
    { name: 'Puspa Sharma', nameNp: 'पुष्पा शर्मा', role: 'Office & Accounts Manager', roleNp: 'कार्यालय तथा लेखा प्रबन्धक', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80' },
  ];

  const seniorTeachers = [
    { name: 'Komal Bohara', nameNp: 'कोमल बोहरा', role: 'Senior Teacher & STEM Lead', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80' },
    { name: 'Kritima Bhusal', nameNp: 'कृतिमा भुसाल', role: 'Senior Teacher & AI Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
  ];

  const teachingTeam = [
    { name: 'Yaman Subedi', nameNp: 'यमन सुवेदी', role: 'Robotics & Coding Trainer' },
    { name: 'Barsha Khanal', nameNp: 'वर्षा खनाल', role: 'Vedic Math & Handwriting Trainer' },
    { name: 'Mamta Pariyar', nameNp: 'ममता परियार', role: 'Digital Literacy Instructor' },
    { name: 'Anjali Hitanga', nameNp: 'अञ्जली हितङ्गा', role: 'Public Speaking & Motivation Trainer' },
  ];

  return (
    <section className="py-16 bg-slate-50 text-slate-800 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. Header Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
              <GraduationCap className="w-4 h-4" />
              <span>{isNp ? 'कम्पनी परिचय (Company Overview)' : 'Company Overview'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              {isNp ? (
                <>
                  माइंडस्पार्क (MindSparQ) एजुकेशन एण्ड टेक्नोलोजी <br />
                  <span className="text-indigo-600">शिक्षा, प्रविधि र नवप्रवर्तनको संगम</span>
                </>
              ) : (
                <>
                  MindSparQ Education & Technology <br />
                  <span className="text-indigo-600">Empowering Nepal’s Future Education</span>
                </>
              )}
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              {isNp
                ? 'MindSparQ Education & Technology नेपालमा आधारित एक अग्रणी Education Technology (EdTech) कम्पनी हो, जसको उद्देश्य आधुनिक शिक्षा, कृत्रिम बुद्धिमत्ता (AI), र डिजिटल प्रविधिलाई प्रयोग गरेर विद्यार्थी, शिक्षक, विद्यालय तथा संस्थाहरूलाई भविष्यका लागि सक्षम बनाउनु हो। हामी केवल प्रशिक्षण संस्था मात्र होइन, शिक्षा, प्रविधि र नवप्रवर्तनलाई एउटै प्लेटफर्ममा जोड्ने संस्था हौं।'
                : 'MindSparQ Education & Technology is an EdTech company based in Nepal dedicated to empowering students, teachers, and educational institutions through modern pedagogy, Artificial Intelligence (AI), and future skills.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                isNp ? 'भविष्यका सीपहरू (Future Skills)' : 'Future Skills Development',
                isNp ? 'शिक्षक क्षमता अभिवृद्धि (TOT)' : 'Teacher Training & Capacity Building',
                isNp ? 'विद्यालय डिजिटल रूपान्तरण' : 'School Digital Transformation',
                isNp ? 'AI-सञ्चालित शैक्षिक समाधान' : 'AI-Powered Learning Solutions',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6 opacity-10">
              <Brain className="w-64 h-64 text-white" />
            </div>

            <div className="flex items-center space-x-3">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold">{isNp ? 'हाम्रा मुख्य स्तम्भहरू' : 'MindSparQ Pillars'}</h3>
            </div>

            <div className="space-y-4 text-xs text-indigo-100">
              <div className="p-3.5 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                <p className="font-bold text-white text-sm mb-1">{isNp ? 'विद्यार्थीहरूका लागि' : 'For Students'}</p>
                <p>{isNp ? 'Abacus, Vedic Math, AI Productivity & Public Speaking' : 'Abacus, Vedic Math, Robotics & Future Skills.'}</p>
              </div>

              <div className="p-3.5 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                <p className="font-bold text-white text-sm mb-1">{isNp ? 'शिक्षकहरूका लागि' : 'For Educators'}</p>
                <p>{isNp ? 'Teacher Training (TOT) र डिजिटल शिक्षण विधि' : 'Capacity Building & Pedagogical AI integration.'}</p>
              </div>

              <div className="p-3.5 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                <p className="font-bold text-white text-sm mb-1">{isNp ? 'विद्यालयहरूका लागि' : 'For Institutions'}</p>
                <p>{isNp ? 'School Partnership & STEM Lab Setup' : 'Institutional curriculum support & ERP solutions.'}</p>
              </div>
            </div>
          </div>

        </div>

        {/* 2. Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4 shadow-sm hover:border-indigo-300 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">{isNp ? 'हाम्रो सोच (Vision)' : 'Our Vision'}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isNp
                ? 'नेपालको अग्रणी AI-सञ्चालित Education & Technology कम्पनी बनेर विश्वस्तरीय शिक्षालाई सबैका लागि पहुँचयोग्य, व्यवहारिक र भविष्य-केन्द्रित बनाउने।'
                : 'To become Nepal’s leading AI-powered Education & Technology company, making world-class, future-focused education accessible and practical for everyone.'}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4 shadow-sm hover:border-indigo-300 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">{isNp ? 'हाम्रो लक्ष्य (Mission)' : 'Our Mission'}</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {[
                isNp ? 'विद्यार्थीहरूमा भविष्यका सीपहरू (Future Skills) को विकास गर्ने।' : 'Develop future-ready skills in students.',
                isNp ? 'AI र आधुनिक प्रविधिलाई शिक्षामा पूर्ण रूपमा एकीकृत गर्ने।' : 'Integrate AI and modern technologies into daily education.',
                isNp ? 'विद्यालयहरूलाई डिजिटल रूपान्तरणमा सम्पूर्ण सहयोग गर्ने।' : 'Assist schools and academic institutions in digital transformation.',
                isNp ? 'शिक्षकहरूको व्यावसायिक विकासलाई निरन्तर प्रोत्साहन गर्ने।' : 'Continuously empower teachers through specialized training.',
                isNp ? 'व्यवहारिक, अनुसन्धानमुखी र गुणस्तरीय शिक्षा प्रदान गर्ने।' : 'Deliver practical, research-driven, and high-quality learning.',
              ].map((m, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 3. Core Values */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {isNp ? 'हाम्रा मुख्य मूल्य मान्यताहरू (Core Values)' : 'MindSparQ Core Values'}
            </h2>
            <p className="text-xs text-slate-500">
              {isNp ? 'हाम्रो प्रत्येक कार्य र पाठ्यक्रमलाई मार्गदर्शन गर्ने आधारभूत सिद्धान्तहरू' : 'Guiding principles that define our educational methodology.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreValues.map((v, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 hover:border-indigo-300 transition-colors shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                  0{i + 1}
                </div>
                <h4 className="text-sm font-bold text-slate-900">{isNp ? v.nameNp : v.nameEn}</h4>
                <p className="text-xs text-slate-500">{isNp ? v.descNp : v.descEn}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Our Services Overview */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {isNp ? 'हाम्रा मुख्य सेवाहरू (Our Services)' : 'Comprehensive Educational Services'}
            </h2>
            <p className="text-xs text-slate-500">
              {isNp ? 'विद्यार्थी, शिक्षक र विद्यालयहरूका लागि तयार पारिएका तीन मुख्य सेवा क्षेत्रहरू' : 'Tailored for students, teachers, and partner institutions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Academic Programs */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center space-x-3 text-indigo-600">
                <BookOpen className="w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-900">{isNp ? 'एकेडेमिक प्रोग्रामहरू' : 'Academic Programs'}</h3>
              </div>
              <div className="space-y-2">
                {academicServices.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Programs */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center space-x-3 text-indigo-600">
                <Cpu className="w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-900">{isNp ? 'टेक्नोलोजी प्रोग्रामहरू' : 'Technology Programs'}</h3>
              </div>
              <div className="space-y-2">
                {techServices.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* School Solutions */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center space-x-3 text-indigo-600">
                <Building2 className="w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-900">{isNp ? 'विद्यालय समाधानहरू' : 'School Solutions'}</h3>
              </div>
              <div className="space-y-2">
                {schoolSolutions.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 5. Authentic Leadership & Team */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 space-y-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
              <Users className="w-3.5 h-3.5" />
              <span>{isNp ? 'हाम्रो टिम (Our Team)' : 'Leadership & Teaching Team'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {isNp ? 'माइंडस्पार्कका नेतृत्व तथा शिक्षक टोली' : 'Meet MindSparQ Leadership & Educators'}
            </h2>
            <p className="text-xs text-slate-500">
              {isNp ? 'नेपालमा आधुनिक शिक्षा र प्रविधिको विकासमा समर्पित नेतृत्व' : 'Dedicated team driving EdTech innovation across Nepal.'}
            </p>
          </div>

          {/* Founders & Leadership */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">{isNp ? 'संस्थापक तथा नेतृत्व' : 'Founders & Management'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {leadershipTeam.map((m, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center space-x-4">
                  <img src={m.avatar} alt={m.name} className="w-16 h-16 rounded-xl object-cover border border-indigo-200 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{isNp ? m.nameNp : m.name}</h4>
                    <p className="text-xs text-indigo-600 font-semibold mt-0.5">{isNp ? m.roleNp : m.role}</p>
                    <span className="inline-block mt-2 text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-bold">MindSparQ</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Senior Teachers */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">{isNp ? 'वरिष्ठ शिक्षकहरू (Senior Teachers)' : 'Senior Teachers'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {seniorTeachers.map((m, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center space-x-4">
                  <img src={m.avatar} alt={m.name} className="w-14 h-14 rounded-xl object-cover border border-indigo-200 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{isNp ? m.nameNp : m.name}</h4>
                    <p className="text-xs text-indigo-600 font-semibold">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teaching Team */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">{isNp ? 'शिक्षक टोली (Teaching Team)' : 'Teaching Team'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {teachingTeam.map((m, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <UserCheck className="w-5 h-5 text-indigo-600 mb-1" />
                  <h4 className="text-xs font-bold text-slate-900">{isNp ? m.nameNp : m.name}</h4>
                  <p className="text-[11px] text-slate-500">{m.role}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 6. Why Choose MindSparQ & Long-Term Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Why Choose Us */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>{isNp ? 'MindSparQ किन छान्ने? (Why Choose MindSparQ?)' : 'Why Choose MindSparQ?'}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyChooseUs.map((w, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <h4 className="text-xs font-bold text-indigo-700">{isNp ? w.titleNp : w.titleEn}</h4>
                  <p className="text-[11px] text-slate-600">{w.descEn}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Long-Term Goals */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 rounded-3xl space-y-6 shadow-xl relative">
            <div className="flex items-center space-x-2 text-indigo-400">
              <Rocket className="w-6 h-6" />
              <h3 className="text-xl font-black text-white">{isNp ? 'दीर्घकालीन लक्ष्यहरू' : 'Our Long-Term Goals'}</h3>
            </div>
            <p className="text-xs text-slate-300">
              {isNp ? 'भविष्यको शैक्षिक प्रविधिलाई नयाँ उचाइमा पुर्याउने डिजिटल पूर्वाधारहरू:' : 'Building digital infrastructure for the next generation:'}
            </p>
            <div className="space-y-2">
              {longTermGoals.map((g, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-indigo-100 bg-white/10 p-2.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{g}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import { Course, InstructorProfile, InstructionalPost, StudentInquiry, DailyPhotoSlide, StudentCertificate, User } from '../types';

export const initialInstructors: InstructorProfile[] = [
  {
    id: 'inst-1',
    name: 'Samay Budhoki Chhetri',
    nameNp: 'समय बुढाथोकी क्षेत्री',
    email: 'ceo@mindsparq.edu.np',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    designation: 'Founder & Chief Executive Officer (CEO)',
    designationNp: 'संस्थापक तथा मुख्य कार्यकारी अधिकृत (CEO)',
    bio: 'Visionary EdTech leader empowering students, teachers, and institutions across Nepal through AI, future skills, and digital transformation.',
    bioNp: 'नेपालमा एआई, भावी सीप र डिजिटल रूपान्तरण मार्फत शिक्षा क्षेत्रलाई आधुनिक बनाउन समर्पित दूरदर्शी नेतृत्व।',
    qualifications: ['EdTech Architect & Strategist', 'Certified AI Education Specialist', 'Lead Motivational Speaker'],
    expertise: ['EdTech Leadership', 'AI Integration', 'School Transformation', 'Strategic Innovation'],
    rating: 5.0,
    totalStudents: 3500,
    totalCourses: 8,
    social: {
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      youtube: 'https://youtube.com',
      instagram: 'https://instagram.com'
    },
    isVerified: true,
    joinedDate: '2023-01-01'
  },
  {
    id: 'inst-2',
    name: 'Dipisha Chhetri',
    nameNp: 'दिपिषा क्षेत्री',
    email: 'dipisha@mindsparq.edu.np',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    designation: 'Co-Founder & Academic Programs Lead',
    designationNp: 'सह-संस्थापक तथा एकेडेमिक प्रोग्राम्स प्रमुख',
    bio: 'Directing MindSparQ academic streams, Abacus, Vedic Math, and teacher capacity building programs nationwide.',
    bioNp: 'माइंडस्पार्कका शैक्षिक कार्यक्रमहरू, एबाकस, वैदिक गणित तथा शिक्षक तालिम सञ्चालन प्रमुख।',
    qualifications: ['Master of Education (M.Ed)', 'Master Abacus & Vedic Math Trainer', 'Student Psychology Specialist'],
    expertise: ['Academic Curriculum', 'Abacus Mental Math', 'Vedic Math', 'Teacher Training (TOT)'],
    rating: 4.98,
    totalStudents: 2800,
    totalCourses: 6,
    social: {
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com'
    },
    isVerified: true,
    joinedDate: '2023-01-01'
  },
  {
    id: 'inst-3',
    name: 'Puspa Sharma',
    nameNp: 'पुष्पा शर्मा',
    email: 'accounts@mindsparq.edu.np',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    designation: 'Office & Accounts Manager',
    designationNp: 'कार्यालय तथा लेखा प्रबन्धक',
    bio: 'Managing operational excellence, school partnership administration, student admissions, and institutional relations.',
    bioNp: 'संस्थागत व्यवस्थापन, विद्यालय साझेदारी प्रशासन तथा भर्ना व्यवस्थापन प्रमुख।',
    qualifications: ['BBA Finance & Management', 'Institutional Operations Lead'],
    expertise: ['Office Management', 'Financial Operations', 'School Partnerships', 'Student Counseling'],
    rating: 4.9,
    totalStudents: 1500,
    totalCourses: 2,
    social: {
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com'
    },
    isVerified: true,
    joinedDate: '2023-02-15'
  },
  {
    id: 'inst-4',
    name: 'Komal Bohara',
    nameNp: 'कोमल बोहरा',
    email: 'komal@mindsparq.edu.np',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80',
    designation: 'Senior Teacher & STEM Specialist',
    designationNp: 'वरिष्ठ शिक्षक तथा STEM विज्ञ',
    bio: 'Specializing in Abacus Mental Math, STEM Education, and interactive early childhood brain development.',
    bioNp: 'एबाकस मेन्टल म्याथ र STEM शिक्षा सम्बन्धी वरिष्ठ प्रशिक्षक।',
    qualifications: ['B.Sc. Mathematics', 'Certified Master Abacus Educator', 'STEM Pedagogy Specialist'],
    expertise: ['Abacus Mental Math', 'Vedic Math', 'STEM Projects', 'Child Learning Psychology'],
    rating: 4.95,
    totalStudents: 1950,
    totalCourses: 5,
    social: {
      facebook: 'https://facebook.com',
      youtube: 'https://youtube.com'
    },
    isVerified: true,
    joinedDate: '2023-03-01'
  },
  {
    id: 'inst-5',
    name: 'Kritima Bhusal',
    nameNp: 'कृतिमा भुसाल',
    email: 'kritima@mindsparq.edu.np',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    designation: 'Senior Teacher & AI Productivity Lead',
    designationNp: 'वरिष्ठ शिक्षक तथा एआई प्रडक्टिभिटी प्रमुख',
    bio: 'Leading Future Skills, Artificial Intelligence (AI) for Education, and Public Speaking workshops for students and teachers.',
    bioNp: 'एआई टुल्स, भावी सीप तथा पब्लिक स्पिकिङकी अनुभवी प्रशिक्षक।',
    qualifications: ['B.Tech Computer Science', 'AI Literacy Specialist', 'Public Speaking Coach'],
    expertise: ['AI Productivity Tools', 'Public Speaking', 'Digital Literacy', 'DMIT Assessment'],
    rating: 4.94,
    totalStudents: 1620,
    totalCourses: 4,
    social: {
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      tiktok: 'https://tiktok.com'
    },
    isVerified: true,
    joinedDate: '2023-04-10'
  },
  {
    id: 'inst-6',
    name: 'Yaman Subedi',
    nameNp: 'यमन सुवेदी',
    email: 'yaman@mindsparq.edu.np',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    designation: 'Teaching Team — Robotics & Coding Trainer',
    designationNp: 'शिक्षक टिम — रोबोटिक्स तथा कोडिङ प्रशिक्षक',
    bio: 'Hands-on practical instructor for Coding & Robotics, Arduino microcontrollers, and STEM kits in partner schools.',
    bioNp: 'विद्यालयहरूमा रोबोटिक्स, कोडिङ र हार्डवेयर वर्कसप सञ्चालन गर्ने युवा प्रशिक्षक।',
    qualifications: ['B.E. Electronics & Communication', 'Robotics Hardware Developer'],
    expertise: ['Robotics', 'Coding for Kids', 'Arduino & Scratch', 'STEM Hardware'],
    rating: 4.91,
    totalStudents: 1200,
    totalCourses: 3,
    social: {
      github: 'https://github.com',
      youtube: 'https://youtube.com'
    },
    isVerified: true,
    joinedDate: '2023-06-01'
  },
  {
    id: 'inst-7',
    name: 'Barsha Khanal',
    nameNp: 'वर्षा खनाल',
    email: 'barsha@mindsparq.edu.np',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    designation: 'Teaching Team — Academic & Vedic Math Trainer',
    designationNp: 'शिक्षक टिम — एकेडेमिक तथा वैदिक गणित प्रशिक्षक',
    bio: 'Empowering students with speed calculation techniques, Vedic Math shortcuts, and handwriting perfection.',
    bioNp: 'वैदिक गणित तथा हस्तलेखन सुधारका लागि समर्पित प्रशिक्षक।',
    qualifications: ['B.Ed. Mathematics', 'Certified Vedic Mathematics Trainer'],
    expertise: ['Vedic Math', 'Handwriting Improvement', 'Mental Arithmetic'],
    rating: 4.89,
    totalStudents: 980,
    totalCourses: 3,
    social: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com'
    },
    isVerified: true,
    joinedDate: '2023-07-15'
  },
  {
    id: 'inst-8',
    name: 'Mamta Pariyar',
    nameNp: 'ममता परियार',
    email: 'mamta@mindsparq.edu.np',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80',
    designation: 'Teaching Team — Digital Literacy Instructor',
    designationNp: 'शिक्षक टिम — डिजिटल साक्षरता प्रशिक्षक',
    bio: 'Training school students and educators on digital safety, office productivity software, and modern web research.',
    bioNp: 'विद्यार्थी तथा शिक्षकहरूका लागि डिजिटल साक्षरता सम्बन्धी प्रशिक्षक।',
    qualifications: ['B.Sc. CSIT', 'Certified Digital Educator'],
    expertise: ['Digital Literacy', 'Computer Basics', 'Google Workspace for Education'],
    rating: 4.88,
    totalStudents: 890,
    totalCourses: 2,
    social: {
      facebook: 'https://facebook.com'
    },
    isVerified: true,
    joinedDate: '2023-09-01'
  },
  {
    id: 'inst-9',
    name: 'Anjali Hitanga',
    nameNp: 'अञ्जली हितङ्गा',
    email: 'anjali@mindsparq.edu.np',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    designation: 'Teaching Team — Public Speaking & Student Motivation',
    designationNp: 'शिक्षक टिम — पब्लिक स्पिकिङ तथा विद्यार्थी प्रेरणा प्रशिक्षक',
    bio: 'Specializing in confidence building, public speaking fluency, student leadership development, and DMIT counseling.',
    bioNp: 'सार्वजनिक भाषण कला, आत्मविश्वास अभिवृद्धि तथा नेतृत्व विकास प्रशिक्षक।',
    qualifications: ['B.A. Mass Communication & Psychology', 'Certified Personality Development Coach'],
    expertise: ['Public Speaking', 'Student Motivation', 'DMIT Assessment', 'Communication Skills'],
    rating: 4.92,
    totalStudents: 1100,
    totalCourses: 3,
    social: {
      facebook: 'https://facebook.com',
      tiktok: 'https://tiktok.com',
      instagram: 'https://instagram.com'
    },
    isVerified: true,
    joinedDate: '2023-10-10'
  }
];

export const initialCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Abacus Mental Math & Rapid Calculation Masterclass',
    titleNp: 'एबाकस मेन्टल म्याथ तथा द्रुत गणना मास्टरक्लास',
    description: 'Boost children’s memory, concentration, and mental math speed through certified Abacus methodology.',
    descriptionNp: 'एबाकस प्रविधिबाट बालबालिकाको स्मरणशक्ति, एकाग्रता र गणितीय क्षमता तीव्र बनाउने पाठ्यक्रम।',
    category: 'Academic Programs',
    instructorId: 'inst-2',
    instructorName: 'Dipisha Chhetri',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    level: 'Beginner',
    duration: '12 Weeks (48 Hours)',
    lessonsCount: 36,
    rating: 4.98,
    reviewsCount: 380,
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    previewVideoUrl: 'https://www.youtube.com/embed/mU6anWqZJcc',
    price: 8000,
    isFree: false,
    featured: true,
    createdAt: '2024-01-10',
    modules: [
      { id: 'm1', title: 'Abacus Tool Fundamentals & Bead Movements', duration: '3 Weeks' },
      { id: 'm2', title: 'Single & Double Digit Addition & Subtraction', duration: '3 Weeks' },
      { id: 'm3', title: 'Mental Visualization & Anzan Speed Technique', duration: '3 Weeks' },
      { id: 'm4', title: 'Advanced Multiplication & Division', duration: '3 Weeks' }
    ]
  },
  {
    id: 'course-2',
    title: 'Artificial Intelligence (AI) & Productivity Tools for Schools',
    titleNp: 'एआई प्रविधि तथा उत्पादकत्व बढाउने आधुनिक टुल्स',
    description: 'Practical course covering Generative AI (Gemini, ChatGPT), AI Tutors, prompt engineering, and digital workflows for students and teachers.',
    descriptionNp: 'विद्यार्थी तथा शिक्षकहरूका लागि जेनेरेटिभ एआई, प्रम्प्ट इन्जिनियरिङ र एआई टुल्स प्रयोग गर्ने व्यावहारिक ज्ञान।',
    category: 'Technology Programs',
    instructorId: 'inst-1',
    instructorName: 'Samay Budhoki Chhetri',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    level: 'Intermediate',
    duration: '8 Weeks (32 Hours)',
    lessonsCount: 28,
    rating: 4.97,
    reviewsCount: 420,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    previewVideoUrl: 'https://www.youtube.com/embed/mU6anWqZJcc',
    price: 12000,
    isFree: false,
    featured: true,
    createdAt: '2024-02-01',
    modules: [
      { id: 'm1', title: 'Introduction to Artificial Intelligence & LLMs', duration: '2 Weeks' },
      { id: 'm2', title: 'Prompt Engineering & Gemini API for Learning', duration: '2 Weeks' },
      { id: 'm3', title: 'AI for Content Creation, Research & Presentations', duration: '2 Weeks' },
      { id: 'm4', title: 'Building Custom AI Chatbots & Automation', duration: '2 Weeks' }
    ]
  },
  {
    id: 'course-3',
    title: 'Vedic Mathematics & Fast Math Techniques',
    titleNp: 'वैदिक गणित तथा द्रुत गणितीय सर्टकटहरू',
    description: 'Learn ancient Indian Vedic Math sutras for instant calculations, square roots, cubic equations, and competitive exams.',
    descriptionNp: 'सजिलै र तीव्र गतिमा ठूला गणितीय हिसाब गर्ने वैदिक गणितका सुत्र तथा तरिकाहरू।',
    category: 'Academic Programs',
    instructorId: 'inst-7',
    instructorName: 'Barsha Khanal',
    instructorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    level: 'Beginner',
    duration: '6 Weeks (24 Hours)',
    lessonsCount: 20,
    rating: 4.91,
    reviewsCount: 215,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
    price: 6000,
    isFree: false,
    featured: false,
    createdAt: '2024-03-01',
    modules: [
      { id: 'm1', title: 'Ekadhikena Purvena & Base Multiplication', duration: '2 Weeks' },
      { id: 'm2', title: 'Squaring, Cubing & Digit Sum Checking', duration: '2 Weeks' },
      { id: 'm3', title: 'Algebraic Sutras & Instant Division', duration: '2 Weeks' }
    ]
  },
  {
    id: 'course-4',
    title: 'Coding, Robotics & STEM Education for Youth',
    titleNp: 'युवाहरूका लागि कोडिङ, रोबोटिक्स र STEM शिक्षा',
    description: 'Hands-on hardware and software training using Scratch, Python, Micro:bit, Arduino, and sensors for building real smart projects.',
    descriptionNp: 'रोबोटिक्स, स्क्र्याच, पाइथन र अर्दुइनो प्रविधिको प्रयोग गरी आफ्नै स्मार्ट प्रोजेक्टहरू बनाउनुहोस्।',
    category: 'Technology Programs',
    instructorId: 'inst-6',
    instructorName: 'Yaman Subedi',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    level: 'Beginner',
    duration: '10 Weeks (40 Hours)',
    lessonsCount: 30,
    rating: 4.93,
    reviewsCount: 190,
    thumbnail: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    price: 10000,
    isFree: false,
    featured: true,
    createdAt: '2024-03-15',
    modules: [
      { id: 'm1', title: 'Logic Building with Scratch & Graphical Code', duration: '2 Weeks' },
      { id: 'm2', title: 'Python Programming Fundamentals', duration: '3 Weeks' },
      { id: 'm3', title: 'Arduino Microcontroller & Sensor Integration', duration: '3 Weeks' },
      { id: 'm4', title: 'Autonomous Robot Building Project', duration: '2 Weeks' }
    ]
  },
  {
    id: 'course-5',
    title: 'School Partnership & Curriculum Transformation Program',
    titleNp: 'विद्यालय साझेदारी तथा पाठ्यक्रम रूपान्तरण कार्यक्रम',
    description: 'Complete institutional package including AI integration, teacher training (TOT), student motivation sessions, and STEM lab setup.',
    descriptionNp: 'विद्यालयहरूको डिजिटल रूपान्तरण, शिक्षक तालिम र STEM ल्याब स्थापनाका लागि विशेष प्याकेज।',
    category: 'School Solutions',
    instructorId: 'inst-1',
    instructorName: 'Samay Budhoki Chhetri',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    level: 'Advanced',
    duration: 'Full Academic Year',
    lessonsCount: 50,
    rating: 5.0,
    reviewsCount: 85,
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    price: 45000,
    isFree: false,
    featured: true,
    createdAt: '2024-04-01',
    modules: [
      { id: 'm1', title: 'Institutional Assessment & Digital Roadmap', duration: '1 Month' },
      { id: 'm2', title: 'Teacher Capacity Building & Pedagogy Training (TOT)', duration: '2 Months' },
      { id: 'm3', title: 'Student Future Skills & STEM Curriculum Rollout', duration: '6 Months' },
      { id: 'm4', title: 'DMIT Brain Mapping & Parent Counseling', duration: '2 Months' }
    ]
  },
  {
    id: 'course-6',
    title: 'Public Speaking, Leadership & DMIT Assessment',
    titleNp: 'पब्लिक स्पिकिङ, नेतृत्व विकास र DMIT परीक्षण',
    description: 'Transform confidence, vocal delivery, stage presence, and discover innate talents via Dermatoglyphics Multiple Intelligence Test (DMIT).',
    descriptionNp: 'आत्मविश्वास, मञ्च प्रस्तुति तथा DMIT मस्तिष्क परीक्षण मार्फत आफ्ना अन्तर्निहित क्षमता पहिचान गर्ने तालिम।',
    category: 'Academic Programs',
    instructorId: 'inst-9',
    instructorName: 'Anjali Hitanga',
    instructorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    level: 'Beginner',
    duration: '6 Weeks (24 Hours)',
    lessonsCount: 18,
    rating: 4.94,
    reviewsCount: 160,
    thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
    price: 7000,
    isFree: false,
    featured: false,
    createdAt: '2024-04-10',
    modules: [
      { id: 'm1', title: 'Overcoming Stage Fear & Vocal Warmups', duration: '2 Weeks' },
      { id: 'm2', title: 'Speech Structure, Body Language & Storytelling', duration: '2 Weeks' },
      { id: 'm3', title: 'DMIT Report Analysis & Career Orientation', duration: '2 Weeks' }
    ]
  }
];

export const initialPosts: InstructionalPost[] = [
  {
    id: 'post-1',
    authorId: 'admin-1',
    authorName: 'MindSparQ Admin Team',
    authorAvatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&auto=format&fit=crop&q=80',
    authorRole: 'admin',
    title: '📢 Admission Open for Spring 2026 Tech Bootcamp Batch',
    titleNp: '📢 स्प्रिङ २०२६ टेक बूटक्याम्पका लागि भर्ना खुल्यो!',
    content: 'MindSparQ Education and Technology announces admissions for Full Stack Web, Artificial Intelligence, and Cloud Architecture. Limited seats available! Early bird scholarship of 20% available for top applicants.',
    contentNp: 'माइंडस्पार्क (MindSparQ) एजुकेशन एण्ड टेक्नोलोजी द्वारा सञ्चालित नयाँ ब्याचमा भर्ना सुरु भएको छ। २०% सम्म छात्रवृत्तिको सुविधा उपलब्ध छ।',
    type: 'announcement',
    mediaUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    category: 'Announcements',
    likes: 124,
    likedByMe: false,
    commentsCount: 3,
    comments: [
      {
        id: 'c-1',
        postId: 'post-1',
        authorName: 'Aanand Sharma',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
        authorRole: 'student',
        text: 'Great news! What are the class timings for the AI Bootcamp?',
        createdAt: '2026-07-28 10:30 AM'
      },
      {
        id: 'c-2',
        postId: 'post-1',
        authorName: 'Er. Sandesh Sharma',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        authorRole: 'instructor',
        text: 'Classes are available in Morning (7-9 AM) and Evening (5-7 PM) physical/online hybrid batches.',
        createdAt: '2026-07-28 11:15 AM'
      },
      {
        id: 'c-3',
        postId: 'post-1',
        authorName: 'Suman Thapa',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
        authorRole: 'student',
        text: 'Submitted my application for the early bird scholarship!',
        createdAt: '2026-07-29 02:40 PM'
      }
    ],
    createdAt: '2026-07-28',
    tags: ['MindSparQ', 'Bootcamp', 'Scholarship', 'IT Training Nepal']
  },
  {
    id: 'post-2',
    authorId: 'inst-1',
    authorName: 'Er. Sandesh Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    authorRole: 'instructor',
    title: '🎥 Free Video Workshop: How to build a custom AI Assistant using Gemini API & React',
    titleNp: '🎥 निःशुल्क भिडियो ट्यूटोरियल: Gemini API र React बाट आफ्नै AI सहायक बनाउनुहोस्',
    content: 'In this 15-minute hands-on tutorial, I break down how students can integrate Google Gemini models directly into client-server applications cleanly and securely.',
    contentNp: 'यस भिडियोमा हामीले Gemini API लाई कसरी आफ्नो एप्लिकेशनमा सुरक्षित तरिकाले जोड्ने भनेर विस्तृत रूपमा व्याख्या गरेका छौँ।',
    type: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    videoEmbedUrl: 'https://www.youtube.com/embed/mU6anWqZJcc',
    category: 'AI Tutorial',
    likes: 215,
    likedByMe: true,
    commentsCount: 2,
    comments: [
      {
        id: 'c-4',
        postId: 'post-2',
        authorName: 'Priya Adhikari',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        authorRole: 'instructor',
        text: 'Super clear breakdown of server-side Gemini proxy routes! Very recommended for all web students.',
        createdAt: '2026-07-25 04:20 PM'
      },
      {
        id: 'c-5',
        postId: 'post-2',
        authorName: 'Bibek Neupane',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
        authorRole: 'student',
        text: 'Just built my first chatbot following this video. Thank you sir!',
        createdAt: '2026-07-26 09:10 AM'
      }
    ],
    createdAt: '2026-07-25',
    tags: ['AI', 'GeminiAPI', 'Tutorial', 'React']
  },
  {
    id: 'post-3',
    authorId: 'inst-2',
    authorName: 'Priya Adhikari',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    authorRole: 'instructor',
    title: '💡 Top 5 Frontend Design Principles for High-Converting Web Apps',
    titleNp: '💡 उत्कृष्ट वेब एप्लिकेशनका ५ आधारभूत design सिद्धान्तहरू',
    content: 'Visual hierarchy, rhythmic spacing, mathematical scales, and avoiding AI slop patterns! Read through this quick guide to level up your UI engineering.',
    contentNp: 'तपाईँको वेबसाइटलाई थप प्रोफेसनल र आकर्षक बनाउन यी ५ डिजाइन नियमहरू ध्यानमा राख्नुहोस्।',
    type: 'resource',
    mediaUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=80',
    category: 'UI/UX Tips',
    likes: 189,
    likedByMe: false,
    commentsCount: 1,
    comments: [
      {
        id: 'c-6',
        postId: 'post-3',
        authorName: 'Rohan Shrestha',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
        authorRole: 'instructor',
        text: 'The nesting border radius rule is spot on!',
        createdAt: '2026-07-21 02:00 PM'
      }
    ],
    createdAt: '2026-07-20',
    tags: ['WebDev', 'UIUX', 'TailwindCSS', 'Tips']
  }
];

export const initialDailyPhotos: DailyPhotoSlide[] = [
  {
    id: 'photo-1',
    title: 'MindSparQ AI Hackathon 2026 — Live Coding Showcase',
    titleNp: 'MindSparQ एआई ह्याकाथन २०२६ — प्रत्यक्ष कोडिङ प्रतिस्पर्धा',
    caption: 'Students collaborating on LLM-powered agricultural & healthcare applications during our 24-hour campus hackathon in Tinkune, Kathmandu.',
    captionNp: 'काठमाडौँ परिसरमा आयोजना गरिएको २४ घण्टे ह्याकाथनमा एआई प्रोजेक्टहरू निर्माण गर्दै विद्यार्थीहरू।',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
    date: '2026-07-30',
    category: 'Hackathon',
    authorName: 'Er. Sandesh Sharma'
  },
  {
    id: 'photo-2',
    title: 'Hands-On Robotics & IoT Hardware Workshop',
    titleNp: 'रोबोटिक्स तथा आईओटी हार्डवेयर कार्यशाला',
    caption: 'Interactive physical computing lab session programming microcontrollers and sensor networks.',
    captionNp: 'माइक्रो-कन्ट्रोलर र सेन्सर सम्बन्धी प्रयोगात्मक प्रयोगशाला।',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1200&auto=format&fit=crop&q=80',
    date: '2026-07-29',
    category: 'Workshop',
    authorName: 'Er. Roshan Shrestha'
  },
  {
    id: 'photo-3',
    title: 'Full Stack Web Architecture & React Code Review',
    titleNp: 'फूल स्ट्याक वेब आर्किटेक्चर तथा कोड रिभ्यु',
    caption: 'Instructor Priya Adhikari guiding senior web students through production code review and state management patterns.',
    captionNp: 'प्रशिक्षक प्रिया अधिकारीद्वारा कोड रिभ्यु तथा स्टेट प्रबन्धन सम्बन्धी सत्र।',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    date: '2026-07-28',
    category: 'Classroom',
    authorName: 'Priya Adhikari'
  },
  {
    id: 'photo-4',
    title: 'Guest Lecture: Cloud Security & Enterprise DevOps',
    titleNp: 'अतिथि व्याख्यान: क्लाउड सेक्युरिटी र डेभओप्स',
    caption: 'Special guest session by Lead DevOps Engineer sharing industry practices on Kubernetes & AWS security.',
    captionNp: 'उद्योगका क्लाउड विशेषज्ञद्वारा क्लाउड सेक्युरिटी सम्बन्धी विशेष प्रस्तुति।',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
    date: '2026-07-27',
    category: 'Guest Lecture',
    authorName: 'MindSparQ Team'
  },
  {
    id: 'photo-5',
    title: 'Flutter Mobile App Project Presentations',
    titleNp: 'फ्लटर मोबाइल एप प्रोजेक्ट प्रस्तुतीकरण',
    caption: 'Students demonstrating completed cross-platform mobile apps published on Play Store.',
    captionNp: 'विद्यार्थीहरूद्वारा निर्मित मोबाइल एप्लिकेशनहरूको अन्तिम प्रस्तुतीकरण।',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
    date: '2026-07-26',
    category: 'Event',
    authorName: 'Anish Maharjan'
  }
];

export const initialCertificates: StudentCertificate[] = [
  {
    certificateId: 'MSQ-2026-8814',
    studentName: 'Aanand Sharma',
    courseTitle: 'Full Stack Web Development with React & Node.js',
    issueDate: '2026-07-15',
    instructorName: 'Priya Adhikari',
    grade: 'Distinction (A+)',
    verificationHash: '0x8f92a10c7e43b19d5543'
  },
  {
    certificateId: 'MSQ-2026-9920',
    studentName: 'Bibek Neupane',
    courseTitle: 'Applied Generative AI & Python Masterclass',
    issueDate: '2026-07-20',
    instructorName: 'Er. Sandesh Sharma',
    grade: 'High Distinction (O)',
    verificationHash: '0x3c11d40e9f12b77a9981'
  }
];

export const initialInquiries: StudentInquiry[] = [
  {
    id: 'inq-1',
    name: 'Aayush Karki',
    email: 'aayush.karki@gmail.com',
    phone: '9841234567',
    courseInterested: 'Full Stack Web Development with React & Node.js',
    message: 'I am a 3rd year CSIT student looking for weekend physical or online classes. Please send syllabus details.',
    status: 'new',
    createdAt: '2026-07-29'
  },
  {
    id: 'inq-2',
    name: 'Sarita Thapa',
    email: 'sarita.thapa@outlook.com',
    phone: '9801987654',
    courseInterested: 'Applied Generative AI & Python Masterclass',
    message: 'Is early bird scholarship still available for this batch?',
    status: 'contacted',
    createdAt: '2026-07-27'
  }
];

export const initialHomeConfig = {
  heroTitleEn: 'Empowering Future Software Engineers & AI Innovators',
  heroTitleNp: 'नेपालको अग्रणी आईटी तथा एआई शिक्षा मञ्च',
  heroSubtitleEn: 'Interactive learning hub featuring verified instructor profiles, daily campus photo slider, live instructional video feeds, full-stack course tracks, and direct admin & teacher working panels.',
  heroSubtitleNp: 'हाम्रा अनुभवी प्रशिक्षकहरूद्वारा सञ्चालित अनलाइन तथा प्रत्यक्ष कक्षाहरू, दैनिक फोटो ग्यालरी, भिडियो ट्यूटोरियलहरू र पावर एडमिन/शिक्षक वर्किङ प्यानल मार्फत प्रविधिको उच्च ज्ञान प्राप्त गर्नुहोस्।',
  bannerNoticeEn: '📢 Summer 2026 Batches Open! Apply for IT & AI Masterclasses. Direct Admin and Teacher support active.',
  bannerNoticeNp: '📢 समर २०२६ नयाँ भर्ना खुल्यो! आईटी तथा एआई मास्टरक्लासहरूका लागि आवेदन दिनुहोस्।',
  statsStudents: '5,000+',
  statsInstructors: '15+',
  statsPlacement: '98%',
  featuredVideoUrl: 'https://www.youtube.com/embed/mU6anWqZJcc'
};

export const initialUsers: User[] = [
  {
    id: 'user-admin',
    name: 'MindSparQ System Admin',
    email: 'roadofriot@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    role: 'admin',
    isVerified: true,
    joinedDate: '2025-01-01'
  },
  {
    id: 'user-inst-1',
    name: 'Samay Budhoki Chhetri',
    email: 'ceo@mindsparq.edu.np',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    role: 'instructor',
    instructorProfileId: 'inst-1',
    isVerified: true,
    joinedDate: '2025-02-15'
  },
  {
    id: 'user-inst-2',
    name: 'Dipisha Chhetri',
    email: 'dipisha@mindsparq.edu.np',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    role: 'instructor',
    instructorProfileId: 'inst-2',
    isVerified: true,
    joinedDate: '2025-03-01'
  },
  {
    id: 'user-student-1',
    name: 'Aanand Sharma',
    email: 'aanand.sharma@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    role: 'student',
    isVerified: true,
    joinedDate: '2026-05-10'
  },
  {
    id: 'user-student-2',
    name: 'Priyanka Karki',
    email: 'priyanka.karki@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    role: 'student',
    isVerified: true,
    joinedDate: '2026-06-01'
  }
];

export const initialTeacherRequests = [
  {
    id: 'req-1',
    name: 'Rajesh Acharya',
    email: 'rajesh.acharya@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    designation: 'Cloud DevOps Specialist',
    bio: 'AWS Certified Solutions Architect with 6+ years in Docker, Kubernetes, and CI/CD pipelines.',
    status: 'pending',
    requestedAt: '2026-07-30'
  }
];


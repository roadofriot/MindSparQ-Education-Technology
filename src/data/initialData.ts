import { Course, InstructorProfile, InstructionalPost, StudentInquiry } from '../types';

export const initialInstructors: InstructorProfile[] = [
  {
    id: 'inst-1',
    name: 'Er. Sandesh Sharma',
    nameNp: 'इन्जिनियर सन्देश शर्मा',
    email: 'sandesh.sharma@mindspack.edu.np',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    designation: 'Lead AI Engineer & Curriculum Director',
    designationNp: 'मुख्य एआई इन्जिनियर तथा पाठ्यक्रम निर्देशक',
    bio: '8+ years of experience in Machine Learning, Deep Learning, and LLM Applications. Former Senior AI Researcher.',
    bioNp: 'मेसिन लर्निङ, डीप लर्निङ र एआई प्रविधिमा ८+ वर्षको अनुभव भएको अनुभवी प्रशिक्षक।',
    qualifications: ['M.Sc. Computer Engineering (TU)', 'Certified Deep Learning Specialist', 'Ex-Senior Researcher at AI Labs'],
    expertise: ['Python', 'PyTorch', 'Generative AI', 'Computer Vision', 'Data Science'],
    rating: 4.9,
    totalStudents: 1420,
    totalCourses: 5,
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      youtube: 'https://youtube.com'
    },
    isVerified: true,
    joinedDate: '2023-01-15'
  },
  {
    id: 'inst-2',
    name: 'Priya Adhikari',
    nameNp: 'प्रिया अधिकारी',
    email: 'priya.adhikari@mindspack.edu.np',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    designation: 'Senior Full Stack Developer & UI/UX Specialist',
    designationNp: 'वरिष्ठ फूल स्ट्याक डेभलपर तथा यूआई/यूएक्स विज्ञ',
    bio: 'Architecting scalable web solutions and intuitive user interfaces. Passionate about empowering women in tech in Nepal.',
    bioNp: 'आधुनिक वेब एप्लिकेशन र उत्कृष्ट डिजिटल अनुभव निर्माणमा निपुण प्रशिक्षक।',
    qualifications: ['B.Sc. CSIT (Pulchowk Campus)', 'Senior Frontend Architect', 'Figma Certified Design Leader'],
    expertise: ['React', 'TypeScript', 'Node.js', 'Figma', 'Next.js', 'Tailwind CSS'],
    rating: 4.95,
    totalStudents: 1850,
    totalCourses: 4,
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
    isVerified: true,
    joinedDate: '2023-03-10'
  },
  {
    id: 'inst-3',
    name: 'Er. Roshan Shrestha',
    nameNp: 'इन्जिनियर रोशन श्रेष्ठ',
    email: 'roshan.shrestha@mindspack.edu.np',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    designation: 'Cloud Solutions Architect & DevOps Lead',
    designationNp: 'क्लाउड आर्किटेक्ट तथा डेभओप्स प्रमुख',
    bio: 'AWS & GCP Certified Architect specializing in Kubernetes, CI/CD automation, and High Availability Infrastructure.',
    bioNp: 'क्लाउड इन्फ्रास्ट्रक्चर र डेभओप्स अटोमेशनका विशेषज्ञ।',
    qualifications: ['AWS Certified Solutions Architect Professional', 'Certified Kubernetes Administrator (CKA)'],
    expertise: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD Pipelines'],
    rating: 4.88,
    totalStudents: 980,
    totalCourses: 3,
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },
    isVerified: true,
    joinedDate: '2023-06-20'
  },
  {
    id: 'inst-4',
    name: 'Anish Maharjan',
    nameNp: 'अनिश महर्जन',
    email: 'anish.maharjan@mindspack.edu.np',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    designation: 'Mobile App Engineer (Flutter & React Native)',
    designationNp: 'मोबाइल एप इन्जिनियर (फ्लटर र रिएक्ट नेटिभ)',
    bio: 'Cross-platform app developer with 30+ apps launched on Play Store and App Store.',
    bioNp: 'एन्ड्रोइड र आईओएस एप निर्माणका अनुभवी इन्जिनियर।',
    qualifications: ['B.E. Software Engineering', 'Google Certified Flutter Developer'],
    expertise: ['Flutter', 'Dart', 'React Native', 'Firebase', 'State Management'],
    rating: 4.92,
    totalStudents: 1120,
    totalCourses: 3,
    social: {
      youtube: 'https://youtube.com',
      github: 'https://github.com'
    },
    isVerified: true,
    joinedDate: '2023-08-01'
  }
];

export const initialCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Full Stack Web Development with React & Node.js',
    titleNp: 'रिएक्ट र नोड जेएसबाट फुल स्ट्याक वेब डेभलपमेन्ट',
    description: 'Master modern MERN stack development from scratch. Build production-ready web platforms with real-time features and database setup.',
    descriptionNp: 'सुरुवातदेखि एडभान्स स्तरसम्म आधुनिक फुल स्ट्याक वेब डेभलपमेन्ट सिक्नुहोस्।',
    category: 'Software Engineering',
    instructorId: 'inst-2',
    instructorName: 'Priya Adhikari',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    level: 'Beginner',
    duration: '12 Weeks (60 Hours)',
    lessonsCount: 48,
    rating: 4.9,
    reviewsCount: 312,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    previewVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    price: 15000,
    isFree: false,
    featured: true,
    createdAt: '2024-01-10',
    modules: [
      { id: 'm1', title: 'HTML5, CSS3 & Modern Tailwind Design', duration: '2 Weeks', videoUrl: 'https://www.youtube.com/embed/mU6anWqZJcc' },
      { id: 'm2', title: 'JavaScript ES6+ & TypeScript Mastery', duration: '3 Weeks', videoUrl: 'https://www.youtube.com/embed/mU6anWqZJcc' },
      { id: 'm3', title: 'React 19 & State Management Patterns', duration: '3 Weeks', videoUrl: 'https://www.youtube.com/embed/mU6anWqZJcc' },
      { id: 'm4', title: 'Express Backend, REST API & MongoDB/SQL', duration: '4 Weeks', videoUrl: 'https://www.youtube.com/embed/mU6anWqZJcc' }
    ]
  },
  {
    id: 'course-2',
    title: 'Applied Generative AI & Python Masterclass',
    titleNp: 'व्याहारिक जेनेरेटिभ एआई र पाइथन मास्टरक्लास',
    description: 'Learn Python programming, neural networks, LLM integration using Gemini API, and build intelligent AI chatbots.',
    descriptionNp: 'पाइथन र एआई प्रविधिको प्रयोग गरी आफ्नै स्मार्ट एआई सिस्टमहरू बनाउनुहोस्।',
    category: 'AI & Data Science',
    instructorId: 'inst-1',
    instructorName: 'Er. Sandesh Sharma',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    level: 'Intermediate',
    duration: '10 Weeks (50 Hours)',
    lessonsCount: 40,
    rating: 4.96,
    reviewsCount: 240,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    previewVideoUrl: 'https://www.youtube.com/embed/mU6anWqZJcc',
    price: 18000,
    isFree: false,
    featured: true,
    createdAt: '2024-02-01',
    modules: [
      { id: 'm1', title: 'Python for Data Science Fundamentals', duration: '2 Weeks' },
      { id: 'm2', title: 'Machine Learning Models & Scikit-Learn', duration: '3 Weeks' },
      { id: 'm3', title: 'Deep Learning with PyTorch', duration: '2 Weeks' },
      { id: 'm4', title: 'LLMs, Prompt Engineering & Gemini API', duration: '3 Weeks' }
    ]
  },
  {
    id: 'course-3',
    title: 'DevOps & AWS Cloud Architecture Essentials',
    titleNp: 'डेभओप्स र एडब्लुएस क्लाउड आर्किटेक्चर',
    description: 'Deploy, scale, and automate cloud applications using Docker, Kubernetes, Terraform, and AWS Services.',
    descriptionNp: 'डकर, कुबरनेटिस र एडब्लुएस प्रविधिको प्रयोग गरी आधुनिक क्लाउड इन्फ्रास्ट्रक्चर सेटअप गर्नुहोस्।',
    category: 'Cloud & DevOps',
    instructorId: 'inst-3',
    instructorName: 'Er. Roshan Shrestha',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    level: 'Advanced',
    duration: '8 Weeks (40 Hours)',
    lessonsCount: 32,
    rating: 4.88,
    reviewsCount: 175,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
    price: 20000,
    isFree: false,
    featured: false,
    createdAt: '2024-03-15',
    modules: [
      { id: 'm1', title: 'Linux System Admin & Shell Scripting', duration: '2 Weeks' },
      { id: 'm2', title: 'Docker Containerization Fundamentals', duration: '2 Weeks' },
      { id: 'm3', title: 'AWS Core Services (EC2, S3, RDS, CloudFront)', duration: '2 Weeks' },
      { id: 'm4', title: 'Kubernetes Orchestration & CI/CD Pipelines', duration: '2 Weeks' }
    ]
  },
  {
    id: 'course-4',
    title: 'Cross-Platform Mobile App Development with Flutter',
    titleNp: 'फ्लटरबाट एन्ड्रोइड र आईओएस मोबाइल एप डेभलपमेन्ट',
    description: 'Build beautiful native iOS and Android apps with a single Dart codebase. Integrate REST APIs and Firebase.',
    descriptionNp: 'एउटै कोडबाट एन्ड्रोइड र आईओएस दुवैका लागि आकर्षक एपहरू निर्माण गर्नुहोस्।',
    category: 'Mobile Development',
    instructorId: 'inst-4',
    instructorName: 'Anish Maharjan',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    level: 'Beginner',
    duration: '10 Weeks (50 Hours)',
    lessonsCount: 42,
    rating: 4.91,
    reviewsCount: 198,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
    price: 14000,
    isFree: false,
    featured: true,
    createdAt: '2024-04-01',
    modules: [
      { id: 'm1', title: 'Dart Programming Language Basics', duration: '2 Weeks' },
      { id: 'm2', title: 'Flutter Widgets & Responsive Layouts', duration: '3 Weeks' },
      { id: 'm3', title: 'State Management (Provider & Bloc)', duration: '2 Weeks' },
      { id: 'm4', title: 'Firebase Authentication & App Publishing', duration: '3 Weeks' }
    ]
  }
];

export const initialPosts: InstructionalPost[] = [
  {
    id: 'post-1',
    authorId: 'admin-1',
    authorName: 'Mindspack Admin Team',
    authorAvatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&auto=format&fit=crop&q=80',
    authorRole: 'admin',
    title: '📢 Admission Open for Spring 2026 Tech Bootcamp Batch',
    titleNp: '📢 स्प्रिङ २०२६ टेक बूटक्याम्पका लागि भर्ना खुल्यो!',
    content: 'Mindspack Education and Technology announces admissions for Full Stack Web, Artificial Intelligence, and Cloud Architecture. Limited seats available! Early bird scholarship of 20% available for top applicants.',
    contentNp: 'माइन्डस्प्याक एजुकेशन एण्ड टेक्नोलोजी द्वारा सञ्चालित नयाँ ब्याचमा भर्ना सुरु भएको छ। २०% सम्म छात्रवृत्तिको सुविधा उपलब्ध छ।',
    type: 'announcement',
    mediaUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    category: 'Announcements',
    likes: 124,
    likedByMe: false,
    commentsCount: 18,
    createdAt: '2026-07-28',
    tags: ['Mindspack', 'Bootcamp', 'Scholarship', 'IT Training Nepal']
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
    commentsCount: 42,
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
    commentsCount: 23,
    createdAt: '2026-07-20',
    tags: ['WebDev', 'UIUX', 'TailwindCSS', 'Tips']
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

export type UserRole = 'guest' | 'student' | 'instructor' | 'admin';

export type Language = 'np' | 'en';

export interface InstructorProfile {
  id: string;
  name: string;
  nameNp?: string;
  email: string;
  avatar: string;
  designation: string;
  designationNp?: string;
  bio: string;
  bioNp?: string;
  qualifications: string[];
  expertise: string[];
  rating: number;
  totalStudents: number;
  totalCourses: number;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  isVerified: boolean;
  joinedDate: string;
}

export interface CourseModule {
  id: string;
  title: string;
  titleNp?: string;
  duration: string;
  videoUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  titleNp?: string;
  description: string;
  descriptionNp?: string;
  category: 'Software Engineering' | 'AI & Data Science' | 'Cloud & DevOps' | 'UI/UX Design' | 'Cyber Security' | 'Mobile Development';
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessonsCount: number;
  rating: number;
  reviewsCount: number;
  thumbnail: string;
  previewVideoUrl?: string;
  price: number;
  isFree?: boolean;
  featured?: boolean;
  modules: CourseModule[];
  createdAt: string;
}

export interface InstructionalPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'admin' | 'instructor';
  title: string;
  titleNp?: string;
  content: string;
  contentNp?: string;
  type: 'video' | 'photo' | 'announcement' | 'resource';
  mediaUrl?: string; // Image or YouTube embed URL
  videoEmbedUrl?: string;
  category: string;
  likes: number;
  likedByMe?: boolean;
  commentsCount: number;
  createdAt: string;
  tags: string[];
}

export interface StudentInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseInterested: string;
  message: string;
  status: 'new' | 'contacted' | 'enrolled';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  instructorProfileId?: string;
}

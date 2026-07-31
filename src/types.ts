export type UserRole = 'guest' | 'student' | 'instructor' | 'admin';

export type Language = 'en' | 'np' | 'zh';

export interface InstructorProfile {
  id: string;
  name: string;
  nameNp?: string;
  nameZh?: string;
  email: string;
  avatar: string;
  designation: string;
  designationNp?: string;
  designationZh?: string;
  bio: string;
  bioNp?: string;
  bioZh?: string;
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
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };
  isVerified: boolean;
  joinedDate: string;
}

export interface CourseModule {
  id: string;
  title: string;
  titleNp?: string;
  titleZh?: string;
  duration: string;
  videoUrl?: string;
  driveUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  titleNp?: string;
  titleZh?: string;
  description: string;
  descriptionNp?: string;
  descriptionZh?: string;
  category: 'Academic Programs' | 'Technology Programs' | 'School Solutions' | 'Software Engineering' | 'AI & Data Science' | 'Cloud & DevOps' | 'Mobile Development' | string;
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
  driveUrl?: string;
  price: number;
  isFree?: boolean;
  featured?: boolean;
  modules: CourseModule[];
  createdAt: string;
}

export interface PostComment {
  id: string;
  postId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  text: string;
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
  titleZh?: string;
  content: string;
  contentNp?: string;
  contentZh?: string;
  type: 'video' | 'photo' | 'announcement' | 'resource';
  mediaUrl?: string; // Image or YouTube embed URL
  videoEmbedUrl?: string;
  driveUrl?: string; // Google Drive document or video URL
  category: string;
  likes: number;
  likedByMe?: boolean;
  commentsCount: number;
  comments?: PostComment[];
  createdAt: string;
  tags: string[];
}

export interface TeacherLoginRequest {
  id: string;
  name: string;
  email: string;
  avatar: string;
  designation: string;
  bio: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
}

export interface HomeContentConfig {
  heroTitleEn: string;
  heroTitleNp: string;
  heroTitleZh?: string;
  heroSubtitleEn: string;
  heroSubtitleNp: string;
  heroSubtitleZh?: string;
  bannerNoticeEn: string;
  bannerNoticeNp: string;
  bannerNoticeZh?: string;
  statsStudents: string;
  statsInstructors: string;
  statsPlacement: string;
  featuredVideoUrl: string;
}

export interface DailyPhotoSlide {
  id: string;
  title: string;
  titleNp?: string;
  titleZh?: string;
  caption: string;
  captionNp?: string;
  captionZh?: string;
  imageUrl: string;
  date: string;
  category: 'Hackathon' | 'Workshop' | 'Classroom' | 'Guest Lecture' | 'Lab Session' | 'Event';
  authorName: string;
}

export interface StudentCertificate {
  certificateId: string;
  studentName: string;
  courseTitle: string;
  issueDate: string;
  instructorName: string;
  grade: string;
  verificationHash: string;
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

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  titleNp?: string;
  titleZh?: string;
  category: 'Core Page' | 'Program' | 'Landing Page' | 'Policy' | 'System Page';
  content: string;
  contentNp?: string;
  contentZh?: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  status: 'published' | 'draft' | 'scheduled';
  lastModified: string;
  author: string;
  views: number;
  heroCtaText?: string;
  heroCtaLink?: string;
  featuredVideoUrl?: string;
}

export interface ReadingHistoryItem {
  id: string;
  title: string;
  type: 'course' | 'post';
  visitedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  instructorProfileId?: string;
  isVerified?: boolean;
  joinedDate?: string;
}

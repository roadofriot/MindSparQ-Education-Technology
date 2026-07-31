import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  Globe, 
  Eye, 
  Sparkles, 
  CheckCircle, 
  Search, 
  Layers, 
  Copy, 
  Clock, 
  Save, 
  X, 
  ExternalLink, 
  Share2, 
  Settings,
  HelpCircle,
  Code,
  Download,
  Upload,
  Check,
  CheckSquare,
  Square,
  Smartphone,
  Monitor,
  ArrowUpRight,
  ShieldCheck,
  BookOpen,
  Radio,
  Image as ImageIcon,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  titleNp?: string;
  category: 'Core Page' | 'Program' | 'Landing Page' | 'Policy' | 'System Page';
  content: string;
  contentNp?: string;
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

export const PageEditor: React.FC = () => {
  const { language } = useApp();
  const isNp = language === 'np';

  // Comprehensive CMS pages library representing ALL core pages, programs, instruction fields, landing pages, and policies
  const [pages, setPages] = useState<CmsPage[]>([
    {
      id: 'page-1',
      slug: 'home',
      title: 'Homepage - MindSparQ Main Portal',
      titleNp: 'गृहपृष्ठ - माइन्डस्पार्क मुख्य पोर्टल',
      category: 'Core Page',
      content: 'Welcome to MindSparQ Education & Technology. Elevating STEM & IT learning across Nepal through high-impact courses, daily campus updates, verified expert mentors, and interactive teacher instruction panels.',
      contentNp: 'माइंडस्पार्क (MindSparQ) एजुकेशन एण्ड टेक्नोलोजीमा स्वागत छ। नेपालभरि आधुनिक एआई, कोडिङ, एबाकस र STEM शिक्षा विस्तार गर्ने प्रमुख डिजिटल मञ्च।',
      metaTitle: 'MindSparQ Education & Technology | IT & STEM Learning Portal',
      metaDescription: 'MindSparQ is Nepal’s premier IT and STEM education platform offering practical coding courses, daily campus feeds, and verified instructor access.',
      ogImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      lastModified: '2026-07-30',
      author: 'Super Admin',
      views: 24500,
      heroCtaText: 'Explore All Programs',
      heroCtaLink: '/courses',
      featuredVideoUrl: 'https://www.youtube.com/embed/mU6anWqZJcc'
    },
    {
      id: 'page-2',
      slug: 'about-us',
      title: 'About Us & Corporate Vision',
      titleNp: 'हाम्रो बारेमा र संस्थागत सोच',
      category: 'Core Page',
      content: 'MindSparQ was founded to bridge the gap between academic theory and industry demands in software engineering, AI, cloud computing, Abacus mental arithmetic, and secondary STEM education.',
      contentNp: 'माइंडस्पार्कको स्थापना नेपालमा प्रविधि र शिक्षा क्षेत्रमा रहेका खाडलहरू पुरेर १०,००० भन्दा बढी नयाँ जनशक्ति तयार पार्ने उद्देश्यले गरिएको हो।',
      metaTitle: 'About MindSparQ | Mission, Vision & Executive Leadership',
      metaDescription: 'Learn about MindSparQ’s mission to train 10,000+ technology leaders in Nepal.',
      ogImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      lastModified: '2026-07-28',
      author: 'Content Manager',
      views: 8900
    },
    {
      id: 'page-3',
      slug: 'academic-programs',
      title: 'Academic Programs & School STEM Lab',
      titleNp: 'शैक्षिक कार्यक्रम तथा विद्यालय स्टेम ल्याब',
      category: 'Program',
      content: 'Full curriculum support for schools including Abacus mental math, Vedic mathematics, robotics labs, hands-on science kits, and teacher enablement workshops across Kathmandu Valley and nationwide.',
      contentNp: 'विद्यालयहरूका लागि एबाकस, वैदिक गणित, रोबोटिक्स ल्याब तथा शिक्षक तालिम कार्यक्रमहरू।',
      metaTitle: 'Academic STEM & School Programs | MindSparQ',
      metaDescription: 'Integrate cutting-edge STEM and robotics labs into school curriculums with MindSparQ.',
      ogImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      lastModified: '2026-07-25',
      author: 'Super Admin',
      views: 6400
    },
    {
      id: 'page-4',
      slug: 'technology-programs',
      title: 'Technology Programs & Career Bootcamps',
      titleNp: 'प्रविधि तालिम तथा करियर बूटक्याम्पहरू',
      category: 'Program',
      content: 'Industry-driven software engineering bootcamps covering Full Stack Web (React, Node.js), Applied Generative AI with Gemini API, Cloud DevOps, and Cross-Platform Mobile App Development with Flutter.',
      contentNp: 'फूल स्ट्याक वेब विकास, जेनेरेटिभ एआई, क्लाउड कम्प्युटिङ र मोबाइल एप विकास सम्बन्धी विशेष तालिमहरू।',
      metaTitle: 'Technology Bootcamps & IT Career Tracks | MindSparQ',
      metaDescription: 'Master Full Stack Web, AI, Cloud, and Mobile Development with hands-on lab projects.',
      ogImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      lastModified: '2026-07-29',
      author: 'Tech Lead',
      views: 12800
    },
    {
      id: 'page-5',
      slug: 'school-solutions',
      title: 'School Partnership & STEM Lab Solutions',
      titleNp: 'विद्यालय साझेदारी तथा स्टेम ल्याब स्थापना',
      category: 'Program',
      content: 'Turnkey institutional solutions for progressive schools in Nepal. Includes AI integration for teachers, DMIT multiple intelligence brain mapping, customized curriculum kits, and annual TOT workshops.',
      contentNp: 'विद्यालयहरूको डिजिटल रुपान्तरण, DMIT मस्तिष्क परीक्षण र शिक्षक क्षमता विकास कार्यक्रम।',
      metaTitle: 'School Partnership & Institutional STEM Labs | MindSparQ',
      metaDescription: 'Empower your school with AI tools, teacher training (TOT), and STEM hardware labs.',
      ogImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      lastModified: '2026-07-27',
      author: 'Super Admin',
      views: 5300
    },
    {
      id: 'page-6',
      slug: 'courses',
      title: 'Course Directory & Skill Catalog',
      titleNp: 'पाठ्यक्रम निर्देशिका तथा सीप क्याटलग',
      category: 'Core Page',
      content: 'Explore all certified training tracks offered by MindSparQ. Filter by difficulty, level, category, and instructor profiles. Features instant syllabus preview and direct student enrollment.',
      contentNp: 'माइंडस्पार्कद्वारा सञ्चालित सम्पूर्ण तालिम, पाठ्यक्रम तथा शुल्क विवरण हेर्नुहोस्।',
      metaTitle: 'All IT & STEM Courses | MindSparQ Education',
      metaDescription: 'Browse top coding, AI, robotics, and academic courses taught by verified instructors.',
      ogImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      lastModified: '2026-07-30',
      author: 'Academic Lead',
      views: 18900
    },
    {
      id: 'page-7',
      slug: 'instructional-feed',
      title: 'Instructional Feed & Knowledge Stream',
      titleNp: 'निर्देशन फिड तथा प्रत्यक्ष जानकारी च्यानल',
      category: 'Core Page',
      content: 'Live public feed broadcasting instructional videos, photo galleries, official notices, and Google Drive learning assets published directly by verified teachers and system administrators.',
      contentNp: 'शिक्षक तथा प्रशासकहरूद्वारा सम्प्रेषित प्रत्यक्ष सूचना, भिडियो सामग्री र अध्ययन स्रोतहरू।',
      metaTitle: 'Live Instructional Feed & Video Stream | MindSparQ',
      metaDescription: 'Access free video tutorials, official notices, and learning resources updated daily.',
      ogImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      lastModified: '2026-07-30',
      author: 'Content Team',
      views: 15400
    },
    {
      id: 'page-8',
      slug: 'daily-campus-gallery',
      title: 'Daily Campus Gallery & Event Showcase',
      titleNp: 'दैनिक क्याम्पस ग्यालरी तथा कार्यक्रम झलक',
      category: 'Core Page',
      content: 'High-definition daily photo highlights capturing live classroom moments, student hackathons, STEM hardware experiments, and guest lectures across our Kathmandu campus.',
      contentNp: 'क्याम्पसमा सञ्चालित दैनिक गतिविधि, ह्याकाथन र प्रयोगशालाका तस्विरहरू।',
      metaTitle: 'Daily Campus Life & Photo Gallery | MindSparQ',
      metaDescription: 'Explore daily photo highlights from student workshops, coding bootcamps, and robotics labs.',
      ogImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      lastModified: '2026-07-29',
      author: 'Media Manager',
      views: 9200
    },
    {
      id: 'page-9',
      slug: 'hackathon-2026',
      title: 'Nepal National Student AI Hackathon 2026',
      titleNp: 'नेपाल राष्ट्रिय विद्यार्थी एआई ह्याकाथन २०२६',
      category: 'Landing Page',
      content: 'Register for Nepal’s largest 48-hour student AI hackathon sponsored by top tech firms and software houses. NPR 500,000 total cash prizes, mentorship, and direct hiring opportunities.',
      contentNp: 'नेपालभरिका विद्यार्थीहरूका लागि आयोजना गरिएको ४८-घण्टे एआई ह्याकाथन। रु ५ लाख नगद पुरस्कार।',
      metaTitle: 'Nepal AI Hackathon 2026 | Register Student Teams',
      metaDescription: 'Compete in the 48-hour AI Hackathon 2026. Cash prizes, tech mentorship, and job placements.',
      ogImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      lastModified: '2026-07-29',
      author: 'Events Lead',
      views: 14200,
      heroCtaText: 'Register Team Now',
      heroCtaLink: '/contact'
    },
    {
      id: 'page-10',
      slug: 'teacher-portal',
      title: 'Teacher & Instructor Login Portal',
      titleNp: 'शिक्षक तथा प्रशिक्षक लगइन पोर्टल',
      category: 'System Page',
      content: 'Dedicated working dashboard for verified MindSparQ educators. Features one-click Google OAuth verification, broadcast video publishing tools, Google Drive embed integrations, and student assignment tracking.',
      contentNp: 'प्रमाणित शिक्षकहरूका लागि कक्षा सञ्चालन, सामग्री प्रकाशन तथा गुगल लगइन व्यवस्थापन पोर्टल।',
      metaTitle: 'Teacher Access Portal & Instruction Panel | MindSparQ',
      metaDescription: 'Log in to manage your classes, post video broadcasts, and review student progress.',
      ogImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      lastModified: '2026-07-30',
      author: 'System Admin',
      views: 11000
    },
    {
      id: 'page-11',
      slug: 'student-verification',
      title: 'Student Certificate Verification Registry',
      titleNp: 'विद्यार्थी प्रमाणपत्र प्रमाणीकरण रजिष्ट्री',
      category: 'System Page',
      content: 'Official verification portal for checking student graduation certificates, course grades, instructor signatures, and cryptographic verification hashes.',
      contentNp: 'माइन्डस्पार्कद्वारा जारी गरिएका प्रमाणपत्रहरूको आधिकारिक अनलाइन प्रमाणीकरण।',
      metaTitle: 'Verify MindSparQ Student Certificate | Online Hash Lookup',
      metaDescription: 'Verify authenticity of MindSparQ diplomas and certificates with unique certificate IDs.',
      ogImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      lastModified: '2026-07-28',
      author: 'Registry Officer',
      views: 7800
    },
    {
      id: 'page-12',
      slug: 'admissions-scholarship',
      title: 'Admissions & Early Bird Scholarship Application',
      titleNp: 'भर्ना आवेदन तथा छात्रवृत्ति फारम',
      category: 'Landing Page',
      content: 'Apply for upcoming bootcamps, academic training, or request financial scholarship assistance. Direct online evaluation and fast admission response within 24 hours.',
      contentNp: 'नयाँ ब्याचका लागि अनलाइन भर्ना फारम भर्नुहोस् र २५% सम्म छात्रवृत्ति प्राप्त गर्नुहोस्।',
      metaTitle: 'Apply for IT Courses & Scholarships | MindSparQ Nepal',
      metaDescription: 'Submit student admission inquiries or scholarship requests for IT bootcamps.',
      ogImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      lastModified: '2026-07-29',
      author: 'Admissions Desk',
      views: 13500
    },
    {
      id: 'page-13',
      slug: 'contact-support',
      title: 'Contact Us & Campus Inquiry Desk',
      titleNp: 'सम्पर्क तथा क्याम्पस परामर्श डेस्क',
      category: 'Core Page',
      content: 'Get in touch with our admissions desk, school partnership team, or CEO office. Located at Tinkune, Kathmandu. Phone: +977-1-4791234, Email: info@mindsparq.edu.np.',
      contentNp: 'तीनकुने, काठमाडौँ स्थित हाम्रो कार्यालयमा सम्पर्क वा प्रत्यक्ष परामर्शका लागि जानकारी।',
      metaTitle: 'Contact MindSparQ Education | Tinkune, Kathmandu',
      metaDescription: 'Contact MindSparQ for course admissions, school STEM lab partnerships, and campus visits.',
      ogImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      lastModified: '2026-07-30',
      author: 'Front Desk',
      views: 16200
    },
    {
      id: 'page-14',
      slug: 'privacy-terms',
      title: 'Privacy Policy & Institutional Terms',
      titleNp: 'गोपनीयता नीति तथा सर्तहरू',
      category: 'Policy',
      content: 'Official terms of service, student privacy policy, refund guidelines, and institutional standards for MindSparQ Education & Technology.',
      contentNp: 'माइंडस्पार्क शिक्षा तथा प्रविधिको गोपनीयता नीति र सेवा सर्तहरू।',
      metaTitle: 'Privacy Policy & Terms of Service | MindSparQ',
      metaDescription: 'Read MindSparQ’s user privacy terms, data handling policies, and student standards.',
      ogImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&auto=format&fit=crop&q=80',
      status: 'published',
      lastModified: '2026-07-15',
      author: 'Legal Counsel',
      views: 3100
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [selectedPageIds, setSelectedPageIds] = useState<string[]>([]);
  
  // Page Modal Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<CmsPage | null>(null);
  const [form, setForm] = useState<Partial<CmsPage>>({});
  
  // Live Preview Modal
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Export / Import JSON Modal
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // AI Assist Local State inside Modal
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredPages = pages.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'All' || p.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  // Calculate metrics
  const totalPagesCount = pages.length;
  const publishedCount = pages.filter(p => p.status === 'published').length;
  const draftCount = pages.filter(p => p.status === 'draft').length;
  const totalViewsSum = pages.reduce((acc, p) => acc + p.views, 0);

  const handleOpenModal = (page?: CmsPage) => {
    if (page) {
      setEditingPage(page);
      setForm(page);
    } else {
      setEditingPage(null);
      setForm({
        slug: 'new-landing-page',
        title: '',
        titleNp: '',
        category: 'Landing Page',
        content: '',
        contentNp: '',
        metaTitle: '',
        metaDescription: '',
        ogImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
        status: 'published',
        author: 'Super Admin',
        views: 0,
        heroCtaText: 'Enroll Now',
        heroCtaLink: '/contact'
      });
    }
    setIsModalOpen(true);
  };

  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) return;

    const formattedSlug = form.slug.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    if (editingPage) {
      setPages(prev =>
        prev.map(p => (p.id === editingPage.id ? { 
          ...p, 
          ...form, 
          slug: formattedSlug,
          lastModified: new Date().toISOString().split('T')[0] 
        } as CmsPage : p))
      );
      showToast(`Page "${form.title}" updated successfully!`);
    } else {
      const newP: CmsPage = {
        id: `page-${Date.now()}`,
        slug: formattedSlug,
        title: form.title,
        titleNp: form.titleNp || form.title,
        category: form.category || 'Landing Page',
        content: form.content || '',
        contentNp: form.contentNp || form.content || '',
        metaTitle: form.metaTitle || form.title,
        metaDescription: form.metaDescription || (form.content ? form.content.slice(0, 150) : ''),
        ogImage: form.ogImage || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
        status: form.status || 'published',
        lastModified: new Date().toISOString().split('T')[0],
        author: 'Super Admin',
        views: 1,
        heroCtaText: form.heroCtaText,
        heroCtaLink: form.heroCtaLink,
        featuredVideoUrl: form.featuredVideoUrl
      };
      setPages(prev => [newP, ...prev]);
      showToast(`New page "${form.title}" published live!`);
    }
    setIsModalOpen(false);
  };

  const handleDeletePage = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setPages(prev => prev.filter(p => p.id !== id));
      setSelectedPageIds(prev => prev.filter(item => item !== id));
      showToast(`Deleted "${title}"`);
    }
  };

  const handleDuplicatePage = (page: CmsPage) => {
    const dup: CmsPage = {
      ...page,
      id: `page-dup-${Date.now()}`,
      slug: `${page.slug}-copy`,
      title: `${page.title} (Copy)`,
      status: 'draft',
      lastModified: new Date().toISOString().split('T')[0],
      views: 0
    };
    setPages(prev => [dup, ...prev]);
    showToast(`Duplicated page as "${dup.title}"`);
  };

  const handleToggleStatus = (id: string) => {
    setPages(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextStatus = p.status === 'published' ? 'draft' : 'published';
          showToast(`Toggled ${p.slug} status to ${nextStatus}`);
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const handleCopySlugLink = (slug: string) => {
    const fullUrl = `https://mindsparq.edu.np/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    showToast(`Copied URL: ${fullUrl}`);
  };

  // Bulk Actions
  const handleSelectAll = () => {
    if (selectedPageIds.length === filteredPages.length) {
      setSelectedPageIds([]);
    } else {
      setSelectedPageIds(filteredPages.map(p => p.id));
    }
  };

  const handleToggleSelectPage = (id: string) => {
    setSelectedPageIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkPublish = () => {
    setPages(prev =>
      prev.map(p => selectedPageIds.includes(p.id) ? { ...p, status: 'published' } : p)
    );
    showToast(`Published ${selectedPageIds.length} selected pages`);
    setSelectedPageIds([]);
  };

  const handleBulkDraft = () => {
    setPages(prev =>
      prev.map(p => selectedPageIds.includes(p.id) ? { ...p, status: 'draft' } : p)
    );
    showToast(`Set ${selectedPageIds.length} selected pages to Draft`);
    setSelectedPageIds([]);
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedPageIds.length} selected pages?`)) {
      setPages(prev => prev.filter(p => !selectedPageIds.includes(p.id)));
      showToast(`Deleted ${selectedPageIds.length} pages`);
      setSelectedPageIds([]);
    }
  };

  // AI Content & SEO Auto Generator simulation
  const handleAiAutoGenerate = () => {
    if (!form.title) {
      alert('Please enter a Page Title first to trigger AI Generation.');
      return;
    }
    setIsAiGenerating(true);
    setTimeout(() => {
      setForm(prev => ({
        ...prev,
        content: prev.content || `[AI Generated Full Page Content for ${prev.title}]\n\nMindSparQ Education & Technology is dedicated to providing high-impact learning experiences in ${prev.title}. Designed by industry experts and tailored for Nepali students and progressive academic institutions, this program combines hands-on practical lab sessions with theoretical mastery.\n\nKey Highlights:\n- Certified expert instructors and mentorship\n- Practical lab assignments and real-world projects\n- Recognized certificate with cryptographic hash verification\n- Career counseling and job placement assistance`,
        contentNp: prev.contentNp || `${prev.title} सम्बन्धी माइन्डस्पार्क शिक्षा तथा प्रविधिको आधिकारिक जानकारी। यस कार्यक्रमले विद्यार्थीहरूलाई प्रयोगात्मक अभ्यास, एआई टुल्स र आधुनिक सीपमा दक्ष बनाउँछ।`,
        metaTitle: `${prev.title} | MindSparQ Education Nepal`,
        metaDescription: `Discover ${prev.title} at MindSparQ Nepal. World-class IT and STEM learning with verified mentors, practical labs, and career support.`,
        heroCtaText: prev.heroCtaText || 'Explore Program',
        heroCtaLink: prev.heroCtaLink || '/contact'
      }));
      setIsAiGenerating(false);
      showToast('AI Content & SEO metadata generated!');
    }, 1100);
  };

  // Export JSON Schema
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mindsparq_cms_pages_config_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported CMS Pages JSON!');
  };

  // Import JSON Schema
  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setPages(parsed);
        setIsJsonModalOpen(false);
        setJsonInput('');
        showToast(`Imported ${parsed.length} pages from JSON configuration!`);
      } else {
        alert('Invalid JSON array format.');
      }
    } catch (e) {
      alert('Failed to parse JSON string. Please check format.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 animate-bounce border border-indigo-500">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Overview Analytics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Pages</p>
            <p className="text-lg font-black text-slate-900">{totalPagesCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Published Live</p>
            <p className="text-lg font-black text-emerald-700">{publishedCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Drafts</p>
            <p className="text-lg font-black text-amber-700">{draftCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">CMS Page Views</p>
            <p className="text-lg font-black text-purple-700">{totalViewsSum.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      {/* Header & Main Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Globe className="w-5 h-5 text-indigo-600" />
            <span>{isNp ? 'वेबसाइट पृष्ठ सम्पादन र व्यवस्थापन (Website Pages & Landing Page CMS)' : 'Website Pages & Landing Page CMS Engine'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Full authority over every core page, landing page, program, instruction field, and policy on MindSparQ.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0 flex-wrap">
          <button
            onClick={handleExportJson}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
            title="Export CMS config to JSON"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={() => setIsJsonModalOpen(true)}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
            title="Import CMS config from JSON"
          >
            <Upload className="w-3.5 h-3.5 text-indigo-600" />
            <span>Import JSON</span>
          </button>

          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{isNp ? '+ नयाँ पृष्ठ सिर्जना गर्नुहोस्' : '+ Create New CMS Page'}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search page title, category, or slug..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'Core Page', 'Program', 'Landing Page', 'System Page', 'Policy'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Action Toolbar */}
      {selectedPageIds.length > 0 && (
        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-between text-xs font-bold text-indigo-900 animate-fade-in">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[10px]">
              {selectedPageIds.length}
            </span>
            <span>Pages Selected</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleBulkPublish}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px]"
            >
              Bulk Publish
            </button>
            <button
              onClick={handleBulkDraft}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px]"
            >
              Bulk Draft
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px]"
            >
              Bulk Delete
            </button>
          </div>
        </div>
      )}

      {/* Pages Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="p-4 w-10">
                  <button onClick={handleSelectAll} className="p-1 text-slate-400 hover:text-indigo-600">
                    {selectedPageIds.length === filteredPages.length && filteredPages.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="p-4">Page Title & URL Slug</th>
                <th className="p-4">Category</th>
                <th className="p-4">SEO Meta Title</th>
                <th className="p-4">Publish Status</th>
                <th className="p-4">Views</th>
                <th className="p-4">Last Modified</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPages.map((page) => {
                const isSelected = selectedPageIds.includes(page.id);
                return (
                  <tr key={page.id} className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-indigo-50/30' : ''}`}>
                    <td className="p-4">
                      <button onClick={() => handleToggleSelectPage(page.id)} className="p-1">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-indigo-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300" />
                        )}
                      </button>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <p className="font-bold text-slate-900 text-xs">
                            {page.title}
                          </p>
                          {page.heroCtaText && (
                            <span className="px-1.5 py-0.5 bg-violet-100 text-violet-800 text-[9px] font-bold rounded">
                              CTA Active
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 font-mono text-[11px] text-indigo-600">
                          <span>/{page.slug}</span>
                          <button
                            onClick={() => handleCopySlugLink(page.slug)}
                            className="p-0.5 text-slate-400 hover:text-indigo-600"
                            title="Copy Live Link"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px] border border-slate-200">
                        {page.category}
                      </span>
                    </td>

                    <td className="p-4 max-w-xs truncate text-slate-600 text-[11px]" title={page.metaTitle}>
                      {page.metaTitle || page.title}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(page.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                          page.status === 'published' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                        }`}
                        title="Click to toggle status"
                      >
                        {page.status}
                      </button>
                    </td>

                    <td className="p-4 text-slate-600 text-[11px] font-mono">
                      {page.views.toLocaleString()}
                    </td>

                    <td className="p-4 text-slate-500 text-[11px] font-mono">
                      {page.lastModified}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => {
                            setForm(page);
                            setPreviewOpen(true);
                          }}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg"
                          title="Live Preview Page"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicatePage(page)}
                          className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
                          title="Duplicate Page"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenModal(page)}
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                          title="Edit Page & SEO"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePage(page.id, page.title)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                          title="Delete Page"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT PAGE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full my-8 p-6 space-y-6 shadow-2xl relative text-slate-900">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">{editingPage ? 'Edit CMS Page & SEO' : 'Create New CMS Page'}</h3>
                  <p className="text-xs text-slate-500">Configure page content, SEO meta tags, CTA buttons, and publishing status</p>
                </div>
              </div>

              {/* AI Auto Generate Button */}
              <button
                type="button"
                onClick={handleAiAutoGenerate}
                disabled={isAiGenerating}
                className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-xs font-bold shadow-sm hover:opacity-90 flex items-center space-x-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>{isAiGenerating ? 'AI Writing...' : 'AI Auto-Fill SEO'}</span>
              </button>
            </div>

            <form onSubmit={handleSavePage} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Page Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={form.title || ''}
                    onChange={(e) => {
                      const titleVal = e.target.value;
                      const autoSlug = titleVal.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                      setForm({ ...form, title: titleVal, slug: form.slug || autoSlug });
                    }}
                    placeholder="e.g. Technology Programs & Bootcamps"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={form.slug || ''}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="technology-programs"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">शीर्षक (नेपाली)</label>
                  <input
                    type="text"
                    value={form.titleNp || ''}
                    onChange={(e) => setForm({ ...form, titleNp: e.target.value })}
                    placeholder="उदा: प्रविधि बूटक्याम्पहरू"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={form.category || 'Core Page'}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  >
                    <option value="Core Page">Core Page</option>
                    <option value="Program">Program</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="System Page">System Page</option>
                    <option value="Policy">Policy / Terms</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Publishing Status</label>
                  <select
                    value={form.status || 'published'}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-indigo-700"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>

              {/* Call to Action Bar Config */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hero CTA Button Text (Optional)</label>
                  <input
                    type="text"
                    value={form.heroCtaText || ''}
                    onChange={(e) => setForm({ ...form, heroCtaText: e.target.value })}
                    placeholder="e.g. Apply for Scholarship"
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hero CTA Link Target</label>
                  <input
                    type="text"
                    value={form.heroCtaLink || ''}
                    onChange={(e) => setForm({ ...form, heroCtaLink: e.target.value })}
                    placeholder="/contact or /courses"
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Page Body Content (Markdown / HTML Supported)</label>
                <textarea
                  rows={6}
                  value={form.content || ''}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Write comprehensive page text, instructions, embeds or program details..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-sans"
                />
              </div>

              {/* SEO Box */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-3">
                <h4 className="font-bold text-indigo-900 flex items-center space-x-1.5">
                  <Globe className="w-4 h-4 text-indigo-600" />
                  <span>Search Engine Optimization (SEO) & OpenGraph Social Cards</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">SEO Meta Title</label>
                    <input
                      type="text"
                      value={form.metaTitle || ''}
                      onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Social Card Image URL (OG Image)</label>
                    <input
                      type="url"
                      value={form.ogImage || ''}
                      onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">SEO Meta Description</label>
                  <textarea
                    rows={2}
                    value={form.metaDescription || ''}
                    onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md"
                >
                  Save CMS Page
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* PAGE LIVE PREVIEW MODAL */}
      {previewOpen && form && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className={`bg-white rounded-3xl w-full p-6 space-y-4 shadow-2xl relative transition-all ${
            previewDevice === 'mobile' ? 'max-w-md' : 'max-w-3xl'
          }`}>
            
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-full border border-indigo-200">
                  Live CMS Page Render Mode
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                  {form.status || 'published'}
                </span>
              </div>

              {/* Device Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 ${
                    previewDevice === 'desktop' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 ${
                    previewDevice === 'mobile' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
                
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Simulated Web View Frame */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner">
              <div className="bg-slate-100 px-3 py-2 border-b flex items-center space-x-2 font-mono text-[11px] text-slate-600">
                <div className="flex space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="truncate">https://mindsparq.edu.np/{form.slug}</span>
              </div>

              <div className="p-6 space-y-4 bg-white">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{form.title}</h1>
                {form.titleNp && <p className="text-sm text-indigo-700 font-bold">{form.titleNp}</p>}

                {form.ogImage && (
                  <img src={form.ogImage} alt="Cover" className="w-full h-56 object-cover rounded-2xl border" />
                )}

                <div className="text-xs leading-relaxed text-slate-700 space-y-3 whitespace-pre-line">
                  {form.content}
                </div>

                {form.heroCtaText && (
                  <div className="pt-3">
                    <button className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1">
                      <span>{form.heroCtaText}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Search Engine Result Preview Card */}
            <div className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-[11px] text-slate-600 space-y-1">
              <p className="font-bold text-indigo-900 flex items-center space-x-1">
                <Search className="w-3.5 h-3.5 text-indigo-600" />
                <span>Google Search Engine Preview Card:</span>
              </p>
              <p className="text-blue-700 font-bold hover:underline cursor-pointer text-xs">{form.metaTitle || form.title}</p>
              <p className="text-emerald-700 font-mono">https://mindsparq.edu.np/{form.slug}</p>
              <p className="text-slate-500 line-clamp-2">{form.metaDescription || form.content?.slice(0, 150)}</p>
            </div>

          </div>
        </div>
      )}

      {/* IMPORT JSON MODAL */}
      {isJsonModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-slate-900">
            <button
              onClick={() => setIsJsonModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-base flex items-center space-x-2">
              <Upload className="w-5 h-5 text-indigo-600" />
              <span>Import CMS Pages JSON Configuration</span>
            </h3>

            <p className="text-xs text-slate-500">
              Paste exported JSON array of CmsPage objects to restore or migrate page structures.
            </p>

            <textarea
              rows={8}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='[ { "id": "page-1", "slug": "home", "title": "Homepage" } ]'
              className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl font-mono text-xs"
            />

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsJsonModalOpen(false)}
                className="px-4 py-2 bg-slate-100 rounded-xl font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportJson}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-md"
              >
                Restore Pages
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

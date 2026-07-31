import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight, Pause, Play, Calendar, Users, CheckCircle2, ShieldCheck, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface BatchCard {
  id: string;
  batchNameEn: string;
  batchNameNp: string;
  courseTitleEn: string;
  courseTitleNp: string;
  category: string;
  startDateEn: string;
  startDateNp: string;
  seatsLeft: number;
  discountBadgeEn?: string;
  discountBadgeNp?: string;
  descriptionEn: string;
  descriptionNp: string;
  image: string;
}

const SUMMER_BATCHES_2026: BatchCard[] = [
  {
    id: 'batch-2026-fullstack',
    batchNameEn: 'Summer Batch 2026 • Code 01',
    batchNameNp: 'समर ब्याच २०२६ • कोड ०१',
    courseTitleEn: 'Full Stack Web & Cloud Software Engineering',
    courseTitleNp: 'फुल स्ट्याक वेभ तथा क्लाउड सफ्टवेयर इन्जिनियरिङ',
    category: 'Software Engineering',
    startDateEn: 'Admissions Open • Starts June 15, 2026',
    startDateNp: 'भर्ना खुल्यो • जेठ ३२, २०८३ बाट सुरु',
    seatsLeft: 8,
    discountBadgeEn: 'Early Bird 20% OFF',
    discountBadgeNp: '२०% छुट उपलब्ध',
    descriptionEn: 'Master React, TypeScript, Node.js, Next.js, and Cloud Run containers with production-ready real project building.',
    descriptionNp: 'प्रोजेक्टमा आधारित वेभ तथा क्लाउड सफ्टवेयर निर्माण सिक्नुहोस्। दर्ता खुला छ!',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'batch-2026-genai',
    batchNameEn: 'Summer Batch 2026 • Code 02',
    batchNameNp: 'समर ब्याच २०२६ • कोड ०२',
    courseTitleEn: 'Applied Generative AI, LLMs & Gemini API',
    courseTitleNp: 'एप्लाइड जेनेरेटिभ एआई, LLMs र जेमिनी एपीआई',
    category: 'AI & Data Science',
    startDateEn: 'Scholarship Batch • Starts June 20, 2026',
    startDateNp: 'छात्रवृत्ति ब्याच • असार ६, २०८३ बाट सुरु',
    seatsLeft: 5,
    discountBadgeEn: 'Scholarship Seat Available',
    discountBadgeNp: 'विशेष छात्रवृत्ति सिट उपलब्ध',
    descriptionEn: 'Build AI-powered chatbots, autonomous agents, and RAG search engines using Gemini 3.6 & Python SDK.',
    descriptionNp: 'जेमिनी ३.६ एआई एजेन्ट, च्याटबोट र एआई एप्लिकेसन निर्माणमा निपुण हुनुहोस्।',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'batch-2026-teacher',
    batchNameEn: 'Summer Batch 2026 • Code 03',
    batchNameNp: 'समर ब्याच २०२६ • कोड ०३',
    courseTitleEn: 'School STEM, Abacus & Vedic Math Teacher Certification',
    courseTitleNp: 'विद्यालय STEM, एबाकस तथा वैदिक गणित शिक्षक तालिम',
    category: 'School Solutions',
    startDateEn: 'Teacher Cohort • Starts July 01, 2026',
    startDateNp: 'शिक्षक टोली • असार १७, २०८३ बाट सुरु',
    seatsLeft: 12,
    discountBadgeEn: 'MindSparQ Certification',
    discountBadgeNp: 'प्रमाणित तालिम प्रमाण-पत्र',
    descriptionEn: 'Certified teacher training program for schools & educators across Nepal with complete teaching toolkits.',
    descriptionNp: 'नेपालभरका विद्यालय शिक्षकहरूका लागि एबाकस र STEM शिक्षण तालिम।',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'batch-2026-devops',
    batchNameEn: 'Summer Batch 2026 • Code 04',
    batchNameNp: 'समर ब्याच २०२६ • कोड ०४',
    courseTitleEn: 'DevOps, Kubernetes & Cloud Infrastructure Track',
    courseTitleNp: 'डेभओप्स, कुबरनेट्स र क्लाउड इन्फ्रास्ट्रक्चर ट्र्याक',
    category: 'DevOps & Cloud',
    startDateEn: 'Weekend Track • Starts July 10, 2026',
    startDateNp: 'विकेन्ड ट्र्याक • असार २६, २०८३ बाट सुरु',
    seatsLeft: 4,
    discountBadgeEn: 'Weekend Masterclass',
    discountBadgeNp: 'विकेन्ड विशेष ब्याच',
    descriptionEn: 'Learn Docker, Kubernetes, CI/CD pipelines, Terraform, and Cloud Run deployments with hands-on labs.',
    descriptionNp: 'डोकर, कुबरनेट्स, CI/CD पाइपलाइन र क्लाउड इन्फ्रास्ट्रक्चरको प्रयोगात्मक क्लास।',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'
  }
];

interface BatchSliderProps {
  onApplyBatch?: (courseTitle: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const BatchSlider: React.FC<BatchSliderProps> = ({ onApplyBatch, onNavigateTab }) => {
  const { language } = useApp();
  const isNp = language === 'np';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Auto cycling with smooth intervals, pauses when user hovers
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % SUMMER_BATCHES_2026.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SUMMER_BATCHES_2026.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SUMMER_BATCHES_2026.length) % SUMMER_BATCHES_2026.length);
  };

  const currentBatch = SUMMER_BATCHES_2026[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.96
    })
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden text-slate-100 group"
    >
      {/* Background glow styling */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-100 tracking-tight flex items-center gap-2">
              <span>{isNp ? 'समर ब्याच २०२६ नयाँ आवेदनहरू' : 'Summer Batch 2026 Admissions'}</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                {isNp ? 'लाइभ भर्ना' : 'LIVE'}
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              {isNp ? 'अटो-स्लाइडर • माउस ओभर गरेर रोक्नुहोस्' : 'Auto-cycling slider • Hover to pause'}
            </p>
          </div>
        </div>

        {/* Play/Pause & Direction Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition flex items-center gap-1 border border-slate-700"
            title={isPaused ? 'Resume auto slide' : 'Pause slider'}
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="hidden sm:inline text-[11px] font-semibold text-amber-300">Paused</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline text-[11px] font-semibold text-cyan-300">Auto-cycling</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrev}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition border border-slate-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition border border-slate-700"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Card with AnimatePresence */}
      <div className="relative min-h-[220px] sm:min-h-[200px] z-10">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentBatch.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800/80"
          >
            {/* Batch Thumbnail */}
            <div className="md:col-span-4 relative rounded-xl overflow-hidden group/img">
              <img
                src={currentBatch.image}
                alt={currentBatch.courseTitleEn}
                className="w-full h-36 sm:h-44 object-cover group-hover/img:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700 text-[10px] font-extrabold text-cyan-300 uppercase tracking-wider">
                {currentBatch.category}
              </div>
              {currentBatch.discountBadgeEn && (
                <div className="absolute bottom-2.5 left-2.5 bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-[10px] font-black uppercase shadow-md">
                  {isNp ? currentBatch.discountBadgeNp : currentBatch.discountBadgeEn}
                </div>
              )}
            </div>

            {/* Batch Information & Details */}
            <div className="md:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                  {isNp ? currentBatch.batchNameNp : currentBatch.batchNameEn}
                </span>
                <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/50">
                  <Users className="w-3.5 h-3.5" />
                  <span>{currentBatch.seatsLeft} {isNp ? 'सिट मात्र बाँकी' : 'Seats Left'}</span>
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-extrabold text-slate-100 line-clamp-1">
                {isNp ? currentBatch.courseTitleNp : currentBatch.courseTitleEn}
              </h4>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {isNp ? currentBatch.descriptionNp : currentBatch.descriptionEn}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
                <div className="text-xs text-cyan-300 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isNp ? currentBatch.startDateNp : currentBatch.startDateEn}</span>
                </div>

                <div className="flex items-center gap-2">
                  {onNavigateTab && (
                    <button
                      onClick={() => onNavigateTab('courses')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition flex items-center gap-1 border border-slate-700"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{isNp ? 'क्याटलग' : 'Catalog'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (onApplyBatch) {
                        onApplyBatch(isNp ? currentBatch.courseTitleNp : currentBatch.courseTitleEn);
                      } else if (onNavigateTab) {
                        onNavigateTab('contact');
                      }
                    }}
                    className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
                  >
                    <span>{isNp ? 'अहिले आवेदन दिनुहोस्' : 'Apply for Batch 2026'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators Bar */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-800/60 z-10 relative">
        <div className="text-[11px] text-slate-400">
          Batch {currentIndex + 1} of {SUMMER_BATCHES_2026.length}
        </div>
        <div className="flex items-center gap-1.5">
          {SUMMER_BATCHES_2026.map((batch, idx) => (
            <button
              key={batch.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-7 bg-cyan-400 shadow-md shadow-cyan-400/30'
                  : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
              title={batch.courseTitleEn}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

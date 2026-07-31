import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BatchSlide {
  id: string;
  badgeEn: string;
  badgeNp: string;
  noticeEn: string;
  noticeNp: string;
  ctaEn: string;
  ctaNp: string;
  actionTab?: string;
}

const DEFAULT_BATCH_SLIDES: BatchSlide[] = [
  {
    id: 'slide-1',
    badgeEn: 'SUMMER BATCH ADMISSIONS',
    badgeNp: 'समर ब्याच भर्ना',
    noticeEn: '📢 Summer Batch 2023/2026 Admissions Open! Apply now for Full Stack, AI & DevOps Masterclasses.',
    noticeNp: '📢 समर ब्याच नयाँ भर्ना खुल्यो! सफ्टवेयर ईन्जिनियरिङ, एआई र डेभओप्स क्लासका लागि आवेदन दिनुहोस्।',
    ctaEn: 'Apply Now',
    ctaNp: 'आवेदन दिनुहोस्',
    actionTab: 'courses'
  },
  {
    id: 'slide-2',
    badgeEn: 'LIMITED SCHOLARSHIP',
    badgeNp: 'विशेष छात्रवृत्ति',
    noticeEn: '🎓 Early Bird 20% Scholarship active for Applied Generative AI & Python Masterclass.',
    noticeNp: '🎓 एप्लाइड जेनेरेटिभ एआई र पाइथन मास्टरक्लासमा २०% विशेष छात्रवृत्ति उपलब्ध छ।',
    ctaEn: 'Claim Scholarship',
    ctaNp: 'छात्रवृत्ति लिनुहोस्',
    actionTab: 'courses'
  },
  {
    id: 'slide-3',
    badgeEn: 'TEACHER TRAINING',
    badgeNp: 'शिक्षक तालिम',
    noticeEn: '🚀 School STEM, Abacus & Vedic Math Certified Teacher Training Batch starts next week!',
    noticeNp: '🚀 विद्यालय STEM, एबाकस र वैदिक गणित शिक्षक तालिम नयाँ ब्याच आगामी हप्ता सुरु हुँदैछ!',
    ctaEn: 'Register Teacher',
    ctaNp: 'शिक्षक दर्ता',
    actionTab: 'instructors'
  },
  {
    id: 'slide-4',
    badgeEn: 'WEEKEND BATCH',
    badgeNp: 'विकेन्ड ब्याच',
    noticeEn: '💻 Cloud Infrastructure & Kubernetes Weekend Hands-on Track - Seats filling fast!',
    noticeNp: '💻 क्लाउड इन्फ्रास्ट्रक्चर र कुबरनेट्स विकेन्ड ब्याच सिटहरू द्रुत गतिमा भरिँदैछन्!',
    ctaEn: 'View Syllabus',
    ctaNp: 'सिलेबलस हेर्नुहोस्',
    actionTab: 'courses'
  }
];

interface BatchAnnouncementSliderProps {
  onNavigateTab: (tab: string) => void;
}

export const BatchAnnouncementSlider: React.FC<BatchAnnouncementSliderProps> = ({ onNavigateTab }) => {
  const { language } = useApp();
  const isNp = language === 'np';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % DEFAULT_BATCH_SLIDES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % DEFAULT_BATCH_SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + DEFAULT_BATCH_SLIDES.length) % DEFAULT_BATCH_SLIDES.length);
  };

  const currentSlide = DEFAULT_BATCH_SLIDES[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0
    })
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white border-b border-indigo-700/50 shadow-md overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between min-h-[44px]">
        
        {/* Navigation Control Left */}
        <button
          onClick={handlePrev}
          className="p-1 hover:bg-white/10 rounded-lg text-indigo-200 hover:text-white transition shrink-0 mr-2"
          title="Previous Notice"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Sliding Content */}
        <div className="flex-1 overflow-hidden relative min-h-[28px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left text-xs sm:text-sm font-medium w-full"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shrink-0 shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-slate-900 animate-spin" />
                  {isNp ? currentSlide.badgeNp : currentSlide.badgeEn}
                </span>

                <span className="text-slate-100 font-semibold line-clamp-1">
                  {isNp ? currentSlide.noticeNp : currentSlide.noticeEn}
                </span>
              </div>

              <button
                onClick={() => onNavigateTab(currentSlide.actionTab || 'courses')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-[11px] transition shadow-sm shrink-0 ml-1"
              >
                <span>{isNp ? currentSlide.ctaNp : currentSlide.ctaEn}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls Right */}
        <div className="flex items-center gap-1.5 ml-2 shrink-0">
          {/* Pause/Play indicator */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 hover:bg-white/10 rounded-lg text-indigo-200 hover:text-white transition text-[10px]"
            title={isPaused ? 'Resume auto-slider' : 'Pause slider'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-amber-400" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Dots Indicator */}
          <div className="hidden md:flex items-center gap-1 mx-1">
            {DEFAULT_BATCH_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-4 bg-amber-400' : 'w-1.5 bg-indigo-400/50 hover:bg-indigo-300'
                }`}
                title={`Notice ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-1 hover:bg-white/10 rounded-lg text-indigo-200 hover:text-white transition"
            title="Next Notice"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DailyPhotoSlide } from '../../types';
import { 
  Camera, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Sparkles, 
  Calendar, 
  User, 
  Maximize2, 
  X,
  Share2,
  Tag,
  Trash2
} from 'lucide-react';

export const DailyPhotoCarousel: React.FC = () => {
  const { dailyPhotos, deleteDailyPhoto, isVisualEditMode, currentRole, language } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<DailyPhotoSlide | null>(null);

  const isNp = language === 'np';

  const filteredPhotos = dailyPhotos.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const photosToDisplay = filteredPhotos.length > 0 ? filteredPhotos : dailyPhotos;

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying || photosToDisplay.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photosToDisplay.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, photosToDisplay.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photosToDisplay.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photosToDisplay.length);
  };

  const currentPhoto = photosToDisplay[currentIndex] || dailyPhotos[0];

  if (!currentPhoto) return null;

  return (
    <section className="py-12 bg-white border-b border-slate-200 text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Camera className="w-4 h-4" />
              <span>{isNp ? 'दैनिक क्याम्पस तथा इभेन्ट तस्बिरहरू' : 'MindSparQ Daily Photo Stream'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isNp ? 'दैनिक गतिविधि र ल्याब क्याप्चरहरू' : 'Daily Campus & Event Photo Showcase'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isNp
                ? 'हाम्रा दैनिक एआई ह्याकाथन, रोबोटिक्स ल्याब, वेब बूटक्याम्प र कार्यशालाका तस्बिरहरू।'
                : 'Real daily photos captured during interactive AI workshops, hackathons, and classroom sessions.'}
            </p>
          </div>

          {/* Category Filter Pills & Carousel Autoplay controls */}
          <div className="flex flex-wrap items-center gap-2">
            {['all', 'Hackathon', 'Workshop', 'Classroom', 'Event'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? (isNp ? 'सबै फोटो' : 'All Photos') : cat}
              </button>
            ))}

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors ml-1"
              title={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current text-indigo-600" />}
            </button>
          </div>
        </div>

        {/* Featured Slider Banner Container */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-lg border border-slate-200 group">
          
          {/* Main Slide Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
            <img
              src={currentPhoto.imageUrl}
              alt={currentPhoto.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlays for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            {/* Top Right Controls & Fullscreen Trigger */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
              <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center space-x-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>{currentPhoto.category}</span>
              </span>
              <button
                onClick={() => setActiveLightboxPhoto(currentPhoto)}
                className="p-2 rounded-full bg-slate-950/80 backdrop-blur-md text-white hover:bg-indigo-600 transition-all border border-slate-700"
                title="View Full Resolution"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              {currentRole === 'admin' && (
                <button
                  onClick={() => {
                    if (confirm(isNp ? 'के तपाईँ यो तस्बिर मेट्न चाहनुहुन्छ?' : 'Are you sure you want to delete this photo slide?')) {
                      deleteDailyPhoto(currentPhoto.id);
                    }
                  }}
                  className="p-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-md border border-rose-500"
                  title="Delete Photo Slide"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Bottom Caption Overlay Box */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent space-y-2">
              <div className="flex flex-wrap items-center gap-3 text-xs text-indigo-300 font-medium">
                <span className="flex items-center space-x-1 bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-800">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{currentPhoto.date}</span>
                </span>
                <span className="flex items-center space-x-1 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isNp ? 'कैप्चरकर्ता:' : 'Captured by'} {currentPhoto.authorName}</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
                {isNp && currentPhoto.titleNp ? currentPhoto.titleNp : currentPhoto.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed line-clamp-2">
                {isNp && currentPhoto.captionNp ? currentPhoto.captionNp : currentPhoto.caption}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-indigo-600 backdrop-blur-md text-white border border-slate-700 opacity-90 hover:opacity-100 transition-all shadow-md"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-indigo-600 backdrop-blur-md text-white border border-slate-700 opacity-90 hover:opacity-100 transition-all shadow-md"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom Pagination Dots */}
          <div className="absolute bottom-3 right-6 flex items-center space-x-1.5 z-10">
            {photosToDisplay.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Thumbnail Selector Strip below main carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
          {photosToDisplay.slice(0, 5).map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all text-left group ${
                idx === currentIndex ? 'border-indigo-600 ring-2 ring-indigo-300' : 'border-slate-200 opacity-75 hover:opacity-100'
              }`}
            >
              <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-2 flex items-end">
                <p className="text-[10px] font-bold text-white truncate">{photo.title}</p>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative text-white">
            <button
              onClick={() => setActiveLightboxPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 text-slate-400 hover:text-white border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video bg-black">
              <img
                src={activeLightboxPhoto.imageUrl}
                alt={activeLightboxPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 space-y-3 bg-slate-900">
              <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold">
                <span className="px-2.5 py-0.5 rounded bg-indigo-950 border border-indigo-800">
                  {activeLightboxPhoto.category}
                </span>
                <span>{activeLightboxPhoto.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {isNp && activeLightboxPhoto.titleNp ? activeLightboxPhoto.titleNp : activeLightboxPhoto.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isNp && activeLightboxPhoto.captionNp ? activeLightboxPhoto.captionNp : activeLightboxPhoto.caption}
              </p>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>By {activeLightboxPhoto.authorName}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(activeLightboxPhoto.imageUrl);
                    alert(isNp ? 'फोटो लिङ्क कपि भयो!' : 'Photo URL copied to clipboard!');
                  }}
                  className="flex items-center space-x-1 text-indigo-400 hover:underline"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{isNp ? 'लिङ्क सेयर गर्नुहोस्' : 'Copy Share Link'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

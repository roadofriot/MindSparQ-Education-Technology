import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';
import { Search, Filter, Clock, BookOpen, Star, Play, CheckCircle2, ArrowRight } from 'lucide-react';

interface CourseCatalogProps {
  onSelectCourseForInquiry: (courseTitle: string) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ onSelectCourseForInquiry }) => {
  const { courses, language, setActiveVideoUrl } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const isNp = language === 'np';

  const categories = [
    'All',
    'Software Engineering',
    'AI & Data Science',
    'Cloud & DevOps',
    'Mobile Development',
    'UI/UX Design'
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.titleNp && course.titleNp.toLowerCase().includes(searchQuery.toLowerCase())) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 bg-slate-50 text-slate-800 min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
              <span>{isNp ? 'पाठ्यक्रम सूची' : 'Course Catalog'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              {isNp ? 'माइन्डस्प्याकका आधुनिक आईटी पाठ्यक्रमहरू' : 'Industry-Ready Tech Courses'}
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              {isNp
                ? 'हाम्रा अनुभवी प्रशिक्षकहरूसँग प्रयोगात्मक परियोजनाहरूमा काम गर्दै आफ्नो आईटी करियर अगाडि बढाउनुहोस्।'
                : 'Practical, project-based IT training engineered by industry experts.'}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isNp ? 'पाठ्यक्रम खोज्नुहोस्...' : 'Search courses...'}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-700 font-semibold">{isNp ? 'कुनै पाठ्यक्रम भेटिएन' : 'No courses found'}</p>
            <p className="text-xs text-slate-500 mt-1">{isNp ? 'कृपया अर्को खोज वा क्याटगोरी छान्नुहोस्' : 'Try adjusting your search terms or filters.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 shadow-sm group"
              >
                {/* Course Thumbnail */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-slate-200 text-indigo-700 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                    {course.category}
                  </div>
                  {course.previewVideoUrl && (
                    <button
                      onClick={() => setActiveVideoUrl(course.previewVideoUrl || '')}
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-colors"
                      title="Watch Preview Video"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="flex items-center space-x-1 text-amber-500 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{course.rating}</span>
                        <span className="text-slate-400">({course.reviewsCount})</span>
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-semibold text-slate-600 border border-slate-200">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                      {isNp && course.titleNp ? course.titleNp : course.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {isNp && course.descriptionNp ? course.descriptionNp : course.description}
                    </p>
                  </div>

                  {/* Instructor & Details Footer */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src={course.instructorAvatar}
                          alt={course.instructorName}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        />
                        <span className="text-xs font-medium text-slate-700">{course.instructorName}</span>
                      </div>

                      <div className="flex items-center space-x-3 text-[11px] text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{course.duration}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-xs text-slate-500 block">{isNp ? 'शुल्क' : 'Course Fee'}</span>
                        <span className="text-lg font-black text-slate-900">
                          Rs. {course.price.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors"
                        >
                          {isNp ? 'विवरण' : 'Details'}
                        </button>

                        <button
                          onClick={() => onSelectCourseForInquiry(course.title)}
                          className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm transition-all flex items-center space-x-1"
                        >
                          <span>{isNp ? 'भर्ना आवेदन' : 'Inquire'}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl relative text-slate-800">
            
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200"
            >
              ✕
            </button>

            <div className="flex items-center space-x-3">
              <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                {selectedCourse.category}
              </span>
              <span className="text-xs text-slate-500">Level: {selectedCourse.level}</span>
            </div>

            <h2 className="text-2xl font-black text-slate-900">
              {isNp && selectedCourse.titleNp ? selectedCourse.titleNp : selectedCourse.title}
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              {isNp && selectedCourse.descriptionNp ? selectedCourse.descriptionNp : selectedCourse.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div>
                <p className="text-xs text-slate-500">{isNp ? 'अवधि' : 'Duration'}</p>
                <p className="text-sm font-bold text-slate-900 mt-1">{selectedCourse.duration}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">{isNp ? 'पाठ संख्या' : 'Lessons'}</p>
                <p className="text-sm font-bold text-slate-900 mt-1">{selectedCourse.lessonsCount} Modules</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">{isNp ? 'प्रशिक्षक' : 'Instructor'}</p>
                <p className="text-sm font-bold text-slate-900 mt-1">{selectedCourse.instructorName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">{isNp ? 'शुल्क' : 'Fee'}</p>
                <p className="text-sm font-bold text-indigo-600 mt-1">Rs. {selectedCourse.price.toLocaleString()}</p>
              </div>
            </div>

            {/* Modules List */}
            {selectedCourse.modules && selectedCourse.modules.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>{isNp ? 'पाठ्यक्रम संरचना (Curriculum Breakdown)' : 'Curriculum Modules'}</span>
                </h3>

                <div className="space-y-2">
                  {selectedCourse.modules.map((mod, index) => (
                    <div key={mod.id || index} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-xs font-semibold text-slate-800">{mod.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">{mod.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              {selectedCourse.previewVideoUrl && (
                <button
                  onClick={() => setActiveVideoUrl(selectedCourse.previewVideoUrl || '')}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 border border-slate-200"
                >
                  <Play className="w-4 h-4 text-red-600 fill-current" />
                  <span>{isNp ? 'भिडियो ओरिएन्टेसन हेर्नुहोस्' : 'Watch Orientation'}</span>
                </button>
              )}

              <button
                onClick={() => {
                  onSelectCourseForInquiry(selectedCourse.title);
                  setSelectedCourse(null);
                }}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm"
              >
                <span>{isNp ? 'भर्ना आवेदन पठाउनुहोस्' : 'Apply for Admission'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

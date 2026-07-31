import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Bookmark, Heart, Clock, Award, CheckCircle2, BookOpen, UserCheck, Share2, Trash2, ArrowRight, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const MemberPortal: React.FC<{ onNavigateToCourse?: (courseId: string) => void }> = ({ onNavigateToCourse }) => {
  const {
    currentUser,
    currentRole,
    setIsAuthModalOpen,
    bookmarks,
    toggleBookmark,
    readingHistory,
    courses,
    posts,
    instructors,
    likedCourseIds,
    toggleLikeCourse,
    subscribedInstructors,
    toggleSubscribeInstructor,
    language
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history' | 'engagements' | 'certificates'>('bookmarks');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!currentUser || currentRole === 'guest') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-slate-800 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700 shadow-xl">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">
          {language === 'np' ? 'सदस्य पोर्टल - लगइन आवश्यक छ' : 'Member Portal - Sign In Required'}
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto mb-6 text-sm">
          {language === 'np'
            ? 'तपाईंका सुरक्षित कोर्षहरू, अध्ययन इतिहास, लाइक/बुकमार्क तथा प्रमाणपत्रहरू हेर्न कृपया सदस्य अकाउन्टबाट लगइन गर्नुहोस्।'
            : 'Access your bookmarked courses, reading history, liked posts, subscribed instructors, and verified certificates by logging in to your member account.'}
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg transition shadow-cyan-500/20"
        >
          {language === 'np' ? 'अहिले लगइन / साइन अप गर्नुहोस्' : 'Sign In to Member Portal'}
        </button>
      </div>
    );
  }

  // Filter bookmarked courses and posts
  const bookmarkedCourses = courses.filter(c => bookmarks.includes(c.id));
  const bookmarkedPosts = posts.filter(p => bookmarks.includes(p.id));

  // Filter liked courses
  const likedCourses = courses.filter(c => likedCourseIds.includes(c.id));

  // Filter subscribed instructors
  const myInstructors = instructors.filter(i => subscribedInstructors.includes(i.id));

  const handleShare = (title: string, url: string, id: string) => {
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Profile Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-cyan-500 shadow-xl"
              />
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1 rounded-full shadow-lg" title="Verified Member">
                <CheckCircle2 className="w-5 h-5" />
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">{currentUser.name}</h1>
                <span className="capitalize text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-sm text-slate-400">{currentUser.email}</p>
              <p className="text-xs text-slate-500 mt-1">
                Member ID: <code className="text-cyan-300 font-mono">{currentUser.id}</code>
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            <div className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl text-center min-w-[100px]">
              <div className="text-2xl font-bold text-cyan-400">{bookmarks.length}</div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Bookmarks</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl text-center min-w-[100px]">
              <div className="text-2xl font-bold text-rose-400">{likedCourseIds.length}</div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Likes</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl text-center min-w-[100px]">
              <div className="text-2xl font-bold text-purple-400">{readingHistory.length}</div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">History</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl text-center min-w-[100px]">
              <div className="text-2xl font-bold text-emerald-400">{subscribedInstructors.length}</div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Teachers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition shrink-0 ${
            activeTab === 'bookmarks'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          Bookmarks & Saved ({bookmarkedCourses.length + bookmarkedPosts.length})
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition shrink-0 ${
            activeTab === 'history'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          Reading History ({readingHistory.length})
        </button>

        <button
          onClick={() => setActiveTab('engagements')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition shrink-0 ${
            activeTab === 'engagements'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Heart className="w-4 h-4" />
          Engagements & Subscriptions
        </button>

        <button
          onClick={() => setActiveTab('certificates')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition shrink-0 ${
            activeTab === 'certificates'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          Certificates & Badges
        </button>
      </div>

      {/* TAB CONTENT: Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-cyan-400" /> Bookmarked Courses & Articles
          </h2>

          {bookmarkedCourses.length === 0 && bookmarkedPosts.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
              <Bookmark className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p>No saved bookmarks yet. Explore the Course Catalog or Public Feed to save items!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Courses */}
              {bookmarkedCourses.map(course => (
                <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-md hover:border-slate-700 transition">
                  <div>
                    <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        {course.category}
                      </span>
                      <h3 className="font-bold text-slate-100 line-clamp-2 text-sm">{course.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{course.description}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0 border-t border-slate-800/80 flex items-center justify-between mt-3">
                    <button
                      onClick={() => toggleBookmark(course.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                    {onNavigateToCourse && (
                      <button
                        onClick={() => onNavigateToCourse(course.id)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                      >
                        View Course <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Bookmarked Posts */}
              {bookmarkedPosts.map(post => (
                <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-md hover:border-slate-700 transition">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                      Post Article
                    </span>
                    <h3 className="font-bold text-slate-100 text-sm line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-3">{post.content}</p>
                  </div>
                  <div className="border-t border-slate-800 pt-3 flex items-center justify-between mt-3">
                    <button
                      onClick={() => toggleBookmark(post.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                    <span className="text-[11px] text-slate-500">{post.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Reading History */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" /> Recent Reading & Visiting History
          </h2>

          {readingHistory.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
              <Clock className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p>No activity logged yet.</p>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800 overflow-hidden shadow-xl">
              {readingHistory.map((item, index) => (
                <div key={index} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-xs">
                      {item.type === 'course' ? <BookOpen className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-200">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 capitalize">{item.type} visited</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(item.visitedAt).toLocaleDateString()} {new Date(item.visitedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: Engagements & Subscriptions */}
      {activeTab === 'engagements' && (
        <div className="space-y-8">
          {/* Liked Courses Section */}
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> Liked Courses ({likedCourses.length})
            </h2>
            {likedCourses.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No liked courses yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {likedCourses.map(c => (
                  <div key={c.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-200 line-clamp-1">{c.title}</h4>
                      <span className="text-xs text-slate-400">{c.category}</span>
                    </div>
                    <button
                      onClick={() => toggleLikeCourse(c.id)}
                      className="p-2 bg-rose-950/60 text-rose-400 rounded-lg hover:bg-rose-900 transition"
                      title="Unlike"
                    >
                      <Heart className="w-4 h-4 fill-rose-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subscribed Teachers Section */}
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-4">
              <UserCheck className="w-5 h-5 text-emerald-400" /> Subscribed Instructors ({myInstructors.length})
            </h2>
            {myInstructors.length === 0 ? (
              <p className="text-sm text-slate-500 italic">You have not subscribed to any instructors yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {myInstructors.map(inst => (
                  <div key={inst.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
                    <img src={inst.avatar} alt={inst.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-200 truncate">{inst.name}</h4>
                      <p className="text-xs text-slate-400 truncate">{inst.designation}</p>
                    </div>
                    <button
                      onClick={() => toggleSubscribeInstructor(inst.id)}
                      className="px-2.5 py-1 bg-slate-800 text-xs text-slate-300 hover:bg-slate-700 rounded-lg font-medium"
                    >
                      Subscribed
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Certificates */}
      {activeTab === 'certificates' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" /> Verified Achievements & Certificates
          </h2>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    VERIFIED CERTIFICATE
                  </span>
                  <h3 className="font-extrabold text-slate-100 text-lg mt-1">Full Stack Web Engineering & GenAI</h3>
                  <p className="text-xs text-slate-400">Issued by MindSparQ Education Board • Grade: A+</p>
                  <p className="text-[11px] text-slate-500 mt-1 font-mono">Hash: MSQ-2026-CERT-99812A</p>
                </div>
              </div>
              <button
                onClick={() => alert('Downloading official PDF certificate...')}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                Download PDF Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InstructionalPost } from '../../types';
import { Rss, Heart, MessageSquare, Play, Video, Image, Bell, Share2, PlusCircle, ShieldCheck, UserCheck, Tag } from 'lucide-react';

interface InstructionalFeedProps {
  onOpenPublisher: () => void;
}

export const InstructionalFeed: React.FC<InstructionalFeedProps> = ({ onOpenPublisher }) => {
  const { posts, likePost, language, setActiveVideoUrl, currentRole } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const isNp = language === 'np';

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === 'all') return true;
    return post.type === activeFilter;
  });

  return (
    <section className="py-16 bg-slate-50 text-slate-800 min-h-[600px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Rss className="w-4 h-4" />
              <span>{isNp ? 'लाइभ इन्स्ट्रक्शनल फिड' : 'Live Instructional Stream'}</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">
              {isNp ? 'माइन्डस्प्याक प्रविधि तथा पाठ्य सामग्री फिड' : 'Instructional Content & Updates'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isNp
                ? 'एडमिन तथा शिक्षकहरूद्वारा प्रत्यक्ष पोस्ट गरिएका भिडियो ट्यूटोरियलहरू, सुचना तथा सिकाइ सामग्री।'
                : 'Direct posts, video tutorials, photo galleries, and notices published by Mindspack teachers & admin.'}
            </p>
          </div>

          {/* Quick Publish Button for Teacher/Admin */}
          {(currentRole === 'instructor' || currentRole === 'admin') && (
            <button
              onClick={onOpenPublisher}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isNp ? 'नयाँ कन्टेन्ट पोस्ट गर्नुहोस्' : 'Publish Post'}</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'all', label: isNp ? 'सबै सामग्री' : 'All Posts', icon: Rss },
            { id: 'video', label: isNp ? 'भिडियोहरू' : 'Videos', icon: Video },
            { id: 'announcement', label: isNp ? 'सुचनाहरू' : 'Announcements', icon: Bell },
            { id: 'photo', label: isNp ? 'फोटो ग्यालरी' : 'Photos', icon: Image },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeFilter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveFilter(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Stream Items */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500 shadow-sm">
              <p className="font-semibold">{isNp ? 'कुनै कन्टेन्ट पोस्ट गरिएको छैन' : 'No posts in this category'}</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-5 sm:p-6 space-y-4 hover:border-indigo-300 transition-colors"
              >
                
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-900">{post.authorName}</span>
                        {post.authorRole === 'admin' ? (
                          <span className="flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Power Admin</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <UserCheck className="w-3 h-3" />
                            <span>Instructor</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">{post.createdAt} • {post.category}</p>
                    </div>
                  </div>

                  <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-mono capitalize border border-slate-200">
                    {post.type}
                  </span>
                </div>

                {/* Content Body */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {isNp && post.titleNp ? post.titleNp : post.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {isNp && post.contentNp ? post.contentNp : post.content}
                  </p>
                </div>

                {/* Media Embed / Image */}
                {post.mediaUrl && (
                  <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                    <img
                      src={post.mediaUrl}
                      alt={post.title}
                      className="w-full max-h-96 object-cover"
                    />
                    {post.type === 'video' && (
                      <button
                        onClick={() => setActiveVideoUrl(post.videoEmbedUrl || 'https://www.youtube.com/embed/mU6anWqZJcc')}
                        className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                      >
                        <Play className="w-6 h-6 ml-1 fill-current" />
                      </button>
                    )}
                  </div>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag) => (
                      <span key={tag} className="flex items-center space-x-1 text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        <Tag className="w-3 h-3" />
                        <span>#{tag}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer Interactions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => likePost(post.id)}
                      className={`flex items-center space-x-1.5 font-semibold transition-colors ${
                        post.likedByMe ? 'text-red-500' : 'hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.likedByMe ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    <div className="flex items-center space-x-1.5">
                      <MessageSquare className="w-4 h-4 text-slate-500" />
                      <span>{post.commentsCount} {isNp ? 'प्रतिक्रिया' : 'Comments'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: post.title, text: post.content, url: window.location.href });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert(isNp ? 'लिंक कपि भयो!' : 'Link copied!');
                      }
                    }}
                    className="flex items-center space-x-1 hover:text-white"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{isNp ? 'सेयर' : 'Share'}</span>
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

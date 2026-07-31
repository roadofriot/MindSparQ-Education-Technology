import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InstructionalPost } from '../../types';
import { 
  Rss, 
  Heart, 
  MessageSquare, 
  Play, 
  Video, 
  Image, 
  Bell, 
  Share2, 
  PlusCircle, 
  ShieldCheck, 
  UserCheck, 
  Tag,
  Trash2,
  Send,
  User,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bookmark
} from 'lucide-react';

interface InstructionalFeedProps {
  onOpenPublisher: () => void;
}

export const InstructionalFeed: React.FC<InstructionalFeedProps> = ({ onOpenPublisher }) => {
  const { 
    posts, 
    likePost, 
    deletePost,
    addCommentToPost,
    deleteCommentFromPost,
    language, 
    setActiveVideoUrl, 
    currentRole,
    currentUser,
    isVisualEditMode,
    bookmarks,
    toggleBookmark
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [openCommentPostId, setOpenCommentPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const isNp = language === 'np';

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === 'all') return true;
    return post.type === activeFilter;
  });

  const toggleComments = (postId: string) => {
    setOpenCommentPostId(prev => (prev === postId ? null : postId));
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId] || '';
    if (!text.trim()) return;
    addCommentToPost(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

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
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {isNp ? 'माइंडस्पार्क (MindSparQ) प्रविधि तथा पाठ्य सामग्री फिड' : 'MindSparQ Learning & Daily Feed'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isNp
                ? 'एडमिन तथा शिक्षकहरूद्वारा पोस्ट गरिएका भिडियो ट्यूटोरियलहरू, सुचना तथा सिकाइ सामग्रीमा लाइक, सेयर र कमेन्ट गर्नुहोस्।'
                : 'Direct video tutorials, announcements, and resources published daily by MindSparQ teachers & admin.'}
            </p>
          </div>

          {/* Quick Publish Button for Teacher/Admin */}
          {(currentRole === 'instructor' || currentRole === 'admin') && (
            <button
              onClick={onOpenPublisher}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isNp ? 'नयाँ कन्टेन्ट पोस्ट गर्नुहोस्' : 'Publish New Content'}</span>
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
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs'
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
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500 shadow-xs">
              <p className="font-semibold">{isNp ? 'कुनै कन्टेन्ट पोस्ट गरिएको छैन' : 'No posts found in this category'}</p>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const isCommentsOpen = openCommentPostId === post.id;
              const postComments = post.comments || [];

              return (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm p-6 space-y-4 hover:border-indigo-300 transition-colors relative"
                >
                  
                  {/* Author Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        className="w-11 h-11 rounded-full object-cover border-2 border-slate-100 shadow-xs"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-slate-900">{post.authorName}</span>
                          {post.authorRole === 'admin' ? (
                            <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                              <ShieldCheck className="w-3 h-3" />
                              <span>System Admin</span>
                            </span>
                          ) : (
                            <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                              <UserCheck className="w-3 h-3" />
                              <span>Instructor</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500">{post.createdAt} • {post.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-semibold capitalize border border-slate-200">
                        {post.type}
                      </span>
                      {(currentRole === 'admin' || (currentRole === 'instructor' && currentUser?.instructorProfileId === post.authorId)) && (
                        <button
                          onClick={() => {
                            if (confirm(isNp ? 'के तपाईँ यो पोस्ट मेट्न चाहनुहुन्छ?' : 'Are you sure you want to delete this post?')) {
                              deletePost(post.id);
                            }
                          }}
                          className="px-2 py-1 text-xs text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg font-bold flex items-center space-x-1 transition-all"
                          title="Delete Post"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      )}
                    </div>
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
                    <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
                      <img
                        src={post.mediaUrl}
                        alt={post.title}
                        className="w-full max-h-96 object-cover"
                      />
                      {post.type === 'video' && (
                        <button
                          onClick={() => setActiveVideoUrl(post.videoEmbedUrl || 'https://www.youtube.com/embed/mU6anWqZJcc')}
                          className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
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
                        <span key={tag} className="flex items-center space-x-1 text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                          <Tag className="w-3 h-3" />
                          <span>#{tag}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer Interactions Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center space-x-6">
                      
                      {/* Like button */}
                      <button
                        onClick={() => likePost(post.id)}
                        className={`flex items-center space-x-1.5 font-bold transition-all ${
                          post.likedByMe ? 'text-red-600 scale-105' : 'text-slate-600 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.likedByMe ? 'fill-current' : ''}`} />
                        <span>{post.likes} {isNp ? 'लाइक' : 'Likes'}</span>
                      </button>

                      {/* Save / Bookmark button */}
                      <button
                        onClick={() => toggleBookmark(post.id, post.title, 'post')}
                        className={`flex items-center space-x-1.5 font-bold transition-colors ${
                          bookmarks.includes(post.id) ? 'text-cyan-600' : 'text-slate-600 hover:text-cyan-600'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarks.includes(post.id) ? 'fill-current' : ''}`} />
                        <span>{bookmarks.includes(post.id) ? (isNp ? 'सेभ गरियो' : 'Saved') : (isNp ? 'सेभ गर्नुहोस्' : 'Save')}</span>
                      </button>
                      <button
                        onClick={() => toggleComments(post.id)}
                        className="flex items-center space-x-1.5 font-bold text-slate-600 hover:text-indigo-600 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-indigo-600" />
                        <span>{post.commentsCount} {isNp ? 'कमेन्टहरू' : 'Comments'}</span>
                        {isCommentsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Share button */}
                    <button
                      onClick={() => {
                        const shareUrl = window.location.href;
                        if (navigator.share) {
                          navigator.share({ title: post.title, text: post.content, url: shareUrl });
                        } else {
                          navigator.clipboard.writeText(shareUrl);
                          alert(isNp ? 'पोस्ट लिङ्क क्लिपबोर्डमा कपि भयो!' : 'Post link copied to clipboard!');
                        }
                      }}
                      className="flex items-center space-x-1.5 text-slate-600 hover:text-indigo-600 font-bold transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{isNp ? 'सेयर' : 'Share'}</span>
                    </button>
                  </div>

                  {/* Collapsible Interactive Comments Drawer */}
                  {isCommentsOpen && (
                    <div className="pt-4 border-t border-slate-100 space-y-4 bg-slate-50/70 rounded-2xl p-4">
                      
                      {/* Comments List */}
                      <div className="space-y-3">
                        {postComments.length === 0 ? (
                          <p className="text-xs text-slate-500 italic text-center py-2">
                            {isNp ? 'पहिलो कमेन्ट तपाईँ नै लेख्नुहोस्!' : 'No comments yet. Be the first to start the discussion!'}
                          </p>
                        ) : (
                          postComments.map((comm) => (
                            <div key={comm.id} className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1 relative group">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <img src={comm.authorAvatar} alt={comm.authorName} className="w-6 h-6 rounded-full object-cover" />
                                  <span className="font-bold text-slate-900">{comm.authorName}</span>
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold uppercase bg-slate-100 text-slate-600">
                                    {comm.authorRole}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-[10px] text-slate-400">{comm.createdAt}</span>
                                  {(currentRole === 'admin' || currentUser?.name === comm.authorName) && (
                                    <button
                                      onClick={() => deleteCommentFromPost(post.id, comm.id)}
                                      className="text-slate-400 hover:text-red-600 p-0.5"
                                      title="Delete comment"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  )}
                                </div>
                              </div>
                              <p className="text-slate-700 pl-8 leading-relaxed">{comm.text}</p>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Comment Input Box */}
                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="text"
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCommentSubmit(post.id);
                          }}
                          placeholder={isNp ? 'प्रतिक्रिया लेख्नुहोस्...' : 'Add a public comment...'}
                          className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-indigo-600"
                        />
                        <button
                          onClick={() => handleCommentSubmit(post.id)}
                          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                          title="Send Comment"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};


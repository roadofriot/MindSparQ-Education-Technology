import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, X, Send, Globe, Minimize2, RefreshCw, Bookmark, ArrowRight, UserCheck, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface AITutorChatbotProps {
  onNavigateTab?: (tab: string) => void;
}

export const AITutorChatbot: React.FC<AITutorChatbotProps> = ({ onNavigateTab }) => {
  const { language, setLanguage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: language === 'np'
        ? 'नमस्ते! म माइन्डस्पार्क एआई ट्युटर (MindSparQ AI Tutor) हुँ। म तपाईंलाई कक्षाहरू खोज्न, शिक्षक दर्ता बुझ्न वा विषयवस्तु सारांश बनाउन सहयोग गर्न सक्छु। तपाईं मलाई नेपाली वा अंग्रेजी दुवैमा सोध्न सक्नुहुन्छ!'
        : language === 'zh'
        ? '你好！我是 MindSparQ AI Tutor 导师。我可以协助您查询课程、教师认证与内容总结。请随心提问！'
        : 'Namaste & Welcome! I am your MindSparQ AI Tutor. I can assist you with course recommendations, teacher verifications, portal navigation, and content summarization in English & Nepali!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = language === 'np' ? [
    { label: '📚 एआई र कम्प्युटर कोर्षहरू', text: 'नेपालमा सञ्चालित एआई तथा सफ्टवेयर ईन्जिनियरिङ कोर्षहरूको सूची देखाउनुहोस्।' },
    { label: '👨‍🏫 शिक्षक दर्ता कसरी गर्ने?', text: 'माइन्डस्पार्कमा शिक्षक/प्रशिक्षक दर्ता र स्वीकृति प्रक्रिया कस्तो छ?' },
    { label: '🌐 माइन्डस्पार्कको परिचय', text: 'माइन्डस्पार्क एजुकेशन एण्ड टेक्नोलोजीका प्रमुख सेवाहरूको छोटो सारांश दिनुहोस्।' },
    { label: '🧮 एबाकस तथा वैदिक गणित', text: 'एबाकस र वैदिक गणित तालिम कसको लागि उपयुक्त छ?' }
  ] : [
    { label: '📚 Top Tech & AI Courses', text: 'What are the top AI and Software Engineering courses available at MindSparQ?' },
    { label: '👨‍🏫 How to Register as Teacher?', text: 'How do teachers register and get verified by the admin on this platform?' },
    { label: '👤 Member Portal Guide', text: 'What features are available inside the Member Portal?' },
    { label: '🇳🇵 Summarize in Nepali', text: 'माइन्डस्पार्कका मुख्य सुविधाहरू नेपालीमा व्याख्या गरिदिनुहोस्।' }
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const history = messages.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          language,
          history
        })
      });

      const data = await res.json();
      const botReply = data.reply || (language === 'np' 
        ? 'माफ गर्नुहोस्, म अहिले उत्तर दिन सकिरहेको छैन। कृपया केही समय पछि प्रयास गर्नुहोस्।'
        : 'Sorry, I am unable to connect right now. Please try again shortly.');

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);

      // Detect navigation intent in reply or user query
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes('course') || lowerQuery.includes('कोर्ष') || lowerQuery.includes('कोर्स')) {
        if (onNavigateTab) {
          // Keep floating prompt
        }
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: language === 'np'
            ? 'नेटवर्क समस्या भयो। कृपया पुनः प्रयास गर्नुहोस् वा हाम्रो कोर्स क्याटलग हेर्नुहोस्।'
            : 'I am experiencing connection issues. You can also explore our Courses or Feed tabs directly!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-none">
      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mb-3 w-[360px] sm:w-[420px] h-[520px] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
          >
            {/* Header */}
            <div className="bg-slate-800/90 border-b border-slate-700 p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-slate-100">MindSparQ AI Tutor</h3>
                    <span className="text-[10px] font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/50 px-1.5 py-0.5 rounded-full">
                      Gemini 3.6
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {language === 'np' ? 'बहुभाषी एआई सहायक (English & नेपाली)' : 'Multi-lingual learning assistant'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Language quick toggle */}
                <button
                  onClick={() => setLanguage(language === 'en' ? 'np' : language === 'np' ? 'zh' : 'en')}
                  className="p-1.5 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center gap-1 font-medium transition"
                  title="Switch Language"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="uppercase text-[11px]">{language}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Navigation Pills Header */}
            {onNavigateTab && (
              <div className="bg-slate-950/60 border-b border-slate-800/80 px-3 py-1.5 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
                <span className="text-[10px] text-slate-400 shrink-0 uppercase font-bold tracking-wider">Quick Links:</span>
                <button
                  onClick={() => onNavigateTab('courses')}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] border border-slate-700 flex items-center gap-1 shrink-0"
                >
                  <BookOpen className="w-3 h-3 text-cyan-400" /> Courses
                </button>
                <button
                  onClick={() => onNavigateTab('member')}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] border border-slate-700 flex items-center gap-1 shrink-0"
                >
                  <Bookmark className="w-3 h-3 text-purple-400" /> Member Portal
                </button>
                <button
                  onClick={() => onNavigateTab('admin')}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] border border-slate-700 flex items-center gap-1 shrink-0"
                >
                  <UserCheck className="w-3 h-3 text-emerald-400" /> Admin / Roles
                </button>
              </div>
            )}

            {/* Message History */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 font-sans text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600 text-white rounded-br-none shadow-md shadow-cyan-600/20'
                        : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <div
                      className={`text-[10px] mt-1.5 text-right ${
                        msg.sender === 'user' ? 'text-cyan-200' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-slate-300 border border-slate-700 rounded-2xl rounded-bl-none p-3 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                    <span className="text-xs">
                      {language === 'np' ? 'एआई सोच्दैछ...' : 'AI Tutor is thinking...'}
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="bg-slate-950/70 border-t border-slate-800 px-3 py-2">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p.text)}
                    className="whitespace-nowrap px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full border border-slate-700 text-[11px] transition shrink-0"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  language === 'np'
                    ? 'कुनै पनि जिज्ञासा सोध्नुहोस् (English / नेपाली)...'
                    : 'Ask anything about courses, portal, or summarize...'
                }
                className="flex-1 bg-slate-800 text-slate-100 placeholder-slate-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500 transition"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white rounded-xl shadow-md transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto flex items-center gap-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white px-4 py-3.5 rounded-full shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition border border-cyan-300/30 font-medium text-sm group"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
        </div>
        <span className="hidden sm:inline font-semibold">AI Tutor</span>
        <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition" />
      </motion.button>
    </div>
  );
};

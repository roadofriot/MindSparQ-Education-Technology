import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Copy, 
  Check, 
  Wand2, 
  Languages, 
  FileText, 
  Search, 
  BookOpen, 
  HelpCircle,
  Zap,
  RefreshCw
} from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertText?: (text: string) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose, onInsertText }) => {
  if (!isOpen) return null;

  const [prompt, setPrompt] = useState('');
  const [taskType, setTaskType] = useState<'generate' | 'outline' | 'translate' | 'seo' | 'faq'>('generate');
  const [generatedResult, setGeneratedResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setGeneratedResult('');

    setTimeout(() => {
      let resultText = '';
      if (taskType === 'outline') {
        resultText = `# Curriculum Outline: ${prompt}\n\n` +
          `## Module 1: Foundational Core Principles\n- Lesson 1.1: Environment Setup & Architecture Overview\n- Lesson 1.2: Essential Concepts & Syntax\n- Lesson 1.3: Hands-On Lab Exercise\n\n` +
          `## Module 2: Intermediate Implementation & Projects\n- Lesson 2.1: Advanced Patterns & Industry Best Practices\n- Lesson 2.2: Building the Main Project\n- Lesson 2.3: Testing, Debugging, and Optimization\n\n` +
          `## Module 3: Production Deployment & Capstone\n- Lesson 3.1: Cloud Integration & Deployment\n- Lesson 3.2: Capstone Project Showcase`;
      } else if (taskType === 'translate') {
        resultText = `[नेपाली अनुवाद / Nepali Translation]\n\n` +
          `माइन्डस्पार्क एजुकेशन एण्ड टेक्नोलोजीले नेपाली विद्यार्थीहरू र शिक्षण संस्थाहरूका लागि गुणस्तरीय, व्यावहारिक र अन्तर्राष्ट्रिय स्तरको प्रविधि शिक्षा प्रदान गर्दछ।`;
      } else if (taskType === 'seo') {
        resultText = `SEO Meta Title:\n${prompt} | MindSparQ Education & Technology Nepal\n\n` +
          `SEO Meta Description:\nMaster ${prompt} with top-tier verified instructors at MindSparQ Nepal. Practical labs, career support, and recognized digital certification.\n\n` +
          `Keywords: ${prompt}, IT Education Nepal, MindSparQ, Coding Bootcamp, STEM Lab`;
      } else if (taskType === 'faq') {
        resultText = `Q1: What prerequisites are required for ${prompt}?\n` +
          `A: No prior coding experience is required! We start from basic fundamentals and progress to advanced industry skills.\n\n` +
          `Q2: Will I receive a verified certificate upon completion?\n` +
          `A: Yes, every student receives a digital certificate with a unique verification hash usable on LinkedIn and resumes.`;
      } else {
        resultText = `MindSparQ Education & Technology presents ${prompt}.\n\n` +
          `Designed specifically for students and educational institutions across Nepal, this program focuses on bridging the gap between theoretical knowledge and practical software engineering. Led by verified industry mentors, learners participate in interactive coding sessions, daily project evaluations, and real-world portfolio building.`;
      }

      setGeneratedResult(resultText);
      setIsLoading(false);
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 space-y-5 shadow-2xl relative text-slate-900">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">MindSparQ AI Content & SEO Assistant</h3>
            <p className="text-xs text-slate-500">Generate course syllabi, blog posts, SEO metadata, and translations instantly</p>
          </div>
        </div>

        {/* Task Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {[
            { id: 'generate', label: 'Write Content', icon: FileText },
            { id: 'outline', label: 'Course Syllabus', icon: BookOpen },
            { id: 'translate', label: 'NP Translation', icon: Languages },
            { id: 'seo', label: 'SEO Generator', icon: Search },
            { id: 'faq', label: 'FAQ Generator', icon: HelpCircle },
          ].map((task) => {
            const Icon = task.icon;
            return (
              <button
                key={task.id}
                onClick={() => setTaskType(task.id as any)}
                className={`p-2.5 rounded-xl font-bold flex flex-col items-center justify-center space-y-1 transition-all ${
                  taskType === task.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px]">{task.label}</span>
              </button>
            );
          })}
        </div>

        {/* Prompt Input */}
        <div className="space-y-2 text-xs">
          <label className="block font-semibold text-slate-700">Topic or Prompt Target</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Full-Stack React & Node Bootcamp or AI for Beginners"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white font-bold rounded-xl shadow-md shrink-0 flex items-center space-x-1.5 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Wand2 className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Generating...' : 'Generate'}</span>
            </button>
          </div>
        </div>

        {/* Generated Result Output */}
        {generatedResult && (
          <div className="space-y-2 pt-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Generated Output</span>
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center space-x-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>

                {onInsertText && (
                  <button
                    onClick={() => {
                      onInsertText(generatedResult);
                      onClose();
                    }}
                    className="px-3.5 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-indigo-700"
                  >
                    Insert Into Form
                  </button>
                )}
              </div>
            </div>

            <textarea
              readOnly
              rows={6}
              value={generatedResult}
              className="w-full p-3.5 bg-slate-900 text-slate-100 font-sans rounded-2xl border border-slate-800 text-xs leading-relaxed focus:outline-none"
            />
          </div>
        )}

      </div>
    </div>
  );
};

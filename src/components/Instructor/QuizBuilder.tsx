import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, PlusCircle, Edit as EditIcon, Trash2, Download, Calendar, Users, FileCheck, Clock, CheckCircle, Radio, Award, BookOpen } from 'lucide-react';

interface QuizBuilderProps {
  instructorCourses: any[];
}

export const QuizBuilder: React.FC<QuizBuilderProps> = ({ instructorCourses }) => {
  const { language } = useApp();
  const isNp = language === 'np';

  const [quizzes, setQuizzes] = useState<any[]>([
    {
      id: 'quiz-1',
      title: 'Python Fundamentals Quiz',
      course: 'Python Advanced',
      description: 'Basic Python concepts and syntax',
      questions: 15,
      duration: '30 minutes',
      difficulty: 'Easy',
      status: 'published',
      attempts: 45,
      passingScore: 70
    },
    {
      id: 'quiz-2',
      title: 'React Components Quiz',
      course: 'Web Development',
      description: 'React component lifecycle and hooks',
      questions: 20,
      duration: '45 minutes',
      difficulty: 'Medium',
      status: 'draft',
      attempts: 0,
      passingScore: 80
    }
  ]);

  const [showQuizForm, setShowQuizForm] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<any>(null);
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>(['mcq', 'truefalse', 'fill']);

  const questionTypes = [
    { id: 'mcq', label: 'Multiple Choice' },
    { id: 'truefalse', label: 'True/False' },
    { id: 'fill', label: 'Fill in the Blank' },
    { id: 'short', label: 'Short Answer' },
    { id: 'long', label: 'Long Answer' },
    { id: 'coding', label: 'Coding Question' },
    { id: 'upload', label: 'File Upload' }
  ];

  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingQuiz) {
      setQuizzes(prev => prev.map(q => q.id === editingQuiz.id ? editingQuiz : q));
      setEditingQuiz(null);
    } else {
      const newQuiz = {
        id: `quiz-${Date.now()}`,
        title: (document.getElementById('quiz-title') as HTMLInputElement).value,
        course: (document.getElementById('quiz-course') as HTMLSelectElement).value,
        description: (document.getElementById('quiz-description') as HTMLTextAreaElement).value,
        questions: Number((document.getElementById('quiz-questions') as HTMLInputElement).value),
        duration: (document.getElementById('quiz-duration') as HTMLInputElement).value,
        difficulty: (document.getElementById('quiz-difficulty') as HTMLSelectElement).value,
        status: 'draft',
        attempts: 0,
        passingScore: Number((document.getElementById('quiz-passing') as HTMLInputElement).value)
      };
      setQuizzes(prev => [newQuiz, ...prev]);
    }
    setShowQuizForm(false);
    setSelectedQuestionTypes(['mcq', 'truefalse', 'fill']);
  };

  const handleEditQuiz = (quiz: any) => {
    setEditingQuiz({...quiz});
    setShowQuizForm(true);
    const defaultTypes = quiz.questionTypes || ['mcq', 'truefalse', 'fill'];
    setSelectedQuestionTypes(defaultTypes);
  };

  const handleDeleteQuiz = (id: string) => {
    if (confirm(isNp ? 'के तपाईँ यो क्विज हटाउन चाहनुहुन्छ?' : 'Are you sure you want to delete this quiz?')) {
      setQuizzes(prev => prev.filter(q => q.id !== id));
    }
  };

  const handlePublishQuiz = (quizId: string) => {
    setQuizzes(prev => prev.map(q => 
      q.id === quizId 
        ? {...q, status: 'published'}
        : q
    ));
  };

  const toggleQuestionType = (type: string) => {
    if (selectedQuestionTypes.includes(type)) {
      setSelectedQuestionTypes(prev => prev.filter(t => t !== type));
    } else {
      setSelectedQuestionTypes(prev => [...prev, type]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Radio className="w-5 h-5 text-indigo-600" />
              <span>{isNp ? 'मेरी क्विजहरू' : 'My Quizzes'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isNp ? 'विद्यार्थीहरूलाई दिएका क्विजहरू व्यवस्थापन गर्नुहोस्।' : 'Manage quizzes given to students.'}
            </p>
          </div>
          <button
            onClick={() => setShowQuizForm(!showQuizForm)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center space-x-1"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{showQuizForm ? (isNp ? 'रद्द गर्नुहोस्' : 'Cancel') : (isNp ? '+ नयाँ क्विज' : '+ New Quiz')}</span>
          </button>
        </div>

        {showQuizForm && (
          <form onSubmit={handleSaveQuiz} className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Quiz Title *</label>
                <input
                  type="text"
                  id="quiz-title"
                  required
                  defaultValue={editingQuiz?.title}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Course *</label>
                <select
                  id="quiz-course"
                  required
                  defaultValue={editingQuiz?.course}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                >
                  <option value="">Select Course</option>
                  {instructorCourses.map(course => (
                    <option key={course.id} value={course.title}>{course.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description *</label>
              <textarea
                id="quiz-description"
                rows={3}
                required
                defaultValue={editingQuiz?.description}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Questions *</label>
                <input
                  type="number"
                  id="quiz-questions"
                  required
                  defaultValue={editingQuiz?.questions}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Duration *</label>
                <input
                  type="text"
                  id="quiz-duration"
                  required
                  defaultValue={editingQuiz?.duration}
                  placeholder="e.g., 30 minutes"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty *</label>
                <select
                  id="quiz-difficulty"
                  required
                  defaultValue={editingQuiz?.difficulty}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Passing Score (%) *</label>
                <input
                  type="number"
                  id="quiz-passing"
                  required
                  defaultValue={editingQuiz?.passingScore}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Question Types *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {questionTypes.map(type => (
                  <label key={type.id} className="flex items-center space-x-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={selectedQuestionTypes.includes(type.id)}
                      onChange={() => toggleQuestionType(type.id)}
                      className="rounded border-slate-300"
                    />
                    <span className="text-xs font-medium text-slate-700">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => { setShowQuizForm(false); setEditingQuiz(null); setSelectedQuestionTypes(['mcq', 'truefalse', 'fill']); }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold"
              >
                {isNp ? 'रद्द गर्नुहोस्' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md"
              >
                {isNp ? 'क्विज सेभ गर्नुहोस्' : 'Save Quiz'}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Quiz Title</th>
                <th className="p-4">Course</th>
                <th className="p-4">Questions</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Difficulty</th>
                <th className="p-4">Attempts</th>
                <th className="p-4">Passing Score</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs text-slate-800 font-medium">
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{quiz.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{quiz.description}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-200">
                      {quiz.course}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-indigo-700">{quiz.questions}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{quiz.duration}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${quiz.difficulty === 'Hard' ? 'bg-rose-100 text-rose-700' : quiz.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {quiz.difficulty}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      <span>{quiz.attempts}</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-emerald-700">{quiz.passingScore}%</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button
                        onClick={() => handleEditQuiz(quiz)}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                        title={isNp ? 'सम्पादन गर्नुहोस्' : 'Edit'}
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePublishQuiz(quiz.id)}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                        title={isNp ? 'प्रकाशित गर्नुहोस्' : 'Publish'}
                        disabled={quiz.status === 'published'}
                      >
                        <BookOpen className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuiz(quiz.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                        title={isNp ? 'मेटाउनुहोस्' : 'Delete'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
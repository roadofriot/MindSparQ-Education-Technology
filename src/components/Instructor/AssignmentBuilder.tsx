import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, PlusCircle, Edit as EditIcon, Trash2, Download, Calendar, Users, FileCheck, Clock, CheckCircle } from 'lucide-react';

interface AssignmentBuilderProps {
  instructorCourses: any[];
}

export const AssignmentBuilder: React.FC<AssignmentBuilderProps> = ({ instructorCourses }) => {
  const { language } = useApp();
  const isNp = language === 'np';

  const [assignments, setAssignments] = useState<any[]>([
    {
      id: 'assign-1',
      title: 'Python Data Structures Assignment',
      course: 'Python Advanced',
      description: 'Implement all sorting and searching algorithms',
      deadline: '2026-08-15',
      points: 100,
      difficulty: 'Hard',
      status: 'active',
      submissions: 12,
      totalStudents: 25
    },
    {
      id: 'assign-2',
      title: 'React Component Assignment',
      course: 'Web Development',
      description: 'Build a complete e-commerce product catalog',
      deadline: '2026-08-10',
      points: 50,
      difficulty: 'Medium',
      status: 'draft',
      submissions: 0,
      totalStudents: 18
    }
  ]);

  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<any>(null);

  const handleSaveAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAssignment) {
      setAssignments(prev => prev.map(a => a.id === editingAssignment.id ? editingAssignment : a));
      setEditingAssignment(null);
    } else {
      const newAssignment = {
        id: `assign-${Date.now()}`,
        title: (document.getElementById('assign-title') as HTMLInputElement).value,
        course: (document.getElementById('assign-course') as HTMLSelectElement).value,
        description: (document.getElementById('assign-description') as HTMLTextAreaElement).value,
        deadline: (document.getElementById('assign-deadline') as HTMLInputElement).value,
        points: Number((document.getElementById('assign-points') as HTMLInputElement).value),
        difficulty: (document.getElementById('assign-difficulty') as HTMLSelectElement).value,
        status: 'draft',
        submissions: 0,
        totalStudents: instructorCourses.find(c => c.title === (document.getElementById('assign-course') as HTMLSelectElement).value)?.enrolled || 0
      };
      setAssignments(prev => [newAssignment, ...prev]);
    }
    setShowAssignmentForm(false);
  };

  const handleEditAssignment = (assignment: any) => {
    setEditingAssignment({...assignment});
    setShowAssignmentForm(true);
  };

  const handleDeleteAssignment = (id: string) => {
    if (confirm(isNp ? 'के तपाईँ यो असाइनमेन्ट हटाउन चाहनुहुन्छ?' : 'Are you sure you want to delete this assignment?')) {
      setAssignments(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleSubmitAssignment = (assignmentId: string) => {
    setAssignments(prev => prev.map(a => 
      a.id === assignmentId 
        ? {...a, status: 'published', submissions: a.submissions + 1}
        : a
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <span>{isNp ? 'मेरी असाइनमेन्टहरू' : 'My Assignments'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isNp ? 'विद्यार्थीहरूलाई दिएका असाइनमेन्टहरू व्यवस्थापन गर्नुहोस्।' : 'Manage assignments given to students.'}
            </p>
          </div>
          <button
            onClick={() => setShowAssignmentForm(!showAssignmentForm)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center space-x-1"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{showAssignmentForm ? (isNp ? 'रद्द गर्नुहोस्' : 'Cancel') : (isNp ? '+ नयाँ असाइनमेन्ट' : '+ New Assignment')}</span>
          </button>
        </div>

        {showAssignmentForm && (
          <form onSubmit={handleSaveAssignment} className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assignment Title *</label>
                <input
                  type="text"
                  id="assign-title"
                  required
                  defaultValue={editingAssignment?.title}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Course *</label>
                <select
                  id="assign-course"
                  required
                  defaultValue={editingAssignment?.course}
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
                id="assign-description"
                rows={3}
                required
                defaultValue={editingAssignment?.description}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Deadline *</label>
                <input
                  type="date"
                  id="assign-deadline"
                  required
                  defaultValue={editingAssignment?.deadline}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Total Points</label>
                <input
                  type="number"
                  id="assign-points"
                  defaultValue={editingAssignment?.points}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty</label>
                <select
                  id="assign-difficulty"
                  defaultValue={editingAssignment?.difficulty}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => { setShowAssignmentForm(false); setEditingAssignment(null); }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold"
              >
                {isNp ? 'रद्द गर्नुहोस्' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md"
              >
                {isNp ? 'असाइनमेन्ट सेभ गर्नुहोस्' : 'Save Assignment'}
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
                <th className="p-4">Assignment Title</th>
                <th className="p-4">Course</th>
                <th className="p-4">Deadline</th>
                <th className="p-4">Points</th>
                <th className="p-4">Difficulty</th>
                <th className="p-4">Submissions</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs text-slate-800 font-medium">
              {assignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{assignment.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{assignment.description}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-200">
                      {assignment.course}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{assignment.deadline}</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-indigo-700">{assignment.points} pts</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${assignment.difficulty === 'Hard' ? 'bg-rose-100 text-rose-700' : assignment.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {assignment.difficulty}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      <span>{assignment.submissions}/{assignment.totalStudents}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button
                        onClick={() => handleEditAssignment(assignment)}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                        title={isNp ? 'सम्पादन गर्नुहोस्' : 'Edit'}
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSubmitAssignment(assignment.id)}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                        title={isNp ? 'प्रकाशित गर्नुहोस्' : 'Publish'}
                      >
                        <FileCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAssignment(assignment.id)}
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
import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  BookOpen, 
  CheckCircle, 
  Search, 
  Plus, 
  Trash2, 
  Download, 
  ShieldCheck, 
  Clock, 
  X, 
  Eye, 
  Send, 
  Sparkles,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  enrolledCourse: string;
  progressPercent: number;
  attendancePercent: number;
  grade: 'A+' | 'A' | 'B+' | 'Pending';
  certificateHash?: string;
  enrolledDate: string;
  status: 'Active' | 'Completed' | 'Dropped';
}

export const StudentManager: React.FC = () => {
  const { courses, language } = useApp();
  const isNp = language === 'np';

  const [students, setStudents] = useState<StudentRecord[]>([
    {
      id: 'st-1',
      name: 'Aanand Sharma',
      email: 'aanand.sharma@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      phone: '+977 9841234567',
      enrolledCourse: 'Full-Stack Web Development Bootcamp',
      progressPercent: 95,
      attendancePercent: 98,
      grade: 'A+',
      certificateHash: 'MS-2026-REACT-884291',
      enrolledDate: '2026-05-10',
      status: 'Completed'
    },
    {
      id: 'st-2',
      name: 'Suman Shrestha',
      email: 'suman.shrestha@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop&q=80',
      phone: '+977 9801987654',
      enrolledCourse: 'Python, AI & Machine Learning Foundations',
      progressPercent: 65,
      attendancePercent: 92,
      grade: 'A',
      enrolledDate: '2026-06-01',
      status: 'Active'
    },
    {
      id: 'st-3',
      name: 'Pooja Thapa',
      email: 'pooja.thapa@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      phone: '+977 9811223344',
      enrolledCourse: 'Secondary School Robotics & STEM Curriculum',
      progressPercent: 80,
      attendancePercent: 90,
      grade: 'A',
      enrolledDate: '2026-06-15',
      status: 'Active'
    }
  ]);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedStudentForCert, setSelectedStudentForCert] = useState<StudentRecord | null>(null);

  // New Student Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentCourse, setNewStudentCourse] = useState(courses[0]?.title || 'Full-Stack Web Development');

  const filteredStudents = students.filter(st => {
    const matchesSearch = st.name.toLowerCase().includes(search.toLowerCase()) || st.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || st.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleIssueCertificate = (studentId: string) => {
    const certHash = `MS-2026-CERT-${Math.floor(100000 + Math.random() * 900000)}`;
    setStudents(prev =>
      prev.map(s => (s.id === studentId ? { ...s, status: 'Completed', progressPercent: 100, certificateHash: certHash } : s))
    );
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newStudentEmail) return;

    const newSt: StudentRecord = {
      id: `st-${Date.now()}`,
      name: newStudentName,
      email: newStudentEmail,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      phone: '+977 9800000000',
      enrolledCourse: newStudentCourse,
      progressPercent: 10,
      attendancePercent: 100,
      grade: 'Pending',
      enrolledDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    setStudents(prev => [newSt, ...prev]);
    setIsAddModalOpen(false);
    setNewStudentName('');
    setNewStudentEmail('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span>{isNp ? 'विद्यार्थी भर्ना तथा प्रमाणपत्र व्यवस्थापन' : 'Student Enrollment & Verified Certificates System'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track student learning progress, attendance, grades, and issue digital verified certificates.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isNp ? '+ नयाँ विद्यार्थी दर्ता' : '+ Enroll New Student'}</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student by name or email..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          {['All', 'Active', 'Completed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="p-4">Student Profile</th>
                <th className="p-4">Enrolled Course</th>
                <th className="p-4">Progress & Attendance</th>
                <th className="p-4">Grade</th>
                <th className="p-4">Certificate Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img src={st.avatar} alt={st.name} className="w-10 h-10 rounded-full object-cover border" />
                      <div>
                        <p className="font-bold text-slate-900 text-xs">{st.name}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{st.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 max-w-xs font-semibold text-slate-800">
                    {st.enrolledCourse}
                  </td>

                  <td className="p-4 space-y-1 w-44">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-600">Progress: {st.progressPercent}%</span>
                      <span className="text-emerald-700">Attn: {st.attendancePercent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${st.progressPercent}%` }} />
                    </div>
                  </td>

                  <td className="p-4 font-black text-slate-900">
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono border border-indigo-200">
                      {st.grade}
                    </span>
                  </td>

                  <td className="p-4">
                    {st.certificateHash ? (
                      <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center space-x-1 w-fit">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>VERIFIED: {st.certificateHash.slice(0, 12)}...</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleIssueCertificate(st.id)}
                        className="text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1 rounded-lg shadow-sm flex items-center space-x-1"
                      >
                        <Award className="w-3 h-3" />
                        <span>Issue Certificate</span>
                      </button>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    {st.certificateHash && (
                      <button
                        onClick={() => setSelectedStudentForCert(st)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center space-x-1 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Certificate</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CERTIFICATE PREVIEW MODAL */}
      {selectedStudentForCert && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 space-y-6 shadow-2xl relative border-4 border-indigo-600 text-center text-slate-900">
            <button
              onClick={() => setSelectedStudentForCert(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <ShieldCheck className="w-12 h-12 text-indigo-600 mx-auto" />
              <h2 className="text-xl font-black text-slate-900 tracking-wider uppercase">MINDSPARQ CERTIFICATE OF ACHIEVEMENT</h2>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">VERIFIED DIGITAL CERTIFICATION</p>
            </div>

            <div className="py-4 border-y border-slate-200 space-y-2">
              <p className="text-xs text-slate-500">This is proudly presented to</p>
              <p className="text-2xl font-black text-indigo-700">{selectedStudentForCert.name}</p>
              <p className="text-xs text-slate-600">for successfully mastering and graduating from</p>
              <p className="text-base font-bold text-slate-900">{selectedStudentForCert.enrolledCourse}</p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-2">
              <div>
                <p className="font-bold text-slate-800">Grade: {selectedStudentForCert.grade}</p>
                <p>Date: {selectedStudentForCert.enrolledDate}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-700">{selectedStudentForCert.certificateHash}</p>
                <p className="text-[10px]">Verified via MindSparQ Hash Ledger</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW STUDENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 space-y-4 shadow-2xl relative text-slate-900">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-base flex items-center space-x-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>Enroll New Student</span>
            </h3>

            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="e.g. Suman Karki"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student Email Address *</label>
                <input
                  type="email"
                  required
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  placeholder="suman.karki@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assign Course</label>
                <select
                  value={newStudentCourse}
                  onChange={(e) => setNewStudentCourse(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl font-bold"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-md"
                >
                  Confirm Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

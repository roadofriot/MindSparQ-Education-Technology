import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Users, Clock, CheckCircle, X, Search, Filter, Download, Award, FileText } from 'lucide-react';

interface StudentManagementProps {
  instructorCourses: any[];
}

export const StudentManagement: React.FC<StudentManagementProps> = ({ instructorCourses }) => {
  const { language, inquiries } = useApp();
  const isNp = language === 'np';

  const [studentFilter, setStudentFilter] = useState('all');
  const [studentSearch, setStudentSearch] = useState('');
  const [showCertificates, setShowCertificates] = useState(false);

  const getEnrolledStudents = () => {
    const students = inquiries.filter(inquiry => 
      (inquiry.status === 'enrolled' || inquiry.status === 'contacted') &&
      (instructorCourses.some(course => course.title.includes(inquiry.courseInterested)))
    );
    return students;
  };

  const enrolledStudents = getEnrolledStudents();

  const filteredStudents = enrolledStudents.filter(student => {
    if (studentFilter === 'all') return true;
    if (studentFilter === 'active') return student.status === 'enrolled';
    if (studentFilter === 'pending') return student.status === 'contacted';
    return true;
  }).filter(student => 
    student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const getCertificateHistory = (studentId: string) => {
    return [
      { id: 'cert-1', course: 'Python Advanced', issueDate: '2026-07-15', grade: 'A', verified: true },
      { id: 'cert-2', course: 'Web Development', issueDate: '2026-06-20', grade: 'B+', verified: true }
    ].filter(cert => cert.course.includes(studentId));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>{isNp ? 'विद्यार्थी व्यवस्थापन' : 'Student Management'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isNp ? 'तपाईँको पाठ्यक्रमहरूमा भर्नामुक्त विद्यार्थीहरू।' : 'Manage students enrolled in your courses.'}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder={isNp ? 'खोज्नुहोस्...' : 'Search...'}
                className="pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs w-40"
              />
            </div>
            <select
              value={studentFilter}
              onChange={(e) => setStudentFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
            >
              <option value="all">All ({enrolledStudents.length})</option>
              <option value="active">Active ({enrolledStudents.filter(s => s.status === 'enrolled').length})</option>
              <option value="pending">Pending ({enrolledStudents.filter(s => s.status === 'contacted').length})</option>
            </select>
            <button
              onClick={() => setShowCertificates(!showCertificates)}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1"
            >
              <Award className="w-4 h-4" />
              <span>{isNp ? 'सर्टिफिकेटहरू' : 'Certificates'}</span>
            </button>
          </div>
        </div>
      </div>

      {showCertificates && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Download className="w-4 h-4 text-indigo-600" />
            <span>{isNp ? 'सर्टिफिकेट वितरण' : 'Certificate Distribution'}</span>
          </h4>
          <div className="space-y-3">
            {filteredStudents.map((student) => {
              const certificates = getCertificateHistory(student.id);
              return (
                <div key={student.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-sm text-slate-900">{student.name}</h5>
                    <span className="text-[10px] text-slate-500">ID: {student.id}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-1">
                    <p>Email: {student.email}</p>
                    <p>Course: {student.courseInterested}</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <h6 className="text-[11px] font-bold text-slate-700 mb-2">Issued Certificates:</h6>
                    <div className="space-y-2">
                      {certificates.map(cert => (
                        <div key={cert.id} className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                          <div className="flex items-center gap-2">
                            <Award className="w-3 h-3 text-emerald-600" />
                            <span className="text-[11px] font-medium">{cert.course}</span>
                          </div>
                          <div className="flex items-center gap-3 text-[10px] text-slate-500">
                            <span>Issued: {cert.issueDate}</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {cert.grade}
                            </span>
                            <button className="text-indigo-600 hover:text-indigo-700">
                              <Download size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Student</th>
                <th className="p-4">Email</th>
                <th className="p-4">Course</th>
                <th className="p-4">Status</th>
                <th className="p-4">Enrolled Date</th>
                <th className="p-4 text-right">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs text-slate-800 font-medium">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={`https://images.unsplash.com/photo-153268912900${Math.floor(Math.random() * 9) + 1}?w=400&auto=format&fit=crop&q=80`}
                        alt={student.name}
                        className="w-9 h-9 rounded-xl object-cover border"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{student.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">ID: #{student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 font-mono text-[11px]">{student.email}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-200">
                      {student.courseInterested}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                      student.status === 'enrolled'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}>{
                      student.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 font-mono text-[11px]">{student.createdAt}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${Math.floor(Math.random() * 60) + 20}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-600 font-bold">{Math.floor(Math.random() * 60) + 20}%</span>
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
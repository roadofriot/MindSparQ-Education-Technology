import React, { useState } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  DollarSign, 
  Activity, 
  Eye, 
  UserCheck, 
  Award, 
  Server, 
  Zap, 
  ShieldCheck, 
  Download, 
  Calendar, 
  ArrowUpRight, 
  Clock 
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const AnalyticsView: React.FC = () => {
  const { courses, instructors, inquiries, teacherRequests, posts, language } = useApp();
  const isNp = language === 'np';

  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  // Traffic & Visitor Chart Data
  const trafficData = [
    { date: 'Jul 01', visitors: 1200, activeUsers: 450, courseViews: 890 },
    { date: 'Jul 05', visitors: 1850, activeUsers: 620, courseViews: 1240 },
    { date: 'Jul 10', visitors: 2400, activeUsers: 980, courseViews: 1820 },
    { date: 'Jul 15', visitors: 3100, activeUsers: 1450, courseViews: 2300 },
    { date: 'Jul 20', visitors: 2900, activeUsers: 1320, courseViews: 2100 },
    { date: 'Jul 25', visitors: 3800, activeUsers: 1890, courseViews: 2950 },
    { date: 'Jul 30', visitors: 4500, activeUsers: 2200, courseViews: 3600 },
  ];

  // Monthly Student Intake & Published Content Trends
  const enrollmentTrends = [
    { month: 'Jan', activeStudents: 140, publishedPages: 12 },
    { month: 'Feb', activeStudents: 210, publishedPages: 18 },
    { month: 'Mar', activeStudents: 320, publishedPages: 25 },
    { month: 'Apr', activeStudents: 410, publishedPages: 29 },
    { month: 'May', activeStudents: 590, publishedPages: 36 },
    { month: 'Jun', activeStudents: 780, publishedPages: 42 },
    { month: 'Jul', activeStudents: 950, publishedPages: 50 },
  ];

  // Category Distribution
  const categoryDistribution = [
    { name: 'Software Eng.', value: 45, color: '#4f46e5' },
    { name: 'AI & Data Science', value: 30, color: '#06b6d4' },
    { name: 'Academic STEM', value: 15, color: '#10b981' },
    { name: 'School Solutions', value: 10, color: '#f59e0b' },
  ];

  // Recent System Activity Logs
  const auditLogs = [
    { id: '1', action: 'New Student Enrollment', detail: 'Aanand Sharma enrolled in Full-Stack React & Node', time: '5 mins ago', type: 'student' },
    { id: '2', action: 'Direct Broadcast Published', detail: 'Admin published: "Summer 2026 Orientation"', time: '22 mins ago', type: 'broadcast' },
    { id: '3', action: 'Teacher Access Approved', detail: 'Approved Er. Ramesh Karki for Teacher Panel', time: '1 hour ago', type: 'teacher' },
    { id: '4', action: 'Course Content Updated', detail: 'Updated Module 3 for Python AI Bootcamp', time: '3 hours ago', type: 'course' },
    { id: '5', action: 'System Security Check', detail: 'CSRF & SSL Certificates validated - Operational 100%', time: '6 hours ago', type: 'system' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Controls & Timeframe Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            <span>{isNp ? 'उन्नत प्रणाली स्थिति तथा तथ्यांक' : 'Enterprise Analytics & Real-Time Intelligence'}</span>
          </h2>
          <p className="text-xs text-slate-500">Live system health metrics, visitor growth, course performance and audit logs.</p>
        </div>

        <div className="flex items-center space-x-2">
          {(['7d', '30d', '90d'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeframe === t 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t === '7d' ? 'Last 7 Days' : t === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </button>
          ))}
          <button 
            onClick={() => alert('Exporting CMS Performance Report as PDF/CSV...')}
            className="px-3.5 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-bold flex items-center space-x-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Web Visitors</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-black text-slate-900">48,290</p>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +18.4%
            </span>
          </div>
          <p className="text-[11px] text-slate-400">12,450 unique active learning sessions</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Students</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-black text-slate-900">4,820</p>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +12.1%
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Enrolled across {courses.length} active programs</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inquiries & Applications</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-black text-slate-900">{inquiries.length}</p>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> Live
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Admission forms & school partnership requests</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Health</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-black text-emerald-600">99.98%</p>
            <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
              OPTIMAL
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Cloud Run CDN & Edge Latency: 14ms</p>
        </div>

      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visitor Traffic & Engagement Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Website Traffic & Course View Trends</h3>
              <p className="text-xs text-slate-500">Daily unique visitors vs course page impressions</p>
            </div>
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
              Live Edge Sync
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} 
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="visitors" name="Unique Visitors" stroke="#4f46e5" fillOpacity={1} fill="url(#colorVisitors)" />
                <Area type="monotone" dataKey="courseViews" name="Course Impressions" stroke="#06b6d4" fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Enrollment Category Breakdown</h3>
            <p className="text-xs text-slate-500">Distribution of student registrations by vertical</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            {categoryDistribution.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="font-semibold text-slate-700">{cat.name}</span>
                </span>
                <span className="font-bold text-slate-900">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Monthly Student Intake & Published Content Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Student Intake & CMS Published Pages Velocity</h3>
              <p className="text-xs text-slate-500">Track active student registrations vs published instructional modules</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Active Growth
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentTrends}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="activeStudents" name="Active Students" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="publishedPages" name="Published CMS Pages" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Realtime System Audit Activity Stream */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Realtime Audit Trail</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Live Stream</span>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{log.action}</span>
                  <span className="text-[10px] text-slate-400">{log.time}</span>
                </div>
                <p className="text-slate-600 text-[11px]">{log.detail}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

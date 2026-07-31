import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  CheckCircle, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  Send, 
  Trash2, 
  Filter, 
  FileText 
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const FormsInbox: React.FC = () => {
  const { inquiries, updateInquiryStatus, language } = useApp();
  const isNp = language === 'np';

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = inq.name.toLowerCase().includes(search.toLowerCase()) || 
                          inq.email.toLowerCase().includes(search.toLowerCase()) ||
                          inq.message.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || inq.status === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <span>{isNp ? 'वेबसाइट आवेदन तथा इनक्वायरी पत्रमन्च' : 'Form Submissions & Inquiry Inbox'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Central inbox for admission forms, contact inquiries, teacher applications, and school partnership requests.
          </p>
        </div>

        <span className="px-3.5 py-1.5 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 shrink-0">
          Total Inquiries: {inquiries.length}
        </span>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by applicant name, email, or message..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Requests' },
            { id: 'new', label: 'New / Unread' },
            { id: 'contacted', label: 'Contacted' },
            { id: 'enrolled', label: 'Enrolled' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setFilterType(st.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterType === st.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Stream */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
            <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
            <p className="font-bold text-slate-800 text-sm">No Inquiry Submissions Found</p>
            <p className="text-xs text-slate-400">All submissions have been reviewed or matched filter query.</p>
          </div>
        ) : (
          filteredInquiries.map((inq) => (
            <div key={inq.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-sm">
                    {inq.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                      <span>{inq.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        inq.status === 'new'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : inq.status === 'contacted'
                          ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {inq.status}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center space-x-3 mt-0.5 font-mono">
                      <span className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{inq.email}</span>
                      </span>
                      {inq.phone && (
                        <span className="flex items-center space-x-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{inq.phone}</span>
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-slate-400">
                  Received: {inq.createdAt}
                </span>
              </div>

              {/* Course Interest & Message */}
              <div className="space-y-1 text-xs">
                {inq.courseInterested && (
                  <p className="font-bold text-indigo-700 flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Program Interested: {inq.courseInterested}</span>
                  </p>
                )}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-xs italic leading-relaxed">
                  "{inq.message}"
                </div>
              </div>

              {/* Status Actions */}
              <div className="flex items-center justify-end space-x-2 pt-1">
                <button
                  onClick={() => updateInquiryStatus(inq.id, 'contacted')}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all"
                >
                  Mark as Contacted
                </button>
                <button
                  onClick={() => updateInquiryStatus(inq.id, 'enrolled')}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Mark as Enrolled</span>
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  Folder, 
  Image as ImageIcon, 
  Film, 
  FileText, 
  HardDrive, 
  Search, 
  Upload, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Eye, 
  ExternalLink, 
  Tag, 
  Filter, 
  X,
  Sparkles,
  Download
} from 'lucide-react';
import { GoogleDriveEmbedModal } from '../../Common/GoogleDriveEmbedModal';
import { useApp } from '../../../context/AppContext';

export interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'pdf' | 'doc' | 'zip' | 'drive';
  url: string;
  embedUrl?: string;
  size: string;
  uploadedAt: string;
  tags: string[];
  dimensions?: string;
}

interface MediaLibraryProps {
  onSelectMedia?: (url: string) => void;
  isModal?: boolean;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ onSelectMedia, isModal = false }) => {
  const { language } = useApp();
  const isNp = language === 'np';

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: 'm-1',
      name: 'campus_lab_orientation_2026.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
      size: '1.2 MB',
      uploadedAt: '2026-07-28',
      tags: ['Campus', 'Lab', 'Orientation'],
      dimensions: '1920x1080'
    },
    {
      id: 'm-2',
      name: 'python_ai_curriculum_guide.pdf',
      type: 'pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      size: '3.4 MB',
      uploadedAt: '2026-07-25',
      tags: ['Curriculum', 'Syllabus', 'Python']
    },
    {
      id: 'm-3',
      name: 'google_drive_react_orientation.mp4',
      type: 'drive',
      url: 'https://drive.google.com/file/d/1A2B3C4D5E/preview',
      embedUrl: 'https://drive.google.com/file/d/1A2B3C4D5E/preview',
      size: '45 MB (Google Drive Cloud)',
      uploadedAt: '2026-07-30',
      tags: ['Drive', 'Video', 'React']
    },
    {
      id: 'm-4',
      name: 'mindsparq_official_logo.png',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=80',
      size: '420 KB',
      uploadedAt: '2026-07-20',
      tags: ['Logo', 'Brand', 'Asset'],
      dimensions: '512x512'
    },
    {
      id: 'm-5',
      name: 'fullstack_web_development_lab.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      size: '2.1 MB',
      uploadedAt: '2026-07-29',
      tags: ['FullStack', 'Coding', 'Classroom'],
      dimensions: '2048x1365'
    }
  ]);

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Google Drive Modal
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);

  // New Upload Modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileUrl, setNewFileUrl] = useState('');
  const [newFileType, setNewFileType] = useState<'image' | 'pdf' | 'doc' | 'video'>('image');
  const [newFileTags, setNewFileTags] = useState('Mindsparq, Asset');

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      let detectedType: 'image' | 'pdf' | 'doc' | 'video' = 'image';
      if (fileExt === 'pdf') detectedType = 'pdf';
      else if (['doc', 'docx', 'ppt', 'pptx'].includes(fileExt || '')) detectedType = 'doc';
      else if (['mp4', 'webm', 'mov'].includes(fileExt || '')) detectedType = 'video';

      const newItem: MediaItem = {
        id: `m-local-${Date.now()}`,
        name: file.name,
        type: detectedType,
        url: dataUrl,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadedAt: new Date().toISOString().split('T')[0],
        tags: ['Local Upload', fileExt?.toUpperCase() || 'FILE']
      };

      setMediaItems(prev => [newItem, ...prev]);
      if (onSelectMedia) {
        onSelectMedia(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDriveUrlSelect = (embedUrl: string) => {
    const newItem: MediaItem = {
      id: `m-drive-${Date.now()}`,
      name: `google_drive_asset_${Date.now().toString().slice(-4)}`,
      type: 'drive',
      url: embedUrl,
      embedUrl: embedUrl,
      size: 'Google Drive Stream',
      uploadedAt: new Date().toISOString().split('T')[0],
      tags: ['Google Drive', 'Cloud Asset']
    };
    setMediaItems(prev => [newItem, ...prev]);
  };

  const handleCreateMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName || !newFileUrl) return;

    const newItem: MediaItem = {
      id: `m-${Date.now()}`,
      name: newFileName,
      type: newFileType,
      url: newFileUrl,
      size: '1.5 MB',
      uploadedAt: new Date().toISOString().split('T')[0],
      tags: newFileTags.split(',').map(t => t.trim()).filter(Boolean)
    };

    setMediaItems(prev => [newItem, ...prev]);
    setIsUploadModalOpen(false);
    setNewFileName('');
    setNewFileUrl('');
  };

  const handleDeleteMedia = (id: string) => {
    if (confirm('Delete media asset permanently from CDN?')) {
      setMediaItems(prev => prev.filter(i => i.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Folder className="w-5 h-5 text-indigo-600" />
            <span>{isNp ? 'उन्नत मिडिया तथा गुगल ड्राइभ लाइब्रेरी' : 'Enterprise Media & Google Drive Asset CDN'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Store, preview, compress, and organize images, documents, videos, and Google Drive links.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0 flex-wrap">
          <label className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center space-x-1.5 shadow-sm">
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>{isNp ? 'कम्प्यूटरबाट फाइल अपलोड' : 'Upload From Disk'}</span>
            <input 
              type="file" 
              accept="image/*,.pdf,.doc,.docx,.mp4" 
              onChange={handleFileUploadChange} 
              className="hidden" 
            />
          </label>

          <button
            onClick={() => setIsDriveModalOpen(true)}
            className="px-3.5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
          >
            <HardDrive className="w-4 h-4 text-indigo-600" />
            <span>{isNp ? 'गुगल ड्राइभ' : '+ Google Drive'}</span>
          </button>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{isNp ? 'URL बाट थप्नुहोस्' : '+ Add URL'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by file name or tag..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Files' },
            { id: 'image', label: 'Images' },
            { id: 'pdf', label: 'PDFs' },
            { id: 'drive', label: 'Google Drive' },
            { id: 'video', label: 'Videos' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterType === type.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3 relative group">
            
            {/* Preview Banner */}
            <div className="w-full aspect-video rounded-xl bg-slate-900 overflow-hidden relative border border-slate-100 flex items-center justify-center">
              {item.type === 'image' ? (
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
              ) : item.type === 'drive' ? (
                <div className="text-center p-3 space-y-1">
                  <HardDrive className="w-8 h-8 text-indigo-400 mx-auto animate-pulse" />
                  <p className="text-[10px] text-white font-mono font-bold">Google Drive Cloud</p>
                </div>
              ) : item.type === 'pdf' ? (
                <div className="text-center p-3 space-y-1">
                  <FileText className="w-8 h-8 text-amber-400 mx-auto" />
                  <p className="text-[10px] text-slate-200 font-bold uppercase">PDF Document</p>
                </div>
              ) : (
                <Film className="w-8 h-8 text-rose-400" />
              )}

              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-white text-[9px] font-mono uppercase tracking-wider backdrop-blur-sm">
                {item.type}
              </span>
            </div>

            {/* Content Details */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-xs text-slate-900 truncate" title={item.name}>
                {item.name}
              </h4>
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>{item.size}</span>
                <span>{item.uploadedAt}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {item.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-semibold">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              {onSelectMedia ? (
                <button
                  onClick={() => onSelectMedia(item.embedUrl || item.url)}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold flex items-center space-x-1 transition-all"
                >
                  <Check className="w-3 h-3 text-white" />
                  <span>Select Asset</span>
                </button>
              ) : (
                <button
                  onClick={() => handleCopyUrl(item.embedUrl || item.url, item.id)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[10px] font-bold flex items-center space-x-1 transition-all"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              )}

              <div className="flex items-center space-x-1">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg"
                  title="Open Asset"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => handleDeleteMedia(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                  title="Delete File"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Google Drive Embed Helper Modal */}
      <GoogleDriveEmbedModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        onSelectEmbedUrl={handleDriveUrlSelect}
      />

      {/* UPLOAD FILE MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 space-y-4 shadow-2xl relative text-slate-900">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-base flex items-center space-x-2">
              <Upload className="w-5 h-5 text-indigo-600" />
              <span>Upload New Media Asset</span>
            </h3>

            <form onSubmit={handleCreateMedia} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">File Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. mindsparq_broucher_2026.pdf"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">File Type</label>
                <select
                  value={newFileType}
                  onChange={(e) => setNewFileType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl font-bold"
                >
                  <option value="image">Image (PNG/JPG/WEBP)</option>
                  <option value="pdf">PDF Document</option>
                  <option value="doc">Word / PowerPoint</option>
                  <option value="video">MP4 / Video File</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">File Direct URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newFileUrl}
                  onChange={(e) => setNewFileUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Mindsparq, Brochure, PDF"
                  value={newFileTags}
                  onChange={(e) => setNewFileTags(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

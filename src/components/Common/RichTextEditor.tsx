import React, { useState, useRef, useEffect } from 'react';
import {
  Bold, Italic, Underline, Type, List, ListOrdered, Quote, Code, Table,
  CheckSquare, Image, FileText, Save, X, Eye, AlignLeft, AlignCenter, AlignRight,
  Loader
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'file';
  url: string;
  size: string;
  uploadedAt: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing your content...',
  className = ''
}) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
  const [activeFormat, setActiveFormat] = useState<string | null>(null);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([
    {
      id: 'media-1',
      name: 'placeholder-image-1.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      size: '2.4 MB',
      uploadedAt: '2026-08-01'
    },
    {
      id: 'media-2',
      name: 'placeholder-video.mp4',
      type: 'video',
      url: 'https://sample-videos.co.za/ppt/mp4/720/big-buck-bunny-720p30-10s.mp4',
      size: '15.8 MB',
      uploadedAt: '2026-07-28'
    }
  ]);
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editorContentRef.current && !editorContentRef.current.contains(event.target as Node)) {
        setIsToolbarVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorContentRef.current?.focus();
    setIsToolbarVisible(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);

    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const newAsset: MediaAsset = {
          id: `media-${Date.now()}`,
          name: file.name,
          type: 'image',
          url: dataUrl,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          uploadedAt: new Date().toISOString().split('T')[0]
        };

        setMediaAssets(prev => [newAsset, ...prev]);
        execCommand('insertImage', dataUrl);
        setIsUploadingImage(false);
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          const newAsset: MediaAsset = {
            id: `media-${Date.now()}`,
            name: file.name,
            type: 'image',
            url: dataUrl,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            uploadedAt: new Date().toISOString().split('T')[0]
          };

          setMediaAssets(prev => [newAsset, ...prev]);
          execCommand('insertImage', dataUrl);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const formatBlock = (format: string) => {
    setActiveFormat(format);
    execCommand('formatBlock', format);
  };

  return (
    <div
      className={`relative ${className} min-h-[400px] border border-slate-200 rounded-xl bg-white transition-all ${isDragging ? 'border-indigo-500 bg-indigo-50' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-wrap items-center p-2 border-b border-slate-200 bg-slate-50 rounded-t-xl gap-1">
        <div className="flex items-center gap-1 p-1">
          <button title="Bold" onClick={() => execCommand('bold')} className={`p-1.5 rounded hover:bg-slate-200 ${activeFormat === 'bold' ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}>
            <Bold size={16} />
          </button>
          <button title="Italic" onClick={() => execCommand('italic')} className={`p-1.5 rounded hover:bg-slate-200 ${activeFormat === 'italic' ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}>
            <Italic size={16} />
          </button>
          <button title="Underline" onClick={() => execCommand('underline')} className={`p-1.5 rounded hover:bg-slate-200 ${activeFormat === 'underline' ? 'bg-slate-200 text-indigo-600' : 'text-slate-600'}`}>
            <Underline size={16} />
          </button>
        </div>

        <div className="w-px h-6 bg-slate-300" />

        <div className="relative group">
          <button title="Heading" className="p-1.5 rounded hover:bg-slate-200 text-slate-600 flex items-center gap-1">
            <Type size={16} />
          </button>
          <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-white border border-slate-200 rounded-lg shadow-lg p-1 z-50">
            <button onClick={() => formatBlock('<h1>')} className="block w-full text-left px-3 py-2 rounded hover:bg-slate-100 text-slate-700">Heading 1</button>
            <button onClick={() => formatBlock('<h2>')} className="block w-full text-left px-3 py-2 rounded hover:bg-slate-100 text-slate-700">Heading 2</button>
            <button onClick={() => formatBlock('<h3>')} className="block w-full text-left px-3 py-2 rounded hover:bg-slate-100 text-slate-700">Heading 3</button>
          </div>
        </div>

        <div className="w-px h-6 bg-slate-300" />

        <div className="flex items-center gap-1 p-1">
          <button title="Bullet List" onClick={() => execCommand('insertUnorderedList')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600">
            <List size={16} />
          </button>
          <button title="Numbered List" onClick={() => execCommand('insertOrderedList')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600">
            <ListOrdered size={16} />
          </button>
          <button title="Checklist" onClick={() => execCommand('insertHTML', '<ul style="list-style: none;"><li><input type="checkbox" /> <span contenteditable="false">Item</span></li></ul>')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600">
            <CheckSquare size={16} />
          </button>
        </div>

        <div className="w-px h-6 bg-slate-300" />

        <div className="flex items-center gap-1 p-1">
          <button title="Quote" onClick={() => execCommand('formatBlock', '<blockquote>')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600">
            <Quote size={16} />
          </button>
          <button title="Code Block" onClick={() => execCommand('formatBlock', '<pre>')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600">
            <Code size={16} />
          </button>
          <button title="Table" onClick={() => console.log('Table feature')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600">
            <Table size={16} />
          </button>
        </div>

        <div className="w-px h-6 bg-slate-300" />

        <div className="flex items-center gap-1 p-1">
          <button title="Align Left" onClick={() => execCommand('justifyLeft')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600">
            <AlignLeft size={16} />
          </button>
          <button title="Align Center" onClick={() => execCommand('justifyCenter')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600">
            <AlignCenter size={16} />
          </button>
          <button title="Align Right" onClick={() => execCommand('justifyRight')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600">
            <AlignRight size={16} />
          </button>
        </div>

        <div className="w-px h-6 bg-slate-300" />

        <div className="flex items-center gap-1 p-1">
          <button title="Upload Image" onClick={() => fileInputRef.current?.click()} className="p-1.5 rounded hover:bg-slate-200 text-slate-600 relative" disabled={isUploadingImage}>
            {isUploadingImage ? <Loader size={16} className="animate-spin" /> : <Image size={16} />}
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          <button title="Media Library" onClick={() => setIsMediaLibraryOpen(true)} className="p-1.5 rounded hover:bg-slate-200 text-slate-600">
            <FileText size={16} />
          </button>
        </div>

        <div className="ml-auto flex items-center gap-1 p-1">
          <button title="Save" onClick={() => console.log('Save content')} className="p-1.5 rounded hover:bg-slate-200 text-slate-600">
            <Save size={16} />
          </button>
          <button title="Preview" onClick={() => setIsToolbarVisible(false)} className="p-1.5 rounded hover:bg-slate-200 text-slate-600">
            <Eye size={16} />
          </button>
        </div>
      </div>

      <div
        ref={editorContentRef}
        contentEditable
        suppressContentEditableWarning
        className="p-4 min-h-[300px] focus:outline-none prose max-w-none ${isDragging ? 'border-2 border-dashed border-indigo-500' : ''}"
        style={{ minHeight: '300px' }}
        data-placeholder={placeholder}
        onClick={() => setIsToolbarVisible(true)}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
      >
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div>

      {isMediaLibraryOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Media Library</h3>
              <button onClick={() => setIsMediaLibraryOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  {mediaAssets.length} assets available
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold">
                    Upload New
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mediaAssets.map((asset) => (
                  <div key={asset.id} className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm hover:shadow-md transition-all cursor-pointer" onClick={() => {
                    if (asset.type === 'image') {
                      execCommand('insertImage', asset.url);
                    } else if (asset.type === 'video') {
                      execCommand('insertHTML', `<video controls style="max-width: 100%;"><source src="${asset.url}" type="video/mp4"></video>`);
                    } else {
                      execCommand('insertHTML', `<a href="${asset.url}" target="_blank" style="color: #3b82f6; text-decoration: underline;">${asset.name}</a>`);
                    }
                    setIsMediaLibraryOpen(false);
                  }}>
                    <div className="w-full aspect-video rounded-lg bg-slate-900 overflow-hidden relative mb-2 flex items-center justify-center">
                      {asset.type === 'image' ? (
                        <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                      ) : asset.type === 'video' ? (
                        <div className="text-center p-2">
                          <video src={asset.url} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="text-center p-2">
                          <FileText size={32} className="mx-auto text-slate-400" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-slate-900 truncate" title={asset.name}>
                        {asset.name}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span>{asset.size}</span>
                        <span>{asset.uploadedAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
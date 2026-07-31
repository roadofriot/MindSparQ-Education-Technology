import React, { useState } from 'react';
import { parseGoogleDriveUrl } from '../../utils/googleDriveHelper';
import { X, HardDrive, ExternalLink, Check, Copy, Eye, FileText, Film, Presentation } from 'lucide-react';

interface GoogleDriveEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEmbedUrl?: (embedUrl: string) => void;
}

export const GoogleDriveEmbedModal: React.FC<GoogleDriveEmbedModalProps> = ({
  isOpen,
  onClose,
  onSelectEmbedUrl
}) => {
  const [driveUrlInput, setDriveUrlInput] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const parsed = parseGoogleDriveUrl(driveUrlInput);

  const handleCopy = () => {
    if (!parsed.embedUrl) return;
    navigator.clipboard.writeText(parsed.embedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    if (onSelectEmbedUrl && parsed.embedUrl) {
      onSelectEmbedUrl(parsed.embedUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative text-slate-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Google Drive Integration Helper</h3>
            <p className="text-xs text-slate-500">Paste shared Google Drive, Docs, Slides, or Video links to embed</p>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">Google Drive Share Link</label>
          <input
            type="url"
            value={driveUrlInput}
            onChange={(e) => setDriveUrlInput(e.target.value)}
            placeholder="https://drive.google.com/file/d/1A2B3C.../view?usp=sharing"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-mono"
          />
        </div>

        {/* Parsed Result Box */}
        {driveUrlInput.trim() && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center space-x-1">
                {parsed.type === 'doc' && <FileText className="w-4 h-4 text-indigo-600" />}
                {parsed.type === 'slide' && <Presentation className="w-4 h-4 text-amber-600" />}
                {parsed.type === 'video' && <Film className="w-4 h-4 text-rose-600" />}
                {parsed.type === 'pdf' && <HardDrive className="w-4 h-4 text-indigo-600" />}
                <span>Status: {parsed.isDrive ? 'Valid Google Drive Link Detected' : 'Standard Link'}</span>
              </span>
              {parsed.fileId && (
                <span className="text-[10px] font-mono bg-slate-200 px-2 py-0.5 rounded text-slate-600">
                  ID: {parsed.fileId}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Embeddable Preview URL</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={parsed.embedUrl}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold flex items-center space-x-1 shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Live iframe preview if parsed */}
            {parsed.isDrive && parsed.embedUrl && (
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                  <Eye className="w-3 h-3 text-indigo-600" />
                  <span>Live Preview</span>
                </p>
                <div className="rounded-xl overflow-hidden aspect-video bg-slate-900 border border-slate-300 relative">
                  <iframe
                    src={parsed.embedUrl}
                    title="Google Drive Live Preview"
                    className="w-full h-full border-0"
                    allow="autoplay"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
          >
            Cancel
          </button>
          {onSelectEmbedUrl && (
            <button
              type="button"
              disabled={!parsed.embedUrl}
              onClick={handleApply}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all disabled:opacity-50"
            >
              Use This Drive Link
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

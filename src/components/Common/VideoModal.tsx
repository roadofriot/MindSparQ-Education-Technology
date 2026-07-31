import React from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';

export const VideoModal: React.FC = () => {
  const { activeVideoUrl, setActiveVideoUrl } = useApp();

  if (!activeVideoUrl) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        
        <button
          onClick={() => setActiveVideoUrl(null)}
          className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-slate-950/80 text-white hover:bg-slate-800 backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={activeVideoUrl}
            title="Mindspack Video Tutorial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

      </div>
    </div>
  );
};

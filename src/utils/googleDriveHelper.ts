/**
 * Google Drive URL Parser & Embed Helper Utility
 * Converts shared Google Drive links, Docs, Slides, and Files into embeddable preview URLs.
 */

export interface ParsedDriveUrl {
  originalUrl: string;
  embedUrl: string;
  fileId: string | null;
  isDrive: boolean;
  type: 'video' | 'pdf' | 'doc' | 'slide' | 'folder' | 'generic';
}

export function parseGoogleDriveUrl(url: string): ParsedDriveUrl {
  if (!url || typeof url !== 'string') {
    return {
      originalUrl: '',
      embedUrl: '',
      fileId: null,
      isDrive: false,
      type: 'generic'
    };
  }

  const cleanUrl = url.trim();

  // Match /file/d/FILE_ID
  const fileIdMatch = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || cleanUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    return {
      originalUrl: cleanUrl,
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      fileId,
      isDrive: true,
      type: 'pdf'
    };
  }

  // Match /document/d/DOC_ID
  const docIdMatch = cleanUrl.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  if (docIdMatch && docIdMatch[1]) {
    const fileId = docIdMatch[1];
    return {
      originalUrl: cleanUrl,
      embedUrl: `https://docs.google.com/document/d/${fileId}/preview`,
      fileId,
      isDrive: true,
      type: 'doc'
    };
  }

  // Match /presentation/d/SLIDE_ID
  const slideIdMatch = cleanUrl.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/);
  if (slideIdMatch && slideIdMatch[1]) {
    const fileId = slideIdMatch[1];
    return {
      originalUrl: cleanUrl,
      embedUrl: `https://docs.google.com/presentation/d/${fileId}/embed`,
      fileId,
      isDrive: true,
      type: 'slide'
    };
  }

  return {
    originalUrl: cleanUrl,
    embedUrl: cleanUrl,
    fileId: null,
    isDrive: cleanUrl.includes('drive.google.com') || cleanUrl.includes('docs.google.com'),
    type: 'generic'
  };
}

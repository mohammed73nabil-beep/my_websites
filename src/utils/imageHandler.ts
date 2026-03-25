const BACKEND_URL = 'http://localhost:5000';

export const getImageUrl = (path: string | undefined | null): string => {
  if (!path) return 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600';
  
  // If it's already a full URL (http:// or https://), return it as is
  if (path.startsWith('http')) {
    return path;
  }
  
  // If it's a relative path starting with /uploads, prepend backend URL
  if (path.startsWith('/uploads')) {
    return `${BACKEND_URL}${path}`;
  }
  
  // For any other case, return as is (could be a local asset or external link)
  return path;
};

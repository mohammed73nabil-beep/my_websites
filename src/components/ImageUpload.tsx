import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, CheckCircle, AlertCircle, X } from 'lucide-react';
import api from '../api';

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  label?: string;
  className?: string;
}

export default function ImageUpload({ onUploadSuccess, label = 'رفع صورة', className = '' }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState(70);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [stats, setStats] = useState<{original: number, new: number} | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setSuccess('');
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('يرجى اختيار ملف صورة صحيح.');
        return;
      }
      setSelectedFile(file);
      const objUrl = URL.createObjectURL(file);
      setPreview(objUrl);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('quality', quality.toString());

    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // the api returns something like { url: '/uploads/...webp', message: '...' }
      // We need absolute URL for the frontend since api base url is configurable, wait, normally absolute is best for saving.
      // Assuming frontend knows the backend domain, but it's better to save relative and let frontend handle it or save absolute.
      // For simplicity, we just save the full Backend URL so images work everywhere: http://localhost:5000/uploads/...
      // the api returns url like `/uploads/123.webp`. We will prefix it with backend URL if needed.
      // Save only the relative path returned by the server (e.g. /uploads/uuid.webp)
      // This satisfies the "save only in database and no duplication" request
      const relativeUrl = res.data.url;
      setSuccess('تم ضغط ورفع الصورة بنجاح!');
      if (res.data.originalSize && res.data.newSize) {
        setStats({ original: res.data.originalSize, new: res.data.newSize });
      }
      onUploadSuccess(relativeUrl);
      // reset after letting user see the stats
      setTimeout(() => {
        setSelectedFile(null);
        setPreview(null);
        setSuccess('');
        setStats(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }, 5000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء الرفع.');
    } finally {
      setUploading(false);
    }
  };

  const cancelUpload = () => {
    setSelectedFile(null);
    setPreview(null);
    setError('');
    setStats(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl p-4 shadow-sm ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <label className="text-sm font-bold text-slate-700">{label}</label>
        {selectedFile && !uploading && !success && (
          <button onClick={cancelUpload} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {!selectedFile ? (
        <div 
          className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="font-bold text-slate-900 text-sm mb-1">اختر صورة من جهازك</p>
          <p className="text-xs text-slate-500">سيتم تحويلها لـ WebP آلياً</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            {preview && (
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{selectedFile.name}</p>
              <p className="text-xs text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>

          {!success && (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-slate-700">دقة التحويل (الجودة)</span>
                  <span className="text-primary font-bold">{quality}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  step="5"
                  value={quality} 
                  onChange={(e) => setQuality(Number(e.target.value))}
                  disabled={uploading}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium px-1">
                  <span>أقل جودة (حجم أصغر)</span>
                  <span>أعلى جودة (حجم أكبر)</span>
                </div>
              </div>

              <button 
                onClick={handleUpload} 
                disabled={uploading}
                className="w-full py-2.5 bg-primary hover:bg-primary-hover disabled:bg-slate-300 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <UploadCloud className="w-5 h-5 animate-bounce" />
                    جاري الرفع والتحويل...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-5 h-5" />
                    تحويل ورفع
                  </>
                )}
              </button>
            </>
          )}

          {error && (
            <div className="bg-rose-50 text-rose-600 font-bold p-3 text-sm rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl mt-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold mb-4">
                <CheckCircle className="w-5 h-5 shrink-0" />
                {success}
              </div>
              
              {stats && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-emerald-100/50 text-center shadow-sm">
                    <p className="text-xs text-slate-500 mb-1">الحجم قبل</p>
                    <p className="font-black text-slate-700">{(stats.original / 1024).toFixed(1)} <span className="text-xs font-normal text-slate-500">KB</span></p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl text-center text-white shadow-md shadow-emerald-500/20">
                    <p className="text-xs text-emerald-50 mb-1">بعد الضغط (WebP)</p>
                    <p className="font-black text-lg">{(stats.new / 1024).toFixed(1)} <span className="text-xs font-normal text-emerald-100">KB</span></p>
                    <div className="mt-1.5 inline-block px-2 py-0.5 bg-emerald-700/30 rounded-full text-[10px] font-bold">
                      🔽 توفير {Math.max(0, Math.round((1 - stats.new / stats.original) * 100))}%
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Save, Trash2, PlusCircle, X, Image, Edit3, Eye, Link as LinkIcon, CheckCircle } from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import api from '../api';
import { useToast } from '../components/Toast';
import ImageUpload from '../components/ImageUpload';

const CATEGORIES = ['متجر إلكتروني', 'موقع شركة', 'وكالة إبداعية', 'مدونة شخصية', 'تطبيق ويب'];
const STATUS_OPTIONS = ['متاح', 'تحت المراجعة', 'مباع'];

export default function EditSite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'gallery'>('details');
  const [newImageUrl, setNewImageUrl] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    category: 'متجر إلكتروني',
    price: '',
    visits: '',
    status: 'متاح',
    features: '',
    gallery: [] as string[],
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        const p = res.data;
        let featuresStr = '';
        if (p.features) {
          if (Array.isArray(p.features)) {
            featuresStr = p.features.join('\n');
          } else if (typeof p.features === 'string') {
            try { const parsed = JSON.parse(p.features); featuresStr = Array.isArray(parsed) ? parsed.join('\n') : p.features; } catch { featuresStr = p.features; }
          }
        }
        let galleryArr: string[] = [];
        if (p.gallery) {
          if (Array.isArray(p.gallery)) {
            galleryArr = p.gallery;
          } else if (typeof p.gallery === 'string') {
            try { const parsed = JSON.parse(p.gallery); galleryArr = Array.isArray(parsed) ? parsed : []; } catch { galleryArr = []; }
          }
        }
        setForm({
          title: p.title || '',
          description: p.description || '',
          image: p.image || '',
          category: p.category || 'متجر إلكتروني',
          price: p.price || '',
          visits: p.visits || '',
          status: p.status || 'متاح',
          features: featuresStr,
          gallery: galleryArr,
        });
      } catch {
        showToast('حدث خطأ في جلب بيانات الموقع', 'error');
        navigate('/dashboard/sites');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProject();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        features: form.features.split('\n').filter(f => f.trim()),
        gallery: form.gallery,
      };
      await api.put(`/projects/${id}`, payload);
      showToast('تم حفظ التعديلات بنجاح! ✅', 'success');
    } catch {
      showToast('حدث خطأ أثناء الحفظ', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('هل أنت متأكد من حذف هذا الموقع نهائياً؟')) return;
    try {
      await api.delete(`/projects/${id}`);
      showToast('تم حذف الموقع', 'success');
      navigate('/dashboard/sites');
    } catch {
      showToast('حدث خطأ أثناء الحذف', 'error');
    }
  };

  const addGalleryImage = (url: string) => {
    if (!url.trim()) return;
    setForm(prev => ({ ...prev, gallery: [...prev.gallery, url.trim()] }));
  };

  const removeGalleryImage = (index: number) => {
    setForm(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }));
  };

  const statusColor: Record<string, string> = {
    'متاح': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'تحت المراجعة': 'bg-amber-100 text-amber-700 border-amber-200',
    'مباع': 'bg-slate-100 text-slate-600 border-slate-200',
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="h-10 bg-slate-200 rounded-xl w-48 animate-pulse" />
          <div className="h-64 bg-slate-200 rounded-2xl animate-pulse" />
          <div className="h-48 bg-slate-200 rounded-2xl animate-pulse" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/sites')} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500">
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-900">{form.title || 'تفاصيل الموقع'}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusColor[form.status] || ''}`}>
                {form.status}
              </span>
              <span className="text-sm text-slate-400">{form.category}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => window.open(`/project/${id}`, '_blank')} className="flex items-center gap-2 px-4 py-2.5 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors">
            <Eye className="w-4 h-4" />
            معاينة
          </button>
          <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2.5 border-2 border-rose-200 text-rose-600 rounded-xl font-bold hover:bg-rose-50 transition-colors">
            <Trash2 className="w-4 h-4" />
            حذف
          </button>
        </div>
      </div>

      {/* Cover image preview */}
      {form.image && (
        <div className="h-48 sm:h-64 rounded-2xl overflow-hidden mb-8 relative group">
          <img src={form.image} alt={form.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-bold text-slate-700">صورة الغلاف</span>
          </div>
          <button 
            type="button"
            onClick={() => setForm({...form, image: ''})}
            className="absolute top-4 left-4 p-2 bg-white/90 hover:bg-rose-50 hover:text-rose-600 text-slate-700 rounded-xl transition-colors shadow-lg font-bold text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
            إزالة الغلاف
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit mb-8">
        <button
          onClick={() => setActiveTab('details')}
          className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-colors ${activeTab === 'details' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Edit3 className="w-4 h-4 inline-block ml-1.5" />
          البيانات الأساسية
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-colors ${activeTab === 'gallery' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Image className="w-4 h-4 inline-block ml-1.5" />
          معرض الصور ({form.gallery.length})
        </button>
      </div>

      <form onSubmit={handleSave}>
        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
              <h3 className="text-lg font-bold text-slate-900 mb-2">المعلومات الأساسية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">اسم الموقع *</label>
                  <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">الفئة</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary outline-none transition-all">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">وصف الموقع</label>
                <textarea rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">صورة الغلاف</label>
                {!form.image ? (
                  <ImageUpload 
                    label="رفع غلاف الموقع (WebP)" 
                    onUploadSuccess={(url) => setForm({...form, image: url})} 
                  />
                ) : (
                  <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl font-bold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    يوجد صورة غلاف مرفوعة بالفعل. لإضافة صورة أخرى، قم بإزالة القديمة أولاً من المعاينة في الأعلى.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
              <h3 className="text-lg font-bold text-slate-900 mb-2">التسعير والإحصائيات</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">السعر</label>
                  <input value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                    placeholder="$5,000"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">الزيارات الشهرية</label>
                  <input value={form.visits} onChange={e => setForm({...form, visits: e.target.value})}
                    placeholder="10K"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">الحالة</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary outline-none transition-all">
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">المميزات</h3>
              <textarea rows={5} value={form.features} onChange={e => setForm({...form, features: e.target.value})}
                placeholder={"تصميم متجاوب بالكامل\nلوحة تحكم احترافية\nدعم فني على مدار الساعة"}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" />
              <p className="text-xs text-slate-400 mt-2">اكتب كل ميزة في سطر منفصل</p>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {/* Add new image */}
            <ImageUpload 
              label="رفع صورة للمعرض" 
              onUploadSuccess={addGalleryImage} 
              className="mb-6"
            />

            {/* Gallery grid */}
            {form.gallery.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                <Image className="w-14 h-14 text-slate-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-400 mb-1">لا توجد صور في المعرض</h3>
                <p className="text-sm text-slate-400">أضف صوراً لعرضها في صفحة تفاصيل الموقع</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {form.gallery.map((img, index) => (
                  <div key={index} className="relative group rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                    <div className="h-48">
                      <img src={img} alt={`صورة ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="opacity-0 group-hover:opacity-100 p-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-all duration-200 shadow-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                      {index + 1} / {form.gallery.length}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Save button — sticky at the bottom */}
        <div className="sticky bottom-0 bg-slate-50/80 backdrop-blur-md py-4 mt-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 hidden sm:block">
              جميع التعديلات ستُحفظ في قاعدة البيانات فوراً.
            </p>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-colors disabled:opacity-60 shadow-lg shadow-primary/25"
            >
              <Save className="w-5 h-5" />
              {saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </button>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}

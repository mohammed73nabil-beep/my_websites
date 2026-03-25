import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, PlusCircle, X, Globe, Edit3 } from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import api from '../api';
import { useToast } from '../components/Toast';
import ImageUpload from '../components/ImageUpload';

const CATEGORIES = ['متجر إلكتروني', 'موقع شركة', 'وكالة إبداعية', 'مدونة شخصية', 'تطبيق ويب'];
const STATUS_OPTIONS = ['متاح', 'تحت المراجعة', 'مباع'];

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: string;
  visits: string;
  status: string;
  features?: string[] | string;
}

interface FormData {
  title: string;
  description: string;
  image: string;
  category: string;
  price: string;
  visits: string;
  status: string;
  features: string;
  gallery: string[];
}

const emptyForm: FormData = {
  title: '',
  description: '',
  image: '',
  category: 'متجر إلكتروني',
  price: '',
  visits: '',
  status: 'متاح',
  features: '',
  gallery: [],
};

export default function MySites() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch {
      showToast('حدث خطأ في جلب المواقع', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const openAddModal = () => {
    setForm(emptyForm);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(emptyForm);
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!confirm('هل أنت متأكد من حذف هذا الموقع؟')) return;
    try {
      await api.delete(`/projects/${id}`);
      showToast('تم حذف الموقع بنجاح', 'success');
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch {
      showToast('حدث خطأ أثناء الحذف', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        features: form.features.split('\n').filter(f => f.trim()),
        gallery: form.gallery.length > 0 ? form.gallery : (form.image ? [form.image] : []),
      };

      await api.post('/projects', payload);
      showToast('تم إضافة الموقع بنجاح! 🎉', 'success');
      closeModal();
      fetchProjects();
    } catch {
      showToast('حدث خطأ أثناء الإضافة', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const statusColor: Record<string, string> = {
    'متاح': 'bg-emerald-100 text-emerald-700',
    'تحت المراجعة': 'bg-amber-100 text-amber-700',
    'مباع': 'bg-slate-100 text-slate-600',
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-slate-900">مواقعي</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-colors shadow-md shadow-primary/20"
        >
          <PlusCircle className="w-5 h-5" />
          إضافة موقع جديد
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 h-52 animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-slate-200">
          <Globe className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-500 mb-2">لا توجد مواقع بعد</h3>
          <p className="text-slate-400 mb-6">ابدأ بإضافة موقعك الأول</p>
          <button onClick={openAddModal} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors">
            إضافة موقع
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(site => (
            <div
              key={site.id}
              onClick={() => navigate(`/dashboard/sites/${site.id}`)}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="h-40 overflow-hidden relative">
                <img
                  src={site.image || 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600'}
                  alt={site.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColor[site.status] || 'bg-slate-100 text-slate-600'}`}>
                    {site.status}
                  </span>
                </div>
                {/* Edit overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 text-slate-900 font-bold text-sm shadow-lg">
                    <Edit3 className="w-4 h-4" />
                    اضغط للتعديل
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 truncate mb-1">{site.title}</h3>
                    <p className="text-sm text-slate-500">{site.category}</p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, site.id)}
                    className="ml-2 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <span className="font-black text-primary">{site.price}</span>
                  <span className="text-sm text-slate-400">{site.visits} زيارة/شهر</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Site Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900">إضافة موقع جديد</h2>
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">اسم الموقع *</label>
                  <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                    placeholder="مثال: متجر العطور الفاخر"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">الفئة *</label>
                  <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary outline-none transition-all">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">وصف الموقع *</label>
                <textarea required rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  placeholder="اكتب وصفاً موجزاً للموقع..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">صورة الغلاف</label>
                <ImageUpload 
                  label="رفع صورة الغلاف" 
                  onUploadSuccess={(url) => setForm({...form, image: url})} 
                />
                {form.image && (
                  <div className="mt-3 h-32 rounded-xl overflow-hidden border border-slate-200 relative group">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                    <button 
                      type="button" 
                      onClick={() => setForm({...form, image: ''})}
                      className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white text-rose-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">السعر *</label>
                  <input required value={form.price} onChange={e => setForm({...form, price: e.target.value})}
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

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">المميزات (كل ميزة في سطر)</label>
                <textarea rows={3} value={form.features} onChange={e => setForm({...form, features: e.target.value})}
                  placeholder={"تصميم متجاوب\nلوحة تحكم احترافية\nدعم تقني"}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">معرض الصور (روابط الصور - كل رابط في سطر)</label>
                <textarea rows={3} value={form.gallery.join('\n')} 
                  onChange={e => setForm({...form, gallery: e.target.value.split('\n').filter(link => link.trim())})}
                  placeholder={"https://example.com/img1.jpg\nhttps://example.com/img2.jpg"}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" />
                <p className="text-xs text-slate-400 mt-2">يمكنك إضافة عدة صور لعرضها في تفاصيل الموقع</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal}
                  className="flex-1 py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                  إلغاء
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-colors disabled:opacity-60 shadow-lg shadow-primary/25">
                  {submitting ? 'جاري الإضافة...' : 'إضافة الموقع 🚀'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

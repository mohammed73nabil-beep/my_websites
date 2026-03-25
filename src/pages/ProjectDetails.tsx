import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, CheckCircle2, MonitorSmartphone, Zap, ShieldCheck, Mail } from 'lucide-react';
import api from '../api';
import Lightbox from '../components/Lightbox';

// MOCK_PROJECT removed

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImgIndex(index);
    setShowLightbox(true);
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">جاري التحميل...</div>;
  }

  if (!project) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">المشروع غير موجود</div>;
  }

  return (
    <div className="bg-black min-h-screen pt-24 pb-24">
      {/* Hero Image */}
      <div className="w-full h-[50vh] md:h-[70vh] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/marketplace" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              العودة للكتالوج
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                {project.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">{project.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-amber-500 rounded-full"></span>
                نظرة عامة
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed font-light">
                {project.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-amber-500 rounded-full"></span>
                المميزات الرئيسية
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/5 border border-white/10 p-5 rounded-2xl hover:border-amber-500/30 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-amber-500 rounded-full"></span>
                معرض الصور
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Array.isArray(project.gallery) && project.gallery.map((img: string, idx: number) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => openLightbox(idx)}
                    className="rounded-3xl overflow-hidden border border-white/10 aspect-video group cursor-pointer relative shadow-lg shadow-black/20"
                  >
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-100" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-amber-500/20 backdrop-blur-md border border-amber-500/40 p-3 rounded-full text-amber-500 scale-50 group-hover:scale-100 transition-transform duration-500">
                        <Sparkles className="w-6 h-6" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(245,158,11,0.05)]">
              <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">هل أعجبك هذا النموذج؟</h3>
              <p className="text-slate-400 font-light mb-8 leading-relaxed">
                تواصل معنا الآن لطلب هذا النموذج وتخصيصه ليتناسب تماماً مع هويتك البصرية واحتياجات عملك.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-amber-500">
                    <MonitorSmartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">تخصيص كامل</div>
                    <div className="text-sm font-light text-slate-400">نطابق هويتك البصرية</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-amber-500">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">إطلاق سريع</div>
                    <div className="text-sm font-light text-slate-400">جاهز للعمل في أيام</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-amber-500">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">دعم فني</div>
                    <div className="text-sm font-light text-slate-400">متواجدون دائماً لمساعدتك</div>
                  </div>
                </div>
              </div>

              <a 
                href={`mailto:contact@luxeweb.com?subject=طلب نموذج: ${project.title}`}
                className="w-full h-14 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-3 hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                اطلب هذا النموذج
              </a>
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {showLightbox && (
          <Lightbox 
            images={project.gallery} 
            initialIndex={currentImgIndex} 
            onClose={() => setShowLightbox(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

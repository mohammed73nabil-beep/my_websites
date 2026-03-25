import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Sparkles, MonitorSmartphone, Zap, ShieldCheck } from 'lucide-react';
import ProjectCard, { ProjectData } from '../components/ProjectCard';
import DynamicHero from '../components/DynamicHero';
import { motion } from 'framer-motion';

const FEATURED_PROJECTS: ProjectData[] = [
  {
    id: '1',
    title: 'أورا - متجر إلكتروني فاخر',
    description: 'نموذج متجر إلكتروني مصمم خصيصاً للعلامات التجارية الفاخرة، العطور، والمجوهرات. يتميز بتجربة مستخدم سلسة وتصميم يعكس الرقي.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000',
    category: 'متجر إلكتروني',
    features: ['تصميم متجاوب بالكامل', 'لوحة تحكم احترافية', 'نظام سلة مشتريات متقدم']
  },
  {
    id: '2',
    title: 'إيليت - موقع شركة عقارية',
    description: 'واجهة رقمية فخمة للشركات العقارية لعرض العقارات الفاخرة والمشاريع الحصرية بطريقة بصرية مذهلة.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000',
    category: 'موقع شركة',
    features: ['معرض صور عالي الدقة', 'نظام فلترة للعقارات', 'نموذج حجز استشارة']
  },
  {
    id: '3',
    title: 'نوفا - منصة أعمال تقنية',
    description: 'تصميم مستقبلي أنيق للشركات التقنية والوكالات الإبداعية، يبرز الخدمات والمنتجات بأسلوب عصري وجذاب.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
    category: 'وكالة إبداعية',
    features: ['تأثيرات حركية سلسة', 'دعم الوضع الليلي', 'سرعة تحميل فائقة']
  }
];

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Awesome Background */}
        <DynamicHero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-32 pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm font-medium tracking-wider mb-8 backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              <span>التميز في العالم الرقمي</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight">
             أبني موقعك <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                لنشر
              </span> عملك الآن
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              نقدم لك تشكيلة حصرية من المواقع والمتاجر الإلكترونية الجاهزة، مصممة بأعلى معايير الجودة والأناقة لتنطلق بأعمالك فوراً دون انتظار.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/marketplace" className="w-full sm:w-auto px-10 py-4 bg-amber-500 hover:bg-amber-400 text-black rounded-full font-bold text-lg transition-all shadow-[0_0_40px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 hover:scale-105">
                استعرض الكتالوج
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <a href="mailto:contact@luxeweb.com" className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-bold text-lg transition-all backdrop-blur-md flex items-center justify-center hover:border-amber-500/50">
                تواصل معنا
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#050505] border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-x-reverse divide-white/5">
            <div className="px-4">
              <div className="text-4xl md:text-5xl font-black text-amber-500 mb-2">100%</div>
              <div className="text-slate-400 font-medium tracking-wide">تصاميم حصرية</div>
            </div>
            <div className="px-4">
              <div className="text-4xl md:text-5xl font-black text-amber-500 mb-2">24h</div>
              <div className="text-slate-400 font-medium tracking-wide">سرعة الإطلاق</div>
            </div>
            <div className="px-4">
              <div className="text-4xl md:text-5xl font-black text-amber-500 mb-2">SEO</div>
              <div className="text-slate-400 font-medium tracking-wide">محسنة لمحركات البحث</div>
            </div>
            <div className="px-4">
              <div className="text-4xl md:text-5xl font-black text-amber-500 mb-2">VIP</div>
              <div className="text-slate-400 font-medium tracking-wide">دعم فني مخصص</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-32 bg-black relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-64 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">أحدث النماذج <span className="text-amber-500">الفاخرة</span></h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                اكتشف مجموعة منتقاة من أفضل المشاريع الرقمية المصممة بعناية فائقة لتلبي تطلعات العلامات التجارية الراقية.
              </p>
            </div>
            <Link to="/marketplace" className="inline-flex items-center gap-2 text-amber-500 font-bold hover:text-amber-400 transition-colors pb-2 border-b border-amber-500/30 hover:border-amber-400">
              عرض الكتالوج كاملاً
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PROJECTS.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">لماذا تختار <br/><span className="text-amber-500">حلولنا الجاهزة؟</span></h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed font-light">
                نحن نوفر لك الوقت والجهد من خلال تقديم مواقع وتطبيقات جاهزة للاستخدام، مصممة بأحدث التقنيات وأفضل معايير تجربة المستخدم لضمان نجاحك الرقمي.
              </p>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-white/5 text-amber-500 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                    <MonitorSmartphone className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">تصاميم استثنائية</h3>
                    <p className="text-slate-400 leading-relaxed font-light">جميع النماذج مبنية بأكواد نظيفة وتصاميم عصرية تتجاوب مع كافة الأجهزة لضمان أفضل انطباع لعملائك.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-white/5 text-amber-500 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">إطلاق فوري</h3>
                    <p className="text-slate-400 leading-relaxed font-light">بمجرد اختيارك للنموذج المناسب، نقوم بتجهيزه وربطه بنطاقك الخاص في وقت قياسي لتبدأ عملك فوراً.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-white/5 text-amber-500 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">دعم وتخصيص مستمر</h3>
                    <p className="text-slate-400 leading-relaxed font-light">نقدم خدمات التخصيص لتلائم هويتك البصرية بدقة، مع دعم فني مستمر لضمان استقرار وأمان موقعك.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-[3rem] transform translate-x-6 translate-y-6"></div>
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Luxury Office" 
                  className="w-full h-[700px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000" 
            alt="Abstract Luxury" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-8" />
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">جاهز للارتقاء <br/>بأعمالك الرقمية؟</h2>
          <p className="text-xl text-slate-400 mb-12 font-light max-w-2xl mx-auto">
            تصفح الكتالوج الخاص بنا واختر التصميم الذي يعكس فخامة علامتك التجارية ويناسب طموحاتك.
          </p>
          <Link to="/marketplace" className="inline-flex items-center gap-3 px-12 py-5 bg-amber-500 text-black rounded-full font-bold text-xl hover:bg-amber-400 transition-all shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:scale-105">
            استعرض النماذج الآن
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}

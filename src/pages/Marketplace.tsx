import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';
import ProjectCard, { ProjectData } from '../components/ProjectCard';
import { ProjectCardSkeleton } from '../components/Skeleton';
import api from '../api';

const CATEGORIES = ['الكل', 'متجر إلكتروني', 'موقع شركة', 'وكالة إبداعية', 'مدونة شخصية', 'تطبيق ويب'];

// MOCK_PROJECTS removed
export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-black min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm font-medium tracking-wider mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>الكتالوج الحصري</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">النماذج <span className="text-amber-500">الفاخرة</span></h1>
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            استعرض مجموعتنا المختارة من المواقع والتطبيقات الجاهزة، المصممة بأعلى معايير الجودة لتناسب تطلعاتك.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="ابحث في الكتالوج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pr-12 pl-4 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar">
            <Filter className="w-5 h-5 text-amber-500 ml-2 shrink-0" />
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setLoading(true);
                  setTimeout(() => setLoading(false), 600);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-black border-amber-500'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:border-amber-500/30 hover:text-amber-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)
          ) : (
            filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-32 bg-white/5 rounded-3xl border border-white/10">
            <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">لا توجد نتائج</h3>
            <p className="text-slate-400 font-light">لم نتمكن من العثور على نماذج تطابق بحثك.</p>
          </div>
        )}
      </div>
    </div>
  );
}

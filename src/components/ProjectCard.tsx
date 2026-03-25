import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpLeft, Sparkles, CheckCircle2 } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  features: string[];
}

const ProjectCard: React.FC<{ project: ProjectData }> = ({ project }) => {
  return (
    <div className="bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden hover:border-amber-500/30 transition-all duration-500 group flex flex-col h-full hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]">
      <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-40"></div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-black/50 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1 relative z-20 -mt-6">
        <h3 className="font-bold text-xl text-white mb-3 line-clamp-1 group-hover:text-amber-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-sm line-clamp-2 mb-6 font-light leading-relaxed flex-1">
          {project.description}
        </p>
        
        <div className="space-y-2 mb-8">
          {project.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-auto pt-4 border-t border-white/10">
          <Link 
            to={`/project/${project.id}`}
            className="w-full h-12 rounded-xl bg-white/5 hover:bg-amber-500 text-white hover:text-black font-medium flex items-center justify-center gap-2 transition-all duration-300 border border-white/10 hover:border-amber-500"
          >
            <span>معاينة النموذج</span>
            <ArrowUpLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

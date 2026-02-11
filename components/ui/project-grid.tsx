"use client"; 

import { useState, useEffect } from "react";
import { Folder, ExternalLink, Github, X } from "lucide-react";

// Define the shape of our Database Data
type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  link: string | null;
  github?: string | null;
};

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  return (
    <>
      {/* --- PROJECTS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="group relative bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-8 hover:border-neutral-700 transition-all duration-300 overflow-hidden"
          >
            {/* Top Row: Icon and Number */}
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800 group-hover:border-red-900/50 group-hover:bg-red-900/10 transition-colors">
                <Folder className="w-6 h-6 text-red-500" />
              </div>

              {/* Index Number */}
              <span className="text-6xl font-bold text-neutral-800 select-none opacity-50 font-mono">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Content */}
            <h2 className="text-2xl font-bold text-gray-100 mb-3 group-hover:text-white transition-colors">
              {project.title}
            </h2>
            
            <p className="text-gray-400 mb-12 leading-relaxed text-sm md:text-base line-clamp-3">
              {project.description}
            </p>

            {/* Tags Footer */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-[#151515] border border-neutral-800 rounded-full text-xs font-medium text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* --- SLIDE UP ACTION BAR (Hover Effect) --- */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black via-neutral-900 to-transparent flex items-end justify-center pb-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
               <button 
                  onClick={() => setSelectedProject(project)}
                  className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-neutral-200 transition active:scale-95 flex items-center gap-2 shadow-lg shadow-white/10"
               >
                  View Details
                  <ExternalLink className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL WINDOW --- */}
      {selectedProject && (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
        >
            <div 
                className="bg-[#0f0f0f] border border-neutral-700 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()} 
            >
                {/* Modal Header */}
                <div className="p-8 border-b border-neutral-800 flex justify-between items-start bg-[#0A0A0A]">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                        <span className="text-red-500 font-medium tracking-wide text-sm uppercase">
                          {selectedProject.category}
                        </span>
                    </div>
                    <button 
                        onClick={() => setSelectedProject(null)}
                        className="p-2 hover:bg-neutral-800 rounded-full transition text-gray-400 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Scrollable Content */}
                <div className="p-8 overflow-y-auto">
                    {/* Image (If exists) */}
                    {selectedProject.image && (
                      <div className="mb-8 rounded-2xl overflow-hidden border border-neutral-800">
                        <img 
                          src={selectedProject.image} 
                          alt={selectedProject.title} 
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}

                    <h3 className="text-lg font-semibold text-gray-200 mb-3">Project Overview</h3>
                    <p className="text-gray-400 leading-relaxed mb-8 whitespace-pre-wrap">
                        {selectedProject.description}
                    </p>

                    <h3 className="text-lg font-semibold text-gray-200 mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {selectedProject.tags.map(tag => (
                            <span key={tag} className="text-xs font-mono text-red-400 bg-red-950/30 px-3 py-1.5 rounded border border-red-900/30">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                        {selectedProject.link && (
                          <a 
                              href={selectedProject.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex-1 bg-white text-black text-center py-3 rounded-xl font-bold hover:bg-neutral-200 transition flex items-center justify-center gap-2"
                          >
                              Visit Live Site <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {selectedProject.github && (
                          <a 
                              href={selectedProject.github}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex-1 bg-neutral-800 text-white text-center py-3 rounded-xl font-bold border border-neutral-700 hover:bg-neutral-700 transition flex items-center justify-center gap-2"
                          >
                              View Code <Github className="w-4 h-4" />
                          </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
}
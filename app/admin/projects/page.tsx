import React from 'react';
import { PrismaClient } from '@prisma/client';
import { deleteProject } from '@/lib/action'; // Make sure this matches your filename (action vs actions)
import { Plus, Trash2, ExternalLink, Edit2, Folder } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

// This is an async Server Component
export default async function AdminProjects() {
  // 1. FETCH REAL DATA from your Supabase DB
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc', // Show newest first
    },
  });

  return (
    <div className="space-y-8">
      
      {/* --- Header --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Projects</h1>
          <p className="text-neutral-400 text-sm">Manage your portfolio showcase.</p>
        </div>
        <Link 
          href="/admin/projects/new" 
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-red-900/20"
        >
          <Plus size={18} />
          Add Project
        </Link>
      </div>

      {/* --- Projects List --- */}
      {projects.length === 0 ? (
        // Empty State
        <div className="text-center py-20 border border-dashed border-neutral-800 rounded-3xl bg-[#0A0A0A]">
          <Folder className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white">No projects yet</h3>
          <p className="text-neutral-400">Add your first project to get started.</p>
        </div>
      ) : (
        // Data Table
        <div className="bg-[#0A0A0A] border border-neutral-800 rounded-3xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 text-sm uppercase tracking-wider">
                <th className="p-6 font-medium">Project Name</th>
                <th className="p-6 font-medium">Category</th>
                <th className="p-6 font-medium">Link</th>
                <th className="p-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-white">
              {projects.map((project) => (
                <tr key={project.id} className="group hover:bg-white/5 transition-colors">
                  
                  {/* Title & Image */}
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      {project.image && (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-10 h-10 rounded-lg object-cover border border-neutral-700" 
                        />
                      )}
                      <span className="font-medium text-lg">{project.title}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-6">
                    <span className="px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-bold uppercase">
                      {project.category}
                    </span>
                  </td>

                  {/* Status / Link */}
                  <td className="p-6">
                     {project.link ? (
                        <a href={project.link} target="_blank" className="text-green-400 text-xs font-bold uppercase flex items-center gap-1 hover:underline">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Live
                        </a>
                     ) : (
                        <span className="text-neutral-500 text-xs font-bold uppercase flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-neutral-600"></span> No Link
                        </span>
                     )}
                  </td>

                  {/* Actions (Delete Works Now!) */}
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                      
                      {/* View Button */}
                      {project.link && (
                        <a href={project.link} target="_blank" className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors">
                            <ExternalLink size={18} />
                        </a>
                      )}

                      {/* Delete Form */}
                      <form action={deleteProject.bind(null, project.id)}>
                        <button type="submit" className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors">
                           <Trash2 size={18} />
                        </button>
                      </form>
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
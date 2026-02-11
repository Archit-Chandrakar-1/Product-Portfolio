"use client";

import React from 'react';
import { createProject } from '@/lib/action';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function AddProjectPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/projects" className="p-2 hover:bg-white/10 rounded-full transition">
          <ArrowLeft className="text-white" />
        </Link>
        <h1 className="text-3xl font-bold text-white">Add New Project</h1>
      </div>

      {/* The Form */}
      <form action={createProject} className="space-y-6 bg-[#0A0A0A] p-8 rounded-3xl border border-neutral-800">
        
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400">Project Title</label>
          <input 
            name="title"
            required
            type="text" 
            placeholder="e.g. MATS University Portal" 
            className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400">Category</label>
          <select 
            name="category"
            className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors"
          >
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="AI / ML">AI / ML</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400">Description</label>
          <textarea 
            name="description"
            required
            rows={4}
            placeholder="What did you build?" 
            className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400">Image URL</label>
          <input 
            name="image"
            required
            type="url" 
            placeholder="https://..." 
            className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors"
          />
          <p className="text-xs text-neutral-600">Paste a link to an image for now.</p>
        </div>

        {/* Project Link */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400">Project Link</label>
          <input 
            name="link"
            type="url" 
            placeholder="https://mysite.com" 
            className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <Save size={20} />
          Save Project
        </button>

      </form>
    </div>
  );
}
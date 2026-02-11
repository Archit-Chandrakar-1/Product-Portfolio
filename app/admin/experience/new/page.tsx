"use client";

import React from 'react';
import { createExperience } from '@/lib/action'; // Ensure filename matches (action vs actions)
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function AddExperiencePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      
      <div className="flex items-center gap-4">
        <Link href="/admin/experience" className="p-2 hover:bg-white/10 rounded-full transition">
          <ArrowLeft className="text-white" />
        </Link>
        <h1 className="text-3xl font-bold text-white">Add Experience</h1>
      </div>

      <form action={createExperience} className="space-y-6 bg-[#0A0A0A] p-8 rounded-3xl border border-neutral-800">
        
        {/* Company & Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">Company Name</label>
                <input name="company" required type="text" placeholder="e.g. Google" 
                    className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">Job Role</label>
                <input name="role" required type="text" placeholder="e.g. Senior Engineer" 
                    className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
            </div>
        </div>

        {/* Location & Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">Location</label>
                <input name="location" required type="text" placeholder="Remote / NY" 
                    className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">Start Date</label>
                <input name="startDate" required type="text" placeholder="Jan 2023" 
                    className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">End Date</label>
                <input name="endDate" required type="text" placeholder="Present" 
                    className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
            </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400">Short Description</label>
          <textarea name="description" required rows={3} placeholder="Brief summary of your role..." 
            className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400">Key Highlights (One per line)</label>
          <textarea name="highlights" required rows={5} placeholder="• Built a scalable API&#10;• Reduced server costs by 20%&#10;• Led a team of 5 devs" 
            className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
          <p className="text-xs text-neutral-500">Press Enter to create a new bullet point.</p>
        </div>

        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
          <Save size={20} /> Save Experience
        </button>

      </form>
    </div>
  );
}
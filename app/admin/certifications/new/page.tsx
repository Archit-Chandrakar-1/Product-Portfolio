"use client";

import React from 'react';
import { createCertification } from '@/lib/action'; // Check your filename (action vs actions)
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function AddCertificationPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/certifications" className="p-2 hover:bg-white/10 rounded-full transition">
          <ArrowLeft className="text-white" />
        </Link>
        <h1 className="text-3xl font-bold text-white">Add Certification</h1>
      </div>

      <form action={createCertification} className="space-y-6 bg-[#0A0A0A] p-8 rounded-3xl border border-neutral-800">
        
        <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Certification Name</label>
            <input name="name" required type="text" placeholder="e.g. AWS Certified Solutions Architect" 
                className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">Issuing Organization</label>
                <input name="issuer" required type="text" placeholder="e.g. Amazon Web Services" 
                    className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">Date Issued</label>
                <input name="date" required type="text" placeholder="Dec 2025" 
                    className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Credential Link (URL)</label>
            <input name="link" type="url" placeholder="https://..." 
                className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Issuer Logo URL</label>
            <input name="image" type="url" placeholder="https://..." 
                className="w-full bg-[#151515] border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors" />
        </div>

        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
          <Save size={20} /> Save Certification
        </button>

      </form>
    </div>
  );
}
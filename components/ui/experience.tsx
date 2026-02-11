"use client";

import React from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
};

export default function ExperienceSection({ data }: { data: Experience[] }) {
  // 1. SAFETY CHECK: If data is missing or empty, show nothing or a fallback
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-neutral-500 py-10">
        <p>No experience added yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* 2. SAFE MAPPING: Now we know 'data' exists */}
      {data.map((exp) => (
        <div 
            key={exp.id} 
            className="group relative border-l-2 border-neutral-800 pl-8 md:pl-12 py-2 hover:border-red-600 transition-colors duration-500"
        >
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-neutral-800 border-2 border-black group-hover:bg-red-600 group-hover:scale-125 transition-all duration-500 shadow-[0_0_0_4px_rgba(0,0,0,1)]"></div>

            {/* Content Card */}
            <div className="relative">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-red-500 transition-colors">
                        {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-mono text-neutral-500 bg-neutral-900/50 px-3 py-1 rounded-full border border-neutral-800">
                        <Calendar size={14} />
                        {exp.startDate} — {exp.endDate}
                    </div>
                </div>

                {/* Sub-Header */}
                <div className="flex items-center gap-4 text-lg text-neutral-300 mb-6 font-medium">
                    <span className="flex items-center gap-2">
                        <Briefcase size={16} className="text-red-600" />
                        {exp.company}
                    </span>
                    <span className="text-neutral-700">•</span>
                    <span className="flex items-center gap-2 text-neutral-500 text-sm">
                        <MapPin size={14} />
                        {exp.location}
                    </span>
                </div>

                {/* Description */}
                <p className="text-neutral-400 leading-relaxed mb-6 max-w-2xl">
                    {exp.description}
                </p>

                {/* Highlights (Bullet Points) */}
                <ul className="space-y-2">
                    {/* Safety check for highlights array too */}
                    {exp.highlights && exp.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm md:text-base">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0"></span>
                            <span className="opacity-80 group-hover:opacity-100 transition-opacity">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      ))}
    </div>
  );
}
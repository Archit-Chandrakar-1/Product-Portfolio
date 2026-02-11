"use client";

import React from 'react';
import { ExternalLink, Award } from 'lucide-react';

type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string | null;
  image: string | null;
};

export default function CertificationList({ data }: { data: Certification[] }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6 lg:px-8">
      {data.map((cert) => (
        <div 
            key={cert.id} 
            className="group relative bg-[#0f0f0f] border border-neutral-800 p-6 rounded-2xl hover:border-red-900/50 hover:bg-gradient-to-br hover:from-[#0f0f0f] hover:to-red-900/10 transition-all duration-500"
        >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-red-600/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    {cert.image ? (
                        <img src={cert.image} alt={cert.issuer} className="w-10 h-10 object-contain" />
                    ) : (
                        <Award className="w-10 h-10 text-neutral-600 group-hover:text-red-500 transition-colors" />
                    )}
                    <span className="text-xs font-mono text-neutral-500 border border-neutral-800 px-2 py-1 rounded-md">
                        {cert.date}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors">
                    {cert.name}
                </h3>
                <p className="text-sm text-neutral-400 mb-6">{cert.issuer}</p>

                {/* Footer Link */}
                <div className="mt-auto pt-4 border-t border-neutral-800/50">
                    {cert.link ? (
                        <a 
                            href={cert.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-white hover:gap-3 transition-all"
                        >
                            Verify Credential <ExternalLink size={14} className="text-red-500" />
                        </a>
                    ) : (
                        <span className="text-sm text-neutral-600 cursor-not-allowed">Credential ID Protected</span>
                    )}
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}
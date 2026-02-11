import React from 'react';
import { PrismaClient } from '@prisma/client';
import { deleteCertification } from '@/lib/action';
import { Plus, Trash2, Award, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function AdminCertifications() {
  const certs = await prisma.certification.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Certifications</h1>
        <Link href="/admin/certifications/new" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full flex gap-2 items-center transition-all">
          <Plus size={18} /> Add New
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((cert) => (
          <div key={cert.id} className="bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-6 relative group hover:border-neutral-600 transition-all">
             
             {/* Delete Button (Top Right) */}
             <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <form action={deleteCertification.bind(null, cert.id)}>
                    <button className="p-2 bg-red-900/20 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-colors">
                        <Trash2 size={16} />
                    </button>
                </form>
             </div>

             <div className="flex items-start gap-4 mb-4">
                {cert.image ? (
                    <img src={cert.image} alt={cert.issuer} className="w-12 h-12 rounded-lg object-contain bg-white/5 p-1" />
                ) : (
                    <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center text-yellow-500">
                        <Award size={24} />
                    </div>
                )}
                <div>
                    <h3 className="font-bold text-white leading-tight">{cert.name}</h3>
                    <p className="text-sm text-neutral-500">{cert.issuer}</p>
                </div>
             </div>

             <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-800">
                <span className="text-xs font-mono text-neutral-500">{cert.date}</span>
                {cert.link && (
                    <a href={cert.link} target="_blank" className="flex items-center gap-1 text-xs font-bold text-white hover:text-red-500 transition-colors">
                        View Credential <ExternalLink size={12} />
                    </a>
                )}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
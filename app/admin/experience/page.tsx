import React from 'react';
import { PrismaClient } from '@prisma/client';
import { deleteExperience } from '@/lib/action';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function AdminExperience() {
  const experiences = await prisma.experience.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Experience</h1>
        <Link href="/admin/experience/new" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full flex gap-2 items-center transition-all">
          <Plus size={18} /> Add Role
        </Link>
      </div>

      <div className="bg-[#0A0A0A] border border-neutral-800 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-neutral-800 text-neutral-400 text-sm uppercase">
            <tr>
              <th className="p-6">Role & Company</th>
              <th className="p-6">Timeline</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800 text-white">
            {experiences.map((exp) => (
              <tr key={exp.id} className="hover:bg-white/5 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-neutral-800 rounded-lg text-red-400">
                        <Briefcase size={20} />
                    </div>
                    <div>
                        <div className="font-bold text-lg">{exp.role}</div>
                        <div className="text-neutral-400 text-sm">{exp.company} • {exp.location}</div>
                    </div>
                  </div>
                </td>
                <td className="p-6 text-neutral-400 font-mono text-sm">
                  {exp.startDate} - {exp.endDate}
                </td>
                <td className="p-6 text-right">
                  <form action={deleteExperience.bind(null, exp.id)}>
                    <button className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
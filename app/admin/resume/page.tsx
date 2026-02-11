import { PrismaClient } from "@prisma/client";
import { createResume, deleteResume, toggleActiveResume } from "@/lib/action"; // Import your actions
import { Trash2, CheckCircle, Circle, FileText, ExternalLink } from "lucide-react";

const prisma = new PrismaClient();

export default async function AdminResume() {
  const resumes = await prisma.resume.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Resume Manager 📄</h1>
        <p className="text-neutral-400">Upload multiple versions and select which one is visible on your site.</p>
      </div>

      {/* CREATE FORM */}
      <div className="bg-[#111] border border-neutral-800 p-6 rounded-2xl">
        <h2 className="text-lg font-semibold text-white mb-4">Add New Resume</h2>
        <form action={createResume} className="flex gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-xs text-neutral-500 uppercase font-bold">Label (e.g. PM Version)</label>
            <input 
              name="name" 
              type="text" 
              placeholder="Resume Name..." 
              required
              className="w-full bg-black border border-neutral-800 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-red-600 outline-none"
            />
          </div>
          <div className="flex-[2] space-y-2">
             <label className="text-xs text-neutral-500 uppercase font-bold">PDF URL</label>
            <input 
              name="url" 
              type="url" 
              placeholder="https://drive.google.com/..." 
              required
              className="w-full bg-black border border-neutral-800 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-red-600 outline-none"
            />
          </div>
          <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-all">
            Add
          </button>
        </form>
      </div>

      {/* RESUME LIST */}
      <div className="space-y-4">
        {resumes.map((resume) => (
          <div 
            key={resume.id} 
            className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
              resume.isActive 
                ? "bg-red-900/10 border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.15)]" 
                : "bg-[#0A0A0A] border-neutral-800"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${resume.isActive ? 'bg-red-500 text-white' : 'bg-neutral-800 text-neutral-500'}`}>
                <FileText size={20} />
              </div>
              <div>
                <h3 className={`font-bold text-lg ${resume.isActive ? 'text-white' : 'text-neutral-400'}`}>
                  {resume.name}
                  {resume.isActive && <span className="ml-3 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">ACTIVE</span>}
                </h3>
                <a href={resume.url} target="_blank" className="text-sm text-neutral-500 hover:text-white flex items-center gap-1 mt-1">
                  {resume.url} <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* TOGGLE ACTIVE BUTTON */}
              <form action={toggleActiveResume.bind(null, resume.id)}>
                <button 
                  disabled={resume.isActive}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                    resume.isActive 
                      ? "bg-green-500/20 text-green-500 cursor-default" 
                      : "bg-neutral-800 text-neutral-400 hover:bg-white hover:text-black"
                  }`}
                >
                  {resume.isActive ? <><CheckCircle size={16} /> Live</> : <><Circle size={16} /> Set Active</>}
                </button>
              </form>

              {/* DELETE BUTTON */}
              <form action={deleteResume.bind(null, resume.id)}>
                <button className="p-3 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                  <Trash2 size={20} />
                </button>
              </form>
            </div>
          </div>
        ))}

        {resumes.length === 0 && (
          <div className="text-center py-12 text-neutral-500">
            No resumes found. Add one above to get started!
          </div>
        )}
      </div>
    </div>
  );
}
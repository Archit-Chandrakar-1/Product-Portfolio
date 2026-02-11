import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
// 1. Import FileText for the Resume icon
import { Folder, Briefcase, Award, FileText } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession();

  // 1. Check if user is logged in
  if (!session || session.user?.email !== "archit1chandrakar@gmail.com") {
    redirect("/api/auth/signin"); 
  }

  // 2. If logged in, show the Dashboard
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Welcome, Archit 👋</h1>
        <p className="text-neutral-400 mt-2">Select a section to manage your portfolio.</p>
      </div>

      {/* Updated Grid: Fits 4 items nicely */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Projects Card */}
        <Link href="/admin/projects" className="group p-8 bg-[#0A0A0A] border border-neutral-800 rounded-3xl hover:border-red-600 transition-all">
          <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform">
            <Folder size={24} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Projects</h2>
          <p className="text-sm text-neutral-500">Add or edit your case studies and builds.</p>
        </Link>

        {/* Experience Card */}
        <Link href="/admin/experience" className="group p-8 bg-[#0A0A0A] border border-neutral-800 rounded-3xl hover:border-red-600 transition-all">
          <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform">
            <Briefcase size={24} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Experience</h2>
          <p className="text-sm text-neutral-500">Update your work history and roles.</p>
        </Link>

        {/* Certifications Card */}
        <Link href="/admin/certifications" className="group p-8 bg-[#0A0A0A] border border-neutral-800 rounded-3xl hover:border-red-600 transition-all">
          <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform">
            <Award size={24} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Certifications</h2>
          <p className="text-sm text-neutral-500">Manage licenses and achievements.</p>
        </Link>

        {/* --- NEW: Resume Card --- */}
        <Link href="/admin/resume" className="group p-8 bg-[#0A0A0A] border border-neutral-800 rounded-3xl hover:border-red-600 transition-all">
          <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform">
            <FileText size={24} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Resume</h2>
          <p className="text-sm text-neutral-500">Upload and manage CV versions.</p>
        </Link>

      </div>
    </div>
  );
}
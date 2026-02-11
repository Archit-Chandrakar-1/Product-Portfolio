export const dynamic = "force-dynamic";
import Navbar from '@/components/ui/navbar';
import ProjectGrid from '@/components/ui/project-grid'; // Import the client component
import { PrismaClient } from '@prisma/client';

// Initialize Prisma
const prisma = new PrismaClient();

// This is a Server Component (no 'use client')
export default async function Portfolio() {
  
  // 1. Fetch data directly from the database
  // The 'revalidate' option ensures data isn't cached forever
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc' // Newest projects first
    }
  });

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-500/30">
      <Navbar />
      
      <div className="pt-32 px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Projects that made <br />
            <span className="text-neutral-600">an impact</span>
          </h1>
          <p className="mt-4 text-neutral-400 text-lg max-w-2xl">
            A collection of technical projects, full-stack applications, and AI experiments.
          </p>
        </div>

        {/* 2. Pass the fetched data to the Client Component */}
        <ProjectGrid projects={projects} />
        
        {/* Empty State (If no projects exist yet) */}
        {projects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-neutral-800 rounded-3xl">
            <p className="text-neutral-500">No projects found. Add some from the Admin Dashboard!</p>
          </div>
        )}

      </div>
    </main>
  );
}
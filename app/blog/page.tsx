export const dynamic = "force-dynamic";
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '../footer/page'; 
import { PrismaClient } from "@prisma/client";
import { ArrowUpRight, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

// This function calculates "Read Time" based on text length (optional utility)
function estimateReadTime(text: string) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default async function BlogPage() {
  // 1. FETCH REAL DATA FROM DB
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' }, // Newest first
  });

  // 2. LOGIC: Split into "Hero" (Latest) and "Grid" (The rest)
  const heroPost = posts[0]; 
  const gridPosts = posts.slice(1);

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        
        {/* === HEADER === */}
        <div className="max-w-2xl mb-16">
          <h4 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">
            The Journal
          </h4>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Insights & Updates.
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Latest thoughts on Product Management, AI, and Engineering.
          </p>
        </div>

        {/* === EMPTY STATE (If no posts exist) === */}
        {posts.length === 0 && (
          <div className="py-20 border-2 border-dashed border-slate-200 rounded-3xl text-center">
            <p className="text-slate-500 text-lg">No posts published yet.</p>
            <p className="text-slate-400 text-sm">Head to your Admin Dashboard to write one.</p>
          </div>
        )}

        {/* === HERO POST (The Latest Entry) === */}
        {heroPost && (
          <Link href={`/blog/${heroPost.slug}`} className="group block mb-16">
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:border-indigo-100 transition-all duration-300 grid md:grid-cols-2">
              
              {/* Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                    {heroPost.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                    <Calendar size={12} /> {new Date(heroPost.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                  {heroPost.title}
                </h2>
                <p className="text-slate-500 text-lg mb-8 line-clamp-3">
                  {heroPost.excerpt}
                </p>

                <div className="flex items-center text-indigo-600 font-semibold text-sm">
                  Read Article <ArrowUpRight size={16} className="ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>

              {/* Image Side */}
              <div className="relative h-64 md:h-auto order-1 md:order-2 overflow-hidden bg-slate-100">
                <img 
                  src={heroPost.image} 
                  alt={heroPost.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </Link>
        )}

        {/* === STANDARD GRID (Previous Entries) === */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`} 
              className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Top */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm border border-black/5 rounded-lg text-xs font-bold text-slate-900 shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-3 font-medium">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{estimateReadTime(post.excerpt)}</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                  {post.excerpt}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Read more</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
      <Footer />
    </main>
  );
}
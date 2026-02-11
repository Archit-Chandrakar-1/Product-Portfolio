export const dynamic = 'force-dynamic';
import { PrismaClient, type BlogPost } from "@prisma/client";
import { createBlogPost, deleteBlogPost } from "@/lib/action";
import { Trash2, PenTool, Image as ImageIcon, Video, FileText, ExternalLink } from "lucide-react";



// export default async function AdminBlog() {
//   const posts = await prisma.blogPost.findMany({
//     orderBy: { createdAt: 'desc' }
//   });

const prisma = new PrismaClient();

export default async function AdminBlog() {
  // WRAP THE DB CALL IN A TRY/CATCH BLOCK
  let posts: BlogPost[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Database Error:", error);
    // We ignore the error so the build doesn't crash!
  }

  

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Blog Journal ✍️</h1>
        <p className="text-neutral-400">Share your insights, case studies, and thoughts with the world.</p>
      </div>

      {/* --- CREATE POST FORM --- */}
      <div className="bg-[#111] border border-neutral-800 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <PenTool size={20} className="text-emerald-500" /> Write New Entry
        </h2>
        
        <form action={createBlogPost} className="space-y-6">
          
          {/* Top Row: Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Post Title</label>
              <input 
                name="title" 
                type="text" 
                placeholder="e.g. The Future of AI..." 
                required
                className="w-full bg-black border border-neutral-800 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none transition-all placeholder:text-neutral-700"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Category</label>
              <input 
                name="category" 
                type="text" 
                placeholder="e.g. AI Product" 
                required
                className="w-full bg-black border border-neutral-800 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none transition-all placeholder:text-neutral-700"
              />
            </div>
          </div>

          {/* Middle Row: Image & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Cover Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-3.5 text-neutral-600" size={18} />
                <input 
                  name="image" 
                  type="url" 
                  placeholder="https://images.unsplash.com..." 
                  required
                  className="w-full bg-black border border-neutral-800 text-white pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none transition-all placeholder:text-neutral-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Post Type</label>
              <div className="relative">
                 <select 
                  name="type" 
                  className="w-full bg-black border border-neutral-800 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none appearance-none cursor-pointer"
                 >
                   <option value="article">Article 📄</option>
                   <option value="video">Video 🎥</option>
                 </select>
                 <div className="absolute right-4 top-4 pointer-events-none text-neutral-500">▼</div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Excerpt */}
          <div className="space-y-2">
            <label className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Short Excerpt (Summary)</label>
            <textarea 
              name="excerpt" 
              rows={3}
              placeholder="A brief description of what this post is about..." 
              required
              className="w-full bg-black border border-neutral-800 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none transition-all placeholder:text-neutral-700 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:shadow-[0_0_30px_rgba(5,150,105,0.5)]">
            Publish Post
          </button>
        </form>
      </div>

      {/* --- EXISTING POSTS LIST --- */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">Published Posts ({posts.length})</h2>
        
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="group flex flex-col md:flex-row gap-6 p-6 bg-[#0A0A0A] border border-neutral-800 rounded-2xl hover:border-emerald-500/50 transition-all"
          >
            {/* Image Thumbnail */}
            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden relative shrink-0">
               <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase flex items-center gap-1">
                 {post.type === 'video' ? <Video size={10} /> : <FileText size={10} />}
                 {post.type}
               </div>
            </div>

            {/* Content Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                   <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">{post.category}</span>
                   <span className="text-neutral-600 text-xs">•</span>
                   <span className="text-neutral-500 text-xs">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">{post.title}</h3>
                <p className="text-neutral-400 text-sm line-clamp-2">{post.excerpt}</p>
              </div>
              
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-800">
                 <div className="text-xs text-neutral-600 font-mono">Slug: /{post.slug}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex md:flex-col items-center justify-center gap-2 border-t md:border-t-0 md:border-l border-neutral-800 pt-4 md:pt-0 md:pl-6">
              <a href={`/blog/${post.slug}`} target="_blank" className="p-3 bg-neutral-900 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors" title="View Live">
                 <ExternalLink size={20} />
              </a>
              <form action={deleteBlogPost.bind(null, post.id)}>
                <button className="p-3 bg-red-900/10 text-red-500 hover:bg-red-600 hover:text-white rounded-xl transition-all" title="Delete Post">
                  <Trash2 size={20} />
                </button>
              </form>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-20 bg-[#0A0A0A] border border-neutral-800 border-dashed rounded-3xl">
             <div className="inline-flex p-4 rounded-full bg-neutral-900 mb-4 text-neutral-600">
               <PenTool size={32} />
             </div>
             <p className="text-neutral-500">No blog posts yet. Write your first one above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
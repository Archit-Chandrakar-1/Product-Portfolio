"use client";

import { Mail, MapPin, Send, ArrowUpRight } from "lucide-react";

export default function ContactForm() {
  return (
    <section className="bg-white min-h-screen flex items-center py-20 px-6 lg:px-8 overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* --- LEFT COLUMN: Contact Info --- */}
          <div className="flex flex-col justify-center">
            
            {/* Header Tags */}
            <h3 className="text-red-500 text-sm font-bold tracking-widest uppercase mb-6">
              GET IN TOUCH
            </h3>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-black leading-tight mb-2">
              Let's create
            </h1>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-300 leading-tight mb-8">
              something great
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-12 max-w-lg">
              I'm always excited to discuss product ideas, career opportunities, 
              or just have a chat about tech and innovation.
            </p>

            {/* Contact Details Cards */}
            <div className="space-y-8 mb-16">
              
              {/* Email */}
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium mb-1">Email</p>
                  <a href="mailto:archit1chandrakar@gmail.com" className="text-lg font-bold text-black hover:text-red-500 transition-colors">
                    archit1chandrakar@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium mb-1">Phone</p>
                  <a href="mailto:archit1chandrakar@gmail.com" className="text-lg font-bold text-black hover:text-red-500 transition-colors">
                    +91 91713-11131
                  </a>
                </div>
              </div>

              

              {/* Location */}
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium mb-1">Location</p>
                  <p className="text-lg font-bold text-black">
                    Raipur, Chhattisgarh
                  </p>
                </div>
              </div>

            </div>

            {/* Social Text Links */}
            <div className="flex items-center gap-8 mt-auto">
              <a href="https://www.linkedin.com/in/archit-chandrakar-39154a1b0/" target="_blank" className="text-gray-500 font-medium hover:text-black transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-500 font-medium hover:text-black transition-colors">
                GitHub
              </a>
              <a href="#" className="text-gray-500 font-medium hover:text-black transition-colors">
                Twitter
              </a>
            </div>

          </div>

          {/* --- RIGHT COLUMN: The Form --- */}
          <div className="flex flex-col justify-center">
            <form action="https://formspree.io/f/xkgqbdvq" method="POST" className="space-y-6">
              
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  required
                />
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group w-full py-4 bg-black text-white rounded-2xl font-bold text-lg hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 transform hover:-translate-y-1"
              >
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
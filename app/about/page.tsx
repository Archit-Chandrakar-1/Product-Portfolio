import React from "react";
import { MapPin, Mail, Linkedin, Twitter } from "lucide-react";
import { SiGithub, SiWhatsapp, SiInstagram } from "react-icons/si";

const socialLinks = [
  { Icon: Linkedin, href: "https://www.linkedin.com/in/archit-chandrakar-39154a1b0/", label: "LinkedIn" },
  { Icon: SiGithub, href: "https://github.com/Archit-Chandrakar-1", label: "GitHub" },
  { Icon: Twitter, href: "https://x.com/ArchitChan86131", label: "X (Twitter)" },
  { Icon: SiInstagram, href: "https://www.instagram.com/archit.chandrakar/", label: "Instagram" },
  { Icon: Mail, href: "mailto:archit1chandrakar@gmail.com", label: "Email" },
  { Icon: SiWhatsapp, href: "https://wa.me/919171311131", label: "WhatsApp" },
];

export default function AboutMe() {
  return (
    <section id="about" className="bg-white min-h-screen flex items-center py-20 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- LEFT COLUMN: Text Content --- */}
          <div className="flex flex-col justify-center">
            
            <h3 className="text-red-500 text-sm font-bold tracking-[0.2em] uppercase mb-6">
              About Me
            </h3>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-black leading-tight mb-2">
              Building bridges <br />
              between
            </h1>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-300 leading-tight mb-8">
              code & vision
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              AI Product Manager transitioning from a strong technical background in full-stack development and product execution. 
              Skilled in AI-first product strategy, problem discovery, user research, and data-driven decision making. 
              Experienced building digital platforms, integrating AI tools, and collaborating with engineering teams. 
              Currently pursuing AI-First Product Management (Airtribe) to master PM, AI workflows, and industry-ready product skills.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <div className="flex items-center gap-3 text-gray-500">
                <MapPin className="text-red-500 w-5 h-5" />
                <span>Raipur, Chhattisgarh</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <Mail className="text-red-500 w-5 h-5" />
                <a href="mailto:archit1chandrakar@gmail.com" className="hover:text-red-500 transition-colors">
                  archit1chandrakar@gmail.com
                </a>
              </div>
            </div>

            <div className="h-px w-full bg-gray-200 mb-8"></div>

            <div className="flex items-center gap-8">
              <span className="text-gray-400 font-medium">Connect with me:</span>
              <div className="flex flex-wrap gap-6">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors font-medium">
                    <Icon className="w-5 h-5" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          {/* Centered content to align the fixed image nicely */}
          <div className="flex flex-col items-center lg:items-end gap-8 h-full">
            
            {/* 1. PHOTO AREA (Fixed Size: 300px Width x 380px Height) */}
            <div className="relative w-[400px] h-[580px]  shrink-0 rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 shadow-xl">
                <img 
                    src="https://res.cloudinary.com/daozx86oq/image/upload/v1770471568/WhatsApp_Image_2024-02-15_at_13.42.55_dors7e.jpg" 
                    alt="Archit Chandrakar" 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 2. STATS ROW (Single Row, Compact Boxes) */}
            <div className="w-full grid grid-cols-4 gap-3">
                
                {/* Card 1 */}
                <div className="bg-gray-50 rounded-2xl p-4 text-center hover:bg-gray-100 transition-colors duration-300">
                    <span className="block text-2xl font-bold text-black">2+</span>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Years Exp</span>
                </div>

                {/* Card 2 */}
                <div className="bg-gray-50 rounded-2xl p-4 text-center hover:bg-gray-100 transition-colors duration-300">
                    <span className="block text-2xl font-bold text-black">10+</span>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Projects</span>
                </div>

                {/* Card 3 */}
                <div className="bg-gray-50 rounded-2xl p-4 text-center hover:bg-gray-100 transition-colors duration-300">
                    <span className="block text-2xl font-bold text-black">10+</span>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Domains</span>
                </div>

                {/* Card 4 */}
                <div className="bg-gray-50 rounded-2xl p-4 text-center hover:bg-gray-100 transition-colors duration-300">
                    <span className="block text-2xl font-bold text-black">3</span>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Companies</span>
                </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
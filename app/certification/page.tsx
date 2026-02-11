import React from "react";
import { Award, ExternalLink } from "lucide-react";

// --- Certification Data ---
const certifications = [
  {
    title: "AI Product Management",
    issuer: "Airtribe",
    year: "2025",
    description: "Industry-level training in AI Product Management covering product thinking, competitive analysis, user research, and real-world AI applications.",
    link: "https://airtribe.live", 
    // REPLACE with your actual certificate image URL
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop", 
  },
  {
    title: "Full-Stack Web Development",
    issuer: "Geekster",
    year: "2024",
    description: "Certified in Fullstack Web Development, trained in DSA, MERN stack, and AWS with placement assistance.",
    link: "https://geekster.in",
    // REPLACE with your actual certificate image URL
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Python with Data Science",
    issuer: "Feasible Research",
    year: "2023",
    description: "Vocational training developing E-Commerce Analytics Dashboard with RFM analysis, customer segmentation, and revenue trend insights.",
    link: "#",
    // REPLACE with your actual certificate image URL
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function Certifications() {
  return (
    <section className="bg-white min-h-[80vh] py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16">
          <h3 className="text-red-500 text-sm font-bold tracking-widest uppercase mb-4">
            CREDENTIALS
          </h3>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-black mb-2">
            Certifications &
          </h2>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-400">
            achievements
          </h2>
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className="group relative flex flex-col bg-white border border-gray-100 rounded-3xl p-8 hover:border-gray-200 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 overflow-hidden min-h-[400px]"
            >
              {/* ==================== 
                  LAYER 1: TEXT CONTENT 
                  (Visible by default, fades out on hover)
                 ==================== */}
              <div className="relative z-10 flex flex-col h-full transition-opacity duration-500 ease-in-out group-hover:opacity-0">
                {/* Icon Badge */}
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-8">
                  <Award className="w-6 h-6 text-orange-400" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {cert.title}
                </h3>

                {/* Issuer & Year */}
                <div className="flex flex-col mb-4">
                  <span className="text-red-500 font-semibold text-sm mb-1">
                      {cert.issuer}
                  </span>
                  <span className="text-gray-400 text-sm font-medium">
                      {cert.year}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                  {cert.description}
                </p>

                {/* Footer Link Button */}
                <div className="mt-auto border-t border-gray-100 pt-6">
                  <span className="inline-flex items-center gap-2 text-gray-500 text-sm font-medium">
                      View Credential
                      <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* ==================== 
                  LAYER 2: CERTIFICATE IMAGE
                  (Hidden by default, fades in on hover)
                 ==================== */}
              <a 
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-20 flex items-center justify-center bg-black opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
              >
                {/* Background Image with Overlay */}
                <img 
                  src={cert.image} 
                  alt={`${cert.title} Certificate`} 
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Center Action Button */}
                <div className="relative z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-xl hover:bg-gray-100 transition-colors">
                        Open Certificate
                        <ExternalLink className="w-4 h-4" />
                    </span>
                </div>
              </a>

            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
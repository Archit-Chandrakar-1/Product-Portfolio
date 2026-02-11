import React from "react";
import { Brain, Code, Sparkles, Lightbulb } from "lucide-react";


const expertiseAreas = [
  {
    title: "AI Product Strategy",
    description: "End-to-end AI product strategy from problem discovery to launch. I help businesses identify AI opportunities, define product vision, and create roadmaps for AI-first products.",
    icon: <Brain className="w-8 h-8 text-red-500" />,
  },
  {
    title: "Full-Stack Development",
    description: "Custom web application development using React.js, Next.js, Node.js, and modern tech stacks. From MVPs to enterprise solutions with scalable architecture.",
    icon: <Code className="w-8 h-8 text-red-500" />,
  },
  {
    title: "AI Integration & Automation",
    description: "Integrate AI chatbots, LLMs, and automation workflows into existing systems. Streamline operations with tools like OpenAI, N8N, Zapier, and custom AI solutions.",
    icon: <Sparkles className="w-8 h-8 text-red-500" />,
  },
  {
    title: "Product Consulting",
    description: "Strategic product consulting including PRDs, user research, competitive analysis, and go-to-market strategy for startups and enterprises.",
    icon: <Lightbulb className="w-8 h-8 text-red-500" />,
  },
];

export default function ExpertiseSection() {
  return (
    <>
    
    <section className="bg-white min-h-screen py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-black mb-2">
            My Areas of <br />
            <span className="text-gray-400">Expertise</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {expertiseAreas.map((area, index) => (
            <div 
              key={index}
              className="group bg-white border border-gray-100 rounded-3xl p-10 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300"
            >
              {/* Icon Box */}
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                {area.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {area.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
    
    </>
  );
}
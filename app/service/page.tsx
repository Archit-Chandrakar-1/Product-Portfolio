"use client";
"use client";
import Navbar from '@/components/ui/navbar';
import { ListItem } from '@/components/ui/ListItem'; // Import the new ListItem component

// Define a type for a Service item
type ServiceItem = {
  title: string;
  description: string;
};

// The comprehensive list of services (Updated to use title case for consistency with the design)
const services: ServiceItem[] = [
  {
    title: "SOFTWARE DEVELOPMENT",
    description: "Comprehensive Softwares according to your requirement.",
  },
  {
    title: "WEBSITE CREATION",
    description: "Creating high-performance, modern, and responsive websites using cutting-edge technologies.",
  },
  {
    title: "PRODUCT & PROJECT MANAGEMENT",
    description: "Leading and delivering successful digital products and projects from concept to launch.",
  },
  {
    title: "CUSTOM - HRM BUILD'S",
    description: "Tailored enterprise solutions (HRM, CRM, ERP) to streamline internal and external operations efficiently.",
  },
  {
    title: "CUSTOM - CRM BUILD'S",
    description: "Tailored enterprise solutions (HRM, CRM, ERP) to streamline internal and external operations efficiently.",
  },
  {
    title: "CUSTOM - ERP BUILD'S",
    description: "Tailored enterprise solutions (HRM, CRM, ERP) to streamline internal and external operations efficiently.",
  },
  {
    title: "FINTECH & PAYMENT INTEGRATIONS",
    description: "Targeted advertising campaigns on Facebook and Instagram for maximum return on investment (ROI).",
  },
  {
    title: "META ADVERTISMENT MASTER",
    description: "Targeted advertising campaigns on Facebook,Google,Whatsapp,Youtube and Instagram for maximum return on investment (ROI).",
  },
  {
    title: "DESGIN MASTERS",
    description: "Professional graphic design, branding, and visual identity creation to ensure a consistent brand image.",
  },
  {
    title: "BLOGGING,CONTENT & GOOGLE ADSENSE",
    description: "Content strategy, blog setup, and monetization through Google AdSense for passive revenue.",
  }, 
  {
    title: "GOOGLE CONSOLE & ANALYTICS",
    description: "In-depth traffic analysis and search performance monitoring for actionable insights.",
  },
  {
    title: "SEO & SOCIAL MEDIA OPTIMIZATION",
    description: "Optimizing profiles and content to improve visibility and organic engagement across social channels.",
  },
  {
    title: "AI AGENTS & AUTOMATION",
    description: "Designing high-converting landing pages and setting up marketing automation workflows for lead nurturing.",
  },
  {
    title: "MARKETING TACTICS",
    description: "Building, segmenting, and automating email campaigns for better customer retention and sales.",
  },  
  {
    title: "INTERNATIONAL FREELANCING",
    description: "Guidance and strategies for securing and excelling in international remote work opportunities.",
  },
  
];


export default function Service() {
  return (
    // Switched to white background to match the requested design
    <main className="min-h-screen bg-white text-black"> 
      {/* Assuming Navbar is styled to fit on a light background, or is fixed/sticky */}
      <Navbar /> 
      
      <div className="pt-24 pb-16 max-w-7xl mx-auto">
        {/* Title Section (Adjusted for white background) */}
        <div className="text-center space-y-4 mb-16 px-6 lg:px-8">
          <h1 className="text-5xl lg:text-6xl font-bold text-black">
            My Professional Services
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            A comprehensive suite of digital and development services tailored to bring your vision to life.
          </p>
        </div>
        
        {/* Services List - uses the new component */}
        <div className="w-full">
            {services.map((service, index) => (
                <ListItem key={index} service={service} index={index} />
            ))}
            
            {/* Final bottom border to close the list container */}
            <div className="border-t border-black w-full" /> 
        </div>
      </div>
    </main>
  );
}
// "use client";

// import { useState, useEffect } from "react";
// import Link from 'next/link';
// import { Menu, X, Lock, Github, Linkedin, Mail, Instagram, ChevronDown, Send } from 'lucide-react';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false); // Mobile Menu
//   const [scrolled, setScrolled] = useState(false);
//   const [rocketKey, setRocketKey] = useState(0); // Used to restart animation
//   const [isConnectOpen, setIsConnectOpen] = useState(false); // Dropdown State

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Function to force restart rocket animation
//   const triggerRocket = () => {
//     setRocketKey(prev => prev + 1);
//     setIsOpen(false); // Close mobile menu if open
//   };

//   const navLinks = [
//     { name: "About", href: "/#about" }, 
//     { name: "Expertise", href: "/#expertise" },
//     { name: "Products", href: "/portfolio" },
//     { name: "Certifications", href: "/#certifications" },
//     { name: "Blog", href: "/blog" },
//   ];

//   return (
//     <>
//       <style jsx>{`
//   @keyframes flyRocket {
//     /* --- FLIGHT PHASE (0% to 50% = 3 seconds) --- */
//     0% {
//       left: 60px;
//       opacity: 0;
//       transform: translateY(-50%) scale(0.5) rotate(45deg);
//     }
//     5% {
//       opacity: 1; /* Fade in quickly */
//     }
//     45% {
//       opacity: 1; /* Stay visible until near the end */
//     }
//     50% {
//       left: 82%; /* Reached the button */
//       opacity: 0; /* Fade out completely */
//       transform: translateY(-50%) scale(1.2) rotate(45deg);
//     }

//     /* --- WAIT PHASE (50% to 100% = 3 seconds) --- */
//     50.01% {
//       left: 60px; /* Reset position instantly while invisible */
//       opacity: 0;
//     }
//     100% {
//       left: 60px; /* Stay waiting at start */
//       opacity: 0; /* Stay invisible */
//     }
//   }

//   .rocket-animation {
//     position: absolute;
//     top: 50%;
//     /* Total duration is now 6s (3s fly + 3s wait) */
//     animation: flyRocket 6s ease-in-out infinite;
//     pointer-events: none;
//     z-index: 40;
//   }
// `}</style>

//       <nav 
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           scrolled ? "bg-black/80 backdrop-blur-md border-b border-neutral-800 py-4" : "bg-transparent py-6"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 relative"> 
//           <div className="flex items-center justify-between">
            
//             {/* --- LEFT: Logo --- */}
//             <Link 
//                 href="/" 
//                 className="flex items-center gap-2 group relative z-50"
//                 onClick={triggerRocket}
//             >
//               <span className="text-2xl font-bold text-white tracking-tight group-hover:text-gray-300 transition-colors">
//                 AC
//               </span>
//             </Link>

//             {/* --- 🚀 THE ROCKET --- */}
//             {/* Key forces re-render on click, resetting the animation loop */}
//             <div key={rocketKey} className="hidden md:block rocket-animation text-2xl">
//               🚀
//             </div>

//             {/* --- CENTER: Desktop Navigation --- */}
//             <div className="hidden md:flex items-center gap-8 relative z-50">
//               {navLinks.map((link) => (
//                 <Link 
//                   key={link.name}
//                   href={link.href} 
//                   onClick={triggerRocket}
//                   className="text-neutral-400 hover:text-white text-sm font-medium transition-colors duration-200"
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//             </div>

//             {/* --- RIGHT: Connect Dropdown & Admin --- */}
//             <div className="hidden md:flex items-center gap-6 relative z-50">
              
//               <Link 
//                 href="/admin" 
//                 className="text-neutral-600 hover:text-red-500 transition-colors duration-300"
//                 title="Admin Login"
//               >
//                 <Lock className="w-5 h-5" />
//               </Link>

//               {/* DROPDOWN CONTAINER */}
//               <div className="relative">
//                 <button 
//                   onClick={() => setIsConnectOpen(!isConnectOpen)}
//                   onBlur={() => setTimeout(() => setIsConnectOpen(false), 200)} // Delay close so clicks work
//                   className="group px-6 py-2 rounded-full border border-red-500/50 text-red-500 font-medium text-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center gap-2"
//                 >
//                   Let's Connect <ChevronDown className={`w-4 h-4 transition-transform ${isConnectOpen ? 'rotate-180' : ''}`} />
//                 </button>

//                 {/* DROPDOWN MENU */}
//                 {isConnectOpen && (
//                     <div className="absolute top-full right-0 mt-3 w-56 bg-[#0A0A0A] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                        
//                         <Link 
//                             href="/#contact" 
//                             className="flex items-center gap-3 px-5 py-3 text-white hover:bg-white/10 transition-colors border-b border-neutral-800"
//                         >
//                             <Send className="w-4 h-4 text-red-500" />
//                             <span>Contact Form</span>
//                         </Link>

//                         <a href="https://linkedin.com/in/yourprofile" target="_blank" className="flex items-center gap-3 px-5 py-3 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
//                             <Linkedin className="w-4 h-4" /> LinkedIn
//                         </a>
//                         <a href="https://github.com/yourusername" target="_blank" className="flex items-center gap-3 px-5 py-3 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
//                             <Github className="w-4 h-4" /> GitHub
//                         </a>
//                         <a href="https://instagram.com/yourhandle" target="_blank" className="flex items-center gap-3 px-5 py-3 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
//                             <Instagram className="w-4 h-4" /> Instagram
//                         </a>
//                         <a href="mailto:archit1chandrakar@gmail.com" className="flex items-center gap-3 px-5 py-3 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
//                             <Mail className="w-4 h-4" /> Email Me
//                         </a>
//                     </div>
//                 )}
//               </div>
//             </div>

//             {/* --- MOBILE: Hamburger Menu --- */}
//             <div className="md:hidden relative z-50">
//               <button 
//                 onClick={() => setIsOpen(!isOpen)} 
//                 className="text-white p-2"
//               >
//                 {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* --- Mobile Menu Overlay --- */}
//         {isOpen && (
//           <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-neutral-800 p-6 flex flex-col gap-4 shadow-2xl">
//             {navLinks.map((link) => (
//               <Link 
//                 key={link.name}
//                 href={link.href}
//                 onClick={triggerRocket}
//                 className="text-neutral-400 hover:text-white text-lg font-medium py-2 border-b border-neutral-900"
//               >
//                 {link.name}
//               </Link>
//             ))}
//              <Link 
//               href="/admin"
//               onClick={() => setIsOpen(false)}
//               className="text-neutral-500 hover:text-red-500 text-lg font-medium py-2 border-b border-neutral-900 flex items-center gap-2"
//             >
//               <Lock className="w-4 h-4" /> Admin Dashboard
//             </Link>
            
//             {/* Mobile Connect Button (Simpler on mobile: just goes to contact) */}
//             <Link href="/#contact" onClick={() => setIsOpen(false)}>
//               <button className="w-full mt-4 px-6 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition-colors">
//                 Let's Connect
//               </button>
//             </Link>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { Menu, X, Lock, Github, Linkedin, Mail, Instagram, ChevronDown, Send } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); 
  const [scrolled, setScrolled] = useState(false);
  const [rocketKey, setRocketKey] = useState(0); 
  const [isConnectOpen, setIsConnectOpen] = useState(false); 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerRocket = () => {
    setRocketKey(prev => prev + 1);
    setIsOpen(false); 
  };

  const navLinks = [
    { name: "About", href: "/#about" }, 
    { name: "Expertise", href: "/#expertise" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Certifications", href: "/#certifications" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes flyRocket {
          /* --- FLIGHT PHASE (0% to 50% = 3 seconds) --- */
          0% {
            left: 50px; /* Adjusted slightly for mobile */
            opacity: 0;
            transform: translateY(-50%) scale(0.5) rotate(45deg);
          }
          5% {
            opacity: 1; 
          }
          45% {
            opacity: 1; 
          }
          50% {
            left: 85%; /* Target the right side */
            opacity: 0; 
            transform: translateY(-50%) scale(1.2) rotate(45deg);
          }

          /* --- WAIT PHASE (50% to 100% = 3 seconds) --- */
          50.01% {
            left: 50px; 
            opacity: 0;
          }
          100% {
            left: 50px; 
            opacity: 0; 
          }
        }

        .rocket-animation {
          position: absolute;
          top: 50%;
          animation: flyRocket 6s ease-in-out infinite;
          pointer-events: none;
          z-index: 40; /* Behind the menu button (z-50) */
        }
      `}</style>

      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md border-b border-neutral-800 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative"> 
          <div className="flex items-center justify-between">
            
            {/* --- LEFT: Logo --- */}
            <Link 
                href="/" 
                className="flex items-center gap-2 group relative z-50"
                onClick={triggerRocket}
            >
              <span className="text-2xl font-bold text-white tracking-tight group-hover:text-gray-300 transition-colors">
                AC
              </span>
            </Link>

            {/* --- 🚀 THE ROCKET (NOW VISIBLE ON MOBILE) --- */}
            {/* Removed 'hidden md:block'. Added 'text-xl md:text-2xl' for responsive sizing */}
            <div key={rocketKey} className="block rocket-animation text-xl md:text-2xl">
              🚀
            </div>

            {/* --- CENTER: Desktop Navigation --- */}
            <div className="hidden md:flex items-center gap-8 relative z-50">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  onClick={triggerRocket}
                  className="text-neutral-400 hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* --- RIGHT: Connect Dropdown & Admin --- */}
            <div className="hidden md:flex items-center gap-6 relative z-50">
              
              <Link 
                href="/admin" 
                className="text-neutral-600 hover:text-red-500 transition-colors duration-300"
                title="Admin Login"
              >
                <Lock className="w-5 h-5" />
              </Link>

              {/* DROPDOWN CONTAINER */}
              <div className="relative">
                <button 
                  onClick={() => setIsConnectOpen(!isConnectOpen)}
                  onBlur={() => setTimeout(() => setIsConnectOpen(false), 200)} 
                  className="group px-6 py-2 rounded-full border border-red-500/50 text-red-500 font-medium text-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center gap-2"
                >
                  Let's Connect <ChevronDown className={`w-4 h-4 transition-transform ${isConnectOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* DROPDOWN MENU */}
                {isConnectOpen && (
                    <div className="absolute top-full right-0 mt-3 w-56 bg-[#0A0A0A] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                        <Link 
                            href="/#contact" 
                            className="flex items-center gap-3 px-5 py-3 text-white hover:bg-white/10 transition-colors border-b border-neutral-800"
                        >
                            <Send className="w-4 h-4 text-red-500" />
                            <span>Contact Form</span>
                        </Link>
                        <a href="https://linkedin.com/in/yourprofile" target="_blank" className="flex items-center gap-3 px-5 py-3 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                            <Linkedin className="w-4 h-4" /> LinkedIn
                        </a>
                        <a href="https://github.com/yourusername" target="_blank" className="flex items-center gap-3 px-5 py-3 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                            <Github className="w-4 h-4" /> GitHub
                        </a>
                        <a href="https://instagram.com/yourhandle" target="_blank" className="flex items-center gap-3 px-5 py-3 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                            <Instagram className="w-4 h-4" /> Instagram
                        </a>
                        <a href="mailto:archit1chandrakar@gmail.com" className="flex items-center gap-3 px-5 py-3 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                            <Mail className="w-4 h-4" /> Email Me
                        </a>
                    </div>
                )}
              </div>
            </div>

            {/* --- MOBILE: Hamburger Menu --- */}
            <div className="md:hidden relative z-50">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-white p-2"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* --- Mobile Menu Overlay --- */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-neutral-800 p-6 flex flex-col gap-4 shadow-2xl">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                onClick={triggerRocket}
                className="text-neutral-400 hover:text-white text-lg font-medium py-2 border-b border-neutral-900"
              >
                {link.name}
              </Link>
            ))}
             <Link 
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="text-neutral-500 hover:text-red-500 text-lg font-medium py-2 border-b border-neutral-900 flex items-center gap-2"
            >
              <Lock className="w-4 h-4" /> Admin Dashboard
            </Link>
            
            <Link href="/#contact" onClick={() => setIsOpen(false)}>
              <button className="w-full mt-4 px-6 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition-colors">
                Let's Connect
              </button>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
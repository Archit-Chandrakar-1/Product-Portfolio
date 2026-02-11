import ExpertiseSection from './expertise/page';
import Navbar from '@/components/ui/navbar';
import HeroSection from '@/components/ui/hero-section';
import ContactForm from '@/components/ui/contactForm';
import AboutMe from './about/page';

import Footer from './footer/page';
import ExperienceSection from '@/components/ui/experience';
import CertificationList from '@/components/ui/certification-list';


// --- Database Connection ---
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This must be an async function to fetch data
export default async function Home() {

  // 1. Fetch Experience Data
  const experiences = await prisma.experience.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // 2. Fetch Certification Data
  const certifications = await prisma.certification.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // 3. Fetch active Resume URL
  const activeResume = await prisma.resume.findFirst({
    where: { isActive: true }
  });
  const resumeUrl = activeResume?.url ?? '#';

  return (
    <main className="relative bg-[#050508] text-white">
      <Navbar />

      {/* Hero Section */}
      <HeroSection resumeUrl={resumeUrl} />

      {/* About Section */}
      <section id="about">
        <AboutMe />
      </section>

      {/* Dynamic Experience Section */}
      <section id="experience" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            Professional <span className="text-red-600">Journey</span>
          </h2>
          {/* Pass the fetched data to the component */}
          <ExperienceSection data={experiences} />
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise">
        <ExpertiseSection />
      </section>

      {/* Dynamic Certifications Section */}
      <section id="certifications" className="py-24 bg-black/50">
        <div className="text-center mb-16 px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Licenses & <span className="text-red-600">Certifications</span>
          </h2>
          <p className="text-neutral-400">Continuous learning and professional validation.</p>
        </div>
        {/* Pass the fetched data to the component */}
        <CertificationList data={certifications} />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactForm />
      </section>

      <Footer />
    </main>
  );
}
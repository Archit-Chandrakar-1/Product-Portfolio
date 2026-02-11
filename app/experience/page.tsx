// app/experience/page.tsx

import ExperienceSection from '../../components/ui/experience';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      <ExperienceSection data={experiences} />
    </>
  );
}
"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// ==========================================
// 1. PROJECT ACTIONS
// ==========================================

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const link = formData.get("link") as string;
  const image = formData.get("image") as string;

  await prisma.project.create({
    data: {
      title,
      description,
      category,
      link,
      image,
      tags: ["React", "Next.js"], // Default tags (you can make this dynamic later)
    }
  });

  revalidatePath("/portfolio");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/portfolio");
  revalidatePath("/admin/projects");
}


// ==========================================
// 2. EXPERIENCE ACTIONS
// ==========================================

export async function createExperience(formData: FormData) {
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const location = formData.get("location") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const description = formData.get("description") as string;
  
  // Handle highlights: split text by new lines into an array
  const highlightsRaw = formData.get("highlights") as string;
  const highlights = highlightsRaw ? highlightsRaw.split('\n').filter(line => line.trim() !== '') : [];

  await prisma.experience.create({
    data: {
      company,
      role,
      location,
      startDate,
      endDate,
      description,
      highlights
    }
  });

  revalidatePath("/"); // Experience is on the Home Page
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/experience");
}


// ==========================================
// 3. CERTIFICATION ACTIONS
// ==========================================

export async function createCertification(formData: FormData) {
  const name = formData.get("name") as string;
  const issuer = formData.get("issuer") as string;
  const date = formData.get("date") as string;
  const link = formData.get("link") as string;
  const image = formData.get("image") as string;

  await prisma.certification.create({
    data: {
      name,
      issuer,
      date,
      link,
      image
    }
  });

  revalidatePath("/"); // Certifications are on the Home Page
  revalidatePath("/admin/certifications");
  redirect("/admin/certifications");
}

export async function deleteCertification(id: string) {
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/certifications");
}


// ==========================================
// 4. RESUME ACTIONS (NEW)
// ==========================================

export async function createResume(formData: FormData) {
  const name = formData.get("name") as string;
  const url = formData.get("url") as string;

  // If this is the FIRST resume ever, make it active by default
  const count = await prisma.resume.count();
  const isActive = count === 0;

  await prisma.resume.create({
    data: { name, url, isActive }
  });

  revalidatePath("/");
  revalidatePath("/admin/resume");
  redirect("/admin/resume");
}

export async function deleteResume(id: string) {
  await prisma.resume.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/resume");
}

export async function toggleActiveResume(id: string) {
  // 1. Turn OFF all other resumes
  await prisma.resume.updateMany({
    where: { id: { not: id } },
    data: { isActive: false }
  });

  // 2. Turn ON the selected resume
  await prisma.resume.update({
    where: { id },
    data: { isActive: true }
  });

  revalidatePath("/");
  revalidatePath("/admin/resume");
}

// ==========================================
// 5. BLOG ACTIONS
// ==========================================

export async function createBlogPost(formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;
  const type = formData.get("type") as string;
  
  // Auto-generate slug from title (e.g., "Hello World" -> "hello-world")
  // Or fallback to a random string if title is missing
  const rawSlug = title ? title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : `post-${Date.now()}`;
  const slug = `${rawSlug}-${Date.now()}`; // Append timestamp to ensure uniqueness

  await prisma.blogPost.create({
    data: {
      title,
      excerpt,
      category,
      image,
      type,
      slug,
      content: "", // Placeholder for now
    }
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}
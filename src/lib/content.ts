import siteJson from '@content/site.json';
import projectsJson from '@content/projects.json';
import servicesJson from '@content/services.json';
import processJson from '@content/process.json';
import testimonialsJson from '@content/testimonials.json';
import faqJson from '@content/faq.json';
import toolsetJson from '@content/toolset.json';
import skillsJson from '@content/skills.json';

import type {
  SiteContent,
  Project,
  Service,
  ProcessStep,
  Testimonial,
  FaqItem
} from '@/types/content';

// Central place to read content from local JSON files.
// Swap any of these imports for a CMS fetch later without
// touching the components that consume them.
export const site: SiteContent = siteJson;
export const projects: Project[] = projectsJson;
export const services: Service[] = servicesJson;
export const processSteps: ProcessStep[] = processJson;
export const testimonials: Testimonial[] = testimonialsJson;
export const faq: FaqItem[] = faqJson;
export const toolset: string[] = toolsetJson;
export const skills: string[] = skillsJson;
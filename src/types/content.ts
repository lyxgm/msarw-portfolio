export interface SiteContent {
  name: string;
  logoMark: string;
  eyebrow: string;
  taglineLine1: string;
  taglineLine2: string;
  bio: string;
  statement: string;
  email: string;
  fiverr: string;
  linkedin: string;
  upwork: string;
  portrait: string;
  stats: { value: number; suffix: string; label: string }[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  software: string;
  image: string;
  video: string | null;
  poster: string;
}

export interface Service {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  label: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  clientfrom: string;
  image: string;

  rating: number;

  scores: {
    communication: number;
    qualityOfDelivery: number;
    valueOfDelivery: number;
  };

  whatWentWell: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

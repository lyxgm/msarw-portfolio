'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import ProjectCard from './ProjectCard';
import VideoModal from './VideoModal';
import { projects } from '@/lib/content';
import type { Project } from '@/types/content';

export default function FeaturedWork() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="px-6 md:px-10 py-28 md:py-40 max-w-7xl mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
        <div>
          <Reveal className="section-eyebrow mb-6">SELECTED CUTS</Reveal>
          <Reveal>
            <h2 className="font-display font-medium text-4xl md:text-6xl">
              Work That Speaks
              <br />
              in Frames.
            </h2>
          </Reveal>
        </div>
        <Reveal className="max-w-xs text-mute text-sm">
          Hover to preview. Click to watch the full cut.
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 0.08}>
            <ProjectCard project={project} onOpen={setActive} />
          </Reveal>
        ))}
      </div>

      <VideoModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

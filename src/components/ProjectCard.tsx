'use client';

import { useRef, useState } from 'react';
import type { Project } from '@/types/content';

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);

  function handleEnter() {
    setHovering(true);
    if (project.video && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }
  function handleLeave() {
    setHovering(false);
    if (project.video && videoRef.current) {
      videoRef.current.pause();
    }
  }

  return (
    <button
      type="button"
      data-hover
      onClick={() => onOpen(project)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="project-card group relative rounded-2xl overflow-hidden aspect-[16/10] text-left w-full"
    >
      {project.video ? (
        <>
          <img
            src={project.poster}
            alt={project.title}
            className={`footage w-full h-full object-cover scale-105 group-hover:scale-110 transition-all duration-700 absolute inset-0 ${hovering ? 'opacity-0' : 'opacity-100'}`}
          />
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="none"
            className={`w-full h-full object-cover scale-105 group-hover:scale-110 transition-all duration-700 ${hovering ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      ) : (
        <img
          src={project.image}
          alt={project.title}
          className="footage w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />

      <div className="absolute top-5 right-5 w-11 h-11 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#e2e2e4">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      {!project.video && (
        <div className="absolute top-5 left-5 font-mono text-[10px] tracking-widest text-ember2/90 bg-bg/60 px-2.5 py-1 rounded-full backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          REEL COMING SOON
        </div>
      )}

      <div className="absolute left-6 bottom-6 right-6 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
        <div className="font-mono text-[11px] tracking-widest text-ember2 mb-1">
          {project.category.toUpperCase()} — {project.software.toUpperCase()}
        </div>
        <div className="font-display text-2xl">{project.title}</div>
      </div>
    </button>
  );
}

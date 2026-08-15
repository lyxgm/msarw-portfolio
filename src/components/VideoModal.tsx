'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/types/content';

export default function VideoModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (project) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[160] bg-bg/95 backdrop-blur-md flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              data-hover
              onClick={onClose}
              className="absolute -top-12 right-0 font-mono text-xs tracking-widest text-mute hover:text-ivory transition-colors"
            >
              CLOSE ✕
            </button>

            <div className="rounded-2xl overflow-hidden aspect-video bg-panel relative">
              {project.video ? (
                <video
                  src={project.video}
                  poster={project.poster}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <img src={project.poster} alt={project.title} className="w-full h-full object-cover opacity-40 grayscale" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
                    <span className="font-mono text-[11px] tracking-widest text-ember2 border border-ember2/40 rounded-full px-4 py-1.5">
                      REEL COMING SOON
                    </span>
                    <p className="text-mute text-sm max-w-sm">
                      The full edit for this project hasn&rsquo;t been uploaded yet. Add a file at{' '}
                      <code className="text-ivory">/public/videos/{project.slug}.mp4</code> and set it in{' '}
                      <code className="text-ivory">content/projects.json</code> to enable playback.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between flex-wrap gap-2">
              <div>
                <div className="font-mono text-[11px] tracking-widest text-ember2 mb-1">
                  {project.category.toUpperCase()} — {project.software.toUpperCase()}
                </div>
                <div className="font-display text-2xl">{project.title}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

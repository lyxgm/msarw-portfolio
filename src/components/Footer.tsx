'use client';

import { site } from '@/lib/content';

export default function Footer() {
  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="px-6 md:px-10 py-10 border-t border-line flex flex-wrap items-center justify-between gap-4 mb-[34px]">
      <div className="font-mono text-[11px] text-mute tracking-widest">
        © {new Date().getFullYear()} {site.name} — ALL FRAMES RESERVED
      </div>
      <button data-hover onClick={scrollTop} className="font-mono text-[11px] text-mute tracking-widest hover:text-ember2 transition-colors">
        BACK TO TOP ↑
      </button>
    </footer>
  );
}

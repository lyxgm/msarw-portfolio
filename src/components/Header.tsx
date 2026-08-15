'use client';

import { site } from '@/lib/content';

export default function Header() {
  function openNav() {
    document.dispatchEvent(new CustomEvent('nav:toggle'));
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-10 py-6 bg-black/10 backdrop-blur-xl border-b border-white/10">
      <a href="#top" data-hover className="font-display font-semibold text-lg tracking-tight">
        {site.logoMark.split('.')[0]}
        <span className="text-ember2">.</span>
        {site.logoMark.split('.')[1]}
      </a>
      <button
        onClick={openNav}
        data-hover
        className="font-mono text-xs tracking-[0.25em] flex items-center gap-3"
      >
        {/* <span>MENU</span> */}
        <span className="flex flex-col gap-[5px] w-7">
          <span className="h-px w-full bg-ivory" />
          <span className="h-px w-full bg-ivory" />
          {/* <span className="h-px w-full bg-ivory" /> */}
        </span>
      </button>
    </header>
  );
}

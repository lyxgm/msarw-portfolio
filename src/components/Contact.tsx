'use client';

import { FormEvent } from 'react';
import Reveal from './Reveal';
import MagneticLink from './MagneticLink';
import { site } from '@/lib/content';

export default function Contact() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`New project inquiry — ${fd.get('type')}`);
    const body = encodeURIComponent(
      `Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\nProject type: ${fd.get('type')}\n\n${fd.get('message')}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="px-6 md:px-10 py-28 md:py-40 max-w-6xl mx-auto">
      <Reveal className="section-eyebrow mb-6">GET IN TOUCH</Reveal>
      <Reveal>
        <h2 className="font-display font-medium text-5xl md:text-7xl mb-16 leading-[1.02]">
          Let&rsquo;s Create Something
          <br />
          <span className="text-ember2">Cinematic.</span>
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-16">
        <Reveal>
          <div className="flex flex-col gap-5">
            <MagneticLink href={`mailto:${site.email}`} className="flex items-center justify-between border-b border-line pb-4 group">
              <span className="font-display text-2xl md:text-3xl group-hover:text-ember2 transition-colors">Email</span>
              <span className="text-mute font-mono text-sm">{site.email}</span>
            </MagneticLink>
            <MagneticLink href="#" className="flex items-center justify-between border-b border-line pb-4 group">
              <span className="font-display text-2xl md:text-3xl group-hover:text-ember2 transition-colors">LinkedIn</span>
              <span className="text-mute font-mono text-sm">{site.linkedin}</span>
            </MagneticLink>
            <MagneticLink href="#" className="flex items-center justify-between border-b border-line pb-4 group">
              <span className="font-display text-2xl md:text-3xl group-hover:text-ember2 transition-colors">Fiverr</span>
              <span className="text-mute font-mono text-sm">{site.fiverr}</span>
            </MagneticLink>
            <MagneticLink href="#" className="flex items-center justify-between border-b border-line pb-4 group">
              <span className="font-display text-2xl md:text-3xl group-hover:text-ember2 transition-colors">Upwork</span>
              <span className="text-mute font-mono text-sm">{site.upwork}</span>
            </MagneticLink>
          </div>
        </Reveal>

        <Reveal>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="font-mono text-[11px] tracking-widest text-mute">NAME</label>
              <input required name="name" type="text" className="w-full bg-transparent border-b border-line focus:border-ember2 outline-none py-3 text-lg transition-colors" />
            </div>
            <div>
              <label className="font-mono text-[11px] tracking-widest text-mute">EMAIL</label>
              <input required name="email" type="email" className="w-full bg-transparent border-b border-line focus:border-ember2 outline-none py-3 text-lg transition-colors" />
            </div>
            <div>
              <label className="font-mono text-[11px] tracking-widest text-mute">PROJECT TYPE</label>
              <select name="type" className="w-full bg-transparent border-b border-line focus:border-ember2 outline-none py-3 text-lg transition-colors">
                <option className="bg-panel">YouTube</option>
                <option className="bg-panel">Instagram Reels</option>
                <option className="bg-panel">Podcast</option>
                <option className="bg-panel">Documentary</option>
                <option className="bg-panel">Custom Video</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-[11px] tracking-widest text-mute">MESSAGE</label>
              <textarea name="message" rows={3} className="w-full bg-transparent border-b border-line focus:border-ember2 outline-none py-3 text-lg transition-colors resize-none" />
            </div>
            <MagneticLink as="button" className="mt-4 px-8 py-4 bg-ember2 text-bg font-medium rounded-full text-sm tracking-wide self-start">
              Send Message
            </MagneticLink>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* Deep-Ocean Instrument Panel: narrative portfolio page with tactile pill controls, diagonal shimmer, and editorial rhythm. */
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { Copy, Play } from "lucide-react";
import InteractiveBackdrop from "@/components/InteractiveBackdrop";

const tools = [
  ["Adobe Premiere", "Tool / 01", "https://www.adobe.com/products/premiere.html"],
  ["Adobe After Effects", "Tool / 02", "https://www.adobe.com/products/aftereffects.html"],
  ["DaVinci Resolve", "Tool / 03", "https://www.blackmagicdesign.com/products/davinciresolve"],
];
const skills = [["Storytelling", "Skill / 01"], ["Motion Graphics", "Skill / 02"], ["Color Grading", "Skill / 03"], ["Sound Design", "Skill / 04"]];
const services = [
  ["01", "YouTube Videos & Vlogs", "Long-form edits focused on storytelling, pacing, and keeping viewers engaged from start to finish."],
  ["02", "Talking Head Videos", "Retention-driven edits with dynamic cuts, zooms, captions, and pattern interrupts for creator content."],
  ["03", "Video Podcasts", "Clean multi-camera edits with polished audio, branding, and a smooth viewing experience."],
  ["04", "Reels & Shorts", "Fast-paced vertical edits built around strong hooks, captions, and platform-native pacing."],
  ["05", "Corporate & Business Videos", "Professional edits that communicate your message with clarity, credibility, and polished visuals."],
  ["06", "Real Estate Walkthroughs", "Cinematic property showcases with seamless transitions, color grading, and engaging walkthroughs."],
  ["07", "Documentary", "Story-driven editing with cinematic pacing, immersive sound design, and impactful visual storytelling."],
  ["08", "Custom Projects", "Tailored edits that match your vision, goals, and unique project requirements."],
];
const previewVideo = "/assets/project-preview-flower.mp4";
const projects: [string, string, string, string, string][] = [
  ["AURORA", "Brand Film", "DaVinci Resolve", "/assets/project-aurora.jpg", previewVideo],
  ["NIGHT MARKET", "Documentary Short", "Premiere Pro", "/assets/project-night-market.jpg", previewVideo],
  ["SIGNAL", "Music Video", "DaVinci Resolve", "/assets/project-signal.jpg", "/assets/project-reel-signal.mp4"],
];
const process = [
  ["01", "Client Brief", "Understanding the story you need told.", "A short call or brief to pin down audience, tone, deadline, and deliverables before a single clip is touched."],
  ["02", "Planning", "Structuring the edit before the timeline opens.", "Footage is reviewed and organized, key moments are selected, and the overall structure is mapped out so the first cut has clear direction."],
  ["03", "Editing", "Building rhythm, pace, and narrative flow.", "The assembly becomes a story — cuts land on beats, pacing tightens, and the piece finds its shape."],
  ["04", "Motion Graphics", "Adding titles, transitions, and polish.", "Type, logos, and graphic transitions are animated to match the pacing already set."],  
  ["05", "Color Grading", "Giving every frame a consistent mood.", "Exposure, contrast, and tone are matched shot to shot for a unified, cinematic look."],
  ["06", "Sound Design", "Mixing dialogue, music, and texture.", "Levels are balanced, music is scored to picture, and small foley details are layered in so the piece feels alive."],
  ["07", "Delivery", "Exporting, reviewing, and handing it off.", "Final files are rendered to spec for every platform, with two rounds of revisions built in before delivery."],
];
type ClickBubble = { id: number; x: number; y: number };

const faqs = [
  ["What's the typical turnaround time?", "Short-form edits typically take 1–3 business days, while long-form videos may take longer depending on the volume of footage and number of revision rounds. Simpler edits generally take around 3–4 business days."],
  ["How do I send you my footage?", "You can share your footage through Google Drive or Dropbox. Both are fully supported and easy to use."],
  ["How many revisions are included?", "Every project includes two rounds of revisions. Additional rounds are billed hourly and always confirmed with you before any extra work begins."],
  ["How is pricing structured?", "Projects are typically quoted at a flat rate based on the scope, video length, and complexity of the edit."],
  ["Can you take on rush projects?", "Yes, depending on current availability. Rush delivery carries a priority fee and is confirmed upfront before any work begins."],
  ["Who owns the raw and final files?", "You do. All raw footage and final delivered files remain fully yours, with project files archived on my end for 90 days after delivery."],
];

function Pill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <span className={`pill ${dark ? "pill-dark" : ""}`}>{children}</span>;
}

function SectionLabel({ children, noDot = false }: { children: React.ReactNode; noDot?: boolean }) {
  return <p className="section-label">{!noDot && <span className="section-dot" />}{children}</p>;
}

function MSARWArrow() {
  return <img className="msarw-arrow" src="/assets/msarw-custom-arrow.png" alt="" aria-hidden="true" />;
}

function ProjectCard({ project, index, onPlay }: { project: [string, string, string, string, string]; index: number; onPlay: (video: string, title: string, isReel: boolean) => void }) {
  const [title, category, software, image, video] = project;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const startPreview = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => undefined);
    timerRef.current = window.setTimeout(() => videoRef.current?.pause(), 5000);
  };
  const stopPreview = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };
  useEffect(() => () => { if (timerRef.current) window.clearTimeout(timerRef.current); }, []);
  const openProject = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onPlay(video, title, video.includes("reel"));
  };
  const handleProjectKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") openProject(event as unknown as React.MouseEvent<HTMLElement>);
  };
  return <article className={`project-card ${video.includes("reel") ? "project-card--reel" : ""}`} role="button" tabIndex={0} onClick={openProject} onKeyDown={handleProjectKeyDown} onMouseEnter={startPreview} onMouseLeave={stopPreview} onFocus={startPreview} onBlur={stopPreview}>
    <div className="project-image" style={{ backgroundImage: `url(${image})` }}>
      <video ref={videoRef} className="project-preview" src={video} muted loop playsInline preload="metadata" aria-hidden="true" />
      <div className="project-number">0{index + 1}</div>
      <div className="preview-label">HOVER PREVIEW / 05 SEC</div>
      <button type="button" className="play-button" aria-label={`Play ${title}`} onClick={openProject}><Play size={18} fill="currentColor" /></button>
    </div>
    <div className="project-info"><div><h3>{title}</h3><p>{category}</p><div className="project-timeline"><span /><span /><span /><span /><span /></div></div><Pill dark>{software}</Pill></div>
  </article>;
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openService, setOpenService] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string; isReel: boolean } | null>(null);
  const [activeTool, setActiveTool] = useState(0);
  const [activeSkill, setActiveSkill] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [processProgress, setProcessProgress] = useState(0);
  const [clickBubbles, setClickBubbles] = useState<ClickBubble[]>([]);
  const [loadingState, setLoadingState] = useState<"loading" | "fading" | "done">("loading");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const capabilitySectionsRef = useRef<HTMLDivElement | null>(null);
  const processSectionRef = useRef<HTMLElement | null>(null);
  const modalScrollYRef = useRef(0);
  useEffect(() => {
    if (!activeVideo) return;
    const scrollY = window.scrollY;
    modalScrollYRef.current = scrollY;
    const previous = {
      bodyOverflow: document.body.style.overflow,
      htmlScrollBehavior: document.documentElement.style.scrollBehavior,
    };
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous.bodyOverflow;
      document.documentElement.style.scrollBehavior = previous.htmlScrollBehavior;
      window.scrollTo({ top: modalScrollYRef.current, left: 0, behavior: "auto" });
    };
  }, [activeVideo]);
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 320 : 1600;
    const fadeDuration = reducedMotion ? 0 : 900;
    const startedAt = performance.now();
    let frame = 0;
    let fadeTimer = 0;
    const updateProgress = (now: number) => {
      const progress = Math.min(100, Math.round(((now - startedAt) / duration) * 100));
      setLoadingProgress(progress);
      if (progress < 100) frame = window.requestAnimationFrame(updateProgress);
    };
    frame = window.requestAnimationFrame(updateProgress);
    const completeTimer = window.setTimeout(() => {
      setLoadingProgress(100);
      setLoadingState("fading");
      fadeTimer = window.setTimeout(() => setLoadingState("done"), fadeDuration);
    }, duration);
    return () => { window.cancelAnimationFrame(frame); window.clearTimeout(completeTimer); window.clearTimeout(fadeTimer); };
  }, []);
  useEffect(() => {
    const sections = ["work", "services", "contact"].map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveNav(entry.target.id); });
    }, { rootMargin: "-18% 0px -62% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const element = capabilitySectionsRef.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.18 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const element = processSectionRef.current;
    if (!element) return;
    const updateProgress = () => {
      const rect = element.getBoundingClientRect();
      const start = window.innerHeight * 0.78;
      const end = -rect.height * 0.12;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setProcessProgress(progress);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".section-reveal"));
    if (!sections.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@msarw.com");
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 1600);
    } catch {
      setCopiedEmail(false);
    }
  };
  const scrollToContact = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setActiveNav("contact");
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.history.replaceState(null, "", "#contact");
  };
  const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    window.history.replaceState(null, "", "#top");
  };
  const handleSiteClick = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = Date.now() + Math.random();
    const bubble = { id, x: event.clientX, y: event.clientY };
    setClickBubbles((current) => [...current.slice(-5), bubble]);
    window.setTimeout(() => setClickBubbles((current) => current.filter((item) => item.id !== id)), 520);
  };
  return (
    <div className={`site-shell ${loadingState === "done" ? "is-ready" : "is-loading"}`} onClick={handleSiteClick}>
      <div className={`loading-screen ${loadingState === "loading" ? "is-visible" : loadingState === "fading" ? "is-fading" : "is-hidden"}`} style={{ "--loading-blur": `${Math.max(0, 12 - loadingProgress * 0.12)}px` } as CSSProperties} aria-hidden={loadingState === "done"}>
        <img className="loading-logo" src="/assets/msarw-lettermark-isolated.png" alt="MSARW" />
        <p className="loading-progress" aria-live="polite">{loadingProgress}%</p>
        <p className="loading-label">LOADING</p>
        <span className="loading-rule" />
      </div>
      <div className="click-bubble-layer" aria-hidden="true">{clickBubbles.map((bubble) => <span key={bubble.id} className="click-bubble" style={{ left: bubble.x, top: bubble.y }} />)}</div>
      <InteractiveBackdrop />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="MSARW home"><img className="brand-logo" src="/assets/msarw-lettermark-isolated.png" alt="MSARW" /></a>
        <nav><a className={activeNav === "work" ? "is-active" : undefined} aria-current={activeNav === "work" ? "page" : undefined} href="#work" onClick={() => setActiveNav("work")}>Work</a><a className={activeNav === "services" ? "is-active" : undefined} aria-current={activeNav === "services" ? "page" : undefined} href="#services" onClick={() => setActiveNav("services")}>Services</a><a className={activeNav === "contact" ? "is-active" : undefined} aria-current={activeNav === "contact" ? "page" : undefined} href="#contact" onClick={scrollToContact}>Contact</a></nav>
        <a className="mini-pill" href="#contact" onClick={scrollToContact}>Start a Project</a>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-bg" />
          <div className="hero-grid" />
          <div className="hero-copy">
            <SectionLabel noDot>BRAND CONTENT · YOUTUBE · REELS · FILMS · PODCASTS</SectionLabel>
            <h1><span>I Don’t Just<span className="hero-mobile-break"><br /></span> Edit Videos.</span><em>I Craft Stories.</em></h1>
            <div className="hero-actions"><a className="primary-pill" href="#work">View Portfolio</a><a className="text-link" href="#contact" onClick={scrollToContact}>Let’s Work Together</a></div>
          </div>
          <a className="scroll-cue" href="#intro" aria-label="Scroll to the introduction"><span>SCROLL TO EXPLORE</span><img className="scroll-cue-arrow" src="/assets/msarw-custom-arrow.png" alt="" aria-hidden="true" /></a>
          <div className="hero-meta"><span>AVAILABLE FOR PROJECTS</span><span>2026</span><span className="meta-line" /></div>
        </section>

        <section id="intro" className="intro section-pad split-section section-reveal">
          <div><SectionLabel>01 / The edit</SectionLabel><h2>I turn ordinary footage into unforgettable stories.</h2></div>
          <div className="intro-copy"><p>Three years behind the timeline. A freelance video editor based in Pakistan, working with creators, brands, and businesses around the world to turn raw footage into stories that feel like they were always meant to move.</p><p className="muted">From the first brief to the final export, the process stays close, collaborative, and built around the piece in front of us.</p></div>
        </section>

        <div ref={capabilitySectionsRef} className="capability-sections capability-reveal section-reveal">
          <section className="tool-section section-pad">
            <SectionLabel>02 / The toolset</SectionLabel>
            <div className="simple-capability-list">{tools.map(([tool, code]) => <div className="simple-capability-item tool-simple-item" key={tool}><span>{code}</span><strong>{tool}</strong><span className="capability-line" /></div>)}</div>
          </section>
          <section className="skill-section section-pad">
            <SectionLabel>03 / The skillset</SectionLabel>
            <div className="simple-capability-list skill-list">{skills.map(([skill, code]) => <div className="simple-capability-item skill-simple-item" key={skill}><span>{code}</span><strong>{skill}</strong><span className="capability-line" /></div>)}</div>
          </section>
        </div>

        <section id="work" className="work section-pad section-reveal">
          <div className="section-heading"><div><SectionLabel>04 / Selected work</SectionLabel><h2>Built for the<br /><em>afterimage.</em></h2></div><a className="mini-pill archive-cta" href="https://drive.google.com/drive/folders/PLACEHOLDER_ARCHIVE_ID" target="_blank" rel="noreferrer">View my archive</a></div>
          <div className="project-stack">{projects.map((project, i) => <ProjectCard key={project[0]} project={project} index={i} onPlay={(src, title, isReel) => setActiveVideo({ src, title, isReel })} />)}</div>
        </section>

        <section id="services" className="services section-pad section-reveal">
          <div className="section-heading"><div><SectionLabel>05 / What I make</SectionLabel><h2>Good work is<br /><em>felt in the pacing.</em></h2></div><p>Choose the format. I will help find the shape.</p></div>
          <div className="service-flip-grid">{services.map(([no, title, desc], index) => <article className={`service-flip-card ${openService === index ? "is-mobile-open" : ""}`} key={title} tabIndex={0} aria-expanded={openService === index} onClick={() => setOpenService(openService === index ? null : index)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setOpenService(openService === index ? null : index); } }}><div className="service-flip-inner"><span className="service-fixed-no" aria-hidden="true">{no}</span><div className="service-flip-face service-flip-front"><strong>{title}</strong></div><div className="service-flip-face service-flip-back"><p>{desc}</p></div></div></article>)}</div>
        </section>

        <section ref={processSectionRef} className="process section-pad section-reveal">
          <div className="section-heading"><div><SectionLabel>06 / The process</SectionLabel><h2>Clear from<br /><em>first cut to final.</em></h2></div><p>A small, deliberate system keeps the creative part moving.</p></div>
          <div className="process-editorial">
            <div className="process-rail" aria-hidden="true"><span className="process-rail-fill" style={{ height: `${processProgress * 100}%` }} /></div>
            <div className="process-grid" aria-label="Seven-step editing process">{process.map(([no, label, title, description], index) => <article className={`process-card ${Math.round(processProgress * (process.length - 1)) === index ? "is-process-active" : ""}`} key={no} data-step={index + 1} aria-label={`Step ${no}: ${title}`}><div className="process-card-head"><span className="process-no">{no}</span><span className="process-chip">{label}</span></div><div className="process-card-copy"><strong>{title}</strong><p className={index <= Math.ceil(processProgress * process.length) - 1 ? "is-process-description-visible" : ""}>{description}</p></div><span className="process-bar" /></article>)}</div>
          </div>
        </section>

        <section id="contact" className="cta-contact section-pad section-reveal"><div className="cta-contact-copy"><SectionLabel>07 / Make something worth keeping</SectionLabel><h2>Let’s create something<br /><em>cinematic.</em></h2></div><div className="contact-directory" aria-label="Contact links"><div className="email-contact-row"><a href="mailto:hello@msarw.com?subject=MSARW%20Project%20Inquiry" aria-label="Email MSARW at hello@msarw.com"><span>Email</span><small>hello@msarw.com</small></a><button className="copy-email" type="button" onClick={handleCopyEmail} aria-label={copiedEmail ? "Email address copied" : "Copy email address"} title={copiedEmail ? "Copied" : "Copy email address"}><Copy size={14} /></button></div><a href="https://www.linkedin.com/in/msarw" target="_blank" rel="noreferrer"><span>LinkedIn</span><small>/in/msarw</small><MSARWArrow /></a><a href="https://www.fiverr.com/" target="_blank" rel="noreferrer"><span>Fiverr</span><small>fiverr.com</small><MSARWArrow /></a><a href="https://www.upwork.com/" target="_blank" rel="noreferrer"><span>Upwork</span><small>msarw</small><MSARWArrow /></a></div></section>

        <section className="faq section-pad section-reveal"><SectionLabel>09 / Small print</SectionLabel><div className="faq-list">{faqs.map(([q, a], i) => { const isOpen = openFaq === i; return <div className="faq-item" key={q}><button aria-expanded={isOpen} aria-controls={`faq-answer-${i}`} onClick={() => setOpenFaq(isOpen ? null : i)}><span>{q}</span><span className="faq-symbol" aria-hidden="true">{isOpen ? "^" : "˅"}</span></button><div id={`faq-answer-${i}`} className={`faq-answer ${isOpen ? "is-open" : ""}`}><p className="faq-answer-text">{a}</p></div></div>; })}</div></section>
      </main>
      {activeVideo && <div className="video-modal" role="dialog" aria-modal="true" aria-label={`${activeVideo.title} full video`} onClick={() => setActiveVideo(null)}><div className={`video-modal-inner ${activeVideo.isReel ? "is-reel" : ""}`} onClick={(event) => event.stopPropagation()}><button type="button" className="video-close" onClick={() => setActiveVideo(null)} aria-label="Close video">×</button><p className="section-label"><span className="section-dot" />NOW PLAYING / {activeVideo.title}</p><video src={activeVideo.src} controls controlsList="nodownload noremoteplayback" disablePictureInPicture autoPlay playsInline className={`full-video ${activeVideo.isReel ? "full-video-reel" : ""}`} /></div></div>}
      <footer className="footer"><span className="footer-identity">MSARW — ALL FRAMES RESERVED</span><a href="#top" onClick={scrollToTop}>Back to top <MSARWArrow /></a></footer>
    </div>
  );
}

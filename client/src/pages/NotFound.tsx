/* Deep-Ocean 404: keep the recovery path cinematic, calm, and unmistakably MSARW. */
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found-page" aria-labelledby="not-found-title">
      <div className="not-found-waves" aria-hidden="true" />
      <header className="not-found-topbar">
        <a className="not-found-brand" href="/" aria-label="Return to MSARW home">
          <img src="/assets/msarw-lettermark-isolated.png" alt="MSARW" />
        </a>
        <span className="not-found-code">ERROR / 404</span>
      </header>
      <section className="not-found-content">
        <p className="section-label"><span className="section-dot" />SIGNAL LOST / ROUTE NOT FOUND</p>
        <p className="not-found-number">404</p>
        <h1 id="not-found-title">This frame<br /><em>doesn’t exist.</em></h1>
        <p className="not-found-copy">The page you’re looking for drifted outside the edit. Let’s return to the main sequence and find something worth keeping.</p>
        <a className="mini-pill not-found-home" href="/">Back to the portfolio <ArrowUpRight size={14} aria-hidden="true" /></a>
      </section>
      <footer className="not-found-footer"><span>MSARW / POST-PRODUCTION PRACTICE</span><span>ALL FRAMES RESERVED</span></footer>
    </main>
  );
}

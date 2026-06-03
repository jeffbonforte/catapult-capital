'use client';
import { useState, useEffect, useCallback } from 'react';
import './website.css';

/* ---- Inline SVG Icons ---- */
function IconArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
    </svg>
  );
}
function IconArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
function IconLock({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}
function IconMenu({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}
function IconClose({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
function IconCompass({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  );
}
function IconShield({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
function IconTrendingUp({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  );
}
function IconCheck({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

/* ---- Types ---- */
interface Company {
  co: string;
  sector: string;
  desc: string;
  moic: string;
  year: string;
}

/* ---- Nav ---- */
function Nav({ onRequest, scrolled, onNav }: { onRequest: () => void; scrolled: boolean; onNav?: (s: string) => void }) {
  const [open, setOpen] = useState(false);
  const links = ['Strategy', 'Portfolio', 'Team', 'Insights'];
  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : 'nav--top'}`}>
      <div className="wrap nav-inner">
        <img className="nav-logo"
             src="/assets/catapult-logo-horizontal-transparent.png"
             alt="Catapult Capital" />
        <nav className="nav-links">
          {links.map(l => (
            <span key={l} className="nav-link" onClick={() => onNav && onNav(l)}>{l}</span>
          ))}
          <button className={scrolled ? 'btn btn-primary' : 'btn btn-light'}
                  style={{padding:'10px 18px',fontSize:14}} onClick={onRequest}>
            LP login <IconLock size={15} />
          </button>
        </nav>
        <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
      {open && (
        <div style={{background:'var(--navy-900)',padding:'8px 0 18px'}}>
          <div className="wrap" style={{display:'flex',flexDirection:'column',gap:4}}>
            {links.map(l => (
              <span key={l} className="nav-link"
                    style={{color:'#EAF0F8',padding:'12px 0',borderBottom:'1px solid var(--border-on-brand)'}}
                    onClick={() => { setOpen(false); onNav && onNav(l); }}>
                {l}
              </span>
            ))}
            <button className="btn btn-light" style={{marginTop:14}} onClick={() => { setOpen(false); onRequest(); }}>
              LP login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---- Hero ---- */
function Hero({ onRequest }: { onRequest: () => void }) {
  const stats = [
    { v: '$240M', l: 'Assets under management' },
    { v: '14', l: 'Active portfolio companies' },
    { v: '2.4×', l: 'Net MOIC since inception' },
  ];
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-content">
          <span className="eyebrow" style={{color:'#9FB6D9'}}>Lower–middle-market private equity</span>
          <h1>Patient capital for durable, founder-led businesses.</h1>
          <p className="lead">We partner with operators in overlooked corners of the market —
            backing disciplined growth, not financial engineering.</p>
          <div className="hero-cta">
            <button className="btn btn-light" onClick={onRequest}>
              Request access <IconArrowUpRight size={17} />
            </button>
            <button className="btn btn-outline-light"
                    onClick={() => document.getElementById('strategy')?.scrollIntoView({behavior:'smooth'})}>
              Our strategy
            </button>
          </div>
        </div>
        <div className="hero-stats">
          {stats.map(s => (
            <div className="hero-stat" key={s.l}>
              <div className="v">{s.v}</div>
              <div className="l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Strategy ---- */
function Strategy() {
  const pillars = [
    { Ic: IconCompass, h: 'Operating discipline', p: 'We back businesses where better operations — not leverage — drive returns. Most of our value creation is organic.' },
    { Ic: IconShield, h: 'Underwrite the downside', p: "Every thesis is sized for the bear case first. We buy at sensible multiples and avoid auctions we can't win on merit." },
    { Ic: IconTrendingUp, h: 'Compound patiently', p: "A concentrated portfolio held for the long term. We'd rather own fourteen great companies than forty average ones." },
  ];
  return (
    <section className="section section--paper" id="strategy">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Our approach</span>
          <h2>We invest where operating discipline compounds.</h2>
        </div>
        <div className="cards3">
          {pillars.map(({Ic, h, p}) => (
            <div className="feature" key={h}>
              <div className="ic"><Ic size={26} /></div>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- StatBand ---- */
function StatBand() {
  const stats = [
    { v: '2009', l: 'Founded in the San Francisco Bay Area' },
    { v: '18.6%', l: 'Net IRR across realized investments' },
    { v: '$1.4B', l: 'Enterprise value created' },
    { v: '11', l: 'Full-cycle exits to date' },
  ];
  return (
    <section className="section section--white">
      <div className="wrap statband">
        {stats.map(s => (
          <div key={s.l}>
            <div className="v">{s.v}</div>
            <div className="l">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---- Portfolio ---- */
function Portfolio({ onSelect }: { onSelect: (c: Company) => void }) {
  const cos: Company[] = [
    { co: 'Harbor Logistics', sector: 'Industrial services', desc: 'Regional third-party logistics platform consolidating the Western US.', moic: '2.6×', year: '2019' },
    { co: 'Meridian Dental', sector: 'Healthcare', desc: 'Multi-state dental support organization built through 30+ add-ons.', moic: '2.3×', year: '2018' },
    { co: 'Cohort Software', sector: 'Vertical SaaS', desc: 'Practice-management software for specialty veterinary clinics.', moic: '0.9×', year: '2021' },
    { co: 'Ridgeline Foods', sector: 'Consumer', desc: 'Better-for-you frozen brand with national retail distribution.', moic: '1.8×', year: '2020' },
    { co: 'Atlas Controls', sector: 'Industrial tech', desc: 'Building-automation hardware and recurring service contracts.', moic: '3.1×', year: '2017' },
    { co: 'Beacon Compliance', sector: 'B2B services', desc: 'Outsourced regulatory compliance for community banks.', moic: '1.5×', year: '2022' },
  ];
  return (
    <section className="section section--paper" id="portfolio">
      <div className="wrap">
        <div className="section-head" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',maxWidth:'none'}}>
          <div><span className="eyebrow">Portfolio</span><h2>A concentrated book of operators.</h2></div>
          <button className="btn btn-ghost">View all 14 <IconArrowRight size={16} /></button>
        </div>
        <div className="pf-grid">
          {cos.map(c => (
            <div className="pf-cell" key={c.co} onClick={() => onSelect(c)}>
              <div>
                <div className="sector">{c.sector}</div>
                <div className="co">{c.co}</div>
                <div className="desc">{c.desc}</div>
              </div>
              <div className="foot">
                <span className="moic" style={{color: parseFloat(c.moic) < 1 ? 'var(--loss)' : 'var(--gain)'}}>{c.moic} MOIC</span>
                <span className="year">Acq. {c.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Team ---- */
function Team() {
  const people = [
    { nm: 'Eleanor Chase', role: 'Managing Partner', init: 'EC' },
    { nm: 'Marcus Devlin', role: 'Partner, Operations', init: 'MD' },
    { nm: 'Priya Raman', role: 'Partner, Investments', init: 'PR' },
    { nm: 'James Okafor', role: 'Partner, Capital Markets', init: 'JO' },
  ];
  return (
    <section className="section section--white" id="team">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">The partnership</span>
          <h2>Operators who have built and run companies.</h2>
        </div>
        <div className="team-grid">
          {people.map(p => (
            <div className="member" key={p.nm}>
              <div className="photo"><span className="initials">{p.init}</span></div>
              <div className="nm">{p.nm}</div>
              <div className="role">{p.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- CTA ---- */
function CTA({ onRequest }: { onRequest: () => void }) {
  return (
    <section className="section section--navy">
      <div className="wrap cta-band">
        <span className="eyebrow" style={{color:'#9FB6D9'}}>For limited partners</span>
        <h2>Considering an allocation to Fund III?</h2>
        <button className="btn btn-light" onClick={onRequest}>
          Request the data room <IconArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

/* ---- Footer ---- */
function Footer() {
  const cols = [
    { h: 'Firm', links: ['Strategy', 'Team', 'Careers', 'Contact'] },
    { h: 'Investors', links: ['LP login', 'Fund III', 'Reports', 'ADV'] },
    { h: 'Insights', links: ['Research', 'Letters', 'Press'] },
  ];
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div style={{maxWidth:300}}>
            <img className="footer-logo" src="/assets/catapult-logo-horizontal-transparent.png" alt="Catapult Capital" />
            <p style={{fontSize:13.5,lineHeight:1.6,margin:0}}>Patient capital for durable, founder-led businesses in the lower middle market.</p>
          </div>
          <div className="footer-cols">
            {cols.map(c => (
              <div className="footer-col" key={c.h}>
                <h4>{c.h}</h4>
                {c.links.map(l => <a key={l} href="#">{l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Catapult Capital Management, LP. All rights reserved.</span>
          <span>San Francisco, California</span>
        </div>
      </div>
    </footer>
  );
}

/* ---- Request Modal ---- */
function RequestModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="scrim" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {!sent ? (
          <>
            <span className="eyebrow">Limited partners</span>
            <h3>Request data-room access</h3>
            <p style={{fontSize:14,color:'var(--slate-600)',margin:'4px 0 6px',lineHeight:1.55}}>
              Access is limited to accredited and institutional investors. We&apos;ll respond within two business days.</p>
            <div className="field"><label>Full name</label><input placeholder="Jane Harrington" /></div>
            <div className="field"><label>Work email</label><input placeholder="jane@institution.com" /></div>
            <div className="field"><label>Institution</label><input placeholder="Meridian Family Office" /></div>
            <button className="btn btn-primary"
                    style={{width:'100%',marginTop:22,justifyContent:'center'}}
                    onClick={() => setSent(true)}>
              Request access
            </button>
          </>
        ) : (
          <div style={{textAlign:'center',padding:'18px 0'}}>
            <div style={{color:'var(--gain)',display:'flex',justifyContent:'center',marginBottom:14}}>
              <IconCheck size={40} />
            </div>
            <h3>Request received</h3>
            <p style={{fontSize:14,color:'var(--slate-600)',lineHeight:1.55}}>
              Thank you. A member of our investor-relations team will be in touch shortly.</p>
            <button className="btn btn-secondary" style={{marginTop:18}} onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Company Modal ---- */
function CompanyModal({ company, onClose }: { company: Company | null; onClose: () => void }) {
  if (!company) return null;
  return (
    <div className="scrim" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{maxWidth:520}}>
        <span className="eyebrow">{company.sector}</span>
        <h3 style={{marginBottom:14}}>{company.co}</h3>
        <p style={{fontSize:15,color:'var(--slate-600)',lineHeight:1.6,marginTop:0}}>{company.desc}</p>
        <div style={{display:'flex',gap:0,borderTop:'1px solid var(--border)',marginTop:18}}>
          {([['Acquired', company.year], ['Gross MOIC', company.moic], ['Status', 'Active']] as [string, string][]).map(([l, v]) => (
            <div key={l} style={{flex:1,padding:'16px 0'}}>
              <div style={{fontFamily:'var(--font-mono)',fontWeight:500,fontSize:20,color:'var(--navy-700)'}}>{v}</div>
              <div style={{fontSize:11,color:'var(--slate-500)',marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
        <button className="btn btn-secondary" style={{marginTop:8}} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

/* ---- Page ---- */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = useCallback((section: string) => {
    const id = section.toLowerCase();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="site">
      <Nav onRequest={() => setShowRequest(true)} scrolled={scrolled} onNav={handleNav} />
      <Hero onRequest={() => setShowRequest(true)} />
      <Strategy />
      <StatBand />
      <Portfolio onSelect={setSelectedCompany} />
      <Team />
      <CTA onRequest={() => setShowRequest(true)} />
      <Footer />
      {showRequest && <RequestModal onClose={() => setShowRequest(false)} />}
      {selectedCompany && <CompanyModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />}
    </div>
  );
}

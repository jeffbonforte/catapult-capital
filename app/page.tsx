'use client';
import { useState, useEffect, useCallback } from 'react';
import './website.css';

/* ---- Icons ---- */
function IconArrowUpRight({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>;
}
function IconArrowRight({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
}
function IconLock({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
}
function IconMenu({ size = 22 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
}
function IconClose({ size = 22 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}
function IconCheck({ size = 40 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}
function IconUsers({ size = 26 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function IconShield({ size = 26 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
function IconTrendingUp({ size = 26 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
}
function IconLayers({ size = 26 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
}
function IconLinkedIn({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
}

/* ---- Types ---- */
interface Company {
  co: string;
  sector: string;
  desc: string;
  moic?: string;
  year: string;
  status: 'active' | 'exited';
  ticker?: string;
  deepDive?: string;
}

/* ---- Nav ---- */
function Nav({ onRequest, scrolled, onNav }: { onRequest: () => void; scrolled: boolean; onNav?: (s: string) => void }) {
  const [open, setOpen] = useState(false);
  const links = ['Strategy', 'Portfolio', 'Team', 'Insights'];
  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : 'nav--top'}`}>
      <div className="wrap nav-inner">
        <img className="nav-logo" src="/assets/catapult-logo-horizontal-transparent.png" alt="Catapult Capital" />
        <nav className="nav-links">
          {links.map(l => (
            <span key={l} className="nav-link" onClick={() => onNav && onNav(l)}>{l}</span>
          ))}
          <button className={scrolled ? 'btn btn-primary' : 'btn btn-light'}
                  style={{padding:'10px 18px',fontSize:14}} onClick={() => window.location.href='/portal/login'}>
            LP Login <IconLock size={15} />
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
            <button className="btn btn-light" style={{marginTop:14}} onClick={() => window.location.href='/portal/login'}>
              LP Login
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
    { v: '9×', l: 'Gross return on Grindr exit' },
    { v: '$2.1B', l: 'Grindr enterprise value at IPO' },
    { v: '4', l: 'Successful exits to date' },
  ];
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-content">
          <span className="eyebrow" style={{color:'#9FB6D9'}}>Operator-led technology investing</span>
          <h1>Operator Built.<br />Value Driven.</h1>
          <p className="lead">Catapult Capital invests in and supports market-defining AI, internet, software, and life science platforms. We pair operational expertise with an extensive founder network to drive value creation.</p>
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
    {
      Ic: IconUsers, h: 'Operators First',
      p: 'Our partners are operators first. They have founded, scaled, and run companies, and they bring that experience directly to the teams we back, helping them execute rather than advising from a distance.'
    },
    {
      Ic: IconShield, h: 'Balance Risk',
      p: 'We base every investment on a strong thesis: a defined view of an industry and the operating principles that lead to successful outcomes. We invest with conviction, operate decisively, and balance risk against reward.'
    },
    {
      Ic: IconTrendingUp, h: 'Capital Structures',
      p: 'We pursue both equity and debt structures, with a focus on late-stage opportunities and acquisitions. Target deal sizes range from $50M to $500M, blending equity and debt financing to fit the demands of each situation.'
    },
    {
      Ic: IconLayers, h: 'SPV Architecture',
      p: 'Our fundless model lets us build each special purpose vehicle around the specific demands of the deal, recruiting the right co-investors and operators. We target liquidity horizons of one to four years.'
    },
  ];
  return (
    <section className="section section--paper" id="strategy">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Our approach</span>
          <h2>We invest where operating expertise compounds.</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:28}}>
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
    { v: '$50M–$500M', l: 'Target transaction size' },
    { v: '9×', l: 'Gross MOIC, Grindr exit' },
    { v: '4', l: 'Full-cycle exits to date' },
    { v: '1–4 yrs', l: 'Target liquidity horizon' },
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
    {
      co: 'Grindr', sector: 'Internet / Social', status: 'exited', moic: '9×', year: '2020',
      desc: 'Partnered in the acquisition, scaling, and successful IPO of Grindr (NYSE: GRND); the premier location-based LGBTQ+ dating platform.',
      ticker: 'NYSE: GRND'
    },
    {
      co: 'Powerlaw Corp', sector: 'Financial Technology', status: 'exited', moic: '4×', year: '2024',
      desc: 'A publicly traded closed-end fund (NASDAQ: PWRL) providing retail and institutional investors with direct access to high-growth, late-stage private technology companies.',
      ticker: 'NASDAQ: PWRL'
    },
    {
      co: 'Genalyte', sector: 'Life Sciences / Diagnostics', status: 'active', year: '2025',
      desc: 'Developing next-generation multiplexing technology to revolutionize diagnostic testing. Operating on the philosophy to "move data, not blood," delivering onsite, real-time results for over 85% of standard primary care blood panels.',
      deepDive: '/insights/genalyte',
    },
    {
      co: 'Cellanome', sector: 'Life Sciences / Multi-omics', status: 'active', year: '2024',
      desc: 'Building a foundational multi-omic platform for live-cell biology that maps individual cell behavior over time directly to molecular expression at single-cell resolution.',
      deepDive: '/insights/cellanome',
    },
    {
      co: 'JibJab', sector: 'Digital Media', status: 'exited', moic: '4.4×', year: '2018',
      desc: 'A digital media and personalized e-card platform. Following a majority acquisition, Catapult re-engineered the direct-to-consumer subscription model and streamlined core technical operations.',
    },
    {
      co: 'Vesta', sector: 'Enterprise Payments', status: 'active', year: '2025',
      desc: 'An enterprise payment processing and fraud-mitigation platform that guarantees zero-liability for approved transactions. Consistently maintains transaction approval rates exceeding 95%.',
    },
    {
      co: 'Captiv8', sector: 'Marketing Technology', status: 'exited', moic: '2.5×', year: '2024',
      desc: 'An influencer marketing and social commerce platform for enterprise brands and agencies. Rapid strategic acquisition just eight months after investment delivered a 2.5× return.',
    },
  ];
  return (
    <section className="section section--paper" id="portfolio">
      <div className="wrap">
        <div className="section-head" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',maxWidth:'none'}}>
          <div>
            <span className="eyebrow">Portfolio</span>
            <h2>A concentrated portfolio of market-defining companies.</h2>
          </div>
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
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  {c.moic
                    ? <span className="moic">{c.moic} MOIC</span>
                    : <span style={{fontFamily:'var(--font-mono)',fontWeight:500,fontSize:13,color:'var(--navy-600)'}}>Active</span>
                  }
                  {c.deepDive && <span style={{fontSize:11,fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.1em',color:'var(--navy-400)'}}>Deep dive ↗</span>}
                </div>
                <span className="year">
                  {c.status === 'exited' ? `Acq. ${c.year}` : `Since ${c.year}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Team ---- */
interface Person {
  nm: string;
  role: string;
  init: string;
  img: string;
  linkedin?: string;
  bio: string;
}

function MemberPhoto({ img, init }: { img: string; init: string }) {
  const [err, setErr] = useState(false);
  return (
    <div className="photo">
      {!err
        ? <img src={img} alt={init} onError={() => setErr(true)}
            style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}} />
        : <span className="initials">{init}</span>
      }
    </div>
  );
}

function Team() {
  const partners: Person[] = [
    {
      nm: 'Jeff Bonforte', role: 'Co-Founder & Managing Partner', init: 'JB',
      img: '/assets/jeff-bonforte.jpg',
      linkedin: 'https://linkedin.com/in/bonforte',
      bio: 'Serial entrepreneur with 30+ years founding startups and leading companies. Former SVP at Yahoo overseeing Mail, Search, and Answers. Served as CEO of Grindr for 2.5 years through its NYSE IPO.'
    },
    {
      nm: 'Rick Marini', role: 'Co-Founder & Managing Partner', init: 'RM',
      img: '/assets/rick-marini.jpg',
      linkedin: 'https://linkedin.com/in/rickmarini/',
      bio: 'Founded Tickle (acquired by Monster, $100M), BranchOut, and Protocol Ventures. 50+ angel investments including 15 unicorns. Named one of Forbes Top 50 angel investors. Served as COO of Grindr.'
    },
    {
      nm: 'Gary Hsueh', role: 'Co-Founder & Managing Partner', init: 'GH',
      img: '/assets/gary-hsueh.jpg',
      linkedin: 'https://linkedin.com/in/garyhsueh/',
      bio: '25+ years in corporate finance, M&A, and operations. Former VP at Goldman Sachs advising on ~$90B in transactions including Tesla\'s IPO. Served as CFO of Grindr through its 2022 NYSE listing.'
    },
    {
      nm: 'Brent Vegliacich', role: 'Partner', init: 'BV',
      img: '/assets/brent-vegliacich.jpg',
      linkedin: 'https://linkedin.com/in/brentvegliacich/',
      bio: 'Attorney and CPA specializing in investment structuring and tax. Managing Member of Selborne Legal Consulting and co-founder of Rails.xyz. Former M&A attorney at Reed Smith LLP and EY International Tax.'
    },
    {
      nm: 'Liam Ostadan', role: 'Associate', init: 'LO',
      img: '/assets/liam-ostadan.jpg',
      bio: 'B.S. Biochemistry and Certificate in Entrepreneurship, University of Wisconsin-Madison. Prior experience at Premji Invest and Cellanome. Supports Catapult operations and Genalyte with a focus on life science investment.'
    },
  ];

  const advisors = [
    { nm: 'Jacqueline Reses', init: 'JR', img: '/assets/jackie-reses.png', role: 'Chair, CEO & Co-Founder, Lead Bank', focus: 'Grindr', linkedin: 'https://linkedin.com/in/jacqueline-reses-938b7850/' },
    { nm: 'Sam Yagan', init: 'SY', img: '/assets/sam-yagan.png', role: 'Co-Founder, OkCupid & Corazon Capital', focus: 'Grindr', linkedin: 'https://linkedin.com/in/samyagan/' },
    { nm: 'Mostafa Ronaghi', init: 'MR', img: '/assets/mostafa-ronaghi.png', role: 'Co-Founder, Cellanome; Former CTO, Illumina', focus: 'Genalyte · Cellanome', linkedin: 'https://linkedin.com/in/mostafa-ronaghi-505440/' },
    { nm: 'David Ko', init: 'DK', img: '/assets/david-ko.png', role: 'Former CEO, Calm; Former COO, Zynga', focus: 'Life Sciences Fund', linkedin: 'https://linkedin.com/in/daveko/' },
  ];

  return (
    <section className="section section--white" id="team">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">The partnership</span>
          <h2>Operators. Investors.</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:28,marginBottom:64}}>
          {partners.map(p => (
            <div className="member" key={p.nm}>
              <MemberPhoto img={p.img} init={p.init} />
              <div style={{display:'flex',alignItems:'center',gap:6,marginTop:16,marginBottom:2}}>
                <div className="nm" style={{margin:0}}>{p.nm}</div>
                {p.linkedin && (
                  <a href={p.linkedin} target="_blank" rel="noopener noreferrer"
                     style={{color:'var(--slate-400)',flexShrink:0,display:'flex',alignItems:'center'}}
                     onClick={e => e.stopPropagation()}>
                    <IconLinkedIn size={13} />
                  </a>
                )}
              </div>
              <div className="role">{p.role}</div>
              <p style={{fontSize:12.5,color:'var(--slate-500)',lineHeight:1.55,marginTop:8}}>{p.bio}</p>
            </div>
          ))}
        </div>

        <div>
          <div style={{borderTop:'1px solid var(--border)',paddingTop:40,marginBottom:32}}>
            <span className="eyebrow">Strategic Advisors & SPV Partners</span>
          </div>
          <div className="team-grid">
            {advisors.map(a => (
              <div key={a.nm} style={{borderTop:'2px solid var(--navy-100)',paddingTop:18}}>
                <div style={{width:64,height:64,borderRadius:'50%',overflow:'hidden',marginBottom:12,background:'var(--navy-100)'}}>
                  <MemberPhoto img={a.img} init={a.init} />
                </div>
                <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
                  <div style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:16}}>{a.nm}</div>
                  <a href={a.linkedin} target="_blank" rel="noopener noreferrer"
                     style={{color:'var(--slate-400)',display:'flex',alignItems:'center'}}>
                    <IconLinkedIn size={13} />
                  </a>
                </div>
                <div style={{fontSize:13,color:'var(--slate-600)',lineHeight:1.5,marginBottom:6}}>{a.role}</div>
                <div style={{fontSize:11,fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.12em',color:'var(--navy-600)'}}>{a.focus}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- News ---- */
function News() {
  const items = [
    { pub: 'Catapult Capital', title: 'Moving the Lab to the Patient: Why We Invested in Genalyte', date: '2025', href: '/insights/genalyte' },
    { pub: 'Bloomberg', title: 'SpaceX Investor Powerlaw Debuts on Nasdaq as IPO Race Heats Up', date: 'May 27, 2026' },
    { pub: 'FinStrat Management', title: 'Building the Future of Crypto Trading with Rick Marini of Rails', date: 'May 26, 2026' },
    { pub: 'Second In Command Podcast', title: "Grindr's $2 Billion IPO: Rebuilding Culture & Tech | Rick Marini", date: 'April 16, 2026' },
    { pub: 'My First Million', title: 'How two straight guys bought Grindr and made $2B', date: 'October 13, 2025' },
    { pub: 'UNH Today', title: 'Investing in Students: Back Where It All Began', date: 'July 14, 2025' },
    { pub: 'Marketing Dive', title: 'Publicis Acquires Captiv8 as Influencer Marketing Ambitions Expand', date: 'May 22, 2025' },
    { pub: 'Exitwise', title: 'Investment Thesis of an Experienced Angel Investor | Rick Marini on The Wise Exit', date: 'Sep 26, 2022' },
    { pub: 'Reuters', title: 'Gay Dating App Grindr to Go Public in $2.1 Billion SPAC Deal', date: 'May 10, 2022' },
  ];
  return (
    <section className="section section--paper" id="insights">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">News</span>
          <h2>In the press.</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:0,border:'1px solid var(--border)'}}>
          {items.map((item, i) => {
            const inner = (
              <>
                <div style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.12em',fontSize:10,color:'var(--navy-600)',marginBottom:8}}>{item.pub}</div>
                <div style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:16,lineHeight:1.4,color:'var(--ink)',marginBottom:8}}>{item.title}</div>
                <div style={{fontSize:12,color:'var(--slate-400)',fontFamily:'var(--font-mono)'}}>{item.date}</div>
              </>
            );
            const style = {
              padding:'22px 26px',
              borderBottom: i < items.length - 2 ? '1px solid var(--border)' : 'none',
              borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
              background:'var(--white)',
              display:'block' as const,
              textDecoration:'none',
              transition:'background .15s',
            };
            return item.href
              ? <a key={i} href={item.href} style={style} onMouseEnter={e => (e.currentTarget.style.background='var(--navy-50)')} onMouseLeave={e => (e.currentTarget.style.background='var(--white)')}>{inner}</a>
              : <div key={i} style={style}>{inner}</div>;
          })}
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
        <span className="eyebrow" style={{color:'#9FB6D9'}}>Co-invest with Catapult</span>
        <h2>Interested in our next SPV?</h2>
        <p style={{fontFamily:'var(--font-serif)',fontWeight:300,fontSize:18,color:'#C9D7EA',lineHeight:1.6,margin:'0 auto 32px',maxWidth:480}}>
          We work with accredited and institutional investors on a deal-by-deal basis. Contact us to learn about current and upcoming opportunities.
        </p>
        <button className="btn btn-light" onClick={onRequest}>
          Request access <IconArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

/* ---- Footer ---- */
function Footer() {
  const cols = [
    { h: 'Firm', links: ['Strategy', 'Portfolio', 'Team', 'Contact'] },
    { h: 'Investors', links: ['LP Login', 'Insights', 'Press'] },
  ];
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div style={{maxWidth:300}}>
            <img className="footer-logo" src="/assets/catapult-logo-horizontal-transparent.png" alt="Catapult Capital" style={{filter:'brightness(0) invert(1)'}} />
            <p style={{fontSize:13.5,lineHeight:1.6,margin:0}}>Operator-led investing in AI, internet, software, and life science platforms.</p>
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
          <span>665 3rd St Suite 150, San Francisco, CA 94107</span>
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
            <span className="eyebrow">Co-invest with Catapult</span>
            <h3>Request access</h3>
            <p style={{fontSize:14,color:'var(--slate-600)',margin:'4px 0 6px',lineHeight:1.55}}>
              Access is limited to accredited and institutional investors. We'll respond within two business days.</p>
            <div className="field"><label>Full name</label><input placeholder="Jane Harrington" /></div>
            <div className="field"><label>Work email</label><input placeholder="jane@institution.com" /></div>
            <div className="field"><label>Institution</label><input placeholder="Meridian Family Office" /></div>
            <button className="btn btn-primary" style={{width:'100%',marginTop:22,justifyContent:'center'}} onClick={() => setSent(true)}>
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
              Thank you. A member of our team will be in touch shortly.</p>
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
        <h3 style={{marginBottom:6}}>{company.co}</h3>
        {company.ticker && <div style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--slate-500)',marginBottom:12}}>{company.ticker}</div>}
        <p style={{fontSize:15,color:'var(--slate-600)',lineHeight:1.6,marginTop:0}}>{company.desc}</p>
        <div style={{display:'flex',gap:0,borderTop:'1px solid var(--border)',marginTop:18}}>
          {([
            ['Invested', company.year],
            ['Gross MOIC', company.moic ?? '—'],
            ['Status', company.status === 'exited' ? 'Exited' : 'Active'],
          ] as [string, string][]).map(([l, v]) => (
            <div key={l} style={{flex:1,padding:'16px 0'}}>
              <div style={{fontFamily:'var(--font-mono)',fontWeight:500,fontSize:20,color: v === 'Active' ? 'var(--navy-600)' : 'var(--ink)'}}>{v}</div>
              <div style={{fontSize:11,color:'var(--slate-500)',marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:10,marginTop:8,flexWrap:'wrap'}}>
          {company.deepDive && (
            <a href={company.deepDive}
               style={{fontFamily:'var(--font-sans)',fontWeight:600,fontSize:14,color:'#fff',background:'var(--navy-600)',border:'1px solid transparent',borderRadius:6,padding:'10px 18px',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:6}}>
              Investment deep dive <IconArrowUpRight size={14} />
            </a>
          )}
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
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
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="site">
      <Nav onRequest={() => setShowRequest(true)} scrolled={scrolled} onNav={handleNav} />
      <Hero onRequest={() => setShowRequest(true)} />
      <Strategy />
      <StatBand />
      <Portfolio onSelect={setSelectedCompany} />
      <Team />
      <News />
      <CTA onRequest={() => setShowRequest(true)} />
      <Footer />
      {showRequest && <RequestModal onClose={() => setShowRequest(false)} />}
      {selectedCompany && <CompanyModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />}
    </div>
  );
}

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
  logo?: string;
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
      p: 'Our partners are operators first. They have founded, scaled, and run companies, and they bring that experience directly to the teams we back, helping them execute rather than advising from a distance. Our investment in Grindr is a clear example of the impact this strategy can have: our partners served as CEO, COO, and CFO for nearly three years, driving meaningful shareholder value and a stronger product for users.'
    },
    {
      Ic: IconShield, h: 'Balance Risk',
      p: 'We base every investment on a strong thesis: a defined view of an industry and the operating principles that lead to successful outcomes. We back businesses we believe can deliver returns in line with that thesis, then apply our expertise, operating experience, and partner network to help them get there. We invest with conviction, operate decisively, and balance risk against reward to deliver consistent returns.'
    },
    {
      Ic: IconTrendingUp, h: 'Capital Structures',
      p: 'We pursue both equity and debt structures, with a focus on late-stage opportunities and acquisitions. Our target deal sizes range from $50 million to $500 million, with most transactions blending equity and debt financing to fit the demands of each situation. Working across the capital stack lets us match structure to the risk and return of each deal, protecting capital where it matters most.'
    },
    {
      Ic: IconLayers, h: 'SPV Architecture',
      p: 'Our fundless model lets us build each special purpose vehicle around the specific demands of the deal, recruiting the right co-investors and operators. For each investment, we bring on an industry pioneer to anchor the deal with domain expertise and peer-level credibility to management. We target liquidity horizons of one to four years, with a return objective of one additional multiple per year of holding period.'
    },
  ];
  return (
    <section className="section section--paper" id="strategy">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Our approach</span>
          <h2>We invest where operating expertise compounds.</h2>
        </div>
        <div className="pillars">
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
function Portfolio() {
  const cos: Company[] = [
    {
      co: 'Grindr', sector: 'Internet / Social', status: 'exited', moic: '9×', year: '2020',
      desc: 'Grindr is a leading LGBTQ+ social networking and online dating platform. After partnering with a second PE firm to acquire the company in 2020, Catapult Capital jumped in as the operating partner to shift user architecture toward high-margin premium subscription tiers and optimized international user acquisition pipelines. In November 2022, we took the company public and the firm exited, generating an approximate 9x gross return on invested capital over a 36-month hold period.',
      ticker: 'NYSE: GRND',
      logo: '/assets/logo-grindr.png',
    },
    {
      co: 'Powerlaw Corp', sector: 'Financial Technology', status: 'exited', moic: '4×', year: '2024',
      desc: 'PowerLaw Corp. (NASDAQ: PWRL) is a publicly traded closed-end fund designed to provide retail and institutional investors with direct access to high-growth, late-stage private technology companies. The fund\'s portfolio is composed of secondary shares in premier, venture-backed businesses, bridging the gap between private markets and public liquidity. Catapult Capital invested in the fund in late 2024, having recognized the market demand for institutional-grade secondary access. Following PWRL\'s successful direct listing on the NASDAQ, Catapult\'s investment achieved a 4x return over an 18-month holding period.',
      ticker: 'NASDAQ: PWRL',
      logo: '/assets/logo-pwrl.png',
    },
    {
      co: 'Genalyte', sector: 'Life Sciences / Diagnostics', status: 'active', year: '2025',
      desc: 'Genalyte is a life sciences and clinical health-tech company developing next-generation multiplexing technology to revolutionize diagnostic testing. Operating on the core philosophy to "move data, not blood," its platform delivers onsite, real-time results for over 85% of standard primary care blood panels. Since assuming majority control in 2025, Catapult Capital has worked closely with management to accelerate clinical validation, streamline FDA approval pathways, and optimize the go-to-market architecture.',
      deepDive: '/insights/genalyte',
      logo: '/assets/logo-genalyte.png',
    },
    {
      co: 'Cellanome', sector: 'Life Sciences / Multi-omics', status: 'active', year: '2024',
      desc: 'Cellanome is building a foundational multi-omic platform for live-cell biology that maps individual cell behavior over time directly to molecular expression at single-cell resolution. As a growth-stage investor, Catapult Capital actively supports management in optimizing capital architecture.',
      deepDive: '/insights/cellanome',
      logo: '/assets/logo-cellanome.png',
    },
    {
      co: 'JibJab', sector: 'Digital Media', status: 'exited', moic: '4.4×', year: '2018',
      desc: 'JibJab is a digital media and personalized e-card platform famous for its pioneering user-generated video technology and satirical content. Following a majority acquisition in 2018, Catapult Capital re-engineered the company\'s direct-to-consumer subscription models, optimized digital distribution channels, and streamlined core technical operations. By modernizing the platform\'s scaling architecture, Catapult drove sustained profitability, culminating in a successful sale in 2026 that generated a 4.4x return on invested capital.',
      logo: '/assets/logo-jibjab.png',
    },
    {
      co: 'Vesta', sector: 'Enterprise Payments', status: 'active', year: '2025',
      desc: 'Vesta is an enterprise payment processing and fraud-mitigation platform that guarantees zero-liability for approved transactions while maximizing legitimate digital commerce sales. Trusted globally across the telecommunications and e-commerce sectors, the platform consistently maintains transaction approval rates exceeding 95%. Since investing in 2025, Catapult Capital has collaborated with management and syndicate partners to expand enterprise market share and accelerate high-margin product innovation.',
      logo: '/assets/logo-vesta.png',
    },
    {
      co: 'Captiv8', sector: 'Marketing Technology', status: 'exited', moic: '2.5×', year: '2024',
      desc: 'Captiv8 is an influencer marketing and social commerce platform providing enterprise brands and agencies with end-to-end infrastructure to discover creators, manage campaigns, and measure real-time ROI. Following a strategic investment in late 2024, Catapult Capital engaged immediately with management to sharpen commercial operations and optimize enterprise positioning, facilitating a rapid strategic acquisition just eight months later that delivered a 2.5x return on invested capital.',
      logo: '/assets/logo-captiv8.png',
    },
  ];
  return (
    <section className="section section--paper" id="portfolio">
      <div className="wrap">
        <div className="section-head" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',maxWidth:'none'}}>
          <div style={{maxWidth:640}}>
            <span className="eyebrow">Portfolio</span>
            <h2>A concentrated portfolio of market-defining companies.</h2>
            <p style={{fontFamily:'var(--font-serif)',fontWeight:300,fontSize:17,color:'var(--slate-600)',lineHeight:1.6,margin:'16px 0 0'}}>
              Built on operational expertise and structural insight.
            </p>
          </div>
        </div>
        <div className="pf-grid">
          {cos.map(c => {
            const inner = (
              <>
                <div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
                    <div className="sector" style={{marginBottom:0}}>{c.sector}</div>
                    {c.logo && (
                      <img src={c.logo} alt={c.co} style={{height:36,width:36,objectFit:'contain',flexShrink:0}} />
                    )}
                  </div>
                  <div className="co">{c.co}</div>
                  {c.ticker && <div style={{fontFamily:'var(--font-mono)',fontSize:11.5,color:'var(--slate-400)',margin:'-2px 0 8px'}}>{c.ticker}</div>}
                  <div className="desc">{c.desc}</div>
                </div>
                <div className="foot">
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    {c.moic
                      ? <span className="moic">{c.moic} MOIC</span>
                      : <span style={{fontFamily:'var(--font-mono)',fontWeight:500,fontSize:13,color:'var(--navy-600)'}}>Active</span>
                    }
                    {c.deepDive && <span style={{fontSize:11,fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.1em',color:'var(--navy-600)',fontWeight:600}}>Investment deep dive ↗</span>}
                  </div>
                  <span className="year">
                    {c.status === 'exited' ? `Acq. ${c.year}` : `Since ${c.year}`}
                  </span>
                </div>
              </>
            );
            return c.deepDive
              ? <a className="pf-cell" key={c.co} href={c.deepDive} style={{textDecoration:'none'}}>{inner}</a>
              : <div className="pf-cell pf-cell--static" key={c.co}>{inner}</div>;
          })}
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
  bio: string[];
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
      bio: [
        'Jeff is a technology executive and serial entrepreneur with over 30 years of experience founding startups, leading companies, and investing in early-stage technology. He has founded and led five startups in the consumer and productivity space, with successful exits to Google and Yahoo. During his eight-year tenure as an executive at Yahoo, Jeff served as Senior Vice President, overseeing core business units including Mail, Search, Answers, Data Platforms, and Research.',
        'Through Catapult Capital, Jeff has served as an executive board member for JibJab and Genalyte. Following the Grindr acquisition, he stepped in as CEO for over 2.5 years to lead a comprehensive transformation of the company from a troubled service into a NYSE public company. Under the leadership of Jeff and his partners at Catapult, Grindr more than doubled its revenue and EBITDA while successfully resolving deep-seated issues in security, privacy, culture, operations, engineering, and product.',
        'Jeff\'s background, combining founder-level product instincts with large-platform scale experience, anchors Catapult Capital as an operator-led investment firm. His hands-on approach is directly applicable to Catapult\'s core focus areas in internet, consumer, software, and life science sectors.',
      ],
    },
    {
      nm: 'Rick Marini', role: 'Co-Founder & Managing Partner', init: 'RM',
      img: '/assets/rick-marini.jpg',
      linkedin: 'https://linkedin.com/in/rickmarini/',
      bio: [
        'Rick\'s career spans more than 25 years as a serial entrepreneur and one of Silicon Valley\'s most active angel investors. He founded multiple startups, including Tickle (acquired by Monster for $100 million), BranchOut (raised $49M, acquired by Hearst), Protocol Ventures (the first fund-of-funds in crypto), and Rails.xyz (a regulated crypto perps exchange that raised $20M). As an angel investor, Rick has executed more than 50 investments, including 15 unicorns. Forbes named him one of the Top 50 angel investors based on successful exits and deal volume.',
        'At Catapult Capital, Rick led the firm\'s sourcing, negotiation, and governance for the acquisitions of Grindr (Rick served as COO at Grindr before taking the company public for $2B, 9x equity return), JibJab (5x return), and Captiv8 (2.5x return in 18 months). He is actively involved with the firm\'s current holdings, including Vesta, Genalyte, Cellanome, and PL10. Rick\'s areas of focus include consumer-facing technology, subscription businesses, social and digital media, marketplaces, and blockchain.',
        'Rick currently serves as a Board Member of Rails.xyz, Character.ai, JibJab, Genalyte, The Peter T. Paul School of Business & Economics at The University of New Hampshire, and the Harvard Business School California Research Center. Rick received his MBA from Harvard Business School. He holds a B.S. in Business Administration from the University of New Hampshire where he graduated magna cum laude.',
      ],
    },
    {
      nm: 'Gary Hsueh', role: 'Co-Founder & Managing Partner', init: 'GH',
      img: '/assets/gary-hsueh.jpg',
      linkedin: 'https://linkedin.com/in/garyhsueh/',
      bio: [
        'Gary has more than 25 years of experience across corporate finance, operations, business development, and mergers & acquisitions in the technology and internet sectors. He is currently the CFO of BOLD, one of the world\'s largest consumer-focused career platforms. Prior to joining BOLD, Gary was a co-founder and Managing Partner of Catapult Capital. During his time at Catapult, he also served as CFO of Grindr, where he helped grow revenue and profitability by more than 80% and led the company through its 2022 public listing on the NYSE.',
        'Earlier in his career, Gary was Vice President and Global Head of Search Partnerships at Yahoo, where he led global search distribution and content partnerships. He also founded and advised several startups across industries including consumer internet and mobile payments. Gary previously served as a Vice President in the Technology Investment Banking Division at Goldman Sachs, where he advised on nearly $90 billion in M&A and financing transactions, including the Skype divestiture from eBay, the subsequent sale of Skype to Microsoft, and the Tesla Motors IPO. Earlier in his career, he held operations and manufacturing leadership roles at Cisco Systems and Conexant Systems.',
        'Gary holds an MBA from the UCLA Anderson School of Management and a BS in Industrial Engineering from California Polytechnic State University, San Luis Obispo, where he graduated with honors.',
      ],
    },
    {
      nm: 'Brent Vegliacich', role: 'Partner', init: 'BV',
      img: '/assets/brent-vegliacich.jpg',
      linkedin: 'https://linkedin.com/in/brentvegliacich/',
      bio: [
        'Brent has supported Catapult Capital\'s institutional legal, tax, and structural work since 2019. Brent is a New York–based attorney and Certified Public Accountant with deep experience advising clients on the business and tax aspects of structuring investments for maximum after-tax profitability across the corporate growth cycle. He is currently the Managing Member of Selborne Legal Consulting LLC (legal counsel to the Fund), and the co-founder, CFO, and General Counsel of Rails, a crypto-derivatives exchange.',
        'Brent\'s prior experience includes more than four years as an attorney at Reed Smith LLP advising on M&A transactions in the consumer products and technology sectors, and more than three years in EY\'s International Tax practice advising public companies and private equity funds on M&A transactions, pre-acquisition structuring, and internal reorganizations.',
        'Brent holds a Master of Laws (LL.M.) in Taxation from the New York University School of Law, a Juris Doctor from New York Law School, a Master of Accounting and a Bachelor of Business Administration in Accounting, both from the University of South Alabama.',
      ],
    },
    {
      nm: 'Liam Ostadan', role: 'Associate', init: 'LO',
      img: '/assets/liam-ostadan.jpg',
      bio: [
        'Liam joined Catapult Capital as an analyst in 2026 after graduating from the University of Wisconsin-Madison with a B.S. in Biochemistry and a Certificate in Entrepreneurship. Liam combines his educational background and previous professional experiences to support the operations of Catapult Capital and Genalyte, with a focus on growth-stage life science investment opportunities.',
        'Prior to starting at Catapult, Liam has gained internship experiences that have prepared him to make meaningful contributions to the firm. Through internships at the venture capital firm Premji Invest and the biotech startup Cellanome, Liam has worked in fast-paced environments and supported the growth of innovative technologies. Additionally, Liam has hands-on experience at multiple leading academic labs, providing the technical knowledge to support Catapult\'s investments.',
      ],
    },
  ];

  const advisors = [
    {
      nm: 'Jacqueline Reses', init: 'JR', img: '/assets/jackie-reses.png',
      role: 'Chair, CEO & Co-Founder, Lead Bank',
      focus: 'Grindr',
      linkedin: 'https://linkedin.com/in/jacqueline-reses-938b7850/',
      bio: 'Jackie Reses is the Chair, CEO, and co-founder of Lead Bank, a chartered banking-as-a-service platform for fintech and crypto startups. She served as the Chief Development Officer at Yahoo from 2012–2016, sat on the board of Alibaba Group, and was the Capital Lead and Executive Chair of Square Financial Services. A Wharton graduate, Jackie sits on the boards of Endeavor, Affirm, and Nubank and is a member of the Wharton Board of Advisors.',
    },
    {
      nm: 'Sam Yagan', init: 'SY', img: '/assets/sam-yagan.png',
      role: 'Co-Founder, OkCupid & Corazon Capital',
      focus: 'Grindr',
      linkedin: 'https://linkedin.com/in/samyagan/',
      bio: 'Sam Yagan is a Harvard-educated serial entrepreneur and co-founder of SparkNotes, OkCupid, and Corazon Capital, an early-stage VC firm. As CEO of Match Group, he oversaw the launch of Tinder and the company\'s 2015 IPO, and later led ShopRunner through its 2020 acquisition by FedEx. He served as a lead director of Grindr through its 2022 NYSE listing and was named one of Time magazine\'s 100 most influential people in the world in 2013.',
    },
    {
      nm: 'Mostafa Ronaghi', init: 'MR', img: '/assets/mostafa-ronaghi.png',
      role: 'Co-Founder, Cellanome; Former CTO, Illumina',
      focus: 'Genalyte · Cellanome · Life Sciences Fund',
      linkedin: 'https://linkedin.com/in/mostafa-ronaghi-505440/',
      bio: 'Mostafa Ronaghi, Ph.D., is the co-founder and Executive Board Member of Cellanome. Prior to founding Cellanome, Mostafa served as SVP and Chief Technology Officer at Illumina for over a decade and co-founded both the Illumina Accelerator and GRAIL. He has co-founded four additional biotech companies, leading each to successful exits. Mostafa holds more than 30 patents, has authored over 50 peer-reviewed publications, and was a principal investigator at Stanford University\'s Genome Center.',
    },
    {
      nm: 'David Ko', init: 'DK', img: '/assets/david-ko.png',
      role: 'Former CEO, Calm; Former COO, Zynga',
      focus: 'Life Sciences Fund',
      linkedin: 'https://linkedin.com/in/daveko/',
      bio: 'David Ko co-founded Ripple Health Group, a health-tech startup acquired by Calm in 2022, where he subsequently served as CEO and Board Member through early 2026. Earlier in his career, he spent over 10 years at Yahoo as SVP of Audience, Mobile, and Local businesses, then served as Chief Mobile Officer and COO at Zynga during the company\'s 2011 IPO. He serves as a Member of NYU\'s Board of Trustees and board member of the NYU Stern Venture Fellows program.',
    },
  ];

  return (
    <section className="section section--white" id="team">
      <div className="wrap">
        <div className="section-head" style={{maxWidth:760}}>
          <span className="eyebrow">The partnership</span>
          <h2>Operators. Investors.</h2>
          <p style={{fontFamily:'var(--font-serif)',fontWeight:300,fontSize:17,color:'var(--slate-600)',lineHeight:1.7,margin:'20px 0 0'}}>
            Catapult Capital's partners have advised and executed on some of the largest transactions in the technology sector, scaled early and late-stage enterprises, and founded and exited market-defining platforms as principals. The firm's execution thesis brings a distinct operational perspective to underwriting because it is rooted in direct experience as executives, owners, and operators — not just financial deal-makers. This structural combination delivers the institutional capacity to execute highly complex corporate transformations while providing definitive strategic, financial, and technical direction alongside management teams to maximize long-term value.
          </p>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:0,marginBottom:80}}>
          {partners.map((p, i) => (
            <div className="member partner-row" key={p.nm}
                 style={{display:'grid',gridTemplateColumns:'240px 1fr',gap:48,padding:'44px 0',borderTop: i === 0 ? 'none' : '1px solid var(--border)'}}>
              <div>
                <MemberPhoto img={p.img} init={p.init} />
              </div>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:2}}>
                  <div className="nm" style={{margin:0,fontSize:22}}>{p.nm}</div>
                  {p.linkedin && (
                    <a href={p.linkedin} target="_blank" rel="noopener noreferrer"
                       style={{color:'var(--slate-400)',flexShrink:0,display:'flex',alignItems:'center'}}>
                      <IconLinkedIn size={14} />
                    </a>
                  )}
                </div>
                <div className="role" style={{fontSize:13.5,marginBottom:18}}>{p.role}</div>
                {p.bio.map((para, j) => (
                  <p key={j} style={{fontSize:14.5,color:'var(--slate-600)',lineHeight:1.7,margin: j === 0 ? '0 0 14px' : '0 0 14px'}}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{borderTop:'1px solid var(--border)',paddingTop:56,marginTop:16}}>
          <div style={{marginBottom:40}}>
            <span className="eyebrow">Strategic Advisors & SPV Partners</span>
            <h2 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:'var(--text-2xl)',lineHeight:1.15,letterSpacing:'-.01em',margin:'14px 0 0'}}>The network behind the deals.</h2>
          </div>
          <div className="advisor-grid" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:28}}>
            {advisors.map(a => (
              <div key={a.nm} className="advisor-card" style={{display:'flex',gap:24,padding:'28px',background:'var(--paper)',border:'1px solid var(--border)',borderRadius:8,borderTop:'3px solid var(--navy-200)'}}>
                <div style={{width:96,height:96,borderRadius:8,overflow:'hidden',flexShrink:0,background:'var(--navy-100)'}}>
                  <MemberPhoto img={a.img} init={a.init} />
                </div>
                <div style={{minWidth:0}}>
                  <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
                    <div style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:18,color:'var(--ink)'}}>{a.nm}</div>
                    <a href={a.linkedin} target="_blank" rel="noopener noreferrer"
                       style={{color:'var(--slate-400)',display:'flex',alignItems:'center',flexShrink:0}}>
                      <IconLinkedIn size={13} />
                    </a>
                  </div>
                  <div style={{fontSize:13,color:'var(--slate-600)',lineHeight:1.4,marginBottom:6}}>{a.role}</div>
                  <div style={{fontSize:10,fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.12em',color:'var(--navy-600)',marginBottom:12}}>{a.focus}</div>
                  <p style={{fontSize:13.5,color:'var(--slate-600)',lineHeight:1.6,margin:0}}>{a.bio}</p>
                </div>
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
    { pub: 'Catapult Capital', title: 'Cellanome: The Platform for Living Biology', date: '2026', href: '/insights/cellanome' },
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
        <div className="news-grid">
          {items.map((item, i) => {
            const inner = (
              <>
                <div style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.12em',fontSize:10,color:'var(--navy-600)',marginBottom:8}}>{item.pub}</div>
                <div style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:16,lineHeight:1.4,color:'var(--ink)',marginBottom:8}}>{item.title}</div>
                <div style={{fontSize:12,color:'var(--slate-400)',fontFamily:'var(--font-mono)'}}>{item.date}</div>
              </>
            );
            return item.href
              ? <a key={i} className="news-cell" href={item.href}>{inner}</a>
              : <div key={i} className="news-cell">{inner}</div>;
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

/* ---- Page ---- */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showRequest, setShowRequest] = useState(false);

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
      <Portfolio />
      <Team />
      <News />
      <CTA onRequest={() => setShowRequest(true)} />
      <Footer />
      {showRequest && <RequestModal onClose={() => setShowRequest(false)} />}
    </div>
  );
}

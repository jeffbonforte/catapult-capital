import Link from 'next/link'
import ScrollFx from '../../ScrollFx'
import '../../website.css'

export const metadata = {
  title: 'Moving the Lab to the Patient: Why We Invested in Genalyte | Catapult Capital',
  description: 'Catapult Capital explains its investment in Genalyte and the company\'s vision for decentralized, automated diagnostic blood testing.',
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.16em',fontSize:10,color:'var(--slate-400)',marginBottom:14}}>{children}</div>
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:26,margin:'0 0 20px',color:'var(--ink)',letterSpacing:'-.01em',lineHeight:1.2}}>{children}</h2>
}

export default function GenalytePage() {
  const thesis = [
    { n: '01', label: 'Demand', head: 'A Market Already in Motion', body: 'The number of blood tests performed per patient in the U.S. has more than doubled over the last seven years. We believe it is likely to double again as wearables, CGMs, and consumer health tracking normalize continuous data. Blood diagnostics are the natural next frontier — but the current infrastructure was not built for that volume or that speed.' },
    { n: '02', label: 'Infrastructure', head: 'The System Is the Problem', body: 'Healthcare systems face persistent lab staffing shortages, rising costs, and reimbursement pressure. Many locations — especially rural and remote communities — simply cannot build and staff traditional labs. Genalyte addresses these constraints at the infrastructure level, not through incremental improvement but through a new delivery model.' },
    { n: '03', label: 'Platform', head: 'Merlin and Maverick', body: 'Merlin is not just a faster version of existing point-of-care devices. It is an automated lab system combining chemistry, hematology, and immunoassay testing with EMR integration, designed to reduce the labor burden of traditional diagnostic workflows. Maverick, the immunoassay platform, uses silicon photonics and photonic ring resonance — a flexible, expanding foundation that is not limited to one fixed menu.' },
    { n: '04', label: 'Access', head: 'Closing the Gap', body: 'We are especially interested in the potential in underserved settings. Rural and remote communities face the greatest barriers to care: fewer clinicians, fewer labs, longer travel, delayed results. A fully automated onsite lab can expand access without requiring every clinic to build traditional laboratory infrastructure. Advanced diagnostics can go where patients already are.' },
  ]

  return (
    <div style={{minHeight:'100vh',background:'var(--paper)',fontFamily:'var(--font-sans)'}}>
      <ScrollFx />
      {/* Top bar */}
      <div style={{background:'rgba(255,255,255,.92)',backdropFilter:'blur(8px)',borderBottom:'1px solid var(--border)',position:'sticky',top:0,zIndex:40}}>
        <div style={{maxWidth:'var(--container)',margin:'0 auto',padding:'0 32px',height:66,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href="/"><img src="/assets/catapult-logo-horizontal.png" alt="Catapult Capital" style={{height:22,display:'block'}} /></Link>
          <Link href="/#insights" style={{fontSize:13,color:'var(--slate-600)',textDecoration:'none'}}>← Back to insights</Link>
        </div>
      </div>

      {/* Hero header */}
      <div className="article-hero" style={{background:'linear-gradient(150deg,#0E2E54,#0B2545)',color:'#fff'}}>
        <div style={{maxWidth:760,margin:'0 auto'}}>
          <div style={{display:'flex',gap:10,marginBottom:24,flexWrap:'wrap'}}>
            {['Life Sciences','Active Investment','Diagnostics'].map(tag => (
              <span key={tag} style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.12em',fontSize:10,color:'#9FB6D9',border:'1px solid rgba(159,182,217,.3)',borderRadius:20,padding:'4px 12px'}}>{tag}</span>
            ))}
          </div>
          <h1 style={{fontFamily:'var(--font-serif)',fontWeight:400,fontSize:'clamp(32px,5vw,52px)',lineHeight:1.08,letterSpacing:'-.015em',margin:'0 0 20px'}}>
            Moving the Lab to the Patient: Why We Invested in Genalyte
          </h1>
          <p style={{fontFamily:'var(--font-serif)',fontWeight:300,fontSize:19,color:'#C9D7EA',lineHeight:1.6,margin:'0 0 24px',maxWidth:600}}>
            Genalyte is building the infrastructure for a future where laboratory-quality diagnostics are available at the point of care — in minutes, not days.
          </p>
          <div style={{fontSize:13,color:'#9FB6D9'}}>By Catapult Capital · 2025</div>
        </div>
      </div>

      <div className="article-body">

        {/* Intro */}
        <div style={{fontSize:17,lineHeight:1.75,color:'var(--slate-700)',fontFamily:'var(--font-serif)',fontWeight:300,marginBottom:64}} data-reveal="1">
          <p>We are excited to announce our investment in Genalyte, a company we believe has the potential to change one of the most important, and still surprisingly inefficient, parts of healthcare: diagnostic blood testing.</p>
          <p>For decades, the standard model has been to draw blood in one location, ship it to a centralized laboratory, process the sample, and then send the result back to the physician days later. That model has served healthcare for a long time, but it creates friction at exactly the moment when speed and clarity matter most. Patients leave the office without answers. Physicians make decisions with incomplete information. Follow-up calls are missed. Additional visits are required. Diagnoses are delayed. Treatment is postponed.</p>
        </div>

        {/* The Vision */}
        <div style={{marginBottom:64}} data-reveal="1">
          <SectionLabel>The Vision</SectionLabel>
          <H2>Move data, not blood.</H2>

          {/* Pull quote */}
          <div style={{background:'linear-gradient(150deg,#0E2E54,#0B2545)',borderRadius:10,padding:'36px 40px',marginBottom:32,color:'#fff'}}>
            <p style={{fontFamily:'var(--font-serif)',fontWeight:300,fontSize:24,lineHeight:1.55,margin:'0 0 16px',color:'#EAF0F8',fontStyle:'italic'}}>
              "Move data, not blood."
            </p>
            <div style={{fontSize:12,fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.14em',color:'#9FB6D9'}}>
              Genalyte's core philosophy
            </div>
          </div>

          <div style={{fontSize:16,lineHeight:1.75,color:'var(--slate-700)',fontFamily:'var(--font-serif)',fontWeight:300}}>
            <p>The company's Merlin system is designed to be a fully automated, onsite laboratory that can deliver a broad menu of blood test results in about 30 minutes. Instead of sending samples away, Merlin brings laboratory testing directly to the point of care: physician offices, clinics, rural health centers, urgent care centers, pharmacies, employer clinics, and other locations where patients already receive care.</p>
          </div>
        </div>

        {/* The Opportunity */}
        <div style={{marginBottom:64}} data-reveal="1">
          <SectionLabel>The Opportunity</SectionLabel>
          <H2>A system not built for the future it's heading toward.</H2>

          {/* Stats callout */}
          <div className="ig3" style={{marginBottom:32}}>
            {[
              { v: '2×', l: 'Blood tests per patient in the last 7 years' },
              { v: '~30 min', l: 'Time to results with Merlin, vs. days today' },
              { v: '85%+', l: 'Of standard primary care panels covered' },
            ].map(s => (
              <div key={s.l} style={{background:'#fff',padding:'24px 22px'}}>
                <div style={{fontFamily:'var(--font-mono)',fontWeight:500,fontSize:28,color:'var(--navy-600)',marginBottom:8}}>{s.v}</div>
                <div style={{fontSize:13,color:'var(--slate-600)',lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{fontSize:16,lineHeight:1.75,color:'var(--slate-700)',fontFamily:'var(--font-serif)',fontWeight:300}}>
            <p>We believe this matters because demand for blood testing is growing rapidly. Patients increasingly want more data, more frequently, to understand their health, prevent disease, and manage chronic conditions. We already see this in wearables, continuous glucose monitors, sleep tracking, fitness data, and at-home testing. Blood diagnostics are a natural next frontier.</p>
            <p>But the current system is not built for that future. Healthcare systems are facing persistent labor shortages, rising costs, reimbursement pressure, and increasing demand for convenience. Laboratory staffing is a particular bottleneck. Many locations simply do not have enough trained personnel to run traditional labs, and rural or remote communities are often forced to rely on distant centralized facilities. Every extra mile a sample travels, every additional handoff, and every delay increases cost and complexity.</p>
          </div>
        </div>

        {/* The Platform */}
        <div style={{marginBottom:64}} data-reveal="1">
          <SectionLabel>The Platform</SectionLabel>
          <H2>Merlin and Maverick.</H2>
          <div style={{display:'grid',gap:16,marginBottom:32}}>
            <div style={{padding:'22px 24px',background:'#fff',border:'1px solid var(--border)',borderRadius:8}}>
              <div style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.12em',fontSize:10,color:'var(--navy-600)',marginBottom:8}}>Merlin System</div>
              <div style={{fontSize:15,lineHeight:1.65,color:'var(--slate-700)',fontFamily:'var(--font-serif)',fontWeight:300}}>Merlin is not just another point-of-care device. It is an automated lab system that combines chemistry, hematology, and immunoassay testing, integrates with electronic medical records, and is designed to reduce the labor burden associated with traditional diagnostic workflows. The result is a system that can bring high-quality testing closer to the patient while making care delivery simpler and more efficient for providers.</div>
            </div>
            <div style={{padding:'22px 24px',background:'#fff',border:'1px solid var(--border)',borderRadius:8}}>
              <div style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.12em',fontSize:10,color:'var(--navy-600)',marginBottom:8}}>Maverick Platform</div>
              <div style={{fontSize:15,lineHeight:1.65,color:'var(--slate-700)',fontFamily:'var(--font-serif)',fontWeight:300}}>Maverick uses silicon photonics and photonic ring resonance to measure protein binding on a miniature chip, supporting rapid, multiplexed immunoassay testing in a compact format. Immunoassays are central to the most important diagnostic categories: hormones, infectious disease, autoimmune conditions, inflammation, cardiovascular markers, and oncology. Maverick is not limited to one narrow use case — it is a flexible, expanding platform that grows in value as its test menu grows.</div>
            </div>
          </div>
        </div>

        {/* What It Means for Patients */}
        <div style={{marginBottom:64}} data-reveal="1">
          <SectionLabel>Clinical Impact</SectionLabel>
          <H2>The most compelling part is what it means for patients.</H2>

          {/* Pull quote */}
          <div style={{borderLeft:'3px solid var(--navy-600)',paddingLeft:28,marginBottom:28}}>
            <p style={{fontFamily:'var(--font-serif)',fontWeight:300,fontSize:19,lineHeight:1.65,color:'var(--ink)',margin:'0 0 10px',fontStyle:'italic'}}>
              "Instead of 'we'll call you in a few days,' the conversation becomes 'let's look at your results now.'"
            </p>
          </div>

          <div style={{fontSize:16,lineHeight:1.75,color:'var(--slate-700)',fontFamily:'var(--font-serif)',fontWeight:300,marginBottom:28}}>
            <p>When results are available during the visit, the physician and patient can discuss them immediately. Treatment can begin sooner. Medication can be adjusted sooner. Patients who might otherwise go undiagnosed or undertreated have a better chance of receiving care while they are still in front of a clinician.</p>
          </div>

          <div className="ig2 ig2--tight">
            {['Diabetes','Thyroid disease','Anemia','Kidney and liver abnormalities','Cardiovascular risk','Autoimmune disease','Infectious disease','Oncology markers'].map(c => (
              <div key={c} style={{padding:'12px 16px',background:'#fff',border:'1px solid var(--border)',borderRadius:6,fontSize:14,color:'var(--slate-700)',display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'var(--navy-600)',flexShrink:0}} />
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Underserved Communities */}
        <div style={{marginBottom:64,background:'var(--navy-50)',border:'1px solid var(--navy-100)',borderRadius:10,padding:'32px'}} data-reveal="1">
          <SectionLabel>Access</SectionLabel>
          <H2>Expanding care in underserved communities.</H2>
          <div style={{fontSize:16,lineHeight:1.75,color:'var(--slate-700)',fontFamily:'var(--font-serif)',fontWeight:300}}>
            <p>Rural and remote communities often face the greatest barriers to care, including fewer clinicians, fewer laboratories, longer travel distances, and delayed access to results. A fully automated onsite lab can help change that. It can expand access without requiring every clinic to build and staff a traditional laboratory. It can make advanced diagnostics available in locations where they were previously impractical.</p>
          </div>
        </div>

        {/* Investment Thesis */}
        <div style={{marginBottom:64}} data-reveal="1">
          <SectionLabel>Our Investment Thesis</SectionLabel>
          <H2>Why We Invested</H2>
          <div className="ig2" style={{marginBottom:32}}>
            {thesis.map(t => (
              <div key={t.n} style={{padding:'24px',background:'#fff',border:'1px solid var(--border)',borderRadius:8,borderTop:'3px solid var(--navy-600)'}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--navy-400)'}}>{t.n}</span>
                  <span style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.12em',fontSize:10,color:'var(--navy-600)'}}>{t.label}</span>
                </div>
                <div style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:16,marginBottom:10,color:'var(--ink)'}}>{t.head}</div>
                <div style={{fontSize:14,lineHeight:1.65,color:'var(--slate-600)'}}>{t.body}</div>
              </div>
            ))}
          </div>

          <div style={{background:'linear-gradient(150deg,#0E2E54,#0B2545)',borderRadius:10,padding:'32px',color:'#fff'}}>
            <p style={{fontFamily:'var(--font-serif)',fontWeight:300,fontSize:20,lineHeight:1.6,margin:0,color:'#EAF0F8'}}>
              Genalyte sits at the intersection of decentralization, automation, connectivity, and access. The company is building a new model for diagnostics — one where laboratory-quality testing moves to the patient, results arrive at the speed of care, and more people get answers before conditions go undiagnosed. That is the future we want to help build.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{paddingTop:40,borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
          <div>
            <div style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:18,marginBottom:4}}>Genalyte</div>
            <div style={{fontSize:13,color:'var(--slate-500)'}}>Active portfolio company · Life Sciences / Diagnostics</div>
          </div>
          <Link href="/" style={{fontFamily:'var(--font-sans)',fontWeight:600,fontSize:14,color:'var(--navy-600)',textDecoration:'none',border:'1px solid var(--border-strong)',borderRadius:6,padding:'10px 18px'}}>
            ← Back to Catapult Capital
          </Link>
        </div>
      </div>
    </div>
  )
}

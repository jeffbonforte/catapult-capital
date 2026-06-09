import Link from 'next/link'
import '../../website.css'

export const metadata = {
  title: 'Moving the Lab to the Patient: Why We Invested in Genalyte | Catapult Capital',
  description: 'Catapult Capital explains its investment in Genalyte and the company\'s vision for decentralized, automated diagnostic blood testing.',
}

export default function GenalytePage() {
  return (
    <div style={{minHeight:'100vh',background:'var(--paper)',fontFamily:'var(--font-sans)'}}>
      {/* Top bar */}
      <div style={{background:'rgba(255,255,255,.92)',backdropFilter:'blur(8px)',borderBottom:'1px solid var(--border)',position:'sticky',top:0,zIndex:40}}>
        <div style={{maxWidth:'var(--container)',margin:'0 auto',padding:'0 32px',height:66,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href="/">
            <img src="/assets/catapult-logo-horizontal.png" alt="Catapult Capital" style={{height:22,display:'block'}} />
          </Link>
          <Link href="/#insights" style={{fontSize:13,color:'var(--slate-600)',textDecoration:'none'}}>← Back to insights</Link>
        </div>
      </div>

      {/* Article */}
      <article style={{maxWidth:720,margin:'0 auto',padding:'72px 32px 120px'}}>

        {/* Header */}
        <div style={{marginBottom:48}}>
          <div style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.14em',fontSize:11,color:'var(--navy-600)',marginBottom:16}}>
            Investment Deep Dive · Life Sciences
          </div>
          <h1 style={{fontFamily:'var(--font-serif)',fontWeight:400,fontSize:'clamp(30px,5vw,48px)',lineHeight:1.1,letterSpacing:'-.015em',color:'var(--ink)',margin:'0 0 24px'}}>
            Moving the Lab to the Patient: Why We Invested in Genalyte
          </h1>
          <div style={{display:'flex',alignItems:'center',gap:16,paddingBottom:24,borderBottom:'1px solid var(--border)'}}>
            <div style={{fontSize:13,color:'var(--slate-500)'}}>Catapult Capital</div>
            <div style={{width:3,height:3,borderRadius:'50%',background:'var(--slate-300)'}} />
            <div style={{fontSize:13,color:'var(--slate-500)',fontFamily:'var(--font-mono)'}}>2025</div>
          </div>
        </div>

        {/* Body */}
        <div style={{fontSize:17,lineHeight:1.75,color:'var(--slate-700)',fontFamily:'var(--font-serif)',fontWeight:300}}>

          <p>We are excited to announce our investment in Genalyte, a company we believe has the potential to change one of the most important, and still surprisingly inefficient, parts of healthcare: diagnostic blood testing.</p>

          <p>For decades, the standard model has been to draw blood in one location, ship it to a centralized laboratory, process the sample, and then send the result back to the physician days later. That model has served healthcare for a long time, but it creates friction at exactly the moment when speed and clarity matter most. Patients leave the office without answers. Physicians make decisions with incomplete information. Follow-up calls are missed. Additional visits are required. Diagnoses are delayed. Treatment is postponed.</p>

          <h2 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:26,margin:'48px 0 16px',color:'var(--ink)',letterSpacing:'-.01em'}}>Genalyte's vision is different: move data, not blood.</h2>

          <p>The company's Merlin system is designed to be a fully automated, onsite laboratory that can deliver a broad menu of blood test results in about 30 minutes. Instead of sending samples away, Merlin brings laboratory testing directly to the point of care: physician offices, clinics, rural health centers, urgent care centers, pharmacies, employer clinics, and other locations where patients already receive care.</p>

          <p>We believe this matters because demand for blood testing is growing rapidly. In the U.S., the number of blood tests performed per patient has more than doubled over the last seven years. We believe it is likely to double again over the next seven years as the broader consumerization of health continues. Patients increasingly want more data, more frequently, to understand their health, prevent disease, and manage chronic conditions. We already see this in wearables, continuous glucose monitors, sleep tracking, fitness data, and at-home testing. Blood diagnostics are a natural next frontier.</p>

          <p>But the current system is not built for that future.</p>

          <p>Healthcare systems are facing persistent labor shortages, rising costs, reimbursement pressure, and increasing demand for convenience. Laboratory staffing is a particular bottleneck. Many locations simply do not have enough trained personnel to run traditional labs, and rural or remote communities are often forced to rely on distant centralized facilities. Every extra mile a sample travels, every additional handoff, and every delay increases cost and complexity.</p>

          <p>Genalyte addresses these problems at the infrastructure level. Merlin is not just another point-of-care device. It is an automated lab system that combines chemistry, hematology, and immunoassay testing, integrates with electronic medical records, and is designed to reduce the labor burden associated with traditional diagnostic workflows. The result is a system that can bring high-quality testing closer to the patient while making care delivery simpler and more efficient for providers.</p>

          <h2 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:26,margin:'48px 0 16px',color:'var(--ink)',letterSpacing:'-.01em'}}>The most compelling part of this opportunity is what it can mean for patients.</h2>

          <p>When results are available during the visit, the physician and patient can discuss them immediately. That creates a different kind of clinical encounter. Instead of "we'll call you in a few days," the conversation becomes "let's look at your results now." Treatment can begin sooner. Medication can be adjusted sooner. Follow-up testing can be ordered sooner. Patients who might otherwise go undiagnosed or undertreated have a better chance of receiving care while they are still in front of a clinician.</p>

          <p>That matters for a wide range of conditions: diabetes, thyroid disease, anemia, kidney and liver abnormalities, cardiovascular risk, autoimmune disease, infectious disease, and many others. In many cases, faster results do not just improve convenience. They can improve adherence, reduce missed follow-up, and help clinicians intervene earlier.</p>

          <p>We are especially excited about the potential in underserved settings. Rural and remote communities often face the greatest barriers to care, including fewer clinicians, fewer laboratories, longer travel distances, and delayed access to results. A fully automated onsite lab can help change that. It can expand access without requiring every clinic to build and staff a traditional laboratory. It can make advanced diagnostics available in locations where they were previously impractical.</p>

          <h2 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:26,margin:'48px 0 16px',color:'var(--ink)',letterSpacing:'-.01em'}}>The Maverick platform.</h2>

          <p>The other major reason we invested is Maverick, Genalyte's immunoassay testing platform. Maverick uses silicon photonics and photonic ring resonance to measure protein binding on a miniature chip. In practice, that means it can support rapid, multiplexed immunoassay testing in a compact format. This is powerful because immunoassays are central to many of the most important diagnostic categories, including hormones, infectious disease, autoimmune conditions, inflammation, cardiovascular markers, and oncology-related tests.</p>

          <p>Maverick gives Genalyte flexibility. It is not limited to one narrow use case or one fixed menu. The platform has already supported a wide range of immunoassay development, and we believe it can continue expanding into additional high-value and potentially life-saving tests over time. As the menu grows, the value of an onsite automated lab grows with it.</p>

          <p>That expanding menu is critical. A faster lab is valuable. A faster lab with a broad and growing test menu is transformative. It creates the possibility of delivering more of the diagnostic information physicians need during the patient visit, instead of days later. It also gives Genalyte a path to support both routine testing and more advanced diagnostics from the same core platform.</p>

          <h2 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:26,margin:'48px 0 16px',color:'var(--ink)',letterSpacing:'-.01em'}}>Looking ahead.</h2>

          <p>Our investment in Genalyte reflects a simple belief: the future of diagnostics will be more decentralized, more automated, more connected, and closer to the patient.</p>

          <p>A world with more testing requires lower-friction testing. A world with fewer lab technicians requires more automation. A world where patients expect timely answers requires infrastructure that can deliver results at the speed of care. And a world where many communities still struggle with access requires diagnostic systems that can be placed where patients actually are.</p>

          <p>Genalyte sits at the intersection of all of these trends.</p>

          <p>The company is building more than a faster blood testing system. It is building a new model for diagnostics: one where laboratory-quality testing can move from centralized infrastructure to the point of care; where results can be available in minutes, not days; where providers can make better decisions during the visit; and where more patients can get the answers they need before conditions go undiagnosed or undertreated.</p>

          <p style={{fontStyle:'italic',color:'var(--navy-700)',fontWeight:400}}>That is the future we want to help build.</p>
        </div>

        {/* Footer CTA */}
        <div style={{marginTop:64,paddingTop:40,borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
          <div>
            <div style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:18,marginBottom:4}}>Genalyte</div>
            <div style={{fontSize:13,color:'var(--slate-500)'}}>Active portfolio company · Life Sciences / Diagnostics</div>
          </div>
          <Link href="/" style={{fontFamily:'var(--font-sans)',fontWeight:600,fontSize:14,color:'var(--navy-600)',textDecoration:'none',border:'1px solid var(--border-strong)',borderRadius:6,padding:'10px 18px'}}>
            ← Back to Catapult Capital
          </Link>
        </div>
      </article>
    </div>
  )
}

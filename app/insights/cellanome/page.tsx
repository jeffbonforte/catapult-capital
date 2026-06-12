import Link from 'next/link'
import ScrollFx from '../../ScrollFx'
import OrgLogo from '../OrgLogo'
import '../../website.css'

export const metadata = {
  title: 'Cellanome: The Platform for Living Biology | Catapult Capital',
  description: 'How CellCage Enclosure technology makes it possible to watch, perturb, and molecularly profile the same living cells over time, and why we invested.',
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.14em',fontSize:11,color:'var(--navy-600)',marginBottom:16}}>{children}</div>
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.16em',fontSize:10,color:'var(--slate-400)',marginBottom:14}}>{children}</div>
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:26,margin:'0 0 20px',color:'var(--ink)',letterSpacing:'-.01em',lineHeight:1.2}}>{children}</h2>
}

export default function CellanomePage() {
  const publications = [
    {
      venue: 'bioRxiv · May 2026',
      title: 'Scalable longitudinal imaging and transcriptomics of cells in dynamic enclosures',
      desc: 'Identifies an adaptive drug-resistant state in lung cancer cells, characterized by potassium channel upregulation and p53-dependent quiescence, that was invisible to transcriptomics alone. In models of adipogenesis and microglial phagocytosis, joint analysis of imaging and transcriptomic data revealed key drivers of cellular function missed by transcriptomic clustering alone. Co-authored with researchers from the Salk Institute, UCSF, and other leading institutions.',
    },
    {
      venue: 'bioRxiv · May 2026',
      title: 'Linking live-cell behavior to transcriptional responses across perturbations using dynamic caging',
      desc: 'Introduces PERTURB-LINK, a novel pooled CRISPR screening technology using CCEs. Discovers morphological and proteomic features linked to immune-suppressive gene expression in human primary regulatory T cells, and inflammatory gene modules in human colonic fibroblasts, none of which had a path to discovery on prior platforms.',
    },
    {
      venue: 'SITC / J Immunother Cancer · November 2025',
      title: 'Leveraging a Novel, Multi-Modal Platform to Identify Drug Resistant Clones with Distinct Mechanisms of Resistance to EGFR Inhibitors',
      desc: 'Tracks tens of thousands of lung cancer cells under EGFR inhibitor treatment, identifying four phenotypically and molecularly distinct resistant subpopulations. Demonstrates that conventional endpoint approaches would have obscured the heterogeneity and missed the resistance mechanisms.',
    },
    {
      venue: 'SITC / J Immunother Cancer · 2025',
      title: 'Unveiling genes in dendritic cells that enhance T cell priming through functional multiplexed single cell-cell interaction analysis',
      desc: 'Uses a specialized CCE format to measure paracrine signaling and contact-dependent activation between dendritic cells and T cells at single-cell resolution, identifying gene programs that govern T cell priming efficacy.',
    },
    {
      venue: 'AACR / Cancer Research · April 2025',
      title: 'Establishing a multi-modal, cell therapy characterization workflow to identify cell subsets with heightened cytotoxicity',
      desc: 'Houston Methodist Research Institute researchers used the R3200 to identify cytotoxic T cell subsets with approximately 85% accuracy, comparable to flow cytometry, while simultaneously capturing the transcriptional identity of the same cells.',
    },
  ]

  const traction = [
    { name: 'UCSF', logo: '/assets/logo-ucsf.png', desc: 'Matthew Spitzer lab, immune cell interaction and T cell functional heterogeneity studies, with multiple publications in progress.' },
    { name: 'Salk Institute', logo: '/assets/logo-salk.png', desc: 'Gage and Ecker labs, neurosphere formation and neuroscience applications, including co-authorship on the May 2026 bioRxiv preprint.' },
    { name: 'Genentech', logo: '/assets/logo-genentech.png', desc: 'Using the R3200 for pooled CRISPR screening, linking genetic perturbations to cell morphology, protein expression, and transcriptome in the same single cells.' },
    { name: 'VIB Technologies', logo: '/assets/logo-vib.png', desc: 'First European installation. Cellanome\'s initial foothold in the European life sciences research market.' },
    { name: 'Psomagen', logo: '/assets/logo-psomagen.png', desc: 'Offering the R3200 as a service, making Cellanome\'s single-cell assays available to academic, pharma, and biotech clients through its Single Cell & Spatial Biology Center of Excellence.' },
    { name: 'Duke University', logo: '/assets/logo-duke.png', desc: 'CRISPR screening and phenotype-to-function mapping in cell biology and genomics research.' },
  ]

  const team = [
    { nm: 'Omead Ostadan', role: 'President and CEO', img: '/assets/cellanome-omead-ostadan.jpg', desc: 'Former SVP of Products, Marketing and Strategic Planning at Illumina. Built the product organization that commercialized Illumina\'s most important platforms during its defining years of global expansion. Now leading Cellanome from stealth through commercialization.' },
    { nm: 'Mostafa Ronaghi', role: 'Co-Founder and Executive Board Member', img: '/assets/cellanome-mostafa-ronaghi.jpg', desc: 'Inventor of pyrosequencing and former CTO of Illumina during its most formative growth period. Co-founded GRAIL. One of the most prolific inventors in the history of life sciences tools, with a track record of building platforms that define new fields.' },
    { nm: 'Jay Flatley', role: 'Chairman', img: '/assets/cellanome-jay-flatley.jpg', desc: 'CEO of Illumina for nearly two decades. Built the commercial engine, channel relationships, and scientific credibility that turned sequencing into universal biology infrastructure, growing revenue from $200M to over $4B while costs fell more than 10,000×.' },
  ]

  const thesis = [
    { n: '01', label: 'Technology', head: 'The Hard Part Is Done', body: 'Two landmark bioRxiv preprints published in May 2026 validate the platform across cancer, immunology, neuroscience, and aging, generating insights unavailable on any prior technology. The R3200 is installed at leading institutions generating real experimental data. The core technical challenges — live-cell culture at scale, same-cell molecular linkage, and compatibility with adherent cell types — are solved. Cellanome is in active commercialization.' },
    { n: '02', label: 'Team', head: 'A Bench Built for Scale', body: 'Beyond the founding trio, Cellanome has assembled a leadership team built for execution. Gary Schroth, former Distinguished Fellow at Illumina, serves as Chief Science Officer. Tarun Khurana, primary inventor on the CellCage Enclosure patent portfolio, is CTO. Vern Norviel, who led the life sciences IP practice at Wilson Sonsini for three decades, joined as General Counsel. Each has industrialized complex life sciences platforms before.' },
    { n: '03', label: 'Timing', head: 'The Demand Is Real and Growing', body: 'Single-cell biology is at an inflection point. The questions that cell therapy developers, immuno-oncology programs, and neuroscience labs are working to answer require dynamic, same-cell data. AI-driven drug discovery is generating additional demand for precisely the kind of longitudinal, multimodal datasets Cellanome produces. The platform reached commercial readiness at the moment the market became ready to absorb it.' },
    { n: '04', label: 'Platform', head: 'The Illumina Playbook, Applied to Cells', body: 'The commercial logic follows the model the founding team built at Illumina: instrument placements create consumable pull-through, consumable pull-through builds recurring revenue, and recurring revenue compounds over time. As the installed base grows, Cellanome accumulates a proprietary dataset of live-cell behavior with compounding value for AI-driven biology. The same team that ran this playbook for genomes is running it for cells.' },
  ]

  return (
    <div style={{minHeight:'100vh',background:'var(--paper)',fontFamily:'var(--font-sans)'}}>
      <ScrollFx />
      {/* Top bar */}
      <div style={{background:'rgba(255,255,255,.92)',backdropFilter:'blur(8px)',borderBottom:'1px solid var(--border)',position:'sticky',top:0,zIndex:40}}>
        <div style={{maxWidth:'var(--container)',margin:'0 auto',padding:'0 32px',height:66,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href="/"><img src="/assets/catapult-logo-horizontal-transparent.png" alt="Catapult Capital" style={{height:29,display:'block'}} /></Link>
          <Link href="/#insights" style={{fontSize:13,color:'var(--slate-600)',textDecoration:'none'}}>← Back to insights</Link>
        </div>
      </div>

      {/* Hero header */}
      <div className="article-hero" style={{background:'linear-gradient(150deg,#0E2E54,#0B2545)',color:'#fff'}}>
        <div style={{maxWidth:760,margin:'0 auto'}}>
          <div style={{display:'flex',gap:10,marginBottom:24,flexWrap:'wrap'}}>
            {['Life Sciences','Active Investment','Platform Technology'].map(tag => (
              <span key={tag} style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.12em',fontSize:10,color:'#9FB6D9',border:'1px solid rgba(159,182,217,.3)',borderRadius:20,padding:'4px 12px'}}>{tag}</span>
            ))}
          </div>
          <h1 style={{fontFamily:'var(--font-serif)',fontWeight:400,fontSize:'clamp(32px,5vw,52px)',lineHeight:1.08,letterSpacing:'-.015em',margin:'0 0 20px'}}>
            Cellanome: The Platform for Living Biology
          </h1>
          <p style={{fontFamily:'var(--font-serif)',fontWeight:300,fontSize:19,color:'#C9D7EA',lineHeight:1.6,margin:'0 0 24px',maxWidth:600}}>
            How CellCage Enclosure technology makes it possible to watch, perturb, and molecularly profile the same living cells over time, and why we invested.
          </p>
          <div style={{fontSize:13,color:'#9FB6D9'}}>By Catapult Capital · 2026</div>
        </div>
      </div>

      <div className="article-body">

        {/* Intro */}
        <div style={{fontSize:17,lineHeight:1.75,color:'var(--slate-700)',fontFamily:'var(--font-serif)',fontWeight:300,marginBottom:64}} data-reveal="1">
          <p>One of the biggest technical limitations in cell biology has been the inability to measure how cells behave, and how they interact with neighboring cells, longitudinally and at scale. That limitation has forced researchers into an unwelcome tradeoff: using terminal assays that capture single cells across hundreds of thousands to millions of observations, but only at a single frozen point in time. The result is a limited view of cell biology, stripped of the context of time and cellular interaction.</p>
          <p>Cellanome was founded to develop, commercialize, and scale platform technologies that enable longitudinal, multimodal observation of cells and multicellular interactions, at the scale of thousands to hundreds of thousands of cells at a time. The technology has the potential to fundamentally transform our understanding of cell biology, and of biology more broadly.</p>
        </div>

        {/* The Problem */}
        <div style={{marginBottom:64}} data-reveal="1">
          <SectionLabel>The Problem</SectionLabel>
          <H2>The Cost of Working Blind</H2>
          <div style={{fontSize:16,lineHeight:1.75,color:'var(--slate-700)',fontFamily:'var(--font-serif)',fontWeight:300}}>
            <p>The life sciences industry has spent hundreds of billions of dollars on drug programs that failed in the clinic. Many of those failures share a common root: researchers selected the wrong target, the wrong patient population, or the wrong mechanism because the data they were working from was incomplete. The tools available to study cells could tell you what a cell looked like at a single point in time. They could not tell you how it behaved, how it changed under pressure, or which cells in a heterogeneous population were driving the outcome that mattered.</p>
            <p>The biological reason for this gap is straightforward. Standard molecular profiling methods require cells to be processed and lysed, which ends the experiment. This means every measurement is a one-time observation. You can characterize a population, but you cannot follow individuals. You can measure gene expression after treatment, but you cannot connect that expression to what the cell was doing in the hours before. In oncology, immunology, and neuroscience, the questions that determine whether a drug works are precisely the questions that require watching the same cell over time.</p>
            <p>Cell therapy programs have struggled to define potency assays that predict clinical response. Resistance studies have collapsed heterogeneous populations into averages that obscure the subclones that matter. Immuno-oncology trials have enrolled patients without the ability to identify, in advance, which ones would respond. All of these are, in the end, data problems: big decisions made on an incomplete picture of how cells behave.</p>
          </div>
        </div>

        {/* The Innovation */}
        <div style={{marginBottom:64}} data-reveal="1">
          <SectionLabel>The Innovation</SectionLabel>
          <H2>CellCage Enclosure Technology: Cells Stay Alive</H2>
          <div style={{fontSize:16,lineHeight:1.75,color:'var(--slate-700)',fontFamily:'var(--font-serif)',fontWeight:300,marginBottom:32}}>
            <p>CellCage Enclosure (CCE) technology solves the dead-cell problem by keeping cells intact throughout the experiment. Each cell is placed in a biocompatible, semi-permeable enclosure inside the R3200. Drugs, antibodies, and nutrients diffuse in freely. Researchers image the same cells repeatedly, tracking how they move, divide, secrete, and interact over hours, days, or weeks. When the experiment ends, each cell is sequenced in place. Every behavioral observation is linked to a molecular identity, from the same cell, across the same time course.</p>
            <p>The result is a new class of experiment. A researcher can expose T cells to tumor targets and watch which ones kill, then sequence those specific cells immediately afterward. They can treat thousands of cancer cells with a drug, track which ones survive and how they behave, and read the molecular programs driving resistance. They can culture neurons for weeks and observe how individual cells respond to disease-associated conditions. Each of these experiments previously had no equivalent.</p>
          </div>

          {/* Workflow diagram */}
          <div style={{margin:'0 0 32px',borderRadius:8,overflow:'hidden',border:'1px solid var(--border)'}}>
            <img src="/assets/cellanome-workflow.png" alt="Automated R3200 workflow: load cells, distribute to flow cell lanes, compute optimal cell selection, create micro 3D CCEs, enable longitudinal multimodal analysis" style={{width:'100%',display:'block'}} />
          </div>

          {/* Stats callout */}
          <div className="ig3" style={{marginBottom:32}}>
            {[
              { v: '10,000+', l: 'CellCage Enclosures per flow cell lane' },
              { v: '<15 min', l: 'to form CCEs via light-guided polymerization' },
              { v: '2 or 8', l: 'flow cell lane configurations' },
            ].map(s => (
              <div key={s.l} style={{background:'#fff',padding:'24px 22px'}}>
                <div style={{fontFamily:'var(--font-mono)',fontWeight:500,fontSize:28,color:'var(--navy-600)',marginBottom:8}}>{s.v}</div>
                <div style={{fontSize:13,color:'var(--slate-600)',lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* The Platform */}
        <div style={{marginBottom:64}} data-reveal="1">
          <SectionLabel>The Platform</SectionLabel>
          <H2>An Integrated System, End to End</H2>
          <div style={{fontSize:16,lineHeight:1.75,color:'var(--slate-700)',fontFamily:'var(--font-serif)',fontWeight:300,marginBottom:32}}>
            <p>The R3200 is a fully integrated platform: instrument, consumables, and cloud software designed to work together as a single system. Researchers load their cells; the platform handles isolation, imaging, perturbation, and sequencing in one run, with all data linked through a single structured data object. The commercial model this creates — instrument placements driving recurring consumable pull-through — is the same model the founding team built at Illumina.</p>
          </div>

          {/* R3200 instrument photo */}
          <div style={{margin:'0 0 32px',textAlign:'center',background:'var(--paper)',borderRadius:8,padding:'32px',border:'1px solid var(--border)'}}>
            <img src="/assets/cellanome-r3200.jpg" alt="The Cellanome R3200 instrument" style={{maxWidth:'100%',maxHeight:360,objectFit:'contain',display:'inline-block'}} />
            <div style={{fontSize:12,color:'var(--slate-400)',marginTop:12,fontFamily:'var(--font-sans)'}}>The Cellanome R3200: fully integrated instrument, consumables, and cloud software.</div>
          </div>

          {/* Quote */}
          <div style={{borderLeft:'3px solid var(--navy-600)',paddingLeft:28,margin:'0 0 0'}}>
            <p style={{fontFamily:'var(--font-serif)',fontWeight:300,fontSize:18,lineHeight:1.65,color:'var(--ink)',margin:'0 0 12px',fontStyle:'italic'}}>
              "The technology that we really wanted was not only having the ability to measure different aspects of the cell, from the surface, from secretions, from cell-cell interactions and transcriptome, but to do all of these things on the same cell. Otherwise, we are going to have a noisy signal."
            </p>
            <div style={{fontSize:11,fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.14em',color:'var(--slate-500)'}}>
              Mostafa Ronaghi, Co-Founder, Cellanome — Timmerman Report, January 2025
            </div>
          </div>
        </div>

        {/* Applications */}
        <div style={{marginBottom:64}} data-reveal="1">
          <SectionLabel>Applications</SectionLabel>
          <H2>The Questions Biology Has Always Wanted to Ask</H2>

          {/* Platform diagram */}
          <div style={{margin:'0 0 28px',borderRadius:8,overflow:'hidden',border:'1px solid var(--border)'}}>
            <img src="/assets/cellanome-platform.png" alt="Cellanome platform: cell inputs + perturbations + assays = models for disease research across neurology, autoimmunity, aging, and oncology" style={{width:'100%',display:'block'}} />
          </div>

          <div style={{display:'grid',gap:16}}>
            {[
              { area: 'Immuno-oncology', body: 'Researchers can watch T cells engage and kill tumor cells, then sequence those specific cells to identify the transcriptional programs that correlate with cytotoxic potency. The platform links functional killing behavior directly to molecular identity, generating the data needed to optimize CAR-T therapies and predict which patients will respond to checkpoint inhibitors.' },
              { area: 'Drug resistance', body: 'A 2025 SITC publication used the R3200 to track lung cancer cells treated with EGFR inhibitors. Four distinct resistant phenotypes emerged, each with a different behavioral and molecular signature. Shared resistance pathways including MAPK signaling and ABC transporter upregulation were identified. A conventional endpoint assay would have collapsed this heterogeneity into a single population average.' },
              { area: 'Neuroscience', body: 'Neurons and other adherent cell types have historically been incompatible with droplet-based single-cell platforms, which require cells to be forced into suspension. The R3200 handles them in their native state. Researchers are using the platform to study neurosphere formation and neuronal network dynamics at throughputs and resolutions previously unavailable to the field.' },
              { area: 'Cell therapy quality control', body: 'The platform links functional potency directly to transcriptional identity, creating a practical path toward regulatory submissions for cell therapy products. Researchers at Houston Methodist Research Institute characterized cytotoxic T cell populations with accuracy comparable to flow cytometry, while simultaneously capturing molecular identity from the same cells.' },
            ].map(a => (
              <div key={a.area} style={{padding:'20px 22px',background:'#fff',border:'1px solid var(--border)',borderRadius:8}}>
                <div style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.12em',fontSize:10,color:'var(--navy-600)',marginBottom:8}}>{a.area}</div>
                <div style={{fontSize:15,lineHeight:1.65,color:'var(--slate-700)',fontFamily:'var(--font-serif)',fontWeight:300}}>{a.body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Published Validation */}
        <div style={{marginBottom:64}} data-reveal="1">
          <SectionLabel>Published Validation</SectionLabel>
          <H2>The Science Is on Record</H2>
          <p style={{fontSize:16,lineHeight:1.75,color:'var(--slate-600)',fontFamily:'var(--font-serif)',fontWeight:300,marginBottom:28}}>
            Cellanome's platform has been validated through peer-reviewed publications and presented at AGBT, AACR, and SITC, among the most prestigious venues in genomics and immuno-oncology.
          </p>
          <div style={{display:'grid',gap:1,background:'var(--border)',border:'1px solid var(--border)',borderRadius:8,overflow:'hidden'}}>
            {publications.map((p, i) => (
              <div key={i} style={{background:'#fff',padding:'22px 24px'}}>
                <div style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.12em',fontSize:10,color:'var(--navy-600)',marginBottom:8}}>{p.venue}</div>
                <div style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:15,color:'var(--ink)',marginBottom:8,lineHeight:1.4}}>{p.title}</div>
                <div style={{fontSize:14,lineHeight:1.65,color:'var(--slate-600)',fontFamily:'var(--font-serif)',fontWeight:300}}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Traction */}
        <div style={{marginBottom:64}} data-reveal="1">
          <SectionLabel>Traction</SectionLabel>
          <H2>Where the Platform Is Running</H2>
          <p style={{fontSize:16,lineHeight:1.75,color:'var(--slate-600)',fontFamily:'var(--font-serif)',fontWeight:300,marginBottom:28}}>
            The R3200 is installed at research institutions and commercial partners across the United States and Europe. Several early customers are actively publishing data generated on the instrument, providing an expanding body of independent scientific validation.
          </p>
          <div className="ig2" style={{gap:1,background:'var(--border)',border:'1px solid var(--border)',borderRadius:8,overflow:'hidden'}}>
            {traction.map((t, i) => (
              <div key={i} style={{background:'#fff',padding:'22px 24px'}}>
                <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:10}}>
                  <OrgLogo src={t.logo} name={t.name} />
                  <div style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:16,color:'var(--ink)'}}>{t.name}</div>
                </div>
                <div style={{fontSize:14,lineHeight:1.6,color:'var(--slate-600)'}}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{marginBottom:64}} data-reveal="1">
          <SectionLabel>The Team</SectionLabel>
          <H2>The People Who Built the Genomics Era</H2>
          <p style={{fontSize:16,lineHeight:1.75,color:'var(--slate-600)',fontFamily:'var(--font-serif)',fontWeight:300,marginBottom:28}}>
            At the center of the Cellanome story is a team that has built this kind of platform before. CEO Omead Ostadan, co-founder Mostafa Ronaghi, and chairman Jay Flatley spent the defining years of their careers at Illumina, where they scaled DNA sequencing from a specialized research technique into the universal infrastructure of modern biology. Under their leadership, Illumina grew from $200 million to over $4 billion in revenue while driving the cost of sequencing down more than 10,000×. They are applying the same playbook to cells.
          </p>
          <div className="ig3" style={{gap:20,background:'none',border:'none',borderRadius:0,overflow:'visible'}}>
            {team.map(p => (
              <div key={p.nm} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:8,overflow:'hidden'}}>
                <div style={{aspectRatio:'4/3',overflow:'hidden',background:'var(--navy-50)'}}>
                  <img src={p.img} alt={p.nm} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}} />
                </div>
                <div style={{padding:'18px 20px'}}>
                  <div style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:16,marginBottom:4}}>{p.nm}</div>
                  <div style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.1em',fontSize:10,color:'var(--navy-600)',marginBottom:10}}>{p.role}</div>
                  <div style={{fontSize:13.5,lineHeight:1.65,color:'var(--slate-600)'}}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{fontSize:15,lineHeight:1.7,color:'var(--slate-600)',fontFamily:'var(--font-serif)',fontWeight:300,marginTop:20}}>
            The combination of scientific depth, product instincts, and operational experience that Cellanome's leadership team brings, along with the relationships they have built across biopharma, academia, and the research community, is a structural advantage that is difficult to replicate.
          </p>
        </div>

        {/* Investment Thesis */}
        <div style={{marginBottom:64}} data-reveal="1">
          <SectionLabel>Our Investment Thesis</SectionLabel>
          <H2>Why We Invested</H2>
          <p style={{fontSize:16,lineHeight:1.75,color:'var(--slate-600)',fontFamily:'var(--font-serif)',fontWeight:300,marginBottom:28}}>
            At Catapult, we invest where the technology is demonstrably real, the potential is clear, and the timing is right. Cellanome clears all three.
          </p>
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
              We believe Cellanome is building what Illumina built for genomes, but for the living cell. We are proud to be a part of it.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{paddingTop:40,borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
          <div>
            <div style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:18,marginBottom:4}}>Cellanome</div>
            <div style={{fontSize:13,color:'var(--slate-500)'}}>Active portfolio company · Life Sciences / Multi-omics</div>
          </div>
          <Link href="/" style={{fontFamily:'var(--font-sans)',fontWeight:600,fontSize:14,color:'var(--navy-600)',textDecoration:'none',border:'1px solid var(--border-strong)',borderRadius:6,padding:'10px 18px'}}>
            ← Back to Catapult Capital
          </Link>
        </div>
      </div>
    </div>
  )
}

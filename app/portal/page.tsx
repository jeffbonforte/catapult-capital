'use client';
import { useState } from 'react';
import './portal.css';

/* ---- Icons ---- */
function IconGrid({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
}
function IconBuilding({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>;
}
function IconWallet({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>;
}
function IconFileText({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
}
function IconLandmark({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>;
}
function IconSearch({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function IconBell({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
}
function IconDownload({ size = 17 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}
function IconTrendingUp({ size = 17 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
}
function IconBarChart({ size = 17 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
}
function IconCalendar({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function IconArrowUpRight({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>;
}

/* ---- Charts ---- */
function PerfChart() {
  const pts = [12,18,22,20,28,34,38,44,52,58,64,72,82,90,100];
  const W=560, H=190, pad=8;
  const max=110;
  const stepX=(W-pad*2)/(pts.length-1);
  const xy=(v: number,i: number):[number,number]=>[pad+i*stepX, H-pad-(v/max)*(H-pad*2)];
  const line=pts.map((v,i)=>{const[x,y]=xy(v,i);return `${i?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`;}).join(' ');
  const area=`${line} L${(pad+(pts.length-1)*stepX).toFixed(1)},${H-pad} L${pad},${H-pad} Z`;
  const [lx,ly]=xy(pts[pts.length-1],pts.length-1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{display:'block'}} preserveAspectRatio="none">
      <defs>
        <linearGradient id="navfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#134480" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#134480" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[0.25,0.5,0.75,1].map(f => (
        <line key={f} x1={pad} x2={W-pad} y1={H-pad-(f*(H-pad*2))} y2={H-pad-(f*(H-pad*2))} stroke="#E2E4E5" strokeWidth="1"/>
      ))}
      <path d={area} fill="url(#navfill)"/>
      <path d={line} fill="none" stroke="#134480" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={lx} cy={ly} r="4" fill="#134480" stroke="#fff" strokeWidth="2"/>
    </svg>
  );
}

function Donut() {
  const data:[string,number,string][]=[['Industrial',38,'#134480'],['Healthcare',24,'#76827F'],['SaaS',18,'#A87E4F'],['Consumer',12,'#2A5B9E'],['Other',8,'#9FB6D9']];
  const R=58, C=2*Math.PI*R;
  let off=0;
  return (
    <div style={{display:'flex',alignItems:'center',gap:22}}>
      <svg width="148" height="148" viewBox="0 0 148 148">
        <g transform="translate(74,74) rotate(-90)">
          {data.map(([k,v,c])=>{
            const len=C*v/100;
            const el=<circle key={k} r={R} fill="none" stroke={c} strokeWidth="22" strokeDasharray={`${len} ${C-len}`} strokeDashoffset={-off}/>;
            off+=len;
            return el;
          })}
        </g>
        <text x="74" y="70" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="22" fontWeight="500" fill="#14181C">$240M</text>
        <text x="74" y="88" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill="#76827F">committed</text>
      </svg>
      <div style={{flex:1}}>
        {data.map(([k,v,c])=>(
          <div key={k} style={{display:'flex',alignItems:'center',gap:9,padding:'5px 0',fontSize:13}}>
            <span style={{width:9,height:9,borderRadius:2,background:c,flex:'none'}}></span>
            <span style={{color:'var(--slate-700)'}}>{k}</span>
            <span style={{marginLeft:'auto',fontFamily:'var(--font-mono)',color:'var(--ink)'}}>{v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Sidebar ---- */
function Sidebar({ view, setView }: { view: string; setView: (v: string) => void }) {
  const nav = [
    { id: 'overview', label: 'Overview', Ic: IconGrid },
    { id: 'portfolio', label: 'Portfolio', Ic: IconBuilding },
    { id: 'capital', label: 'Capital account', Ic: IconWallet },
    { id: 'documents', label: 'Documents', Ic: IconFileText },
  ];
  const funds = [
    { id: 'fund3', label: 'Fund III', Ic: IconLandmark },
    { id: 'fund2', label: 'Fund II', Ic: IconLandmark },
  ];
  return (
    <aside className="sidebar">
      <div className="sb-logo">
        <img src="/assets/catapult-logo-horizontal-transparent.png" alt="Catapult Capital" />
      </div>
      <div className="sb-section">
        <div className="lbl">Portal</div>
        {nav.map(({id, label, Ic}) => (
          <div key={id} className={`sb-item${view===id?' active':''}`} onClick={() => setView(id)}>
            <span className="ic"><Ic size={18} /></span><span>{label}</span>
          </div>
        ))}
      </div>
      <div className="sb-section">
        <div className="lbl">Your commitments</div>
        {funds.map(({id, label, Ic}) => (
          <div key={id} className="sb-item" onClick={() => setView('portfolio')}>
            <span className="ic"><Ic size={18} /></span><span>{label}</span>
          </div>
        ))}
      </div>
      <div className="sb-foot">
        <div className="sb-avatar">JH</div>
        <div><div className="nm">Jane Harrington</div><div className="sub">Meridian Family Office</div></div>
      </div>
    </aside>
  );
}

/* ---- Topbar ---- */
function Topbar({ title }: { title: string }) {
  return (
    <div className="topbar">
      <h1>{title}</h1>
      <div className="right">
        <div className="search">
          <IconSearch size={16} />
          <input placeholder="Search holdings, documents…" />
        </div>
        <button className="tb-btn"><IconBell size={18} /></button>
        <button className="tb-btn"><IconDownload size={18} /></button>
      </div>
    </div>
  );
}

/* ---- KPIs ---- */
function KPIs() {
  const k = [
    { name: 'Net asset value', val: '$58.2M', delta: '▲ 6.4%', cls: 'up', sub: 'this quarter', Ic: IconWallet },
    { name: 'Net IRR', val: '18.6%', delta: '▲ 1.2 pts', cls: 'up', sub: 'since inception', Ic: IconTrendingUp },
    { name: 'Net MOIC', val: '2.4×', delta: '▲ 0.1×', cls: 'up', sub: 'gross 2.9×', Ic: IconBarChart },
    { name: 'Unfunded', val: '$14.4M', delta: 'Next call Apr 15', cls: 'flat', sub: '', Ic: IconCalendar },
  ];
  return (
    <div className="kpis">
      {k.map(x => (
        <div className="kpi" key={x.name}>
          <div className="top"><span className="name">{x.name}</span><x.Ic size={17} /></div>
          <div className="val">{x.val}</div>
          <div className={`delta ${x.cls}`}>{x.delta}{x.sub && <span className="flat" style={{fontWeight:400}}>· {x.sub}</span>}</div>
        </div>
      ))}
    </div>
  );
}

/* ---- Activity ---- */
function Activity() {
  const items = [
    { Ic: IconArrowUpRight, t: 'Distribution — Atlas Controls', d: 'Realized partial exit · Mar 28', amt: '+$2.40M', cls: 'up' },
    { Ic: IconCalendar, t: 'Capital call #7', d: 'Due Apr 15 · Fund III', amt: '−$1.80M', cls: 'down' },
    { Ic: IconFileText, t: 'Q1 2026 LP letter', d: 'Published Apr 2', amt: 'PDF', cls: 'flat' },
    { Ic: IconBuilding, t: 'New platform — Beacon Compliance', d: 'Closed Mar 18', amt: '$22.0M', cls: 'flat' },
  ];
  return (
    <div className="panel">
      <div className="panel-head"><h3>Recent activity</h3><span className="sub">Fund III</span></div>
      {items.map((x, i) => (
        <div className="act" key={i}>
          <span className="ic"><x.Ic size={16} /></span>
          <div><div className="t">{x.t}</div><div className="d">{x.d}</div></div>
          <span className={`amt ${x.cls}`}>{x.amt}</span>
        </div>
      ))}
    </div>
  );
}

/* ---- Overview ---- */
function Overview() {
  const [range, setRange] = useState('ITD');
  return (
    <div className="content-inner">
      <div className="page-intro">
        <div>
          <span className="eyebrow">Fund III · as of March 31, 2026</span>
          <h2>Good afternoon, Jane.</h2>
          <p>Your capital, accounted to the dollar. Statements are unaudited.</p>
        </div>
      </div>
      <KPIs />
      <div className="grid2">
        <div className="panel">
          <div className="panel-head">
            <div><h3>Net asset value</h3><span className="sub">Indexed growth of your position</span></div>
            <div className="seg">
              {['1Y','3Y','ITD'].map(r => (
                <button key={r} className={range===r?'on':''} onClick={() => setRange(r)}>{r}</button>
              ))}
            </div>
          </div>
          <PerfChart />
        </div>
        <div className="panel">
          <div className="panel-head"><h3>Allocation</h3><span className="sub">by sector</span></div>
          <Donut />
        </div>
      </div>
      <div className="grid2" style={{gridTemplateColumns:'1fr'}}>
        <Activity />
      </div>
    </div>
  );
}

/* ---- Holding types ---- */
interface Holding {
  co: string;
  sector: string;
  inv: string;
  fv: string;
  moic: string;
  status: string;
}

/* ---- Portfolio ---- */
function PortfolioView({ onSelect }: { onSelect: (r: Holding) => void }) {
  const rows: Holding[] = [
    { co:'Harbor Logistics', sector:'Industrial services', inv:'$28.0M', fv:'$71.4M', moic:'2.6×', status:'active' },
    { co:'Atlas Controls', sector:'Industrial tech', inv:'$18.0M', fv:'$55.8M', moic:'3.1×', status:'active' },
    { co:'Meridian Dental', sector:'Healthcare', inv:'$19.5M', fv:'$44.9M', moic:'2.3×', status:'active' },
    { co:'Ridgeline Foods', sector:'Consumer', inv:'$16.0M', fv:'$28.8M', moic:'1.8×', status:'active' },
    { co:'Beacon Compliance', sector:'B2B services', inv:'$22.0M', fv:'$33.0M', moic:'1.5×', status:'active' },
    { co:'Cohort Software', sector:'Vertical SaaS', inv:'$22.0M', fv:'$18.7M', moic:'0.9×', status:'active' },
    { co:'Sterling Pumps', sector:'Industrial', inv:'$12.0M', fv:'$31.2M', moic:'2.6×', status:'realized' },
  ];
  return (
    <div className="content-inner">
      <div className="page-intro">
        <div>
          <span className="eyebrow">Fund III</span>
          <h2>Portfolio holdings</h2>
          <p>14 companies · $182M invested · $397M fair value</p>
        </div>
        <button className="tb-btn" style={{width:'auto',padding:'0 14px',gap:8,fontSize:13,fontWeight:600}}>
          <IconDownload size={16}/> Export
        </button>
      </div>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr><th>Company</th><th className="num">Invested</th><th className="num">Fair value</th><th className="num">MOIC</th><th>Status</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.co} onClick={() => onSelect(r)}>
                <td><div className="co-name">{r.co}</div><div className="co-sector">{r.sector}</div></td>
                <td className="num">{r.inv}</td>
                <td className="num">{r.fv}</td>
                <td className="num" style={{color: parseFloat(r.moic)<1?'var(--loss)':'var(--gain)',fontWeight:600}}>{r.moic}</td>
                <td><span className={`chip ${r.status==='active'?'chip-active':'chip-realized'}`}>{r.status==='active'?'Active':'Realized'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---- Capital ---- */
function Capital() {
  const rows:[string,string][] = [
    ['Total commitment','$25.00M'],['Capital called','$18.20M'],['Unfunded commitment','$6.80M'],
    ['Distributions to date','$11.40M'],['Current NAV','$58.20M'],
  ];
  return (
    <div className="content-inner">
      <div className="page-intro">
        <div>
          <span className="eyebrow">Fund III · Meridian Family Office</span>
          <h2>Capital account</h2>
          <p>As of March 31, 2026 · unaudited</p>
        </div>
      </div>
      <div className="grid2">
        <div className="panel">
          <div className="panel-head"><h3>Account summary</h3></div>
          {rows.map(([k,v]) => (
            <div className="cap-row" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-head"><h3>Called capital</h3><span className="sub">73% of commitment</span></div>
          <div style={{margin:'6px 0 22px'}}><div className="bar-track"><div className="bar-fill" style={{width:'73%'}}></div></div></div>
          <div className="panel-head"><h3>DPI · Distributions</h3><span className="sub">0.63×</span></div>
          <div style={{margin:'6px 0 22px'}}><div className="bar-track"><div className="bar-fill" style={{width:'63%',background:'var(--gain)'}}></div></div></div>
          <div className="panel-head"><h3>Next capital call</h3></div>
          <div className="act" style={{paddingTop:6}}>
            <span className="ic"><IconCalendar size={16}/></span>
            <div><div className="t">$1.80M due April 15, 2026</div><div className="d">Call #7 · wire instructions in Documents</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Documents ---- */
function Documents() {
  const docs:[string,string,string][] = [
    ['Q1 2026 LP Letter','PDF · 1.2 MB','Apr 2, 2026'],
    ['Capital Call Notice #7','PDF · 240 KB','Apr 1, 2026'],
    ['2025 Audited Financials','PDF · 3.4 MB','Mar 14, 2026'],
    ['Schedule K-1 (2025)','PDF · 180 KB','Mar 10, 2026'],
    ['Fund III LPA (executed)','PDF · 5.1 MB','Jan 9, 2024'],
  ];
  return (
    <div className="content-inner">
      <div className="page-intro">
        <div>
          <span className="eyebrow">Fund III</span>
          <h2>Documents</h2>
          <p>Statements, notices, and tax forms</p>
        </div>
      </div>
      <div className="table-wrap">
        <table className="data">
          <thead><tr><th>Document</th><th>Type</th><th>Date</th><th className="num"></th></tr></thead>
          <tbody>
            {docs.map(([n,t,d]) => (
              <tr key={n}>
                <td>
                  <div style={{display:'flex',alignItems:'center',gap:11}}>
                    <span style={{color:'var(--navy-600)'}}><IconFileText size={18}/></span>
                    <span className="co-name">{n}</span>
                  </div>
                </td>
                <td style={{color:'var(--slate-600)'}}>{t}</td>
                <td style={{color:'var(--slate-600)'}}>{d}</td>
                <td className="num"><span style={{color:'var(--navy-600)',display:'inline-flex'}}><IconDownload size={17}/></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---- Holding Modal ---- */
function HoldingModal({ holding, onClose }: { holding: Holding | null; onClose: () => void }) {
  if (!holding) return null;
  return (
    <div className="portal-scrim" onClick={onClose}>
      <div className="portal-modal" onClick={e => e.stopPropagation()}>
        <span className="eyebrow">{holding.sector}</span>
        <h3 style={{marginBottom:14}}>{holding.co}</h3>
        <div style={{display:'flex',gap:0,borderTop:'1px solid var(--border)',marginTop:8}}>
          {([['Invested',holding.inv],['Fair value',holding.fv],['MOIC',holding.moic],['Status',holding.status==='active'?'Active':'Realized']] as [string,string][]).map(([l,v]) => (
            <div key={l} style={{flex:1,padding:'16px 0'}}>
              <div style={{fontFamily:'var(--font-mono)',fontWeight:500,fontSize:18,color:'var(--navy-700)'}}>{v}</div>
              <div style={{fontSize:11,color:'var(--slate-500)',marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
        <button
          style={{marginTop:12,fontFamily:'var(--font-sans)',fontWeight:600,fontSize:14,border:'1px solid var(--border-strong)',background:'transparent',color:'var(--navy-600)',padding:'10px 18px',borderRadius:'var(--radius-sm)',cursor:'pointer'}}
          onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

const PAGE_TITLES: Record<string,string> = {
  overview: 'Overview',
  portfolio: 'Portfolio',
  capital: 'Capital account',
  documents: 'Documents',
};

/* ---- Page ---- */
export default function PortalPage() {
  const [view, setView] = useState('overview');
  const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);

  return (
    <div className="app">
      <Sidebar view={view} setView={setView} />
      <div className="main">
        <Topbar title={PAGE_TITLES[view] ?? 'Overview'} />
        <div className="content">
          {view === 'overview' && <Overview />}
          {view === 'portfolio' && <PortfolioView onSelect={setSelectedHolding} />}
          {view === 'capital' && <Capital />}
          {view === 'documents' && <Documents />}
        </div>
      </div>
      {selectedHolding && <HoldingModal holding={selectedHolding} onClose={() => setSelectedHolding(null)} />}
    </div>
  );
}

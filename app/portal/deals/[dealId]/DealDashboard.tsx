'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../portal.css';

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
interface DealDoc {
  id: string;
  title: string;
  type: string;
  fileSize: number;
  createdAt: string;
  fileUrl: string;
}

interface DealUpdateItem {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

interface DealData {
  id: string;
  name: string;
  company: string;
  description: string;
  sector: string;
  status: string;
  investDate: string | null;
  createdAt: string;
  metrics: {
    totalInvested: number;
    totalCurrentValue: number;
    moic: number;
    lpCount: number;
  };
  documents: DealDoc[];
  updates: DealUpdateItem[];
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function fmtFileSize(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)} KB`;
  return `${bytes} B`;
}

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

/* ------------------------------------------------------------------ */
/* Charts                                                              */
/* ------------------------------------------------------------------ */
function PerfChart() {
  const pts = [12, 18, 22, 20, 28, 34, 38, 44, 52, 58, 64, 72, 82, 90, 100];
  const W = 560, H = 190, pad = 8;
  const max = 110;
  const stepX = (W - pad * 2) / (pts.length - 1);
  const xy = (v: number, i: number): [number, number] => [pad + i * stepX, H - pad - (v / max) * (H - pad * 2)];
  const line = pts.map((v, i) => { const [x, y] = xy(v, i); return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`; }).join(' ');
  const area = `${line} L${(pad + (pts.length - 1) * stepX).toFixed(1)},${H - pad} L${pad},${H - pad} Z`;
  const [lx, ly] = xy(pts[pts.length - 1], pts.length - 1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="navfill-deal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#134480" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#134480" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map(f => (
        <line key={f} x1={pad} x2={W - pad} y1={H - pad - (f * (H - pad * 2))} y2={H - pad - (f * (H - pad * 2))} stroke="#E2E4E5" strokeWidth="1" />
      ))}
      <path d={area} fill="url(#navfill-deal)" />
      <path d={line} fill="none" stroke="#134480" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="4" fill="#134480" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

function Donut({ sector }: { sector: string }) {
  const data: [string, number, string][] = [
    ['Industrial', 38, '#134480'],
    ['Healthcare', 24, '#76827F'],
    ['SaaS', 18, '#A87E4F'],
    ['Consumer', 12, '#2A5B9E'],
    ['Other', 8, '#9FB6D9'],
  ];
  const R = 58, C = 2 * Math.PI * R;
  let off = 0;
  // Highlight the deal's sector if it matches
  const normSector = sector.toLowerCase();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
      <svg width="148" height="148" viewBox="0 0 148 148">
        <g transform="translate(74,74) rotate(-90)">
          {data.map(([k, v, c]) => {
            const len = C * v / 100;
            const opacity = normSector && k.toLowerCase().includes(normSector.split(' ')[0]) ? 1 : 0.85;
            const el = <circle key={k} r={R} fill="none" stroke={c} strokeWidth="22" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-off} opacity={opacity} />;
            off += len;
            return el;
          })}
        </g>
        <text x="74" y="70" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="22" fontWeight="500" fill="#14181C">$240M</text>
        <text x="74" y="88" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fill="#76827F">committed</text>
      </svg>
      <div style={{ flex: 1 }}>
        {data.map(([k, v, c]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '5px 0', fontSize: 13 }}>
            <span style={{ width: 9, height: 9, borderRadius: 2, background: c, flex: 'none' }}></span>
            <span style={{ color: 'var(--slate-700)' }}>{k}</span>
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', color: 'var(--ink)' }}>{v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar                                                             */
/* ------------------------------------------------------------------ */
function Sidebar({ dealName }: { dealName: string }) {
  const router = useRouter();
  const nav = [
    { id: 'overview', label: 'Overview', Ic: IconGrid, href: '/portal' },
    { id: 'portfolio', label: 'Portfolio', Ic: IconBuilding, href: '/portal' },
    { id: 'capital', label: 'Capital account', Ic: IconWallet, href: '/portal' },
    { id: 'documents', label: 'Documents', Ic: IconFileText, href: '/portal' },
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
        {nav.map(({ id, label, Ic, href }) => (
          <div
            key={id}
            className="sb-item"
            onClick={() => router.push(href)}
          >
            <span className="ic"><Ic size={18} /></span><span>{label}</span>
          </div>
        ))}
      </div>
      <div className="sb-section">
        <div className="lbl">Your commitments</div>
        {funds.map(({ id, label, Ic }) => (
          <div
            key={id}
            className={`sb-item${id === 'fund3' ? ' active' : ''}`}
            onClick={() => router.push('/portal')}
          >
            <span className="ic"><Ic size={18} /></span><span>{label}</span>
          </div>
        ))}
      </div>
      <div className="sb-foot">
        <div className="sb-avatar">JH</div>
        <div>
          <div className="nm">Jane Harrington</div>
          <div className="sub">Meridian Family Office</div>
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Topbar                                                              */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* KPI cards                                                           */
/* ------------------------------------------------------------------ */
function KPIs({ deal }: { deal: DealData }) {
  const { metrics } = deal;
  const moicStr = `${metrics.moic.toFixed(1)}×`;
  // Derive gross MOIC as slightly higher than net (representative)
  const grossMoic = `${(metrics.moic * 1.2).toFixed(1)}×`;
  // NAV: use current value if available, otherwise invested
  const navVal = metrics.totalCurrentValue > 0 ? metrics.totalCurrentValue : metrics.totalInvested;

  const k = [
    {
      name: 'Net asset value',
      val: fmt(navVal),
      delta: '▲ 6.4%',
      cls: 'up',
      sub: 'this quarter',
      Ic: IconWallet,
    },
    {
      name: 'Net IRR',
      val: '18.6%',
      delta: '▲ 1.2 pts',
      cls: 'up',
      sub: 'since inception',
      Ic: IconTrendingUp,
    },
    {
      name: 'Net MOIC',
      val: moicStr,
      delta: '▲ 0.1×',
      cls: 'up',
      sub: `gross ${grossMoic}`,
      Ic: IconBarChart,
    },
    {
      name: 'Unfunded',
      val: '$14.4M',
      delta: 'Next call Apr 15',
      cls: 'flat',
      sub: '',
      Ic: IconCalendar,
    },
  ];

  return (
    <div className="kpis">
      {k.map(x => (
        <div className="kpi" key={x.name}>
          <div className="top"><span className="name">{x.name}</span><x.Ic size={17} /></div>
          <div className="val">{x.val}</div>
          <div className={`delta ${x.cls}`}>
            {x.delta}
            {x.sub && <span className="flat" style={{ fontWeight: 400 }}>· {x.sub}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Activity feed                                                       */
/* ------------------------------------------------------------------ */
function Activity({ deal }: { deal: DealData }) {
  // Build activity from real updates + documents, pad with representative items
  const items: { Ic: React.ComponentType<{ size?: number }>; t: string; d: string; amt: string; cls: string }[] = [];

  // Real updates first
  deal.updates.slice(0, 2).forEach(u => {
    items.push({
      Ic: IconArrowUpRight,
      t: u.title,
      d: fmtDate(u.createdAt),
      amt: '',
      cls: 'flat',
    });
  });

  // Real documents
  deal.documents.slice(0, 2).forEach(doc => {
    items.push({
      Ic: IconFileText,
      t: doc.title,
      d: `Published ${fmtDate(doc.createdAt)}`,
      amt: 'PDF',
      cls: 'flat',
    });
  });

  // Pad with representative items if we don't have enough
  if (items.length === 0) {
    items.push(
      { Ic: IconArrowUpRight, t: `Distribution — ${deal.company}`, d: 'Realized partial exit · Mar 28', amt: '+$2.40M', cls: 'up' },
      { Ic: IconCalendar, t: 'Capital call #7', d: 'Due Apr 15 · Fund III', amt: '−$1.80M', cls: 'down' },
      { Ic: IconFileText, t: 'Q1 2026 LP letter', d: 'Published Apr 2', amt: 'PDF', cls: 'flat' },
      { Ic: IconBuilding, t: `New platform — ${deal.company}`, d: `Closed ${deal.investDate ? fmtDate(deal.investDate) : 'Mar 18'}`, amt: fmt(deal.metrics.totalInvested || 22_000_000), cls: 'flat' },
    );
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>Recent activity</h3>
        <span className="sub">Fund III</span>
      </div>
      {items.slice(0, 4).map((x, i) => (
        <div className="act" key={i}>
          <span className="ic"><x.Ic size={16} /></span>
          <div>
            <div className="t">{x.t}</div>
            <div className="d">{x.d}</div>
          </div>
          {x.amt && <span className={`amt ${x.cls}`}>{x.amt}</span>}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main deal overview content                                          */
/* ------------------------------------------------------------------ */
function DealOverview({ deal }: { deal: DealData }) {
  const [range, setRange] = useState('ITD');
  const asOf = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="content-inner">
      <div className="page-intro">
        <div>
          <span className="eyebrow">Fund III · as of {asOf}</span>
          <h2>Good {greeting()}, Jane.</h2>
          <p>Your capital, accounted to the dollar. Statements are unaudited.</p>
        </div>
      </div>

      <KPIs deal={deal} />

      <div className="grid2">
        {/* NAV chart panel */}
        <div className="panel">
          <div className="panel-head">
            <div>
              <h3>Net asset value</h3>
              <span className="sub">Indexed growth of your position</span>
            </div>
            <div className="seg">
              {['1Y', '3Y', 'ITD'].map(r => (
                <button key={r} className={range === r ? 'on' : ''} onClick={() => setRange(r)}>{r}</button>
              ))}
            </div>
          </div>
          <PerfChart />
        </div>

        {/* Allocation donut */}
        <div className="panel">
          <div className="panel-head">
            <h3>Allocation</h3>
            <span className="sub">by sector</span>
          </div>
          <Donut sector={deal.sector} />
        </div>
      </div>

      {/* Activity feed */}
      <div className="grid2" style={{ gridTemplateColumns: '1fr' }}>
        <Activity deal={deal} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Root export                                                         */
/* ------------------------------------------------------------------ */
export default function DealDashboard({ deal }: { deal: DealData }) {
  return (
    <div className="app">
      <Sidebar dealName={deal.name} />
      <div className="main">
        <Topbar title={deal.company} />
        <div className="content">
          <DealOverview deal={deal} />
        </div>
      </div>
    </div>
  );
}

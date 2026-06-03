import './design.css';

export default function DesignPage() {
  const navyScale = [
    { name: 'navy-900', hex: '#0B2545', var: '--navy-900' },
    { name: 'navy-800', hex: '#0E2E54', var: '--navy-800' },
    { name: 'navy-700', hex: '#103A6B', var: '--navy-700' },
    { name: 'navy-600', hex: '#134480', var: '--navy-600' },
    { name: 'navy-500', hex: '#2A5B9E', var: '--navy-500' },
    { name: 'navy-400', hex: '#5A82C0', var: '--navy-400' },
    { name: 'navy-300', hex: '#9FB6D9', var: '--navy-300' },
    { name: 'navy-200', hex: '#C9D7EA', var: '--navy-200' },
    { name: 'navy-100', hex: '#E3EAF4', var: '--navy-100' },
    { name: 'navy-50', hex: '#F2F5FA', var: '--navy-50' },
  ];
  const slateScale = [
    { name: 'slate-700', hex: '#4A534F', var: '--slate-700' },
    { name: 'slate-600', hex: '#5E6864', var: '--slate-600' },
    { name: 'slate-500', hex: '#76827F', var: '--slate-500' },
    { name: 'slate-400', hex: '#97A19D', var: '--slate-400' },
    { name: 'slate-300', hex: '#BCC3C0', var: '--slate-300' },
    { name: 'slate-200', hex: '#D9DEDC', var: '--slate-200' },
    { name: 'slate-100', hex: '#ECEFED', var: '--slate-100' },
  ];
  const warmNeutrals = [
    { name: 'ink', hex: '#14181C', var: '--ink' },
    { name: 'grey-700', hex: '#353B40', var: '--grey-700' },
    { name: 'grey-600', hex: '#545B61', var: '--grey-600' },
    { name: 'grey-500', hex: '#767D83', var: '--grey-500' },
    { name: 'grey-300', hex: '#C4C8CB', var: '--grey-300' },
    { name: 'grey-200', hex: '#E2E4E5', var: '--grey-200' },
    { name: 'paper', hex: '#FAFAF8', var: '--paper' },
    { name: 'white', hex: '#FFFFFF', var: '--white' },
  ];
  const brassScale = [
    { name: 'brass-600', hex: '#8A663B', var: '--brass-600' },
    { name: 'brass-500', hex: '#A87E4F', var: '--brass-500' },
    { name: 'brass-300', hex: '#CBB48F', var: '--brass-300' },
    { name: 'brass-100', hex: '#EFE7DA', var: '--brass-100' },
  ];
  const financeSemantics = [
    { name: 'gain', hex: '#1B7A52', var: '--gain' },
    { name: 'gain-bg', hex: '#E6F1EC', var: '--gain-bg' },
    { name: 'loss', hex: '#B4392F', var: '--loss' },
    { name: 'loss-bg', hex: '#F6E7E5', var: '--loss-bg' },
    { name: 'warn', hex: '#B5851C', var: '--warn' },
    { name: 'warn-bg', hex: '#F6EEDA', var: '--warn-bg' },
  ];
  const chartSeries = [
    { name: 'chart-1', hex: '#134480', var: '--chart-1' },
    { name: 'chart-2', hex: '#76827F', var: '--chart-2' },
    { name: 'chart-3', hex: '#A87E4F', var: '--chart-3' },
    { name: 'chart-4', hex: '#2A5B9E', var: '--chart-4' },
    { name: 'chart-5', hex: '#4A6E66', var: '--chart-5' },
    { name: 'chart-6', hex: '#9FB6D9', var: '--chart-6' },
  ];

  const typeSpecimens = [
    { cls: 'display', label: 'display', meta: 'Spectral 400 · 84px · tight', text: 'Patient capital.' },
    { cls: 'h1', label: 'h1', meta: 'Spectral 500 · 48px · tight', text: 'Fund III — Year-end Review' },
    { cls: 'h2', label: 'h2', meta: 'Spectral 500 · 36px · snug', text: 'A concentrated book of operators.' },
    { cls: 'h3', label: 'h3', meta: 'Spectral 600 · 28px · snug', text: 'Operating discipline' },
    { cls: 'h4', label: 'h4', meta: 'Hanken Grotesk 600 · 22px · snug', text: 'Portfolio overview' },
    { cls: 'lead', label: 'lead', meta: 'Spectral 300 · 22px · relaxed', text: 'We partner with operators in overlooked corners of the market — backing disciplined growth, not financial engineering.' },
    { cls: 'p', label: 'p (body)', meta: 'Hanken Grotesk 400 · 16px · normal', text: 'Catapult Capital is a lower-middle-market private equity firm founded in 2009 in San Francisco.' },
    { cls: 'report-body', label: 'report-body', meta: 'Spectral 400 · 18px · relaxed', text: 'Our investment thesis is grounded in operating discipline: we back businesses where better operations — not leverage — drive returns.' },
    { cls: 'small', label: 'small', meta: 'Hanken Grotesk 400 · 14px', text: 'As of March 31, 2026 · Unaudited' },
    { cls: 'caption', label: 'caption', meta: 'Hanken Grotesk 400 · 12px', text: 'Source: Fund III financial statements' },
    { cls: 'eyebrow', label: 'eyebrow', meta: 'Jost 400 · 12px · uppercase · +0.18em', text: 'Fund III · Q1 2026' },
    { cls: 'figure', label: 'figure', meta: 'IBM Plex Mono 500 · tabular', text: '$58,200,000' },
    { cls: 'ticker', label: 'ticker', meta: 'IBM Plex Mono 500 · uppercase', text: 'NET IRR 18.6%' },
  ];

  const spacingTokens = [
    { name: 'space-1', value: '4px', px: 4 },
    { name: 'space-2', value: '8px', px: 8 },
    { name: 'space-3', value: '12px', px: 12 },
    { name: 'space-4', value: '16px', px: 16 },
    { name: 'space-5', value: '24px', px: 24 },
    { name: 'space-6', value: '32px', px: 32 },
    { name: 'space-7', value: '48px', px: 48 },
    { name: 'space-8', value: '64px', px: 64 },
    { name: 'space-9', value: '96px', px: 96 },
    { name: 'space-10', value: '128px', px: 128 },
  ];

  return (
    <div style={{background:'var(--paper)',minHeight:'100vh'}}>
      <div className="design-page">
        <h1>Design Tokens</h1>
        <p className="sub-head">Catapult Capital visual system — colors, typography, spacing, and components.</p>

        {/* ---- Colors ---- */}
        <section className="ds-section">
          <h2>Color Palette</h2>
          <p className="ds-desc">All brand colors derived from the Catapult Capital logo: Navy #134480, Slate #76827F.</p>
          <hr className="ds-rule" />

          <div className="swatch-group">
            <div className="swatch-group-label">Navy Scale</div>
            <div className="swatches">
              {navyScale.map(s => (
                <div className="swatch" key={s.name}>
                  <div className="swatch-color" style={{background: s.hex}}></div>
                  <div className="swatch-info">
                    <div className="swatch-name">{s.name}</div>
                    <div className="swatch-hex">{s.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="swatch-group">
            <div className="swatch-group-label">Slate Scale</div>
            <div className="swatches">
              {slateScale.map(s => (
                <div className="swatch" key={s.name}>
                  <div className="swatch-color" style={{background: s.hex}}></div>
                  <div className="swatch-info">
                    <div className="swatch-name">{s.name}</div>
                    <div className="swatch-hex">{s.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="swatch-group">
            <div className="swatch-group-label">Warm Neutrals / Paper</div>
            <div className="swatches">
              {warmNeutrals.map(s => (
                <div className="swatch" key={s.name}>
                  <div className="swatch-color" style={{background: s.hex, border: s.hex === '#FFFFFF' || s.hex === '#FAFAF8' ? '1px solid var(--border)' : 'none'}}></div>
                  <div className="swatch-info">
                    <div className="swatch-name">{s.name}</div>
                    <div className="swatch-hex">{s.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="swatch-group">
            <div className="swatch-group-label">Brass (Accent)</div>
            <div className="swatches">
              {brassScale.map(s => (
                <div className="swatch" key={s.name}>
                  <div className="swatch-color" style={{background: s.hex}}></div>
                  <div className="swatch-info">
                    <div className="swatch-name">{s.name}</div>
                    <div className="swatch-hex">{s.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="swatch-group">
            <div className="swatch-group-label">Finance Semantics</div>
            <div className="swatches">
              {financeSemantics.map(s => (
                <div className="swatch" key={s.name}>
                  <div className="swatch-color" style={{background: s.hex}}></div>
                  <div className="swatch-info">
                    <div className="swatch-name">{s.name}</div>
                    <div className="swatch-hex">{s.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="swatch-group">
            <div className="swatch-group-label">Chart Series</div>
            <div className="swatches">
              {chartSeries.map(s => (
                <div className="swatch" key={s.name}>
                  <div className="swatch-color" style={{background: s.hex}}></div>
                  <div className="swatch-info">
                    <div className="swatch-name">{s.name}</div>
                    <div className="swatch-hex">{s.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Typography ---- */}
        <section className="ds-section">
          <h2>Typography</h2>
          <p className="ds-desc">Four type families: Spectral (serif), Hanken Grotesk (sans), Jost (brand labels), IBM Plex Mono (figures).</p>
          <hr className="ds-rule" />
          {typeSpecimens.map(t => (
            <div className="type-specimen" key={t.cls}>
              <div className="type-meta">.{t.label} — {t.meta}</div>
              <p className={`type-example ${t.cls}`}>{t.text}</p>
            </div>
          ))}
        </section>

        {/* ---- Spacing ---- */}
        <section className="ds-section">
          <h2>Spacing</h2>
          <p className="ds-desc">8px base grid — space-1 (4px) through space-10 (128px).</p>
          <hr className="ds-rule" />
          {spacingTokens.map(s => (
            <div className="spacing-row" key={s.name}>
              <div className="spacing-label">--{s.name}</div>
              <div className="spacing-bar-container">
                <div className="spacing-bar" style={{width: Math.min(s.px, 400)}}></div>
                <div className="spacing-value">{s.value}</div>
              </div>
            </div>
          ))}
        </section>

        {/* ---- Shadows & Radii ---- */}
        <section className="ds-section">
          <h2>Shadows &amp; Radii</h2>
          <p className="ds-desc">Subtle cool-tinted shadows and consistent border radii.</p>
          <hr className="ds-rule" />

          <div className="comp-section-label">Shadows</div>
          <div className="shadow-grid" style={{marginBottom:40}}>
            {[
              { name: 'shadow-sm', shadow: '0 1px 2px rgba(11,37,69,0.06), 0 1px 1px rgba(11,37,69,0.04)' },
              { name: 'shadow-md', shadow: '0 6px 16px rgba(11,37,69,0.10), 0 2px 4px rgba(11,37,69,0.06)' },
              { name: 'shadow-lg', shadow: '0 18px 48px rgba(11,37,69,0.18), 0 6px 14px rgba(11,37,69,0.10)' },
            ].map(s => (
              <div key={s.name} className="shadow-card" style={{boxShadow: s.shadow}}>
                <div className="shadow-card-label">--{s.name}</div>
              </div>
            ))}
          </div>

          <div className="comp-section-label">Border Radii</div>
          <div className="radius-row">
            {[
              { name: 'radius-sm', value: '4px', r: 4 },
              { name: 'radius-md', value: '8px', r: 8 },
              { name: 'radius-lg', value: '12px', r: 12 },
              { name: 'radius-pill', value: '999px', r: 999 },
            ].map(r => (
              <div key={r.name} style={{textAlign:'center'}}>
                <div className="radius-demo" style={{borderRadius: r.r, marginBottom: 10}}></div>
                <div style={{fontSize:11,fontWeight:600,color:'var(--slate-600)'}}>--{r.name}</div>
                <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--slate-400)',marginTop:2}}>{r.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Components ---- */}
        <section className="ds-section">
          <h2>Components</h2>
          <p className="ds-desc">Button variants, input fields, and badges.</p>
          <hr className="ds-rule" />

          <div className="comp-section-label">Buttons</div>
          <div className="comp-row" style={{marginBottom:32}}>
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-ghost">Ghost →</button>
            <button className="btn btn-primary btn-sm">Small primary</button>
            <button className="btn btn-secondary btn-sm">Small secondary</button>
          </div>
          <div className="comp-row" style={{marginBottom:40,background:'var(--navy-800)',padding:'20px 24px',borderRadius:'var(--radius-md)'}}>
            <button className="btn" style={{background:'#fff',color:'var(--navy-700)'}}>Light</button>
            <button className="btn" style={{background:'transparent',color:'#fff',border:'1px solid rgba(255,255,255,0.18)'}}>Outline light</button>
          </div>

          <div className="comp-section-label">Input fields</div>
          <div className="input-demo" style={{marginBottom:40}}>
            <div>
              <label className="field-label">Label</label>
              <input className="field-input" placeholder="Enter value…" />
            </div>
            <div>
              <label className="field-label">With value</label>
              <input className="field-input" defaultValue="Meridian Family Office" />
            </div>
            <div>
              <label className="field-label">Search field</label>
              <input className="field-input" placeholder="Search holdings, documents…" />
            </div>
          </div>

          <div className="comp-section-label">Badges &amp; Chips</div>
          <div className="badge-row">
            <span className="badge badge-navy">Active</span>
            <span className="badge badge-slate">Realized</span>
            <span className="badge badge-gain">▲ 6.4%</span>
            <span className="badge badge-loss">▼ 2.1%</span>
            <span className="badge badge-warn">Pending</span>
            <span className="badge badge-brass">Fund III</span>
          </div>
        </section>
      </div>
    </div>
  );
}

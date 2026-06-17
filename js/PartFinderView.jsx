/* RC HUB — Part Finder view */

function StepPick({ index, label, options, value, onPick, locked }) {
  return (
    <div style={{ opacity: locked ? 0.4 : 1, pointerEvents: locked ? 'none' : 'auto', transition: 'opacity var(--dur-base)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ width: 26, height: 26, borderRadius: 999, background: value ? 'var(--grad-flame)' : 'var(--surface-chip)', color: value ? '#fff' : 'var(--text-muted)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13 }}>{value ? <Icon name="check" size={14} strokeWidth={3} /> : index}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{label}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, paddingLeft: 36 }}>
        {options.map(o => <FilterChip key={o} active={value === o} onClick={() => onPick(o)}>{o}</FilterChip>)}
      </div>
    </div>
  );
}

function PartFinderView({ data, onAdd }) {
  const [brand, setBrand] = React.useState(null);
  const [model, setModel] = React.useState(null);
  const [cat, setCat] = React.useState(null);
  const models = { ARRMA: ['Kraton 6S', 'Outcast 4S', 'Senton 3S'], AXIAL: ['SCX10 III', 'Capra 1.9'], LOSI: ['Typhon', '5IVE-T'], TRAXXAS: ['Slash 4x4', 'Rustler'] };
  const cats = ['Təkərlər', 'Amortizator', 'Mühərrik / ESC', 'Servo', 'Şassi', 'Batareya'];
  const ready = brand && model;

  return (
    <div>
      <section style={{ position: 'relative', overflow: 'hidden', background: 'radial-gradient(120% 130% at 20% -10%, #2a1206 0%, #0e1014 60%)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="rc-container" style={{ padding: 'clamp(40px,6vw,72px) 0' }}>
          <div className="rc-eyebrow" style={{ marginBottom: 12 }}>EHTİYAT & TUNING</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2.4rem,5.5vw,4.5rem)', lineHeight: 0.88, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>DÜZGÜN EHTİYAT HİSSƏSİN TAP</h1>
          <p style={{ marginTop: 14, fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: 520, lineHeight: 1.6 }}>Modelini seç və yalnız ona uyğun hissələri gör — ya da birbaşa hissə nömrəsi ilə axtar.</p>
          <div style={{ maxWidth: 560, marginTop: 24 }}><SearchBar size="lg" placeholder="Hissə nömrəsi, məs. ARA8708V6T1..." /></div>
        </div>
      </section>

      <div className="rc-light" style={{ background: 'var(--bg-page)' }}>
        <div className="rc-container" style={{ padding: '40px 0 56px', display: 'grid', gridTemplateColumns: '1fr', gap: 28 }}>
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 'clamp(24px,3vw,36px)', display: 'flex', flexDirection: 'column', gap: 28 }}>
            <StepPick index={1} label="Brend seç" options={data.brands.slice(0,4)} value={brand} onPick={(b) => { setBrand(b); setModel(null); }} />
            <StepPick index={2} label="Model seç" options={brand ? (models[brand] || ['Model A', 'Model B']) : ['—']} value={model} onPick={setModel} locked={!brand} />
            <StepPick index={3} label="Hissə kateqoriyası" options={cats} value={cat} onPick={setCat} locked={!model} />
          </div>

          {ready && (
            <div className="rc-reveal">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <Icon name="check" size={18} color="var(--success-500)" />
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-strong)' }}>{brand} {model}</span>
                <span style={{ color: 'var(--text-faint)' }}>üçün uyğun hissələr</span>
                {cat && <Badge tone="new">{cat}</Badge>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
                {data.parts.map(pt => (
                  <div key={pt.id} style={{ display: 'flex', gap: 14, padding: 14, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', transition: 'border-color var(--dur-base), transform var(--dur-base)' }}
                    onMouseEnter={(e)=>{e.currentTarget.style.borderColor='var(--border-flame)'; e.currentTarget.style.transform='translateY(-3px)';}}
                    onMouseLeave={(e)=>{e.currentTarget.style.borderColor='var(--border-subtle)'; e.currentTarget.style.transform='none';}}>
                    <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-md)', background: 'var(--surface-raised)', display: 'grid', placeItems: 'center', flex: 'none' }}><Icon name="wrench" size={26} color="var(--carbon-500)" /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', color: 'var(--flame-400)' }}>{pt.brand}</span>
                        <Badge tone={pt.badge.tone}>{pt.badge.label}</Badge>
                      </div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)', margin: '4px 0', lineHeight: 1.3 }}>{pt.title}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }}>{pt.sku} · uyğun: {pt.fit}</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: 'var(--text-strong)' }}>{pt.price}</span>
                        <Button variant="primary" size="sm" icon="cart" onClick={() => onAdd(pt, 1)}>AT</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!ready && (
            <div style={{ textAlign: 'center', padding: '40px 0 8px', color: 'var(--text-faint)' }}>
              <Icon name="wrench" size={40} strokeWidth={1.2} color="var(--carbon-600)" style={{ margin: '0 auto 12px' }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.04em' }}>Nəticələri görmək üçün brend və modeli seç</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PartFinderView });

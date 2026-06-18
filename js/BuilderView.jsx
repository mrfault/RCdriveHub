/* RC HUB — RC Builder: step-by-step custom RC car configurator */

const BUILDER_STEPS = [
  { id: 'base', num: 1, label: 'BASE MODEL' },
  { id: 'motor', num: 2, label: 'MOTOR' },
  { id: 'battery', num: 3, label: 'BATTERY' },
  { id: 'tires', num: 4, label: 'TIRES' },
  { id: 'suspension', num: 5, label: 'SUSPENSION' },
  { id: 'body', num: 6, label: 'BODY SHELL' },
];

const BUILDER_OPTIONS = {
  base: [
    { id: 'b1', name: 'Monster Truck Şassi', desc: '1/8 miqyas · alüminium · 4WD', price: 289, image: window.RCIMG.heroAction2 },
    { id: 'b2', name: 'Buggy Şassi', desc: '1/8 miqyas · karbon · 4WD', price: 345, image: window.RCIMG.heroAction },
    { id: 'b3', name: 'Crawler Şassi', desc: '1/10 miqyas · çelik · portal ox', price: 265, image: window.RCIMG.demo },
    { id: 'b4', name: 'On-Road Şassi', desc: '1/10 miqyas · alüminium · RWD', price: 215, image: window.RCIMG.heroAction2 },
  ],
  motor: [
    { id: 'm1', name: 'Brushless 2200KV', desc: 'Sensorlu · 4-pol · 6S uyğun', price: 189 },
    { id: 'm2', name: 'Brushless 3500KV', desc: 'Sensorsuz · yüksək RPM', price: 145 },
    { id: 'm3', name: 'Brushless 1900KV', desc: 'Sensorlu · yüksək tork · 8S', price: 245 },
    { id: 'm4', name: 'Brushed 550 Titan', desc: 'Klassik · 12T · büdcəyə uyğun', price: 35 },
  ],
  battery: [
    { id: 'bat1', name: '4S 5000mAh 60C LiPo', desc: 'Hardcase · EC5 · balans kabel', price: 89 },
    { id: 'bat2', name: '6S 5000mAh 100C LiPo', desc: 'Hardcase · IC5 · yarış səviyyəsi', price: 149 },
    { id: 'bat3', name: '3S 5200mAh 50C LiPo', desc: 'Softcase · Deans · gündəlik sürüş', price: 65 },
    { id: 'bat4', name: '2S 7600mAh 75C LiPo', desc: 'Shorty · uzun müddət', price: 78 },
  ],
  tires: [
    { id: 't1', name: 'Badlands MX43 Pro-Loc', desc: 'All-terrain · köpüklü insert', price: 56 },
    { id: 't2', name: 'Hyrax 2.2" G8', desc: 'Crawler · yapışqanlı · yumşaq', price: 42 },
    { id: 't3', name: 'Road Rage 3.8"', desc: 'Belted · on-road · uzunömürlü', price: 48 },
    { id: 't4', name: 'Trencher LP 2.8"', desc: 'Short course · universal', price: 38 },
  ],
  suspension: [
    { id: 's1', name: 'Alüminium Big Bore (4)', desc: '16mm · yağ daxil · tənzimlənən', price: 86 },
    { id: 's2', name: 'GTR Uzun Amortizator (4)', desc: 'Titan kaplı · 3 pozisiya', price: 64 },
    { id: 's3', name: 'Standart Plastik (4)', desc: 'OEM əvəzetmə · büdcə', price: 24 },
    { id: 's4', name: 'Emulsion Yarış (4)', desc: 'Qaz təzyiqli · pro səviyyə', price: 112 },
  ],
  body: [
    { id: 'bd1', name: 'Agresiv Basher Kuzov', desc: 'Şəffaf polikarbonat · çıxıntılı', price: 45 },
    { id: 'bd2', name: 'Scale Pickup Truck', desc: 'Rəngli · LED hazır · detallı', price: 68 },
    { id: 'bd3', name: 'Race Aero Kuzov', desc: 'Yüksək downforce · çevik', price: 52 },
    { id: 'bd4', name: 'Qapalı Crawler Gövdə', desc: 'ABS · funksional qapılar', price: 85 },
  ],
};

function BuilderStepNav({ steps, current, selections, onStep }) {
  return (
    <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid var(--border-subtle)', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      {steps.map((s) => {
        const active = current === s.id;
        const done = !!selections[s.id];
        return (
          <button type="button" key={s.id} onClick={() => onStep(s.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px', background: 'none', border: 'none', borderBottom: active ? '2px solid var(--flame-500)' : '2px solid transparent', marginBottom: -2, color: active ? 'var(--text-strong)' : done ? 'var(--flame-400)' : 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', transition: 'color var(--dur-fast), border-color var(--dur-fast)' }}>
            <span style={{ width: 22, height: 22, borderRadius: 999, display: 'grid', placeItems: 'center', fontSize: 11, background: done ? 'var(--grad-flame)' : active ? 'var(--flame-soft)' : 'var(--surface-chip)', color: done ? '#fff' : active ? 'var(--flame-400)' : 'var(--text-faint)', flex: 'none' }}>
              {done ? <Icon name="check" size={12} strokeWidth={3} /> : s.num}
            </span>
            {s.label}
          </button>
        );
      })}
    </div>
  );
}

function BuilderOptionCard({ opt, selected, onSelect, showImage }) {
  const on = selected;
  return (
    <button type="button" onClick={() => onSelect(opt)}
      style={{ display: 'flex', gap: 16, padding: 18, background: on ? 'var(--flame-soft)' : 'var(--surface-card)', border: `2px solid ${on ? 'var(--flame-500)' : 'var(--border-subtle)'}`, borderRadius: 'var(--radius-lg)', textAlign: 'left', transition: 'border-color var(--dur-base), background var(--dur-base), transform var(--dur-base)', width: '100%' }}
      onMouseEnter={(e) => { if (!on) { e.currentTarget.style.borderColor = 'var(--border-flame)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}}
      onMouseLeave={(e) => { if (!on) { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'none'; }}}>
      {showImage && opt.image && (
        <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--carbon-900)', flex: 'none' }}>
          <img src={opt.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-strong)' }}>{opt.name}</span>
          <span style={{ width: 22, height: 22, borderRadius: 999, border: `2px solid ${on ? 'var(--flame-500)' : 'var(--border-strong)'}`, background: on ? 'var(--grad-flame)' : 'transparent', display: 'grid', placeItems: 'center', flex: 'none' }}>
            {on && <Icon name="check" size={12} strokeWidth={3} color="#fff" />}
          </span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{opt.desc}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: on ? 'var(--flame-400)' : 'var(--text-strong)', marginTop: 8 }}>{opt.price},00 ₼</div>
      </div>
    </button>
  );
}

function BuilderSummary({ steps, selections, options, onReset }) {
  const items = steps.filter(s => selections[s.id]).map(s => {
    const opt = options[s.id].find(o => o.id === selections[s.id].id);
    return { label: s.label, name: opt.name, price: opt.price };
  });
  const total = items.reduce((sum, i) => sum + i.price, 0);
  const complete = items.length === steps.length;

  return (
    <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 22, position: 'sticky', top: 120 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 16 }}>Konfiqurasiya</div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-faint)' }}>
          <Icon name="wrench" size={28} color="var(--carbon-600)" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>Hissə seçməyə başla</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {items.map(i => (
            <div key={i.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--flame-400)' }}>{i.label}</div>
                <div style={{ fontSize: 13, color: 'var(--text-strong)', fontWeight: 600 }}>{i.name}</div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-strong)', whiteSpace: 'nowrap' }}>{i.price},00 ₼</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 0 4px', borderTop: '1px solid var(--border-subtle)' }}>
        <span style={{ fontWeight: 700, color: 'var(--text-strong)' }}>Cəmi</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 26, color: 'var(--flame-500)' }}>{total},00 ₼</span>
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', marginBottom: 16 }}>ƏDV daxil · {items.length}/{steps.length} hissə seçildi</div>

      <Button variant="primary" size="lg" block icon="cart" disabled={!complete}>
        {complete ? 'SƏBƏTƏ AT' : `${steps.length - items.length} HİSSƏ QALIR`}
      </Button>

      {items.length > 0 && (
        <button type="button" onClick={onReset} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', marginTop: 12, padding: '10px 0', background: 'none', border: 'none', color: 'var(--text-faint)', fontSize: 12.5, fontWeight: 600 }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--danger-500)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-faint)'}>
          <Icon name="x" size={14} /> Sıfırla
        </button>
      )}
    </div>
  );
}

function BuilderView({ onAdd }) {
  const [step, setStep] = React.useState('base');
  const [selections, setSelections] = React.useState({});

  const select = (opt) => {
    setSelections(prev => {
      const next = { ...prev, [step]: opt };
      // Auto-advance to next incomplete step using fresh state
      const idx = BUILDER_STEPS.findIndex(s => s.id === step);
      for (let i = idx + 1; i < BUILDER_STEPS.length; i++) {
        if (!next[BUILDER_STEPS[i].id]) {
          setTimeout(() => setStep(BUILDER_STEPS[i].id), 300);
          break;
        }
      }
      return next;
    });
  };

  const reset = () => { setSelections({}); setStep('base'); };
  const currentOptions = BUILDER_OPTIONS[step] || [];
  const showImages = step === 'base';

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--carbon-950)', borderBottom: '1px solid var(--border-subtle)' }}>
        <img src={RCIMG.heroAction} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,9,12,0.5) 0%, rgba(8,9,12,0.95) 100%)' }} />
        <div className="rc-container" style={{ position: 'relative', padding: 'clamp(40px,6vw,72px) 0 clamp(20px,3vw,32px)' }}>
          <div className="rc-eyebrow" style={{ marginBottom: 12 }}>KONFİQURATOR</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2.4rem,5.5vw,4.5rem)', lineHeight: 0.88, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>
            RC <span style={{ color: 'var(--flame-500)' }}>BUILDER</span>
          </h1>
          <p style={{ marginTop: 14, fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: 520, lineHeight: 1.6 }}>
            Öz RC maşınını sıfırdan yığ — model, motor, batareya, təkər, süspansiyon və kuzov seç. Qiymət avtomatik hesablanır.
          </p>
        </div>
      </section>

      {/* Step nav */}
      <div style={{ background: 'var(--carbon-950)', position: 'sticky', top: 90, zIndex: 40 }}>
        <div className="rc-container">
          <BuilderStepNav steps={BUILDER_STEPS} current={step} selections={selections} onStep={setStep} />
        </div>
      </div>

      {/* Content */}
      <div className="rc-light" style={{ background: 'var(--bg-page)', paddingBottom: 56 }}>
        <div className="rc-container" style={{ padding: '32px 0 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }} className="rc-builder-grid">
            {/* Options */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ width: 32, height: 32, borderRadius: 999, background: 'var(--flame-soft)', display: 'grid', placeItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14, color: 'var(--flame-400)' }}>{BUILDER_STEPS.find(s => s.id === step).num}</span>
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text-strong)' }}>
                  {BUILDER_STEPS.find(s => s.id === step).label} SEÇ
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: showImages ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                {currentOptions.map(opt => (
                  <BuilderOptionCard key={opt.id} opt={opt} selected={selections[step]?.id === opt.id} onSelect={select} showImage={showImages} />
                ))}
              </div>
            </div>

            {/* Summary sidebar */}
            <BuilderSummary steps={BUILDER_STEPS} selections={selections} options={BUILDER_OPTIONS} onReset={reset} />
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BuilderView });

/* RC HUB — Product detail view */

function Gallery({ image }) {
  const [active, setActive] = React.useState(0);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[0,1,2,3].map(i => (
          <button key={i} onClick={() => setActive(i)} style={{ aspectRatio: '1', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'linear-gradient(180deg,#1c212c,#0c0e13)', border: `1px solid ${active===i ? 'var(--flame-500)' : 'var(--border-subtle)'}`, padding: 0, display: 'grid', placeItems: 'center', transition: 'border-color var(--dur-fast)' }}>
            {image ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: active===i ? 'none' : 'grayscale(0.4) brightness(0.8)' }} /> : <Icon name="truck" size={26} strokeWidth={1.2} color="var(--carbon-600)" />}
          </button>
        ))}
      </div>
      <div onClick={() => { if (image && window._openLightbox) window._openLightbox([image, image, image, image], active); }}
        style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 'var(--radius-xl)', background: 'radial-gradient(120% 100% at 50% 0%, #1d212c 0%, #0c0e13 100%)', border: '1px solid var(--border-subtle)', display: 'grid', placeItems: 'center', overflow: 'hidden', cursor: image ? 'zoom-in' : 'default' }}>
        {image && <img src={image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 60%, var(--flame-soft), transparent 60%)' }} />
        {!image && <Icon name="truck" size={150} strokeWidth={0.9} color="var(--carbon-600)" style={{ position: 'relative' }} />}
        <Badge tone="sale" solid cut style={{ position: 'absolute', top: 16, left: 16 }}>-13%</Badge>
      </div>
    </div>
  );
}

function ProductView({ product, onAdd, onBack, related }) {
  const p = product;
  const [tab, setTab] = React.useState('specs');
  const [qty, setQty] = React.useState(1);
  return (
    <div className="rc-container" style={{ padding: '24px 0 0' }}>
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, marginBottom: 18 }}
        onMouseEnter={(e)=>e.currentTarget.style.color='var(--flame-400)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-muted)'}>
        <Icon name="chevron-left" size={16} /> Kataloqa qayıt
      </button>

      <div className="rc-product-grid" style={{ display: 'grid', alignItems: 'start' }}>
        <Gallery image={p.image} />
        <div>
          <div className="rc-eyebrow" style={{ marginBottom: 10 }}>{p.brand} · {p.scale}</div>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', lineHeight: 1.1, color: 'var(--text-strong)' }}>{p.title}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[0,1,2,3,4].map(i => <Icon key={i} name="star" size={16} strokeWidth={0} color={i < Math.round(p.rating) ? 'var(--volt-500)' : 'var(--carbon-700)'} style={{ fill: i < Math.round(p.rating) ? 'var(--volt-500)' : 'var(--carbon-700)' }} />)}
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-muted)' }}>{p.rating.toFixed(1)} · 128 rəy</span>
            <Badge tone="stock" dot>STOKDA</Badge>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 22 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 38, color: 'var(--text-strong)' }}>{p.price}</span>
            {p.oldPrice && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 17, color: 'var(--text-faint)', textDecoration: 'line-through' }}>{p.oldPrice}</span>}
            {p.oldPrice && <Badge tone="sale" solid>ENDİRİM</Badge>}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)', marginTop: 4 }}>ƏDV daxil · 120 ₼-dən pulsuz çatdırılma</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 24 }}>
            {[['gauge', p.speed, 'SÜRƏT'], ['package', p.scale, 'MİQYAS'], ['bolt', '4WD', 'ÖTÜRMƏ']].map(([ic, v, l]) => (
              <div key={l} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                <Icon name={ic} size={18} color="var(--flame-400)" />
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16, color: 'var(--text-strong)', marginTop: 8 }}>{v}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-faint)' }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 26, alignItems: 'center', flexWrap: 'wrap' }}>
            <QuantityStepper value={qty} onChange={setQty} size="lg" />
            <Button variant="primary" size="lg" icon="cart" block onClick={() => onAdd(p, qty)}>SƏBƏTƏ AT — {p.price}</Button>
            <Button variant="outline" size="lg" style={{ flex: 'none', width: 52, padding: 0 }} aria-label="Sevimlilər"><Icon name="heart" size={20} /></Button>
          </div>

          <div style={{ marginTop: 32 }}>
            <Tabs value={tab} onChange={setTab} items={[
              { id: 'desc', label: 'Təsvir' },
              { id: 'specs', label: 'Spesifikasiya' },
              { id: 'parts', label: 'Hissələr' },
            ]} />
            <div style={{ paddingTop: 18 }}>
              {tab === 'desc' && <p style={{ fontSize: 14.5, color: 'var(--text-body)', lineHeight: 1.7 }}>Trasaya hazır, suya davamlı brushless platforma. Sənaye səviyyəli şassi, tam metal ötürmə və yüksək tutumlu LiPo dəstəyi ilə həm basher, həm də yarış üçün ideal. Qutudan çıxan kimi tam qaz ver.</p>}
              {tab === 'specs' && (
                <div>
                  <SpecRow label="Sürət" value={p.speed} icon="gauge" accent />
                  <SpecRow label="Miqyas" value={p.scale} icon="package" />
                  <SpecRow label="Ötürmə" value="4WD tam metal" icon="bolt" />
                  <SpecRow label="Mühərrik" value="BLX 2050 6S Brushless" icon="zap" />
                  <SpecRow label="Batareya" value="3S–6S LiPo (daxil deyil)" />
                  <SpecRow label="Hazırlıq" value="RTR — radio daxil" />
                </div>
              )}
              {tab === 'parts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {related.slice(0,3).map(pt => (
                    <div key={pt.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', background: 'var(--surface-raised)', display: 'grid', placeItems: 'center', flex: 'none' }}><Icon name="wrench" size={20} color="var(--carbon-500)" /></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, color: 'var(--text-strong)', fontWeight: 600 }}>{pt.title}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }}>{pt.sku}</div>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-strong)' }}>{pt.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '56px 0 0' }}>
        <SectionHead eyebrow="UYĞUN MODELLƏR" title="BUNLARI DA SÜR" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 18 }}>
          {related.filter(r => r.title).slice(0,4).map(r => <ProductCard key={r.id} {...r} onAdd={() => onAdd(r, 1)} />)}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProductView });

/* RC HUB — Sale view */

function SalePartCard({ pt, onAdd }) {
  return (
    <div style={{ display: 'flex', gap: 14, padding: 14, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', transition: 'border-color var(--dur-base), transform var(--dur-base)' }}
      onMouseEnter={(e)=>{e.currentTarget.style.borderColor='var(--border-flame)'; e.currentTarget.style.transform='translateY(-3px)';}}
      onMouseLeave={(e)=>{e.currentTarget.style.borderColor='var(--border-subtle)'; e.currentTarget.style.transform='none';}}>
      <div style={{ position: 'relative', width: 72, height: 72, borderRadius: 'var(--radius-md)', background: 'linear-gradient(180deg,#1c212c,#0c0e13)', display: 'grid', placeItems: 'center', flex: 'none' }}>
        <Icon name="wrench" size={26} color="var(--carbon-500)" />
        <Badge tone="sale" solid cut style={{ position: 'absolute', top: -6, left: -6 }}>{pt.badge.label}</Badge>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', color: 'var(--flame-400)' }}>{pt.brand}</span>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)', margin: '3px 0', lineHeight: 1.3 }}>{pt.title}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }}>{pt.sku}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: 'var(--volt-500)' }}>{pt.price}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)', textDecoration: 'line-through' }}>{pt.oldPrice}</span>
          </div>
          <Button variant="primary" size="sm" icon="cart" onClick={() => onAdd(pt, 1)}>AT</Button>
        </div>
      </div>
    </div>
  );
}

function SaleView({ data, onOpen, onAdd }) {
  const saleCars = data.products.filter(p => p.oldPrice);
  const saleParts = data.parts.filter(p => p.oldPrice);

  return (
    <div>
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--grad-flame)' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.18, background: 'repeating-linear-gradient(115deg, transparent 0 22px, rgba(0,0,0,0.4) 22px 24px)' }} />
        <div className="rc-container" style={{ position: 'relative', padding: 'clamp(40px,6vw,72px) 0' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>SPRING WEEKS · BİTMƏK ÜZRƏ</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2.6rem,6vw,5rem)', lineHeight: 0.88, letterSpacing: '-0.02em', color: '#fff', marginTop: 6 }}>52%-Ə QƏDƏR ENDİRİM</h1>
          <p style={{ marginTop: 12, fontSize: '1.05rem', color: 'rgba(255,255,255,0.92)', maxWidth: 520, lineHeight: 1.6 }}>Endirimli RC modellər və ehtiyat hissələri — stoklar tükənənə qədər. Tam qaz, yarı qiymət.</p>
        </div>
      </section>

      <div className="rc-light" style={{ background: 'var(--bg-page)', paddingBottom: 56 }}>
        <div className="rc-container" style={{ padding: '48px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
            <Icon name="zap" size={22} color="var(--flame-500)" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.6rem,3vw,2.4rem)', lineHeight: 1, color: 'var(--text-strong)' }}>ENDİRİMDƏ RC MODELLƏR</h2>
            <Badge tone="sale" solid>{saleCars.length}</Badge>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(228px, 1fr))', gap: 18 }}>
            {saleCars.map(p => (
              <div key={p.id} onClick={() => onOpen(p)} style={{ cursor: 'pointer' }}><ProductCard {...p} onAdd={() => onAdd(p)} /></div>
            ))}
          </div>
        </div>

        <div className="rc-container" style={{ padding: '52px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
            <Icon name="wrench" size={22} color="var(--flame-500)" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.6rem,3vw,2.4rem)', lineHeight: 1, color: 'var(--text-strong)' }}>ENDİRİMDƏ EHTİYAT HİSSƏLƏRİ</h2>
            <Badge tone="sale" solid>{saleParts.length}</Badge>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
            {saleParts.map(pt => <SalePartCard key={pt.id} pt={pt} onAdd={onAdd} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SaleView });

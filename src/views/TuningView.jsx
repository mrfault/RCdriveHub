import React from "react";
import { Icon, Button, Badge, FilterChip, SearchBar } from "../components/index.jsx";
import { SectionHead } from "./HomeView.jsx";
import { RCIMG } from "../data.js";
import { useApp } from "../AppContext.jsx";


function TuningCategoryCard({ cat, onClick }) {
  return (
    <button type="button" onClick={onClick}
      style={{ position: 'relative', textAlign: 'left', padding: '22px 18px', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'transform var(--dur-base) var(--ease-power), border-color var(--dur-base)' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--border-flame)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}>
      <Icon name={cat.icon} size={28} strokeWidth={1.5} style={{ color: 'var(--flame-400)', marginBottom: 16 }} />
      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-strong)' }}>{cat.name}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>{cat.count} məhsul</div>
      <Icon name="arrow-right" size={16} style={{ position: 'absolute', top: 20, right: 16, color: 'var(--carbon-600)' }} />
    </button>
  );
}

function TuningPartRow({ pt, onAdd }) {
  const { openLightbox } = useApp();
  return (
    <div style={{ display: 'flex', gap: 14, padding: 16, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', transition: 'border-color var(--dur-base), transform var(--dur-base)' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-flame)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'none'; }}>
      <div onClick={() => { if (pt.image) openLightbox([pt.image], 0); }}
        style={{ position: 'relative', width: 88, height: 88, borderRadius: 'var(--radius-md)', background: 'linear-gradient(180deg,#1c212c,#0c0e13)', display: 'grid', placeItems: 'center', flex: 'none', overflow: 'hidden', cursor: pt.image ? 'zoom-in' : 'default' }}>
        {pt.image
          ? <img src={pt.image} alt={pt.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <Icon name="wrench" size={26} color="var(--carbon-500)" />}
        {pt.badge && <Badge tone={pt.badge.tone} solid={pt.badge.tone === 'sale'} cut style={{ position: 'absolute', top: -6, left: -6 }}>{pt.badge.label}</Badge>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', color: 'var(--flame-400)' }}>{pt.brand}</span>
          {pt.badge && <Badge tone={pt.badge.tone}>{pt.badge.label}</Badge>}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)', margin: '4px 0', lineHeight: 1.3 }}>{pt.title}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }}>{pt.sku} · uyğun: {pt.fit}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: pt.oldPrice ? 'var(--volt-500)' : 'var(--text-strong)' }}>{pt.price}</span>
            {pt.oldPrice && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)', textDecoration: 'line-through' }}>{pt.oldPrice}</span>}
          </div>
          <Button variant="primary" size="sm" icon="cart" onClick={() => onAdd(pt, 1)}>AT</Button>
        </div>
      </div>
    </div>
  );
}

export default function TuningView({ data, onAdd }) {
  const [activeCat, setActiveCat] = React.useState(null);
  const [searchVal, setSearchVal] = React.useState('');
  const allParts = data.parts;
  const cats = data.tuningCategories || [];

  const filtered = activeCat
    ? allParts.filter(p => p.cat === activeCat)
    : allParts;

  const searched = searchVal.trim()
    ? filtered.filter(p =>
        p.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchVal.toLowerCase())
      )
    : filtered;

  const activeCatName = activeCat && cats.find(c => c.id === activeCat);

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--carbon-950)', borderBottom: '1px solid var(--border-subtle)' }}>
        <img src={RCIMG.demo} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(8,9,12,0.92) 0%, rgba(8,9,12,0.6) 60%, rgba(8,9,12,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.12, background: 'repeating-linear-gradient(115deg, transparent 0 30px, rgba(255,77,20,0.15) 30px 32px)' }} />
        <div className="rc-container" style={{ position: 'relative', padding: 'clamp(40px,6vw,72px) 0' }}>
          <div className="rc-eyebrow" style={{ marginBottom: 12 }}>TUNİNQ & EHTİYAT HİSSƏLƏR</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2.4rem,5.5vw,4.5rem)', lineHeight: 0.88, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>
            MODELİNİ<br /><span style={{ color: 'var(--flame-500)' }}>GÜCLƏNDİR</span>
          </h1>
          <p style={{ marginTop: 14, fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: 520, lineHeight: 1.6 }}>
            Performans hissələri, yükseltmə dəstləri və aksessuarlar — hər brend, hər model üçün.
          </p>
          <div style={{ maxWidth: 560, marginTop: 24 }}>
            <SearchBar size="lg" placeholder="Hissə nömrəsi və ya ad axtar..." onSubmit={(v) => setSearchVal(v)} />
          </div>
        </div>
      </section>

      <div className="rc-light" style={{ background: 'var(--bg-page)', paddingBottom: 56 }}>
        {/* Category grid */}
        <div className="rc-container" style={{ padding: '48px 0 0' }}>
          <SectionHead eyebrow="KATEQORİYALAR" title="NƏ AXTARIRSAN?" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14 }}>
            {cats.map(c => (
              <TuningCategoryCard key={c.id} cat={c} onClick={() => setActiveCat(activeCat === c.id ? null : c.id)} />
            ))}
          </div>
        </div>

        {/* Active filter chips */}
        <div className="rc-container" style={{ padding: '32px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            <FilterChip active={!activeCat} onClick={() => setActiveCat(null)}>Hamısı</FilterChip>
            {cats.map(c => (
              <FilterChip key={c.id} active={activeCat === c.id} onClick={() => setActiveCat(activeCat === c.id ? null : c.id)}>
                {c.name}
              </FilterChip>
            ))}
            {activeCat && (
              <button type="button" onClick={() => setActiveCat(null)} style={{ background: 'none', border: 'none', color: 'var(--flame-400)', fontSize: 12.5, fontWeight: 600 }}>Təmizlə</button>
            )}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)', marginLeft: 'auto' }}>{searched.length} nəticə</span>
          </div>
        </div>

        {/* Results */}
        <div className="rc-container" style={{ padding: '0' }}>
          {activeCatName && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
              <Icon name={activeCatName.icon} size={22} color="var(--flame-500)" />
              <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.6rem,3vw,2.4rem)', lineHeight: 1, color: 'var(--text-strong)' }}>{activeCatName.name}</h2>
              <Badge tone="neutral">{searched.length}</Badge>
            </div>
          )}

          {searched.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <Icon name="wrench" size={48} strokeWidth={1.2} color="var(--carbon-600)" style={{ margin: '0 auto 14px' }} />
              <p style={{ color: 'var(--text-muted)', marginBottom: 8 }}>Bu kateqoriyada hissə tapılmadı.</p>
              <button type="button" onClick={() => { setActiveCat(null); setSearchVal(''); }} style={{ background: 'none', border: 'none', color: 'var(--flame-400)', fontWeight: 600, fontSize: 14 }}>Bütün hissələrə bax</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
              {searched.map(pt => (
                <TuningPartRow key={pt.id} pt={pt} onAdd={onAdd} />
              ))}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 36 }}>
            <Button variant="outline" size="lg">DAHA ÇOX YÜKLƏ</Button>
          </div>
        </div>
      </div>
    </div>
  );
}


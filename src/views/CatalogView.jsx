import React from "react";
import { Icon, ProductCard, FilterChip, Badge, Button } from "../components/index.jsx";


function FacetGroup({ title, children }) {
  return (
    <div style={{ paddingBlock: 18, borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 14 }}>{title}</div>
      {children}
    </div>
  );
}

function CheckRow({ label, count, checked, onToggle }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', cursor: 'pointer', color: checked ? 'var(--text-strong)' : 'var(--text-body)' }}>
      <span onClick={onToggle} style={{ width: 18, height: 18, borderRadius: 4, border: `1px solid ${checked ? 'var(--flame-500)' : 'var(--border-strong)'}`, background: checked ? 'var(--grad-flame)' : 'transparent', display: 'grid', placeItems: 'center', flex: 'none', transition: 'all var(--dur-fast)' }}>
        {checked && <Icon name="check" size={12} strokeWidth={3} color="#fff" />}
      </span>
      <span style={{ flex: 1, fontSize: 13.5 }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }}>{count}</span>
    </label>
  );
}

export default function CatalogView({ data, onOpen, onAdd }) {
  const [sel, setSel] = React.useState(() => new Set());
  const [sort, setSort] = React.useState('Populyar');
  const [sortOpen, setSortOpen] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(10);
  const toggle = (id) => setSel(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const sorts = ['Populyar', 'Ən ucuz', 'Ən bahalı', 'Yeni gələnlər'];

  // Close sort dropdown on outside click
  React.useEffect(() => {
    if (!sortOpen) return;
    const close = () => setSortOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [sortOpen]);

  // Filter products
  const catFilters = [...sel].filter(id => data.categories.some(c => c.id === id));
  const brandFilters = [...sel].filter(id => data.brands.includes(id));
  let filtered = data.products.filter(p => {
    if (catFilters.length > 0 && !catFilters.includes(p.cat)) return false;
    if (brandFilters.length > 0 && !brandFilters.includes(p.brand)) return false;
    return true;
  });
  // Sort
  const parsePrice = (s) => parseFloat(String(s).replace(/[^\d,]/g, '').replace(',', '.')) || 0;
  if (sort === 'Ən ucuz') filtered = [...filtered].sort((a,b) => parsePrice(a.price) - parsePrice(b.price));
  if (sort === 'Ən bahalı') filtered = [...filtered].sort((a,b) => parsePrice(b.price) - parsePrice(a.price));

  return (
    <div className="rc-container" style={{ padding: '28px 0 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--text-faint)', marginBottom: 10 }}>
        ANA SƏHİFƏ <span style={{ color: 'var(--carbon-600)' }}>/</span> RC FAHRZEUGE <span style={{ color: 'var(--flame-500)' }}>/ HAMISI</span>
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 0.95, color: 'var(--text-strong)', marginBottom: 22 }}>RC MODELLƏR</h1>

      <div className="rc-catalog-wrap" style={{ display: 'grid', gridTemplateColumns: '252px 1fr', gap: 32, alignItems: 'start' }}>
        <aside className="rc-hide-md" style={{ position: 'sticky', top: 120 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Icon name="sliders" size={18} color="var(--flame-500)" />
            <span style={{ fontWeight: 700, color: 'var(--text-strong)', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: 14 }}>Filtrlər</span>
          </div>
          <FacetGroup title="Kateqoriya">
            {data.categories.slice(0, 5).map(c => <CheckRow key={c.id} label={c.name} count={c.count} checked={sel.has(c.id)} onToggle={() => toggle(c.id)} />)}
          </FacetGroup>
          <FacetGroup title="Brend">
            {data.brands.slice(0, 5).map((b, i) => <CheckRow key={b} label={b} count={[34,21,28,17,12][i]} checked={sel.has(b)} onToggle={() => toggle(b)} />)}
          </FacetGroup>
          <FacetGroup title="Hazırlıq səviyyəsi">
            {[['RTR (hazır)',46],['Kit (yığ)',23],['Roller',9]].map(([b,c]) => <CheckRow key={b} label={b} count={c} checked={sel.has(b)} onToggle={() => toggle(b)} />)}
          </FacetGroup>
          <FacetGroup title="Sürət">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['20+', '40+', '60+', '80+', '100+'].map(s => <FilterChip key={s} active={sel.has('spd'+s)} onClick={() => toggle('spd'+s)}>{s} km/s</FilterChip>)}
            </div>
          </FacetGroup>
        </aside>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{filtered.length} nəticə</span>
              {[...sel].slice(0, 4).map(id => <FilterChip key={id} active removable onRemove={() => toggle(id)}>{id}</FilterChip>)}
              {sel.size > 0 && <button type="button" onClick={() => setSel(new Set())} style={{ background: 'none', border: 'none', color: 'var(--flame-400)', fontSize: 12.5, fontWeight: 600 }}>Təmizlə</button>}
            </div>
            <div style={{ position: 'relative' }}>
              <button type="button" onClick={() => setSortOpen(o => !o)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', color: 'var(--text-body)', fontSize: 13 }}>
                <span style={{ color: 'var(--text-faint)' }}>Sırala:</span> <strong style={{ color: 'var(--text-strong)' }}>{sort}</strong>
                <Icon name="chevron-down" size={15} />
              </button>
              {sortOpen && (
                <div style={{ position: 'absolute', right: 0, top: '110%', zIndex: 20, minWidth: 180, background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
                  {sorts.map(s => (
                    <button type="button" key={s} onClick={() => { setSort(s); setSortOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', background: s === sort ? 'var(--flame-soft)' : 'transparent', border: 'none', color: s === sort ? 'var(--flame-300)' : 'var(--text-body)', fontSize: 13 }}>{s}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 18 }}>
            {filtered.slice(0, visibleCount).map(p => (
              <div key={p.id} onClick={() => onOpen(p)} style={{ cursor: 'pointer' }}>
                <ProductCard {...p} onAdd={(e) => { onAdd(p); }} />
              </div>
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 36 }}>
              <Button variant="outline" size="lg" onClick={() => setVisibleCount(c => c + 10)}>DAHA ÇOX YÜKLƏ</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


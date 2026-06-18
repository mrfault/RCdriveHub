/* RC HUB — Favorites view */

function FavoritesView({ data, onOpen, onAdd, onNav }) {
  const [favs, setFavs] = React.useState(() => [1, 2, 3, 5, 6].map(i => data.products[i]));
  const remove = (id) => setFavs(f => f.filter(p => p.id !== id));

  return (
    <div className="rc-container" style={{ padding: '28px 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 0.95, color: 'var(--text-strong)' }}>SEÇİLMİŞLƏR</h1>
        <Badge tone="new" icon="heart">{favs.length}</Badge>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14 }}>Seçdiyin modelləri burada saxla — qiymət düşəndə xəbər veririk.</p>

      {favs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Icon name="heart" size={48} strokeWidth={1.2} color="var(--carbon-600)" style={{ margin: '0 auto 14px' }} />
          <p style={{ color: 'var(--text-muted)', marginBottom: 18 }}>Hələ seçilmiş yoxdur.</p>
          <Button variant="primary" icon="zap" onClick={() => onNav('catalog')}>MODELLƏRƏ BAX</Button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(228px, 1fr))', gap: 18, gridAutoRows: '1fr' }}>
          {favs.map(p => (
            <div key={p.id} style={{ position: 'relative', height: '100%' }}>
              <div onClick={() => onOpen(p)} style={{ cursor: 'pointer', height: '100%' }}><ProductCard {...p} onAdd={() => onAdd(p)} style={{ height: '100%', display: 'flex', flexDirection: 'column' }} /></div>
              <button type="button" onClick={() => remove(p.id)} aria-label="Seçilmişlərdən sil"
                style={{ position: 'absolute', top: 10, right: 10, width: 34, height: 34, borderRadius: 999, display: 'grid', placeItems: 'center', background: 'rgba(8,9,12,0.7)', border: '1px solid var(--border-flame)', color: 'var(--flame-400)', backdropFilter: 'blur(6px)', zIndex: 2 }}>
                <Icon name="heart" size={16} style={{ fill: 'var(--flame-500)' }} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { FavoritesView });

import React from "react";
import { Icon, IconButton, Logo, SearchBar, Button } from "../components/index.jsx";


export function TopBar() {
  return (
    <div className="rc-hide-sm" style={{ background: 'var(--carbon-950)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="rc-container" style={{ height: 34, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="truck" size={14} color="var(--flame-500)" /> 120 ₼-dən yuxarı pulsuz çatdırılma</span>
        <span style={{ display: 'flex', gap: 22 }}>
          <span className="rc-hide-sm">Eyni gün göndəriş</span>
          <span style={{ color: 'var(--flame-400)' }}>200.000+ hissə stokda</span>
        </span>
      </div>
    </div>
  );
}

export function MobileMenu({ nav, current, onNav, onClose }) {
  return (
    <div className="rc-mobile-menu" onClick={onClose}>
      <button type="button" onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ position: 'absolute', top: 20, right: 20, width: 44, height: 44, borderRadius: 999, display: 'grid', placeItems: 'center', background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', color: 'var(--text-strong)', fontSize: 0, padding: 0 }}>
        <Icon name="x" size={22} />
      </button>
      {nav.map(n => (
        <button type="button" key={n.label} onClick={(e) => { e.stopPropagation(); onNav(n.id); onClose(); }}
          style={{ color: current === n.id ? 'var(--flame-500)' : undefined }}>
          {n.label}
        </button>
      ))}
      <div style={{ marginTop: 'auto', display: 'flex', gap: 12 }}>
        <Button variant="outline" icon="user" onClick={(e) => { e.stopPropagation(); onNav('account'); onClose(); }}>Hesab</Button>
        <Button variant="outline" icon="heart" onClick={(e) => { e.stopPropagation(); onNav('favorites'); onClose(); }}>Sevimlilər</Button>
      </div>
    </div>
  );
}

export function Header({ nav, current, onNav, cartCount, onSearch }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <TopBar />
      <div style={{ background: 'rgba(14,16,20,0.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="rc-container" style={{ height: 60, display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Mobile hamburger */}
          <button type="button" className="rc-show-md" onClick={() => setMenuOpen(true)}
            style={{ background: 'none', border: 'none', padding: 4, color: 'var(--text-strong)', display: 'none' }}>
            <Icon name="menu" size={24} />
          </button>
          <button type="button" onClick={() => onNav('home')} style={{ background: 'none', border: 'none', padding: 0 }}><Logo size={24} /></button>
          <nav className="rc-hide-md" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {nav.map((n) => {
              const isBuilder = n.id === 'builder';
              const defaultColor = isBuilder ? 'var(--flame-500)' : 'var(--carbon-200)';
              const activeColor = 'var(--text-strong)';
              return (
                <button type="button" key={n.label} onClick={() => onNav(n.id)}
                  lang={n.lang || undefined}
                  className={isBuilder && current !== n.id ? 'rc-nav-builder' : ''}
                  style={{ position: 'relative', padding: '8px 12px', background: 'none', border: 'none', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 13, letterSpacing: '0.04em', textTransform: 'uppercase', color: current === n.id ? activeColor : defaultColor, transition: 'color var(--dur-fast)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--flame-400)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = current === n.id ? activeColor : defaultColor}>
                  {n.label}
                  {current === n.id && <span style={{ position: 'absolute', left: 12, right: 12, bottom: 0, height: 2, background: 'var(--grad-flame)' }} />}
                </button>
              );
            })}
          </nav>
          <div style={{ flex: 1, maxWidth: 360, marginLeft: 'auto' }} className="rc-hide-sm">
            <SearchBar size="sm" onSubmit={onSearch} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
            {/* Music toggle — desktop only */}
            <button type="button" onClick={() => window._toggleMusic && window._toggleMusic()} aria-label="Musiqi"
              className={(window._musicPlaying ? 'rc-eq-playing' : 'rc-eq-paused') + ' rc-hide-sm'}
              style={{ width: 40, height: 40, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 2, background: 'none', border: '1px solid transparent', borderRadius: 'var(--radius-md)', transition: 'background var(--dur-base)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
              <span className="rc-eq-bar" style={{ height: 4 }} />
              <span className="rc-eq-bar" style={{ height: 4 }} />
              <span className="rc-eq-bar" style={{ height: 4 }} />
            </button>
            <IconButton name="user" label="Hesab" onClick={() => onNav('account')} className="rc-hide-sm" />
            <IconButton name="heart" label="Sevimlilər" onClick={() => onNav('favorites')} className="rc-hide-sm" />
            <IconButton name="cart" count={cartCount} label="Səbət" onClick={() => onNav('cart')} />
          </div>
        </div>
      </div>
      {menuOpen && <MobileMenu nav={nav} current={current} onNav={onNav} onClose={() => setMenuOpen(false)} />}
    </header>
  );
}

export function Reassurance() {
  const items = [
    { icon: 'truck', t: 'Sürətli göndəriş', s: 'Eyni gün · 120 ₼-dən pulsuz' },
    { icon: 'shield', t: 'Rəsmi zəmanət', s: 'Bütün modellərə zəmanət' },
    { icon: 'wrench', t: 'Ekspert dəstək', s: 'Real RC-çilərdən məsləhət' },
    { icon: 'package', t: '200.000+ hissə', s: 'Anbardan dərhal hazır' },
  ];
  return (
    <div className="rc-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 1, background: 'var(--border-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', margin: '0 auto' }}>
      {items.map(it => (
        <div key={it.t} style={{ background: 'var(--surface-card)', padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', background: 'var(--flame-soft)', display: 'grid', placeItems: 'center', flex: 'none' }}><Icon name={it.icon} size={18} color="var(--flame-400)" /></div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-strong)', fontSize: 13 }}>{it.t}</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{it.s}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function BrandMarquee({ brands }) {
  const row = [...brands, ...brands];
  return (
    <div style={{ overflow: 'hidden', borderBlock: '1px solid var(--border-subtle)', background: 'var(--carbon-950)', padding: '16px 0' }}>
      <div style={{ display: 'flex', gap: 40, width: 'max-content', animation: 'rc-marquee 26s linear infinite' }}>
        {row.map((b, i) => (
          <span key={b + '_' + i} style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--carbon-600)', whiteSpace: 'nowrap', transition: 'color var(--dur-base)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--flame-500)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--carbon-600)'}>{b}</span>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  const cols = [
    { h: 'Mağaza', links: ['RC Modellər', 'Ehtiyat hissələri', 'Tuning', 'Elektronika', 'Endirimlər'] },
    { h: 'Dəstək', links: ['Çatdırılma', 'Qaytarma', 'Hissə tap', 'Əlaqə', 'FAQ'] },
  ];
  return (
    <footer style={{ background: 'var(--carbon-950)', borderTop: '1px solid var(--border-subtle)', marginTop: 64 }}>
      <div className="rc-container" style={{ padding: '40px 0 24px', display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: 40 }}>
        <div>
          <Logo size={26} />
          <p style={{ marginTop: 12, fontSize: 13, color: 'var(--text-muted)', maxWidth: 280, lineHeight: 1.6 }}>Adrenalin dolu RC dünyası. Modellər, ehtiyat hissələri və tam qaz dəstək — bir ünvanda.</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <IconButton name="zap" variant="outline" size="sm" />
            <IconButton name="flag" variant="outline" size="sm" />
            <IconButton name="truck" variant="outline" size="sm" />
          </div>
        </div>
        {cols.map(c => (
          <div key={c.h}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 14 }}>{c.h}</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {c.links.map(l => <li key={l}><a href="#" style={{ fontSize: 13.5, color: 'var(--text-muted)' }} onMouseEnter={(e)=>e.target.style.color='var(--flame-400)'} onMouseLeave={(e)=>e.target.style.color='var(--text-muted)'}>{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="rc-container" style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', letterSpacing: '0.04em' }}>
          <span>&copy; 2026 RC DriveHub — bütün hüquqlar qorunur</span>
          <span>RC HUB Azerbaijan</span>
        </div>
      </div>
    </footer>
  );
}


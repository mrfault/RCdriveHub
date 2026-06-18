import React from "react";
import { Icon, Button, ProductCard, Badge } from "../components/index.jsx";
import { Reassurance, BrandMarquee } from "../components/chrome.jsx";


export function SectionHead({ eyebrow, title, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
      <div>
        {eyebrow && <div className="rc-eyebrow" style={{ marginBottom: 8 }}>{eyebrow}</div>}
        <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 0.95, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>{title}</h2>
      </div>
      {action && <Button variant="ghost" trailingIcon="arrow-right" onClick={onAction}>{action}</Button>}
    </div>
  );
}

function SpeedLines() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.5 }}>
      {[18, 34, 52, 70, 86].map((t, i) => (
        <div key={i} style={{ position: 'absolute', top: `${t}%`, left: '-10%', right: '-10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,77,20,0.35), transparent)', transform: 'skewY(-3deg)' }} />
      ))}
    </div>
  );
}

const HERO_VIDEOS = ['assets/hero1.mp4', 'assets/hero2.mp4'];

function HeroMedia() {
  const isDesktop = window.innerWidth > 768;
  const [current, setCurrent] = React.useState(0);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (!isDesktop) return;
    const v = videoRef.current;
    if (!v) return;
    v.src = HERO_VIDEOS[current];
    v.load();
    v.play().catch(() => {});
    const onEnd = () => setCurrent(c => (c + 1) % HERO_VIDEOS.length);
    v.addEventListener('ended', onEnd);
    return () => v.removeEventListener('ended', onEnd);
  }, [current, isDesktop]);

  if (!isDesktop) {
    return <img src={RCIMG.heroAction2} alt="RC off-road truck" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />;
  }

  return (
    <video ref={videoRef} muted playsInline autoPlay
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
  );
}

function HeroB({ onShop, onFinder }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--carbon-950)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="rc-container rc-hero-split" style={{ position: 'relative', padding: '0', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'clamp(440px, 60vh, 600px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px,5vw,72px) clamp(20px,4vw,56px) clamp(40px,5vw,72px) 0' }} className="rc-reveal">
          <div className="rc-eyebrow" style={{ marginBottom: 16 }}>SPRING WEEKS · 52%-Ə QƏDƏR ENDİRİM</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 0.88, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>
            YOLSUZLUQLARI<br /><span style={{ color: 'var(--flame-500)' }}>FƏTH ET</span>
          </h1>
          <p style={{ marginTop: 18, fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: 420, lineHeight: 1.6 }}>
            Mövsümün ən güclü RC modelləri — palçıq, asfalt və qaya üçün hazır. İndi al, sabah sür.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" trailingIcon="arrow-right" onClick={onShop}>İNDİ AL</Button>
            <Button variant="ghost" size="lg" onClick={onFinder}>Hədiyyə bələdçisi</Button>
          </div>
        </div>
        <div className="rc-hero-img" style={{ position: 'relative', background: 'var(--carbon-950)', overflow: 'hidden', display: 'grid', placeItems: 'center' }}>
          <HeroMedia />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,11,13,0.85) 0%, rgba(10,11,13,0.25) 50%, transparent 100%), radial-gradient(70% 60% at 60% 40%, var(--flame-soft), transparent 70%)' }} />
          <SpeedLines />
        </div>
      </div>
    </section>
  );
}

function CategoryGrid({ cats, onPick }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14 }}>
      {cats.map(c => (
        <button type="button" key={c.id} onClick={() => onPick(c.id)}
          style={{ position: 'relative', textAlign: 'left', padding: '22px 18px', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'transform var(--dur-base) var(--ease-power), border-color var(--dur-base)' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--border-flame)'; e.currentTarget.querySelector('.ci').style.color = 'var(--flame-500)'; e.currentTarget.querySelector('.ci').style.transform = 'translateX(3px) rotate(-6deg)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.querySelector('.ci').style.color = 'var(--text-muted)'; e.currentTarget.querySelector('.ci').style.transform = 'none'; }}>
          <Icon name={c.icon} size={30} strokeWidth={1.5} className="ci" style={{ color: 'var(--text-muted)', transition: 'color var(--dur-base), transform var(--dur-base) var(--ease-overshoot)', marginBottom: 28 }} />
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-strong)' }}>{c.name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>{c.count} məhsul</div>
          <Icon name="arrow-right" size={16} style={{ position: 'absolute', top: 20, right: 16, color: 'var(--carbon-600)' }} />
        </button>
      ))}
    </div>
  );
}

export default function HomeView({ data, onNav, onAdd }) {
  return (
    <div>
      <HeroB onShop={() => onNav('catalog')} onFinder={() => onNav('finder')} />
      <div className="rc-light" style={{ background: 'var(--bg-page)', paddingTop: 56, paddingBottom: 72 }}>
        <div><Reassurance /></div>
        <div className="rc-container" style={{ padding: '64px 0 0' }}>
          <SectionHead eyebrow="KATEQORİYALAR" title="NƏYİ SÜRÜRSƏN?" />
          <CategoryGrid cats={data.categories} onPick={() => onNav('catalog')} />
        </div>
        <div className="rc-container" style={{ padding: '64px 0 0' }}>
          <SectionHead eyebrow="BESTSELLER" title="İCMANIN SEÇİMİ" action="Hamısına bax" onAction={() => onNav('catalog')} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(228px, 1fr))', gap: 18 }}>
            {data.products.slice(0, 5).map(p => (
              <ProductCard key={p.id} {...p} onAdd={() => onAdd(p)} />
            ))}
          </div>
        </div>
        <div className="rc-container" style={{ padding: '64px 0 0' }}>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-xl)', background: 'var(--grad-flame)', padding: 'clamp(32px,5vw,56px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.18, background: 'repeating-linear-gradient(115deg, transparent 0 22px, rgba(0,0,0,0.4) 22px 24px)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase' }}>SPRING WEEKS · BİTMƏK ÜZRƏ</div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', lineHeight: 0.9, color: '#fff', marginTop: 6 }}>52%-Ə QƏDƏR ENDİRİM</div>
            </div>
            <Button variant="secondary" size="lg" trailingIcon="arrow-right" onClick={() => onNav('sale')} style={{ position: 'relative', background: '#0e1014', color: '#fff' }}>SALE-A KEÇ</Button>
          </div>
        </div>
        <div className="rc-container" style={{ padding: '64px 0 0' }}>
          <SectionHead eyebrow="EHTİYAT & TUNING" title="HİSSƏ AXTARIRSAN?" action="Hissə tap" onAction={() => onNav('finder')} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(228px, 1fr))', gap: 18 }}>
            {data.products.slice(5, 10).map(p => (
              <ProductCard key={p.id} {...p} onAdd={() => onAdd(p)} />
            ))}
          </div>
        </div>
      </div>
      <BrandMarquee brands={data.brands} />
    </div>
  );
}


import React, { useState, useRef, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { RCDATA, RCIMG } from './data.js';
import { Icon, Lightbox, Logo } from './components/index.jsx';
import { Header, Footer } from './components/chrome.jsx';
import { AppContext } from './AppContext.jsx';
import HomeView from './views/HomeView.jsx';
import nfsSrc from './assets/nfs.mp3';

const CatalogView = lazy(() => import('./views/CatalogView.jsx'));
const ProductView = lazy(() => import('./views/ProductView.jsx'));
const PartFinderView = lazy(() => import('./views/PartFinderView.jsx'));
const CartView = lazy(() => import('./views/CartView.jsx'));
const SaleView = lazy(() => import('./views/SaleView.jsx'));
const FavoritesView = lazy(() => import('./views/FavoritesView.jsx'));
const AccountView = lazy(() => import('./views/AccountView.jsx'));
const TuningView = lazy(() => import('./views/TuningView.jsx'));
const BuilderView = lazy(() => import('./views/BuilderView.jsx'));

const NAV = [
  { id: 'catalog', label: 'Modellər' },
  { id: 'finder', label: 'Ehtiyat hissələri' },
  { id: 'tuning', label: 'Tuning' },
  { id: 'builder', label: 'RC BUILDER', lang: 'en' },
  { id: 'sale', label: 'Endirimlər' },
];

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) return (
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
        <h2 style={{ color: 'var(--flame-500)' }}>Xəta baş verdi</h2>
        <p>{this.state.error.message}</p>
        <button type="button" onClick={() => { this.setState({ error: null }); window.location.reload(); }}
          style={{ padding: '10px 24px', background: 'var(--grad-flame)', color: '#fff', border: 'none', borderRadius: 6, marginTop: 16, cursor: 'pointer' }}>Yenidən yüklə</button>
      </div>
    );
    return this.props.children;
  }
}

function SplashScreen({ onEnter }) {
  return (
    <div role="button" tabIndex={0} onClick={onEnter} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onEnter(); }} style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'var(--carbon-950)', display: 'flex', flexDirection: 'column', cursor: 'pointer', animation: 'rc-rise 500ms var(--ease-power) both', outline: 'none' }}>
      <div style={{ padding: '24px 0 0' }} className="rc-container"><Logo size={28} /></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2.5rem,6vw,4.5rem)', lineHeight: 0.9, color: 'var(--text-strong)', textAlign: 'center' }}>
          Böyüklərin <span style={{ color: 'var(--flame-500)' }}>kiçik arzuları</span>
        </h2>
        <div className="rc-float" style={{ marginTop: 36 }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" stroke="var(--flame-500)" strokeWidth="1" opacity="0.15"><animate attributeName="r" values="44;48;44" dur="2s" repeatCount="indefinite" /></circle>
            <path d="M 15 65 A 40 40 0 1 1 85 65" stroke="var(--carbon-700)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 15 65 A 40 40 0 1 1 85 65" stroke="url(#splashGaugeGrad)" strokeWidth="6" strokeLinecap="round" fill="none" strokeDasharray="200" strokeDashoffset="200"><animate attributeName="stroke-dashoffset" values="200;40;200" dur="2.2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" /></path>
            <line x1="50" y1="50" x2="50" y2="22" stroke="var(--flame-500)" strokeWidth="3" strokeLinecap="round"><animateTransform attributeName="transform" type="rotate" values="-50 50 50;60 50 50;-50 50 50" dur="2.2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" /></line>
            <circle cx="50" cy="50" r="6" fill="var(--carbon-800)" stroke="var(--flame-500)" strokeWidth="2" />
            <circle cx="50" cy="50" r="2.5" fill="var(--flame-500)"><animate attributeName="r" values="2;3;2" dur="1s" repeatCount="indefinite" /></circle>
            <text x="50" y="72" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">KM/S</text>
            <defs><linearGradient id="splashGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="var(--flame-300)" /><stop offset="100%" stopColor="#FF4D14" /></linearGradient></defs>
          </svg>
        </div>
        <p style={{ color: 'var(--text-faint)', fontSize: 13, marginTop: 24, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>Davam etmək üçün klik edin</p>
      </div>
    </div>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem('rc_cookies'));
  if (!visible) return null;
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 250, background: 'var(--carbon-950)', borderTop: '1px solid var(--border-subtle)', backdropFilter: 'blur(12px)', animation: 'rc-rise 400ms var(--ease-power) both' }}>
      <div className="rc-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, padding: '16px 0', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 260 }}>
          <Icon name="shield" size={20} color="var(--flame-400)" style={{ flex: 'none' }} />
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>Bu sayt təcrübənizi yaxşılaşdırmaq üçün cookies istifadə edir.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flex: 'none' }}>
          <button type="button" onClick={() => { localStorage.setItem('rc_cookies', 'denied'); setVisible(false); }}
            style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--border-strong)', borderRadius: 6, color: 'var(--text-body)', fontSize: 13, fontWeight: 600 }}>Rədd et</button>
          <button type="button" onClick={() => { localStorage.setItem('rc_cookies', 'accepted'); setVisible(false); }}
            style={{ padding: '8px 16px', background: 'var(--grad-flame)', border: 'none', borderRadius: 6, color: '#fff', fontSize: 13, fontWeight: 600 }}>Qəbul et</button>
        </div>
      </div>
    </div>
  );
}

function Toast({ item }) {
  if (!item) return null;
  return (
    <div className="rc-toast" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100, display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--surface-raised)', border: '1px solid var(--border-flame)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--glow-flame)', maxWidth: 340 }}>
      <span style={{ width: 34, height: 34, borderRadius: 999, background: 'var(--flame-soft)', display: 'grid', placeItems: 'center', flex: 'none' }}><Icon name="check" size={18} color="var(--flame-400)" strokeWidth={2.5} /></span>
      <div>
        <div style={{ fontWeight: 700, color: 'var(--text-strong)', fontSize: 13.5 }}>Səbətə əlavə olundu</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
      </div>
    </div>
  );
}

const Loading = () => <div style={{ display: 'flex', justifyContent: 'center', padding: 60, color: 'var(--text-faint)' }}>Yüklənir...</div>;

export default function App() {
  const data = RCDATA;
  const [view, setView] = useState('home');
  const [product, setProduct] = useState(data.products[0]);
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rc_cart') || '[]'); } catch { return []; }
  });
  const [toast, setToast] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showSplash, setShowSplash] = useState(() => window.innerWidth > 768);
  const audioRef = useRef(null);
  const tRef = useRef();

  // Audio init
  useEffect(() => {
    if (window.innerWidth <= 768) return;
    if (localStorage.getItem('rc_cookies') !== 'accepted') return;
    const a = new Audio(nfsSrc);
    a.loop = true;
    a.volume = 0.3;
    audioRef.current = a;
    return () => { a.pause(); };
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('rc_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Toast cleanup on unmount
  useEffect(() => {
    return () => clearTimeout(tRef.current);
  }, []);

  const toggleMusic = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (musicPlaying) { a.pause(); setMusicPlaying(false); }
    else { a.play().then(() => setMusicPlaying(true)).catch(() => {}); }
  }, [musicPlaying]);

  const openLightbox = useCallback((images, index) => {
    setLightbox({ images, index: index || 0 });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const addToCart = useCallback((item, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + qty } : c);
      return [...prev, { ...item, qty }];
    });
    setToast(item);
    clearTimeout(tRef.current);
    tRef.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const go = useCallback((v) => { setView(v); window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  const openProduct = useCallback((p) => { setProduct(p); go('product'); }, [go]);

  const enterSite = useCallback(() => {
    setShowSplash(false);
    const a = audioRef.current;
    if (a) a.play().then(() => setMusicPlaying(true)).catch(() => {});
  }, []);

  const relatedProducts = useMemo(() => [...data.products, ...data.parts], [data]);
  const appCtx = useMemo(() => ({ musicPlaying, toggleMusic, openLightbox }), [musicPlaying, toggleMusic, openLightbox]);

  return (
    <ErrorBoundary>
      <AppContext.Provider value={appCtx}>
        {showSplash && <SplashScreen onEnter={enterSite} />}
        <a href="#main-content" className="rc-skip-nav">Məzmuna keç</a>
        <Header nav={NAV} current={view} onNav={go} cartCount={cartItems.reduce((s, c) => s + c.qty, 0)} onSearch={() => go('catalog')} />
        <main id="main-content">
          <Suspense fallback={<Loading />}>
            {view === 'home' && <HomeView data={data} onNav={go} onAdd={addToCart} />}
            {view === 'finder' && <PartFinderView data={data} onAdd={addToCart} />}
            {view === 'tuning' && <TuningView data={data} onAdd={addToCart} />}
            {view === 'builder' && <BuilderView onAdd={addToCart} />}
            {['catalog','product','cart','favorites','account','sale'].includes(view) && (
              <div className="rc-light" style={{ background: 'var(--bg-page)', minHeight: '72vh', paddingBottom: 56 }}>
                {view === 'catalog' && <CatalogView data={data} onOpen={openProduct} onAdd={addToCart} />}
                {view === 'sale' && <SaleView data={data} onOpen={openProduct} onAdd={addToCart} />}
                {view === 'product' && <ProductView product={product} related={relatedProducts} onAdd={addToCart} onBack={() => go('catalog')} />}
                {view === 'cart' && <CartView data={data} onNav={go} cartItems={cartItems} setCartItems={setCartItems} />}
                {view === 'favorites' && <FavoritesView data={data} onOpen={openProduct} onAdd={addToCart} onNav={go} />}
                {view === 'account' && <AccountView onNav={go} />}
              </div>
            )}
          </Suspense>
        </main>
        <Footer />
        <Toast item={toast} />
        <CookieBanner />
        {lightbox && <Lightbox images={lightbox.images} index={lightbox.index} onClose={closeLightbox} onChange={(i) => setLightbox(lb => ({ ...lb, index: i }))} />}
      </AppContext.Provider>
    </ErrorBoundary>
  );
}

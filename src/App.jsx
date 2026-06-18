import React, { useState, useRef, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
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
  { id: 'modeller', label: 'Modellər', path: '/modeller' },
  { id: 'ehtiyat-hisseleri', label: 'Ehtiyat hissələri', path: '/ehtiyat-hisseleri' },
  { id: 'tuning', label: 'Tuning', path: '/tuning' },
  { id: 'rc-builder', label: 'RC BUILDER', lang: 'en', path: '/rc-builder' },
  { id: 'endirimler', label: 'Endirimlər', path: '/endirimler' },
];

// SEO: Dynamic page title + meta
function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | RC DriveHub` : 'RC DriveHub — RC Maşın Mağazası';
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);
  }, [title, description]);
}

// Error Boundary
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

// Splash
function SplashScreen({ onEnter }) {
  return (
    <div role="button" tabIndex={0} onClick={onEnter} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onEnter(); }}
      style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'var(--carbon-950)', display: 'flex', flexDirection: 'column', cursor: 'pointer', animation: 'rc-rise 500ms var(--ease-power) both', outline: 'none' }}>
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

// Product page wrapper with slug routing
function ProductPage({ data, relatedProducts, onAdd }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = data.products.find(p => p.id === slug) || data.products[0];
  usePageMeta(product.title, `${product.brand} ${product.title} — ${product.price}`);
  return <ProductView product={product} related={relatedProducts} onAdd={onAdd} onBack={() => navigate('/modeller')} />;
}

// Main app with router
function AppContent() {
  const data = RCDATA;
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rc_cart') || '[]'); } catch { return []; }
  });
  const [toast, setToast] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showSplash, setShowSplash] = useState(() => window.innerWidth > 768 && !sessionStorage.getItem('rc_splash_done'));
  const audioRef = useRef(null);
  const tRef = useRef();

  useEffect(() => { localStorage.setItem('rc_cart', JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { return () => clearTimeout(tRef.current); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [location.pathname]);

  // Audio
  useEffect(() => {
    if (window.innerWidth <= 768 || localStorage.getItem('rc_cookies') !== 'accepted') return;
    const a = new Audio(nfsSrc);
    a.loop = true;
    a.volume = 0.3;
    audioRef.current = a;
    return () => { a.pause(); };
  }, []);

  const toggleMusic = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (musicPlaying) { a.pause(); setMusicPlaying(false); }
    else { a.play().then(() => setMusicPlaying(true)).catch(() => {}); }
  }, [musicPlaying]);

  const openLightbox = useCallback((images, index) => setLightbox({ images, index: index || 0 }), []);
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

  const go = useCallback((v) => {
    const routes = { home: '/', catalog: '/modeller', finder: '/ehtiyat-hisseleri', tuning: '/tuning', builder: '/rc-builder', sale: '/endirimler', cart: '/sebet', favorites: '/sevilmisler', account: '/hesab' };
    navigate(routes[v] || '/');
  }, [navigate]);

  const openProduct = useCallback((p) => navigate(`/modeller/${p.id}`), [navigate]);

  const enterSite = useCallback(() => {
    setShowSplash(false);
    sessionStorage.setItem('rc_splash_done', '1');
    const a = audioRef.current;
    if (a) a.play().then(() => setMusicPlaying(true)).catch(() => {});
  }, []);

  const relatedProducts = useMemo(() => [...data.products, ...data.parts], [data]);
  const appCtx = useMemo(() => ({ musicPlaying, toggleMusic, openLightbox }), [musicPlaying, toggleMusic, openLightbox]);
  const cartCount = cartItems.reduce((s, c) => s + c.qty, 0);

  // Detect current nav from path
  const currentNav = NAV.find(n => location.pathname.startsWith(n.path))?.id || '';

  return (
    <AppContext.Provider value={appCtx}>
      {showSplash && <SplashScreen onEnter={enterSite} />}
      <a href="#main-content" className="rc-skip-nav">Məzmuna keç</a>
      <Header nav={NAV} current={currentNav} onNav={(id) => {
        const n = NAV.find(n => n.id === id);
        if (n) navigate(n.path);
        else go(id);
      }} cartCount={cartCount} onSearch={() => navigate('/modeller')} />
      <main id="main-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePageWrapper data={data} go={go} addToCart={addToCart} />} />
            <Route path="/modeller" element={<CatalogPageWrapper data={data} openProduct={openProduct} addToCart={addToCart} />} />
            <Route path="/modeller/:slug" element={<ProductPage data={data} relatedProducts={relatedProducts} onAdd={addToCart} />} />
            <Route path="/ehtiyat-hisseleri" element={<FinderPageWrapper data={data} addToCart={addToCart} />} />
            <Route path="/tuning" element={<TuningPageWrapper data={data} addToCart={addToCart} />} />
            <Route path="/rc-builder" element={<BuilderPageWrapper addToCart={addToCart} />} />
            <Route path="/endirimler" element={<SalePageWrapper data={data} openProduct={openProduct} addToCart={addToCart} />} />
            <Route path="/sebet" element={<CartView data={data} onNav={go} cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/sevilmisler" element={<FavoritesView data={data} onOpen={openProduct} onAdd={addToCart} onNav={go} />} />
            <Route path="/hesab" element={<AccountView onNav={go} />} />
            <Route path="*" element={<HomePageWrapper data={data} go={go} addToCart={addToCart} />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Toast item={toast} />
      <CookieBanner />
      {lightbox && <Lightbox images={lightbox.images} index={lightbox.index} onClose={closeLightbox} onChange={(i) => setLightbox(lb => ({ ...lb, index: i }))} />}
    </AppContext.Provider>
  );
}

// Page wrappers with SEO titles
function HomePageWrapper({ data, go, addToCart }) {
  usePageMeta(null, 'RC DriveHub — Azərbaycanda RC maşınlar, ehtiyat hissələri və tuning.');
  return <HomeView data={data} onNav={go} onAdd={addToCart} />;
}
function CatalogPageWrapper({ data, openProduct, addToCart }) {
  usePageMeta('RC Modellər', 'RC maşın modelləri — Monster Truck, Crawler, Buggy, On-Road.');
  return <div className="rc-light" style={{ background: 'var(--bg-page)', minHeight: '72vh', paddingBottom: 56 }}><CatalogView data={data} onOpen={openProduct} onAdd={addToCart} /></div>;
}
function FinderPageWrapper({ data, addToCart }) {
  usePageMeta('Ehtiyat Hissələri', 'RC maşın ehtiyat hissələri — brend və model üzrə axtar.');
  return <PartFinderView data={data} onAdd={addToCart} />;
}
function TuningPageWrapper({ data, addToCart }) {
  usePageMeta('Tuning & Hissələr', 'RC tuning hissələri — təkərlər, elektronika, süspansiyon.');
  return <TuningView data={data} onAdd={addToCart} />;
}
function BuilderPageWrapper({ addToCart }) {
  usePageMeta('RC Builder', 'Öz RC maşınını sıfırdan yığ — konfiqurator.');
  return <BuilderView onAdd={addToCart} />;
}
function SalePageWrapper({ data, openProduct, addToCart }) {
  usePageMeta('Endirimlər', 'Endirimli RC modellər və ehtiyat hissələri.');
  return <div className="rc-light" style={{ background: 'var(--bg-page)', minHeight: '72vh', paddingBottom: 56 }}><SaleView data={data} onOpen={openProduct} onAdd={addToCart} /></div>;
}

// JSON-LD Structured Data
function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "RC DriveHub",
    "url": "https://rchub.023.az",
    "description": "Azərbaycanda RC maşınlar, ehtiyat hissələri və tuning məhsulları",
    "potentialAction": { "@type": "SearchAction", "target": "https://rchub.023.az/modeller?q={search_term_string}", "query-input": "required name=search_term_string" }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <StructuredData />
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

import React from "react";
import { Icon, Button, Badge, QuantityStepper } from "../components/index.jsx";


function CartRow({ item, onQty, onRemove }) {
  return (
    <div style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ width: 96, height: 96, borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'linear-gradient(180deg,#1c212c,#0c0e13)', flex: 'none', display: 'grid', placeItems: 'center' }}>
        {item.image ? <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Icon name="truck" size={30} color="var(--carbon-600)" />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--flame-400)' }}>{item.brand} · {item.scale || 'HİSSƏ'}</span>
          <button type="button" onClick={onRemove} aria-label="Sil" style={{ background: 'none', border: 'none', color: 'var(--text-faint)', display: 'inline-flex' }}
            onMouseEnter={(e)=>e.currentTarget.style.color='var(--danger-500)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-faint)'}><Icon name="x" size={18} /></button>
        </div>
        <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text-strong)', margin: '4px 0 10px', lineHeight: 1.3 }}>{item.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <QuantityStepper value={item.qty} onChange={onQty} />
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: 'var(--text-strong)' }}>{item.price}</span>
        </div>
      </div>
    </div>
  );
}

export default function CartView({ data, onNav, cartItems, setCartItems }) {
  const lines = cartItems || [];
  const num = (s) => parseFloat(String(s).replace(/[^\d,]/g, '').replace(',', '.')) || 0;
  const fmt = (n) => n.toFixed(2).replace('.', ',') + ' ₼';
  const subtotal = lines.reduce((a, l) => a + num(l.price) * l.qty, 0);
  const shipping = subtotal > 120 || subtotal === 0 ? 0 : 9.9;
  const total = subtotal + shipping;
  const setQty = (i, q) => setCartItems(ls => ls.map((l, idx) => idx === i ? { ...l, qty: q } : l));
  const remove = (i) => setCartItems(ls => ls.filter((_, idx) => idx !== i));

  return (
    <div className="rc-container" style={{ padding: '28px 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 0.95, color: 'var(--text-strong)' }}>SƏBƏT</h1>
        <Badge tone="neutral">{lines.length} məhsul</Badge>
      </div>

      {lines.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Icon name="cart" size={48} strokeWidth={1.2} color="var(--carbon-600)" style={{ margin: '0 auto 14px' }} />
          <p style={{ color: 'var(--text-muted)', marginBottom: 18 }}>Səbətin boşdur — tam qaz ver!</p>
          <Button variant="primary" icon="zap" onClick={() => onNav('catalog')}>MODELLƏRƏ KEÇ</Button>
        </div>
      ) : (
        <div className="rc-cart-grid" style={{ display: 'grid', alignItems: 'start' }}>
          <div>
            {lines.map((l, i) => <CartRow key={l.id} item={l} onQty={(q) => setQty(i, q)} onRemove={() => remove(i)} />)}
            <button type="button" onClick={() => onNav('catalog')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 18, background: 'none', border: 'none', color: 'var(--flame-400)', fontWeight: 600, fontSize: 13.5 }}>
              <Icon name="chevron-left" size={16} /> Alış-verişə davam et
            </button>
          </div>
          <aside style={{ position: 'sticky', top: 120, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 22 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 16 }}>Sifariş xülasəsi</div>
            {[['Aralıq cəm', fmt(subtotal)], ['Çatdırılma', shipping === 0 ? 'Pulsuz' : fmt(shipping)]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 14, color: 'var(--text-body)' }}>
                <span>{k}</span><span style={{ fontFamily: 'var(--font-mono)', color: v === 'Pulsuz' ? 'var(--success-500)' : 'var(--text-strong)' }}>{v}</span>
              </div>
            ))}
            {shipping > 0 && <div style={{ fontSize: 12, color: 'var(--text-faint)', padding: '2px 0 8px' }}>{fmt(120 - subtotal)} daha əlavə et — pulsuz çatdırılma!</div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 4px', borderTop: '1px solid var(--border-subtle)', marginTop: 8 }}>
              <span style={{ fontWeight: 700, color: 'var(--text-strong)' }}>Cəmi</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 22, color: 'var(--flame-500)' }}>{fmt(total)}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', marginBottom: 16 }}>ƏDV daxil</div>
            <Button variant="primary" size="lg" block trailingIcon="arrow-right">ÖDƏNİŞƏ KEÇ</Button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginTop: 14, color: 'var(--text-faint)', fontSize: 12 }}>
              <Icon name="shield" size={14} /> Təhlükəsiz ödəniş
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}


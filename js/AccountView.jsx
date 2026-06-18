/* RC HUB — Account view */

const STEPS = ['Qəbul edildi', 'Hazırlanır', 'Yolda', 'Çatdırıldı'];
const ORDERS = [
  { id: 'RC-20416', date: '12 İyun 2026', items: 2, total: '1 380,77 ₼', status: { tone: 'preorder', label: 'YOLDA' }, step: 2, track: 'TR-AZ-884512', subtotal: '1 380,77 ₼', shipping: 'Pulsuz',
    lines: [ { brand: 'ARRMA', title: 'KRATON 6S EXB 4X4 Brushless Monster Truck RTR', qty: 1, price: '733,53 ₼' }, { brand: 'HOBBYWING', title: 'EZRUN MAX5 G2 ESC + 800kV Motor Combo', qty: 1, price: '647,24 ₼' } ] },
  { id: 'RC-20388', date: '3 İyun 2026', items: 1, total: '376,84 ₼', status: { tone: 'stock', label: 'ÇATDIRILDI' }, step: 3, track: 'TR-AZ-871204', subtotal: '376,84 ₼', shipping: 'Pulsuz',
    lines: [ { brand: 'AXIAL', title: 'SCX10 III Base Camp 4WD Rock Crawler RTR', qty: 1, price: '376,84 ₼' } ] },
  { id: 'RC-20301', date: '21 May 2026', items: 3, total: '892,10 ₼', status: { tone: 'stock', label: 'ÇATDIRILDI' }, step: 3, track: 'TR-AZ-863077', subtotal: '882,20 ₼', shipping: '9,90 ₼',
    lines: [ { brand: 'LOSI', title: 'TLR Tuned TYPHON 4WD BLX Buggy RTR', qty: 1, price: '604,09 ₼' }, { brand: 'PRO-LINE', title: 'Masher 2.8" Tire (2) — Monster Truck', qty: 2, price: '92,00 ₼' }, { brand: 'GENS ACE', title: '5000mAh 4S 60C Hardcase LiPo', qty: 1, price: '186,11 ₼' } ] },
  { id: 'RC-20255', date: '9 May 2026', items: 1, total: '112,90 ₼', status: { tone: 'danger', label: 'LƏĞV EDİLDİ' }, step: -1, track: '—', subtotal: '112,90 ₼', shipping: 'Pulsuz',
    lines: [ { brand: 'GENS ACE', title: '5000mAh 4S 14.8V 60C Hardcase LiPo', qty: 1, price: '112,90 ₼' } ] },
];

function Field({ label, value }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 6 }}>{label}</div>
      <div style={{ padding: '11px 14px', background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', color: 'var(--text-strong)', fontSize: 14 }}>{value}</div>
    </div>
  );
}

function OrderDetail({ order, onBack }) {
  const cancelled = order.step < 0;
  return (
    <div className="rc-reveal">
      <button type="button" onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}
        onMouseEnter={(e)=>e.currentTarget.style.color='var(--flame-500)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-muted)'}>
        <Icon name="chevron-left" size={16} /> Sifarişlərə qayıt
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 22, color: 'var(--text-strong)' }}>{order.id}</h2>
        <Badge tone={order.status.tone} dot>{order.status.label}</Badge>
        <span style={{ fontSize: 13, color: 'var(--text-faint)', marginLeft: 'auto' }}>{order.date}</span>
      </div>

      {cancelled ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', background: 'var(--danger-soft)', borderRadius: 'var(--radius-md)', marginBottom: 24, color: 'var(--danger-500)', fontSize: 13.5, fontWeight: 600 }}>
          <Icon name="x" size={18} /> Bu sifariş ləğv edilib və məbləğ geri qaytarılıb.
        </div>
      ) : (
        <div style={{ display: 'flex', marginBottom: 28, marginTop: 8 }}>
          {STEPS.map((s, i) => {
            const done = i <= order.step;
            const current = i === order.step;
            return (
              <div key={s} style={{ flex: 1, position: 'relative', textAlign: 'center' }}>
                {i < STEPS.length - 1 && <div style={{ position: 'absolute', top: 13, left: '50%', right: '-50%', height: 2, background: i < order.step ? 'var(--flame-500)' : 'var(--border-default)' }} />}
                <div style={{ position: 'relative', width: 28, height: 28, borderRadius: 999, margin: '0 auto 8px', display: 'grid', placeItems: 'center', background: done ? 'var(--grad-flame)' : 'var(--surface-raised)', border: `1px solid ${done ? 'transparent' : 'var(--border-default)'}`, boxShadow: current ? 'var(--glow-flame-sm)' : 'none', color: done ? '#fff' : 'var(--text-faint)' }}>
                  {done ? <Icon name="check" size={14} strokeWidth={3} /> : <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{i + 1}</span>}
                </div>
                <div style={{ fontSize: 11.5, fontWeight: current ? 700 : 500, color: current ? 'var(--flame-500)' : done ? 'var(--text-body)' : 'var(--text-faint)' }}>{s}</div>
              </div>
            );
          })}
        </div>
      )}

      {!cancelled && order.track !== '—' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', marginBottom: 22, fontSize: 13 }}>
          <Icon name="truck" size={18} color="var(--flame-400)" />
          <span style={{ color: 'var(--text-muted)' }}>İzləmə kodu:</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-strong)' }}>{order.track}</span>
        </div>
      )}

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 10 }}>Məhsullar</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
        {order.lines.map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ width: 46, height: 46, borderRadius: 'var(--radius-sm)', background: 'var(--flame-soft)', display: 'grid', placeItems: 'center', flex: 'none' }}><Icon name={l.title.includes('Tire') || l.title.includes('ESC') || l.title.includes('LiPo') ? 'wrench' : 'truck'} size={20} color="var(--flame-400)" /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.08em', color: 'var(--flame-400)' }}>{l.brand}</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.3 }}>{l.title}</div>
            </div>
            <span style={{ fontSize: 12.5, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>x{l.qty}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-strong)', minWidth: 92, textAlign: 'right' }}>{l.price}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18, alignItems: 'start' }}>
        <div style={{ padding: 16, background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 10 }}>Çatdırılma ünvanı</div>
          <div style={{ color: 'var(--text-strong)', fontWeight: 600, fontSize: 14 }}>Elçin Məmmədov</div>
          <div style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6, marginTop: 3 }}>Nizami küç. 24, mənzil 11<br />Bakı AZ1000, Azərbaycan</div>
        </div>
        <div style={{ padding: 16, background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
          {[['Aralıq cəm', order.subtotal], ['Çatdırılma', order.shipping]].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13.5, color: 'var(--text-body)' }}>
              <span>{k}</span><span style={{ fontFamily: 'var(--font-mono)', color: v === 'Pulsuz' ? 'var(--success-500)' : 'var(--text-strong)' }}>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 0', marginTop: 6, borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-strong)' }}>Cəmi</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: 'var(--flame-500)' }}>{order.total}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
        <Button variant="outline" icon="package">Qaimə (PDF)</Button>
        {!cancelled && <Button variant="ghost" icon="cart">Yenidən sifariş et</Button>}
      </div>
    </div>
  );
}

function AccountView({ onNav }) {
  const [section, setSection] = React.useState('orders');
  const [order, setOrder] = React.useState(null);
  const nav = [
    { id: 'orders', label: 'Sifarişlər', icon: 'package' },
    { id: 'profile', label: 'Profil', icon: 'user' },
    { id: 'address', label: 'Ünvanlar', icon: 'truck' },
  ];

  return (
    <div className="rc-container" style={{ padding: '28px 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '22px 24px', background: 'radial-gradient(120% 200% at 0% 0%, var(--flame-soft) 0%, var(--surface-card) 55%)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', marginBottom: 26 }}>
        <div style={{ width: 60, height: 60, borderRadius: 999, background: 'var(--grad-flame)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 26, color: '#fff', flex: 'none' }}>EM</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', fontSize: 26, color: 'var(--text-strong)', lineHeight: 1 }}>ELÇİN MƏMMƏDOV</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 3 }}>elcin@rchub.az · Full Throttle üzv</div>
        </div>
        <Badge tone="sale" solid>VIP · 1 240 xal</Badge>
      </div>

      <div className="rc-account-grid" style={{ display: 'grid', alignItems: 'start' }}>
        <aside style={{ display: 'flex', flexDirection: 'row', gap: 4, overflowX: 'auto', paddingBottom: 4 }}>
          {nav.map(n => {
            const on = section === n.id;
            return (
              <button type="button" key={n.id} onClick={() => { setSection(n.id); setOrder(null); }} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 14px', textAlign: 'left', background: on ? 'var(--flame-soft)' : 'transparent', border: `1px solid ${on ? 'var(--border-flame)' : 'transparent'}`, borderRadius: 'var(--radius-md)', color: on ? 'var(--flame-300)' : 'var(--text-body)', fontWeight: 600, fontSize: 14, transition: 'background var(--dur-fast)', whiteSpace: 'nowrap' }}>
                <Icon name={n.icon} size={18} color={on ? 'var(--flame-400)' : 'var(--text-muted)'} /> {n.label}
              </button>
            );
          })}
          <button type="button" onClick={() => onNav('home')} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 14px', textAlign: 'left', background: 'transparent', border: '1px solid transparent', borderRadius: 'var(--radius-md)', color: 'var(--text-faint)', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap' }}>
            <Icon name="chevron-left" size={18} /> Çıxış
          </button>
        </aside>

        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 24, minHeight: 360 }}>
          {section === 'orders' && (
            order ? <OrderDetail order={order} onBack={() => setOrder(null)} /> : (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 16 }}>Sifariş tarixçəsi</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {ORDERS.map(o => (
                  <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', flexWrap: 'wrap', transition: 'border-color var(--dur-base)' }}
                    onMouseEnter={(e)=>e.currentTarget.style.borderColor='var(--border-flame)'} onMouseLeave={(e)=>e.currentTarget.style.borderColor='var(--border-subtle)'}>
                    <div style={{ minWidth: 120 }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-strong)', fontSize: 14 }}>{o.id}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>{o.date}</div>
                    </div>
                    <div style={{ flex: 1, fontSize: 13, color: 'var(--text-muted)' }}>{o.items} məhsul</div>
                    <Badge tone={o.status.tone} dot>{o.status.label}</Badge>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-strong)', minWidth: 100, textAlign: 'right' }}>{o.total}</span>
                    <Button variant="ghost" size="sm" trailingIcon="chevron-right" onClick={() => setOrder(o)}>Detal</Button>
                  </div>
                ))}
              </div>
            </div>
            )
          )}
          {section === 'profile' && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 16 }}>Profil məlumatları</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, maxWidth: 520 }}>
                <Field label="Ad Soyad" value="Elçin Məmmədov" />
                <Field label="Telefon" value="+994 50 123 45 67" />
                <Field label="E-poçt" value="elcin@rchub.az" />
                <Field label="Şəhər" value="Bakı" />
              </div>
              <div style={{ marginTop: 22 }}><Button variant="primary" icon="check">DƏYİŞİKLİKLƏRİ YADDA SAXLA</Button></div>
            </div>
          )}
          {section === 'address' && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 16 }}>Çatdırılma ünvanları</h2>
              <div style={{ padding: 18, background: 'var(--surface-raised)', border: '1px solid var(--border-flame)', borderRadius: 'var(--radius-md)', maxWidth: 420 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Badge tone="new">ƏSAS</Badge><Icon name="truck" size={18} color="var(--text-muted)" />
                </div>
                <div style={{ color: 'var(--text-strong)', fontWeight: 600 }}>Elçin Məmmədov</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.6, marginTop: 4 }}>Nizami küç. 24, mənzil 11<br />Bakı AZ1000, Azərbaycan<br />+994 50 123 45 67</div>
              </div>
              <div style={{ marginTop: 18 }}><Button variant="outline" icon="plus">YENİ ÜNVAN ƏLAVƏ ET</Button></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AccountView });

import React from "react";
import { useApp } from "../AppContext.jsx";
/* RC HUB — Design System Components
   Icon, Badge, Button, IconButton, Logo, SearchBar, FilterChip,
   Tabs, QuantityStepper, SpecRow, ProductCard */

/* ---- Icon ---- */
const ICON_PATHS = {
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  minus: '<path d="M5 12h14"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  sliders: '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  package: '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
  bolt: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
};

export function Icon({ name, size = 20, strokeWidth = 1.75, color, style, ...rest }) {
  // Only render from allowlisted ICON_PATHS — prevents XSS
  const inner = Object.hasOwn(ICON_PATHS, name) ? ICON_PATHS[name] : '';
  if (!inner) return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: 'block', flex: 'none', ...style }} aria-hidden="true" {...rest} />;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color || 'currentColor'} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', flex: 'none', ...style }}
      aria-hidden="true" dangerouslySetInnerHTML={{ __html: inner }} {...rest} />
  );
}

/* ---- Badge ---- */
const BADGE_TONES = {
  stock: { bg: 'var(--success-soft)', fg: 'var(--success-500)', dot: 'var(--success-500)' },
  sale: { bg: 'var(--volt-soft)', fg: 'var(--volt-500)', dot: 'var(--volt-500)' },
  new: { bg: 'var(--flame-soft)', fg: 'var(--flame-400)', dot: 'var(--flame-500)' },
  preorder: { bg: 'var(--info-soft)', fg: 'var(--info-500)', dot: 'var(--info-500)' },
  danger: { bg: 'var(--danger-soft)', fg: 'var(--danger-500)', dot: 'var(--danger-500)' },
  neutral: { bg: 'var(--surface-chip)', fg: 'var(--text-body)', dot: 'var(--text-faint)' },
};

export function Badge({ children, tone = 'neutral', icon, dot = false, solid = false, cut = false, style, ...rest }) {
  const t = BADGE_TONES[tone] || BADGE_TONES.neutral;
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '0.4em',
    padding: '4px 10px', fontFamily: 'var(--font-mono)', fontWeight: 700,
    fontSize: 'var(--fs-caption)', letterSpacing: '0.1em', textTransform: 'uppercase',
    lineHeight: 1, borderRadius: cut ? 0 : 'var(--radius-pill)',
    clipPath: cut ? 'var(--cut-sm)' : undefined,
    background: solid ? t.dot : t.bg, color: solid ? '#0E1014' : t.fg,
    whiteSpace: 'nowrap', ...style,
  };
  return (
    <span style={base} {...rest}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: solid ? '#0E1014' : t.dot, flex: 'none' }} />}
      {icon && <Icon name={icon} size={12} strokeWidth={2.25} />}
      {children}
    </span>
  );
}

/* ---- Button ---- */
const BTN_PAD = { sm: '8px 14px', md: '11px 20px', lg: '15px 30px' };
const BTN_FS = { sm: '0.75rem', md: '0.8125rem', lg: '0.9375rem' };

function btnVariantStyle(variant) {
  switch (variant) {
    case 'secondary': return { background: 'var(--surface-raised)', color: 'var(--text-strong)', border: '1px solid var(--border-default)' };
    case 'outline': return { background: 'transparent', color: 'var(--text-strong)', border: '1px solid var(--border-strong)' };
    case 'ghost': return { background: 'transparent', color: 'var(--text-body)', border: '1px solid transparent' };
    case 'volt': return { background: 'var(--volt-500)', color: '#1A1400', border: '1px solid transparent' };
    default: return { background: 'var(--grad-flame)', color: 'var(--accent-fg)', border: '1px solid transparent' };
  }
}

export function Button({ children, variant = 'primary', size = 'md', icon, trailingIcon, cut = false, block = false, disabled = false, className = '', style, ...rest }) {
  const vs = btnVariantStyle(variant);
  const base = {
    display: block ? 'flex' : 'inline-flex', width: block ? '100%' : undefined,
    alignItems: 'center', justifyContent: 'center', gap: '0.5em',
    padding: BTN_PAD[size], fontFamily: 'var(--font-sans)', fontWeight: 700,
    fontSize: BTN_FS[size], letterSpacing: '0.06em', textTransform: 'uppercase',
    lineHeight: 1, borderRadius: cut ? 0 : 'var(--radius-md)',
    clipPath: cut ? 'var(--cut-sm)' : undefined,
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
    transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base), border-color var(--dur-base), color var(--dur-base)',
    boxShadow: variant === 'primary' ? 'var(--glow-flame-sm)' : 'none',
    ...vs, ...style,
  };
  const sz = size === 'lg' ? 20 : size === 'sm' ? 15 : 17;
  const hoverShadow = variant === 'primary' ? 'var(--glow-flame)' : variant === 'volt' ? '0 0 18px var(--volt-soft)' : 'var(--shadow-md)';
  return (
    <button type="button" disabled={disabled} className={`rc-btn ${className}`} style={base}
      onMouseEnter={(e) => { if (disabled) return; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = hoverShadow; if (variant === 'ghost' || variant === 'outline') { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--border-flame)'; } if (variant === 'primary') e.currentTarget.style.filter = 'brightness(1.06)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = base.boxShadow; e.currentTarget.style.color = vs.color; if (variant === 'ghost' || variant === 'outline') e.currentTarget.style.borderColor = vs.border.split(' ').pop(); e.currentTarget.style.filter = 'none'; }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.97)'; }}
      onMouseUp={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(-2px)'; }}
      {...rest}>
      {icon && <Icon name={icon} size={sz} strokeWidth={2} />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} size={sz} strokeWidth={2} />}
    </button>
  );
}

/* ---- IconButton ---- */
const IB_SIZES = { sm: 32, md: 40, lg: 48 };
const IB_ICON = { sm: 16, md: 19, lg: 22 };

export function IconButton({ name, variant = 'ghost', size = 'md', round = false, count, label, style, ...rest }) {
  const dim = IB_SIZES[size];
  const v = variant === 'solid' ? { background: 'var(--grad-flame)', color: '#fff', border: '1px solid transparent' }
    : variant === 'outline' ? { background: 'transparent', color: 'var(--text-strong)', border: '1px solid var(--border-default)' }
    : { background: 'transparent', color: 'var(--text-body)', border: '1px solid transparent' };
  const base = {
    position: 'relative', width: dim, height: dim, display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center',
    borderRadius: round ? 999 : 'var(--radius-md)',
    transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base), transform var(--dur-fast) var(--ease-out), border-color var(--dur-base)',
    ...v, ...style,
  };
  return (
    <button type="button" aria-label={label || name} style={base}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; if (variant !== 'solid') { e.currentTarget.style.background = 'var(--surface-hover)'; e.currentTarget.style.color = 'var(--accent)'; } }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = v.background; e.currentTarget.style.color = v.color; }}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
      {...rest}>
      <Icon name={name} size={IB_ICON[size]} strokeWidth={1.9} />
      {typeof count === 'number' && count > 0 && (
        <span style={{ position: 'absolute', top: -5, right: -5, minWidth: 17, height: 17, padding: '0 4px', borderRadius: 999, background: 'var(--flame-500)', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 2px var(--bg-page)' }}>{count}</span>
      )}
    </button>
  );
}

/* ---- Logo ---- */
export function Logo({ size = 28, mark = true, mono, style, ...rest }) {
  const rcColor = mono === 'white' ? 'var(--text-strong)' : 'var(--flame-500)';
  const hubColor = mono === 'flame' ? 'var(--flame-500)' : 'var(--text-strong)';
  return (
    <span lang="en" style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.18, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: size, lineHeight: 0.9, letterSpacing: '-0.02em', textTransform: 'uppercase', userSelect: 'none', ...style }} {...rest}>
      <span style={{ color: rcColor }}>RC</span>
      {mark && (
        <span style={{ color: 'var(--flame-500)', display: 'inline-flex', transform: 'skewX(-12deg)', gap: size * 0.06 }} aria-hidden="true">
          <span style={{ width: size * 0.1, height: size * 0.62, background: 'currentColor', display: 'inline-block' }} />
          <span style={{ width: size * 0.1, height: size * 0.62, background: 'currentColor', display: 'inline-block' }} />
        </span>
      )}
      <span style={{ color: hubColor }}>DriveHub</span>
    </span>
  );
}

/* ---- SearchBar ---- */
export function SearchBar({ placeholder = 'Model və ya hissə nömrəsi axtar...', size = 'md', defaultValue = '', onSubmit, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const [val, setVal] = React.useState(defaultValue);
  const h = size === 'lg' ? 52 : size === 'sm' ? 38 : 44;
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(val); }}
      style={{ display: 'flex', alignItems: 'center', gap: 10, height: h, padding: '0 6px 0 16px', background: 'var(--surface-raised)', border: `1px solid ${focus ? 'var(--border-flame)' : 'var(--border-default)'}`, borderRadius: 'var(--radius-md)', boxShadow: focus ? '0 0 0 3px var(--flame-soft)' : 'none', transition: 'border-color var(--dur-base), box-shadow var(--dur-base)', ...style }} {...rest}>
      <Icon name="search" size={size === 'lg' ? 21 : 18} color={focus ? 'var(--accent)' : 'var(--text-faint)'} />
      <input value={val} onChange={(e) => setVal(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} placeholder={placeholder}
        style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-strong)', fontFamily: 'var(--font-sans)', fontSize: size === 'lg' ? '1rem' : '0.875rem' }} />
      <button type="submit" aria-label="Axtar" style={{ height: h - 12, padding: '0 14px', borderRadius: 'var(--radius-sm)', background: 'var(--grad-flame)', color: '#fff', border: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="arrow-right" size={18} strokeWidth={2.25} />
      </button>
    </form>
  );
}

/* ---- FilterChip ---- */
export function FilterChip({ children, active = false, count, removable = false, icon, onClick, onRemove, style, ...rest }) {
  return (
    <button type="button" onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 13px', height: 34, borderRadius: 'var(--radius-pill)', background: active ? 'var(--flame-soft)' : 'var(--surface-chip)', border: `1px solid ${active ? 'var(--border-flame)' : 'transparent'}`, color: active ? 'var(--flame-300)' : 'var(--text-body)', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.01em', whiteSpace: 'nowrap', transition: 'background var(--dur-fast), color var(--dur-fast), border-color var(--dur-fast)', ...style }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'var(--surface-hover)'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'var(--surface-chip)'; }}
      {...rest}>
      {icon && <Icon name={icon} size={15} />}
      {children}
      {typeof count === 'number' && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: active ? 'var(--flame-400)' : 'var(--text-faint)' }}>{count}</span>}
      {removable && <span onClick={(e) => { e.stopPropagation(); onRemove && onRemove(); }} style={{ display: 'inline-flex', marginLeft: 1 }}><Icon name="x" size={14} strokeWidth={2.25} /></span>}
    </button>
  );
}

/* ---- Tabs ---- */
export function Tabs({ items = [], value, onChange, style, ...rest }) {
  const active = value ?? (items[0] && items[0].id);
  return (
    <div role="tablist" style={{ display: 'flex', gap: 6, borderBottom: '1px solid var(--border-subtle)', ...style }} {...rest}>
      {items.map((it) => {
        const on = it.id === active;
        return (
          <button type="button" key={it.id} role="tab" aria-selected={on} onClick={() => onChange && onChange(it.id)}
            style={{ position: 'relative', padding: '12px 16px', background: 'transparent', border: 'none', color: on ? 'var(--text-strong)' : 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontWeight: on ? 700 : 600, fontSize: '0.875rem', letterSpacing: '0.02em', textTransform: 'uppercase', transition: 'color var(--dur-fast)' }}
            onMouseEnter={(e) => { if (!on) e.currentTarget.style.color = 'var(--text-body)'; }}
            onMouseLeave={(e) => { if (!on) e.currentTarget.style.color = on ? 'var(--text-strong)' : 'var(--text-muted)'; }}>
            {it.label}
            <span style={{ position: 'absolute', left: 12, right: 12, bottom: -1, height: 3, borderRadius: 3, background: 'var(--grad-flame)', transform: on ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform var(--dur-base) var(--ease-power)', boxShadow: on ? 'var(--glow-flame-sm)' : 'none' }} />
          </button>
        );
      })}
    </div>
  );
}

/* ---- QuantityStepper ---- */
export function QuantityStepper({ value = 1, min = 1, max = 99, onChange, size = 'md', style, ...rest }) {
  const h = size === 'lg' ? 48 : size === 'sm' ? 34 : 42;
  const set = (n) => { const c = Math.max(min, Math.min(max, n)); onChange && onChange(c); };
  const btn = { width: h, height: h, display: 'grid', placeItems: 'center', background: 'transparent', border: 'none', color: 'var(--text-body)', transition: 'color var(--dur-fast), background var(--dur-fast)' };
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', height: h, background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden', ...style }} {...rest}>
      <button type="button" aria-label="Azalt" style={btn} disabled={value <= min}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-body)'; }}
        onClick={() => set(value - 1)}><Icon name="minus" size={16} strokeWidth={2.25} /></button>
      <span style={{ minWidth: h - 8, textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums', borderInline: '1px solid var(--border-subtle)', lineHeight: `${h}px` }}>{value}</span>
      <button type="button" aria-label="Artir" style={btn} disabled={value >= max}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-body)'; }}
        onClick={() => set(value + 1)}><Icon name="plus" size={16} strokeWidth={2.25} /></button>
    </div>
  );
}

/* ---- SpecRow ---- */
export function SpecRow({ label, value, icon, accent = false, style, ...rest }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '12px 0', borderBottom: '1px solid var(--border-subtle)', ...style }} {...rest}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-body-sm)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
        {icon && <Icon name={icon} size={16} color="var(--text-faint)" />}{label}
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'var(--fs-body)', color: accent ? 'var(--accent)' : 'var(--text-strong)', fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{value}</span>
    </div>
  );
}

/* ---- ProductCard ---- */
export function ProductCard({ image, title, brand, price, oldPrice, badge, rating, scale, onAdd, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const { openLightbox } = useApp();
  return (
    <article onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', background: 'var(--surface-card)', border: `1px solid ${hover ? 'var(--border-flame)' : 'var(--border-subtle)'}`, borderRadius: 'var(--radius-lg)', overflow: 'hidden', transform: hover ? 'translateY(-6px)' : 'none', boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-card)', transition: 'transform var(--dur-base) var(--ease-power), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)', ...style }} {...rest}>
      <div style={{ position: 'relative', aspectRatio: '4 / 3', background: 'radial-gradient(120% 100% at 50% 0%, #1d212c 0%, #0c0e13 100%)', overflow: 'hidden', cursor: image ? 'zoom-in' : 'default' }}
        onClick={(e) => { if (image) { e.stopPropagation(); openLightbox([image], 0); } }}>
        {image ? <img src={image} loading="lazy" alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hover ? 'scale(1.07)' : 'scale(1)', transition: 'transform var(--dur-slow) var(--ease-power)' }} />
          : <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'var(--carbon-600)' }}><Icon name="truck" size={48} strokeWidth={1.25} /></div>}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 40%, rgba(255,77,20,0.18) 50%, transparent 60%)', transform: hover ? 'translateX(0)' : 'translateX(-120%)', transition: 'transform var(--dur-slow) var(--ease-out)', pointerEvents: 'none' }} />
        {badge && <div style={{ position: 'absolute', top: 10, left: 10 }}><Badge tone={badge.tone} solid={badge.tone === 'sale'} cut>{badge.label}</Badge></div>}
        <button aria-label="Sevimlilere elave et" style={{ position: 'absolute', top: 8, right: 8, width: 34, height: 34, borderRadius: 999, display: 'grid', placeItems: 'center', background: 'rgba(8,9,12,0.6)', border: '1px solid var(--border-subtle)', color: 'var(--text-body)', backdropFilter: 'blur(6px)', opacity: hover ? 1 : 0, transform: hover ? 'none' : 'translateY(-6px)', transition: 'opacity var(--dur-base), transform var(--dur-base)' }}>
          <Icon name="heart" size={16} />
        </button>
      </div>
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          {brand && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-caption)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>{brand}</span>}
          {scale && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-caption)', color: 'var(--text-faint)' }}>{scale}</span>}
        </div>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem', lineHeight: 1.3, color: 'var(--text-strong)', minHeight: '2.6em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{title}</h3>
        {typeof rating === 'number' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {[0,1,2,3,4].map(i => <Icon key={i} name="star" size={13} strokeWidth={0} color={i < Math.round(rating) ? 'var(--volt-500)' : 'var(--carbon-700)'} style={{ fill: i < Math.round(rating) ? 'var(--volt-500)' : 'var(--carbon-700)' }} />)}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-caption)', color: 'var(--text-faint)', marginLeft: 4 }}>{rating.toFixed(1)}</span>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8, marginTop: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {oldPrice && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-caption)', color: 'var(--text-faint)', textDecoration: 'line-through' }}>{oldPrice}</span>}
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.25rem', color: oldPrice ? 'var(--volt-500)' : 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{price}</span>
          </div>
          <button type="button" onClick={onAdd} aria-label="Sebete at"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: hover ? '9px 14px' : '9px', borderRadius: 'var(--radius-md)', background: 'var(--grad-flame)', color: '#fff', border: 'none', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', boxShadow: hover ? 'var(--glow-flame-sm)' : 'none', transition: 'padding var(--dur-base) var(--ease-out), box-shadow var(--dur-base)', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <Icon name="cart" size={16} strokeWidth={2} />
            {hover && <span>AT</span>}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---- Lightbox ---- */
export function Lightbox({ images, index, onClose, onChange }) {
  if (!images || images.length === 0) return null;
  const idx = index || 0;
  const len = images.length;
  const prev = () => onChange((idx - 1 + len) % len);
  const next = () => onChange((idx + 1) % len);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onChange((idx - 1 + len) % len);
      if (e.key === 'ArrowRight') onChange((idx + 1) % len);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [idx, len, onClose, onChange]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Şəkil baxışı" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'rc-rise 200ms var(--ease-power) both' }}>
      {/* Close */}
      <button type="button" onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 44, height: 44, borderRadius: 999, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', zIndex: 2 }}>
        <Icon name="x" size={22} />
      </button>

      {/* Counter */}
      <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'rgba(255,255,255,0.6)', zIndex: 2 }}>{idx + 1} / {len}</div>

      {/* Prev */}
      {len > 1 && <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: 999, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', zIndex: 2, transition: 'background 150ms' }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,77,20,0.3)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
        <Icon name="chevron-left" size={24} />
      </button>}

      {/* Next */}
      {len > 1 && <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: 999, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', zIndex: 2, transition: 'background 150ms' }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,77,20,0.3)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
        <Icon name="chevron-right" size={24} />
      </button>}

      {/* Image */}
      <img key={idx} src={images[idx]} alt="" onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '88vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 'var(--radius-lg)', animation: 'rc-rise 250ms var(--ease-power) both' }} />

      {/* Thumbnails */}
      {len > 1 && (
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 2 }}>
          {images.map((img, i) => (
            <button type="button" key={i} onClick={(e) => { e.stopPropagation(); onChange(i); }}
              style={{ width: 56, height: 42, borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: `2px solid ${i === idx ? 'var(--flame-500)' : 'rgba(255,255,255,0.15)'}`, padding: 0, opacity: i === idx ? 1 : 0.5, transition: 'opacity 150ms, border-color 150ms' }}>
              <img src={img} loading="lazy" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* Export all to window */

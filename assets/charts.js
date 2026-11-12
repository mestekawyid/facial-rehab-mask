// Small SVG chart kit. Charts animate when their container gets the class "in" (see .rv reveal in site.js).
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
export const svg = (w, h, body, label = '') => `<svg viewBox="0 0 ${w} ${h}" direction="ltr" role="img" aria-label="${esc(label)}">${body}</svg>`;
const T = (x, y, s, cls = '', anchor = 'start', extra = '') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}" ${extra}>${esc(s)}</text>`;

// Horizontal bars. rows: [{label, v, cls}]; rtl puts labels on the right and grows bars leftwards.
export function hbar(rows, { max, unit = '%', rtl = false, w = 800, rowH = 40, labelW = 230, label = '', stack = false } = {}) {
  if (stack) {
    const RH = 44, h = rows.length * RH + 8, x0 = rtl ? 48 : 4, x1 = rtl ? w - 4 : w - 48, span = x1 - x0; let s = '';
    rows.forEach((r, i) => {
      const y = 4 + i * RH, bw = Math.max(4, r.v / max * span), bx = rtl ? x1 - bw : x0;
      s += T(rtl ? x1 : x0, y + 14, r.label, 'lbl', rtl ? 'end' : 'start');
      s += `<rect x="${x0}" y="${y + 22}" width="${span}" height="12" rx="6" class="track"/>`;
      s += `<rect x="${bx}" y="${y + 22}" width="${bw}" height="12" rx="6" class="bar ${r.cls || ''}" style="--i:${i};transform-origin:${rtl ? 'right' : 'left'}"/>`;
      s += T(rtl ? x0 - 6 : x1 + 6, y + 33, r.v + unit, 'val fd', rtl ? 'end' : 'start', `style="--i:${i}"`);
    });
    return svg(w, h, s, label);
  }
  const h = rows.length * rowH + 30, x0 = rtl ? 20 : labelW, x1 = rtl ? w - labelW : w - 60, span = x1 - x0;
  let s = '';
  for (let k = 0; k <= 4; k++) { const v = max * k / 4, x = rtl ? x1 - v / max * span : x0 + v / max * span; s += `<line x1="${x}" y1="6" x2="${x}" y2="${h - 24}" class="grid"/>` + T(x, h - 6, Math.round(v) + (k === 4 ? unit : ''), 'ax', 'middle'); }
  rows.forEach((r, i) => {
    const y = 10 + i * rowH, bw = r.v / max * span, bx = rtl ? x1 - bw : x0;
    s += T(rtl ? w - 10 : x0 - 12, y + rowH / 2 + 1, r.label, 'lbl', 'end', 'dominant-baseline="middle"');
    s += `<rect x="${bx}" y="${y + 8}" width="${bw}" height="${rowH - 18}" rx="5" class="bar ${r.cls || ''}" style="--i:${i};transform-origin:${rtl ? 'right' : 'left'}"/>`;
    s += T(rtl ? bx - 8 : bx + bw + 8, y + rowH / 2 + 1, r.v + unit, 'val fd', rtl ? 'end' : 'start', `dominant-baseline="middle" style="--i:${i}"`);
  });
  return svg(w, h, s, label);
}

// Donut (share 0..1)
export function donut(share, { big, small, label = '' } = {}) {
  const r = 70, c = 2 * Math.PI * r;
  return svg(200, 200, `<circle cx="100" cy="100" r="${r}" class="ring0"/>
    <circle cx="100" cy="100" r="${r}" class="ring1 arc" pathLength="1" style="stroke-dasharray:${share} 1;--to:${share}" transform="rotate(-90 100 100)"/>
    ${T(100, 104, big, 'dbig', 'middle', 'dominant-baseline="middle"')}${T(100, 132, small, 'ax', 'middle')}`, label);
}

// log-scale helper
export const logx = (a, b, x0, x1) => v => x0 + (Math.log10(v) - Math.log10(a)) / (Math.log10(b) - Math.log10(a)) * (x1 - x0);

// Range bars on a log axis (pulse durations used in studies)
export function ranges(rows, { a = 0.005, b = 2000, w = 800, rowH = 36, labelW = 300, rtl = false, ticks = [0.01, 0.1, 1, 10, 100, 1000], axisLabel = '', zones = [], label = '', stack = false } = {}) {
  if (stack) { rowH = 46; labelW = 0; }
  const h = rows.length * rowH + 64, X0 = stack ? 12 : rtl ? 20 : labelW, X1 = stack ? w - 12 : rtl ? w - labelW : w - 20;
  const lx0 = logx(a, b, X0, X1), lx = v => rtl ? X0 + X1 - lx0(v) : lx0(v);
  let s = '';
  zones.forEach(z => { const xa = lx(z.from), xb = lx(z.to); s += `<rect x="${Math.min(xa, xb)}" y="4" width="${Math.abs(xb - xa)}" height="${h - 50}" class="zone ${z.cls}"/>` + T((xa + xb) / 2, 18, z.label, 'zl ' + z.cls, 'middle'); });
  ticks.forEach(t => { s += `<line x1="${lx(t)}" y1="26" x2="${lx(t)}" y2="${h - 46}" class="grid"/>` + T(lx(t), h - 30, t, 'ax', 'middle'); });
  s += T((X0 + X1) / 2, h - 8, axisLabel, 'ax', 'middle');
  rows.forEach((r, i) => {
    const y = 30 + i * rowH + rowH / 2 + (stack ? 8 : 0);
    if (stack) s += T(rtl ? w - 4 : 4, y - 15, r.label, 'lbl sm', rtl ? 'end' : 'start');
    else s += T(rtl ? w - 10 : X0 - 12, y, r.label, 'lbl sm', 'end', 'dominant-baseline="middle"');
    if (r.b == null) s += `<circle cx="${lx(r.a)}" cy="${y}" r="7" class="pop ${r.cls}" style="--i:${i}"/>`;
    else s += `<line x1="${lx(r.a)}" y1="${y}" x2="${lx(r.b)}" y2="${y}" class="rng draw ${r.cls}" pathLength="1" style="--i:${i}"/>`;
  });
  return svg(w, h, s, label);
}

// Forest plot (log axis)
export function forest(rows, { a = 0.3, b = 3, w = 800, rtl = false, left = '', right = '', label = '', stack = false } = {}) {
  const rowH = stack ? 104 : 74, h = rows.length * rowH + 70, X0 = stack ? w * 0.06 : rtl ? w * 0.2 : w * 0.44, X1 = stack ? w * 0.94 : rtl ? w * 0.56 : w * 0.8;
  const lx0 = logx(a, b, X0, X1), lx = v => rtl ? X0 + X1 - lx0(v) : lx0(v);
  let s = stack ? rows.map((r, i) => { const y = 82 + i * rowH; return `<line x1="${lx(1)}" y1="${y - 12}" x2="${lx(1)}" y2="${y + 14}" class="ref"/>`; }).join('') : `<line x1="${lx(1)}" y1="6" x2="${lx(1)}" y2="${h - 50}" class="ref"/>`;
  [0.3, 0.5, 1, 2, 3].forEach(t => { s += `<line x1="${lx(t)}" y1="${h - 50}" x2="${lx(t)}" y2="${h - 44}" class="axl"/>` + T(lx(t), h - 30, t, 'ax', 'middle'); });
  s += `<line x1="${Math.min(X0, X1)}" y1="${h - 50}" x2="${Math.max(X0, X1)}" y2="${h - 50}" class="axl"/>`;
  { const g = 6, r1 = lx(1); s += T(rtl ? r1 + g : r1 - g, h - 8, left, 'ax', rtl ? 'start' : 'end') + T(rtl ? r1 - g : r1 + g, h - 8, right, 'ax', rtl ? 'end' : 'start'); }
  rows.forEach((r, i) => {
    const y = (stack ? 82 : 34) + i * rowH;
    r.lines.forEach((ln, k) => { s += stack ? T(rtl ? w - 4 : 4, y - 66 + k * 17, ln, k ? 'lbl sm' : 'lbl', rtl ? 'end' : 'start') : T(rtl ? w - 10 : X0 - 24, y - 14 + k * 17, ln, k ? 'lbl sm' : 'lbl', 'end'); });
    s += `<line x1="${lx(r.lo)}" y1="${y}" x2="${lx(r.hi)}" y2="${y}" class="ci draw ${r.cls}" pathLength="1" style="--i:${i}"/>`;
    s += `<rect x="${lx(r.est) - 8}" y="${y - 8}" width="16" height="16" class="pop ${r.cls}" style="--i:${i + 2}"/>`;
    if (stack) s += T(rtl ? 4 : w - 4, y - 16, `RR ${r.est.toFixed(2)} (${r.lo.toFixed(2)}–${r.hi.toFixed(2)})`, 'val fd', rtl ? 'start' : 'end', `style="--i:${i + 2}"`); else s += T(rtl ? 20 : w - 20, y + 5, `RR ${r.est.toFixed(2)} (${r.lo.toFixed(2)}–${r.hi.toFixed(2)})`, 'val fd', rtl ? 'start' : 'end', `style="--i:${i + 2}"`);
  });
  return svg(w, h, s, label);
}

// Gantt (days after onset; scale breaks after day 28)
export function gantt(rows, { w = 800, rtl = false, labelW = 250, axisLabel = '', label = '', stack = false } = {}) {
  const rowH = stack ? 48 : 38, h = rows.length * rowH + 60, X0 = stack ? 14 : rtl ? 20 : labelW, X1 = stack ? w - 14 : rtl ? w - labelW : w - 20, br = X0 + (X1 - X0) * 0.7;
  const d0 = d => d <= 28 ? X0 + d / 28 * (br - X0) : br + (d - 28) / 62 * (X1 - br);
  const dx = d => rtl ? X0 + X1 - d0(d) : d0(d);
  let s = '';
  [[0, '0'], [3, '72 h'], [7, '7'], [14, '14'], [21, '21'], [28, '28'], [60, '60'], [90, '90']].forEach(([d, l]) => { s += `<line x1="${dx(d)}" y1="4" x2="${dx(d)}" y2="${h - 46}" class="grid"/>` + T(dx(d), h - 30, l, 'ax', 'middle'); });
  s += T((X0 + X1) / 2, h - 8, axisLabel, 'ax', 'middle');
  rows.forEach((r, i) => {
    const y = 8 + i * rowH, by = stack ? y + 22 : y + 9, bh = stack ? 16 : rowH - 18;
    if (stack) s += T(rtl ? w - 4 : 4, y + 14, r.label, 'lbl sm', rtl ? 'end' : 'start');
    else s += T(rtl ? w - 10 : X0 - 12, y + rowH / 2, r.label, 'lbl sm', 'end', 'dominant-baseline="middle"');
    r.bars.forEach(([a, b, op]) => { const xa = dx(a), xb = dx(b); s += `<rect x="${Math.min(xa, xb)}" y="${by}" width="${Math.max(3, Math.abs(xb - xa))}" height="${bh}" rx="5" class="bar ${r.cls}" opacity="${op}" style="--i:${i};transform-origin:${rtl ? 'right' : 'left'}"/>`; });
  });
  return svg(w, h, s, label);
}

// Vertical paired bars
export function vbars(groups, { w = 380, h = 260, max, label = '', title = '', note = '' } = {}) {
  let s = T(10, 22, title, 'lbl', 'start');
  const Y0 = 50, Y1 = h - 56;
  groups.forEach((g, i) => {
    const bx = 40 + i * 140, bh = g.v / max * (Y1 - Y0);
    s += `<rect x="${bx}" y="${Y1 - bh}" width="90" height="${bh}" rx="6" class="bar v ${g.cls}" style="--i:${i}"/>`;
    s += T(bx + 45, Y1 - bh - 10, g.v, 'val fd', 'middle', `style="--i:${i}"`) + T(bx + 45, Y1 + 22, g.label, 'lbl sm', 'middle');
  });
  s += `<line x1="40" y1="${Y1}" x2="${w - 20}" y2="${Y1}" class="axl"/>` + T(10, h - 8, note, 'ax', 'start');
  return svg(w, h, s, label);
}

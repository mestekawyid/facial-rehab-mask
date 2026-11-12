// Shared shell: nav, footer, language, citations, reveal, count-up, smooth scroll.
import { KEYS } from './refs.js?v=6af64f8b';

const COMMON = {
  en: {
    brand: 'Smart Facial Rehabilitation Mask', brandS: 'Facial Mask', skip: 'Skip to content', menu: 'Menu',
    nMask: 'The mask', nScience: 'Science', nEvidence: 'Evidence', nPapers: 'Papers', nTeam: 'Team', nVault: 'Vault',
    caveat: 'Concept prototype — not a cleared medical device',
    tmT: 'Built by our graduation project team.', tmP: 'Faculty of Physical Therapy, Kafrelsheikh University.', tmMore: 'Meet the team',
    fL: 'Graduation project · Concept design for discussion', fR: 'Not medical advice. Not tested on patients.',
  },
  ar: {
    brand: 'القناع الذكي لتأهيل الوجه', brandS: 'قناع الوجه', skip: 'تخطَّ إلى المحتوى', menu: 'القائمة',
    nMask: 'القناع', nScience: 'العلم', nEvidence: 'الأدلة', nPapers: 'الأبحاث', nTeam: 'الفريق', nVault: 'الأرشيف',
    caveat: 'نموذج تصوّري — ليس جهازًا طبيًا معتمدًا',
    tmT: 'من صنع فريق مشروع التخرج.', tmP: 'كلية العلاج الطبيعي، جامعة كفر الشيخ.', tmMore: 'تعرّف على الفريق',
    fL: 'مشروع تخرج · تصميم تصوّري للنقاش', fR: 'ليس نصيحة طبية. لم يُجرَّب على مرضى.',
  },
};

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
export { $, $$ };
export let LANG = 'en';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isReduced = () => reduce;

export function cite(html) {
  return html.replace(/\[\[([A-Za-z0-9]+(?:,[A-Za-z0-9]+)*)\]\]/g, (_, ks) => {
    const ns = ks.split(',').map(k => KEYS[k]).filter(Boolean).sort((a, b) => a - b);
    const links = ns.map(n => `<a href="evidence.html#r-${n}" title="Reference ${n}">${n}</a>`);
    return `<sup class="c">${links.join(',')}</sup>`;
  });
}
export function fill(root, t) {
  root.querySelectorAll('[data-i]').forEach(e => {
    const v = t[e.dataset.i]; if (typeof v !== 'string') return;
    if (/[<\[]/.test(v)) e.innerHTML = cite(v); else e.textContent = v;
  });
  root.querySelectorAll('[data-ia]').forEach(e => { const [attr, key] = e.dataset.ia.split(':'); if (t[key]) e.setAttribute(attr, t[key]); });
}

const ICONS = {
  home: '<path d="M12 3.6c-3.5 0-5.9 2.7-5.9 6.4 0 3.2 1.7 6 4 7.3V20.4h3.8v-3.1c2.3-1.3 4-4.1 4-7.3 0-3.7-2.4-6.4-5.9-6.4z"/><path d="M6.5 8.3c3.6-1.5 7.4-1.5 11 0"/><circle cx="15" cy="12.4" r="1.25"/>',
  science: '<path d="M2.8 12.2h3.6l2.1-5.4 3.6 10.6 2.5-6.3 1.4 1.1h5.2"/>',
  evidence: '<circle cx="10.6" cy="10.6" r="6.2"/><path d="m15.2 15.2 5 5"/><path d="m8 10.7 1.9 1.9 3.6-3.8"/>',
  papers: '<path d="M8.5 3.6h6.8L19 7.3v11.1a1.2 1.2 0 0 1-1.2 1.2H8.5a1.2 1.2 0 0 1-1.2-1.2V4.8a1.2 1.2 0 0 1 1.2-1.2z"/><path d="M15.2 3.6v3.7H19"/><path d="M10.2 11h5.8M10.2 14h5.8M10.2 17h3.6"/><path d="M4.6 7.4v12.4a1.6 1.6 0 0 0 1.6 1.6h9.6"/>',
  vault: '<path d="M12 3.2 19 6v5.3c0 4.4-2.9 7.7-7 9.5-4.1-1.8-7-5.1-7-9.5V6z"/><circle cx="12" cy="10.8" r="1.9"/><path d="M12 12.7v2.9"/>',
  team: '<circle cx="12" cy="8.2" r="3"/><path d="M6.6 19.2c.6-3 2.8-4.7 5.4-4.7s4.8 1.7 5.4 4.7"/><circle cx="5.6" cy="10.2" r="2"/><path d="M2.4 17.6c.3-1.9 1.4-3 3.1-3.2"/><circle cx="18.4" cy="10.2" r="2"/><path d="M21.6 17.6c-.3-1.9-1.4-3-3.1-3.2"/>'
};
const ico = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k]}</svg>`;
function shell(page) {
  const L = [['index.html', 'nMask', 'home'], ['science.html', 'nScience', 'science'], ['evidence.html', 'nEvidence', 'evidence'], ['papers.html', 'nPapers', 'papers'], ['team.html', 'nTeam', 'team'], ['vault.html', 'nVault', 'vault']];
  const links = L.map(([h, k, p]) => `<a href="${h}"${p === page ? ' aria-current="page"' : ''}><span class="ic">${ico(p)}</span><span class="lb" data-i="${k}"></span></a>`).join('');
  const nav = document.createElement('div');
  nav.innerHTML = `<a class="skip" href="#main" data-i="skip"></a>
  <nav id="nav" class="rail">
    <a class="brand" href="index.html" data-ia="aria-label:brand"><i aria-hidden="true"></i></a>
    <div class="navlinks">${links}</div>
    <div class="sp"></div>
    <div class="seg" role="group" aria-label="Language"><button id="bEN" aria-pressed="true">EN</button><button id="bAR" aria-pressed="false" lang="ar">عربي</button></div>
    <button class="menubtn" id="menubtn" aria-expanded="false" data-ia="aria-label:menu"><span></span></button>
  </nav>
  <div class="scrim" id="scrim"></div>
  <aside class="drawer" id="sheet" aria-label="Menu"><div class="dh"><i aria-hidden="true"></i><b data-i="menu"></b></div><div class="dl">${links}</div><p class="dn" data-i="brand"></p></aside>`;
  document.body.prepend(...nav.childNodes);
  const foot = document.createElement('div');
  foot.innerHTML = `<section class="teamband"><div class="wrap"><div class="lg" role="img" aria-label="Team logo"></div>
    <div><h2 data-i="tmT"></h2><p data-i="tmP"></p>${page === 'team' ? '' : '<a class="more" href="team.html" data-i="tmMore"></a>'}</div></div></section>
  <footer class="foot"><div class="wrap"><span data-i="fL"></span><span data-i="fR"></span></div></footer>`;
  document.body.append(...foot.childNodes);
  const navEl = $('#nav'), mb = $('#menubtn');
  const setOpen = o => { navEl.classList.toggle('open', o); document.body.classList.toggle('menu-open', o); mb.setAttribute('aria-expanded', o); };
  mb.onclick = () => setOpen(!navEl.classList.contains('open'));
  $('#scrim').onclick = () => setOpen(false);
  addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  $$('#sheet a').forEach(a => a.addEventListener('click', () => setOpen(false)));
}

export function initSite({ page, T, onLang }) {
  shell(page);
  const dict = l => ({ ...COMMON[l], ...(T?.[l] || {}) });
  function setLang(l) {
    LANG = l; document.documentElement.lang = l; document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    fill(document, dict(l));
    $('#bEN').setAttribute('aria-pressed', l === 'en'); $('#bAR').setAttribute('aria-pressed', l === 'ar');
    try { localStorage.setItem('lang', l); } catch (e) { }
    onLang && onLang(l, dict(l));
  }
  $('#bEN').onclick = () => setLang('en'); $('#bAR').onclick = () => setLang('ar');
  let l = new URLSearchParams(location.search).get('lang');
  if (!l) { try { l = localStorage.getItem('lang'); } catch (e) { } }
  setLang(l === 'ar' ? 'ar' : 'en');

  // reveal + count-up
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; e.target.classList.add('in'); io.unobserve(e.target);
    e.target.querySelectorAll('[data-count],[data-range]').forEach(countUp);
  }), { threshold: 0.01, rootMargin: '0px 0px -6% 0px' });
  $$('.rv').forEach(e => io.observe(e));
  // decorative backdrop for page heroes: faint dot grid + a muscle-signal (EMG-like) trace
  document.body.dataset.page = page;
  document.querySelectorAll('.phero,.shero,.thero').forEach((h, k) => {
    if (h.querySelector('.hdeco')) return;
    let seed = 11 + k * 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const W = 1600, H = 220, mid = 120; let d = `M0 ${mid}`, x = 0;
    while (x < W) { const burst = rnd() < 0.35, len = burst ? 70 + rnd() * 90 : 40 + rnd() * 80;
      for (let i = 0; i < len; i += 4) { const env = burst ? Math.sin(Math.PI * i / len) : 0.06; d += ` L${(x + i).toFixed(0)} ${(mid + (rnd() - 0.5) * 2 * 70 * env).toFixed(1)}`; } x += len; }
    const el = document.createElement('div'); el.className = 'hdeco'; el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '';
    el.insertAdjacentHTML('afterbegin', '<i class="fog f1"></i><i class="fog f2"></i>');
    h.prepend(el);
  });
  // iPhone-style text selection: soft teal highlight that grows in, round handles at both ends
  if (matchMedia('(prefers-reduced-motion: no-preference)').matches && document.caretRangeFromPoint !== undefined || CSS.supports('selector(::selection)')) {
    const layer = document.createElement('div'); layer.className = 'selfx'; layer.setAttribute('aria-hidden', 'true'); document.body.append(layer);
    document.documentElement.classList.add('cselect');
    let raf = 0, last = '';
    const draw = () => {
      raf = 0; const sel = getSelection();
      const inField = document.activeElement && /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
      if (!sel || sel.isCollapsed || !sel.rangeCount || inField) { if (last) { layer.classList.add('out'); last = ''; setTimeout(() => { if (!last) { layer.innerHTML = ''; layer.classList.remove('out'); } }, 180); } return; }
      const r = sel.getRangeAt(0); const lines = [];
      for (const q of r.getClientRects()) { if (q.width < 2 || q.height < 4) continue; const l = lines.find(o => Math.abs(o.top - q.top) < q.height * 0.5);
        if (l) { l.left = Math.min(l.left, q.left); l.right = Math.max(l.right, q.right); l.bottom = Math.max(l.bottom, q.bottom); } else lines.push({ top: q.top, bottom: q.bottom, left: q.left, right: q.right }); }
      if (!lines.length) return;
      lines.sort((a, b) => a.top - b.top || a.left - b.left);
      const key = lines.map(o => [o.top, o.left, o.right].map(Math.round).join(',')).join('|');
      const fresh = !last; last = key; layer.classList.remove('out');
      const rtlSel = getComputedStyle(r.startContainer.parentElement || document.body).direction === 'rtl';
      let html = lines.map((o, i) => `<i class="hl${fresh ? ' in' : ''}" style="left:${o.left - 2}px;top:${o.top}px;width:${o.right - o.left + 4}px;height:${o.bottom - o.top}px;--d:${fresh ? i * 40 : 0}ms"></i>`).join('');
      const a = lines[0], b = lines[lines.length - 1];
      const sx = rtlSel ? a.right + 1 : a.left - 1, ex = rtlSel ? b.left - 1 : b.right + 1;
      html += `<i class="hd s${fresh ? ' in' : ''}" style="left:${sx}px;top:${a.top}px;height:${a.bottom - a.top}px"></i><i class="hd e${fresh ? ' in' : ''}" style="left:${ex}px;top:${b.top}px;height:${b.bottom - b.top}px"></i>`;
      layer.innerHTML = html;
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(draw); };
    document.addEventListener('selectionchange', queue);
    addEventListener('scroll', () => { if (last) { last = last; queue(); } }, { passive: true, capture: true });
    addEventListener('resize', queue);
  }
  // reading progress bar under the nav
  const pb = document.createElement('div'); pb.className = 'sprog'; pb.setAttribute('aria-hidden', 'true'); pb.innerHTML = '<i></i>'; document.body.append(pb);
  let pt = false; const upd = () => { pt = false; const h = document.documentElement.scrollHeight - innerHeight; pb.style.setProperty('--p', h > 0 ? Math.min(1, scrollY / h).toFixed(4) : 0); };
  addEventListener('scroll', () => { if (!pt) { pt = true; requestAnimationFrame(upd); } }, { passive: true }); addEventListener('resize', upd); upd();

  return { setLang, dict };
}

export function countUp(el) {
  const rng = el.dataset.range ? el.dataset.range.split(',').map(Number) : null, end = rng ? rng[1] : +el.dataset.count;
  const dec = (el.dataset.dec | 0), t0 = performance.now(), dur = reduce ? 0 : 1400;
  (function tick(n) {
    const k = dur ? Math.min(1, (n - t0) / dur) : 1, e = 1 - Math.pow(1 - k, 3);
    el.textContent = rng ? `${Math.round(rng[0] * e)}–${Math.round(end * e)}` : (end * e).toFixed(dec);
    if (k < 1) requestAnimationFrame(tick);
  })(t0);
}

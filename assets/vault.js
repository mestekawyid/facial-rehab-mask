import { initSite, $, $$ } from './site.js?v=6af5f4cb';
import { unlock, fileBlob } from './crypt.js?v=6af5f4cb';

const T = {
  en: {
    vpLocked: 'TEAM ONLY', vpOpen: 'VAULT', vgT: 'The project vault.', vgK: 'Locked', vgK2: 'Team only', vgH: 'Every file we made, in its latest version.',
    vgL: 'The report, both papers, both presentations, the parameter files, the evidence appraisal and the 3D model.',
    vgPh: 'Vault password', vgGo: 'Open', vBad: 'That password does not open the vault.', vWait: 'Verifying…',
    sF: 'files', sG: 'collections', sE: 'encryption', prev: 'Previous', next: 'Next', vLock: 'Lock the vault',
    open: 'Open', dl: 'Download', files: 'files', total: 'total', pages: 'pages',
    g: [['The project', 'The full report and the two Arabic study companions.'], ['Papers', 'The two manuscripts prepared for submission.'], ['Presentation', 'The discussion deck, with and without speaker notes.'],
        ['Parameters', 'How every stimulation parameter was chosen, with references.'], ['Evidence appraisal', 'The team’s rating of every source.'], ['3D model', 'The interactive model of the mask and the raw 3D file.']],
  },
  ar: {
    vpLocked: 'للفريق فقط', vpOpen: 'الأرشيف', vgT: 'أرشيف المشروع.', vgK: 'مقفول', vgK2: 'للفريق فقط', vgH: 'كل ملف عملناه، بأحدث نسخة.',
    vgL: 'التقرير، والبحثان، والعرضان، وملفات المعاملات، وتقييم الأدلة، والموديل الـ3D.',
    vgPh: 'كلمة مرور الأرشيف', vgGo: 'افتح', vBad: 'كلمة المرور دي مش بتفتح الأرشيف.', vWait: 'جارٍ التحقق…',
    sF: 'ملف', sG: 'مجموعات', sE: 'تشفير', prev: 'السابق', next: 'التالي', vLock: 'اقفل الأرشيف',
    open: 'فتح', dl: 'تنزيل', files: 'ملفات', total: 'الحجم', pages: 'صفحة',
    g: [['المشروع', 'التقرير الكامل وملفّي الشرح بالعربي.'], ['الأبحاث', 'البحثان المجهزان للنشر.'], ['العرض التقديمي', 'عرض المناقشة، بملاحظات المتحدث وبدونها.'],
        ['المعاملات', 'إزاي اتحدد كل معامل في التحفيز، بالمراجع.'], ['تقييم الأدلة', 'تقييم الفريق لكل مصدر.'], ['الموديل الـ3D', 'الموديل التفاعلي للقناع وملف الـ3D الخام.']],
  },
};
// [title, meta, actions, group, base name, pages]
const FILES = [
  [{ en: 'Project report', ar: 'تقرير المشروع' }, 'v22 · 113 refs', [['report.pdf', 'PDF'], ['report.docx', 'Word']], 0, 'Smart_Facial_Mask_Report_v22', 79],
  [{ en: 'Brief project explainer', ar: 'شرح المشروع المختصر' }, 'v22 · Arabic', [['explainer_ar.pdf', 'PDF']], 0, 'Project_Explainer_AR_v22', 21],
  [{ en: 'Comprehensive reference guide', ar: 'دليل المراجع الشامل' }, 'v22 · Arabic', [['refguide_ar.pdf', 'PDF']], 0, 'Reference_Guide_AR_v22', 61],
  [{ en: 'Paper 1 — narrative review', ar: 'البحث الأول — مراجعة سردية' }, '80 refs', [['paper1.pdf', 'PDF'], ['paper1.docx', 'Word']], 1, 'Paper1_Narrative_Review', 44],
  [{ en: 'Paper 2 — mask design', ar: 'البحث الثاني — تصميم القناع' }, '104 refs', [['paper2.pdf', 'PDF'], ['paper2.docx', 'Word']], 1, 'Paper2_Mask_Design', 50],
  [{ en: 'Discussion presentation', ar: 'عرض المناقشة' }, 'v5 · 25 slides', [['deck.pdf', 'PDF'], ['deck.pptx', 'PowerPoint']], 2, 'Presentation_v5', 25],
  [{ en: 'With speaker notes', ar: 'بملاحظات المتحدث' }, 'v5 · 25 slides', [['decknotes.pptx', 'PowerPoint']], 2, 'Presentation_v5_Speaker_Notes', 25],
  [{ en: 'Parameters summary', ar: 'ملخص المعاملات' }, 'v22', [['params_sum.pdf', 'PDF']], 3, 'Parameters_Summary_v22', 4],
  [{ en: 'Rationale and references', ar: 'المبررات والمراجع' }, 'v22', [['params_rat.pdf', 'PDF']], 3, 'Parameters_Rationale_v22', 41],
  [{ en: 'Evidence appraisal sheet', ar: 'جدول تقييم الأبحاث' }, 'v14 · Excel', [['appraisal.xlsx', 'Excel']], 4, 'Evidence_Appraisal_v14', 0],
  [{ en: 'Interactive 3D model', ar: 'الموديل الـ3D التفاعلي' }, 'v5 · browser', [['model3d.html', 'HTML']], 5, 'Facial_Mask_3D_v5', 0],
  [{ en: '3D model file', ar: 'ملف الموديل الـ3D' }, 'GLB', [['model3d.glb', 'GLB']], 5, 'Facial_Mask_3D', 0],
];
let L = 'en', t = T.en, sess = null, cur = 0;
const fmt = n => n > 1e6 ? (n / 1e6).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1e3)) + ' KB';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- our motif: a quiet EMG-like trace (flat baseline with a few contraction bursts) ----------
function trace(W, H, seed, bursts) { let s = seed; const r = () => (s = (s * 16807) % 2147483647) / 2147483647; const mid = H / 2; let d = `M0 ${mid}`, x = 0;
  while (x < W) { const b = r() < bursts, len = b ? W * (0.08 + r() * 0.08) : W * (0.05 + r() * 0.07);
    for (let i = 0; i < len; i += W / 400) { const env = b ? Math.sin(Math.PI * i / len) : 0.05; d += ` L${(x + i).toFixed(1)} ${(mid + (r() - 0.5) * H * 0.9 * env).toFixed(1)}`; } x += len; }
  return d; }

// ---------- unlock ----------
const form = $('#vForm'), pw = $('#vpw'), msg = $('#vMsg'), card = $('#vcard');
const say = k => { msg.textContent = k ? t[k] : ''; msg.classList.toggle('bad', k === 'vBad'); };
form.addEventListener('submit', async e => {
  e.preventDefault(); if (!pw.value) { pw.focus(); return; }
  say('vWait'); card.classList.add('busy');
  try { sess = await unlock('vault', pw.value); pw.value = ''; pw.blur(); say(''); opened(); }
  catch (_) { say('vBad'); card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); }
  finally { card.classList.remove('busy'); }
});
function opened() {
  document.body.classList.add('granted');               // lock opens, beam brightens
  const D = reduce ? 0 : 1100;
  setTimeout(() => {
    card.classList.add('swap');                          // gate fades out
    setTimeout(() => {
      $('#vgate').hidden = true; $('#vcar').hidden = false; $('#vdots').hidden = false; $('#vLock').hidden = false;
      document.body.classList.remove('locked'); document.body.classList.add('open');
      build(); go(0, true);
      requestAnimationFrame(() => card.classList.remove('swap'));
    }, reduce ? 0 : 420);
  }, D);
}
$('#vLock').onclick = () => location.reload();

// ---------- carousel ----------
function stats(gi) {
  const rows = FILES.filter(f => f[3] === gi), files = sess.m.files;
  let n = 0, sz = 0, pg = 0; rows.forEach(r => { n += r[2].length; r[2].forEach(([id]) => sz += files[id].size); pg += r[5]; }); return { rows, n, sz, pg };
}
function build() {
  if (!sess) return;
  const files = sess.m.files;
  $('#vtrack').innerHTML = t.g.map((g, gi) => { const s = stats(gi);
    return `<article class="vslide" data-i="${gi}"><div class="vtile"><svg class="vico" viewBox="0 0 120 120" aria-hidden="true"><use href="#g${gi}"/></svg><span class="vno num">${String(gi + 1).padStart(2, '0')}</span></div>
      <div class="vpanel"><p class="vk">${String(gi + 1).padStart(2, '0')} · ${s.n} ${t.files}</p><h2>${g[0]}</h2><p class="vd">${g[1]}</p>
        <ul class="vfiles">${s.rows.map(([title, meta, acts, , base]) => `<li><div class="vt"><b>${title[L]}</b><small class="ltr">${meta} · ${fmt(files[acts[0][0]].size)}</small></div><div class="va">${acts.map(([id, lab]) => {
          const ext = id.split('.').pop(), canOpen = ['pdf', 'html'].includes(ext);
          return `${canOpen ? `<button type="button" class="vb pri" data-f="${id}" data-act="open" data-n="${base}.${ext}">${t.open}</button>` : ''}<button type="button" class="vb" data-f="${id}" data-act="dl" data-n="${base}.${ext}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>${lab}</button>`; }).join('')}</div><i class="vp" aria-hidden="true"></i></li>`).join('')}</ul>
        <div class="vstats"><div><b class="num">${s.n}</b><span>${t.files}</span></div><div><b class="num">${fmt(s.sz)}</b><span>${t.total}</span></div>${s.pg ? `<div><b class="num">${s.pg}</b><span>${t.pages}</span></div>` : ''}</div>
      </div></article>`; }).join('');
  $('#vdots').innerHTML = t.g.map((_, i) => `<button type="button" aria-label="${t.g[i][0]}" data-i="${i}"></button>`).join('');
  $$('#vdots button').forEach(b => b.onclick = () => go(+b.dataset.i));
  $$('#vtrack .vb').forEach(b => b.addEventListener('click', () => act(b)));
  $$('#vtrack .vslide').forEach(s => s.addEventListener('click', () => { const i = +s.dataset.i; if (i !== cur) go(i); }));
  $('#vpT').textContent = t.vpOpen; $('#vpN').textContent = String(FILES.reduce((a, f) => a + f[2].length, 0));
  go(cur, true);
}
function go(i, instant) {
  const n = t.g.length; cur = (i + n) % n;
  $$('#vtrack .vslide').forEach(s => { const k = +s.dataset.i; let d = k - cur; if (d > n / 2) d -= n; if (d < -n / 2) d += n;
    s.className = 'vslide ' + (d === 0 ? 'cur' : d === -1 ? 'prev' : d === 1 ? 'next' : d < 0 ? 'far-l' : 'far-r'); s.inert = d !== 0; });
  $$('#vdots button').forEach((b, k) => b.classList.toggle('on', k === cur));
  const c = $('#vtrack .vslide.cur'); if (c) $('#vtrack').style.height = c.offsetHeight + 'px';
}
$('#vPrev').onclick = () => go(cur + (L === 'ar' ? 1 : -1)); $('#vNext').onclick = () => go(cur + (L === 'ar' ? -1 : 1));
addEventListener('keydown', e => { if (!sess || e.target.tagName === 'INPUT') return; if (e.key === 'ArrowLeft') $('#vPrev').click(); if (e.key === 'ArrowRight') $('#vNext').click(); });
addEventListener('resize', () => { if (sess) go(cur, true); });
{ let x0 = null, y0 = 0; const tr = $('#vtrack');
  tr.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  tr.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) (dx < 0 ? $('#vNext') : $('#vPrev')).click(); }); }

// ---------- open / download ----------
let dls = null; (async () => { try { dls = await window.claude?.use?.('downloads'); } catch (_) { } })();
async function act(b) {
  if (b.classList.contains('busy')) return; b.classList.add('busy');
  const li = b.closest('li'), bar = li.querySelector('.vp'), f = b.dataset.f, open = b.dataset.act === 'open';
  const win = open && !dls ? window.open('', '_blank') : null;
  li.classList.add('working'); bar.style.setProperty('--p', 0);
  try {
    const blob = await fileBlob(sess, f, p => bar.style.setProperty('--p', p.toFixed(3)));
    if (dls && !open) { await dls.save({ filename: b.dataset.n, data: blob }); return; }
    const url = URL.createObjectURL(blob);
    if (open && win) { win.location.href = url; return; }
    const a = document.createElement('a'); a.href = url; if (!open) a.download = b.dataset.n; else a.target = '_blank'; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (e) { if (win) win.close(); console.warn(e); }
  finally { b.classList.remove('busy'); li.classList.remove('working'); }
}

initSite({ page: 'vault', T, onLang: (l, tt) => { L = l; t = tt; if (sess) build(); } });
setTimeout(() => { if (!sess && matchMedia('(hover:hover)').matches) pw.focus({ preventScroll: true }); }, 700);
window.__done = true;

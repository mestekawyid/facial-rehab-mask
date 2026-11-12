import { initSite, $, $$ } from './site.js?v=6af5eaf7';
import { createMaskScene, loadBust } from './mask3d.js?v=6af5eaf7';
import { unlock, fileBlob, manifest } from './crypt.js?v=6af5eaf7';

const T = {
  en: {
    vgK: 'Restricted · team only', vgT: 'The project vault.', vgL: 'Every file from the project, in its latest version: report, papers, both presentations, the parameter files, the evidence appraisal and the 3D model.',
    vgPh: 'Enter the vault password', vgGo: 'Open the vault', vBad: 'That password does not open the vault.', vWait: 'Verifying…', vOk: 'Access granted',
    vcE: 'Vault', vcT: 'Everything we made.', vcP: 'Latest reviewed versions only. Files are decrypted on this device when you open them.',
    vsN: 'files', vsS: 'in total', vsG: 'collections', vfN: 'The vault locks again when you leave or reload this page.', vLock: 'Lock the vault now',
    open: 'Open', dl: 'Download', working: 'Decrypting',
    g: [
      ['The project', 'The full report and the two Arabic study companions.'],
      ['Papers', 'The two manuscripts prepared for submission.'],
      ['Presentation', 'The discussion deck, with and without speaker notes.'],
      ['Parameters', 'How every stimulation parameter was chosen, with references.'],
      ['Evidence appraisal', 'The team’s rating of every source.'],
      ['3D model', 'The interactive model of the mask and the raw 3D file.'],
    ],
  },
  ar: {
    vgK: 'محظور · للفريق فقط', vgT: 'أرشيف المشروع.', vgL: 'كل ملفات المشروع بأحدث نسخة: التقرير، والبحثان، والعرضان، وملفات المعاملات، وتقييم الأدلة، والموديل الـ3D.',
    vgPh: 'اكتب كلمة مرور الأرشيف', vgGo: 'افتح الأرشيف', vBad: 'كلمة المرور دي مش بتفتح الأرشيف.', vWait: 'جارٍ التحقق…', vOk: 'تم السماح بالدخول',
    vcE: 'الأرشيف', vcT: 'كل اللي عملناه.', vcP: 'أحدث النسخ بعد المراجعة فقط. الملفات بتتفك على جهازك وقت ما تفتحها.',
    vsN: 'ملف', vsS: 'الحجم الكلي', vsG: 'مجموعات', vfN: 'الأرشيف بيتقفل تاني لما تخرج من الصفحة أو تعمل تحديث.', vLock: 'اقفل الأرشيف دلوقتي',
    open: 'فتح', dl: 'تنزيل', working: 'جارٍ الفك',
    g: [
      ['المشروع', 'التقرير الكامل وملفّي الشرح بالعربي.'],
      ['الأبحاث', 'البحثان المجهزان للنشر.'],
      ['العرض التقديمي', 'عرض المناقشة، بملاحظات المتحدث وبدونها.'],
      ['المعاملات', 'إزاي اتحدد كل معامل في التحفيز، بالمراجع.'],
      ['تقييم الأدلة', 'تقييم الفريق لكل مصدر.'],
      ['الموديل الـ3D', 'الموديل التفاعلي للقناع وملف الـ3D الخام.'],
    ],
  },
};
// groups of files: [title EN, title AR, meta, [[id, label]...]]
const FILES = [
  [{ en: 'Project report', ar: 'تقرير المشروع' }, 'v22 · 79 pp · 113 refs', [['report.pdf', 'PDF'], ['report.docx', 'Word']], 0, 'Smart_Facial_Mask_Report_v22'],
  [{ en: 'Brief project explainer (Arabic)', ar: 'شرح المشروع المختصر' }, 'v22 · 21 pp', [['explainer_ar.pdf', 'PDF']], 0, 'Project_Explainer_AR_v22'],
  [{ en: 'Comprehensive reference guide (Arabic)', ar: 'دليل المراجع الشامل' }, 'v22 · 61 pp', [['refguide_ar.pdf', 'PDF']], 0, 'Reference_Guide_AR_v22'],
  [{ en: 'Paper 1 — narrative review', ar: 'البحث الأول — مراجعة سردية' }, '44 pp · 80 refs', [['paper1.pdf', 'PDF'], ['paper1.docx', 'Word']], 1, 'Paper1_Narrative_Review'],
  [{ en: 'Paper 2 — mask design and verification plan', ar: 'البحث الثاني — تصميم القناع وخطة التحقق' }, '50 pp · 104 refs', [['paper2.pdf', 'PDF'], ['paper2.docx', 'Word']], 1, 'Paper2_Mask_Design'],
  [{ en: 'Discussion presentation', ar: 'عرض المناقشة' }, 'v5 · 25 slides', [['deck.pdf', 'PDF'], ['deck.pptx', 'PowerPoint']], 2, 'Presentation_v5'],
  [{ en: 'Discussion presentation, with speaker notes', ar: 'عرض المناقشة بملاحظات المتحدث' }, 'v5 · 25 slides', [['decknotes.pptx', 'PowerPoint']], 2, 'Presentation_v5_Speaker_Notes'],
  [{ en: 'Parameters summary', ar: 'ملخص المعاملات' }, 'v22 · 4 pp', [['params_sum.pdf', 'PDF']], 3, 'Parameters_Summary_v22'],
  [{ en: 'Parameters rationale and references', ar: 'مبررات المعاملات ومراجعها' }, 'v22 · 41 pp', [['params_rat.pdf', 'PDF']], 3, 'Parameters_Rationale_v22'],
  [{ en: 'Evidence appraisal sheet', ar: 'جدول تقييم الأبحاث' }, 'v14 · Excel', [['appraisal.xlsx', 'Excel']], 4, 'Evidence_Appraisal_v14'],
  [{ en: 'Interactive 3D model', ar: 'الموديل الـ3D التفاعلي' }, 'v5 · opens in the browser', [['model3d.html', 'HTML']], 5, 'Facial_Mask_3D_v5'],
  [{ en: '3D model file', ar: 'ملف الموديل الـ3D' }, 'GLB · for 3D software', [['model3d.glb', 'GLB']], 5, 'Facial_Mask_3D'],
];
let L = 'en', t = T.en, sess = null;
const fmt = n => n > 1e6 ? (n / 1e6).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1e3)) + ' KB';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile = () => matchMedia('(max-width:820px)').matches;

// ---------- 3D gate ----------
const canvas = $('#v3d'), gate = $('#vgate');
let S = null, run = true, t0 = performance.now(), anim = null;
const nav_ = navigator, lite = !!(nav_.connection && nav_.connection.saveData) || (nav_.hardwareConcurrency || 8) <= 2;
function frame3d() {
  if (!S) return;
  const w = canvas.clientWidth, h = canvas.clientHeight, cam = S.camera;
  S.resize(); cam.clearViewOffset();
  if (mobile()) cam.setViewOffset(w, h, 0, h * 0.2, w, h); else cam.setViewOffset(w, h, (L === 'ar' ? 1 : -1) * w * 0.2, 0, w, h);
  cam.updateProjectionMatrix();
}
loadBust(lite ? 'assets/bust_lite.js?v=6af5eaf7' : 'assets/bust_full.js?v=6af5eaf7').then(b => createMaskScene(canvas, { lite, maxDpr: mobile() ? 1.75 : 2, cheapMat: mobile(), noShadow: mobile(), fit: mobile() ? 0.62 : 0.66, wfit: mobile() ? 0.9 : 0.9, lookY: 0.15, bust: b }))
  .then(s => { S = s; Object.assign(S.state, { progress: 1, explode: 1, yaw: -0.42, active: -1, side: 0 }); frame3d(); gate.classList.add('ready'); requestAnimationFrame(loop); })
  .catch(e => { console.warn(e); gate.classList.add('nogl'); });
addEventListener('resize', () => { if (S) frame3d(); });
const ease = x => x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x);
function loop(now) {
  if (!run || !S) return; requestAnimationFrame(loop);
  const tt = (now - t0) / 1000; S.state.time = tt;
  if (anim) {
    const p = Math.min(1, (now - anim.t) / anim.d), e = ease(p);
    S.state.explode = 1 - ease(p / 0.55);
    S.state.yaw = anim.y0 + e * (Math.PI * 2 + (-0.38 - anim.y0));
    S.state.active = p > 0.55 && p < 0.98 ? Math.min(5, Math.floor((p - 0.55) / 0.43 * 6)) : -1;
    S.state.pitch = 0;
  } else if (!reduce) { S.state.yaw = -0.42 + Math.sin(tt * 0.22) * 0.55; S.state.pitch = Math.sin(tt * 0.5) * 0.03; S.state.explode = 0.8 + Math.sin(tt * 0.8) * 0.2; }
  S.render();
}
document.addEventListener('visibilitychange', () => { if (document.hidden) run = false; else if (!run && !gate.hidden) { run = true; requestAnimationFrame(loop); } });

// ---------- unlock ----------
const form = $('#vForm'), pw = $('#vpw'), msg = $('#vMsg');
const say = (k, bad) => { msg.textContent = k ? t[k] : ''; msg.classList.toggle('bad', !!bad); };
form.addEventListener('submit', async e => {
  e.preventDefault(); if (!pw.value) { pw.focus(); return; }
  say('vWait'); gate.classList.add('busy');
  try { sess = await unlock('vault', pw.value); pw.value = ''; pw.blur(); say(''); opened(); }
  catch (_) { say('vBad', true); gate.classList.remove('shake'); void gate.offsetWidth; gate.classList.add('shake'); }
  finally { gate.classList.remove('busy'); }
});
function opened() {
  $('#vStatus').textContent = t.vOk;
  build();
  const D = reduce ? 10 : 2600;
  gate.classList.add('granted');
  if (S) anim = { t: performance.now(), d: D, y0: Math.atan2(Math.sin(S.state.yaw), Math.cos(S.state.yaw)) };
  setTimeout(() => {
    const c = $('#vcontent'); c.hidden = false; document.body.classList.remove('vault-locked'); document.body.classList.add('vault-open');
    requestAnimationFrame(() => { gate.classList.add('away'); c.classList.add('in'); });
    setTimeout(() => { run = false; gate.hidden = true; scrollTo(0, 0); }, reduce ? 0 : 1100);
  }, reduce ? 0 : D - 300);
}
$('#vLock').onclick = () => location.reload();

// ---------- file list ----------
let dls = null; (async () => { try { dls = await window.claude?.use?.('downloads'); } catch (_) { } })();
function build() {
  if (!sess) return;
  const files = sess.m.files; let total = 0, n = 0;
  const groups = t.g.map((g, gi) => {
    const rows = FILES.filter(f => f[3] === gi);
    return `<div class="vg" style="--d:${gi * 90}ms"><div class="vgh"><span class="vn num">${String(gi + 1).padStart(2, '0')}</span><div><h3>${g[0]}</h3><p>${g[1]}</p></div></div>
      <ul>${rows.map(([title, meta, acts, , base]) => { const sz = acts.reduce((a, [id]) => a + (files[id] ? files[id].size : 0), 0); n += acts.length; total += sz;
        return `<li><div class="vt"><b>${title[L]}</b><small class="ltr">${meta} · ${fmt(files[acts[0][0]].size)}</small></div><div class="va">${acts.map(([id, lab], k) => {
          const ext = id.split('.').pop(), canOpen = ['pdf', 'html'].includes(ext);
          return `${canOpen ? `<button type="button" class="vb pri" data-f="${id}" data-act="open" data-n="${base}.${ext}">${t.open}<i class="tag">${lab}</i></button>` : ''}<button type="button" class="vb" data-f="${id}" data-act="dl" data-n="${base}.${ext}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>${lab}</button>`; }).join('')}</div><i class="vp" aria-hidden="true"></i></li>`; }).join('')}</ul></div>`;
  }).join('');
  $('#vgroups').innerHTML = groups;
  $('#vsN').textContent = n; $('#vsS').textContent = fmt(total); $('#vsG').textContent = t.g.length;
  $$('#vgroups .vb').forEach(b => b.addEventListener('click', () => act(b)));
}
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

initSite({ page: 'vault', T, onLang: (l, tt) => { L = l; t = tt; build(); if (S) frame3d(); if ($('#vStatus').textContent) $('#vStatus').textContent = t.vOk; } });
setTimeout(() => { if (!sess) pw.focus({ preventScroll: true }); }, 900);
window.__done = true;

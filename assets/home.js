import { initSite, $, $$, LANG } from './site.js?v=6af64a94';
import { createMaskScene, loadBust } from './mask3d.js?v=6af64a94';

const CHC = ['#2A8A94', '#4A78B0', '#7D6FB4', '#C07A8E', '#C9915F', '#5E9C7A'];
const SITES = ['Frontalis', 'Orbicularis oculi', 'Zygomaticus major', 'Orbicularis oris', 'Depressor anguli oris', 'Mentalis'];
const T = {
  en: {
    b0e: 'Facial rehabilitation, reimagined', b0t: 'A mask that leaves the face free.', b0l: 'An open-face frame that holds small electrodes over the facial muscles — nothing over the eyes, nose or mouth.',
    b1e: 'Assembly', b1t: 'A light frame that finds its place.', b1l: 'A padded head band and a crown strap hold the frame. Six flexible arms reach the muscles.',
    b2e: 'Inside the design', b2t: 'Every part, in its place.', b2l: 'A symmetric frame with a dock on each temple, and one detachable side module that carries the arms.',
    b3e: 'Left or right', b3t: 'One module. Either side.', b3l: 'The side module attaches to the dock on the affected side. The free dock is closed with a soft cover.',
    b4e: 'Six target muscles', b4t: 'One muscle at a time.', b4l: 'All contractions for one muscle, then the next. The reference pad sits on the same-side shoulder.',
    sc: ['Swipe sideways on the model to turn it', 'Band, crown strap, then six arms', 'Seven parts, each with one job', 'The module moves to the affected side', 'Each muscle lights up in turn'], scNow: 'Now: ',
    holdTip: 'Press and hold to open', holdGo: 'Keep holding…',
    hint: 'Scroll to explore', drag: 'Drag to turn', right: 'Right', left: 'Left',
    parts: { band: 'Padded head band', crown: 'Crown strap', dock: 'Temple dock · both sides', module: 'Detachable side module', pod: 'Temple pod', electrode: 'Electrode holder × 6', pad: 'Reference pad' },
    whyE: 'Why it matters', whyT: 'A common condition with a visible, daily cost.',
    whyP: 'Peripheral facial palsy weakens the muscles of facial expression. Besides the visible asymmetry, it affects eye closure, speech, eating and drinking, and the expression of emotion [[DiPietro2023,Pauna2024]].',
    f1: 'new cases per 100,000 people each year, in reported studies [[Heckmann2019]]', f2: 'people develop Bell’s palsy during their lifetime [[deAlmeida2014]]', f3: 'of people with Bell’s palsy do not recover fully [[Pauna2024]]',
    f1v: '7–40', f2v: '1 in 60', f3v: '~30%',
    paE: 'The gap', paT: 'Stimulating one small muscle is harder than it sounds.',
    pa1: 'Today', pa2: 'With the mask',
    p1: 'Electrodes are moved by hand for every muscle.', p2: 'Facial muscles are small and close together, so current spreads to neighbours [[Kurz2022]].', p3: 'Pads and hands cover the face the therapist needs to watch.',
    a1: 'Six electrodes stay in place over chosen motor points.', a2: 'One electrode is active at a time, so currents never add up.', a3: 'The face stays open for watching the movement and for mirror feedback.',
    gapN: 'In the literature we reviewed, we found no purpose-built device that does all three.',
    ptE: 'The parts', ptT: 'Three pieces. Drag to turn them.', ptP: 'The frame stays the same for every patient. The side module carries the arms and moves to whichever side needs it.', pt1: 'Frame', pt1d: 'Padded head band, crown strap and a dock on each temple; the free dock gets a soft cover.', pt2: 'Side module', pt2d: 'Detachable. A telescopic side bar with six flexible arms, one for each target muscle.', pt3: 'Electrode holder', pt3d: 'Holds one small electrode over a motor point; six per module.', ptN: 'Concept renders of the design, not a manufactured product.',
    syE: 'How a session runs', syT: 'Three parts, one sequence.', syP: 'A certified stimulator makes the current. A switching box connects it to one electrode at a time.',
    n1: 'Stimulator', n1s: 'Commercial, certified', n2: 'Switching box', n2s: 'Picks one channel', n3: 'Mask', n3s: 'Six channels', n4: 'Phone app? Under discussion', n2o: 'Design open',
    opT: 'The control side is still open.', opP: 'The switching box will be designed and built with the engineer. Its control logic, and whether it is run from the box itself or from a phone app, has not been decided yet.',
    sqE: 'Sequence', sqT: 'One muscle, start to finish.', sqP: 'How a session moves across the six muscles, and how much each one receives.',
    ordT: 'In what order are the muscles stimulated?', mBlock: 'Muscle by muscle', mCirc: 'Round by round',
    mBlockD: 'All contractions for one muscle are completed, then the next muscle starts. This is the order chosen in the project report.',
    mCircD: 'One contraction per muscle, then on to the next, repeated in rounds. No study has compared this with the block order — it is an option to evaluate.',
    round: 'Round', waveN: 'Schematic — 4 contractions per muscle are shown for illustration only. Each shape is one contraction: ramp up, hold, ramp down, then rest.',
    doseK: 'How many contractions?', doseP: 'Set by the clinician for each muscle. What published Bell’s palsy studies used:',
    dose1: '3 sets of 30 minimal contractions per muscle [[Tuncay2015,Ray2025]]', dose2: '5 strong contractions per muscle [[DiPietro2023]]', dose3: '10 contractions per muscle, one muscle at a time — a trial protocol with no results yet [[Loyo2020]]', dose4: 'Our starting dose for innervated muscle: 1 set of 10 contractions per muscle',
    ctrK: 'Why one at a time?', ctrP: 'With only one electrode active, currents from different electrodes never add up, and it is easy to see which muscle responds.',
    st1: 'motor points, one small electrode on each', st2: 'channel active at a time', st3: 'temple docks, so the module fits the left or right side', st4: 'cm head band range [[Gordon2014]]',
    cpE: 'Part of rehabilitation', cpT: 'It adds to exercise therapy. It does not replace it.',
    cpP: 'Exercise and neuromuscular retraining have the more consistent evidence [[Khan2022,Pauna2024]]. Because the face stays open, stimulation can be combined with mirror feedback.',
    c0s: 'Science', c0b: 'Interactive charts: nerve, muscle and the evidence.', c1s: 'Evidence', c1b: 'What the studies say, in plain language.', c2s: 'Papers', c2b: 'Two manuscripts to read or download.', c3s: 'Team', c3b: 'The people behind the project.', go: 'Open',
  },
  ar: {
    b0e: 'تأهيل الوجه برؤية جديدة', b0t: 'قناع يترك الوجه حرًّا.', b0l: 'إطار مفتوح يثبّت أقطابًا صغيرة فوق عضلات الوجه، بلا شيء فوق العينين أو الأنف أو الفم.',
    b1e: 'التركيب', b1t: 'إطار خفيف يأخذ مكانه.', b1l: 'رباط مبطّن حول الرأس ورباط فوقه يثبّتان الإطار، وستة أذرع مرنة تصل إلى العضلات.',
    b2e: 'من الداخل', b2t: 'كل جزء في مكانه.', b2l: 'إطار متماثل بقاعدة تركيب على كل صدغ، وموديول جانبي واحد يُفك ويُركّب ويحمل الأذرع.',
    b3e: 'يمين أو شمال', b3t: 'موديول واحد لأي جانب.', b3l: 'يُركَّب الموديول الجانبي في قاعدة الجانب المصاب، وتُغلق القاعدة الأخرى بغطاء ناعم.',
    b4e: 'ست عضلات مستهدفة', b4t: 'عضلة واحدة في كل مرة.', b4l: 'كل انقباضات العضلة، ثم العضلة التالية. والقطب المرجعي على الكتف في نفس الجانب.',
    sc: ['اسحب الموديل يمين وشمال عشان تلفّه', 'الرباط وحزام الرأس، ثم الأذرع الست', 'سبع قطع، لكل واحدة وظيفة', 'الموديول ينتقل للجانب المصاب', 'كل عضلة بتشتغل بالدور'], scNow: 'الآن: ',
    holdTip: 'اضغط مطوّلًا للفتح', holdGo: 'كمّل ضغط…',
    hint: 'مرّر لأسفل للاستكشاف', drag: 'اسحب للتدوير', right: 'يمين', left: 'شمال',
    parts: { band: 'رباط الرأس المبطّن', crown: 'رباط فوق الرأس', dock: 'قاعدة تركيب · في الجانبين', module: 'موديول جانبي يُفك', pod: 'كبسولة الصدغ', electrode: 'حامل القطب × 6', pad: 'القطب المرجعي' },
    whyE: 'لماذا يهمّ', whyT: 'حالة شائعة، وأثرها ظاهر كل يوم.',
    whyP: 'شلل الوجه الطرفي يُضعف عضلات تعبيرات الوجه. وإلى جانب عدم التماثل الظاهر، يؤثر على إغلاق العين والكلام والأكل والشرب والتعبير عن المشاعر [[DiPietro2023,Pauna2024]].',
    f1: 'حالة جديدة لكل 100,000 شخص سنويًا، بحسب الدراسات [[Heckmann2019]]', f2: 'أشخاص يُصاب واحد منهم بشلل بِل خلال حياته [[deAlmeida2014]]', f3: 'من مرضى شلل بِل لا يتعافون تمامًا [[Pauna2024]]',
    f1v: '7–40', f2v: '1 من كل 60', f3v: '~30%',
    paE: 'الفجوة', paT: 'تحفيز عضلة صغيرة واحدة أصعب مما يبدو.',
    pa1: 'اليوم', pa2: 'مع القناع',
    p1: 'تُنقل الأقطاب باليد لكل عضلة.', p2: 'عضلات الوجه صغيرة ومتقاربة، فيمتد التيار إلى العضلات المجاورة [[Kurz2022]].', p3: 'الأقطاب واليدان تغطي الوجه الذي يحتاج المعالج إلى مراقبته.',
    a1: 'ستة أقطاب ثابتة فوق نقاط حركية مختارة.', a2: 'قطب واحد يعمل في كل مرة، فلا تتجمع التيارات.', a3: 'الوجه مكشوف لمراقبة الحركة وللتدريب أمام المرآة.',
    gapN: 'في الأبحاث التي راجعناها، لم نجد جهازًا مصمّمًا خصيصًا يجمع الثلاثة.',
    ptE: 'الأجزاء', ptT: 'ثلاث قطع. اسحب لتدويرها.', ptP: 'الإطار واحد لكل المرضى، والموديول الجانبي يحمل الأذرع وينتقل إلى الجانب الذي يحتاجه.', pt1: 'الإطار', pt1d: 'رباط مبطّن حول الرأس ورباط فوقه وقاعدة تركيب على كل صدغ، وتُغطّى القاعدة غير المستخدمة بغطاء ناعم.', pt2: 'الموديول الجانبي', pt2d: 'يُفك ويُركّب. ذراع جانبية قابلة للضبط بستة أذرع مرنة، ذراع لكل عضلة مستهدفة.', pt3: 'حامل القطب', pt3d: 'يثبّت قطبًا صغيرًا فوق نقطة حركية، وفي كل موديول ستة منها.', ptN: 'صور تصوّرية للتصميم، وليست منتجًا مصنّعًا.',
    syE: 'كيف تسير الجلسة', syT: 'ثلاثة أجزاء، وتسلسل واحد.', syP: 'جهاز تحفيز معتمد يولّد التيار، وصندوق تبديل يوصله إلى قطب واحد في كل مرة.',
    n1: 'جهاز التحفيز', n1s: 'تجاري ومعتمد', n2: 'صندوق التبديل', n2s: 'يختار قناة واحدة', n3: 'القناع', n3s: 'ست قنوات', n4: 'تطبيق على الهاتف؟ قيد النقاش', n2o: 'التصميم لم يُحسم',
    opT: 'جانب التحكم ما زال مفتوحًا.', opP: 'صندوق التبديل سيُصمَّم ويُبنى مع المهندس. لم يُحسم بعد منطق التحكم فيه، ولا هل سيُشغَّل من الصندوق نفسه أم من تطبيق على الهاتف.',
    sqE: 'التسلسل', sqT: 'عضلة واحدة، من أولها لآخرها.', sqP: 'إزاي الجلسة بتمشي على العضلات الست، وكل عضلة بتاخد قد إيه.',
    ordT: 'بأي ترتيب تُحفَّز العضلات؟', mBlock: 'عضلة عضلة', mCirc: 'جولة بعد جولة',
    mBlockD: 'تكتمل كل انقباضات العضلة الأولى، ثم تبدأ العضلة التالية. هذا هو الترتيب المختار في تقرير المشروع.',
    mCircD: 'انقباضة واحدة لكل عضلة ثم ننتقل للتالية، وتتكرر الجولات. لم تقارن أي دراسة هذا بالترتيب الأول، فهو خيار يحتاج تقييمًا.',
    round: 'جولة', waveN: 'رسم توضيحي: 4 انقباضات لكل عضلة للتوضيح فقط. كل شكل انقباضة واحدة: صعود تدريجي، ثبات، نزول، ثم راحة.',
    doseK: 'كم انقباضة؟', doseP: 'يحدّدها المعالج لكل عضلة. ما استخدمته دراسات شلل بِل المنشورة:',
    dose1: '3 مجموعات من 30 انقباضة بسيطة لكل عضلة [[Tuncay2015,Ray2025]]', dose2: '5 انقباضات قوية لكل عضلة [[DiPietro2023]]', dose3: '10 انقباضات لكل عضلة، عضلة واحدة في كل مرة، في بروتوكول تجربة لم تُنشر نتائجه بعد [[Loyo2020]]', dose4: 'جرعتنا المبدئية للعضلة المتصلة بالعصب: مجموعة واحدة من 10 انقباضات لكل عضلة',
    ctrK: 'لماذا عضلة واحدة في كل مرة؟', ctrP: 'عندما يعمل قطب واحد فقط، لا تتجمع تيارات الأقطاب المختلفة، ويسهل رؤية العضلة التي تستجيب.',
    st1: 'نقاط حركية، على كل واحدة قطب صغير', st2: 'قناة تعمل في كل مرة', st3: 'قاعدتا تركيب، فيناسب الموديول الجانب الأيمن أو الأيسر', st4: 'سم مدى ضبط رباط الرأس [[Gordon2014]]',
    cpE: 'جزء من التأهيل', cpT: 'يُضاف إلى العلاج بالتمارين، ولا يحلّ محلّه.',
    cpP: 'التمارين وإعادة التدريب العصبي العضلي أدلتها أكثر اتساقًا [[Khan2022,Pauna2024]]. ولأن الوجه مكشوف، يمكن الجمع بين التحفيز والتدريب أمام المرآة.',
    c0s: 'العلم', c0b: 'رسوم تفاعلية: العصب والعضلة والأدلة.', c1s: 'الأدلة', c1b: 'ماذا تقول الدراسات، بلغة بسيطة.', c2s: 'الأبحاث', c2b: 'بحثان للقراءة أو التنزيل.', c3s: 'الفريق', c3b: 'الناس وراء المشروع.', go: 'افتح',
  },
};

const canvas = $('#c3d'), story = $('#story'), stage = $('#stage');
const MQ = matchMedia('(max-width:820px)'); let mobile = MQ.matches;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
// performance tier: phones and low-memory / low-core devices get the light scene
const nav_ = navigator, saveData = !!(nav_.connection && nav_.connection.saveData);
// full-quality model everywhere; only genuinely weak devices (data saver, <=2 GB, <=2 cores) get the light scene
const lite = saveData || (nav_.hardwareConcurrency || 8) <= 2;
document.documentElement.classList.toggle('lite', lite || mobile); // CSS-only savings (no masks, no blur) on phones
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), sm = t => { t = clamp(t); return t * t * (3 - 2 * t); };
let S = null, L = 'en';
const TAGS = ['band', 'crown', 'dock', 'module', 'pod', 'electrode', 'pad'];
$('#tags').innerHTML = TAGS.map(k => `<div class="tag3d" data-t="${k}"><span></span></div>`).join('');
const tagEls = $$('.tag3d'), beats = $$('.beat'), bars = $$('#prog span'), callout = $('#callout'), hint = $('#hint');
let cTop = 0, sW = 0; const measure = () => { cTop = canvas.offsetTop; sW = stage.clientWidth; };
let sig = '', lastPulse = 0, lastR = 0, ftAvg = 16, fN = 0;
const dprMax = Math.min(window.devicePixelRatio || 1, lite ? 1.25 : 2); let dpr = dprMax; const dprMin = mobile ? Math.min(dprMax, 1.5) : 1;
// drag to turn the model (adds to the scroll-driven pose); eases back slowly when released
let uYaw = 0, uPitch = 0, vYaw = 0, dragP = null;
canvas.style.touchAction = 'pan-y pinch-zoom';
canvas.addEventListener('pointerdown', e => { dragP = { x: e.clientX, y: e.clientY, yaw: uYaw, pitch: uPitch, id: e.pointerId, lock: e.pointerType === 'mouse' ? 'rot' : null }; if (dragP.lock) { canvas.setPointerCapture(e.pointerId); stage.classList.add('dragging'); } });
canvas.addEventListener('pointermove', e => {
  if (!dragP) return; const dx = e.clientX - dragP.x, dy = e.clientY - dragP.y;
  // touch: decide once whether this gesture is a sideways turn or a page scroll; scrolling never turns the model
  if (!dragP.lock) { if (Math.hypot(dx, dy) < 10) return; if (Math.abs(dx) > Math.abs(dy) * 1.4) { dragP.lock = 'rot'; dragP.x = e.clientX; dragP.y = e.clientY; try { canvas.setPointerCapture(dragP.id); } catch (_) { } stage.classList.add('dragging'); return; } dragP = null; return; }
  const ny = dragP.yaw + dx * 0.008; vYaw = (ny - uYaw); uYaw = ny; if (e.pointerType === 'mouse') uPitch = Math.max(-0.25, Math.min(0.25, dragP.pitch + dy * 0.003)); dirty = true; });
const endDrag = () => { if (!dragP) return; dragP = null; stage.classList.remove('dragging'); };
canvas.addEventListener('pointerup', endDrag); canvas.addEventListener('pointercancel', endDrag);
const scard = $('#scard'), scN = $('#scN'), scT = $('#scT'), scS = $('#scS'), scFill = $('#scFill'); let lastFill = -1, lastSc = '';
let lastT = 0, actT0 = -1, vel = 0; const ANCH = [0, 0.235, 0.405, 0.655, 0.73]; const ACT_MS = 1700;
let target = reduce ? 1 : 0, cur = reduce ? 0.73 : 0, lastBeat = -1, lastAct = -2, dirty = true, visible = true;

function tagText() {
  tagEls.forEach((e, i) => e.querySelector('span').textContent = mobile ? String(i + 1) : T[L].parts[e.dataset.t]);
  $('#legend').innerHTML = TAGS.map((k, i) => `<li><b class="num">${i + 1}</b>${T[L].parts[k]}</li>`).join('');
}
function frameCam() {
  if (!S) return; const w = canvas.clientWidth, h = canvas.clientHeight, cam = S.camera;
  if (!mobile) { cam.setViewOffset(w, h, (L === 'ar' ? 1 : -1) * w * 0.21, 0, w, h); cam.updateProjectionMatrix(); return; }
  // phones: fit the head + mask into the free band between the scene text and the progress card
  let top = 0; document.querySelectorAll('.beat').forEach(b => { top = Math.max(top, b.offsetTop + b.offsetHeight); });
  const card = document.getElementById('scard'), bot = card && card.offsetHeight ? card.offsetTop : h * 0.82;
  const free = Math.max(160, bot - top - 12), cy = top + 6 + free / 2;
  const t2 = Math.tan(THREE_DEG * cam.fov / 2), span = 4.15, wspan = 5.1;
  const D = Math.max(span * h / free, wspan / (w / h)) / (2 * t2);
  cam.clearViewOffset(); cam.position.set(0, 0.1, D); cam.lookAt(0, -0.05, 0);
  cam.setViewOffset(w, h, 0, h / 2 - cy, w, h); cam.updateProjectionMatrix();
}
const THREE_DEG = Math.PI / 180;


const frameOpts = () => ({ fit: mobile ? 1.0 : 0.8, wfit: mobile ? 0.6 : 0.9, lookY: mobile ? 0.25 : -0.05 });
const sOpts = { lite, maxDpr: lite ? 1.25 : 2, cheapMat: mobile, noShadow: mobile, shadowSize: 2048, fit: mobile ? 1.0 : 0.8, wfit: mobile ? 0.6 : 0.9, lookY: mobile ? 0.25 : -0.05 };
loadBust(lite ? 'assets/bust_lite.js?v=6af64a94' : 'assets/bust_full.js?v=6af64a94').then(b => createMaskScene(canvas, { ...sOpts, bust: b }))
  .then(s => { S = s; frameCam(); dirty = true; stage.classList.add('ready'); if (reduce) frame(0); })
  .catch(e => { console.warn(e); stage.classList.add('nogl'); });

new IntersectionObserver(es => { visible = es[0].isIntersecting; }, { threshold: 0 }).observe(story);
function readScroll() { const r = story.getBoundingClientRect(); target = reduce ? 1 : clamp(-r.top / Math.max(1, r.height - innerHeight)); }
function frame(now) {
  if (!reduce) requestAnimationFrame(frame);
  if (!visible && !dirty) return;
  // scroll only chooses which scene is on; each scene then plays at a fixed, eased pace (fast flicks can't rush or skip it)
  const dtS = Math.min(0.05, ((now || 0) - (lastT || now || 0)) / 1000); lastT = now || 0;
  const sc = reduce ? 4 : target < 0.07 ? 0 : target < 0.24 ? 1 : target < 0.41 ? 2 : target < 0.58 ? 3 : 4, goal = ANCH[sc];
  // critically damped spring with a gentle speed limit: eases in, eases out, and re-targets without jolts,
  // so even a very fast flick plays through the scenes at the same calm pace
  { const W = 2.6, VMAX = 0.16, acc = W * W * (goal - cur) - 2 * W * vel; vel += acc * dtS; vel = Math.max(-VMAX, Math.min(VMAX, vel)); cur += vel * dtS;
    if (Math.abs(goal - cur) < 2e-4 && Math.abs(vel) < 2e-3) { cur = goal; vel = 0; } }
  if (sc === 4 && cur >= 0.72 && actT0 < 0) actT0 = now; if (sc !== 4) actT0 = -1;
  const p = cur, beat = p < 0.08 ? 0 : p < 0.28 ? 1 : p < 0.48 ? 2 : p < 0.68 ? 3 : 4;
  stage.classList.toggle('late', p > 0.3);
  if (beat !== lastBeat) { beats.forEach((b, i) => b.classList.toggle('on', i === beat)); bars.forEach((b, i) => b.classList.toggle('on', i <= beat)); hint.style.opacity = beat ? 0 : 1; lastBeat = beat; }
  if (!S) return;
  const st = S.state, t = (now || 0) / 1000, yb = mobile ? -0.42 : -0.55;
  const prevSig = sig;
  let yaw = yb + 0.2 * sm((p - 0.28) / 0.06) + (0 - (yb + 0.2)) * sm((p - 0.48) / 0.05) + 0.55 * sm((p - 0.66) / 0.06);
  if (!reduce && !lite && !mobile) yaw += 0.035 * Math.sin(t * 0.5);
  // slow showroom turn while the intro is on screen
  if (!reduce && p < 0.06) yaw += 0.35 * Math.sin((lite ? Math.floor(t * 24) / 24 : t) * 0.35) * (1 - p / 0.06);
  if (!dragP) { uYaw += vYaw; vYaw *= 0.92; if (Math.abs(vYaw) < 1e-4) vYaw = 0; uYaw *= 0.985; uPitch *= 0.95; }
  yaw += uYaw;
  const ex = sm((p - 0.30) / 0.07) * (1 - sm((p - 0.43) / 0.05)), side = sm((p - 0.53) / 0.11);
  const act = p >= 0.72 ? (actT0 < 0 ? 0 : Math.floor(((now || 0) - actT0) / ACT_MS) % 6) : -1;
  st.pitch = uPitch;
  Object.assign(st, { progress: reduce ? 1 : clamp((p - 0.02) / 0.2), yaw, explode: ex, side: reduce ? 0 : side, active: act, time: t });
  sig = [st.progress, yaw, ex, side, act, uPitch].map(v => (+v).toFixed(4)).join();
  const pulse = act >= 0 && (now - lastPulse) > (lite ? 70 : mobile ? 33 : 16);
  if (sig === prevSig && !dirty && !pulse) return;
  if (lite && !dirty && now - lastR < 33) return;
  // adaptive resolution: if frames get slow, render fewer pixels (and recover when there is room)
  if (lastR && now - lastR < 120) { const dt = now - lastR; ftAvg = ftAvg * 0.9 + dt * 0.1; fN++;
    if (fN > 45 && ftAvg > (lite ? 45 : 26) && dpr > dprMin) { dpr = Math.max(dprMin, +(dpr - 0.1).toFixed(2)); S.setDpr(dpr); fN = 0; frameCam(); }
    else if (fN > 180 && ftAvg < (lite ? 36 : 18) && dpr < dprMax) { dpr = Math.min(dprMax, +(dpr + 0.1).toFixed(2)); S.setDpr(dpr); fN = 0; frameCam(); } }
  lastR = now;
  if (pulse) lastPulse = now;
  S.render(); dirty = false;
  tagEls.forEach(e => { const on = ex > 0.75; e.classList.toggle('on', on); if (on) { const q = S.anchorScreen(e.dataset.t); e.style.transform = `translate3d(${q.x}px,${q.y + cTop}px,0)`; e.classList.toggle('flip', ['band', 'dock', 'electrode'].includes(e.dataset.t)); } });
  $('#spBar b').style.insetInlineStart = (side * 106) + 'px'; $('#spR').classList.toggle('on', side < 0.5); $('#spL').classList.toggle('on', side >= 0.5);
  if (act >= 0) { const q = S.screenOf(act); callout.style.transform = `translate3d(${q.x}px,${q.y + cTop}px,0)`; const lb = callout.querySelector('.lbl'); if (lb.dataset.w == null || lb.dataset.t !== lb.textContent) { lb.dataset.w = lb.offsetWidth; lb.dataset.t = lb.textContent; } const lw = +lb.dataset.w, W = sW; let lx = q.x + 22; if (lx + lw > W - 8) lx = q.x - 22 - lw; lx = Math.max(8, Math.min(W - lw - 8, lx)); lb.style.left = (lx - q.x) + 'px'; lb.style.right = 'auto'; }
  // phone progress card: scene number, live fill, line of text that changes with the scene / active muscle
  { const segs = [0, ANCH[1], ANCH[2], ANCH[3], ANCH[4]]; let w;
    if (beat < 4) w = clamp((p - segs[beat]) / Math.max(1e-3, (segs[beat + 1] || 0.73) - segs[beat])); else w = act >= 0 ? (act + 1) / 6 : 0;
    const f = (beat + w) / 5; if (Math.abs(f - lastFill) > 0.002) { scFill.style.transform = `scaleX(${f.toFixed(3)})`; lastFill = f; }
    const key = beat + ':' + act + ':' + L; if (key !== lastSc) { lastSc = key; scN.textContent = '0' + (beat + 1); scT.textContent = T[L]['b' + beat + 'e'];
      scS.textContent = beat === 4 && act >= 0 ? T[L].scNow + SITES[act] + ' · ' + (act + 1) + '/6' : T[L].sc[beat]; scard.classList.remove('flip'); void scard.offsetWidth; scard.classList.add('flip'); } }
  if (act !== lastAct) { callout.classList.toggle('on', act >= 0); if (act >= 0) { $('#cn').textContent = (act + 1) + '/6'; $('#ct').textContent = SITES[act]; } lastAct = act; }
}
addEventListener('scroll', readScroll, { passive: true });
// layout follows the live width (e.g. a window resized after load), not just the width at load time
MQ.addEventListener('change', () => { mobile = MQ.matches; document.documentElement.classList.toggle('lite', lite || mobile); if (S) { Object.assign(S.opts, frameOpts()); S.resize(); frameCam(); dirty = true; } tagText(); measure(); });
let rW = innerWidth, rH = innerHeight;
addEventListener('resize', () => { const big = innerWidth !== rW || Math.abs(innerHeight - rH) > 140; readScroll(); if (!big) return; rW = innerWidth; rH = innerHeight; measure(); if (S) { S.resize(); frameCam(); dirty = true; } drawTl(); });
measure(); readScroll(); requestAnimationFrame(frame);

// ---- sequencer: block vs circuit (schematic) ----
const K = 4; let mode = 'block', ev = [], ptr = 0;
function events() { ev = []; if (mode === 'block') { for (let c = 0; c < 6; c++) for (let k = 0; k < K; k++) ev.push([c, k]); } else { for (let k = 0; k < K; k++) for (let c = 0; c < 6; c++) ev.push([c, k]); } }
function buildSeq() {
  events(); ptr = 0;
  $('#seq').innerHTML = SITES.map((n, i) => `<div class="ch" style="--c:${CHC[i]}"><b class="num">CH ${i + 1}</b><span class="ltr">${n}</span><i></i><em class="num"></em></div>`).join('');
  $('#modeDesc').textContent = T[L][mode === 'block' ? 'mBlockD' : 'mCircD'];
  $('#mBlock').setAttribute('aria-pressed', mode === 'block'); $('#mCirc').setAttribute('aria-pressed', mode !== 'block');
  drawTl();
}
function drawTl() {
  const tl = $('#tl'), VW = Math.max(300, Math.round(tl.clientWidth || 1000)); tl.setAttribute('viewBox', `0 0 ${VW} 110`);
  const n = ev.length, w = VW / n, rtl = L === 'ar'; let s = '';
  const groups = mode === 'block' ? 6 : K, gw = VW / groups;
  for (let g = 0; g < groups; g++) s += `<rect class="band${mode === 'block' ? '' : (g % 2 ? ' odd' : ' none')}" style="--c:${mode === 'block' ? CHC[g] : '#2A8A94'}" x="${rtl ? VW - (g + 1) * gw : g * gw}" y="14" width="${gw}" height="62" rx="8"/>`;
  s += `<line x1="0" y1="66" x2="${VW}" y2="66"/>`;
  ev.forEach(([c], i) => {
    const x = rtl ? VW - (i + 1) * w : i * w, y0 = 66, h = i === ptr ? 40 : 30, r = w * 0.18, hold = w * 0.26, cls = i === ptr ? 'c now' : i < ptr ? 'c done' : 'c next';
    s += `<polygon class="${cls}" style="--c:${CHC[c]}" points="${x + 3},${y0} ${x + 3 + r},${y0 - h} ${x + 3 + r + hold},${y0 - h} ${x + 3 + 2 * r + hold},${y0}"/>`;
  });
  const X = v => rtl ? VW - v : v;
  if (mode === 'block') for (let c = 0; c < 6; c++) s += `<text x="${X((c * K + K / 2) * w)}" y="96" text-anchor="middle">CH ${c + 1}</text>`;
  else for (let k = 0; k < K; k++) s += `<text x="${X((k * 6 + 3) * w)}" y="96" text-anchor="middle">${T[L].round} ${k + 1}</text>`;
  $('#tl').innerHTML = s;
  const [cc] = ev[ptr], cnt = Array(6).fill(0); ev.slice(0, ptr + 1).forEach(([c]) => cnt[c]++);
  $$('#seq .ch').forEach((el, i) => { el.classList.toggle('on', i === cc); el.querySelector('i').style.setProperty('--w', (cnt[i] / K * 100) + '%'); el.querySelector('em').textContent = `${cnt[i]}/${K}`; });
}
$('#mBlock').onclick = () => { mode = 'block'; buildSeq(); }; $('#mCirc').onclick = () => { mode = 'circuit'; buildSeq(); };
buildSeq();
if (!reduce) setInterval(() => { ptr = (ptr + 1) % ev.length; drawTl(); }, 900);

// ---- draggable turntables (pre-rendered 36-frame sprite sheets) ----
$$('.turn').forEach(el => {
  const N = 36; let f = 0, drag = null, vis = false, last = 0, hover = false;
  const show = () => { const i = ((Math.round(f) % N) + N) % N; el.style.backgroundPosition = `${(i % 6) * 20}% ${Math.floor(i / 6) * 20}%`; };
  const img = new Image(); img.onload = () => { el.style.backgroundImage = `url(${el.dataset.sheet})`; el.classList.add('ok'); show(); };
  new IntersectionObserver(es => { vis = es[0].isIntersecting; if (vis && !img.src) img.src = el.dataset.sheet; }, { rootMargin: '200px' }).observe(el);
  el.addEventListener('pointerdown', e => { drag = { x: e.clientX, f }; el.setPointerCapture(e.pointerId); el.classList.add('grab'); });
  el.addEventListener('pointermove', e => { if (!drag) return; f = drag.f - (e.clientX - drag.x) / 9 * (L === 'ar' ? -1 : 1); show(); });
  const up = () => { drag = null; el.classList.remove('grab'); };
  el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  el.addEventListener('pointerenter', () => hover = true); el.addEventListener('pointerleave', () => hover = false);
  (function tick(t) { requestAnimationFrame(tick); if (!vis || drag || hover || reduce || t - last < (lite ? 110 : 70)) return; last = t; f += 1; show(); })(0);
});

// ---- ticker ----
const tk = SITES.map(n => `<span>${n}</span>`).join(''); $('#tick').innerHTML = tk + tk;
// link tiles. Mouse: click opens. Touch: a tap only shows "press and hold"; holding fills a ring, then opens.
const HOLD_MS = 700;
document.querySelectorAll('.cta').forEach(a => {
  a.insertAdjacentHTML('beforeend', '<span class="holdtip" aria-hidden="true"></span>');
  let holdT = 0, gone = false, touch = false, sx = 0, sy = 0;
  const tip = a.querySelector('.holdtip');
  const go = () => { if (gone) return; gone = true; clearTimeout(holdT); a.classList.remove('hold'); a.classList.add('go-out', 'press'); document.body.classList.add('leaving'); setTimeout(() => { location.href = a.href; }, 420); };
  const cancel = () => { clearTimeout(holdT); a.classList.remove('hold'); if (!gone) setTimeout(() => a.classList.remove('press'), 200); };
  a.addEventListener('contextmenu', e => e.preventDefault());
  a.addEventListener('pointerdown', e => {
    touch = e.pointerType !== 'mouse'; a.classList.add('press'); if (!touch) return;
    sx = e.clientX; sy = e.clientY; tip.textContent = T[L].holdGo; a.classList.add('hold', 'tipon'); holdT = setTimeout(go, HOLD_MS);
  });
  a.addEventListener('pointermove', e => { if (touch && Math.hypot(e.clientX - sx, e.clientY - sy) > 12) cancel(); });
  a.addEventListener('pointerup', cancel); a.addEventListener('pointercancel', cancel); a.addEventListener('pointerleave', cancel);
  a.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (touch) { if (!gone) { tip.textContent = T[L].holdTip; a.classList.add('tipon', 'nudge'); setTimeout(() => a.classList.remove('nudge'), 500); clearTimeout(a._tt); a._tt = setTimeout(() => a.classList.remove('tipon'), 2200); } return; }
    go();
  });
  addEventListener('pageshow', ev => { if (ev.persisted) { gone = false; a.classList.remove('go-out', 'press', 'hold', 'tipon'); document.body.classList.remove('leaving'); } });
});
initSite({
  page: 'home', T,
  onLang: (l, t) => {
    L = l; frameCam(); tagText(); buildSeq(); dirty = true; lastAct = -2; if (reduce) frame(0);
    // in Arabic the flow reads right-to-left: stimulator on the right
    const sw = l === 'ar' ? { n1: 'n3', n3: 'n1', n1s: 'n3s', n3s: 'n1s' } : {};
    $$('svg.flow [data-i]').forEach(e => { const k = sw[e.dataset.i] || e.dataset.i; e.textContent = t[k]; });
  },
});
window.__done = true;

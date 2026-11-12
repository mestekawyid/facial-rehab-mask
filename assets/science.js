import { initSite, cite, $, $$ } from './site.js?v=6af64f8b';
import { hbar, donut, ranges, forest, gantt, vbars, svg, logx } from './charts.js?v=6af64f8b';

const T = {
 en: {
  hE: 'Science', hT: 'The science behind the mask.', hL: 'Seven short chapters, from the condition itself to how a session would run safely. Every chart is drawn from data cited in the project report.',
  c1: 'The condition', c2: 'Nerve and muscle', c3: 'Two modes', c4: 'Testing the nerve', c5: 'What the evidence says', c6: 'A session', c7: 'Safety',
  c1T: 'Bell’s palsy is the most common cause.', c1P: 'Idiopathic facial palsy (Bell’s palsy) accounts for 60–75% of cases in the general population [[Heckmann2019]]. Most people recover — but not all.',
  aetT: 'What causes facial palsy', aetS: '1,989 patients referred to a facial-nerve centre, 2003–2013 (share of referrals)', aetSrc: 'Data: Hohman & Hadlock (2014) [[Hohman2014]]. A referral centre, so not representative of the general population.',
  aet: ['Bell’s palsy', 'Other causes', 'Acoustic neuroma resection', 'Cancer', 'Iatrogenic injury', 'Varicella zoster', 'Benign lesions', 'Congenital', 'Lyme disease'],
  recT: 'How Bell’s palsy recovers', recS: 'Most improve in 2–3 weeks and recover fully by 3–4 months', rk1: 'do not recover fully', rk0: 'recover fully', recSmall: 'incomplete', recSrc: 'Pauna et al. (2024) [[Pauna2024]].',
  c2T: 'A nerve and a muscle answer different pulses.', c2P: 'An intact nerve fires with very short pulses. When the nerve is lost, the muscle fibres themselves must be excited — and they need far longer pulses [[Kurz2022]]. Drag the slider to see why the mask needs two modes.',
  sdT: 'Strength–duration curves', sdS: 'Current needed for a minimal twitch, at each pulse duration (schematic, log scales)',
  sdLab: 'Pulse duration', sdIn: 'Innervated muscle', sdDe: 'Denervated muscle',
  sdA: 'Short pulse: the intact nerve fires at a low current, while denervated muscle needs far more. This is mode A territory (0.4–1 ms).',
  sdMid: 'In between: still too short for selective responses in denervated facial muscle.',
  sdB: 'Long pulse: denervated muscle can now be excited selectively — mode B (usually ≥ 25 ms, about 50–200 ms at the start).',
  sdX: 'Very long pulse: avoid 250 ms or more.',
  sdSrc: 'Schematic, not to scale; after Kurz et al. (2022) and Geitner et al. (2026) [[Kurz2022,Geitner2026]].', axPD: 'Pulse duration (ms, log scale)', axTh: 'Threshold (log)',
  zA: 'mode A', zB: 'mode B start',
  pdT: 'Pulse durations used in published work', pdS: 'Dots: single values. Bars: ranges.', pdSrc: 'Efthimiou 2024; Ilves 2019; Frigerio 2015; Tuncay 2015; Di Pietro 2023; Puls 2020; Arnold 2023; Geitner 2026 [[Efthimiou2024,Ilves2019,Frigerio2015,Tuncay2015,DiPietro2023,Puls2020,Arnold2023,Geitner2026]].',
  zSs: 'All below 1 ms', zLs: 'From 25 ms up to 1 s',
  pd: ['fNMES studies, most used range', 'Facial muscles, healthy volunteers', 'Blink in acute palsy (mean)', 'Bell’s palsy RCT', 'Bell’s palsy, selective EMS', 'Denervated, home FES', 'Reinnervated zygomaticus', 'Complete paralysis, home FES'],
  zS: 'short pulses: intact nerve', zL: 'long pulses: denervated fibres',
  c3T: 'Two modes, chosen muscle by muscle.', c3P: 'The supervising clinician picks the mode for each muscle from the clinical assessment and, when indicated, nerve testing. The muscle’s response only supports that decision.',
  mAk: 'Mode A', mAt: 'Innervated muscle', mAw: 'The nerve still conducts.',
  mBk: 'Mode B', mBt: 'Partial or complete denervation', mBw: 'The muscle must be excited directly.',
  kPulse: 'Pulse', kFreq: 'Rate', kDose: 'Dose per muscle', kInt: 'Intensity',
  mA1: 'Biphasic rectangular, 0.4–1 ms (start at 0.4 ms) [[Frigerio2015,Ilves2019,Anthony2021]]', mA2: '20–30 Hz by default, lowest that gives a smooth contraction [[Cameron2023a]]', mA3: '1 set of 10 contractions: 10 s on with 2 s ramps, 50 s off [[Cameron2023a,Anthony2021]]', mA4: 'Lowest giving a clear, comfortable contraction of the target muscle only',
  mB1: 'Triangular; treatment usually ≥ 25 ms, about 50–200 ms at the start; avoid ≥ 250 ms [[Kurz2022]]', mB2: 'About 1–5 pulses per second, set by phase + pause [[Geitner2026]]', mB3: '3 × 30 twitches [[Tuncay2015]]; complete denervation: 20 min twice a day, ≥ 6 h apart [[Geitner2026]]', mB4: 'Lowest giving a selective response without discomfort or spread',
  mNote: 'Starting ranges only, set and adjusted by the supervising clinician. Complete denervation is treated under specialist supervision. No universally accepted parameters exist for facial palsy [[Pauna2024]].',
  c4T: 'Timing decides which test helps.', c4P: 'Right after onset, the injured nerve segment still conducts, so no test can say how badly it is damaged. Each test has its window.',
  gT: 'When each test is informative', gS: 'Days after onset (scale changes after day 28)', gSrc: 'Guntinas-Lichius et al. (2020); Pauna et al. (2024); Lescallette (2021) [[Guntinas2020,Pauna2024,Lescallette2021]].', gAx: 'Days after onset',
  g: ['Injured segment still conducts', 'No definitive electrodiagnosis', 'ENoG', 'Needle EMG most informative', 'First I/t curve', 'Testing in Bell’s palsy if complete or not improving'],
  c5T: 'Promising, but not settled.', c5P: 'Guidelines agree on steroids and eye care. On electrical stimulation they range from no recommendation to against. Newer data are more encouraging, with important caveats.',
  mT: 'What three guidelines recommend', mS: 'American 2013 · Canadian 2014 · Brazilian 2024', mSrc: 'Baugh 2013; de Almeida 2014; Pauna 2024 [[Baugh2013,deAlmeida2014,Pauna2024]]. The Korean 2026 guideline does not address ES [[Lee2026]]. * strong recommendation based on low-quality evidence.',
  kRec: 'recommended', kNone: 'no recommendation', kAg: 'against / restricted', kNa: 'not addressed',
  mRows: ['Oral corticosteroids', 'Eye protection', 'Physical therapy / exercise', 'Electrical stimulation', 'Electrodiagnostic testing'],
  mCells: [['recommended (strong)', 'recommended (strong)', 'recommended (strong)'], ['when closure impaired', 'when closure incomplete', 'when closure inadequate'], ['no recommendation', 'acute: none · chronic: suggested', 'biofeedback training (strong)'], ['no recommendation', 'suggest against (weak)', 'contraindicated (strong*)'], ['against if incomplete · option if complete', 'not addressed', 'not routine · option if complete or not improving']],
  fT: 'Pooled risk of incomplete recovery', fS: 'Squares: estimate. Lines: 95% CI. Below 1 favours the treatment.', frL: '← favours treatment', frR: 'favours control →',
  f1: ['Corticosteroids vs control', 'incomplete recovery ≥ 6 months', 'Madhok 2016 · 7 RCTs · n = 895'], f2: ['Add-on ES in the acute stage', 'vs usual care: incomplete recovery', 'Choi 2026 · 13 trials · n = 1,191'],
  fSrc: 'Madhok et al. (2016); Choi et al. (2026) [[Madhok2016,Choi2026]]. Different populations and follow-up: shown side by side, not compared.',
  wT: 'Inside the 2026 meta-analysis', wS: 'Its 14 trials, one square each', w1: 'Type of stimulation', w1a: 'electroacupuncture (13)', w1b: 'other electrical stimulation (1)', w2: 'Adverse events reported', w2a: 'reported (2)', w2b: 'not reported (12)', wSrc: 'Choi et al. (2026) [[Choi2026]]. Electroacupuncture results do not transfer directly to surface stimulation.',
  xT: 'Exercise vs acupuncture', xS: 'Facial rehabilitation: change in Sunnybrook score (95% CI)', xM: 'MCID 10 points', xA: 'Acupuncture: quality of 17 systematic reviews', xA1: '14 very low', xA2: '3 low', xSrc: 'Lee et al. (2026); Huang et al. (2025) [[Lee2026,Huang2025]].',
  jT: 'A warning sign on synkinesis', jS: '317 patients with severe Bell’s palsy: non-selective ES vs not exposed', jA: 'Synkinesis score', jAn: 'higher = more synkinesis', jB: 'Botulinum toxin effect (months)', jBn: 'shorter = worse', jE: 'non-selective ES', jN: 'not exposed', jSrc: 'Jung et al. (2026) [[Jung2026]], a retrospective cohort. Another review found no significant extra risk [[Eberly2026]].',
  c6T: 'A supervised session, step by step.', c6P: 'The clinician stays in control from screening to review. The open face lets the therapist watch every response.',
  s1: 'Screen and fit', s1p: 'Check skin and contraindications; adjust the frame; find the motor points.', s2: 'Set the program', s2p: 'Clinician selects muscles, order, phase duration and intensity limits.', s3: 'Stimulate in sequence', s3p: 'One muscle at a time; the patient can try the same movement in a mirror.', s4: 'Record and review', s4p: 'Log settings and responses; re-grade, including synkinesis, at follow-up.',
  sSrc: 'Session protocol from the project report, based on Nussbaum et al. (2017) and Geitner et al. (2026) [[Nussbaum2017,Geitner2026]].',
  c7T: 'Safety is designed in, then verified.', c7P: 'These are design targets still to be verified on the bench, plus the conditions where the mask must not be used.',
  t1: 'RMS current density limit for the electrode area of every programme.', t2u: 'channel', t2: 'Only one electrode is active at a time; the switching box enforces it.', t3u: 'constant current', t3: 'Constant-current output, biphasic where the stimulator provides it.', t4u: 'emergency stop', t4: 'Tested before every session; the reference pad stays on the same-side upper trapezius, away from the front of the neck and chest.',
  noT: 'Do not use', prT: 'Use with precautions',
  no: ['Implanted electronic devices (e.g. pacemaker) [[FDAnd,Efthimiou2024,Watson2021]]', 'Pregnancy (precautionary exclusion) [[Efthimiou2024,Meincke2024]]', 'History of epilepsy [[Efthimiou2024,Watson2021]]', 'Recent facial surgery [[Efthimiou2024]]', 'Malignancy at or near the electrode sites [[Watson2021]]', 'Broken, irritated or sensitive skin at the sites [[Efthimiou2024]]', 'Undiagnosed weakness or new neurological signs — refer instead [[Baugh2013]]'],
  pr: ['Reduced sensation: monitor very closely [[Nussbaum2017]]', 'Near the eye: no electrodes on the eyelid; flashes and a metallic taste can occur with long pulses [[Volk2020,Geitner2026]]', 'Incomplete eye closure: keep eye protection; the mask does not protect the cornea [[Baugh2013,deAlmeida2014]]', 'Synkinesis: grade at every review [[Yoo2023,Jung2026]]', 'Never with cold packs over the electrodes [[Nussbaum2017]]'],
  safeN: 'Precautionary exclusions for the prototype; the final decision rests with the treating physician.',
 },
 ar: {
  hE: 'العلم', hT: 'العلم وراء القناع.', hL: 'سبعة فصول قصيرة، من الحالة نفسها إلى طريقة تشغيل الجلسة بأمان. كل رسم بياني مبني على بيانات مذكورة مصادرها في تقرير المشروع.',
  c1: 'الحالة', c2: 'العصب والعضلة', c3: 'وضعان للتحفيز', c4: 'فحص العصب', c5: 'ماذا تقول الأدلة', c6: 'الجلسة', c7: 'السلامة',
  c1T: 'شلل بِل هو السبب الأكثر شيوعًا.', c1P: 'يمثّل شلل الوجه مجهول السبب (شلل بِل) ما بين 60 و75% من الحالات بين عامة الناس [[Heckmann2019]]. ومعظم المرضى يتعافون، لكن ليس جميعهم.',
  aetT: 'أسباب شلل الوجه', aetS: '1,989 مريضًا حُوّلوا إلى مركز متخصص في العصب الوجهي، 2003–2013 (نسبة من الحالات المحوّلة)', aetSrc: 'البيانات: Hohman & Hadlock (2014) [[Hohman2014]]. مركز تحويل، فلا يمثّل عامة الناس.',
  aet: ['شلل بِل', 'أسباب أخرى', 'استئصال ورم العصب السمعي', 'السرطان', 'إصابة أثناء علاج طبي', 'الحماق النطاقي (Varicella zoster)', 'أورام حميدة', 'خلقي', 'مرض لايم'],
  recT: 'كيف يتعافى مرضى شلل بِل', recS: 'معظمهم يتحسن خلال 2–3 أسابيع ويتعافى تمامًا خلال 3–4 أشهر', rk1: 'لا يتعافون تمامًا', rk0: 'يتعافون تمامًا', recSmall: 'تعافٍ غير كامل', recSrc: 'Pauna et al. (2024) [[Pauna2024]].',
  c2T: 'العصب والعضلة يستجيبان لنبضات مختلفة.', c2P: 'العصب السليم يستجيب لنبضات قصيرة جدًا. وعندما يُفقد العصب، يجب تحفيز ألياف العضلة نفسها، وهي تحتاج نبضات أطول بكثير [[Kurz2022]]. حرّك المؤشر لترى لماذا يحتاج القناع إلى وضعين.',
  sdT: 'منحنيات الشدة والمدة', sdS: 'التيار اللازم لأصغر انقباضة عند كل مدة نبضة (رسم توضيحي، بمقياس لوغاريتمي)',
  sdLab: 'مدة النبضة', sdIn: 'عضلة متصلة بالعصب', sdDe: 'عضلة فاقدة للعصب',
  sdA: 'نبضة قصيرة: العصب السليم يستجيب بتيار منخفض، بينما تحتاج العضلة الفاقدة للعصب تيارًا أعلى بكثير. هذا نطاق الوضع A (0.4–1 ms).',
  sdMid: 'نطاق وسط: ما زال أقصر من أن يعطي استجابة انتقائية في عضلات الوجه الفاقدة للعصب.',
  sdB: 'نبضة طويلة: يمكن الآن تحفيز العضلة الفاقدة للعصب بشكل انتقائي، وهذا هو الوضع B (عادةً 25 ms أو أكثر، ونحو 50–200 ms في البداية).',
  sdX: 'نبضة طويلة جدًا: تجنّب 250 ms أو أكثر.',
  sdSrc: 'رسم توضيحي ليس بمقياس حقيقي، مأخوذ عن Kurz et al. (2022) وGeitner et al. (2026) [[Kurz2022,Geitner2026]].', axPD: 'مدة النبضة (ms، مقياس لوغاريتمي)', axTh: 'العتبة (لوغاريتمي)',
  zA: 'الوضع A', zB: 'بداية الوضع B',
  pdT: 'مدد النبضات المستخدمة في الأبحاث المنشورة', pdS: 'النقاط: قيم مفردة. الأشرطة: نطاقات.', pdSrc: 'Efthimiou 2024; Ilves 2019; Frigerio 2015; Tuncay 2015; Di Pietro 2023; Puls 2020; Arnold 2023; Geitner 2026 [[Efthimiou2024,Ilves2019,Frigerio2015,Tuncay2015,DiPietro2023,Puls2020,Arnold2023,Geitner2026]].',
  zSs: 'كلها أقل من 1 مللي ثانية', zLs: 'من 25 مللي ثانية حتى ثانية كاملة',
  pd: ['دراسات fNMES، النطاق الأكثر استخدامًا', 'عضلات الوجه لدى متطوعين أصحاء', 'إغماض العين في الشلل الحاد (متوسط)', 'تجربة عشوائية في شلل بِل', 'شلل بِل، تحفيز انتقائي', 'عضلة فاقدة للعصب، تحفيز منزلي', 'عضلة Zygomaticus بعد عودة العصب', 'شلل كامل، تحفيز منزلي'],
  zS: 'نبضات قصيرة: العصب السليم', zL: 'نبضات طويلة: الألياف الفاقدة للعصب',
  c3T: 'وضعان، يُختار أحدهما لكل عضلة.', c3P: 'يختار المعالج المشرف الوضع لكل عضلة بناءً على التقييم السريري، وفحص العصب عند الحاجة. واستجابة العضلة تدعم القرار فقط.',
  mAk: 'الوضع A', mAt: 'عضلة متصلة بالعصب', mAw: 'العصب ما زال يوصّل الإشارة.',
  mBk: 'الوضع B', mBt: 'فقدان جزئي أو كامل للعصب', mBw: 'يجب تحفيز العضلة مباشرة.',
  kPulse: 'النبضة', kFreq: 'المعدل', kDose: 'الجرعة لكل عضلة', kInt: 'الشدة',
  mA1: 'مستطيلة ثنائية الطور، 0.4–1 ms (البداية 0.4 ms) [[Frigerio2015,Ilves2019,Anthony2021]]', mA2: '20–30 Hz افتراضيًا، وأقل تردد يعطي انقباضًا سلسًا [[Cameron2023a]]', mA3: 'مجموعة واحدة من 10 انقباضات: 10 ثوانٍ تشغيل بصعود ونزول 2 ثانية، ثم 50 ثانية راحة [[Cameron2023a,Anthony2021]]', mA4: 'أقل شدة تعطي انقباضًا واضحًا ومريحًا للعضلة المستهدفة فقط',
  mB1: 'مثلثية؛ للعلاج عادةً 25 ms أو أكثر، ونحو 50–200 ms في البداية؛ وتجنّب 250 ms أو أكثر [[Kurz2022]]', mB2: 'نحو 1–5 نبضات في الثانية، تتحدد بمدة النبضة والراحة [[Geitner2026]]', mB3: '3 × 30 انقباضة [[Tuncay2015]]؛ وفي الفقد الكامل للعصب: 20 دقيقة مرتين يوميًا بينهما 6 ساعات على الأقل [[Geitner2026]]', mB4: 'أقل شدة تعطي استجابة انتقائية دون انزعاج أو امتداد للعضلات المجاورة',
  mNote: 'هذه نطاقات بداية فقط، يضبطها المعالج المشرف ويعدّلها. والفقد الكامل للعصب يُعالج تحت إشراف متخصص. ولا توجد معاملات متفق عليها عالميًا لشلل الوجه [[Pauna2024]].',
  c4T: 'التوقيت يحدد أي فحص يفيد.', c4P: 'بعد بداية الشلل مباشرة، يظل الجزء المصاب من العصب يوصّل الإشارة، فلا يستطيع أي فحص أن يحدد شدة الإصابة. ولكل فحص نافذته الزمنية.',
  gT: 'متى يكون كل فحص مفيدًا', gS: 'الأيام بعد بداية الشلل (يتغير المقياس بعد اليوم 28)', gSrc: 'Guntinas-Lichius et al. (2020); Pauna et al. (2024); Lescallette (2021) [[Guntinas2020,Pauna2024,Lescallette2021]].', gAx: 'الأيام بعد بداية الشلل',
  g: ['الجزء المصاب ما زال يوصّل', 'لا تشخيص كهربائي نهائي', 'ENoG', 'Needle EMG في أفضل حالاته', 'أول منحنى I/t', 'الفحص في شلل بِل إذا كان كاملًا أو لا يتحسن'],
  c5T: 'مبشّر، لكنه لم يُحسم.', c5P: 'تتفق الأدلة الإرشادية على الكورتيزون وحماية العين. أما التحفيز الكهربائي فتتراوح مواقفها بين عدم التوصية والتوصية بعدم استخدامه. والبيانات الأحدث أكثر تشجيعًا، مع تحفظات مهمة.',
  mT: 'ماذا توصي ثلاثة أدلة إرشادية', mS: 'الأمريكي 2013 · الكندي 2014 · البرازيلي 2024', mSrc: 'Baugh 2013; de Almeida 2014; Pauna 2024 [[Baugh2013,deAlmeida2014,Pauna2024]]. والدليل الكوري 2026 لا يتناول التحفيز الكهربائي [[Lee2026]]. * توصية قوية مبنية على أدلة منخفضة الجودة.',
  kRec: 'موصى به', kNone: 'لا توصية', kAg: 'ضده / مقيّد', kNa: 'لم يتناوله',
  mRows: ['الكورتيزون بالفم', 'حماية العين', 'العلاج الطبيعي / التمارين', 'التحفيز الكهربائي', 'الفحص الكهربائي للعصب'],
  mCells: [['موصى به (قوية)', 'موصى به (قوية)', 'موصى به (قوية)'], ['عند ضعف الإغلاق', 'عند عدم اكتمال الإغلاق', 'عند عدم كفاية الإغلاق'], ['لا توصية', 'الحاد: لا · المزمن: مقترح', 'تدريب بالتغذية الراجعة (قوية)'], ['لا توصية', 'يُقترح عدم استخدامه (ضعيفة)', 'ممنوع (قوية*)'], ['ضده إذا كان الشلل غير كامل · خيار إذا كان كاملًا', 'لم يتناوله', 'ليس روتينيًا · خيار إذا كان كاملًا أو لا يتحسن']],
  fT: 'الخطر المجمّع لعدم التعافي الكامل', fS: 'المربع: التقدير. الخط: فاصل الثقة 95%. الأقل من 1 لصالح العلاج.', frL: '→ لصالح العلاج', frR: 'لصالح المقارنة ←',
  f1: ['الكورتيزون مقابل المقارنة', 'عدم التعافي الكامل بعد 6 أشهر أو أكثر', 'Madhok 2016 · 7 تجارب · 895 مريضًا'], f2: ['تحفيز إضافي في المرحلة الحادة', 'مقابل الرعاية المعتادة: عدم التعافي الكامل', 'Choi 2026 · 13 تجربة · 1,191 مريضًا'],
  fSrc: 'Madhok et al. (2016); Choi et al. (2026) [[Madhok2016,Choi2026]]. مجموعات مرضى ومدد متابعة مختلفة: معروضتان جنبًا إلى جنب، لا للمقارنة.',
  wT: 'من داخل التحليل التجميعي لعام 2026', wS: 'تجاربه الأربع عشرة، كل مربع تجربة', w1: 'نوع التحفيز', w1a: 'وخز بالإبر الكهربائي (13)', w1b: 'تحفيز كهربائي آخر (1)', w2: 'هل ذُكرت الآثار الجانبية', w2a: 'ذُكرت (2)', w2b: 'لم تُذكر (12)', wSrc: 'Choi et al. (2026) [[Choi2026]]. نتائج الوخز بالإبر الكهربائي لا تنطبق مباشرة على التحفيز السطحي.',
  xT: 'التمارين مقابل الوخز بالإبر', xS: 'تأهيل الوجه: التغير في درجة Sunnybrook (فاصل الثقة 95%)', xM: 'MCID ‏10 نقاط', xA: 'الوخز بالإبر: جودة 17 مراجعة منهجية', xA1: '14 منخفضة جدًا', xA2: '3 منخفضة', xSrc: 'Lee et al. (2026); Huang et al. (2025) [[Lee2026,Huang2025]].',
  jT: 'إشارة تحذير بشأن الحركات المصاحبة', jS: '317 مريضًا بشلل بِل الشديد: تحفيز غير انتقائي مقابل عدم التعرض', jA: 'درجة الحركات المصاحبة', jAn: 'الأعلى = حركات مصاحبة أكثر', jB: 'مدة مفعول البوتوكس (أشهر)', jBn: 'الأقصر = أسوأ', jE: 'تحفيز غير انتقائي', jN: 'بدون تعرض', jSrc: 'Jung et al. (2026) [[Jung2026]]، دراسة أترابية بأثر رجعي. ووجدت مراجعة أخرى أنه لا خطر إضافي واضح [[Eberly2026]].',
  c6T: 'جلسة تحت الإشراف، خطوة بخطوة.', c6P: 'يبقى التحكم بيد المعالج من الفحص المبدئي حتى المراجعة، والوجه المكشوف يتيح له مراقبة كل استجابة.',
  s1: 'الفحص والتركيب', s1p: 'فحص الجلد وموانع الاستخدام، وضبط الإطار، وتحديد النقاط الحركية.', s2: 'ضبط البرنامج', s2p: 'يختار المعالج العضلات والترتيب ومدة النبضة وحدود الشدة.', s3: 'التحفيز بالتسلسل', s3p: 'عضلة واحدة في كل مرة، ويمكن للمريض أن يحاول الحركة نفسها أمام المرآة.', s4: 'التسجيل والمراجعة', s4p: 'تسجيل الإعدادات والاستجابات، وإعادة التقييم في المتابعة، بما فيها الحركات المصاحبة.',
  sSrc: 'بروتوكول الجلسة من تقرير المشروع، استنادًا إلى Nussbaum et al. (2017) وGeitner et al. (2026) [[Nussbaum2017,Geitner2026]].',
  c7T: 'السلامة جزء من التصميم، ثم يُتحقق منها.', c7P: 'هذه أهداف تصميم ما زالت تحتاج تحققًا معمليًا، إلى جانب الحالات التي يُمنع فيها استخدام القناع.',
  t1: 'حد كثافة التيار (RMS) لمساحة القطب في كل برنامج.', t2u: 'قناة', t2: 'قطب واحد فقط يعمل في كل مرة، وصندوق التبديل يضمن ذلك.', t3u: 'تيار ثابت', t3: 'خرج بتيار ثابت، ثنائي الطور حين يوفّره جهاز التحفيز.', t4u: 'إيقاف طوارئ', t4: 'يُختبر قبل كل جلسة، والقطب المرجعي على أعلى العضلة شبه المنحرفة في نفس الجانب، بعيدًا عن مقدمة الرقبة والصدر.',
  noT: 'لا يُستخدم', prT: 'يُستخدم مع الاحتياط',
  no: ['أجهزة إلكترونية مزروعة (مثل منظم ضربات القلب) [[FDAnd,Efthimiou2024,Watson2021]]', 'الحمل (استبعاد احتياطي) [[Efthimiou2024,Meincke2024]]', 'تاريخ مرضي للصرع [[Efthimiou2024,Watson2021]]', 'جراحة حديثة في الوجه [[Efthimiou2024]]', 'ورم خبيث عند مواضع الأقطاب أو قربها [[Watson2021]]', 'جلد مجروح أو متهيج أو حساس عند المواضع [[Efthimiou2024]]', 'ضعف غير مشخّص أو علامات عصبية جديدة: يُحوَّل المريض بدلًا من ذلك [[Baugh2013]]'],
  pr: ['ضعف الإحساس: مراقبة دقيقة جدًا [[Nussbaum2017]]', 'قرب العين: لا أقطاب على الجفن، وقد تظهر ومضات ضوئية وطعم معدني مع النبضات الطويلة [[Volk2020,Geitner2026]]', 'عدم اكتمال إغلاق العين: الاستمرار في حماية العين، فالقناع لا يحمي القرنية [[Baugh2013,deAlmeida2014]]', 'الحركات المصاحبة: تقييمها في كل مراجعة [[Yoo2023,Jung2026]]', 'ممنوع استخدام كمادات باردة فوق الأقطاب [[Nussbaum2017]]'],
  safeN: 'استبعادات احتياطية للنموذج الأولي، والقرار النهائي للطبيب المعالج.',
 },
};

// ---------- added depth: reading the curve, parameter sheet, cycle / train / frequency charts ----------
Object.assign(T.en, {
  rcE: 'Reading the curve', rcT: 'Two numbers describe it.', rcP: 'The strength–duration curve is summarised by two values. The facial values differ from the limb values, so the healthy side is the safer comparison.',
  g1t: 'Rheobase', g1d: 'The lowest current that gives a twitch with a long pulse (≥ 300 ms) [[Lescallette2021]].',
  g2t: 'Chronaxie', g2d: 'The pulse duration that gives a twitch at twice the rheobase [[Lescallette2021]].',
  g3t: 'Healthy face', g3d: 'Over the nerve trunk: chronaxie 1.2 ms on average, rheobase 1.5–4 mA (mean 3.2 mA) [[Podvinec1977]].',
  g4t: 'Why compare sides', g4d: 'The limb rule “chronaxie above 1 ms = denervation” cannot simply be applied to the face [[Pieber2015,Podvinec1977]]; a recovered curve returns to the shape of the healthy side [[Lescallette2021]].',
  cxT: 'Chronaxie in published series', cxS: 'Milliseconds, log scale. Dots: means. Bar: reported range.', cxSrc: 'Podvinec (1977); Robinson (2008); Pieber et al. (2015) [[Podvinec1977,Robinson2008a,Pieber2015]].',
  cx: ['Healthy face (over nerve trunk)', 'Normal muscle (textbook range)', 'Denervated limb muscles (mean)', 'Denervated limb muscles (highest)'],
  thT: 'Twitch threshold', thS: 'Mean current for a minimal twitch with single pulses (mA)', thSrc: 'Raslan et al. (2020) [[Raslan2020]].', th: ['Healthy faces', 'Affected side, postparetic synkinesis'],
  psE: 'Parameter sheet', psT: 'Every setting, and why.', psP: 'Starting values from the project report. The clinician sets and adjusts each one; values marked “our inference” are not taken directly from a study.',
  psBA: 'Mode A', psBB: 'Mode B', psC1: 'Setting', psC2: 'Starting value', psC3: 'Why',
  psHA: 'Innervated muscle — the nerve still conducts', psHB: 'Partial or complete denervation',
  psWA: 'Short biphasic pulses fire the nerve.', psWB: 'Long triangular pulses reach the muscle fibres directly.',
  psF: 'Starting points only. Complete denervation is treated under specialist supervision.',
  pA: [
    ['Waveform', 'Biphasic rectangular, charge-balanced', 'No net charge is safer; in the face, pulse shape made no difference [[Cameron2023b,Selkowitz2021,Bowman1985,Rabello2021,Makela2020]]'],
    ['Pulse width', '0.4–1 ms, start at 0.4 ms; down to about 0.2 ms if unpleasant (our inference)', 'Used in facial palsy and blink studies; force rises up to about 1 ms; overlaps the normal chronaxie of 0.15–0.8 ms [[Frigerio2015,Ilves2019,Marotta2020,Robinson2008a]]'],
    ['Frequency', '20–30 Hz (35 at most); avoid below 20 Hz', 'Smooth contraction above 20 Hz; less fatigue at the lower end [[Efthimiou2024,Barss2018,Nussbaum2017,Loyo2020,Cameron2023a]]'],
    ['Intensity', 'Lowest clear contraction of the target muscle only', 'Higher current spreads to other muscles and is linked to synkinesis [[Efthimiou2024,Ilves2019,Raslan2020,Maffiuletti2018,Geitner2026,Pauna2024,Jung2026]]'],
    ['On / off', '10 s on with 2 s ramps; 50 s off (1:5), then 40 s (1:4) or 30 s (1:3)', 'Textbook duty cycles; facial protocol uses 10 s on [[Anthony2021,Cameron2023a,Nussbaum2017,Loyo2020,Taylor2018a,Taylor2018b,Gkesou2023]]'],
    ['Dose', '1 set of 10 contractions, up to 15; one muscle at a time; about 11 min per muscle (our calculation)', 'Textbooks: 10–20 per session; trials: 3 × 30 or 5 strong [[Anthony2021,Cameron2023a,Loyo2020,Tuncay2015,Ray2025]]'],
    ['Electrode', 'Active about 3 cm²; reference on the same-side trapezius; RMS current density ≤ 2 mA/cm²', 'Small electrodes are selective but concentrate the current [[Efthimiou2024,Tuncay2015,Celik2024,Anthony2021,Puls2020,Nussbaum2017]]'],
  ],
  pB: [
    ['Waveform', 'Triangular; biphasic if available, otherwise monophasic with skin checks', 'Less pain and less spread; long biphasic pulses preferred over direct current [[Kurz2022,Efthimiou2024,Tuncay2015,Celik2024,Puls2020,Geitner2026,Volk2020]]'],
    ['Phase duration', '≥ 25 ms; start at 50–200 ms; avoid ≥ 250 ms; shortest selective, comfortable phase', 'Selective only from 25 ms; in one series it fell from 155 to 51 ms over 20 weeks [[Kurz2022,Arnold2021,Geitner2026,Tuncay2015,DiPietro2023,Puls2020]]'],
    ['Pause', '5 × the phase at the start, then 3 × as the twitch strengthens; never shorter than the phase', 'Published pauses ranged from about 1× to 10× the phase; the 5× rule is our inference [[Kurz2022,Tuncay2015,Puls2020,Geitner2026]]'],
    ['Frequency', 'About 1–5 pulses per second, set by phase + pause', 'Example: 100 ms + 500 ms ≈ 1.7 per second (our calculation) [[Tuncay2015,Geitner2026,DiPietro2023]]'],
    ['Intensity', 'Lowest selective response without pain or spread', 'Studies used currents up to 6–27 mA; check the RMS density for each programme [[Puls2020,Geitner2026,Kurz2022,Efthimiou2024]]'],
    ['Dose', '3 × 30 twitches; rest about 5 × the set duration (about 1–1.5 min)', 'From Bell’s palsy trials; the rest rule is our inference [[Tuncay2015,Ray2025,Celik2024,DiPietro2023,Kurz2022]]'],
    ['Complete denervation', 'Jena home protocol: 20 min twice a day — specialist only', 'The only tested home protocol (10 patients); risk of synkinesis [[Geitner2026,Pauna2024,Jung2026]]'],
  ],
  duT: 'One contraction in Mode A', duS: 'Current envelope over one cycle. Choose the rest ratio.', duSrc: 'Cycle from the parameter sheet [[Anthony2021,Cameron2023a,Loyo2020]]; times are our calculation.',
  uS: 's', uMin: 'min', duRamp: 'ramp', duOn: '10 s on', duOff: 'off', duCyc: 'One cycle', duMus: '10 contractions, one muscle', duAll: 'All 6 muscles',
  trT: 'Mode B pulse train', trS: 'Triangular pulses with a pause after each. Move the phase; choose the pause.', trPh: 'Phase', trSrc: 'Rules from the parameter sheet [[Kurz2022,Tuncay2015,Geitner2026]]; rates and times are our calculation.',
  trRate: 'Pulses per second', trSet: 'One set of 30', trRest: 'Rest after the set', trWarn: 'Below 25 ms: not selective', trWarn2: 'Avoid 250 ms and above',
  fqT: 'Frequency in each mode', fqS: 'Pulses per second, log scale', fqSrc: 'Parameter sheet [[Cameron2023a,Nussbaum2017,Barss2018,Tuncay2015,Geitner2026]].',
  fqA: 'Mode A: 20–30 Hz', fqAm: 'max 35', fqB: 'Mode B: about 1–5 per second', fqX: 'Mode A below 20 Hz: contraction not smooth',
});
Object.assign(T.ar, {
  rcE: 'قراءة المنحنى', rcT: 'رقمان يلخصانه.', rcP: 'يُلخَّص منحنى الشدة والمدة بقيمتين. وقيم الوجه تختلف عن قيم الأطراف، لذلك المقارنة بالجانب السليم هي الأأمن.',
  g1t: 'الريوبيز (Rheobase)', g1d: 'أقل تيار يعطي انقباضة بنبضة طويلة (300 ms أو أكثر) [[Lescallette2021]].',
  g2t: 'الكروناكسي (Chronaxie)', g2d: 'مدة النبضة التي تعطي انقباضة عند ضعف الريوبيز [[Lescallette2021]].',
  g3t: 'الوجه السليم', g3d: 'فوق جذع العصب: الكروناكسي 1.2 ms في المتوسط، والريوبيز 1.5–4 mA (المتوسط 3.2 mA) [[Podvinec1977]].',
  g4t: 'ليه نقارن بالجانب السليم', g4d: 'قاعدة الأطراف «كروناكسي أكثر من 1 ms = فقد العصب» لا تنطبق ببساطة على الوجه [[Pieber2015,Podvinec1977]]؛ والمنحنى بعد التعافي يرجع لشكل الجانب السليم [[Lescallette2021]].',
  cxT: 'الكروناكسي في الدراسات المنشورة', cxS: 'بالمللي ثانية، مقياس لوغاريتمي. النقاط: متوسطات. الشريط: النطاق المذكور.', cxSrc: 'Podvinec (1977)؛ Robinson (2008)؛ Pieber et al. (2015) [[Podvinec1977,Robinson2008a,Pieber2015]].',
  cx: ['الوجه السليم (فوق جذع العصب)', 'عضلة طبيعية (نطاق مرجعي)', 'عضلات أطراف فاقدة للعصب (المتوسط)', 'عضلات أطراف فاقدة للعصب (الأعلى)'],
  thT: 'عتبة الانقباضة', thS: 'متوسط التيار لأصغر انقباضة بنبضات مفردة (mA)', thSrc: 'Raslan et al. (2020) [[Raslan2020]].', th: ['وجوه سليمة', 'الجانب المصاب، تزامن حركي بعد الشلل'],
  psE: 'جدول المعاملات', psT: 'كل إعداد، وسببه.', psP: 'قيم بداية من تقرير المشروع. المعالج يضبط كل قيمة ويعدّلها؛ والقيم المكتوب جنبها «استنتاجنا» مش مأخوذة مباشرةً من دراسة.',
  psBA: 'الوضع A', psBB: 'الوضع B', psC1: 'الإعداد', psC2: 'قيمة البداية', psC3: 'السبب',
  psHA: 'عضلة سليمة التعصيب — العصب لا يزال يوصل', psHB: 'فقد جزئي أو كامل للعصب',
  psWA: 'نبضات قصيرة ثنائية الطور تُثير العصب.', psWB: 'نبضات مثلثية طويلة تصل لألياف العضلة مباشرة.',
  psF: 'نقاط بداية فقط. والفقد الكامل للعصب يُعالج تحت إشراف متخصص.',
  pA: [
    ['شكل الموجة', 'مستطيلة ثنائية الطور، متوازنة الشحنة', 'عدم وجود شحنة صافية أأمن؛ وفي الوجه لم يفرق شكل النبضة [[Cameron2023b,Selkowitz2021,Bowman1985,Rabello2021,Makela2020]]'],
    ['عرض النبضة', '0.4–1 ms، البداية 0.4 ms؛ ونزولًا لنحو 0.2 ms لو مزعجة (استنتاجنا)', 'مستخدمة في دراسات شلل الوجه والرمش؛ القوة تزيد حتى نحو 1 ms؛ وتتداخل مع الكروناكسي الطبيعي 0.15–0.8 ms [[Frigerio2015,Ilves2019,Marotta2020,Robinson2008a]]'],
    ['التردد', '20–30 Hz (35 كحد أقصى)؛ وتجنّب أقل من 20 Hz', 'انقباض سلس فوق 20 Hz؛ وإجهاد أقل عند الطرف الأدنى [[Efthimiou2024,Barss2018,Nussbaum2017,Loyo2020,Cameron2023a]]'],
    ['الشدة', 'أقل انقباضة واضحة للعضلة المستهدفة فقط', 'التيار الأعلى ينتشر لعضلات أخرى ومرتبط بالتزامن الحركي [[Efthimiou2024,Ilves2019,Raslan2020,Maffiuletti2018,Geitner2026,Pauna2024,Jung2026]]'],
    ['التشغيل / الراحة', '10 ث تشغيل مع صعود ونزول 2 ث؛ 50 ث راحة (1:5)، ثم 40 ث (1:4) أو 30 ث (1:3)', 'دورات تشغيل مرجعية من الكتب؛ وبروتوكول الوجه يستخدم 10 ث تشغيل [[Anthony2021,Cameron2023a,Nussbaum2017,Loyo2020,Taylor2018a,Taylor2018b,Gkesou2023]]'],
    ['الجرعة', 'مجموعة واحدة من 10 انقباضات، حتى 15؛ عضلة واحدة في كل مرة؛ نحو 11 دقيقة لكل عضلة (حسابنا)', 'الكتب: 10–20 في الجلسة؛ والتجارب: 3 × 30 أو 5 قوية [[Anthony2021,Cameron2023a,Loyo2020,Tuncay2015,Ray2025]]'],
    ['القطب', 'النشط نحو 3 سم²؛ المرجعي على العضلة شبه المنحرفة في نفس الجانب؛ كثافة تيار RMS ≤ 2 mA/سم²', 'الأقطاب الصغيرة انتقائية لكنها تُركّز التيار [[Efthimiou2024,Tuncay2015,Celik2024,Anthony2021,Puls2020,Nussbaum2017]]'],
  ],
  pB: [
    ['شكل الموجة', 'مثلثية؛ ثنائية الطور إن توفرت، وإلا أحادية الطور مع فحص الجلد', 'ألم أقل وانتشار أقل؛ والنبضات الطويلة ثنائية الطور أفضل من التيار المستمر [[Kurz2022,Efthimiou2024,Tuncay2015,Celik2024,Puls2020,Geitner2026,Volk2020]]'],
    ['مدة الطور', '25 ms أو أكثر؛ البداية 50–200 ms؛ وتجنّب 250 ms أو أكثر؛ أقصر طور انتقائي ومريح', 'انتقائي فقط من 25 ms؛ وفي سلسلة واحدة نزل من 155 إلى 51 ms خلال 20 أسبوعًا [[Kurz2022,Arnold2021,Geitner2026,Tuncay2015,DiPietro2023,Puls2020]]'],
    ['الراحة', '5 × الطور في البداية، ثم 3 × مع قوة الانقباضة؛ ولا تقل أبدًا عن الطور', 'فترات الراحة المنشورة تراوحت من نحو 1× إلى 10× الطور؛ وقاعدة الـ5× استنتاجنا [[Kurz2022,Tuncay2015,Puls2020,Geitner2026]]'],
    ['التردد', 'نحو 1–5 نبضات في الثانية، يتحدد بالطور + الراحة', 'مثال: 100 ms + 500 ms ≈ 1.7 في الثانية (حسابنا) [[Tuncay2015,Geitner2026,DiPietro2023]]'],
    ['الشدة', 'أقل استجابة انتقائية بدون ألم أو انتشار', 'الدراسات استخدمت تيارات حتى 6–27 mA؛ وتُراجع كثافة RMS لكل برنامج [[Puls2020,Geitner2026,Kurz2022,Efthimiou2024]]'],
    ['الجرعة', '3 × 30 انقباضة؛ والراحة نحو 5 × مدة المجموعة (نحو 1–1.5 دقيقة)', 'من تجارب شلل بِل؛ وقاعدة الراحة استنتاجنا [[Tuncay2015,Ray2025,Celik2024,DiPietro2023,Kurz2022]]'],
    ['الفقد الكامل للعصب', 'بروتوكول Jena المنزلي: 20 دقيقة مرتين يوميًا — للمتخصص فقط', 'البروتوكول المنزلي الوحيد المُختبَر (10 مرضى)؛ مع خطر التزامن الحركي [[Geitner2026,Pauna2024,Jung2026]]'],
  ],
  duT: 'انقباضة واحدة في الوضع A', duS: 'شكل التيار خلال دورة واحدة. اختر نسبة الراحة.', duSrc: 'الدورة من جدول المعاملات [[Anthony2021,Cameron2023a,Loyo2020]]؛ والأزمنة حسابنا.',
  uS: 'ث', uMin: 'دقيقة', duRamp: 'صعود', duOn: '10 ث تشغيل', duOff: 'راحة', duCyc: 'دورة واحدة', duMus: '10 انقباضات، عضلة واحدة', duAll: 'العضلات الست',
  trT: 'سلسلة نبضات الوضع B', trS: 'نبضات مثلثية بعد كل واحدة راحة. حرّك مدة الطور واختر الراحة.', trPh: 'الطور', trSrc: 'القواعد من جدول المعاملات [[Kurz2022,Tuncay2015,Geitner2026]]؛ والمعدلات والأزمنة حسابنا.',
  trRate: 'نبضة في الثانية', trSet: 'مجموعة من 30', trRest: 'الراحة بعد المجموعة', trWarn: 'أقل من 25 ms: غير انتقائي', trWarn2: 'تجنّب 250 ms فأكثر',
  fqT: 'التردد في كل وضع', fqS: 'نبضة في الثانية، مقياس لوغاريتمي', fqSrc: 'جدول المعاملات [[Cameron2023a,Nussbaum2017,Barss2018,Tuncay2015,Geitner2026]].',
  fqA: 'الوضع A: 20–30 Hz', fqAm: 'أقصى 35', fqB: 'الوضع B: نحو 1–5 في الثانية', fqX: 'الوضع A تحت 20 Hz: الانقباض غير سلس',
});
let psMode = 'A', duR = 5, trK = 5;
const rtlTxt = m => !rtl() ? m : m.replace(/<text ([^>]*?)text-anchor="(start|end|middle)"/g, (_, a, k) => `<text ${a}direction="rtl" text-anchor="${k === 'start' ? 'end' : k === 'end' ? 'start' : k}"`);
const fmtT = s => s >= 60 ? (Math.floor(s / 60) + ' ' + t.uMin + (Math.round(s % 60) ? ' ' + Math.round(s % 60) + ' ' + t.uS : '')) : (Math.round(s * 10) / 10 + ' ' + t.uS);
function renderSheet() {
  const rows = psMode === 'A' ? t.pA : t.pB;
  $('#psN').textContent = psMode; $('#psH').textContent = t['psH' + psMode]; $('#psW').textContent = t['psW' + psMode];
  $('#psRows').innerHTML = rows.map(([k, v, w], i) => `<div class="psr" style="--i:${i}"><span class="psk">${k}</span><b class="psv">${cite(v)}</b><span class="psw">${cite(w)}</span></div>`).join('');
  $('#psA').setAttribute('aria-pressed', psMode === 'A'); $('#psB').setAttribute('aria-pressed', psMode === 'B');
}
function drawDuty() {
  const W = nar() ? CW() : 560, H = 210, x0 = 14, x1 = W - 14, top = 40, base = 160, ramp = 2, on = 10, off = on * duR, cyc = ramp + on + ramp + off;
  const X = s => x0 + s / cyc * (x1 - x0), rtl_ = rtl(), XX = s => rtl_ ? x0 + x1 - X(s) : X(s);
  const pts = [[0, base], [ramp, top], [ramp + on, top], [ramp + on + ramp, base], [cyc, base]].map(([s, y]) => `${XX(s).toFixed(1)},${y}`).join(' ');
  let s = `<line x1="${x0}" y1="${base}" x2="${x1}" y2="${base}" class="grid"/>`;
  s += `<polygon points="${XX(0)},${base} ${pts} ${XX(cyc)},${base}" class="duarea"/><polyline points="${pts}" class="duline draw" pathLength="1"/>`;
  const lab = (a, b, txt, y, cls = '') => s += `<line x1="${XX(a)}" y1="${y + 6}" x2="${XX(b)}" y2="${y + 6}" class="dim"/>` + `<text x="${(XX(a) + XX(b)) / 2}" y="${y}" class="ax ${cls}" text-anchor="middle">${txt}</text>`;
  lab(ramp, ramp + on, t.duOn, top - 14, 'strong'); lab(ramp + on + ramp, cyc, `${t.duOff} ${off} ${t.uS}`, base - 14);
  s += `<text x="${XX(ramp / 2)}" y="${base + 22}" class="ax" text-anchor="middle">2 ${t.uS}</text><text x="${XX(ramp + on + ramp / 2)}" y="${base + 22}" class="ax" text-anchor="middle">2 ${t.uS}</text>`;
  s += `<text x="${XX(cyc / 2)}" y="${H - 6}" class="ax" text-anchor="middle">${t.duCyc}: ${cyc} ${t.uS}</text>`;
  $('#chDuty .cv').innerHTML = svg(W, H, rtlTxt(s), t.duT);
  const per = cyc * 10;
  $('#duOut').innerHTML = `<div><b dir="auto">${cyc} ${t.uS}</b><span>${t.duCyc}</span></div><div><b dir="auto">${fmtT(per)}</b><span>${t.duMus}</span></div><div><b dir="auto">${fmtT(per * 6)}</b><span>${t.duAll}</span></div>`;
  $$('#chDuty .dseg button').forEach(b => b.setAttribute('aria-pressed', +b.dataset.r === duR));
}
function drawTrain() {
  const ph = +$('#ph').value, pause = ph * trK, per = ph + pause, rate = 1000 / per, win = 3000;
  const W = nar() ? CW() : 560, H = 170, x0 = 14, x1 = W - 14, base = 128, top = 34, rtl_ = rtl();
  const X = ms => { const v = x0 + ms / win * (x1 - x0); return rtl_ ? x0 + x1 - v : v; };
  let d = `M${X(0)} ${base}`, n = 0;
  for (let t0 = 120; t0 + ph <= win; t0 += per, n++) d += ` L${X(t0)} ${base} L${X(t0 + ph)} ${top} L${X(t0 + ph + 0.01)} ${base}`;
  d += ` L${X(win)} ${base}`;
  let s = `<line x1="${x0}" y1="${base}" x2="${x1}" y2="${base}" class="grid"/>`;
  [0, 1000, 2000, 3000].forEach(ms => s += `<line x1="${X(ms)}" y1="${base}" x2="${X(ms)}" y2="${base + 6}" class="grid"/><text x="${X(ms)}" y="${base + 22}" class="ax" text-anchor="middle">${ms / 1000} ${t.uS}</text>`);
  s += `<path d="${d}" class="trline"/>`;
  $('#chTrain .cv').innerHTML = svg(W, H, rtlTxt(s), t.trT);
  $('#phOut').textContent = ph + ' ms';
  const set = 30 * per / 1000;
  $('#trOut').innerHTML = `<div><b dir="auto">${rate.toFixed(1)}</b><span>${t.trRate}</span></div><div><b dir="auto">${fmtT(set)}</b><span>${t.trSet}</span></div><div><b dir="auto">${fmtT(set * 5)}</b><span>${t.trRest}</span></div>` +
    (ph >= 250 ? `<p class="warn">${t.trWarn2}</p>` : '');
  $$('#chTrain .tseg button').forEach(b => b.setAttribute('aria-pressed', +b.dataset.k === trK));
}
function drawFreq() {
  const ph = nar(), W = ph ? CW() : 800, H = ph ? 230 : 170, x0 = 18, x1 = W - 18, rtl_ = rtl();
  const lx0 = logx(0.5, 60, x0, x1), X = v => rtl_ ? x0 + x1 - lx0(v) : lx0(v);
  const yB = ph ? 52 : 70, yA = ph ? 112 : 70, yAx = ph ? 140 : 100;
  let s = '';
  [0.5, 1, 2, 5, 10, 20, 50].forEach(v => s += `<line x1="${X(v)}" y1="${ph ? 20 : 30}" x2="${X(v)}" y2="${yAx}" class="grid"/><text x="${X(v)}" y="${yAx + 20}" class="ax" text-anchor="middle">${v}</text>`);
  s += `<rect x="${Math.min(X(5), X(20))}" y="${(ph ? yA : yB) - 10}" width="${Math.abs(X(20) - X(5))}" height="20" class="fqx"/>`;
  const band = (a, b, cls, label, y) => {
    s += `<rect x="${Math.min(X(a), X(b))}" y="${y - 10}" width="${Math.abs(X(b) - X(a))}" height="20" rx="10" class="fqb ${cls}"/>`;
    if (ph) { const anc = cls === 'a' ? (rtl_ ? 'start' : 'end') : (rtl_ ? 'end' : 'start'), lx = cls === 'a' ? X(30) : X(1);
      s += `<text x="${lx}" y="${y - 18}" class="lbl sm ${cls}t" text-anchor="${anc}">${label}</text>`; }
    else s += `<text x="${(X(a) + X(b)) / 2}" y="${y - 20}" class="lbl sm ${cls}t" text-anchor="middle">${label}</text>`; };
  band(1, 5, 'b', t.fqB, yB); band(20, 30, 'a', t.fqA, yA);
  s += `<line x1="${X(35)}" y1="${yA - 14}" x2="${X(35)}" y2="${yA + 14}" class="fqm"/>`;
  if (!ph) s += `<text x="${X(35)}" y="${yA + 30}" class="ax" text-anchor="middle">${t.fqAm}</text>`;
  else s += `<text x="${X(35) + (rtl_ ? -6 : 6)}" y="${yA + 4}" class="ax" text-anchor="${rtl_ ? 'end' : 'start'}">35</text>`;
  s += `<rect x="${rtl_ ? x1 - 16 : x0}" y="${H - 22}" width="16" height="12" rx="3" class="fqx"/><text x="${rtl_ ? x1 - 24 : x0 + 24}" y="${H - 12}" class="ax" text-anchor="${rtl_ ? 'end' : 'start'}">${t.fqX}</text>`;
  $('#chFq .cv').innerHTML = svg(W, H, rtlTxt(s), t.fqT);
}
function renderDepth() {
  $('#chCx .cv').innerHTML = ranges(t.cx.map((l, i) => ({ label: l, a: [1.2, 0.15, 16, 80][i], b: [null, 0.8, 17, null][i], cls: i < 2 ? 'navy' : 'teal' })),
    { a: 0.1, b: 200, ticks: [0.1, 1, 10, 100], rtl: rtl(), labelW: 260, w: nar() ? CW() : 560, stack: nar(), axisLabel: 'ms', label: t.cxT });
  $('#chTh .cv').innerHTML = hbar(t.th.map((l, i) => ({ label: l, v: [4.1, 9.8][i], cls: i ? 'teal' : 'navy' })), { max: 12, unit: ' mA', rtl: rtl(), w: nar() ? CW() : 520, labelW: 230, label: t.thT, stack: nar() });
  renderSheet(); drawDuty(); drawTrain(); drawFreq();
}

let L = 'en', t = T.en;
const NM = matchMedia('(max-width: 600px)'); const nar = () => NM.matches; const CW = () => Math.max(300, Math.min(420, ($('#chAet') || document.body).clientWidth - 32));
const rtl = () => L === 'ar';
const AET = [38, 17, 10, 7, 7, 7, 5, 5, 4];
const PD = [[0.01, 0.1], [0.4], [0.7], [100], [30, 200], [100, 280], [25, 1000], [25, 155]];
// phones: the same data as two grouped lists, each study with its value and a small log-scale track
function pdList() {
  const lo = Math.log10(0.005), hi = Math.log10(2000), X = v => ((Math.log10(v) - lo) / (hi - lo) * 100).toFixed(2) + '%';
  const f = v => (v < 1 ? String(v) : String(Math.round(v)));
  const ticks = [0.01, 0.1, 1, 10, 100, 1000].map(v => `<i class="tk" style="left:${X(v)}"></i>`).join('');
  const row = i => { const [a, b] = PD[i], cls = i < 3 ? 'navy' : 'teal';
    const val = (b ? f(a) + '–' + f(b) : f(a)) + ' ms';
    const mark = b ? `<i class="bar ${cls}" style="left:${X(a)};width:calc(${X(b)} - ${X(a)})"></i>` : `<i class="dot ${cls}" style="left:${X(a)}"></i>`;
    return `<div class="pdr" style="--i:${i}"><div class="pdt"><span>${t.pd[i]}</span><b class="num ltr">${val}</b></div><div class="pdtrack" dir="ltr">${ticks}${mark}</div></div>`; };
  const grp = (cls, title, sub, idx, z) => `<div class="pdg ${cls}"><div class="pdh"><span class="sw"></span><div><b>${title}</b><small>${sub}</small></div></div>
    <div class="pdzone" dir="ltr" style="--za:${X(z[0])};--zb:${X(z[1])}">${idx.map(row).join('')}</div></div>`;
  const scale = `<div class="pdscale" dir="ltr">${[0.01, 0.1, 1, 10, 100, 1000].map(v => `<span style="left:${X(v)}">${v}</span>`).join('')}</div><p class="pdax">${t.axPD}</p>`;
  return `<div class="pdm">${grp('za', t.zS, t.zSs, [0, 1, 2], [0.005, 1])}${grp('zb', t.zL, t.zLs, [3, 4, 5, 6, 7], [10, 2000])}${scale}</div>`;
}

function render() {
  // 1. aetiology + recovery
  $('#chAet .cv').innerHTML = hbar(t.aet.map((l, i) => ({ label: l, v: AET[i], cls: i === 0 ? 'teal' : i === 1 ? 'grey' : 'navy' })), { max: 40, rtl: rtl(), w: nar() ? CW() : 560, rowH: 36, labelW: 200, label: t.aetT, stack: nar() });
  $('#chRec .cv').innerHTML = donut(0.3, { big: '~30%', small: t.recSmall, label: t.recT });
  // 2. pulse durations used
  $('#chPD .cv').innerHTML = ranges(t.pd.map((l, i) => ({ label: l, a: PD[i][0], b: PD[i][1], cls: i < 3 ? 'navy' : 'teal' })),
    { rtl: rtl(), labelW: 290, w: nar() ? CW() : 800, stack: nar(), axisLabel: t.axPD, zones: [{ from: 0.005, to: 1, cls: 'za', label: t.zS }, { from: 10, to: 2000, cls: 'zb', label: t.zL }], label: t.pdT });
  if (nar()) $('#chPD .cv').innerHTML = pdList();
  renderDepth();
  drawSD();
  // 4. gantt
  const G = [[[0, 14, 1]], [[0, 7, 1], [7, 14, .5]], [[3, 14, 1], [14, 21, .45]], [[14, 21, .45], [21, 90, 1]], [[14, 21, 1]], [[14, 21, 1]]];
  const GC = ['grey', 'sand', 'teal', 'navy', 'amber', 'slate'];
  $('#chG .cv').innerHTML = gantt(t.g.map((l, i) => ({ label: l, bars: G[i], cls: GC[i] })), { rtl: rtl(), axisLabel: t.gAx, labelW: 290, label: t.gT, w: nar() ? CW() : 800, stack: nar() });
  // 5a. guideline matrix
  const MC = [['rec', 'rec', 'rec'], ['rec', 'rec', 'rec'], ['none', 'none', 'rec'], ['none', 'ag', 'ag'], ['ag', 'na', 'ag']];
  const heads = L === 'ar' ? ['الأمريكي 2013', 'الكندي 2014', 'البرازيلي 2024'] : ['American 2013', 'Canadian 2014', 'Brazilian 2024'];
  $('#matrix').innerHTML = `<div class="mh"></div>${heads.map(h => `<div class="mh">${h}</div>`).join('')}` +
    t.mRows.map((r, i) => `<div class="mr${i === 3 ? ' hl' : ''}">${r}</div>` + t.mCells[i].map((c, j) => `<div class="mc m-${MC[i][j]}" style="--i:${i * 3 + j}">${c}</div>`).join('')).join('');
  // 5b. forest
  $('#chF .cv').innerHTML = forest([{ lines: t.f1, est: 0.63, lo: 0.50, hi: 0.80, cls: 'navy' }, { lines: t.f2, est: 0.65, lo: 0.48, hi: 0.88, cls: 'teal' }], { rtl: rtl(), w: nar() ? CW() : 560, stack: nar(), left: t.frL, right: t.frR, label: t.fT });
  // 5c. waffle
  const sq = (n, a, ca, cb) => Array.from({ length: 14 }, (_, k) => `<i class="${k < n ? ca : cb}" style="--i:${k}"></i>`).join('');
  $('#waffle').innerHTML = `<p>${t.w1}</p><div class="sq">${sq(13, 0, 'amber', 'grey')}</div><div class="wk"><span><i class="amber"></i>${t.w1a}</span><span><i class="grey"></i>${t.w1b}</span></div>
    <p>${t.w2}</p><div class="sq">${sq(2, 0, 'teal', 'pale')}</div><div class="wk"><span><i class="teal"></i>${t.w2a}</span><span><i class="pale"></i>${t.w2b}</span></div>`;
  // 5d. exercise vs acupuncture
  const W = nar() ? CW() : 520, x0 = 14, x1 = W - 14, X = v => { const p = x0 + v / 20 * (x1 - x0); return rtl() ? x0 + x1 - p : p; };
  let s = '';
  for (let v = 0; v <= 20; v += 5) s += `<line x1="${X(v)}" y1="40" x2="${X(v)}" y2="104" class="grid"/><text x="${X(v)}" y="120" class="ax" text-anchor="middle">${v}</text>`;
  s += `<line x1="${X(10)}" y1="28" x2="${X(10)}" y2="104" class="mcid"/><text x="${X(10)}" y="22" class="mcidt" text-anchor="middle">${t.xM}</text>`;
  s += `<line x1="${X(6.73)}" y1="72" x2="${X(17.13)}" y2="72" class="ci draw navy" pathLength="1"/><rect x="${X(11.9) - 8}" y="64" width="16" height="16" class="pop navy" style="--i:2"/><text x="${X(11.9)}" y="56" class="val fd" text-anchor="middle" style="--i:2">+11.9</text>`;
  s += `<text x="${X(6.73)}" y="96" class="ax" text-anchor="middle">6.73</text><text x="${X(17.13)}" y="96" class="ax" text-anchor="middle">17.13</text>`;
  const by = 170, bw = x1 - x0, a1 = bw * 14 / 17, ax0 = rtl() ? x1 - a1 : x0, ax1 = rtl() ? x0 : x0 + a1;
  s += `<text x="${rtl() ? x1 : x0}" y="${by - 12}" class="lbl" text-anchor="${rtl() ? 'end' : 'start'}">${t.xA}</text>`;
  s += `<rect x="${ax0}" y="${by}" width="${a1}" height="36" rx="5" class="bar amber" style="--i:3;transform-origin:${rtl() ? 'right' : 'left'}"/><rect x="${rtl() ? x0 : x0 + a1 + 3}" y="${by}" width="${bw - a1 - 3}" height="36" rx="5" class="bar sand" style="--i:5;transform-origin:${rtl() ? 'right' : 'left'}"/>`;
  s += `<text x="${(ax0 + ax0 + a1) / 2}" y="${by + 23}" class="inb fd" text-anchor="middle" style="--i:4">${t.xA1}</text><text x="${rtl() ? x0 + (bw - a1) / 2 : x0 + a1 + (bw - a1) / 2}" y="${by + 23}" class="inb2 fd" text-anchor="middle" style="--i:6">${t.xA2}</text>`;
  $('#chX .cv').innerHTML = svg(W, 220, s, t.xT);
  // 5e. Jung cohort
  $('#chJ .cv').innerHTML = vbars([{ label: t.jE, v: 9.32, cls: 'amber' }, { label: t.jN, v: 8.27, cls: 'grey' }], { w: 330, h: 250, max: 11, title: t.jA, note: t.jAn, label: t.jA }) +
    vbars([{ label: t.jE, v: 3.15, cls: 'amber' }, { label: t.jN, v: 4.51, cls: 'grey' }], { w: 330, h: 250, max: 5.5, title: t.jB, note: t.jBn, label: t.jB });
  // 7. contraindications
  const ci = (arr) => arr.map(x => `<li>${cite(x)}</li>`).join('');
  $('#noList').innerHTML = ci(t.no); $('#prList').innerHTML = ci(t.pr);
}

// ---- interactive strength–duration chart ----
const nR = 3, nC = 0.3, dR = 4.5, dC = 30;
const W2 = 800, H2 = 380, X0 = 70, X1 = 770, Y0 = 20, Y1 = 320;
const lx = logx(0.01, 1000, X0, X1), ly = v => Y1 - Math.log10(v) / Math.log10(300) * (Y1 - Y0);
function curve(R, C) { const p = []; for (let x = 0.01; x <= 1000; x *= 1.05) { const v = R * (1 + C / x); if (v <= 300) p.push(`${lx(x).toFixed(1)},${ly(v).toFixed(1)}`); } return p.join(' '); }
function drawSD() {
  let s = '';
  s += `<rect x="${lx(0.4)}" y="${Y0}" width="${lx(1) - lx(0.4)}" height="${Y1 - Y0}" class="zone za"/><text x="${(lx(0.4) + lx(1)) / 2}" y="${Y0 + 14}" class="zl za" text-anchor="middle">${t.zA}</text>`;
  s += `<rect x="${lx(50)}" y="${Y0}" width="${lx(200) - lx(50)}" height="${Y1 - Y0}" class="zone zb"/><text x="${(lx(50) + lx(200)) / 2}" y="${Y0 + 14}" class="zl zb" text-anchor="middle">${t.zB}</text>`;
  [0.01, 0.1, 1, 10, 100, 1000].forEach(v => { s += `<line x1="${lx(v)}" y1="${Y0}" x2="${lx(v)}" y2="${Y1}" class="grid"/><text x="${lx(v)}" y="${Y1 + 18}" class="ax" text-anchor="middle">${v}</text>`; });
  s += `<line x1="${X0}" y1="${Y1}" x2="${X1}" y2="${Y1}" class="axl"/><text x="${(X0 + X1) / 2}" y="${Y1 + 44}" class="ax" text-anchor="middle">${t.axPD}</text>`;
  s += `<text transform="translate(24,${(Y0 + Y1) / 2}) rotate(-90)" class="ax" text-anchor="middle">${t.axTh}</text>`;
  s += `<line x1="${lx(250)}" y1="${Y0}" x2="${lx(250)}" y2="${Y1}" class="warn"/>`;
  s += `<polyline points="${curve(nR, nC)}" class="crv navy draw" pathLength="1"/><polyline points="${curve(dR, dC)}" class="crv teal draw" pathLength="1" style="--i:3"/>`;
  s += `<g id="sdCur"><line id="sdL" y1="${Y0}" y2="${Y1}" class="cur"/><circle id="sdPn" r="7" class="navy"/><circle id="sdPd" r="7" class="teal"/></g>`;
  $('#chSD .cv').innerHTML = svg(W2, H2, s, t.sdT);
  updSD();
}
function updSD() {
  const pd = $('#pd'); if (!pd) return;
  const x = Math.pow(10, +pd.value), vn = nR * (1 + nC / x), vd = dR * (1 + dC / x);
  const L1 = $('#sdL'); if (!L1) return;
  L1.setAttribute('x1', lx(x)); L1.setAttribute('x2', lx(x));
  const pn = $('#sdPn'), pdd = $('#sdPd');
  pn.setAttribute('cx', lx(x)); pn.setAttribute('cy', ly(Math.min(vn, 300)));
  pdd.setAttribute('cx', lx(x)); pdd.setAttribute('cy', ly(Math.min(vd, 300))); pdd.style.opacity = vd > 300 ? 0.25 : 1;
  const fmt = v => v < 1 ? v.toFixed(2) : v < 10 ? v.toFixed(1) : Math.round(v);
  $('#pdOut').textContent = fmt(x) + ' ms';
  $('#vIn').textContent = '× ' + fmt(vn / nR);
  $('#vDe').textContent = vd > 300 ? '> × 60' : '× ' + fmt(vd / nR);
  $('#sdMsg').textContent = x < 1 ? t.sdA : x < 25 ? t.sdMid : x < 250 ? t.sdB : t.sdX;
  $('#chSD').dataset.zone = x < 1 ? 'a' : x < 25 ? 'm' : x < 250 ? 'b' : 'x';
}
$('#pd').addEventListener('input', updSD);
// gentle demo sweep the first time the chart is seen
let swept = false;
new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting || swept || matchMedia('(prefers-reduced-motion: reduce)').matches) return; swept = true;
  const pd = $('#pd'), t0 = performance.now();
  (function go(n) { const k = Math.min(1, (n - t0) / 3200), e2 = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; pd.value = -1.6 + e2 * 3.6; updSD(); if (k < 1) requestAnimationFrame(go); })(t0);
}), { threshold: 0.5 }).observe($('#chSD'));

// ---- steps auto-advance ----
let si = 0, sTimer = null;
const steps = $('#steps'), lis = $$('#steps li');
function setStep(i) { si = i; lis.forEach((l, k) => { l.classList.toggle('on', k === i); l.classList.toggle('done', k < i); }); steps.style.setProperty('--p', i / (lis.length - 1)); }
lis.forEach((l, k) => l.addEventListener('click', () => { setStep(k); clearInterval(sTimer); }));
new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting && !sTimer) { setStep(0); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) sTimer = setInterval(() => setStep((si + 1) % lis.length), 2600); }
}), { threshold: 0.4 }).observe(steps);

// ---- chapter scroll-spy ----
const chaps = $$('.chap');
const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) $$('.chapters a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
chaps.forEach(c => spy.observe(c));
// phone chapter indicator
const bar = document.createElement('div'); bar.className = 'chapbar'; bar.setAttribute('aria-hidden', 'true'); bar.innerHTML = '<b></b><span></span><i></i>'; document.body.append(bar);
let cur = null, bTick = false;
function updBar() {
  bTick = false; const y = innerHeight * 0.35; let c = null;
  for (const ch of chaps) { const r = ch.getBoundingClientRect(); if (r.top < y) c = ch; }
  bar.classList.toggle('on', !!c);
  if (!c) return;
  if (c !== cur) { cur = c; const n = c.id.slice(1); bar.querySelector('b').textContent = '0' + n; bar.querySelector('span').textContent = t['c' + n]; }
  const r = c.getBoundingClientRect(); bar.style.setProperty('--p', Math.min(1, Math.max(0, (y - r.top) / r.height)).toFixed(3));
}
addEventListener('scroll', () => { if (!bTick) { bTick = true; requestAnimationFrame(updBar); } }, { passive: true });

NM.addEventListener('change', () => render());
$('#psA').onclick = () => { psMode = 'A'; renderSheet(); }; $('#psB').onclick = () => { psMode = 'B'; renderSheet(); };
$$('#chDuty .dseg button').forEach(b => b.onclick = () => { duR = +b.dataset.r; drawDuty(); });
$$('#chTrain .tseg button').forEach(b => b.onclick = () => { trK = +b.dataset.k; drawTrain(); });
$('#ph').addEventListener('input', drawTrain);
// waveforms drawn at the box's real pixel width, so pulses keep their true shape (no stretching)
function waves() {
  document.querySelectorAll('.wavebox').forEach(box => {
    const W = box.clientWidth, H = box.clientHeight || 80, isA = !!box.closest('.ma'), P = isA ? 52 : 150, n = Math.ceil(W / P) + 1, L = n * P, mid = H / 2, a = H * 0.3;
    let d = `M0 ${mid}`;
    for (let k = 0; k < 2 * n; k++) { const x = k * P;
      d += isA ? ` H${x + 20} V${mid - a} H${x + 25} V${mid + a} H${x + 30} V${mid} H${x + P}` : ` H${x + 30} L${x + 80} ${mid - a * 1.15} L${x + 83} ${mid} H${x + P}`; }
    const svg = box.querySelector('svg');
    svg.setAttribute('viewBox', `0 0 ${2 * L} ${H}`); svg.removeAttribute('preserveAspectRatio');
    svg.style.width = (2 * L) + 'px'; svg.style.setProperty('--shift', -L + 'px');
    svg.querySelector('path').setAttribute('d', d);
  });
}
waves(); let wT; addEventListener('resize', () => { clearTimeout(wT); wT = setTimeout(waves, 150); });
initSite({ page: 'science', T, onLang: l => { L = l; t = T[l]; render(); cur = null; updBar(); } });
window.__done = true;

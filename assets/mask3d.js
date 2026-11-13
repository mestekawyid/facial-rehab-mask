// Faceless mannequin bust + open-face mask with a detachable side module that docks on either temple.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

// load the one-piece sculpted bust: returns {body, proxy} float geometries in scene units
export async function loadBust(url) {
  if (/\.js(\?|$)/.test(url)) { const { BUST } = await import(new URL(url, document.baseURI).href); return parseBust(BUST); }
  return parseBust(await (await fetch(url)).arrayBuffer());
}
// accepts the base64 text of a bust module (or the module source itself) or raw .glb bytes
export async function parseBust(src) {
  const ld = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  let buf = src;
  if (typeof src === 'string') { const a = src.indexOf('"'), b = src.lastIndexOf('"'); const b64 = a >= 0 && b > a ? src.slice(a + 1, b) : src; buf = Uint8Array.from(atob(b64), c => c.charCodeAt(0)).buffer; }
  const gltf = await ld.parseAsync(buf, '');
  const out = {};
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse(o => {
    if (!o.isMesh) return;
    const src = o.geometry, pa = src.attributes.position, n = pa.count, arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { arr[i * 3] = pa.getX(i); arr[i * 3 + 1] = pa.getY(i); arr[i * 3 + 2] = pa.getZ(i); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    if (src.index) g.setIndex(Array.from(src.index.array));
    g.applyMatrix4(o.matrixWorld); g.computeVertexNormals();
    (out.list = out.list || []).push(g);
  });
  out.list.sort((a, b) => b.attributes.position.count - a.attributes.position.count);
  const n = out.list.length;
  return { body: out.list[0], mid: n >= 3 ? out.list[1] : out.list[0], proxy: out.list[n - 1] };
}

const C = { head: 0xF4F2EF, navy: 0x1F3A5F, teal: 0x2A7F8A, cable: 0x2B3440 };
function smooth(e0, e1, x) { const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); }
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = t => 1 - Math.pow(1 - clamp(t), 3);

function headGeometry() {
  const g = new THREE.SphereGeometry(1, 192, 144);
  const p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    let { x, y, z } = v;
    y *= 1.17; x *= 0.86;
    if (z < 0) z *= 1.0 + 0.12 * smooth(-0.3, 0.8, y / 1.17);
    const low = smooth(-0.05, -1.12, y);
    x *= 1 - 0.27 * low;
    z *= 1 - (z > 0 ? 0.12 : 0.40) * low;
    if (z > 0) z *= 1 - 0.07 * smooth(0.2, 0.95, v.z) * (1 - low * 0.5);
    if (z > 0 && y < -0.8) z += 0.05 * smooth(-0.8, -1.12, y) * smooth(0.2, 0.8, v.z);
    p.setXYZ(i, x, y, z);
  }
  g.computeVertexNormals();
  return g;
}
function bustGeometry() {
  const prof = [[0.0, -0.55], [0.40, -0.62], [0.42, -0.95], [0.43, -1.25], [0.47, -1.48], [0.62, -1.64], [1.05, -1.76],
    [1.50, -1.88], [1.82, -2.06], [2.00, -2.34], [2.08, -2.75], [2.10, -3.6]];
  const curve = new THREE.CatmullRomCurve3(prof.map(([r, y]) => new THREE.Vector3(r, y, 0)), false, 'centripetal');
  const pts = curve.getPoints(90).map(q => new THREE.Vector2(Math.max(q.x, 0.0001), q.y));
  const g = new THREE.LatheGeometry(pts, 160);
  const p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const t = smooth(-1.40, -1.95, v.y);
    v.z *= 1 - 0.56 * t; v.z -= 0.10 * t; if (v.y > -1.5) v.z += 0.04;
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}
// strap with a soft rectangular section following surface samples [{p,n}]
function strapGeometry(samples, h, th, closed) {
  const N = samples.length, pos = [], idx = [];
  for (let i = 0; i < N; i++) {
    const a = samples[closed ? (i - 1 + N) % N : Math.max(0, i - 1)].p, b = samples[closed ? (i + 1) % N : Math.min(N - 1, i + 1)].p;
    const t = b.clone().sub(a).normalize(), n = samples[i].n.clone().normalize();
    let u = new THREE.Vector3().crossVectors(t, n).normalize();
    if (u.y < 0 || (Math.abs(u.y) < 0.2 && u.z < 0)) u.negate();
    const p = samples[i].p;
    const c = [[0, h / 2], [0, -h / 2], [th, -h / 2], [th, h / 2]];
    c.forEach(([o, s]) => { const q = p.clone().addScaledVector(n, o).addScaledVector(u, s); pos.push(q.x, q.y, q.z); });
  }
  const segs = closed ? N : N - 1;
  for (let i = 0; i < segs; i++) {
    const a = i * 4, b = ((i + 1) % N) * 4;
    for (let k = 0; k < 4; k++) { const k2 = (k + 1) % 4; idx.push(a + k, b + k, a + k2, a + k2, b + k, b + k2); }
  }
  if (!closed) { [0, (N - 1) * 4].forEach((s, j) => { if (j === 0) idx.push(s, s + 1, s + 2, s, s + 2, s + 3); else idx.push(s, s + 2, s + 1, s, s + 3, s + 2); }); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx);
  g.computeVertexNormals(); return g;
}

export function createMaskScene(canvas, opts = {}) {
  const lite = !!opts.lite;
  const Q = n => lite ? Math.max(6, Math.round(n * 0.45)) : n; // fewer segments on light devices
  const PHYS = ['clearcoat', 'clearcoatRoughness', 'sheen', 'sheenRoughness', 'sheenColor'];
  const cheap = lite || !!opts.cheapMat;
  const PM = p => { if (!cheap) return new THREE.MeshPhysicalMaterial(p); const q = { ...p }; PHYS.forEach(k => delete q[k]); return new THREE.MeshStandardMaterial(q); };
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lite, alpha: true, preserveDrawingBuffer: !!opts.preserve, powerPreference: lite ? 'low-power' : 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, opts.maxDpr || 2));
  renderer.toneMapping = THREE.NeutralToneMapping; renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = !lite && !opts.noShadow; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.035).texture; scene.environmentIntensity = 0.55;
  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
  const key = new THREE.DirectionalLight(0xFFF8F0, 2.6); key.position.set(-3.2, 4.0, 5.2);
  key.castShadow = !lite && !opts.noShadow; key.shadow.mapSize.set(opts.shadowSize || 2048, opts.shadowSize || 2048);
  key.shadow.radius = 6; key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02; key.shadow.intensity = 0.55;
  Object.assign(key.shadow.camera, { left: -3, right: 3, top: 3, bottom: -4, near: 1, far: 15 });
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xEAF4F6, 1.4); rim.position.set(4, 2.5, -4); scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xD5DCE4, 0.9));
  const root = new THREE.Group(); scene.add(root);

  const skin = PM({ color: C.head, roughness: 0.42, clearcoat: 0.25, clearcoatRoughness: 0.45, sheen: 0.4, sheenRoughness: 0.6, sheenColor: new THREE.Color(0xffffff) });
  const frameMat = PM({ color: C.navy, roughness: 0.34, metalness: 0.2, clearcoat: 0.8, clearcoatRoughness: 0.2 });
  const strapMat = PM({ color: 0x263F60, roughness: 0.62, sheen: 0.5, sheenColor: new THREE.Color(0x6C86A8) });
  const siliconeMat = PM({ color: 0xFBFBFC, roughness: 0.55, sheen: 0.5, sheenColor: new THREE.Color(0xffffff) });
  const tealMat = PM({ color: C.teal, roughness: 0.3, metalness: 0.1, clearcoat: 0.6, emissive: new THREE.Color(C.teal), emissiveIntensity: 0 });
  const litMat = tealMat.clone(); litMat.color = new THREE.Color(0x3FB6C4); litMat.emissiveIntensity = 0.9;
  const cableMat = PM({ color: C.cable, roughness: 0.5 });
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x3FB6C4, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });

  let head, bust, bodyMesh = null; const dockGroups = [];
  if (opts.bust) {
    const body = new THREE.Mesh(lite && opts.bust.mid ? opts.bust.mid : opts.bust.body, skin); body.castShadow = body.receiveShadow = true; root.add(body); bodyMesh = body;
    head = bust = new THREE.Mesh(opts.bust.proxy || opts.bust.body, skin); head.visible = false; root.add(head); // raycast proxy
  } else {
    head = new THREE.Mesh(headGeometry(), skin); head.castShadow = head.receiveShadow = true; root.add(head);
    bust = new THREE.Mesh(bustGeometry(), skin); bust.castShadow = bust.receiveShadow = true; root.add(bust);
  }
  root.updateMatrixWorld(true);
  skin.side = THREE.DoubleSide;

  const ray = new THREE.Raycaster();
  function hitFrom(origin, dirToward, off, target = head) {
    ray.set(origin, dirToward.clone().normalize());
    const h = ray.intersectObject(target, false)[0]; if (!h) { console.warn("miss", origin.toArray().map(v=>v.toFixed(2)).join(","), dirToward.toArray().map(v=>v.toFixed(2)).join(",")); return null; }
    const n = h.face.normal.clone().transformDirection(target.matrixWorld); if (n.dot(dirToward) > 0) n.negate();
    return { p: h.point.clone().addScaledVector(n, off), n };
  }
  const onDir = (d, off = 0) => { d = d.clone().normalize(); return hitFrom(d.clone().multiplyScalar(6), d.clone().negate(), off); };
  const onLevel = (a, y, off = 0) => { const o = new THREE.Vector3(Math.sin(a) * 6, y, Math.cos(a) * 6); return hitFrom(o, new THREE.Vector3(-o.x, 0, -o.z), off); };
  const dirYaw = (yawDeg, y, back = 0) => { const a = THREE.MathUtils.degToRad(yawDeg); return new THREE.Vector3(Math.sin(a), y, Math.cos(a) + back); };

  const parts = []; // {obj, home, from, ex, delay}
  const addPart = (parent, obj, from, ex, delay) => { parent.add(obj); parts.push({ obj, home: obj.position.clone(), from, ex, delay }); return obj; };
  const anchors = {};
  const anchor = (name, parent, p) => { const o = new THREE.Object3D(); o.position.copy(p); parent.add(o); anchors[name] = o; return o; };

  // ---- shared frame: padded head band (closed ring) + crown strap + two temple docks
  const bandH = a => 0.56 + 0.22 * Math.max(0, Math.cos(a)) - 0.05 * Math.max(0, -Math.cos(a));
  const ringS = []; for (let i = 0; i < 220; i++) { const a = i / 220 * Math.PI * 2; ringS.push(onLevel(a, bandH(a), 0.012)); }
  const bandG = new THREE.Group();
  const bandMesh = new THREE.Mesh(strapGeometry(ringS, 0.17, 0.05, true), strapMat); bandMesh.castShadow = true; bandG.add(bandMesh);
  const stripe = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ringS.map(s => s.p.clone().addScaledVector(s.n, 0.052)), true), Q(260), 0.007, Q(8), true), tealMat);
  bandG.add(stripe);
  anchor('band', bandG, ringS[0].p.clone().addScaledVector(ringS[0].n, 0.06));
  addPart(root, bandG, new THREE.Vector3(0, 0.7, 0), new THREE.Vector3(0, 0.25, 0), 0.0);

  const crownS = []; for (let i = 0; i <= 80; i++) { const a = THREE.MathUtils.lerp(-1.42, 1.42, i / 80); const s = onDir(new THREE.Vector3(Math.sin(a), Math.cos(a) * 1.1, -0.2), 0.012); if (s) crownS.push(s); }
  const crownG = new THREE.Group(); const crownMesh = new THREE.Mesh(strapGeometry(crownS, 0.11, 0.045, false), strapMat); crownMesh.castShadow = true; crownG.add(crownMesh);
  anchor('crown', crownG, crownS[40].p.clone().addScaledVector(crownS[40].n, 0.05));
  addPart(root, crownG, new THREE.Vector3(0, 0.9, 0), new THREE.Vector3(0, 0.55, 0), 0.04);

  const dockA = Math.PI / 2 - 0.06, dockY = bandH(dockA);
  const docks = [], covers = [];
  [1, -1].forEach(sx => {
    const s = onLevel(sx * dockA, dockY, 0.06);
    const d = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.12, Q(8), Q(20)), frameMat); d.position.copy(s.p); d.castShadow = true;
    const dr = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.008, Q(10), Q(40)), tealMat); dr.position.copy(s.p).addScaledVector(s.n, 0.07); dr.lookAt(dr.position.clone().add(s.n));
    const g = new THREE.Group(); g.add(d, dr); dockGroups.push(g); addPart(root, g, new THREE.Vector3(sx * 0.6, 0.3, 0), new THREE.Vector3(sx * 0.25, 0.2, 0), 0.08);
    const cov = new THREE.Mesh(new THREE.SphereGeometry(0.085, Q(32), Q(16), 0, Math.PI * 2, 0, Math.PI / 2), siliconeMat);
    cov.position.copy(s.p).addScaledVector(s.n, 0.075); cov.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), s.n); cov.scale.setScalar(0.001); root.add(cov);
    docks.push(s); covers.push(cov);
  });
  anchor('dock', root, docks[1].p.clone().addScaledVector(docks[1].n, 0.1));

  // ---- detachable side module (built for +x; mirrored for -x)
  // Electrode sites: the original model's placement rules (Fridlund & Cacioppo landmarks), applied to the
  // landmarks of THIS head. Vertical scale 0.129 units/cm above the mouth, 0.083 below it; horizontal 0.104/cm
  // (lateral canthus 4.8 cm in the original = 0.50 here). Landmarks: lateral canthus (0.50,-0.19),
  // mouth corner (0.31,-0.925), chin point y -1.22, face half-width at the cheek ~0.66.
  const sites = [
    { name: 'Frontalis', x: 0.395, y: 0.19, r: 0.09 },              // 1 cm lateral to the pupil, 1.5 cm above the brow
    { name: 'Orbicularis oculi', x: 0.448, y: -0.355, r: 0.08 },    // 0.5 cm medial and ~1.4 cm below the lateral canthus
    { name: 'Zygomaticus major', x: 0.42, y: -0.67, r: 0.09 },      // mouth-corner→tragus line, 0.5 cm mouthward of its midpoint
    { name: 'Orbicularis oris', x: 0.258, y: -1.008, r: 0.055 },    // 1 cm below, 0.5 cm medial to the mouth corner
    { name: 'Depressor anguli oris', x: 0.414, y: -1.05, r: 0.055 },// 1 cm lateral, 1.5 cm below the mouth corner
    { name: 'Mentalis', x: 0.052, y: -1.22, r: 0.055 },             // 0.5 cm off the midline at the chin point
  ];
  function makeModule(sx) {
    const M = new THREE.Group(); root.add(M);
    const inner = new THREE.Group(); M.add(inner); inner.scale.x = sx; // mirror whole module
    const dock = docks[0];
    const side = [dock.p.clone().addScaledVector(dock.n, 0.02)];
    [[88, 0.22, -0.08], [87, -0.05, -0.04], [84, -0.32, 0], [78, -0.6, 0.02], [66, -0.85, 0.03], [50, -1.0, 0.02], [38, -1.06, 0]]
      .forEach(([yaw, y, back]) => side.push(onDir(dirYaw(yaw, y, back), 0.10).p));
    const sideCurve = new THREE.CatmullRomCurve3(side, false, 'centripetal');
    const frameG = new THREE.Group();
    const sideMesh = new THREE.Mesh(new THREE.TubeGeometry(sideCurve, Q(160), 0.036, Q(20), false), frameMat); sideMesh.castShadow = true; frameG.add(sideMesh);
    const sl = sideCurve.getPointAt(0.42), sld = sideCurve.getTangentAt(0.42);
    const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.046, 0.046, 0.16, Q(28)), siliconeMat); sleeve.position.copy(sl); sleeve.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), sld); frameG.add(sleeve);
    const endCap = new THREE.Mesh(new THREE.SphereGeometry(0.036, Q(20), Q(14)), frameMat); endCap.position.copy(side[side.length - 1]); frameG.add(endCap);
    const pod = new THREE.Mesh(new THREE.CapsuleGeometry(0.095, 0.18, Q(8), Q(24)), frameMat); pod.position.copy(dock.p).addScaledVector(dock.n, 0.05); pod.castShadow = true; frameG.add(pod);
    const podLed = new THREE.Mesh(new THREE.SphereGeometry(0.018, 16, 10), tealMat); podLed.position.copy(pod.position).addScaledVector(dock.n, 0.1).add(new THREE.Vector3(0, 0.08, 0)); frameG.add(podLed);
    addPart(inner, frameG, new THREE.Vector3(0.9, 0.1, -0.2), new THREE.Vector3(0.55, 0, 0), 0.14);
    const samples = sideCurve.getSpacedPoints(200);
    const els = [];
    sites.forEach((s, i) => {
      const hit = hitFrom(new THREE.Vector3(s.x, s.y, 6), new THREE.Vector3(0, 0, -1), 0.0), k = s.r / 0.09;
      const g = new THREE.Group();
      const puck = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.09, 0.032, Q(48)), siliconeMat); body.castShadow = true;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.072, 0.012, Q(16), Q(64)), tealMat); ring.rotation.x = Math.PI / 2; ring.position.y = 0.018;
      const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.01, Q(32)), tealMat); dot.position.y = 0.019;
      const back = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.03, Q(32)), frameMat); back.position.y = 0.04;
      puck.add(body, ring, dot, back);
      puck.scale.set(k, 1, k); puck.position.copy(hit.p).addScaledVector(hit.n, 0.018); puck.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), hit.n);
      g.add(puck);
      let best = samples[0], bd = 1e9; samples.forEach(q => { const d = q.distanceTo(hit.p); if (d < bd) { bd = d; best = q; } });
      const mid = best.clone().lerp(hit.p, 0.5); const md = mid.clone().normalize();
      const midS = onDir(new THREE.Vector3(md.x, mid.y, md.z), 0.09);
      const arm = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([best, midS ? midS.p : mid, hit.p.clone().addScaledVector(hit.n, 0.07)]), Q(48), 0.016, Q(12), false), frameMat);
      arm.castShadow = true; g.add(arm);
      els.push({ group: g, puck, ring, dot, n: hit.n.clone() });
      addPart(inner, g, hit.n.clone().multiplyScalar(0.55).add(new THREE.Vector3(0.25, 0, 0)), hit.n.clone().multiplyScalar(0.28).add(new THREE.Vector3(0.45, 0, 0)), 0.24 + i * 0.06);
    });
    let ph = null; for (const [px, pz] of [[1.05, -0.62], [1.0, -0.7], [1.1, -0.55], [0.95, -0.5], [1.2, -0.7]]) { ph = hitFrom(new THREE.Vector3(px, 3, pz), new THREE.Vector3(0, -1, 0), 0.02, bust); if (ph) break; }
    const pn = ph.n.y < 0 ? ph.n.clone().negate() : ph.n.clone();
    const padG = new THREE.Group();
    const pad = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.035, 0.24, 4, 1, 4), siliconeMat); pad.castShadow = true;
    const padRim = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.02, 0.26), tealMat); padRim.position.y = -0.008;
    const padM = new THREE.Group(); padM.add(padRim, pad); padM.position.copy(ph.p).addScaledVector(pn, 0.018); padM.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pn); padG.add(padM);
    const cc = new THREE.CatmullRomCurve3([pod.position.clone(), pod.position.clone().add(new THREE.Vector3(0.2, -0.45, -0.28)), new THREE.Vector3(0.82, -1.5, -0.62), padM.position.clone().add(new THREE.Vector3(0, 0.03, -0.12))]);
    const cable = new THREE.Mesh(new THREE.TubeGeometry(cc, Q(80), 0.014, Q(10), false), cableMat); cable.castShadow = true; padG.add(cable);
    addPart(inner, padG, new THREE.Vector3(0.4, -0.5, 0.2), new THREE.Vector3(0.35, -0.3, 0.1), 0.6);
    const ringFx = new THREE.Mesh(new THREE.RingGeometry(0.09, 0.105, 48), ringMat.clone()); inner.add(ringFx);
    return { M, inner, els, sx, pod, padM, frameG, sideCurve, ringFx };
  }
  const mods = [makeModule(1), makeModule(-1)];
  anchor('module', mods[0].frameG, mods[0].sideCurve.getPointAt(0.7).clone().add(new THREE.Vector3(0.05, 0, 0)));
  anchor('pod', mods[0].frameG, mods[0].pod.position.clone().add(new THREE.Vector3(0.1, 0.05, 0)));
  anchor('electrode', mods[0].els[4].group, mods[0].els[4].puck.position.clone());
  anchor('pad', mods[0].padM.parent, mods[0].padM.position.clone());
  skin.side = THREE.FrontSide;

  root.position.y = opts.rootY ?? 0.42;
  const state = { progress: 1, active: -1, yaw: -0.38, pitch: 0, side: 0, explode: 0, time: 0 };
  function resize() {
    const w = canvas.clientWidth || canvas.width, h = canvas.clientHeight || canvas.height;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    camera.position.set(0, 0.25, 11.6 / (opts.fit || 1) * Math.max(1, (opts.wfit || 0.9) / camera.aspect));
    camera.lookAt(0, opts.lookY ?? -0.05, 0); camera.updateProjectionMatrix();
  }
  resize();

  const outDir = sx => new THREE.Vector3(sx * 1.6, 0.35, -0.2);
  function apply() {
    root.rotation.y = state.yaw; root.rotation.x = state.pitch;
    const ex = ease(state.explode);
    parts.forEach(pt => {
      const t = ease((state.progress - pt.delay) / 0.4);
      pt.obj.position.copy(pt.home).addScaledVector(pt.from, 1 - t).addScaledVector(pt.ex, ex);
      pt.obj.visible = t > 0.001;
    });
    const mount = [1 - clamp(state.side * 2), clamp(state.side * 2 - 1)];
    mods.forEach((m, k) => {
      const e = ease(mount[k]);
      m.M.position.copy(outDir(m.sx)).multiplyScalar(1 - e);
      m.M.visible = mount[k] > 0.002 && state.progress > 0.12;
      const c = covers[k]; const cv = ease(clamp((1 - mount[k]) * 1.6 - 0.3)) * ease((state.progress - 0.1) / 0.4);
      c.scale.setScalar(Math.max(0.001, cv)); c.visible = cv > 0.01;
    });
    const am = mods[state.side < 0.5 ? 0 : 1];
    mods.forEach(m => m.els.forEach((e, i) => {
      const on = m === am && i === state.active;
      e.ring.material = on ? litMat : tealMat; e.dot.material = on ? litMat : tealMat;
    }));
    litMat.emissiveIntensity = 0.55 + 0.45 * Math.sin(state.time * 6.0);
    mods.forEach(m => { m.ringFx.visible = false; });
    if (state.active >= 0) {
      const e = am.els[state.active], r = am.ringFx; const ph = (state.time * 1.1) % 1;
      r.visible = true; r.position.copy(e.puck.position).addScaledVector(e.n, 0.05);
      r.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), e.n); r.scale.setScalar(1 + ph * 1.8); r.material.opacity = 0.7 * (1 - ph);
    }
  }
  function render() { apply(); renderer.render(scene, camera); }
  // swap in a finer bust (progressive loading: light model first, full quality when it arrives)
  function setBody(b) { if (!bodyMesh || !b) return; const g = lite && b.mid ? b.mid : b.body; const old = bodyMesh.geometry; bodyMesh.geometry = g; if (old !== g) old.dispose(); }
  function setDpr(d) { renderer.setPixelRatio(d); resize(); }
  const _v = new THREE.Vector3();
  function toScreen(obj) {
    obj.getWorldPosition(_v); _v.project(camera);
    return { x: (_v.x + 1) / 2 * canvas.clientWidth, y: (1 - _v.y) / 2 * canvas.clientHeight, z: _v.z };
  }
  function screenOf(i) { return toScreen(mods[state.side < 0.5 ? 0 : 1].els[i].puck); }
  function anchorScreen(name) { return toScreen(anchors[name]); }
  render();
  const objects = { root, body: bodyMesh || head, bust, bandG, crownG, dockGroups, covers, mods };
  return { opts, renderer, scene, camera, state, render, resize, setDpr, setBody, sites, screenOf, anchorScreen, objects };
}

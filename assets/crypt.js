// Client-side decryption for the protected files. Each file is AES-256-GCM encrypted with its own random key;
// that key is stored wrapped (AES-GCM) under a key derived from a password with PBKDF2-SHA256.
// Two manifests (papers.json, vault.json) wrap the same file keys under different passwords.
const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const MIME = { pdf: 'application/pdf', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', html: 'text/html', glb: 'model/gltf-binary' };
const dec = (k, buf) => crypto.subtle.decrypt({ name: 'AES-GCM', iv: buf.slice(0, 12) }, k, buf.slice(12));
const mans = {};
export async function manifest(name) { return mans[name] || (mans[name] = await (await fetch(`files/${name}.json`, { cache: 'no-cache' })).json()); }
export async function unlock(name, pass) {
  const m = await manifest(name), base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']);
  const kek = await crypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt: b64(m.salt), iterations: m.it }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
  const ok = new TextDecoder().decode(await dec(kek, b64(m.check))); if (ok !== 'kfs-ok') throw new Error('bad');
  return { name, m, kek };
}
async function fetchBuf(e, onProgress) {
  if (e.chunks) { const parts = []; let n = 0; for (const c of e.chunks) { parts.push(b64((await (await fetch(c)).text()).trim())); n++; onProgress && onProgress(n / e.chunks.length); }
    const out = new Uint8Array(parts.reduce((a, p) => a + p.length, 0)); let o = 0; for (const p of parts) { out.set(p, o); o += p.length; } return out; }
  const r = await fetch(e.path); if (!r.ok) throw new Error('fetch');
  const total = +r.headers.get('content-length') || e.size;
  if (!onProgress || !r.body || !r.body.getReader) return new Uint8Array(await r.arrayBuffer());
  const rd = r.body.getReader();
  const chunks = []; let got = 0; for (;;) { const { done, value } = await rd.read(); if (done) break; chunks.push(value); got += value.length; onProgress(Math.min(1, got / total)); }
  const out = new Uint8Array(got); let o = 0; for (const c of chunks) { out.set(c, o); o += c.length; } return out;
}
export async function fileBlob(sess, f, onProgress) {
  const e = sess.m.files[f]; const raw = await dec(sess.kek, b64(e.key));
  const k = await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt']);
  const plain = await dec(k, await fetchBuf(e, onProgress));
  return new Blob([plain], { type: MIME[f.split('.').pop()] || 'application/octet-stream' });
}
export const sizeOf = (sess, f) => sess ? sess.m.files[f].size : 0;

// Backend history bersama untuk Lap Timer (Netlify Functions + Netlify Blobs)
// Endpoint: /.netlify/functions/sessions
//   GET            -> daftar semua sesi bersama
//   POST           -> simpan 1 sesi (body JSON)
//   DELETE ?id=123 -> hapus 1 sesi (pembuat sesi atau admin)
//   DELETE ?all=1  -> hapus semua sesi milik sendiri (admin: semua sesi)
import { connectLambda, getStore } from '@netlify/blobs';

const json = (statusCode, data) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

const str = (v, max) => String(v == null ? '' : v).slice(0, max);

export const handler = async (event, context) => {
  // Netlify memverifikasi Bearer token dan mengisi clientContext.user
  const user = context.clientContext && context.clientContext.user;
  if (!user) return json(401, { error: 'Harus login.' });

  connectLambda(event); // wajib untuk mode Lambda compatibility
  const store = getStore('lap-timer-sessions');

  const email = user.email || user.sub || 'unknown';
  const roles = (user.app_metadata && user.app_metadata.roles) || [];
  const isAdmin = Array.isArray(roles) && roles.includes('admin');

  try {
    if (event.httpMethod === 'GET') {
      const { blobs } = await store.list({ prefix: 'session:' });
      const items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })));
      const sessions = items.filter(Boolean).sort((a, b) => b.id - a.id).slice(0, 300);
      return json(200, { sessions, me: { email, isAdmin } });
    }

    if (event.httpMethod === 'POST') {
      const s = JSON.parse(event.body || '{}');
      if (!Number.isFinite(s.id) || !Array.isArray(s.laps) || s.laps.length === 0 || s.laps.length > 1000) {
        return json(400, { error: 'Data sesi tidak valid.' });
      }
      const key = 'session:' + s.id;
      if (await store.get(key, { type: 'json' })) return json(200, { ok: true, duplicate: true }); // aman untuk retry

      const clean = {
        id: s.id,
        date: str(s.date, 20),
        sessionName: str(s.sessionName, 80),
        low: str(s.low, 40),
        high: str(s.high, 40),
        notes: str(s.notes, 2000),
        laps: s.laps.map((l) => ({
          number: Number(l.number) || 0,
          duration: Number(l.duration) || 0,
          total: Number(l.total) || 0,
          note: str(l.note, 500),
        })),
        summary: {
          totalLaps: Number(s.summary && s.summary.totalLaps) || s.laps.length,
          avg: str(s.summary && s.summary.avg, 20),
          best: str(s.summary && s.summary.best, 20),
          total: str(s.summary && s.summary.total, 20),
        },
        by: email,
        savedAt: Date.now(),
      };
      await store.setJSON(key, clean);
      return json(200, { ok: true });
    }

    if (event.httpMethod === 'DELETE') {
      const q = event.queryStringParameters || {};

      if (q.all) {
        const { blobs } = await store.list({ prefix: 'session:' });
        let deleted = 0;
        for (const b of blobs) {
          const item = await store.get(b.key, { type: 'json' });
          if (item && (isAdmin || item.by === email)) { await store.delete(b.key); deleted++; }
        }
        return json(200, { ok: true, deleted });
      }

      const id = Number(q.id);
      if (!Number.isFinite(id)) return json(400, { error: 'ID tidak valid.' });
      const key = 'session:' + id;
      const item = await store.get(key, { type: 'json' });
      if (!item) return json(200, { ok: true }); // sudah tidak ada
      if (!isAdmin && item.by !== email) return json(403, { error: 'Hanya pembuat sesi atau admin.' });
      await store.delete(key);
      return json(200, { ok: true });
    }

    return json(405, { error: 'Method tidak didukung.' });
  } catch (err) {
    console.error('sessions error:', err);
    return json(500, { error: 'Kesalahan server.' });
  }
};

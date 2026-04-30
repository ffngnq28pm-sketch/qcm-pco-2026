import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'classement.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE))    fs.writeFileSync(DATA_FILE,    '[]');
if (!fs.existsSync(SESSIONS_FILE)) fs.writeFileSync(SESSIONS_FILE, '[]');

function lire(fichier) {
  try { return JSON.parse(fs.readFileSync(fichier, 'utf-8')); }
  catch { return []; }
}
function ecrire(fichier, data) {
  fs.writeFileSync(fichier, JSON.stringify(data, null, 2));
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// ── Classement actif ──────────────────────────────────

app.get('/api/classement', (req, res) => res.json(lire(DATA_FILE)));

app.post('/api/classement', (req, res) => {
  const entry = { ...req.body, id: Date.now() };
  const classement = lire(DATA_FILE);
  classement.push(entry);
  classement.sort((a, b) => b.score - a.score || a.temps - b.temps);
  ecrire(DATA_FILE, classement);
  res.json(classement);
});

app.delete('/api/classement', (req, res) => {
  ecrire(DATA_FILE, []);
  res.json([]);
});

// ── Sessions archivées ────────────────────────────────

// Lister toutes les sessions
app.get('/api/sessions', (req, res) => res.json(lire(SESSIONS_FILE)));

// Sauvegarder une session (appelé juste avant réinitialisation)
app.post('/api/sessions', (req, res) => {
  const { manager, classement } = req.body;
  const sessions = lire(SESSIONS_FILE);
  sessions.unshift({
    id: Date.now(),
    manager,
    date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
    participants: classement.length,
    classement
  });
  ecrire(SESSIONS_FILE, sessions);
  res.json(sessions);
});

// Supprimer une session
app.delete('/api/sessions/:id', (req, res) => {
  const sessions = lire(SESSIONS_FILE).filter(s => s.id !== parseInt(req.params.id));
  ecrire(SESSIONS_FILE, sessions);
  res.json(sessions);
});

// Supprimer toutes les sessions
app.delete('/api/sessions', (req, res) => {
  ecrire(SESSIONS_FILE, []);
  res.json([]);
});

// ── Frontend ──────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Serveur QCM PCO démarré sur le port ${PORT}`));

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'classement.json');

// Créer le dossier data s'il n'existe pas
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');

function lireClassement() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function sauvegarder(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.use(cors());
app.use(express.json());

// Servir le frontend React buildé
app.use(express.static(path.join(__dirname, 'dist')));

// --- API classement ---

// Récupérer le classement
app.get('/api/classement', (req, res) => {
  res.json(lireClassement());
});

// Ajouter un résultat
app.post('/api/classement', (req, res) => {
  const entry = { ...req.body, id: Date.now() };
  const classement = lireClassement();
  classement.push(entry);
  classement.sort((a, b) => b.score - a.score || a.temps - b.temps);
  sauvegarder(classement);
  res.json(classement);
});

// Réinitialiser le classement
app.delete('/api/classement', (req, res) => {
  sauvegarder([]);
  res.json([]);
});

// Toutes les autres routes → React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Serveur QCM PCO démarré sur le port ${PORT}`);
});

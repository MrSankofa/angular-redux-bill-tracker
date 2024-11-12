/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

const db = new sqlite3.Database('bills.db');
app.use(express.json());
app.use(cors());

db.run(`
  CREATE TABLE IF NOT EXISTS bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    dueDate TEXT,
    amount REAL,
    bankAccount TEXT
  )
`);

app.get('/api/bills', (req, res) => {
  db.all('SELECT * FROM bills', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/bills', (req, res) => {
  const { name, dueDate, amount, bankAccount } = req.body;
  db.run(
    `INSERT INTO bills (name, dueDate, amount, bankAccount) VALUES (?, ?, ?, ?)`,
    [name, dueDate, amount, bankAccount],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.put('/api/bills/:id', (req, res) => {
  const { name, dueDate, amount, bankAccount } = req.body;
  db.run(
    `UPDATE bills SET name = ?, dueDate = ?, amount = ?, bankAccount = ? WHERE id = ?`,
    [name, dueDate, amount, bankAccount, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

app.delete('/api/bills/:id', (req, res) => {
  db.run(`DELETE FROM bills WHERE id = ?`, req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

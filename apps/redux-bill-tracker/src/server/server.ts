import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = 3000;

// Use JSON middleware
app.use(express.json());

// Initialize SQLite3 database
const db = new sqlite3.Database('./bills.db');

// Create the bills table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS bills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      dueDate TEXT,
      amount REAL,
      bankAccount TEXT
    )
  `);
});

// Define TypeScript interfaces for request bodies
interface Bill {
  id?: number;
  name: string;
  dueDate: string;
  amount: number;
  bankAccount: string;
}

// GET /api/bills - Retrieve all bills
app.get('/api/bills', (req: Request, res: Response) => {
  db.all('SELECT * FROM bills', [], (err, rows: Bill[]) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json(rows);
  });
});

// POST /api/bills - Create a new bill
app.post('/api/bills', (req: Request<NonNullable<unknown>, NonNullable<unknown>, Bill>, res: Response) => {
  const { name, dueDate, amount, bankAccount } = req.body;
  const query = `INSERT INTO bills (name, dueDate, amount, bankAccount) VALUES (?, ?, ?, ?)`;
  const params = [name, dueDate, amount, bankAccount];

  db.run(query, params,  (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this });
    return
  });
});

// PUT /api/bills/:id - Update a bill
app.put('/api/bills/:id', (req: Request<{ id: string }, NonNullable<unknown>, Bill>, res: Response) => {
  const { name, dueDate, amount, bankAccount } = req.body;
  const query = `UPDATE bills SET name = ?, dueDate = ?, amount = ?, bankAccount = ? WHERE id = ?`;
  const params = [name, dueDate, amount, bankAccount, req.params.id];

  db.run(query, params,  (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ updated: this });
    return
  });
});

// DELETE /api/bills/:id - Delete a bill
app.delete('/api/bills/:id', (req: Request<{ id: string }>, res: Response) => {
  const query = `DELETE FROM bills WHERE id = ?`;
  const params = [req.params.id];

  db.run(query, params,  (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ deleted: this });
    return
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


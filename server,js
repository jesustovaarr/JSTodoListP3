// server.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let todos = [
  { id: 0, title: 'Learn JS', description: 'Watch JS tutorials', completed: false }
];
let currentId = 1;

app.get('/api/todos', (req, res) => res.json(todos));

app.post('/api/todos', (req, res) => {
  const todo = { id: currentId++, ...req.body };
  todos.push(todo);
  res.json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  todos[index] = { ...todos[index], ...req.body };
  res.json(todos[index]);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));

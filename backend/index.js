const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const port = 5000;

let tasks = []; // In-memory storage for tasks

// Fetch all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: 'Task content is required' });

  const newTask = {
    id: Date.now(),
    task,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) return res.status(404).json({ error: 'Task not found' });
  
  task.completed = completed;
  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== parseInt(id));
  res.status(204).send();
});


app.listen(port, () => console.log(`Server running on port ${port}`));
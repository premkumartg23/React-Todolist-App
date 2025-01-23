import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask }),
    })
      .then((res) => res.json())
      .then((task) => setTasks([...tasks, task]));

    setNewTask('');
  };

  const toggleComplete = (id, completed) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    }).then(() => setTasks(tasks.filter((task) => task.id !== id)));
  };

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column', padding: '20px' }}>
      <h1>Todo List</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          style={{ padding: '10px', width: '300px', borderRadius: '4px', border: '1px solid grey' }}
        />
        <button onClick={addTask} style={{ padding: '10px 20px', borderRadius: '4px', background: '#007BFF', color: 'primary', cursor: 'pointer' }}>Add Task</button>
      </div>
      <ul style={{ width: '100%', maxWidth: '400px' }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px',  padding: '10px', border: '1px solid black' }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id, task.completed)}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                flex: 1,
              }}
            >
              {task.task}
            </span>
            <button onClick={() => deleteTask(task.id)} style={{ padding: '5px 10px', color: 'red', cursor: 'pointer' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

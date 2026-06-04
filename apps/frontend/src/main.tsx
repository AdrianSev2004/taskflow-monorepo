import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CreateTaskInput, priorities, Task, validateTaskInput } from '@taskflow/shared';
import './styles.css';

const API_URL = 'http://localhost:3000/api/tasks';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<CreateTaskInput>({
    title: '',
    course: '',
    priority: 'Media'
  });
  const [error, setError] = useState('');

  async function loadTasks() {
    const response = await fetch(API_URL);
    const data = (await response.json()) as Task[];
    setTasks(data);
  }

  useEffect(() => {
    loadTasks().catch(() => setError('No se pudieron cargar las tareas.'));
  }, []);

  const pendingTasks = useMemo(() => tasks.filter((task) => !task.completed), [tasks]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const errors = validateTaskInput(form);
    if (errors.length > 0) {
      setError(errors.join(' '));
      return;
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      setError('No se pudo crear la tarea.');
      return;
    }

    setForm({ title: '', course: '', priority: 'Media' });
    await loadTasks();
  }

  async function completeTask(id: number) {
    await fetch(`${API_URL}/${id}/complete`, { method: 'PATCH' });
    await loadTasks();
  }

  async function deleteTask(id: number) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    await loadTasks();
  }

  return (
    <main className="container">
      <section className="hero">
        <h1>Gestion de Incidencias de transito</h1>
        <p>Sistema básico para gestionar flujo de incidencias de tráfico</p>
      </section>

      <section className="panel">
        <h2>Registrar nueva tarea</h2>
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            placeholder="Título de la tarea"
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />

          <input
            type="text"
            placeholder="Zona"
            value={form.course}
            onChange={(event) => setForm({ ...form, course: event.target.value })}
          />

          <select
            value={form.priority}
            onChange={(event) => setForm({ ...form, priority: event.target.value as CreateTaskInput['priority'] })}
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>

          <button type="submit">Agregar tarea</button>
        </form>
        {error && <p className="error">{error}</p>}
      </section>

      <section className="panel">
        <div className="section-title">
          <h2>Tareas pendientes</h2>
          <span>{pendingTasks.length} pendientes</span>
        </div>

        <div className="task-list">
          {tasks.length === 0 && <p>No hay tareas registradas.</p>}

          {tasks.map((task) => (
            <article key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
              <div>
                <h3>{task.title}</h3>
                <p>Zona: {task.course}</p>
                <p>Prioridad: {task.priority}</p>
                <p>Estado: {task.completed ? 'Completada' : 'Pendiente'}</p>
              </div>
              <div className="actions">
                {!task.completed && (
                  <button onClick={() => completeTask(task.id)}>Completar</button>
                )}
                <button className="danger" onClick={() => deleteTask(task.id)}>
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

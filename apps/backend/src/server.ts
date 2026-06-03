import cors from 'cors';
import express, { Request, Response } from 'express';
import { CreateTaskInput, Task, validateTaskInput } from '@taskflow/shared';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let nextId = 3;

let tasks: Task[] = [
  {
    id: 1,
    title: 'Estudiar arquitectura de software',
    course: 'Arquitectura de Software',
    priority: 'Alta',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Preparar exposición de monorepo',
    course: 'Ingeniería de Sistemas',
    priority: 'Media',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

app.get('/api/tasks', (_req: Request, res: Response) => {
  res.json(tasks);
});

app.post('/api/tasks', (req: Request, res: Response) => {
  const input = req.body as CreateTaskInput;
  const errors = validateTaskInput(input);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const newTask: Task = {
    id: nextId++,
    title: input.title.trim(),
    course: input.course.trim(),
    priority: input.priority,
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

app.patch('/api/tasks/:id/complete', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({ message: 'Tarea no encontrada.' });
  }

  task.completed = true;
  return res.json(task);
});

app.delete('/api/tasks/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ message: 'Tarea no encontrada.' });
  }

  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`TaskFlow backend running on http://localhost:${PORT}`);
});

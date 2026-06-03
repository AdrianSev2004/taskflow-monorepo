export type TaskPriority = 'Alta' | 'Media' | 'Baja';

export interface Task {
  id: number;
  title: string;
  course: string;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string;
}

export interface CreateTaskInput {
  title: string;
  course: string;
  priority: TaskPriority;
}

export const priorities: TaskPriority[] = ['Alta', 'Media', 'Baja'];

export function isValidPriority(priority: string): priority is TaskPriority {
  return priorities.includes(priority as TaskPriority);
}

export function validateTaskInput(input: Partial<CreateTaskInput>): string[] {
  const errors: string[] = [];

  if (!input.title || input.title.trim().length < 3) {
    errors.push('El título debe tener al menos 3 caracteres.');
  }

  if (!input.course || input.course.trim().length < 2) {
    errors.push('El curso debe tener al menos 2 caracteres.');
  }

  if (!input.priority || !isValidPriority(input.priority)) {
    errors.push('La prioridad debe ser Alta, Media o Baja.');
  }

  return errors;
}

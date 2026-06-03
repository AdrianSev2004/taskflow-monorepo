# TaskFlow University - Monorepo

TaskFlow University es un proyecto universitario sencillo para demostrar el uso de **monorepo** y otros aspectos de desarrollo moderno. La aplicación permite registrar tareas académicas, listarlas, marcarlas como completadas, eliminarlas y clasificarlas por curso o prioridad.

## Objetivo del proyecto

El objetivo principal es mostrar cómo organizar un proyecto con frontend, backend y código compartido dentro de un mismo repositorio. El frontend y el backend usan tipos y validaciones comunes desde `packages/shared`.

## Arquitectura del monorepo

```text
taskflow-monorepo/
├── apps/
│   ├── frontend/
│   └── backend/
├── packages/
│   └── shared/
├── package.json
├── turbo.json
└── README.md
```

## Tecnologías usadas

- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express + TypeScript
- Paquete compartido: TypeScript
- Monorepo: npm workspaces + Turborepo

## Instalación

Desde la raíz del proyecto:

```bash
npm install
```

## Ejecución

Ejecutar frontend y backend al mismo tiempo:

```bash
npm run dev
```

También se puede ejecutar por separado:

```bash
npm run dev --workspace=apps/backend
npm run dev --workspace=apps/frontend
```

## Endpoints del backend

Base URL:

```text
http://localhost:3000/api/tasks
```

Rutas principales:

- `GET /api/tasks` - Lista todas las tareas.
- `POST /api/tasks` - Crea una tarea.
- `PATCH /api/tasks/:id/complete` - Marca una tarea como completada.
- `DELETE /api/tasks/:id` - Elimina una tarea.

## Cómo se demuestra el uso de monorepo

Este proyecto demuestra monorepo porque:

1. El frontend, backend y paquete compartido viven dentro de un solo repositorio.
2. El frontend y backend reutilizan los tipos `Task`, `TaskPriority` y `CreateTaskInput` desde `packages/shared`.
3. Las validaciones de tareas están centralizadas en `packages/shared`.
4. Los comandos principales se ejecutan desde la raíz usando npm workspaces y Turborepo.
5. La estructura permite escalar el proyecto agregando nuevas apps o paquetes sin cambiar la organización principal.

## Ventajas del monorepo aplicadas al proyecto

- **Reutilización de código:** los tipos y validaciones no se duplican.
- **Consistencia:** frontend y backend trabajan con las mismas estructuras.
- **Mantenibilidad:** los cambios en modelos compartidos se hacen en un solo lugar.
- **Coordinación:** una funcionalidad puede modificarse en frontend, backend y shared en el mismo commit.
- **Escalabilidad:** se pueden agregar nuevos paquetes, como `ui`, `auth` o `database`.

## Nota

Este proyecto usa almacenamiento en memoria para mantenerlo simple. Al reiniciar el backend, las tareas vuelven al estado inicial.

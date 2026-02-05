// ==========================================
// COMPONENTE: TaskList
// Lista de tareas usando Web Components
// ==========================================

import { useRef, useEffect } from 'react';

function TaskList({ tasks, onToggleTask, onDeleteTask, onClearAll }) {
  const taskContainerRef = useRef(null);

  // Event listeners para Web Components
  useEffect(() => {
    const container = taskContainerRef.current;
    
    if (container) {
      // Handler para toggle de tarea
      const handleToggle = (e) => {
        const taskId = parseInt(e.detail.taskId);
        onToggleTask(taskId);
      };

      // Handler para eliminar tarea
      const handleDelete = (e) => {
        const taskId = parseInt(e.detail.taskId);
        onDeleteTask(taskId);
      };

      // Registra los event listeners
      container.addEventListener('toggle-task', handleToggle);
      container.addEventListener('delete-task', handleDelete);

      // Cleanup: remueve listeners al desmontar
      return () => {
        container.removeEventListener('toggle-task', handleToggle);
        container.removeEventListener('delete-task', handleDelete);
      };
    }
  }, [tasks, onToggleTask, onDeleteTask]);

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0"><i className="bi bi-list-check me-2"></i>Mis Tareas</h4>
        {tasks.length > 0 && (
          <button 
            onClick={onClearAll}
            className="btn btn-outline-danger btn-sm"
          >
            <i className="bi bi-trash me-2"></i>Eliminar todas
          </button>
        )}
      </div>

      {/* Contenedor de Web Components */}
      <div ref={taskContainerRef}>
        {tasks.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            <h5><i className="bi bi-inbox me-2"></i>No hay tareas</h5>
            <p className="mb-0">¡Agrega tu primera tarea arriba!</p>
          </div>
        ) : (
          tasks.map((task) => (
            // Web Component personalizado <task-card>
            <task-card
              key={task.id}
              task-id={task.id}
              title={task.title}
              completed={task.completed.toString()}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;

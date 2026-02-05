// ==========================================
// COMPONENTE: TaskForm
// Formulario para agregar nuevas tareas
// ==========================================

import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Llama a la función del componente padre (la validación se hace en App.jsx)
    onAddTask(newTaskTitle);
    
    // Limpia el input
    setNewTaskTitle('');
  };

  return (
    <div className="card shadow-lg mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3"><i className="bi bi-plus-circle me-2"></i>Agregar Nueva Tarea</h5>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Escribe el título de tu tarea..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              maxLength="100"
            />
          </div>
          <div className="col-md-3">
            <button 
              type="submit" 
              className="btn btn-primary btn-lg w-100"
            >
              <i className="bi bi-plus-lg me-2"></i>Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;

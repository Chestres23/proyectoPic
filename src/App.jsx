// ==========================================
// TASK MANAGER PWA - APLICACIÓN PRINCIPAL
// ==========================================
// Aplicación React para gestión de tareas
// Características:
// - Agregar, eliminar, completar tareas
// - Persistencia en localStorage
// - Integración con Web Components
// - Bootstrap 5 para UI
// ==========================================

import { useState, useEffect } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskStats from './components/TaskStats'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import Toast from './components/Toast'
import ConfirmModal from './components/ConfirmModal'
import './App.css'

function App() {
  // ==========================================
  // ESTADO DE LA APLICACIÓN
  // ==========================================
  
  // Lista de tareas
  const [tasks, setTasks] = useState([]);

  // Toast notification
  const [toast, setToast] = useState(null);

  // Modal de confirmación
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: null, // 'delete-one' o 'delete-all'
    taskId: null
  });

  // ==========================================
  // EFECTO: Cargar tareas desde localStorage
  // Se ejecuta una vez al montar el componente
  // ==========================================
  useEffect(() => {
    const savedTasks = localStorage.getItem('pwa-tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
        console.log('✅ Tareas cargadas desde localStorage:', parsedTasks);
      } catch (error) {
        console.error('❌ Error al cargar tareas:', error);
      }
    }
  }, []);

  // ==========================================
  // EFECTO: Guardar tareas en localStorage
  // Se ejecuta cada vez que cambia el array de tareas
  // ==========================================
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('pwa-tasks', JSON.stringify(tasks));
      console.log('💾 Tareas guardadas en localStorage');
    }
  }, [tasks]);

  // ==========================================
  // FUNCIÓN: Agregar nueva tarea
  // ==========================================
  const addTask = (title) => {
    if (title.trim() === '') {
      setToast({
        message: 'Por favor ingresa un título para la tarea',
        type: 'warning'
      });
      return;
    }

    // Crea nueva tarea
    const newTask = {
      id: Date.now(), // ID único basado en timestamp
      title: title,
      completed: false
    };

    // Agrega la tarea al estado
    setTasks([...tasks, newTask]);
    
    // Muestra toast de éxito
    setToast({
      message: 'Tarea agregada correctamente',
      type: 'success'
    });
    
    console.log('✅ Nueva tarea agregada:', newTask);
  };

  // ==========================================
  // FUNCIÓN: Marcar tarea como completada/pendiente
  // ==========================================
  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
    console.log('🔄 Tarea actualizada:', taskId);
  };

  // ==========================================
  // FUNCIÓN: Eliminar tarea
  // ==========================================
  const deleteTask = (taskId) => {
    setConfirmModal({
      isOpen: true,
      type: 'delete-one',
      taskId: taskId
    });
  };

  // ==========================================
  // FUNCIÓN: Confirmar eliminación de tarea
  // ==========================================
  const confirmDeleteTask = () => {
    const { taskId } = confirmModal;
    setTasks(tasks.filter(task => task.id !== taskId));
    setConfirmModal({ isOpen: false, type: null, taskId: null });
    setToast({
      message: 'Tarea eliminada correctamente',
      type: 'success'
    });
  };

  // ==========================================
  // FUNCIÓN: Eliminar todas las tareas
  // ==========================================
  const clearAllTasks = () => {
    if (tasks.length === 0) {
      setToast({
        message: 'No hay tareas para eliminar',
        type: 'info'
      });
      return;
    }
    setConfirmModal({
      isOpen: true,
      type: 'delete-all',
      taskId: null
    });
  };

  // ==========================================
  // FUNCIÓN: Confirmar eliminación de todas las tareas
  // ==========================================
  const confirmDeleteAllTasks = () => {
    setTasks([]);
    localStorage.removeItem('pwa-tasks');
    setConfirmModal({ isOpen: false, type: null, taskId: null });
    setToast({
      message: 'Todas las tareas han sido eliminadas',
      type: 'success'
    });
  };

  // ==========================================
  // ESTADÍSTICAS
  // ==========================================
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // ==========================================
  // RENDERIZADO
  // ==========================================
  return (
    <div className="container py-5">
      
      {/* Header */}
      <Header />

      {/* Formulario para agregar tareas */}
      <TaskForm onAddTask={addTask} />

      {/* Estadísticas */}
      <TaskStats 
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />

      {/* Lista de tareas */}
      <TaskList 
        tasks={tasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
        onClearAll={clearAllTasks}
      />

      {/* Footer */}
      <Footer />

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Confirm Modal */}
      {confirmModal.isOpen && (
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          title={confirmModal.type === 'delete-one' ? '¿Eliminar tarea?' : '¿Eliminar todas las tareas?'}
          message={
            confirmModal.type === 'delete-one'
              ? '¿Estás seguro de que quieres eliminar esta tarea?'
              : '¿Estás seguro de que quieres eliminar TODAS las tareas? Esta acción no se puede deshacer.'
          }
          onConfirm={confirmModal.type === 'delete-one' ? confirmDeleteTask : confirmDeleteAllTasks}
          onCancel={() => setConfirmModal({ isOpen: false, type: null, taskId: null })}
          confirmText="Eliminar"
          cancelText="Cancelar"
        />
      )}

    </div>
  )
}

export default App


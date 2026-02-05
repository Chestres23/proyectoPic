// ==========================================
// COMPONENTE: TaskStats
// Muestra estadísticas de las tareas
// ==========================================

function TaskStats({ totalTasks, completedTasks, pendingTasks }) {
  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="card text-center border-primary">
          <div className="card-body">
            <h3 className="text-primary">{totalTasks}</h3>
            <p className="mb-0">Total</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-center border-warning">
          <div className="card-body">
            <h3 className="text-warning">{pendingTasks}</h3>
            <p className="mb-0">Pendientes</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-center border-success">
          <div className="card-body">
            <h3 className="text-success">{completedTasks}</h3>
            <p className="mb-0">Completadas</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskStats;

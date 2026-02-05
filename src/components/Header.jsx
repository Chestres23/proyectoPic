// ==========================================
// COMPONENTE: Header
// Encabezado de la aplicación con título
// ==========================================

function Header() {
  return (
    <div className="text-center mb-5 py-5 rounded-lg" style={{
      background: 'linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(102, 126, 234, 0.95) 100%)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 123, 255, 0.3)'
    }}>
      <h1 className="display-3 fw-bolder text-white mb-3" style={{
        textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        letterSpacing: '2px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
      }}>
        Task Manager PWA
      </h1>
      <p className="lead text-white mb-4 fw-500" style={{
        fontSize: '1.3rem',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
      }}>
        Gestiona tus tareas de forma simple y offline
      </p>
      <div className="badge bg-light text-primary fs-6 px-4 py-3" style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        fontWeight: '600'
      }}>
        <i className="bi bi-check-circle me-2"></i>
        Cristopher Lasluiza - Christian Vasconez
      </div>
    </div>
  );
}

export default Header;

// ==========================================
// COMPONENTE: Footer
// Pie de página con información del proyecto
// ==========================================

function Footer() {
  return (
    <div className="card bg-light mt-5">
      <div className="card-body text-center">
        <h6 className="text-muted mb-2"><i className="bi bi-gear me-2"></i>Tecnologías utilizadas:</h6>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <span className="badge bg-primary"><i className="bi bi-code-square me-1"></i>React</span>
          <span className="badge bg-secondary"><i className="bi bi-bootstrap me-1"></i>Bootstrap 5</span>
          <span className="badge bg-success"><i className="bi bi-puzzle me-1"></i>Web Components</span>
          <span className="badge bg-info text-dark"><i className="bi bi-phone me-1"></i>PWA</span>
          <span className="badge bg-warning text-dark"><i className="bi bi-database me-1"></i>localStorage</span>
          <span className="badge bg-danger"><i className="bi bi-tools me-1"></i>Service Worker</span>
        </div>
        <p className="text-muted mt-3 mb-0 small">
          Task Manager PWA - LASLUIZA - VASCONEZ | 2026
        </p>
      </div>
    </div>
  );
}

export default Footer;

<link 
  rel="stylesheet" 
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
/>

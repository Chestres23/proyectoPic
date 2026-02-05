// ==========================================
// COMPONENTE: ConfirmModal
// Modal de confirmación para acciones críticas
// ==========================================

function ConfirmModal({ title, message, onConfirm, onCancel, isOpen, confirmText = 'Confirmar', cancelText = 'Cancelar' }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9998 }}
        onClick={onCancel}
      ></div>

      {/* Modal */}
      <div 
        className="position-fixed top-50 start-50 bg-white rounded-lg shadow-lg p-4"
        style={{
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          minWidth: '350px',
          animation: 'slideUp 0.3s ease-in-out'
        }}
      >
        <h5 className="mb-3 text-dark fw-bold">
          <i className="bi bi-exclamation-circle text-warning me-2"></i>
          {title}
        </h5>
        <p className="text-muted mb-4">{message}</p>
        
        <div className="d-flex gap-2">
          <button 
            className="btn btn-secondary flex-grow-1"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className="btn btn-danger flex-grow-1"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmModal;

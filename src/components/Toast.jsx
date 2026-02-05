// ==========================================
// COMPONENTE: Toast
// Sistema de notificaciones emergentes
// ==========================================

import { useState, useEffect } from 'react';

function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgClass = {
    success: 'bg-success',
    error: 'bg-danger',
    warning: 'bg-warning text-dark',
    info: 'bg-info'
  }[type];

  const icon = {
    success: 'bi-check-circle',
    error: 'bi-exclamation-circle',
    warning: 'bi-exclamation-triangle',
    info: 'bi-info-circle'
  }[type];

  return (
    <div className={`position-fixed bottom-0 end-0 m-3 ${bgClass} text-white p-3 rounded-lg shadow-lg`}
         style={{
           animation: 'slideIn 0.3s ease-in-out',
           minWidth: '300px',
           zIndex: 9999
         }}>
      <div className="d-flex align-items-center">
        <i className={`bi ${icon} me-2`}></i>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;

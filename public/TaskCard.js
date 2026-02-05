// ==========================================
// WEB COMPONENT - CUSTOM ELEMENT
// <task-card>
// ==========================================
// Custom Element que extiende HTMLElement
// Renderiza una tarjeta de tarea con Bootstrap
// Reutilizable e independiente
// ==========================================

class TaskCard extends HTMLElement {
  constructor() {
    super();
    // Inicializa el componente
  }

  // ==========================================
  // MÉTODO: connectedCallback()
  // Se ejecuta cuando el elemento se añade al DOM
  // ==========================================
  connectedCallback() {
    // Obtiene los atributos del elemento
    const title = this.getAttribute('title') || 'Sin título';
    const completed = this.getAttribute('completed') === 'true';
    const taskId = this.getAttribute('task-id') || '0';

    // Renderiza el HTML usando Bootstrap
    this.innerHTML = `
      <div class="card shadow-sm mb-3 ${completed ? 'border-success' : 'border-primary'}" 
           style="transition: all 0.3s ease;">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            
            <!-- Checkbox y título de la tarea -->
            <div class="d-flex align-items-center flex-grow-1">
              <input 
                type="checkbox" 
                class="form-check-input me-3" 
                ${completed ? 'checked' : ''}
                data-task-id="${taskId}"
                style="cursor: pointer; width: 20px; height: 20px;"
              />
              <h5 class="card-title mb-0 ${completed ? 'text-decoration-line-through text-muted' : 'text-dark'}">
                ${title}
              </h5>
            </div>

            <!-- Badge de estado -->
            <span class="badge ${completed ? 'bg-success' : 'bg-warning text-dark'} me-2">
              <i class="bi ${completed ? 'bi-check-circle' : 'bi-hourglass'} me-1"></i>
              ${completed ? 'Completada' : 'Pendiente'}
            </span>

            <!-- Botón eliminar -->
            <button 
              class="btn btn-danger btn-sm delete-btn" 
              data-task-id="${taskId}"
              title="Eliminar tarea"
            >
              <i class="bi bi-trash me-1"></i>Eliminar
            </button>
          </div>
        </div>
      </div>
    `;

    // Event listeners para los botones dentro del Web Component
    const checkbox = this.querySelector('input[type="checkbox"]');
    const deleteBtn = this.querySelector('.delete-btn');

    // Evento para marcar como completada
    if (checkbox) {
      checkbox.addEventListener('change', (e) => {
        // Dispara un evento personalizado que React puede escuchar
        this.dispatchEvent(new CustomEvent('toggle-task', {
          bubbles: true,
          detail: { taskId: taskId }
        }));
      });
    }

    // Evento para eliminar
    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        // Dispara un evento personalizado que React puede escuchar
        this.dispatchEvent(new CustomEvent('delete-task', {
          bubbles: true,
          detail: { taskId: taskId }
        }));
      });
    }
  }

  // ==========================================
  // MÉTODO: disconnectedCallback()
  // Se ejecuta cuando el elemento se elimina del DOM
  // ==========================================
  disconnectedCallback() {
    // Limpieza si es necesario
    console.log('TaskCard desconectado');
  }

  // ==========================================
  // MÉTODO: attributeChangedCallback()
  // Se ejecuta cuando un atributo observado cambia
  // ==========================================
  static get observedAttributes() {
    return ['title', 'completed'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Vuelve a renderizar cuando cambian los atributos
    if (oldValue !== newValue) {
      this.connectedCallback();
    }
  }
}

// ==========================================
// REGISTRO DEL CUSTOM ELEMENT
// Define el elemento <task-card> en el DOM
// ==========================================
customElements.define('task-card', TaskCard);

console.log('✅ Custom Element <task-card> registrado correctamente');

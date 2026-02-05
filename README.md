# 📝 Task Manager PWA

## 🎯 Descripción

Progressive Web App (PWA) para gestión de tareas desarrollada con **React**, **Bootstrap 5**, **Web Components** y **Service Workers**. Funciona completamente offline y es instalable en dispositivos.

---

## ✨ Características

- ✅ **Agregar tareas** - Crea nuevas tareas fácilmente
- ✅ **Marcar como completada** - Toggle de estado completado/pendiente
- ✅ **Eliminar tareas** - Individual o todas a la vez
- ✅ **Persistencia de datos** - localStorage guarda tus tareas
- ✅ **Funciona offline** - Service Worker con estrategia Cache First
- ✅ **Instalable** - Se puede instalar como app nativa
- ✅ **Responsive** - Bootstrap 5 garantiza adaptabilidad
- ✅ **Web Components** - Custom Element `<task-card>` reutilizable

---

## 🛠️ Tecnologías

| Tecnología | Propósito |
|-----------|-----------|
| **React** | Framework principal de la aplicación |
| **JavaScript** | Lenguaje de programación |
| **Bootstrap 5** | Framework CSS para diseño responsive |
| **Web Components** | Custom Elements (`<task-card>`) |
| **Service Worker** | Funcionalidad offline y caché |
| **PWA** | Aplicación web progresiva instalable |
| **localStorage** | Persistencia de datos en el navegador |
| **Vite** | Build tool y dev server |

---

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en navegador
# http://localhost:5173

# 4. Build para producción
npm run build
npm run preview
```

---

## 📁 Estructura del Proyecto

```
proyectoPic/
├── public/
│   ├── manifest.json          # Configuración PWA
│   ├── service-worker.js      # Service Worker para offline
│   ├── icon-192x192.png       # Icono PWA
│   └── icon-512x512.png       # Icono PWA
│
├── src/
│   ├── components/
│   │   ├── TaskCard.js        # Web Component <task-card>
│   │   ├── Header.jsx         # Componente Header
│   │   ├── TaskForm.jsx       # Formulario agregar tarea
│   │   ├── TaskList.jsx       # Lista de tareas
│   │   ├── TaskStats.jsx      # Estadísticas
│   │   └── Footer.jsx         # Footer
│   │
│   ├── App.jsx                # Componente principal
│   ├── App.css                # Estilos
│   ├── index.css              # Estilos globales
│   └── main.jsx               # Punto de entrada
│
├── index.html                 # HTML principal
└── package.json               # Dependencias
```

---

## 🔧 Componentes React

### App.jsx
Componente principal que maneja el estado global de las tareas y orquesta todos los componentes.

**Estado:**
- `tasks`: Array de tareas con id, title, completed

**Funciones:**
- `addTask()`: Agrega nueva tarea
- `toggleTask()`: Cambia estado completado/pendiente
- `deleteTask()`: Elimina tarea individual
- `clearAllTasks()`: Elimina todas las tareas

### Header.jsx
Muestra el título y descripción de la aplicación.

### TaskForm.jsx
Formulario para agregar nuevas tareas con validación.

**Props:**
- `onAddTask`: Callback para agregar tarea

### TaskStats.jsx
Muestra estadísticas: total, pendientes, completadas.

**Props:**
- `totalTasks`: Número total
- `completedTasks`: Tareas completadas
- `pendingTasks`: Tareas pendientes

### TaskList.jsx
Renderiza la lista de tareas usando Web Components y maneja eventos.

**Props:**
- `tasks`: Array de tareas
- `onToggleTask`: Callback para toggle
- `onDeleteTask`: Callback para eliminar
- `onClearAll`: Callback para eliminar todas

### Footer.jsx
Muestra tecnologías utilizadas.

---

## 🧩 Web Component

### TaskCard.js
Custom Element nativo del navegador que renderiza una tarea.

**Características:**
- Extiende `HTMLElement`
- Usa `connectedCallback()` para renderizar
- Emite eventos personalizados: `toggle-task`, `delete-task`
- Renderiza con clases de Bootstrap

**Atributos:**
- `task-id`: ID de la tarea
- `title`: Título de la tarea
- `completed`: Estado (true/false)

**Eventos:**
```javascript
// Toggle tarea
this.dispatchEvent(new CustomEvent('toggle-task', {
  bubbles: true,
  detail: { taskId: taskId }
}));

// Eliminar tarea
this.dispatchEvent(new CustomEvent('delete-task', {
  bubbles: true,
  detail: { taskId: taskId }
}));
```

---

## ⚙️ Service Worker

### Funcionalidad
El Service Worker (`public/service-worker.js`) permite que la app funcione offline.

### Eventos:

**1. Install**
```javascript
// Cachea archivos necesarios
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('task-manager-v1')
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

**2. Activate**
```javascript
// Limpia cachés antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

**3. Fetch - Cache First Strategy**
```javascript
// Sirve desde caché primero, luego red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request);
      })
  );
});
```

---

## 📱 PWA - Manifest.json

Configuración para hacer la app instalable:

```json
{
  "name": "Task Manager PWA - Gestor de Tareas",
  "short_name": "TaskManager",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#007bff",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

---

## 🔄 Flujo de Datos

### React → Web Component
```jsx
// React pasa datos mediante atributos
<task-card
  task-id={task.id}
  title={task.title}
  completed={task.completed.toString()}
/>
```

### Web Component → React
```javascript
// Web Component emite eventos
container.addEventListener('toggle-task', (e) => {
  const taskId = e.detail.taskId;
  onToggleTask(taskId);
});
```

---

## 💾 Persistencia (localStorage)

### Guardar
```javascript
useEffect(() => {
  if (tasks.length > 0) {
    localStorage.setItem('pwa-tasks', JSON.stringify(tasks));
  }
}, [tasks]);
```

### Cargar
```javascript
useEffect(() => {
  const savedTasks = localStorage.getItem('pwa-tasks');
  if (savedTasks) {
    setTasks(JSON.parse(savedTasks));
  }
}, []);
```

---

## 🎨 Estilos (Bootstrap 5)

La aplicación usa Bootstrap 5 vía CDN en `index.html`:

```html
<link 
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
  rel="stylesheet"
/>
```

**Componentes Bootstrap utilizados:**
- Cards
- Forms
- Buttons
- Badges
- Grid System (responsive)
- Alerts

---

## 🧪 Probar Funcionalidad Offline

1. Abrir DevTools (F12)
2. Ir a **Application** → **Service Workers**
3. Verificar que esté registrado ✅
4. Ir a **Network**
5. Marcar "Offline"
6. Recargar la página
7. **La app sigue funcionando** ✅

---

## 📲 Instalar como PWA

### Desktop (Chrome/Edge):
1. Buscar ícono ➕ en la barra de direcciones
2. Click en "Instalar"
3. La app se abre en ventana independiente

### Móvil (Android/iOS):
1. Abrir en navegador
2. Menú → "Agregar a pantalla de inicio"
3. Ícono aparece como app nativa

---

## 🐛 Troubleshooting

### Service Worker no se registra
- Verificar que estés en `localhost` o `https://`
- Revisar consola de DevTools para errores
- Service Workers no funcionan en `file://`

### Las tareas no se guardan
- Verificar que localStorage esté habilitado
- Ir a DevTools → Application → Local Storage
- Limpiar caché si hay problemas

### Web Components no se renderizan
- Asegurarse de que `TaskCard.js` se carga antes de React
- Verificar que el script esté en `index.html`
- Revisar errores en consola

---

## 📊 Validación Lighthouse

Para verificar que cumple criterios PWA:

1. Abrir DevTools (F12)
2. Pestaña "Lighthouse"
3. Seleccionar "Progressive Web App"
4. Click en "Generate report"

**Criterios evaluados:**
- ✅ Manifest.json válido
- ✅ Service Worker registrado
- ✅ Funciona offline
- ✅ Iconos correctos
- ✅ HTTPS (en producción)

---

## 🎓 Conceptos Académicos Implementados

### React Hooks
- `useState`: Manejo de estado
- `useEffect`: Efectos secundarios (localStorage, eventos)
- `useRef`: Referencias al DOM

### Patrones de Diseño
- **Component-based Architecture**: Separación en componentes reutilizables
- **Event-driven**: Comunicación mediante eventos personalizados
- **Cache First Strategy**: Optimización de rendimiento
- **Progressive Enhancement**: Funcionalidad básica + mejoras

### APIs del Navegador
- **Service Worker API**: Funcionalidad offline
- **Custom Elements API**: Web Components nativos
- **LocalStorage API**: Persistencia de datos
- **Fetch API**: Peticiones HTTP

---

## 📖 Recursos Adicionales

- [React Documentation](https://react.dev/)
- [Bootstrap 5 Docs](https://getbootstrap.com/)
- [MDN Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

---

## 📝 Licencia

Este proyecto es de uso académico y educativo.

---

## 👤 Autor

Desarrollado con fines académicos - 2026

---

¡Disfruta tu Task Manager PWA! 🎉

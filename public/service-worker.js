// ==========================================
// SERVICE WORKER - TASK MANAGER PWA
// ==========================================
// Permite funcionamiento offline mediante 
// estrategia Cache First
// ==========================================

const CACHE_NAME = 'task-manager-v2';

// Archivos que se cachearán para funcionamiento offline
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/App.css',
  '/src/index.css',
  '/TaskCard.js',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  // Bootstrap desde CDN
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js'
];

// ==========================================
// EVENTO: INSTALL
// Se ejecuta cuando el SW se instala por primera vez
// ==========================================
self.addEventListener('install', (event) => {
  console.log('📦 Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Archivos en caché');
        // Cachea todos los archivos necesarios
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('❌ Error al cachear archivos:', error);
      })
  );
  
  // Activa el SW inmediatamente sin esperar
  self.skipWaiting();
});

// ==========================================
// EVENTO: ACTIVATE
// Se ejecuta cuando el SW se activa
// Limpia cachés antiguos
// ==========================================
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker: Activando...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Elimina cachés antiguos
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Eliminando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Toma control de todas las páginas inmediatamente
  self.clients.claim();
});

// ==========================================
// EVENTO: FETCH
// Intercepta todas las peticiones HTTP
// Implementa estrategia Network First para archivos críticos
// Cache First para recursos estáticos
// ==========================================
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Archivos críticos: siempre intenta traer de la red primero
  const criticalFiles = ['index.html', 'main.jsx', 'App.jsx'];
  const isCritical = criticalFiles.some(file => url.pathname.includes(file));
  
  if (isCritical) {
    // Network First para archivos críticos
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Si la respuesta es válida, guarda en caché
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Si no hay conexión, usa caché
          return caches.match(event.request);
        })
    );
  } else {
    // Cache First para recursos estáticos (CSS, iconos, etc.)
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            console.log('📂 Sirviendo desde caché:', event.request.url);
            return cachedResponse;
          }
          
          console.log('🌐 Obteniendo de la red:', event.request.url);
          return fetch(event.request)
            .then((response) => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              
              return response;
            })
            .catch((error) => {
              console.error('❌ Error en fetch:', error);
            });
        })
    );
  }
});

// ==========================================
// SERVICE WORKER - TASK MANAGER PWA
// ==========================================
// Permite funcionamiento offline mediante 
// estrategia Cache First
// ==========================================

const CACHE_NAME = 'task-manager-v1';

// Archivos que se cachearán para funcionamiento offline
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/App.css',
  '/src/index.css',
  '/src/components/TaskCard.js',
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
// Implementa estrategia Cache First
// ==========================================
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Si existe en caché, lo devuelve (Cache First)
        if (cachedResponse) {
          console.log('📂 Sirviendo desde caché:', event.request.url);
          return cachedResponse;
        }
        
        // Si no está en caché, hace fetch a la red
        console.log('🌐 Obteniendo de la red:', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Verifica que la respuesta sea válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clona la respuesta (solo se puede usar una vez)
            const responseToCache = response.clone();
            
            // Guarda en caché para futuras peticiones
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch((error) => {
            console.error('❌ Error en fetch:', error);
            // Aquí podrías devolver una página offline personalizada
          });
      })
  );
});

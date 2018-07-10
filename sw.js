let cacheName = 'test'
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll([
                '/static/home-active@3x.png'
            ])
        })
    )
})

self.addEventListener('fetch', event => {
    console.log('request', event.request)
    event.respondWith(
        caches.match(event.request).then(response => {
            console.log('cache match', event.request)
            if (response) {
                return response
            }
            return fetch(event.request)
        })
    )
})

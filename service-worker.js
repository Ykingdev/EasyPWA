if ('serviceWorker' in navigator) { navigator.serviceWorker.register('serviceworker.js') };

// code below will cache everything! this means changes made to icons or html wont be visible untill you turn this off!

self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("Page")
        .then((cache) =>
          cache.addAll([
            "/EasyPWA/index.html",
            "/EasyPWA/css/output.css"
          ])
        )
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
          return response;
        } else {
          return fetch(event.request)
            .then((response) => {
              // response may be used only once
              // we need to save clone to put one copy in cache
              // and serve second one
              let responseClone = response.clone();
  
              caches.open("Page").then((cache) => {
                cache.put(event.request, responseClone);
              });
              return response;
            })
            .catch(() => caches.match("/EasyPWA/"));
        }
      })
    );
  });
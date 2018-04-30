// after a service worker is installed and the user navigates to a different page or refreshes,the service worker will begin to receive fetch events
          
self.addEventListener('fetch', function(event) {
    event.respondWith(caches.open('cache').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        console.log("cache request: " + event.request.url);
          var fetchPromise = fetch(event.request).then(function(networkResponse) {           
// if we got a response from the cache, update the cache                   
            console.log("fetch completed: " + event.request.url, networkResponse);
              if (networkResponse) {
                console.debug("updated cached page: " + event.request.url, networkResponse);
                  cache.put(event.request, networkResponse.clone());}
                  return networkResponse;
                  }, function (e) {   
// rejected promise - just ignore it, we're offline!   
                  console.log("Error in fetch()", e);
                  e.waitUntil(
                  caches.open('cache').then(function(cache) { // our cache here is named *cache* in the caches.open()
                  return cache.addAll
                  ([            
//cache.addAll(), takes a list of URLs, then fetches them from the server and adds the response to the cache.           
// add your entire site to the cache- as in the code below; for offline access
// If you have some build process for your site, perhaps that could generate the list of possible URLs that a user might load.               
                  '/', // do not remove this
                  '/index.html', //default
                  '/index.html?homescreen=1', //default
                  '/?homescreen=1', //default
                  '/static/css/main.mini.css',// configure as by your site ; just an example
                  'static/css/home.mini.css',
                  'static/css/resources.mini.css',
                  'static/css/composite/schedule.mini.css',
                  'static/js/composite/main.mini.js',
                  'static/js/composite/home.mini.js',
                  'static/js/composite/resources.mini.js',
                  'static/js/composite/schedule.mini.js',
                  '/images/*',// choose images to keep offline; just an example
                  'images/ioextendedeldoret18.JPG',
                  'images/ioattendeeseldoretextended.JPG',
                  'images/hashtag.gif',
                  'images/ioextendedeldoret18.JPG',
                  'images/ioextendedeldoret18.gif',
                  'images/ioextendedeldoret18home.gif',
                  'favicon/ioextended18eldoret.png',
                  'images/gdgmoipromo.JPG',
                  'images/gdgmoihighlight.JPG',
                  'autotrack.min.js',
// Do not replace/delete/edit the sw.js/ and manifest.js paths below
                  'sw.js/',
                  'manifest.js',
//These are links to the extenal social media buttons that should be cached; we have used twitter's as an example
                  'https://platform.twitter.com/widgets.js',       
                  ]);
                  })
                  );
                  });
// respond from the cache, or the network
                  return response || fetchPromise;
              });
              }));
              });

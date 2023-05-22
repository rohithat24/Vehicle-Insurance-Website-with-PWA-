const staticcachename = 'static-cache-v1';
const dynamic = 'dynamic-cache-v1';
const assests = [
    '/',
    '/',
    '/indeex.html',
    '/manifest.json',
    '/style.css',
    '/myapp.js',
    '/imges/Honest (1).png',
    '/imges/Honest (2).png',
    '/script.js',
    '/FileSaver.js',
    '/dom-to-image.js',
]
self.addEventListener('install',installevt =>{
    //console.log("install event fired");
    installevt.waitUntil(
        caches.open(staticcachename).then(cache =>{
            cache.addAll(assests);
        })
    )
});

self.addEventListener('activate',activateevt =>{
   // console.log("activate event fired");
   caches.keys().then(keys =>{
    keys.forEach(key=>{ 
        if(key !== staticcachename && key !== dynamic){
            caches.delete(key)
            }
        })
    })
});

const limt = (name, size)=>{
    caches.open(name).then(cache=>{
        cache.keys().then(keys=>{
            if(keys.length>size){
                cache.delete(keys[0]).then(limt(name, size));
            }
        })
    })
}
self.addEventListener('fetch',fetchevt=>{
    // console.log(fetchevt);
    if(fetchevt.request.url.indexOf('firebase.googleapis.com'=== -1)){
        fetchevt.respondWith(
            caches.match(fetchevt.request).then(cacheRes => {
              return cacheRes || fetch(fetchevt.request)
              .then (fetchRes=>{
                  caches.open(dynamic).then(cache=>{
                      cache.put(fetchevt.request.url, fetchRes.clone())
                      limt(dynamic,15);
                      return fetchRes;
                  })
              })
            }).catch(err=>{
                if(fetchevt.request.url.indexOf('.html')>-1){
                    return caches.match ('/pages/fallback.html');
                }
            })
        )
    }
  
})
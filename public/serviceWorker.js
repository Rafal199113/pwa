

const CACHE_NAME = "version1";
const dynamicCache ="dynamic"
const urlsToCache = [
            '/',
            
            '/css/styles.css',
            '/css/sidebar.css',
            '/css/about.css',
           '/pic/bagae.svg',
           
            '/js/offline.js',
            '/js/loty.js',
            '/offline.html',
            '/js/harmonogram.js',
            '/js/slider.js',
            '/js/sidebar.js',
            '/pic/menu.svg',
            '/pic/help.svg',
            '/pic/house.svg',
            '/pic/lot.png',
            '/pic/luft.jpg',
            '/pic/ryanair.jpg',
            '/pic/start.png',
            '/pic/fly_track.png',
            '/favicon.ico',
            '/pic/ticket.png'

         
            
            
          
            
            
         
          
          
          ];


const self = this;

// Install SW
self.addEventListener('install', (event) => {
  console.log("install")
  event.waitUntil(
        
        caches.open(CACHE_NAME).then((cache)=>{
       
            console.log("cashed")
            cache.addAll(urlsToCache);
          
           
           })

    )
 
});

// Listen for requests


// Activate the SW
self.addEventListener('activate', (event) => {
  console.log('activate')
  event.waitUntil(
   
 caches.keys().then((keys)=>{
  return Promise.all(keys.filter(key=>key!==CACHE_NAME && key!==dynamicCache ).map(key=>{console.log(key),caches.delete(key)}))
 })
  )
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(res=>{
      
        return res || fetch(event.request).then((fetchRes)=>{

                return caches.open(dynamicCache).then((cache)=>{
                  
                   
                   cache.put(event.request.url, fetchRes.clone())
                  return fetchRes})
        })
    }).catch(()=>caches.match('http://localhost:4000/offline.html'))
      
  
  )
});

self.addEventListener('push', function(event) {
  console.log("cycuszki")
  const title = 'New Message';
  const options = {
    body: 'Hello, world!',
  };
event.waitUntil(self.registration.showNotification(title, options));
});
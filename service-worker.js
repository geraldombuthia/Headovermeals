self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open("headovermeals-v1").then(function (cache) {
            return cache.addAll([
                "/",
                "/index.html",
                "/app.js",
                "/style.css",
                "/icon/Food.webp",
                "/images/rice.png",
                "/images/spinach.png",
                "/images/sausage.png",
                "/images/avocado.png",
                "/images/bread.png",
                "/images/cabbage.png",
                "/images/garlic.png",
                "/images/pepper.png",
                "/images/tomato.png",
                "/images/spaghetti.png",
                "/images/carrot.png",
                "/images/buns.png",
                "/images/eggs.png",
                "/images/beef.png",
                "/images/chicken.png",
                "/images/dessert.png",
                "/images/lamb.png",
                "/images/miscellaneous.png",
                "/images/pasta.png",
                "/images/pork.png",
                "/images/seafood.png",
                "/images/side.png",
                "/images/starter.png",
                "/images/vegan.png",
                "/images/vegetarian.png",
                "/images/breakfast.png",
                "/images/Goat.png",
                "https://fonts.googleapis.com/css2?family=Baloo+Tamma+2&display=swap",
                "https://fonts.googleapis.com/css2?family=Lobster&display=swap"
            ])
        })
    )
})

self.addEventListener("fetch", function (e) {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    )
})
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
                "https://www.themealdb.com/api/json/v1/1/search.php?s=beef",
                "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken",
                "https://www.themealdb.com/api/json/v1/1/search.php?s=dessert",
                "https://www.themealdb.com/api/json/v1/1/search.php?s=lamb",
                "https://www.themealdb.com/api/json/v1/1/search.php?s=miscellaneous",
                "https://www.themealdb.com/api/json/v1/1/search.php?s=pasta",
                "https://www.themealdb.com/api/json/v1/1/search.php?s=pork",
                "https://www.themealdb.com/api/json/v1/1/search.php?s=seafood",
                "https://www.themealdb.com/api/json/v1/1/search.php?s=side",
                "https://www.themealdb.com/api/json/v1/1/search.php?s=starter",
                "https://www.themealdb.com/api/json/v1/1/search.php?s=vegan",
                "https://www.themealdb.com/api/json/v1/1/search.php?s=vegetarian",
                "https://www.themealdb.com/api/json/v1/1/search.php?s=breakfast",
                "https://www.themealdb.com/api/json/v1/1/search.php?s=goat",
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
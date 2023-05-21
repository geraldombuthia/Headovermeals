const button = document.getElementById("searchbtn");
const cattab = document.getElementById("cattabs");
const popular = document.getElementById("popular");
const randombtn = document.getElementById("random");
const meal_container = document.getElementById("daymeal");
const searched_container = document.getElementById("searchedmeal"); //searched_container
const input = document.querySelector("input[type='text']");
const result_container = document.getElementById("results");
const info_container = document.getElementById("info");
const search_container = document.getElementById("search");
const home_container = document.getElementById("home");
const feedback_container = document.getElementById("feedback");
const about_container = document.getElementById("about");
const home_btn = document.getElementById("homebtn");
const feedback_btn = document.getElementById("feedbackbtn");
const about_btn = document.getElementById("aboutbtn");
const back_btn = document.getElementById("back");
const ingrList = [];
let newArray;
let catArray = [];

window.onload = function () {
  loaded();
  backChecker();
  let url = `https://www.themealdb.com/api/json/v1/1/random.php`;
  let url2 = `https://www.themealdb.com/api/json/v1/1/categories.php`;
  fetch(url2)
    .then((res) => res.json())
    .then((data) => {
      categoriesRender(data);
    });
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // mealRender(data);
      mealRenderOfDay(data);
    });
  renderPopular();
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function () {
        console.log("Service Worker Registered");
      })
      .catch(function (err) {
        console.error("SW registration failed with error " + err);
      });
  }
};

back_btn.addEventListener("click", () => {
  input.value = "";
  searched_container.innerHTML = "";
  info_container.innerHTML = "";
  search_container.style.display = "flex";
  result_container.style.display = "block";
  backChecker();
});

function loaded() {
  home_container.style.display = "block";
  feedback_container.style.display = "none";
  about_container.style.display = "none";
}

home_btn.addEventListener("click", () => {
  home_container.style.display = "block";
  feedback_container.style.display = "none";
  about_container.style.display = "none";
  home_container.style.scrollMarginTop = "6em";
  backChecker();
});

feedback_btn.addEventListener("click", () => {
  home_container.style.display = "none";
  feedback_container.style.display = "block";
  about_container.style.display = "none";
  feedback_container.style.scrollMarginTop = "6em";
  backChecker();
});

about_btn.addEventListener("click", () => {
  home_container.style.display = "none";
  feedback_container.style.display = "none";
  about_container.style.display = "block";
  about_container.style.scrollMarginTop = "6em";
  backChecker();
});

button.addEventListener("click", () => {
  let inputValue = input.value;
  if (inputValue !== "") {
    result_container.style.display = "none";
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // mealRender(data);
        checkProperties(data, inputValue);
      });
  }
});

function fetchRandom() {
  search_container.style.display = "none";
  result_container.style.display = "none";
  let id = 0;
  let url = `https://www.themealdb.com/api/json/v1/1/random.php`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // mealRender(data);
      newArray = [...data.meals];
      recipe(id);
      // mealRender(data, random);
    });
}

function checkProperties(obj, inputValue) {
  // let inputValue = input.value;
  for (let key in obj) {
    if (obj[key] !== null) {
      mealRender(obj, inputValue);
    } else {
      info_container.innerHTML = `<p id="warning">No results for ${inputValue}</p>`;
    }
  }
}

function mealRenderOfDay(meals) {
  newArray = [...meals.meals];
  let text = "";
  let i;
  let len = newArray.length;
  if (newArray.length !== null) {
    for (i = 0; i < len; i++) {
      text += `
    <div class="gallery">
        <img src="${newArray[i].strMealThumb}" alt="image of ${newArray[i].strMeal}" onclick= "recipe(${i})" >
      <div class="desc" id="${newArray[i].idMeal}">${newArray[i].strMeal}</div>
    </div>`;

      meal_container.innerHTML = text;
    }
  }
}
function mealRender(meals) {
  backChecker();
  let inputValue = input.value;
  newArray = [...meals.meals];
  let text = "";
  let i;
  let len = newArray.length;
  if (len !== null) {
    for (i = 0; i < len; i++) {
      text += `<div class="responsive">
    <div class="gallery">
        <img src="${newArray[i].strMealThumb}" alt="image of ${newArray[i].strMeal}" onclick= "recipe(${i})" >
      <div class="desc" id="${newArray[i].idMeal}">${newArray[i].strMeal}</div>
    </div>
  </div>`;

      searched_container.innerHTML = text;
      info_container.innerHTML = `<span>${meals.meals.length}</span> results for ${inputValue}`;
    }
  }
}
function recipe(Id) {
  result_container.style.display = "none";
  search_container.style.display = "none";
  info_container.innerHTML = "";
  backChecker();
  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (newArray[Id][`strIngredient${i}`]) {
      ingrList.push(
        `${newArray[Id][`strIngredient${i}`]} - ${
          newArray[Id][`strMeasure${i}`]
        }`
      );
    } else {
      // Stop if no more ingredients
      break;
    }
  }
  const newInnerHTML = `<div class="item1">
    <h2>${newArray[Id].strMeal}</h2>
  </div>
  <div class="grid-container">
    <div class="flex">
      <div class="item3">
        <div class="imageDiv">
          <img src="${newArray[Id].strMealThumb}" alt="image of ${
    newArray[Id].strMeal
  }">
        </div>
        <div class="ingredients">
          <div class="details">
          ${
            newArray[Id].strCategory
              ? `<p><strong><span>Category:</span></strong> ${newArray[Id].strCategory}</p>`
              : ""
          }
  
          ${
            newArray[Id].strArea
              ? `<p><strong><span>Area:</span></strong> ${newArray[Id].strArea}</p>`
              : ""
          }
  
          ${
            newArray[Id].strTags
              ? `<p><strong><span>Tags:</span></strong> ${newArray[Id].strTags}</p>`
              : ""
          }
          </div>
          <h3>Ingredients</h3>
          <ul>
            ${ingrList.map((ingredient) => `<li>${ingredient}</li>`).join("")}
          </ul>
        </div>
  
      </div>
    </div>
    <div class="item4">
      <div class="directions">
        <h3>Directions</h3>
      
        <div id="str">${newArray[Id].strInstructions
          .split(". ")
          .join(`. <br>`)}</div>
        
      </div>
    </div>
  </div>
  
  <div class="item5">
    <iframe width="420" height="315" src="https://www.youtube.com/embed/${newArray[
      Id
    ].strYoutube.slice(-11)}">
    </iframe></div>
  </div>`;
  searched_container.innerHTML = newInnerHTML;
}

// category tabs
function categoryTabs() {
  let url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      categoriesRender(data);
    });
}
function categoriesRender(cat) {
  let catArr = [...cat.categories];
  let text = "";
  let i;
  let len = catArr.length;
  for (i = 0; i < len; i++) {
    // Change the source to be able to have the thumbnails cached
    // <img src="${catArr[i].strCategoryThumb}" alt="${catArr[i].strCategory}">
    text += `
    <div class="tab"  onclick ="catSearch(this.innerText)">
      <img src="./images/${catArr[i].strCategory}.png" alt="${catArr[i].strCategory}">
      <div class="info" >${catArr[i].strCategory}</div>
    </div>`;
  }
  cattab.innerHTML = text;
}
function catSearch(category) {
  backChecker();
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      categorySelectedRender(data, category);
    });
}
function categorySelectedRender(meals, category) {
  result_container.style.display = "none";
  backChecker();
  newArray = [...meals.meals];
  let text = "";
  let i;
  let len = newArray.length;
  if (len !== null) {
    for (i = 0; i < len; i++) {
      text += `<div class="responsive">
    <div class="gallery" onclick = "categoryRecipe(this.innerText)">
        <img src="${newArray[i].strMealThumb}" alt="image of ${newArray[i].strMeal}">
      <div class="desc" id="${newArray[i].idMeal}">${newArray[i].strMeal}</div>
    </div>
  </div>`;

      searched_container.innerHTML = text;
      info_container.innerHTML = `<span>${meals.meals.length}</span> results for ${category}`;
    }
  }
}
function categoryRecipe(meal) {
  let category = [
    {
      ingredient: "beef",
      source: "./images/beef.png",
    },
    {
      ingredient: "Chicken",
      source: "./images/chicken.png",
    },
    {
      ingredient: "dessert",
      source: "./images/dessert.png",
    },
    {
      ingredient: "lamb",
      source: "./images/lamb.png",
    },
    {
      ingredient: "miscellaneous",
      source: "./images/miscellaneous.png",
    },
    {
      ingredient: "pasta",
      source: "./images/pasta.png",
    },
    {
      ingredient: "pork",
      source: "./images/pork.png",
    },
    {
      ingredient: "seafood",
      source: "./images/seafood.png",
    },
    {
      ingredient: "side",
      source: "./images/side.png",
    },
    {
      ingredient: "starter",
      source: "./images/starter.png",
    },
    {
      ingredient: "vegan",
      source: "./images/vegan.png",
    },
    {
      ingredient: "vegetarian",
      source: "./images/vegetarian.png",
    },
    {
      ingredient: "breakfast",
      source: "./images/breakfast.png",
    },
    {
      ingredient: "goat",
      source: "./images/goat.png",
    },
  ];
  backChecker();
  let id = 0;
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      newArray = [...data.meals];
      recipe(id);
    });
}

function renderPopular() {
  let ingredients = [
    {
      ingredient: "Rice",
      source: "./images/rice.png",
    },
    {
      ingredient: "Avocado",
      source: "./images/avocado.png",
    },
    {
      ingredient: "Spinach",
      source: "./images/spinach.png",
    },
    {
      ingredient: "Eggs",
      source: "./images/eggs.png",
    },
    {
      ingredient: "Cabbage",
      source: "./images/tomato.png",
    },
    {
      ingredient: "Tomato",
      source: "./images/tomato.png",
    },
    {
      ingredient: "Bread",
      source: "./images/bread.png",
    },
    {
      ingredient: "Buns",
      source: "./images/buns.png",
    },
    {
      ingredient: "Garlic",
      source: "./images/garlic.png",
    },
    {
      ingredient: "Carrot",
      source: "./images/carrot.png",
    },
    {
      ingredient: "Pepper",
      source: "./images/pepper.png",
    },
    {
      ingredient: "Spaghetti",
      source: "./images/spaghetti.png",
    },
    {
      ingredient: "Sausage",
      source: "./images/sausage.png",
    },
  ];
  let text = "";
  for (var i = 0; i < ingredients.length; i++) {
    text += `
    <div class="tab" onclick = "popularRender(this.innerText)">
        <img src="${ingredients[i].source}" alt="image of ${ingredients[i].ingredient}" >
      <div class="info" id="${ingredients[i].ingredient}">${ingredients[i].ingredient}</div>
    </div>`;
  }
  document.getElementById("popular").innerHTML = text;
}
function popularRender(ingredient) {
  result_container.style.display = "none";
  backChecker();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((res) => res.json())
    .then((data) => {
      newArray = [...data.meals];
      let text = "";
      let i;
      let len = newArray.length;
      for (i = 0; i < len; i++) {
        text += `<div class="responsive">
  <div class="gallery">
      <img src="${newArray[i].strMealThumb}" alt="image of ${newArray[i].strMeal}" onclick= "popSearch(${newArray[i].idMeal})" >
    <div class="desc" id="${newArray[i].idMeal}">${newArray[i].strMeal}</div>
  </div>
</div> `;

        searched_container.innerHTML = text + `<div id="space"></div>`;
        info_container.innerHTML = `<span>${data.meals.length}</span> results for ${ingredient}`;
      }
    });
}
function popSearch(id) {
  backChecker();
  let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  let i = 0;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      newArray = [...data.meals];
      result_container.style.display = "none";
      recipe(i);
    });
}
function backChecker() {
  if (
    result_container.style.display !== "none" ||
    home_container.style.display === "none"
  ) {
    back_btn.style.display = "none";
  } else if (
    result_container.style.display === "none" ||
    home_container.style.display === "none"
  ) {
    back_btn.style.display = "flex";
  }
}

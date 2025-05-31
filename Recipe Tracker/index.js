const form = document.getElementById("recipe-form");
const recipeList = document.getElementById("recipe-list");
const searchBar = document.getElementById("search-bar");

function loadRecipes() {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipeList.innerHTML = "";

  recipes.forEach((recipe, index) => {
    const div = document.createElement("div");
    div.classList.add("recipe");

    div.innerHTML = `
      <h3>${recipe.title}</h3>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      <button class="delete-btn" onclick="deleteRecipe(${index})">Delete</button>
    `;

    recipeList.appendChild(div);
  });
}

// Function to save a recipe
function saveRecipe(recipe) {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

// Function to delete a recipe
function deleteRecipe(index) {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.splice(index, 1);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  loadRecipes();
}

// Function to handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const ingredients = document.getElementById("ingredients").value;
  const instructions = document.getElementById("instructions").value;

  const recipe = { title, ingredients, instructions };
  saveRecipe(recipe);
  loadRecipes();

  form.reset();
});

// Search functionality
searchBar.addEventListener("input", () => {
  const searchTerm = searchBar.value.toLowerCase();
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  // Filter recipes based on title or ingredients
  const filteredRecipes = recipes.filter(recipe => {
    return recipe.title.toLowerCase().includes(searchTerm) ||
           recipe.ingredients.toLowerCase().includes(searchTerm);
  });

  // Display the filtered recipes
  recipeList.innerHTML = "";
  filteredRecipes.forEach((recipe, index) => {
    const div = document.createElement("div");
    div.classList.add("recipe");

    div.innerHTML = `
      <h3>${recipe.title}</h3>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      <button class="delete-btn" onclick="deleteRecipe(${index})">Delete</button>
    `;

    recipeList.appendChild(div);
  });
});

// Load the recipes when the page is loaded
loadRecipes();

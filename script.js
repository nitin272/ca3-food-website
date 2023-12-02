async function getRandomMeal() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();

        const meal = data.meals[0];

        const mealImage = document.querySelector('.meal-image img');
        mealImage.src = meal.strMealThumb;

        const mealText = document.querySelector('.meal-image p');
        mealText.textContent = meal.strMeal;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', getRandomMeal);

async function searchMeal(query) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        const grid = document.querySelector('.hidden');
        grid.innerHTML = '';

        data.meals.forEach(meal => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid');

            const image = document.createElement('img');
            image.src = meal.strMealThumb;
            image.alt = meal.strMeal;
            image.height = 300;
            image.width = 300;

            const text = document.createElement('p');
            text.textContent = meal.strMeal;

            gridItem.appendChild(image);
            gridItem.appendChild(text);
            grid.appendChild(gridItem);
        });

        grid.style.display = 'grid';

    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}

const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('keypress', async function(event) {
    if (event.key === 'Enter') {
        const query = event.target.value.trim();
        if (query !== '') {
            await searchMeal(query);
        }
    }
});

async function getRandomMeal() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();

        const meal = data.meals[0];

        const mealImage = document.querySelector('.meal-image img');
        mealImage.src = meal.strMealThumb;

        const mealText = document.querySelector('.meal-image p');
        mealText.textContent = meal.strMeal;

        const ingredientsList = document.querySelector('.ingredients-list');
        ingredientsList.innerHTML = '';

        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== '') {
                const ingredientItem = document.createElement('li');
                ingredientItem.textContent = `${measure} ${ingredient}`;
                ingredientsList.appendChild(ingredientItem);
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
    function toggleIngredients() {
        const ingredientsSection = document.querySelector('.ingredients-box');
        ingredientsSection.classList.toggle('hidden');
    }
    
    const mealImage = document.querySelector('.meal-image img');
    mealImage.addEventListener('click', toggleIngredients);
}

document.addEventListener('DOMContentLoaded', getRandomMeal);

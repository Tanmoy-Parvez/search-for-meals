const searchField = document.getElementById('input-field');
const searchBtn = document.getElementById('btn-search');

searchField.addEventListener('keypress', function (event) {
    if (event.key == "Enter") {
        searchBtn.click();
    }
})

const msg = document.getElementById('search-error');
msg.style.display = 'none';

const loadSearch = () => {
    const searchValue = searchField.value;
    // clear search field
    searchField.value = '';

    // handle empty search field 
    if (searchValue == '') {
        msg.style.display = 'block';
    }
    else {
        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayMeals(data.meals))
        msg.style.display = 'none';
    }
}

const displayMeals = (meals) => {
    const mealCard = document.getElementById('meal-card');
    if (!meals) {
        msg.style.display = 'block';
    }
    // clear the field for next search
    mealCard.textContent = '';
    for (const meal of meals) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadDetails(${meal.idMeal})" class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div  class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        mealCard.appendChild(div);
    }
}

const loadDetails = (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.meals[0]))

}

const displayDetails = (meal) => {
    const mealCard = document.getElementById('detail-box');
    // const div = document.createElement('div');
    mealCard.innerHTML = `
        <div class="row g-0">
                <div class="col-md-4">
                    <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        `;
    // mealCard.appendChild(div);
}
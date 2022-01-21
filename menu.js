var APIKey = 1;

function getDrinksList() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007")
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      response.json().then(function (data) {
        console.log(data);
        displayCocktail(data);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

getDrinksList();

function displayCocktail(cocktail) {
  let drinkSection = document.querySelector("p.title");
  let drinkName = document.createElement("h2");
  drinkName.innerHTML = cocktail.drinks[0].strDrink;
  drinkSection.appendChild(drinkName);
  console.log(drinkName);
}

let drinkIDs = [
  "11002",
  "11000",
  "11007",
  "12362",
  "17252",
  "11728",
  "11113",
  "11003",
  "13731 ",
];

drinkIDs.forEach(function (drinkId) {
  getDrinksList(drinkId);
});

function getDrinksList(drinkId) {
  var queryUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
  console.log(queryUrl);
  fetch(queryUrl)
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
  let drinkSection = document.querySelector("h2.title");
  let drinkName = document.createElement("p");
  drinkName.innerHTML = cocktail.drinks[0].strDrink;
  drinkSection.appendChild(drinkName);
  console.log(drinkName);

  let img = document.createElement("img");
  img.src = cocktail.drinks[0].strDrinkThumb;
  drinkSection.appendChild(img);

  for (let i = 1; i < 16; i++) {
    console.log(i);

    if (cocktail.drinks[0][`strMeasure${i}`] == null) {
      //if no ingredient, break loop and stop adding to list
      break;
    }
    let ingredient = document.createElement("ul");
    ingredient.innerHTML =
      cocktail.drinks[0][`strMeasure${i}`] +
      "of " +
      cocktail.drinks[0][`strIngredient${i}`];
    drinkSection.appendChild(ingredient);

    let instructions = document.querySelector(".instructions");
    instructions.innerHTML =
      "Instructions:  " + cocktail.drinks[0].strInstructions;
    drinkSection.appendChild(instructions);
  }
}

// MODAL
$("#launchModal").click(function () {
  $(".modal").addClass("is-active");
});

$(".modal-close").click(function () {
  $(".modal").removeClass("is-active");
});

$("#closebtn").click(function () {
  $(".modal").removeClass("is-active");
});

$("#closecross").click(function () {
  $(".modal").removeClass("is-active");
});

//To-DO:
// For loop for the cocktail cards to display drinkIDs array
// Fix Modal - drink cards and nav bar are hidden until Enter Site is clicked and "yes" is clicked.
//fix drink cards styling - all currently in 1 card.

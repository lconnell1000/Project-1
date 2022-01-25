let drinkIDs = [
  "11002",
  "11008",
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

  fetch(queryUrl)
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      return response.json();
    })
    .then(function (data) {
      displayCocktail(data);
    });
}

function displayCocktail(cocktail) {
  getCocktailIngredients(cocktail);
  let $h2 = $("<h2></h2>").text(cocktail.drinks[0].strDrink).addClass("title");
  let $tileParent = $('<div class="tile is-child box drink-section"></div>');
  let $tileGrandparent = $(
    '<div class="tile is-4 is-vertical is-parent"></div>'
  );
  let image = $("<img>").attr("src", cocktail.drinks[0].strDrinkThumb);
  let instructions = $("<p></p>")
    .text(cocktail.drinks[0].strInstructions)
    .addClass("instructions");

  let ingredients = $("<ul>").text("INSERT INGREDIENTS");

  $tileParent.append($h2);
  $tileParent.append(image);
  $tileParent.append(ingredients);
  $tileParent.append(instructions);
  $tileGrandparent.append($tileParent);
  $("#parent").append($tileGrandparent);
}

function getCocktailIngredients(cocktail) {
  let cocktailName = cocktail.drinks[0].strDrink;
  let ing = [];
  for (let i = 1; i < 16; i++) {
    if (cocktail.drinks[0][`strMeasure${i}`] == null) {
      //if no ingredient, break loop and stop adding to list
      break;
    }
    const cocktailIngredients =
      cocktail.drinks[0][`strMeasure${i}`] +
      "of " +
      cocktail.drinks[0][`strIngredient${i}`];
    ing.push(cocktailIngredients);
    console.log(cocktailIngredients);
  }
}

// **********************************

// MODAL
$("#launchModal").click(function () {
  $(".modal").addClass("is-active");
  // $(".drink-section").addClass("is-active");
});

$(".modal-button-close").click(function () {
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

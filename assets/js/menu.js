$(document).ready(function () {
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
        console.log(data);
      });
  }

  function displayCocktail(cocktail) {
    let $h2 = $("<h2></h2>")
      .text(cocktail.drinks[0].strDrink)
      .addClass("title");
    let $tileParent = $(
      '<div class="tile is-child box drink-section"></div>'
    ).addClass("is-hidden");
    let $tileGrandparent = $(
      '<div class="tile is-4 is-vertical is-parent"></div>'
    );
    let image = $("<img>").attr("src", cocktail.drinks[0].strDrinkThumb);
    let instructions = $("<p></p>")
      .text(cocktail.drinks[0].strInstructions)
      .addClass("instructions");

    $tileParent.append($h2);
    $tileParent.append(image);
    getCocktailIngredients(cocktail);
    $tileParent.append(getCocktailIngredients(cocktail));
    $tileParent.append(instructions);
    $tileGrandparent.append($tileParent);
    $("#parent").append($tileGrandparent);

    function getCocktailIngredients(cocktail) {
      let cocktailName = cocktail.drinks[0].strDrink;
      let ing = [];
      let ingredients = $("<ul>").addClass("ingredients");
      for (let i = 1; i < 16; i++) {
        if (cocktail.drinks[0][`strMeasure${i}`] == null) {
          //if no ingredient, break loop and stop adding to list
          console.log(i);
          break;
        }
        let cocktailIngredients =
          cocktail.drinks[0][`strMeasure${i}`] +
          " " +
          cocktail.drinks[0][`strIngredient${i}`];
        ing.push(cocktailIngredients);
        console.log(ing);
      }
      for (let i = 0; i < ing.length; i++) {
        var li = document.createElement("li");
        li.textContent = ing[i];
        ingredients.append(li);
      }
      return ingredients; //new
    }
  }

  // **********************************

  // MODAL
  $("#launchModal").click(function () {
    $(".modal").addClass("is-active");
  });

  $(".modal-button-close").click(function () {
    $(".modal").removeClass("is-active");
    $(".drink-section").removeClass("is-hidden");
    $(".navbar").removeClass("is-hidden");
    $("#launchModal").addClass("is-hidden");
  });

  $("#closebtn").click(function () {
    $(".modal").removeClass("is-active");
  });

  $("#closecross").click(function () {
    $(".modal").removeClass("is-active");
  });
});

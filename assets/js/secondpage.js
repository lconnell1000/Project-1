
   
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

  function getDrinksList() {
      for (i=0; i<drinkIDs.length; i++){
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkIDs[i]}`
    )
    
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        
        response.json().then(function (data) {
            //console.log(data);
            getCocktailIngredients(data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }}
 
  getDrinksList();

  function getCocktailIngredients(cocktail) {
    let cocktailName = cocktail.drinks[0].strDrink;
   
    console.log(cocktailName);
    for (let i=1; i<16; i++ ){
        if (cocktail.drinks[0][`strMeasure${i}`] == null) {
            //if no ingredient, break loop and stop adding to list
            break;
          }
         
          let cocktailIngredients = cocktail.drinks[0][(`strMeasure${i}`)] +  "of " + cocktail.drinks[0][`strIngredient${i}`];
       console.log(cocktailIngredients);
       for (j=0; j<drinkIDs.length; j++) {
       localStorage.setItem(cocktailName, JSON.stringify(cocktailIngredients))
       }
    }
}

  function enterSales () {
    $("#lanuchModalSales").click(function() {
        $(".modal").addClass("is-active");  
      });
      
      $(".modal-close").click(function() {
         $(".modal").removeClass("is-active");
      });
  }

  enterSales();
  


$('#cocktial_form').submit(function() {
    Event.preventDefault();
    let longIslandSold = $('#long_island').val();
    let mojitoSold = $('#mojito').val();
    let margaritaSold = $('#margarita').val();
    let greyhoundSold = $('#greyhound').val();
    let martiniSold = $('#martini').val();
    let bloodyMarySold = $('#bloody_mary').val();
    let negroniSold = $('#negroni').val();
    let amarettoSourSold = $('#amaretto_sour').val();
    let tequilaFizz = $('#tequila_fizz').val();

});


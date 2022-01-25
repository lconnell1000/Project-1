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
var vodka;
var rum;
var teq;
var gin;
var bourbon;
var amaretto;
var sweetVermouth;

let spirits = [vodka, rum, teq, gin, bourbon, amaretto, sweetVermouth]


function getDrinksList() {
  for (i=0; i<drinkIDs.length; i++){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkIDs[i]}`)
      
      .then(function (response) {
        if (response.status !== 200) {
          console.log("Looks like there was a problem. Status Code: " + response.status);
            return;
          }
          
          response.json().then(function (data) {
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
       // console.log(cocktailName);
        let ing = [];

        for (let i=1; i<16; i++ ){
          if (cocktail.drinks[0][`strMeasure${i}`] == null) {
            //if no ingredient, break loop and stop adding to list
            break;
          }
          const cocktailIngredients = cocktail.drinks[0][(`strMeasure${i}`)] +  "of " + cocktail.drinks[0][`strIngredient${i}`];
          ing.push(cocktailIngredients);
       // console.log(ing)
        }
        
        localStorage.setItem(cocktailName, JSON.stringify(ing))
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
        console.log(longIslandSold);
        let newVodkaStock = ((localStorage.getItem('currentVodkaStock'))-(0.5*(longIslandSold)));
        localStorage.setItem(CurrentVodkaStock, newVodkaStock)
        let manhattanSold = $('#manhattan').val();
        let margaritaSold = $('#margarita').val();
        let greyhoundSold = $('#greyhound').val();
        let martiniSold = $('#martini').val();
        let bloodyMarySold = $('#bloody_mary').val();
        let negroniSold = $('#negroni').val();
        let amarettoSourSold = $('#amaretto_sour').val();
        let tequilaFizz = $('#tequila_fizz').val();
        
      });
      
    // function convertFractions() {
    //   let NegroniIngredients = JSON.parse(localStorage.getItem ('Negroni'));
    //   console.log(NegroniIngredients);
    //   let newNegroniIngredients = [];
    //   NegroniIngredients.length = 3;
    //   JSON.stringify(NegroniIngredients);
    //   // console.log(NegroniIngredients[0])
    //   for (i=0;i<NegroniIngredients.length;i++){
        
    //     newNegroniIngredients[i] = (NegroniIngredients[i]).replace('oz of', '')
    //   }
    //   JSON.parse(newNegroniIngredients)
    //   console.log(newNegroniIngredients);
    //   }
    
  
    // convertFractions();

    function updatestock() {

    }
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
var dryVermouth;
var cointreau;
var campari;
var totalLongIslandSold;
var totalManhattanSold;
var totalMargaritaSold;
var totalGreyhoundSold;
var totalMartiniSold;
var totalBloodyMarySold;
var totalNegroniSold;
var totalAmarettoSourSold;
var totalTequilaFizzSold;
var cocktailsSold;

let spirits = [vodka, rum, teq, gin, bourbon, amaretto, sweetVermouth];

let totalCocktailsSold = {
  totalLongIslandSold : 0,
  totalManhattanSold : 0,
  totalMargaritaSold : 0,
  totalGreyhoundSold : 0,
  totalMartiniSold : 0,
  totalBloodyMarySold : 0,
  totalNegroniSold : 0,
  totalAmarettoSourSold : 0,
  totalTequilaFizzSold : 0,
}


function getDrinksList() {
  for (i = 0; i < drinkIDs.length; i++) {
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
  }
}

getDrinksList();

function getCocktailIngredients(cocktail) {
  let cocktailName = cocktail.drinks[0].strDrink;
  console.log(cocktailName);
  let ing = [];

  for (let i = 1; i < 16; i++) {
    if (cocktail.drinks[0][`strMeasure${i}`] == null) {
      //if no ingredient, break loop and stop adding to list
      break;
    }
    const cocktailIngredients = cocktail.drinks[0][(`strMeasure${i}`)] + "of " + cocktail.drinks[0][`strIngredient${i}`];
    ing.push(cocktailIngredients);
    console.log(ing)
  }

  localStorage.setItem(cocktailName, JSON.stringify(ing));
  localStorage.setItem('totalCocktailsSold', JSON.stringify(totalCocktailsSold));
}

function enterSales() {
  $("#lanuchModalSales").click(function () {
    $(".modal").addClass("is-active");
  });

  $("#entersales").click(function () {
    updatestock();
    
    $(".modal").removeClass("is-active");
  });
}

enterSales();



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
  $('#cocktail_form').submit(function (e) {
    e.preventDefault();
    let longIslandSold = $('#long_island').val();
    let manhattanSold = $('#manhattan').val();
    let margaritaSold = $('#margarita').val();
    let greyhoundSold = $('#greyhound').val();
    let martiniSold = $('#martini').val();
    let bloodyMarySold = $('#bloody_mary').val();
    let negroniSold = $('#negroni').val();
    let amarettoSourSold = $('#amaretto_sour').val();
    let tequilaFizzSold = $('#tequila_fizz').val();
updateStockCocktails();
  })};

    function updateStockCocktails() {
    updateTotalCocktailsSold();


    if (longIslandSold >= 0 && greyhoundSold >= 0 && bloodyMarySold >= 0 && manhattanSold >= 0 && margaritaSold >= 0 && martiniSold >= 0 && negroniSold >= 0 && amarettoSourSold >= 0 && tequilaFizzSold >= 0) {
      let newVodkaStock = ((JSON.parse(localStorage.getItem(currentStock.Vodka))) - (0.5 * (longIslandSold)) - (1.5 * (bloodyMarySold)) - (1.5 * (greyhoundSold)));
      localStorage.setItem((currentStock.Vodka), JSON.stringify(newVodkaStock));
      let newRumStock = ((JSON.parse(localStorage.getItem(currentStock.Rum))) - (0.5 * (longIslandSold)));
      localStorage.setItem((currentStock.Rum), JSON.stringify(newRumStock));
      let newTeqStock = ((JSON.parse(localStorage.getItem(currentStock.Tequila))) - (0.5 * (longIslandSold)) - (1.5 * (margaritaSold)) - (2 * (tequilaFizzSold)));
      localStorage.setItem((currentStock.Tequila), JSON.stringify(newTeqStock));
      let newGinStock = ((JSON.parse(localStorage.getItem(currentStock.Gin))) - (0.5 * (longIslandSold)) - (negroniSold) - ((5 / 3) * (martiniSold)));
      localStorage.setItem = ((currentStock.Gin), JSON.stringify(newGinStock));
      let newBourbonStock = ((JSON.parse(localStorage.getItem(currentStock.Bourbon))) - (2.5 * (manhattanSold)));
      localStorage.setItem = ((currentStock.Bourbon), JSON.stringify(newBourbonStock));
      let newAmarettoStock = ((JSON.parse(localStorage.getItem(currentStock.Amaretto))) - (1.5 * (amarettoSourSold)));
      localStorage.setItem = ((currentStock.Amaretto), JSON.stringify(newAmarettoStock));
      let newSweetVermouthStock = ((JSON.parse(localStorage.getItem(currentStock.sweetVermouth))) - ((0.75) * (manhattanSold)) - (negroniSold));
      localStorage.setItem = ((currentStock.sweetVermouth), JSON.stringify(newSweetVermouthStock));
      let newdryVermouthStock = ((JSON.parse(localStorage.getItem(currentStock.dryVermouth))) - ((1 / 3) * (martiniSold)));
      localStorage.setItem = ((currentStock.dryVermouth), JSON.stringify(newdryVermouthStock));
      let newCointreauStock = ((JSON.parse(localStorage.getItem(currentStock.cointreau))) - ((0.5) * (margaritaSold)));
      localStorage.setItem = ((currentStock.cointreau), JSON.stringify(newCointreauStock));
      let newCampariStock = ((JSON.parse(localStorage.getItem(currentStock.campari))) - (negroniSold));
      localStorage.setItem = ((currentStock.campari), JSON.stringify(newCampariStock));
    }
    else (console.log('error, please make sure all cocktails are 0 or greater'));
    {
      return;
    }
  }




function updateTotalCocktailsSold() {
  
  
    let updatedLongIslandgsold = ((JSON.parse(localStorage.getItem(totalCocktailsSold.totalLongIslandSold))+longIslandSold));
    localStorage.setItem = ((totalCocktailsSold.totalLongIslandSold), JSON.stringify(updatedLongIslandgsold));
    let  updatedManhattanSold = ((JSON.parse(localStorage.getItem(totalCocktailsSold.totalManhattanSold))+manhattanSold));
    localStorage.setItem = ((totalCocktailsSold.totalManhattanSold), JSON.stringify(updatedManhattanSold));
    let updatedMargaritaSold = ((JSON.parse(localStorage.getItem(totalCocktailsSold.totalMargaritaSold))+margaritaSold));
    localStorage.setItem = ((totalCocktailsSold.totalMargaritaSold), JSON.stringify(updatedMargaritaSold));
    let updatedGreyhoundSold = ((JSON.parse(localStorage.getItem(totalCocktailsSold.totalGreyhoundSold))+greyhoundSold));
    localStorage.setItem = ((totalCocktailsSold.totalGreyhoundSold), JSON.stringify(updatedGreyhoundSold));
    let updatedMartiniSold = ((JSON.parse(localStorage.getItem(totalCocktailsSold.totalMartiniSold))+martiniSold));
    localStorage.setItem = ((totalCocktailsSold.totalMartiniSold), JSON.stringify(updatedMartiniSold));
    let updatedBloodyMarySold = ((JSON.parse(localStorage.getItem(totalCocktailsSold.totalBloodyMarySold))+bloodyMarySold));
    localStorage.setItem = ((totalCocktailsSold.totalBloodyMarySold), JSON.stringify(updatedBloodyMarySold));
    let updatedNegroniSold = ((JSON.parse(localStorage.getItem(totalCocktailsSold.totalNegroniSold))+negroniSold));
    localStorage.setItem = ((totalCocktailsSold.totalNegroniSold), JSON.stringify(updatedNegroniSold));
    let updatedAmarettoSourSold = ((JSON.parse(localStorage.getItem(totalCocktailsSold.totalAmarettoSourSold))+amarettoSourSold));
    localStorage.setItem = ((totalCocktailsSold.totalAmarettoSourSold), JSON.stringify(updatedAmarettoSourSold));
    let updatedTequilaFizzSold = ((JSON.parse(localStorage.getItem(totalCocktailsSold.totalTequilaFizzSold))+tequilaFizzSold));
    localStorage.setItem = ((totalCocktailsSold.totalTequilaFizzSold), JSON.stringify(updatedTequilaFizzSold));
    
  }


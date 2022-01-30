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
var longIsland;
var manhattan;
var greyhound;
var martini;
var bloodyMary;
var negroni;
var amarettoSour;
var tequilaFizz;

let spirits = [vodka, rum, teq, gin, bourbon, amaretto, sweetVermouth];
let cocktails = [
  longIsland,
  manhattan,
  margarita,
  greyhound,
  martini,
  bloodyMary,
  negroni,
  amarettoSour,
  tequilaFizz,
];

let currentStock = {
  Amaretto: 30,
  Bourbon: 50,
  Campari: 20,
  Gin: 30,
  Rum: 30,
  SweetVermouth: 15,
  DryVermouth: 15,
  Tequila: 80,
  Vodka: 70,
  Cointreau: 15,
};

// Get current stock form local storage
function loadCurrent() {
  // Get search history from localStorage
  var a = JSON.parse(localStorage.getItem("currentStock"));
  // If search history were retrieved from localStorage, update
  if (a !== null) {
    currentStock = a;
  }
}

loadCurrent();

// create table of current stock
function createTable(obj) {
  loadCurrent();
  var stockTable = document.querySelector("#stockTable");
  stockTable.innerHTML = "";
  for (let i in obj) {
    // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
    if (obj.hasOwnProperty(i)) {
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      td1.innerText = `${i}`;
      var td2 = document.createElement("td");
      console.log(i);
      td2.innerText = Math.round(`${obj[i]}`) + "oz";
      td2.classList.add(i);
      tr.appendChild(td1);
      tr.appendChild(td2);
      stockTable.appendChild(tr);
    }
  }
}

createTable(currentStock);

let totalCocktailsSold = {
  totalLongIslandSold: 0,
  totalManhattanSold: 0,
  totalMargaritaSold: 0,
  totalGreyhoundSold: 0,
  totalMartiniSold: 0,
  totalBloodyMarySold: 0,
  totalNegroniSold: 0,
  totalAmarettoSourSold: 0,
  totalTequilaFizzSold: 0,
};

function enterSales() {
  $("#lanuchModalSales").click(function () {
    $(".modal").addClass("is-active");
  });

  $("#entersales").click(function () {
    let testIfStockSet = JSON.parse(localStorage.getItem("currentStock"));
    if (testIfStockSet == null || testIfStockSet == currentStock) {
      localStorage.setItem("currentStock", JSON.stringify(currentStock));
    }
    let testIfCocktailsSold = JSON.parse(
      localStorage.getItem("totalCocktailsSold")
    );
    if (
      testIfCocktailsSold == null ||
      testIfCocktailsSold == totalCocktailsSold
    ) {
      localStorage.setItem(
        "totalCocktailsSold",
        JSON.stringify(totalCocktailsSold)
      );
    }
    updatestock();
    loadCurrent();
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
  $("#cocktail_form").submit(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    let longIslandSold = parseInt($("#long_island").val());
    let manhattanSold = parseInt($("#manhattan").val());
    let margaritaSold = parseInt($("#margarita").val());
    let greyhoundSold = parseInt($("#greyhound").val());
    let martiniSold = parseInt($("#martini").val());
    let bloodyMarySold = parseInt($("#bloody_mary").val());
    let negroniSold = parseInt($("#negroni").val());
    let amarettoSourSold = parseInt($("#amaretto_sour").val());
    let tequilaFizzSold = parseInt($("#tequila_fizz").val());

    var currentLevels = JSON.parse(localStorage.getItem("currentStock"));
    var currentSold = JSON.parse(localStorage.getItem("totalCocktailsSold"));
    if (
      longIslandSold >= 0 &&
      greyhoundSold >= 0 &&
      bloodyMarySold >= 0 &&
      manhattanSold >= 0 &&
      margaritaSold >= 0 &&
      martiniSold >= 0 &&
      negroniSold >= 0 &&
      amarettoSourSold >= 0 &&
      tequilaFizzSold >= 0
    ) {
      let newVodkaStock =
        currentLevels.Vodka -
        0.5 * longIslandSold -
        1.5 * bloodyMarySold -
        1.5 * greyhoundSold;

      let newRumStock = currentLevels.Rum - 0.5 * longIslandSold;

      let newTeqStock =
        currentLevels.Tequila -
        0.5 * longIslandSold -
        1.5 * margaritaSold -
        2 * tequilaFizzSold;

      let newGinStock =
        currentLevels.Gin -
        0.5 * longIslandSold -
        negroniSold -
        (5 / 3) * martiniSold;

      let newBourbonStock = currentLevels.Bourbon - 2.5 * manhattanSold;

      let newAmarettoStock = currentLevels.Amaretto - 1.5 * amarettoSourSold;

      let newSweetVermouthStock =
        currentLevels.SweetVermouth - 0.75 * manhattanSold - negroniSold;

      let newdryVermouthStock =
        currentLevels.DryVermouth - (1 / 3) * martiniSold;

      let newCointreauStock = currentLevels.Cointreau - 0.5 * margaritaSold;

      let newCampariStock = currentLevels.Campari - negroniSold;

      let newStock = {
        Amaretto: newAmarettoStock,
        Bourbon: newBourbonStock,
        Campari: newCampariStock,
        Gin: newGinStock,
        Rum: newRumStock,
        SweetVermouth: newSweetVermouthStock,
        DryVermouth: newdryVermouthStock,
        Tequila: newTeqStock,
        Vodka: newVodkaStock,
        Cointreau: newCointreauStock,
      };
      localStorage.setItem("currentStock", JSON.stringify(newStock));

      let updatedLongIslandsold =
        currentSold.totalLongIslandSold + longIslandSold;

      let updatedManhattanSold = currentSold.totalManhattanSold + manhattanSold;

      let updatedMargaritaSold = currentSold.totalMargaritaSold + margaritaSold;

      let updatedGreyhoundSold = currentSold.totalGreyhoundSold + greyhoundSold;

      let updatedMartiniSold = currentSold.totalMartiniSold + martiniSold;

      let updatedBloodyMarySold =
        currentSold.totalBloodyMarySold + bloodyMarySold;

      let updatedNegroniSold = currentSold.totalNegroniSold + negroniSold;

      let updatedAmarettoSourSold =
        currentSold.totalAmarettoSourSold + amarettoSourSold;

      let updatedTequilaFizzSold =
        currentSold.totalTequilaFizzSold + tequilaFizzSold;

      let updatedCocktailsSold = {
        totalLongIslandSold: updatedLongIslandsold,
        totalManhattanSold: updatedManhattanSold,
        totalMargaritaSold: updatedMargaritaSold,
        totalGreyhoundSold: updatedGreyhoundSold,
        totalMartiniSold: updatedMartiniSold,
        totalBloodyMarySold: updatedBloodyMarySold,
        totalNegroniSold: updatedNegroniSold,
        totalAmarettoSourSold: updatedAmarettoSourSold,
        totalTequilaFizzSold: updatedTequilaFizzSold,
      };
      localStorage.setItem(
        "totalCocktailsSold",
        JSON.stringify(updatedCocktailsSold)
      );
    } else console.log("error, please make sure all cocktails are 0 or greater");
    {
    }
    createTable(currentStock);
  });
}

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

let stockTable=document.querySelector('#stockTable');

let normalStock = {
Amaretto :30,
Bourbon	:50,
Campari:0,
Gin:	30,
Rum: 30,
SweetVermouth: 15,
DryVermouth: 15,
Tequila:	80,
Vodka:	70,
}

let currentStock = {
  Amaretto :30,
  Bourbon	:50,
  Campari:0,
  Gin:	30,
  Rum: 30,
  SweetVermouth: 15,
  DryVermouth: 15,
  Tequila:	80,
  Vodka:	70,
  }

// Display current stock in a table
function createTable(obj) {
  stockTable.innerHTML='';
  for (let i in obj) {
    // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
    if (obj.hasOwnProperty(i)) {
      var tr = document.createElement('tr');
      var td1= document.createElement('td');
      td1.innerText = `${i}`;
      var td2= document.createElement('td');
      console.log(i)
      td2.innerText = `${obj[i]}`;
      td2.classList.add(i);
      tr.appendChild(td1);
      tr.appendChild(td2);
      stockTable.appendChild(tr);
    }
  }
}

// Save current stock to local storage
function saveCurrent(obj, objName) {
  localStorage.setItem(objName, JSON.stringify(obj));
}
createTable(normalStock,'normalStock')
saveCurrent(currentStock,'currentStock')

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
        let ing = [];

        for (let i=1; i<16; i++ ){
          if (cocktail.drinks[0][`strMeasure${i}`] == null) {
            //if no ingredient, break loop and stop adding to list
            break;
          }
          const cocktailIngredients = cocktail.drinks[0][(`strMeasure${i}`)] +  "of " + cocktail.drinks[0][`strIngredient${i}`];
          ing.push(cocktailIngredients);
        console.log(cocktailIngredients);
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
        let manhattanSold = $('#manhattan').val();
        let margaritaSold = $('#margarita').val();
        let greyhoundSold = $('#greyhound').val();
        let martiniSold = $('#martini').val();
        let bloodyMarySold = $('#bloody_mary').val();
        let negroniSold = $('#negroni').val();
        let amarettoSourSold = $('#amaretto_sour').val();
        let tequilaFizz = $('#tequila_fizz').val();
        
      });
      
  // 
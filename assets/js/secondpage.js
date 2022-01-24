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
Gin:	30,
Tequila:	80,
Vodka:	70,
}

function createTable(obj, objName) {
  let result = '';
  for (let i in obj) {
    // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
    if (obj.hasOwnProperty(i)) {
      result +=`${i} = ${obj[i]}\n`;
      var tr = document.createElement('tr');
      var td1= document.createElement('td');
      td1.innerText = `${i}`;
      var td2= document.createElement('td');
      console.log(i)
      td2.innerText = `${obj[i]}\n`;
      td2.classList.add(i);
      tr.appendChild(td1);
      tr.appendChild(td2);
      stockTable.appendChild(tr);
    }
  }
  console.log(result);
}
createTable(normalStock,'normalStock')
let ingredients = [
  {
    Amaretto :	30,
    Bourbon	:50,
    Gin:	30,
    Tequila:	80,
    Vodka:	70,
    }
]

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
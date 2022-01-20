$(document).ready(function () {
  getDrinksList();
  function getDrinksList() {
    var drinksListUrl =
      "www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
    console.log(drinksListUrl);
  }
});

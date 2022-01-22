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
      for (i=0; i<9; i++){
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkIDs[0]}`
    )
    
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        
        response.json().then(function (data) {
            console.log(data)
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }}
 
  getDrinksList();



  function enterSales () {
    $("#lanuchModalSales").click(function() {
        $(".modal").addClass("is-active");  
      });
      
      $(".modal-close").click(function() {
         $(".modal").removeClass("is-active");
      });
  }

  enterSales();
  
//need to do a function to update local storage by cocktails sold
//this function will decrease stock but increase earning for the week


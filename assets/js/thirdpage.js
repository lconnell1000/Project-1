const APIkey = 'ba9bcf4f4e1396ead860b9554bf409d3';
var displayDate= moment();
var bestsell = document.querySelector('#bestsell')
var weather = document.querySelector('#weather')
var openModal = document.querySelector('#launchModal');
var modal = document.querySelector('.modal');
var closeModal= document.querySelector('.modal-close')
var closebtn= document.querySelector('#closebtn')
var setDate = moment().day(0).format('ddd');
var currentDate = moment().format('ddd');
var returnMenu = document.querySelector('#returnMenu');
var returnCurrentStock=document.querySelector('#returnCurrentStock');
var ing = document.querySelector('#ing');
var drinkType = document.querySelector('#drinkType');
var sales = document.querySelector('#sales');
var netCash = document.querySelector('#netCash');
var APIonecall
var tempArray = [];
let lastStock = {     //normal quantity for 20 serves of each
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

const stockPrice= {
  Amaretto :3.67,
  Bourbon	:8.42,
  Campari:1.73,
  Gin:	3.4,
  Rum: 4.74,
  SweetVermouth: 1.98,
  DryVermouth: 1.2,
  Tequila:	2.92,
  Vodka:	1.46,
}

let currentStock = {
  Amaretto :10,
  Bourbon	:20,
  Campari:0,
  Gin:	10,
  Rum: 10,
  SweetVermouth: 5,
  DryVermouth: 5,
  Tequila:	5,
  Vodka:	5,
}

let cocktailSale = {
  longIsland : 10,
  mojito : 20,
  margarita : 10,
  tequilaFizz : 10,
  greyhound :10,
  manhattan : 10,
  bloodyMarry: 10,
  negori: 10,
  amaretto: 10,
}

const drinkPrices = 20

// fetch city's lat and lon
function fetchCoor() {
    var city = 'Adelaide' //reusable if want to use for another location
    var link5day = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&cnt=6&appid='+APIkey+'&units=metric';
    fetch(link5day)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {   
    var lat = data.city.coord.lat;
    var lon = data.city.coord.lon; 
    fetchOnecall(lat,lon) ;
     });
   }
// fetch weather data
function fetchOnecall(lat,lon) {
  var oneCall = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=hourly,minutely,alerts&appid='+APIkey+ '&units=metric';
  fetch(oneCall)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
  APIonecall = data;
  futureWeather(APIonecall);
  });  
}
// display next week weather
function futureWeather(a) {
    for (var i=1; i<8;i++){
        forecast = document.createElement('div');
        forecast.className = "tile"
        date = document.createElement('h4');
        weekDays = document.createElement('h5');
        var img = document.createElement('img');
        img.setAttribute("src", 'http://openweathermap.org/img/wn/'+a.daily[i].weather[0].icon+'@2x.png');
        futureConditions = document.createElement('ul');
        forecast.className = "tile is-vertical"
        futureTemp= document.createElement('li');
        nextdate=displayDate.add(1,"day");
        date.textContent= nextdate.format("DD/MM/YYYY");
        weekDays.textContent= nextdate.format("ddd");
        futureTemp.textContent= a.daily[i].temp.day+ " \xB0C";
        tempArray.push( a.daily[i].temp.day);
        weather.appendChild(forecast);
        forecast.appendChild(date);
        forecast.appendChild(weekDays);
        forecast.appendChild(img);
        forecast.appendChild(futureConditions);
        futureConditions.appendChild(futureTemp);
    }
    NCF();
    drinkSug();
}
// launch Modal if not access on Sunday
function launchModal() {
  if (currentDate !== setDate) {
 modal.classList.add('is-active')
  }
}
// redirect to current stock page
function tocurrentstock() { 
  modal.classList.remove('is-active')
  document.location= 'https://juvenexaesthetics.com.au/wp-content/uploads/2020/05/test.png';
}
// redirect to menu page
function toMenu() { 
  modal.classList.remove('is-active');
  document.location= 'https://juvenexaesthetics.com.au/wp-content/uploads/2020/05/test.png';
}

// Get current stock from local storage
function getStock() {
  var stock = JSON.parse(localStorage.getItem("currentStock")); 
}

// Display best seller last week
function bestSeller() {
  let max = 'longIsland';
  for (let i in cocktailSale) {
    if (cocktailSale[max] < cocktailSale[i]){
      max = `${i}`;
    }
  }
  bestsell.textContent = max;
  return max
}


// Calculate cash flow
function NCF() {
  drinksale();
  ingCost();
  let net =drinksale()- ingCost();
  netCash.textContent=net;
}
// Calculate sale
function drinksale() {
  let earning =0;
  for (let i in cocktailSale) {
    let sold = cocktailSale[i]*drinkPrices;
    earning += sold;
  }
  sales.textContent = '$'+earning;
  console.log(earning)
  return earning;
}
// Calculate ingredient costs
function ingCost(){
  let cost =0;
 for (let i in stockPrice ) {
  let sold = lastStock[i]-currentStock[i];
  cost += sold*stockPrice[i];
 }
 ing.textContent='$'+cost;
 return cost;
}

// suggest drink type based on weather
function drinkSug() {
  var sum=0;
  for (var i=0; i<tempArray.length;i++) {
    sum += tempArray[i];
  }
  var avg = sum/tempArray.length;
  console.log(avg);
  if (avg>27) {
    drinkType.textContent = 'Warm drink';
  }
  else if (17<=avg && avg <=27){
    drinkType.textContent = 'Both';
  }
  else {
    drinkType.textContent = 'Cold drink';
  }
}

// innit
function innit() {
  bestSeller()
  fetchCoor();
  launchModal();
  openModal.addEventListener('click',launchModal);
  returnMenu.addEventListener('click', toMenu);
  returnCurrentStock.addEventListener('click', tocurrentstock);
  closeModal.addEventListener('click',function(){
    modal.classList.remove('is-active');
  })
}


innit();


const APIkey = 'ba9bcf4f4e1396ead860b9554bf409d3';
var displayDate= moment();
var bestsell = document.querySelector('#bestsell')
var weather = document.querySelector('#weather')
var openModal = document.querySelector('#launchModal');
var modal = document.querySelector('#modal');
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
var orderList = document.querySelector('#order');
var downloadBtn = document.querySelector('#downloadBtn');
var APIonecall
var tempArray = [];
let order = {};
let normalStock = {     //normal quantity for 20 serves of each
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
  }

  let lastStock = {    
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
    Amaretto :	30,          
    Bourbon :	50,
    Campari:	20,
    Gin	:30,
    Rum	:70,
    SweetVermouth:	20,
    DryVermouth:	15,
    Tequila: 	30,
    Vodka:	70,
    Cointreau:	10,
    }

let cocktailSale 

const drinkPrices = 20

const warm = {
  Amaretto :	30,
  Bourbon :	50,
  Campari:	20,
  Gin:	35,
  Rum:	105,
  SweetVermouth:	20,
  DryVermouth:	15,
  Tequila: 	30,
  Vodka:	90,
  Cointreau:	15,
}

const cold = {
  Amaretto :	45,
  Bourbon :	75,
  Campari	:30,
  Gin	:40,
  Rum:	70,
  SweetVermouth:	20,
  DryVermouth:	15,
  Tequila: 	30,
  Vodka:	85,
  Cointreau:	10,
}

// Get current stock form local storage
function loadCurrent() {
  // Get search history from localStorage
  var a = JSON.parse(localStorage.getItem('currentStock'))
  // If search history were retrieved from localStorage, update 
  if (a !== null) {
   currentStock = a;
  }
  
}
// Get last order from local storage to calculate cost of ingredients
function lastOrder() {
  // Get search history from localStorage
  var a = JSON.parse(localStorage.getItem('lastOrder'))
  // If search history were retrieved from localStorage, update 
  if (a !== null) {
   lastStock = a;
  }
  
}

// Get number of cocktail sold from local storage to calculate sale
function getSale() {
  // Get search history from localStorage
  var a = JSON.parse(localStorage.getItem('totalCocktailsSold'))
  // If search history were retrieved from localStorage, update 
  if (a !== null) {
    
    cocktailSale = a;
    console.log(a)
  }
}

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
  document.location= 'currentstock.html';
}
// redirect to menu page
function toMenu() { 
  modal.classList.remove('is-active');
  document.location= 'index.html';
}

// Get current stock from local storage
function getStock() {
  var stock = JSON.parse(localStorage.getItem("currentStock")); 
}



// Display best seller last week
function bestSeller() {
  if (cocktailSale !== undefined) {
  let best = [
    {
      name: 'Long Island',
      sale :	cocktailSale["totalLongIslandSold"],
    },
    {
      name: 'Manhattan',
      sale :	cocktailSale["totalManhattanSold"],
    },
    {
      name: 'Margarita',
      sale	:cocktailSale["totalMargaritaSold"], 
    },
    {
      name: 'Greyhound',
      sale	:cocktailSale["totalGreyhoundSold"], 
    },
    {
      name: 'Martini',
      sale:	cocktailSale["totalMartiniSold"],
    },
    {
      name: 'Bloody Mary',
      sale:	cocktailSale["totalBloodyMarySold"],
    },
    {
      name: 'Negroni',
      sale:	cocktailSale["totalNegroniSold"],
    },
    {
      name: 'Amaretto Sour',
      sale: 	cocktailSale["totalAmarettoSourSold"],
    },
    {
      name: 'Tequila Fizz',
      sale:	cocktailSale["totalTequilaFizzSold"],
    }
  ]
  let max = best[0];
  for (let i=0;i<best.length;i++) {
    if (max.sale < best[i].sale){
      max = best[i]
    }
  }
  bestsell.textContent = max.name;
  return max
}
  else {return max= "N/A"}
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
    earning += Math.round(sold);
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
  cost += Math.round(sold*stockPrice[i]);
 }
 ing.textContent='$'+cost;
 return cost;
}

// suggest drink type based on weather
function drinkSug() {
  var sum=0;
  var result
  for (var i=0; i<tempArray.length;i++) {
    sum += tempArray[i];
  }
  var avg = sum/tempArray.length;
  console.log(avg);
  if (avg>27) {
    drinkType.textContent = 'Warm drink';
    buyStock(warm);
     result=warm;

  }
  else if (17<=avg && avg <=27){
    drinkType.textContent = 'Both';
    buyStock(normalStock);
     result=normalStock;
  }
  else {
    drinkType.textContent = 'Cold drink';
    buyStock(cold);
     result=cold;
  }
  return result;
}

// suggest drink what to buy 
function buyStock(option) {
  for (let i in currentStock) {
    property = `${i}`;
    order[property] = option[i]-currentStock[i];
    }
  console.log(order)
  createTable(order);
}

// create order list;
function createTable(obj) {
  orderList.innerHTML='';
  for (let i in obj) {
    // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
    if (obj.hasOwnProperty(i)) {
      var tr = document.createElement('tr');
      var td1= document.createElement('td');
      td1.innerText = `${i}`;
      var td2= document.createElement('td');
      console.log(i)
      td2.innerText = Math.round(`${obj[i]}`) + 'oz';
      td2.classList.add(i);
      tr.appendChild(td1);
      tr.appendChild(td2);
      orderList.appendChild(tr);
    }
  }
}


// Update current stock and save to local storage, 

function update () {
  var saveBtn = document.querySelector('#saveBtn');
  saveBtn.addEventListener('click',function(){
    localStorage.setItem('currentStock', JSON.stringify(drinkSug()));
    localStorage.setItem('lastOrder', JSON.stringify(drinkSug()));
    window.localStorage.removeItem('totalCocktailsSold');
    localStorage.setItem('lastOrder', JSON.stringify(drinkSug()));
    // anouce that new order list and new stock list are saved;
    var saveAlert= document.querySelector('#saveAlert');
    saveAlert.classList.add('is-active');
    // Sets interval in variable
    secondsLeft = 1;
    var timerInterval = setInterval(function() {
    secondsLeft--;
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      saveAlert.classList.remove('is-active');
    }

  }, 1000)
  })  
}

// Download order as csv file
function download_table_as_csv(table_id, separator = ',') {
  // Select rows from table_id
  var rows = document.querySelectorAll('#' + table_id + ' tr');
  // Construct csv
  var csv = [];
  for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll('td, th');
      for (var j = 0; j < cols.length; j++) {
          // Clean innertext to remove multiple spaces and jumpline (break csv)
          var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
          data = data.replace(/"/g, '""');
          // Push escaped string
          row.push('"' + data + '"');
      }
      csv.push(row.join(separator));
  }
  var csv_string = csv.join('\n');
  // Download it
  var filename =  table_id + '_' + new Date().toLocaleDateString() + '.csv';
  var link = document.createElement('a');
  link.style.display = 'none';
  link.setAttribute('target', '_blank');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// innit
function innit() {
  loadCurrent();
  lastOrder() ;
  getSale();
  bestSeller();
  fetchCoor();
  launchModal();
  returnMenu.addEventListener('click', toMenu);
  returnCurrentStock.addEventListener('click', tocurrentstock);
  closeModal.addEventListener('click',function(){
    modal.classList.remove('is-active');
  })
  update()
  downloadBtn.addEventListener('click',function(){
    download_table_as_csv('order')});
}


innit();


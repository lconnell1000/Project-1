const APIkey = 'ba9bcf4f4e1396ead860b9554bf409d3';
var displayDate= moment();
var weather = document.querySelector('#weather')
var openModal = document.querySelector('#launchModal');
var modal = document.querySelector('.modal');
var closeModal= document.querySelector('.modal-close')
var closebtn= document.querySelector('#closebtn')
var setDate = moment().day(0).format('ddd');
var currentDate = moment().format('ddd');
var returnMenu = document.querySelector('#returnMenu');
var returnCurrentStock=document.querySelector('#returnCurrentStock')
// fetch city's lat and lon
function fetchCoor() {
    var link5day = 'https://api.openweathermap.org/data/2.5/forecast?q=Adelaide&cnt=6&appid='+APIkey+'&units=metric';
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
  var APIonecall = data;
  futureWeather(APIonecall);
  });  
}

function futureWeather(a) {
    for (var i=1; i<7;i++){
        forecast = document.createElement('div');
        forecast.className = "tile"
        date = document.createElement('h4')
        var img = document.createElement('img');
        img.setAttribute("src", 'http://openweathermap.org/img/wn/'+a.daily[i].weather[0].icon+'@2x.png');
        futureConditions = document.createElement('ul');
        forecast.className = "tile is-vertical"
        futureTemp= document.createElement('li');
        nextdate=displayDate.add(1,"day");
        date.textContent= nextdate.format("DD/MM/YYYY");
        futureTemp.textContent= "Temp: "+ a.daily[i].temp.day+ " \xB0C";
        weather.appendChild(forecast);
        forecast.appendChild(date);
        forecast.appendChild(img);
        forecast.appendChild(futureConditions);
        futureConditions.appendChild(futureTemp);
    }
}

function launchModal() {
 modal.classList.add('is-active')
}

function tocurrentstock() { 
  modal.classList.remove('is-active')
  document.location= 'https://juvenexaesthetics.com.au/wp-content/uploads/2020/05/test.png';
}

function toMenu() { 
  modal.classList.remove('is-active');
  document.location= 'https://juvenexaesthetics.com.au/wp-content/uploads/2020/05/test.png';
}

function innit() {
  fetchCoor();
  if (currentDate !== setDate) {
    launchModal();
  }
  openModal.addEventListener('click',launchModal);
  returnMenu.addEventListener('click', toMenu);
  returnCurrentStock.addEventListener('click', tocurrentstock);
  closeModal.addEventListener('click',function(){
    modal.classList.remove('is-active');
  })
}

innit();



function check(data){

  window.navigator?.vibrate?.(200);
  console.log("vibration")

let adult= document.getElementById("adult")

let teen= document.getElementById("teen")

let baby= document.getElementById("baby")
  switch(data.bilet){
    case "Ekonomiczna":
      location.href="/returns/"+data.lot.id+"/"+data.bilet+"/"+data.lot.economic+"/"+ adult.value+"/"+teen.value+"/"+baby.value;;
    break;
    case "Premium":
      console.log(data.lot.premium)
      location.href="/returns/"+data.lot.id+"/"+data.bilet+"/"+data.lot.premium+"/"+ adult.value+"/"+teen.value+"/"+baby.value;;
    break;
    case "Biznes":
      location.href="/returns/"+data.lot.id+"/"+data.bilet+"/"+data.lot.business+"/"+ adult.value+"/"+teen.value+"/"+baby.value;;
    break;

  }

  
}

function result(data){
  window.navigator?.vibrate?.(200);
  console.log("vibration")


 if(data.back===undefined){
  console.log("lot")
  location.href="/result/"+data.lot.id+"/"+data.bilet+"/"+0;

 }else{
  console.log("back")
  location.href="/result/"+data.lot.id+"/"+data.bilet+"/"+data.back.nr_rejsu;
 }
 
    
  }
  

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function(event) {
  
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


  function czasDoWydarzenia()
  {
    var aktualnyCzas = new Date();
    var dataWydarzenia = new Date("2023-12-15");
    var pozostalyCzas = dataWydarzenia.getTime() - aktualnyCzas.getTime();
    
    if (pozostalyCzas > 0)
    {						
      var s = pozostalyCzas / 1000;	// sekundy
      var min = s / 60;				// minuty
      var h = min / 60;				// godziny
  
      var sLeft = Math.floor(s  % 60);	// pozostało sekund		
      var minLeft = Math.floor(min % 60);	// pozostało minut
      var hLeft = Math.floor(h);			// pozostało godzin	
      
      if (minLeft < 10)
        minLeft = "0" + minLeft;
      if (sLeft < 10)
        sLeft = "0" + sLeft;
      var days=parseInt(hLeft/24);
      return days+ " Dni "+hLeft%24+" Godzin " + minLeft + " Minut " + sLeft+" Sekund";
    }
    else
      return "Koniec promocji";
  }
            
  window.onload = function()
  {
    idElement = "time";
    document.getElementById(idElement).innerHTML = czasDoWydarzenia(2010, 11, 20, 20, 0, 0, 0);
    setInterval("document.getElementById(idElement).innerHTML = czasDoWydarzenia(2010, 11, 20, 20, 0, 0, 0)", 1000);
  };
  
czasDoWydarzenia()

let dist=0
var finder = document.getElementById("find").addEventListener('click',()=>{
  window.navigator?.vibrate?.(200);
  console.log("vibration")
let from = document.getElementById("from")
let to = document.getElementById("to")
let air = document.getElementById("air")

var startData = document.getElementById("datepicker").value;
var backData =  document.getElementById("returndatepicker").value;
var adult =  document.getElementById("adult").value;
var teen =  document.getElementById("teen").value;

var request = new XMLHttpRequest()


if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  console.log("Geo Location not supported by browser");
}

function showPosition(position) {



 var   longitude = position.coords.longitude
  var  latitude  = position.coords.latitude
  request.open('GET', 'https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json', true)

  request.onload = function () {
   var data = JSON.parse(this.response)
  
    if (request.status >= 200 && request.status < 400) {
      dist= distance(data.results[0].longitude,data.results[0].latitude,  (-0.166670),51.500000)
        
     
  
    } else {
      console.log('error')
    }
  }
  
  // Send request
  request.send()
 
}





location.href="/viewLots/"+startData+"/"+backData+"/"+from[from.selectedIndex].text+"/"+to[to.selectedIndex].text+"/"+air[air.selectedIndex].text+"/"+adult+"/"+teen+"/"+dist;



})


function pay(data){

  
 location.href="/pay/"+data
}
function distance ( lat1a,  lon1a,  lat2a,  lon2a)
{
 
    
  var R = 6371.0; // km
  var  lon1 = DegToRad(lat1a);
  var lat1 = DegToRad(lon1a);

  var lon2 = DegToRad(lat2a);
  var lat2 = DegToRad(lon2a);

  var dLat = lat2 - lat1;
  var dLon = lon2 - lon1;

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 
  return( R * c * 1000)/1000;
}
function DegToRad( degrees)
{
    return degrees * (Math.PI / 180);
}
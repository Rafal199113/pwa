
if('serviceWorker' in navigator) {
  
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/serviceWorker.js').then(function(registration) {
        console.log('Service worker successfully registered.');
      })
      .catch(function(error) {
        console.log('Service worker registration failed:', error);
      }).then((subscription) => {
      
      });
    })
  }
  
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Notification with ServiceWorker');
      });
    }
  });






setInterval(() => {

}, "5000");
const registration =  navigator.serviceWorker.getRegistration();
const sendNotification = async () => {
  
  if(Notification.permission === 'granted') {
    showNotification("Pozostało "+czasDoWydarzenia(2010, 11, 20, 20, 0, 0, 0));
  }
  else {
    if(Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
  
      if(permission === 'granted') {
        showNotification("Pozostało "+czasDoWydarzenia(2010, 11, 20, 20, 0, 0, 0));
      }
    }
  }
  };
  
  const showNotification = body => {
  const title = 'Promocja';
  
  const payload = {
    body
  };
  
  if('showNotification' in registration) {
    registration.showNotification(title, payload);
  }
  else {
    new Notification(title, payload);
  }
};
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
            
  // function to actually ask the permissions
  function handlePermission(permission) {
    // set the button to shown or hidden, depending on what the user answers
   
  }

  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
  } else {
    Notification.requestPermission().then((permission) => {
      handlePermission(permission);
    });
  }


function openNav() {
  window.navigator?.vibrate?.(200);
  console.log("vibration")
    document.getElementById("mySidenav").style.width = "40%";
  }
  

  function closeNav() {window.navigator?.vibrate?.(200);
    console.log("vibration")
    document.getElementById("mySidenav").style.width = "0";
  }

  function showPassengers() {
   if( document.getElementById("passengers").style.height=="500px"){
    document.getElementById("passengers").style.height = "0";
    document.getElementById("form").style.visibility = "hidden";
    document.getElementById("form").style.opacity = "0%";
   }else{
    document.getElementById("passengers").style.height = "500px";
    document.getElementById("form").style.visibility = "visible";
    document.getElementById("form").style.opacity = "100%";

   }
 
   
  }


  
new Promise((res,req)=>{

res(document.getElementsByClassName("addbutton"))

}).then((data)=>{
   for(i=0;i<data.length;i++){
    data[i].addEventListener('click', (event)=>{
          if(event.srcElement.value=="+"){
            let value =  parseInt(event.srcElement.parentNode.children[2].value);
            console.log(value)
            event.srcElement.parentNode.children[2].value=++value
          }
          else{
            let value =  parseInt(event.srcElement.parentNode.children[2].value);
            if(value>0){
              event.srcElement.parentNode.children[2].value=--value
            }
         
          }

            
          
      

    });
   }
   

})


function confirmPassengers(){




}
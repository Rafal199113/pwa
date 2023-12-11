


function generateRandomDate(from, to) {
    return new Date(
      from.getTime() +
        Math.random() * (to.getTime() - from.getTime()),
    );
  }
  function addHours(date, hours) {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  
    return date;
  }
  var  alfabet = ['A','B','C','D','E','F','G','H','I'];
  var days = ['Niedziela','Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', ];
  var months = ['Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień','Styczeń']
const planes=[
  {"type":"Boeing 707-320B","sits":219},
  {"type":"Boeing 707-320B","sits":189},
  {"type":"McDonnell Douglas DC-9","sits":135},
  {"type":"Airbus A320","sits":179},
  {"type":"Airbus A380","sits":853 }
]




async  function create(selected,rel,air,isProm,back){
   
  const lots=[]



 
   
  const randomDate= selected
  
  const date = days[randomDate.getDay()]+" "+randomDate.getDate()+" "+months[randomDate.getMonth()]+" " + randomDate.getFullYear()

   const backDate= new Date(back)
  
  for(i=0;i<10;i++){
     
  
   
      lots.push(new lot(i,date,randomDate,rel,Math.floor(Math.random() * 1000),125,planes[Math.floor(Math.random() * 4)],4,"noBack",backDate,air,isProm))
   
    

   
  }
  
  
  

return lots;




    
     
  }
  

 



class lot{

constructor(id,data,start_time,relation,line,nr_rejsu,type_plane,fly_time,type,backtime,air,isProm){
       this.id=id;
       this.data=data;
       this.setDate(start_time,(relation.distance/900))
      this.datee=start_time;
       this.start_source=relation.from;
       this.target=relation.to;
       this.air=air;
       this.sit=Math.floor(Math.random() * type_plane.sits-1)
       this.Gate=alfabet[Math.floor(Math.random() * alfabet.length-1)]+Math.floor(Math.random() * 10)
       this.line=line;
       this.isProm=isProm;
       this.type=type;
       this.nr_rejsu=nr_rejsu;
       this.type_plane=type_plane.type;
       if(type=="back"){
        this.fly_time=fly_time
        
       }
       this.fly_time=(relation.distance/900).toFixed(2)
       if(type=="noBack"){
        
        this.createBackFlyies(backtime,relation,type_plane,this.fly_time ,start_time)
       
       }
       this.setAvaibleSites(type_plane.sits)
       this.setPrice(relation.distance)


}
setDate(start,time){
  
  let startHour= start.getHours();
  if(startHour<10)startHour="0"+start.getHours();
  let startMinutes= start.getMinutes();
  if(startMinutes<10)startMinutes="0"+start.getMinutes();
  this.start_time=startHour+":"+startMinutes;
  const end = addHours(start,time.toFixed(2));
  let endHour= end.getHours();
  if(endHour<10)endHour="0"+end.getHours();
  let endMinutes= end.getMinutes();
  if(endMinutes<10)endMinutes="0"+end.getMinutes();
  this.end_time=endHour+":"+endMinutes;
  
}

createBackFlyies(back,start,type_plane,time,startTime){

  this.createBackFlyies=[]
   
    this.createBackFlyies.push(new lot(
      this.id,
    back.toDateString()  
    ,back,
   {"from":start.to,
    "to":start.from,
    "distance":start.distance
  },
    this.line,
    Math.floor(Math.random() * 1000),
    type_plane,
   time,
    "back",
    back))

    this.createBackFlyies.push(new lot(
      this.id,
      back.toDateString()  
      ,back,
      {"from":start.to,
      "to":start.from,
      "distance":start.distance
    },
      this.line,
      Math.floor(Math.random() * 1000),
      type_plane,
      this.fly_time,
      "back",
      back))

      this.createBackFlyies.push(new lot(
        this.id,
        back.toDateString()  
        ,back,
        {"from":start.to,
        "to":start.from,
        "distance":start.distance
      },
        this.line,
        Math.floor(Math.random() * 1000),
        type_plane,
        this.fly_time,
        "back",
        back))
     
       
}
setAvaibleSites(sits){
         
        this.procentOfAvaibleSits=Math.floor(Math.random() * 50)
        this.avaibleSits=parseInt(sits*(this.procentOfAvaibleSits/100))
        let avaible = this.avaibleSits;
        
          
          let sits1= parseInt(Math.floor(Math.random() * avaible));
            if(sits>0) {this.economySits= sits1} else this.economySits= 0;
             
        
        
          let sits2=  parseInt((Math.floor(Math.random() * avaible)+5));
          if(sits2>0) {this.premiumSits= sits2} else this.premiumSits= 0;


          let sits3=  parseInt(avaible-this.businessSits-this.premiumSits);
          if(sits3>0) {this.businessSits= sits3} else this.businessSits= 0;
          
        
         
        
}
setPrice(distance){
   var basicPrice=0;
   basicPrice=distance*(Math.floor((Math.random() * 30) + 20)/100);
   
   this.day=this.datee.getDay();
   if(this.day>1&&this.day<5){
      this.price=(0.12*basicPrice)+basicPrice
    


   }
   else{
    this.price=(0.20*basicPrice)+basicPrice
   }
   if(this.procentOfAvaibleSits<15){
    (this.price+=this.price*0.20);

   }
   let price = this.price;
   this.price=this.price.toFixed(2)
   this.economic=price.toFixed(2);
   this.premium=(price+(price*0.10)).toFixed(2);
   this.business=(price+(price*0.20)).toFixed(2);

}




}
var container = document.getElementById('container');




var to = document.getElementById("to");

document.getElementById('find').addEventListener('click',()=>{
alert("cipeczka")
console.log("cycuszki")


})

  function book(){
    while(container.lastChild) {
      container.lastChild.remove();
    }
    create(new Date(2023-11-12), {
      "from": "Warszawa",
      "to": to[to.selectedIndex].text,
      "distance":1450
     
     
    },"Lot",true,new Date(2023-12-10)).then(data=>{
     
      for(i=0;i<data.length;i++){
          
          let wylot = document.createElement('div')
          wylot.setAttribute("class","wylot")
  
          let startImg = document.createElement('img')
          startImg.setAttribute("src","/pic/start.png")
          
  
  
          let selectedDate = document.createElement('p')
          selectedDate.setAttribute("class","selectedDate")
          selectedDate.innerHTML=data[i].data
  
          wylot.appendChild(startImg)
          wylot.appendChild(selectedDate)
  
          let flighters = document.createElement('div')
          flighters.setAttribute("id","flightes")
  
          container.appendChild(flighters)
  
          let oneFly = document.createElement('div')
          oneFly.setAttribute("class","oneFly")
          
          flighters.appendChild(wylot)
          flighters.appendChild(oneFly)
   
  
          let field = document.createElement('div')
          field.setAttribute("class","field")
  
          let nameField = document.createElement('p')
          nameField.setAttribute("class","name")
          nameField.innerHTML="Relacja"
  
          let sourceField = document.createElement('p')
          sourceField.setAttribute("class","data")
          sourceField.innerHTML=data[i].start_source
  
          let relImg = document.createElement('img')
          relImg.setAttribute("src","/pic/fly_track.png")
          relImg.setAttribute("class","flyTrack")
          
  
          let targetField = document.createElement('p')
          targetField.setAttribute("class","data")
          targetField.innerHTML=data[i].target
          
          
          
          
          let time = document.createElement('div')
          time.setAttribute("class","field")
  
          let hours = document.createElement('p')
          hours.setAttribute("class","name")
          hours.innerHTML="Godziny"
  
          let startTime = document.createElement('p')
          startTime.setAttribute("class","data")
          startTime.innerHTML=data[i].start_time
  
          let _time = document.createElement('p')
          _time.setAttribute("class","data")
          _time.innerHTML=data[i].fly_time+" h"
  
          let endTime = document.createElement('p')
          endTime.setAttribute("class","data")
          endTime.innerHTML=data[i].end_time
  
          
          
          
          let tickets = document.createElement('div')
          tickets.setAttribute("class","field")
  
          let cena = document.createElement('p')
          cena.setAttribute("class","name")
          cena.innerHTML="Cena"
  
          let eco = document.createElement('div')
          eco.setAttribute("class","class")
  
          let ecoImg = document.createElement('img')
          ecoImg.setAttribute("src","/pic/ticket.png")
          ecoImg.setAttribute("class","ticket")
  
          let ticketName = document.createElement('p')
          ticketName.setAttribute("class","price")
          ticketName.innerHTML="Ekonomiczny"
          
          let ticketPrice = document.createElement('p')
          ticketPrice.setAttribute("class","price")
          ticketPrice.innerHTML=data[i].economic+" zł"
  
          let ticketSits = document.createElement('p')
          ticketSits.setAttribute("class","price")
          ticketSits.innerHTML=data[i].economySits
  
          let button = document.createElement('button')
          button.setAttribute("class","buy")
          button.setAttribute("value","Rezerwuj")
          button.setAttribute("onclick", "next('Ekonomiczna','"+JSON.stringify(data)+"',"+data[i].id+")")
          
          button.innerHTML="Rezerwuj"
          
          let prem = document.createElement('div')
          prem.setAttribute("class","class")
  
          let premImg = document.createElement('img')
          premImg.setAttribute("src","/pic/ticket.png")
          premImg.setAttribute("class","ticket")
  
          let premticketName = document.createElement('p')
          premticketName.setAttribute("class","price")
          premticketName.innerHTML="Premium"
          
          let premticketPrice = document.createElement('p')
          premticketPrice.setAttribute("class","price")
          premticketPrice.innerHTML=data[i].premium+" zł"
  
          let premticketSits = document.createElement('p')
          premticketSits.setAttribute("class","price")
          premticketSits.innerHTML=data[i].premiumSits
  
          let prembutton = document.createElement('button')
          prembutton.setAttribute("class","buy")
          prembutton.setAttribute("value","Rezerwuj")
          prembutton.setAttribute("onclick", "next('Premium','"+JSON.stringify(data)+"',"+data[i].id+")")
          
          prembutton.innerHTML="Rezerwuj"
         
          let bis = document.createElement('div')
          bis.setAttribute("class","class")
  
          let bisImg = document.createElement('img')
          bisImg.setAttribute("src","/pic/ticket.png")
          bisImg.setAttribute("class","ticket")
  
          let bisticketName = document.createElement('p')
          bisticketName.setAttribute("class","price")
          bisticketName.innerHTML="Biznes"
          
          let bisticketPrice = document.createElement('p')
          bisticketPrice.setAttribute("class","price")
          bisticketPrice.innerHTML=data[i].business+" zł"
  
          let bisticketSits = document.createElement('p')
          bisticketSits.setAttribute("class","price")
          bisticketSits.innerHTML=data[i].premiumSits
  
          let bisbutton = document.createElement('button')
          bisbutton.setAttribute("class","buy")
          bisbutton.setAttribute("value","Rezerwuj")
          bisbutton.setAttribute("onclick", "next('Biznes','"+JSON.stringify(data)+"',"+data[i].id+")")
          
          bisbutton.innerHTML="Rezerwuj"
          tickets.appendChild(ticketName)
          tickets.appendChild(cena)
          tickets.appendChild(eco)
          eco.appendChild(ecoImg)
          eco.appendChild(ticketName)
          eco.appendChild(ticketPrice)
          eco.appendChild(ticketSits)
          eco.appendChild(button)
          
          tickets.appendChild(prem)
          prem.appendChild(premImg)
          prem.appendChild(premticketName)
          prem.appendChild(premticketPrice)
          prem.appendChild(premticketSits)
          prem.appendChild(prembutton)
          
          tickets.appendChild(bis)
          bis.appendChild(bisImg)
          bis.appendChild(bisticketName)
          bis.appendChild(bisticketPrice)
          bis.appendChild(bisticketSits)
          bis.appendChild(bisbutton)
          
          
          field.appendChild(nameField)
          field.appendChild(sourceField)
          field.appendChild(relImg)
          field.appendChild(targetField)
          
         
          
          time.appendChild(hours)
          time.appendChild(startTime)
          time.appendChild(_time)
          time.appendChild(endTime)
  
          oneFly.appendChild(field)
          oneFly.appendChild(time)
          oneFly.appendChild(tickets)
  
      }
  
  
  
  
  
    })
   
  }


  function next(klasa,data,id){
   var loty = JSON.parse(data);
   while(container.lastChild) {
    container.lastChild.remove();
  }
 
   for(x=0;x<loty.length;x++){
    if(loty[x].id===id){
      var backs=loty[x].createBackFlyies;

      let info = document.createElement('div')
      info.setAttribute("id","info")
      
      let pods=document.createElement('h1')
      pods.innerHTML="Podsumowanie"

      let rel = document.createElement('div')
      rel.setAttribute("class","selectedTicket")

      let selectRel = document.createElement('p')
      selectRel.setAttribute("class","name")
      selectRel.innerHTML="Wybrana relacja:"
      
      let nameField = document.createElement('p')
      nameField.setAttribute("class","data")
      nameField.innerHTML="Z "+loty[x].start_source+" do "+loty[x].target
        
      rel.appendChild(selectRel)
      rel.appendChild(nameField)

      let klasadiv = document.createElement('div')
      klasadiv.setAttribute("class","selectedTicket")

      let klasaname = document.createElement('p')
      klasaname.setAttribute("class","name")
      klasaname.innerHTML="Klasa:"
      
      let klasaField = document.createElement('p')
      klasaField.setAttribute("class","data")
      klasaField.innerHTML=klasa

      let adultdiv = document.createElement('div')
      adultdiv.setAttribute("class","selectedTicket")

      let adultname = document.createElement('p')
      adultname.setAttribute("class","name")
      adultname.innerHTML="Bilety dla dorosłych:"
      
      let adultfield = document.createElement('p')
      adultfield.setAttribute("class","data")
      adultfield.innerHTML=1

      let adultprice = document.createElement('p')
      adultprice.setAttribute("class","data")
      adultprice.innerHTML=loty[x].price+ "zł"

      adultdiv.appendChild(adultname)
      adultdiv.appendChild(adultfield)
      adultdiv.appendChild(adultprice)

      let teendiv = document.createElement('div')
      teendiv.setAttribute("class","selectedTicket")

      let teennname = document.createElement('p')
      teennname.setAttribute("class","name")
      teennname.innerHTML="Bilety dla młodzieży:"
      
      let teenfield = document.createElement('p')
      teenfield.setAttribute("class","data")
      teenfield.innerHTML=1

      let teenprice = document.createElement('p')
      teenprice.setAttribute("class","data")
      teenprice.innerHTML=loty[x].price+ "zł"


      teendiv.appendChild(teennname)
      teendiv.appendChild(teenfield)
      teendiv.appendChild(teenprice)

      let reserve = document.createElement('button')
      reserve.setAttribute("class","buy")
      reserve.setAttribute("value","Rezerwuj")
      reserve.setAttribute("onclick", "result('"+klasa+"','"+JSON.stringify(loty[x])+"',"+null+",'"+null+"')")
      reserve.innerHTML="Rezerwuj"

      info.appendChild(pods)
      info.appendChild(rel)
      info.appendChild(klasadiv)
      info.appendChild(adultdiv)
      info.appendChild(teendiv)
      info.appendChild(reserve)

      klasadiv.appendChild(klasaname)
      klasadiv.appendChild(klasaField)


      container.appendChild(info)
      
      for(i=0;i<backs.length;i++){

                 console.log(loty[x].createBackFlyies[i].target)
                 let wylot = document.createElement('div')
                 wylot.setAttribute("class","wylot")
         
                 let startImg = document.createElement('img')
                 startImg.setAttribute("src","/pic/start.png")
                 
         
         
                 let selectedDate = document.createElement('p')
                 selectedDate.setAttribute("class","selectedDate")
                 selectedDate.innerHTML=backs[i].data
         
                 wylot.appendChild(startImg)
                 wylot.appendChild(selectedDate)
         
                 let flighters = document.createElement('div')
                 flighters.setAttribute("id","flightes")
         
                 container.appendChild(flighters)
         
                 let oneFly = document.createElement('div')
                 oneFly.setAttribute("class","oneFly")
                 
                 flighters.appendChild(wylot)
                 flighters.appendChild(oneFly)
          
         
                 let field = document.createElement('div')
                 field.setAttribute("class","field")
         
                 let nameField = document.createElement('p')
                 nameField.setAttribute("class","name")
                 nameField.innerHTML="Relacja"
         
                 let sourceField = document.createElement('p')
                 sourceField.setAttribute("class","data")
                 sourceField.innerHTML=backs[i].start_source
         
                 let relImg = document.createElement('img')
                 relImg.setAttribute("src","/pic/fly_track.png")
                 relImg.setAttribute("class","flyTrack")
                 
         
                 let targetField = document.createElement('p')
                 targetField.setAttribute("class","data")
                 targetField.innerHTML=backs[i].target
                 
                 
                 
                 
                 let time = document.createElement('div')
                 time.setAttribute("class","field")
         
                 let hours = document.createElement('p')
                 hours.setAttribute("class","name")
                 hours.innerHTML="Godziny"
         
                 let startTime = document.createElement('p')
                 startTime.setAttribute("class","data")
                 startTime.innerHTML=backs[i].start_time
         
                 let _time = document.createElement('p')
                 _time.setAttribute("class","data")
                 _time.innerHTML=backs[i].fly_time+" h"
         
                 let endTime = document.createElement('p')
                 endTime.setAttribute("class","data")
                 endTime.innerHTML=backs[i].end_time
         
                 
                 
                 
                 let tickets = document.createElement('div')
                 tickets.setAttribute("class","field")
         
                 let cena = document.createElement('p')
                 cena.setAttribute("class","name")
                 cena.innerHTML="Cena"
         
                 let eco = document.createElement('div')
                 eco.setAttribute("class","class")
         
                 let ecoImg = document.createElement('img')
                 ecoImg.setAttribute("src","/pic/ticket.png")
                 ecoImg.setAttribute("class","ticket")
         
                 let ticketName = document.createElement('p')
                 ticketName.setAttribute("class","price")
                 ticketName.innerHTML="Ekonomiczny"
                 
                 let ticketPrice = document.createElement('p')
                 ticketPrice.setAttribute("class","price")
                 ticketPrice.innerHTML=backs[i].economic+" zł"
         
                 let ticketSits = document.createElement('p')
                 ticketSits.setAttribute("class","price")
                 ticketSits.innerHTML=backs[i].economySits
         
                 let button = document.createElement('button')
                 button.setAttribute("class","buy")
                 button.setAttribute("value","Rezerwuj")
                 button.setAttribute("onclick", "result('"+klasa+"','"+JSON.stringify(loty[x])+"','Ekonomiczna','"+JSON.stringify(backs[i])+"')")
                 
                 button.innerHTML="Rezerwuj"
                 
                 let prem = document.createElement('div')
                 prem.setAttribute("class","class")
         
                 let premImg = document.createElement('img')
                 premImg.setAttribute("src","/pic/ticket.png")
                 premImg.setAttribute("class","ticket")
         
                 let premticketName = document.createElement('p')
                 premticketName.setAttribute("class","price")
                 premticketName.innerHTML="Premium"
                 
                 let premticketPrice = document.createElement('p')
                 premticketPrice.setAttribute("class","price")
                 premticketPrice.innerHTML=backs[i].premium+" zł"
         
                 let premticketSits = document.createElement('p')
                 premticketSits.setAttribute("class","price")
                 premticketSits.innerHTML=backs[i].premiumSits
         
                 let prembutton = document.createElement('button')
                 prembutton.setAttribute("class","buy")
                 prembutton.setAttribute("value","Rezerwuj")
                 prembutton.setAttribute("onclick", "result('"+klasa+"','"+JSON.stringify(loty[x])+"','Premium','"+JSON.stringify(backs[i])+"')")
                 
                 prembutton.innerHTML="Rezerwuj"
                
                 let bis = document.createElement('div')
                 bis.setAttribute("class","class")
         
                 let bisImg = document.createElement('img')
                 bisImg.setAttribute("src","/pic/ticket.png")
                 bisImg.setAttribute("class","ticket")
         
                 let bisticketName = document.createElement('p')
                 bisticketName.setAttribute("class","price")
                 bisticketName.innerHTML="Biznes"
                 
                 let bisticketPrice = document.createElement('p')
                 bisticketPrice.setAttribute("class","price")
                 bisticketPrice.innerHTML=backs[i].business+" zł"
         
                 let bisticketSits = document.createElement('p')
                 bisticketSits.setAttribute("class","price")
                 bisticketSits.innerHTML=backs[i].premiumSits
         
                 let bisbutton = document.createElement('button')
                 bisbutton.setAttribute("class","buy")
                 bisbutton.setAttribute("value","Rezerwuj")
                 bisbutton.setAttribute("onclick", "result('"+klasa+"','"+JSON.stringify(loty[x])+"','Biznes','"+JSON.stringify(backs[i])+"')")
                 
                 bisbutton.innerHTML="Rezerwuj"
                 tickets.appendChild(ticketName)
                 tickets.appendChild(cena)
                 tickets.appendChild(eco)
                 eco.appendChild(ecoImg)
                 eco.appendChild(ticketName)
                 eco.appendChild(ticketPrice)
                 eco.appendChild(ticketSits)
                 eco.appendChild(button)
                 
                 tickets.appendChild(prem)
                 prem.appendChild(premImg)
                 prem.appendChild(premticketName)
                 prem.appendChild(premticketPrice)
                 prem.appendChild(premticketSits)
                 prem.appendChild(prembutton)
                 
                 tickets.appendChild(bis)
                 bis.appendChild(bisImg)
                 bis.appendChild(bisticketName)
                 bis.appendChild(bisticketPrice)
                 bis.appendChild(bisticketSits)
                 bis.appendChild(bisbutton)
                 
                 
                 field.appendChild(nameField)
                 field.appendChild(sourceField)
                 field.appendChild(relImg)
                 field.appendChild(targetField)
                 
                
                 
                 time.appendChild(hours)
                 time.appendChild(startTime)
                 time.appendChild(_time)
                 time.appendChild(endTime)
         
                 oneFly.appendChild(field)
                 oneFly.appendChild(time)
                 oneFly.appendChild(tickets)
         
             }
      }
      
    }


   }

function result(klasa, loty, backklasa,back){

  var data = JSON.parse(loty);


  while(container.lastChild) {
   container.lastChild.remove();
 }


   

     let info = document.createElement('div')
     info.setAttribute("id","info")
     
     let pods=document.createElement('h1')
     pods.innerHTML="Podsumowanie"

     let rel = document.createElement('div')
     rel.setAttribute("class","selectedTicket")

     let selectRel = document.createElement('p')
     selectRel.setAttribute("class","name")
     selectRel.innerHTML="Wybrana relacja:"
     
     let nameField = document.createElement('p')
     nameField.setAttribute("class","data")
     nameField.innerHTML="Z "+data.start_source+" do "+data.target
       
     rel.appendChild(selectRel)
     rel.appendChild(nameField)

     let klasadiv = document.createElement('div')
     klasadiv.setAttribute("class","selectedTicket")

     let klasaname = document.createElement('p')
     klasaname.setAttribute("class","name")
     klasaname.innerHTML="Klasa:"
     
     let klasaField = document.createElement('p')
     klasaField.setAttribute("class","data")
     klasaField.innerHTML=klasa

     let adultdiv = document.createElement('div')
     adultdiv.setAttribute("class","selectedTicket")

     let adultname = document.createElement('p')
     adultname.setAttribute("class","name")
     adultname.innerHTML="Bilety dla dorosłych:"
     
     let adultfield = document.createElement('p')
     adultfield.setAttribute("class","data")
     adultfield.innerHTML=1

     let adultprice = document.createElement('p')
     adultprice.setAttribute("class","data")
     adultprice.innerHTML=data.price+ "zł"

     adultdiv.appendChild(adultname)
     adultdiv.appendChild(adultfield)
     adultdiv.appendChild(adultprice)

     let teendiv = document.createElement('div')
     teendiv.setAttribute("class","selectedTicket")

     let teennname = document.createElement('p')
     teennname.setAttribute("class","name")
     teennname.innerHTML="Bilety dla młodzieży:"
     
     let teenfield = document.createElement('p')
     teenfield.setAttribute("class","data")
     teenfield.innerHTML=1

     let teenprice = document.createElement('p')
     teenprice.setAttribute("class","data")
     teenprice.innerHTML=data.price+ "zł"


     teendiv.appendChild(teennname)
     teendiv.appendChild(teenfield)
     teendiv.appendChild(teenprice)


     let suma = document.createElement('div')
     suma.setAttribute("class","selectedTicket")

     let sumaname = document.createElement('p')
     sumaname.setAttribute("class","name")
     sumaname.innerHTML="Suma"
     
     let sumafield = document.createElement('p')
     sumafield.setAttribute("class","data")
     sumafield.innerHTML=(parseFloat(data.price)+parseFloat(data.price)).toFixed(2)

      suma.appendChild(sumaname)
      suma.appendChild(sumafield)

     let reserve = document.createElement('button')
     reserve.setAttribute("class","buy")
     reserve.setAttribute("value","Rezerwuj")
     //reserve.setAttribute("onclick", "result('"+klasa+"','"+JSON.stringify(loty[x])+"',"+null+",'"+null+"')")
     reserve.innerHTML="Rezerwuj"

     info.appendChild(pods)
     info.appendChild(rel)
     info.appendChild(klasadiv)
     info.appendChild(adultdiv)
     info.appendChild(teendiv)
     info.appendChild(suma)
     info.appendChild(reserve)

     klasadiv.appendChild(klasaname)
     klasadiv.appendChild(klasaField)


     container.appendChild(info)

     if(back!=undefined){

      var backf=JSON.parse(back)
      let backinfo = document.createElement('div')
      backinfo.setAttribute("id","info")
      
      let  backpods=document.createElement('h1')
      backpods.innerHTML="Bilet powrotny"
 
      let  backrel = document.createElement('div')
      backrel.setAttribute("class","selectedTicket")
 
      let  backselectRel = document.createElement('p')
      backselectRel.setAttribute("class","name")
      backselectRel.innerHTML="Wybrana relacja:"
      
      let  backnameField = document.createElement('p')
      backnameField.setAttribute("class","data")
      backnameField.innerHTML="Z "+data.target+" do "+data.start_source
        
      backrel.appendChild( backselectRel)
      backrel.appendChild( backnameField)
 
      let  backklasadiv = document.createElement('div')
      backklasadiv.setAttribute("class","selectedTicket")
 
      let  backklasaname = document.createElement('p')
      backklasaname.setAttribute("class","name")
      backklasaname.innerHTML="Klasa:"
      
      let backklasaField = document.createElement('p')
      klasaField.setAttribute("class","data")
      klasaField.innerHTML=backklasa
 
      let  backadultdiv = document.createElement('div')
      backadultdiv.setAttribute("class","selectedTicket")
 
      let  backadultname = document.createElement('p')
      backadultname.setAttribute("class","name")
      backadultname.innerHTML="Bilety dla dorosłych:"
      
      let  backadultfield = document.createElement('p')
      backadultfield.setAttribute("class","data")
      backadultfield.innerHTML=1
 
      let  backadultprice = document.createElement('p')
      backadultprice.setAttribute("class","data")
      backadultprice.innerHTML=backf.price+ "zł"
 
      backadultdiv.appendChild(backadultname)
      backadultdiv.appendChild(backadultfield)
      backadultdiv.appendChild(backadultprice)
 
      let backteendiv = document.createElement('div')
      backteendiv.setAttribute("class","selectedTicket")
 
      let backteennname = document.createElement('p')
      backteennname.setAttribute("class","name")
      backteennname.innerHTML="Bilety dla młodzieży:"
      
      let backteenfield = document.createElement('p')
      backteenfield.setAttribute("class","data")
      backteenfield.innerHTML=1
 
      let backteenprice = document.createElement('p')
      backteenprice.setAttribute("class","data")
      backteenprice.innerHTML=backf.price+ "zł"
 
 
      backteendiv.appendChild(backteennname)
      backteendiv.appendChild(backteenfield)
      backteendiv.appendChild(backteenprice)
 
 
      let backsuma = document.createElement('div')
      backsuma.setAttribute("class","selectedTicket")
 
      let backsumaname = document.createElement('p')
      backsumaname.setAttribute("class","name")
      backsumaname.innerHTML="Suma"
      
      let backsumafield = document.createElement('p')
      backsumafield.setAttribute("class","data")
      backsumafield.innerHTML=(parseFloat(backf.price)+parseFloat(backf.price)).toFixed(2)
 
      backsuma.appendChild(backsumaname)
      backsuma.appendChild(backsumafield)
 
      let backreserve = document.createElement('button')
      backreserve.setAttribute("class","buy")
      backreserve.setAttribute("value","Rezerwuj")
      //reserve.setAttribute("onclick", "result('"+klasa+"','"+JSON.stringify(loty[x])+"',"+null+",'"+null+"')")
      backreserve.innerHTML="Rezerwuj"
 
      backinfo.appendChild(backpods)
      backinfo.appendChild(backrel)
      backinfo.appendChild(backklasadiv)
      backinfo.appendChild(backadultdiv)
      backinfo.appendChild(backteendiv)
      backinfo.appendChild(backsuma)
      backinfo.appendChild(backreserve)
 
      backklasadiv.appendChild(backklasaname)
      backklasadiv.appendChild(backklasaField)
 
 
      container.appendChild(backinfo)


     }

}
     
  
  
  
  
  
  
   



  



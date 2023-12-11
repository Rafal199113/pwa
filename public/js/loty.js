var relations =
[
  {
    "from": "Warszawa",
    "to": "Londyn",
    "distance":1450
   
   
  },
  {
    "from": "Warszawa",
    "to": "Nowy Jork",
    "distance":13000

    
  },
  {
    "from": "Warszawa",
    "to": "Paryż",
    "distance":2443
  },
  {
    "from": "Warszawa",
    "to": "Berlin",
    "distance":910
  },
  {
    "from": "Warszawa",
    "to": "Tokio",
    "distance":17249
  },
  {
    "from": "Warszawa",
    "to": "Los Angeles",
    "distance":18621
  },
  {
    "from": "Warszawa",
    "to": "Rzym",
    "distance":2892
  },
  {
    "from": "Warszawa",
    "to": "Madryt",
    "distance":2289
  },
  {
    "from": "Warszawa",
    "to": "Dubaj",
    "distance":4163
  },
  {
    "from": "Warszawa",
    "to": "Sztokholm",
    "distance":810
  },
  {
    "from": "Warszawa",
    "to": "Amsterdam",
    "distance":1093
  },
  {
    "from": "Warszawa",
    "to": "Moskwa",
    "distance":1150
  },
  {
    "from": "Warszawa",
    "to": "Barcelona",
    "distance":1863
  },
  {
    "from": "Warszawa",
    "to": "Lizbona",
    "distance":2759
  },
  {
    "from": "Warszawa",
    "to": "Ateny",
    "distance":1598
  },
  {
    "from": "Warszawa",
    "to": "Bangkok",
    "distance":8085
  },
  {
    "from": "Warszawa",
    "to": "Rio de Janeiro",
    "distance":10404
  },
  {
    "from": "Warszawa",
    "to": "Toronto",
    "distance":6918
  },
  {
    "from": "Warszawa",
    "to": "Praga",
    "distance":517
  }
]






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
       console.log(selected)
       console.log(selected)
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
            
            this.createBackFlyies(backtime,relation,type_plane,this.fly_time )
           
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

    createBackFlyies(back,start,type_plane,time){
    
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
module.exports={create}
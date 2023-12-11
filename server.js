const express = require('express')
const relation=require('./public/relations.json')
const path = require('path')
const lot = require('./public/js/loty')
const weather = require('./public/js/weather')
const { render } = require('pug')
var paypal = require('paypal-rest-sdk');
const httpPort = 4000
const createuser = require('./public/js/user')
const payment = require("./public/js/payment")
const pug = require('pug');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage  = new LocalStorage('./scratch');
const cheerio=require("cheerio")
const unirest =require("unirest")
var dataa=[];
const app = express()
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, 'public')))

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ATfr30FIA9mDKdO6ExBkJZHdavL7UiviAAYDtNEQdLWTf7JsS1rktGn0PogyxDhsBnbbwHlagMx3faBB',
  'client_secret': 'EFTpaPI59NhjFutbjPpxoC-y_7ocUIVKrMbIIHHj9xqs4abAxWrd5a1eyHqpgog6gXAfGNqmttz7seAX'
});


app.get('/', function(req, res) {
  res.render('pay',{relation, adult:0,teen:0})
})
app.get('/viewLots/:data/:back/:from/:to/:air/:adult/:teen/:dist', async  function(req, res) {
 

  let adult=req.params.adult
  let teen = req.params.teen
  localStorage.setItem("user",JSON.stringify({
      "startDate":req.params.data,
      "endDate":req.params.back,
      "from":req.params.from,
      "to":req.params.to,
      "air":req.params.air,


  }))
  let promothion=[]
  let isProm=false;
await    new Promise((res,error)=>{
  
      for(i=0;i<=3;i++){
           promothion.push(relation[Math.floor(Math.random() * relation.length-1)])
      }
    
        res(isProm)
    }).then(async data=>{
     
      data=true;
      
    
      
      await  lot.create(new Date(req.params.data),relation.find(x=>x.to===req.params.to),req.params.air,data,req.params.back).then(data=>{
  
        localStorage.setItem("data",JSON.stringify(data))
        res.render("lots", { loty: data , linie:req.params.air,relation,adult,teen,distance:req.params.dist });



     
   
  
      
  
     
      
   
       
         
      
     })
    })
   

   
  
   

  
   
  })

  app.get('/viewLots/:adult/:teen/:baby', async  function(req, res) {
   
res.render("main",  {relation,adult:req.params.adult,teen:req.params.teen,baby:req.params.baby});
  })
  app.get('/returns/:id/:bilet/:price/:adult/:teen/:baby', function(req, res) {
    

   var user= JSON.parse(localStorage.getItem("user"))
   user["bilet"]=req.params.bilet;
   user["adult"]=req.params.adult;
   user["teen"]=req.params.teen;
   user["baby"]=req.params.baby;
  
   
     let price;
     let klasa
     var lotyy =JSON.parse(localStorage.getItem('data'))
     let cena = parseFloat(req.params.price);
     let teenPrice=(parseInt(req.params.teen)*cena)
     let adultPrice=(parseInt(req.params.adult)*cena);
   
var suma = parseFloat(teenPrice)+parseFloat(adultPrice)
console.log(parseFloat(teenPrice))
console.log(parseFloat(adultPrice))
console.log(suma)
user["suma"]=suma;
     localStorage.setItem("bilety",JSON.stringify({"klasa":req.params.bilet,"adult":req.params.adult,"teen":req.params.teen,"baby":req.params.baby,"sum":suma }))
     localStorage.setItem("user",JSON.stringify(user))

     user["suma"]=suma;
     console.log(req.params.price)
     for(i=0;i<=lotyy.length;i++){
     if(i==req.params.id){
     // console.log(lotyy[i])
      res.render("returns", { loty: lotyy[i], bilet: req.params.bilet, cena:suma ,relation, adult:req.params.adult, teen:req.params.teen, baby:req.params.baby,sum:suma,teenPrice,adultPrice });

      }
      
    }
    
 

    
   
  })
app.get('/pay/:price',(req,res)=>{

  let cena = req.params.price/4.2
  let user = JSON.parse(localStorage.getItem("user"))


  payment.payment(user,paypal,res)
  

 
})
app.get('/success',(req,res)=>{
  const payerId=req.query.PayerID;
  const paymentId=req.query.paymentId;
  
 payment.confirm(paypal,payerId,paymentId,relation).then(data=>{
  res.render('pay',{relation})
 })
  })



  app.get('/result/:id/:bilet/:back_id', function(req, res) {

    let price;
   
   
  let user =JSON.parse(localStorage.getItem("user"))
  user["backprice"]=user.suma-(user.suma*0.20)
  console.log(user)
  var loty = [] 
  var bilety
  

new Promise((res,error)=>{

  loty =JSON.parse(localStorage.getItem('data'))
  bilety=JSON.parse(localStorage.getItem("bilety"))
  res(loty)
}).then((data)=>{

  for(i=0;i<data.length;i++){
   
    if(loty[i].id==req.params.id){
    
      if(req.params.back_id==0){
         console.log(data[i])
        res.render('result',{
          loty:data[i],
          bilet: req.params.bilet, 
          backBilet:user.bilet,
          oneWayPrice:price,
          back:0,relation,
          bilety,adult:bilety.adult,teen:bilety.teen
        
        }
        
          )


      }else{
        for(x=0;x<data[i].createBackFlyies.length;x++){
      
          if(data[i].createBackFlyies[x].nr_rejsu==req.params.back_id){

      let cena;
      
          
           res.render('result',{
             loty:data[i],
             bilet: req.params.bilet, 
             backBilet:user.bilet,
             oneWayPrice:price,
             back:data[i].createBackFlyies[x],relation,
             bilety,cena

           
           }
           
             )
          
          }

}
      }
    
    }
 
  
 
  
    
  }

  
})

       
          



    
   

   
  
 })



 app.get('/info', (req,res)=>{
res.render("about",{relation})


 })

 app.get('/help', (req,res)=>{
  res.render("help",{relation})
  
  
   })
app.listen(process.env.PORT || 4000, function () {
  console.log(`Listening on port ${httpPort}!`)
})

function createEmailHTML(){

 

  var html =" ";

  for (i = 0; i < 4; i++) {
    html += '<li>cipeczka</li>';
  }
  return html;
} 
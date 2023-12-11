

  

 function payment(user,paypal,res){
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:4000/success",
            "cancel_url": "http://localhost:4000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Bilety lotnicze dla dorosłych do "+user.to,
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }
              ]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "This is the payment description."
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
          
          for(let i=0;i<payment.links.length;i++)
          {
            if(payment.links[i].rel==='approval_url')
            {
              res.redirect(payment.links[i].href)
            }
          }
        }
    });




}

function confirm(paypal,payerId,paymentId,relation){

    var execute_payment_json={
        "payer_id" : payerId,
        "transactions":[{
            "amount":{
                "currency":"USD",
                "total":"25.00"
            }
        }]
    };
return   new Promise((res,error)=>{

    paypal.payment.execute(paymentId,execute_payment_json,function(error,payment){
        if(error){
            console.log(error.response)
            throw error;
        }else{
            var assume={
              "imie":payment.payer.payer_info.first_name,
              "nazwisko":payment.payer.payer_info.last_name,
              "paymentMethod":payment.payer.payment_method,
              "amount":payment.transactions[0].amount,
              "list":payment.transactions[0].item_list.items[0],
              "payer":payment.transactions[0].payee          
            }
            console.log(payment)
            console.log(JSON.stringify(payment))
            console.log(assume)
          res(payment)
        }
    })
   }) 
 


}
module.exports={payment,confirm}

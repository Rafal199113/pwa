


var images = [

    '/pic/lot.png',
    '/pic/luft.jpg',
    '/pic/ryanair.jpg',


]


var slides= document.getElementById("slides")

var count=0;


 setInterval(async ()=>{
    
    if(count==3)count=0
    slides.setAttribute("src",images[count])

     count++;
     
 }, 2000, "Parameter 1", "Parameter 2");




class slider{



constructor(slidesView){
    this.images=[
        '../pic/lot.jpg',
    ]
    this.slidesView=slidesView;
}   





}
function Card(suit, img, color, value){
  this.suit = suit;
  this.img = img;
  this.color = color;
  this.value = value;
}


const folderPath = "./PNG-cards-1.3";

const filepaths = ["./PNG-cards-1.3/2_of_clubs.png", "./PNG-cards-1.3/3_of_clubs.png",
  "./PNG-cards-1.3/4_of_clubs.png","./PNG-cards-1.3/5_of_clubs.png","./PNG-cards-1.3/6_of_clubs.png","./PNG-cards-1.3/7_of_clubs.png","./PNG-cards-1.3/8_of_clubs.png","./PNG-cards-1.3/9_of_clubs.png","./PNG-cards-1.3/10_of_clubs.png",
  "./PNG-cards-1.3/2_of_diamonds.png", "./PNG-cards-1.3/3_of_diamonds.png", "./PNG-cards-1.3/4_of_diamonds.png", "./PNG-cards-1.3/5_of_diamonds.png", "./PNG-cards-1.3/6_of_diamonds.png", "./PNG-cards-1.3/7_of_diamonds.png", "./PNG-cards-1.3/8_of_diamonds.png", "./PNG-cards-1.3/9_of_diamonds.png", "./PNG-cards-1.3/10_of_diamonds.png",
  "./PNG-cards-1.3/2_of_spades.png", "./PNG-cards-1.3/3_of_spades.png", "./PNG-cards-1.3/4_of_spades.png", "./PNG-cards-1.3/5_of_spades.png", "./PNG-cards-1.3/6_of_spades.png", "./PNG-cards-1.3/7_of_spades.png", "./PNG-cards-1.3/8_of_spades.png", "./PNG-cards-1.3/9_of_spades.png", "./PNG-cards-1.3/10_of_spades.png",
  "./PNG-cards-1.3/2_of_hearts.png", "./PNG-cards-1.3/3_of_hearts.png", "./PNG-cards-1.3/4_of_hearts.png", "./PNG-cards-1.3/5_of_hearts.png", "./PNG-cards-1.3/6_of_hearts.png", "./PNG-cards-1.3/7_of_hearts.png", "./PNG-cards-1.3/8_of_hearts.png", "./PNG-cards-1.3/9_of_hearts.png", "./PNG-cards-1.3/10_of_hearts.png",
  "./PNG-cards-1.3/ace_of_hearts.png", "./PNG-cards-1.3/king_of_hearts.png", "./PNG-cards-1.3/queen_of_hearts.png", "./PNG-cards-1.3/jack_of_hearts.png", "./PNG-cards-1.3/jack_of_diamonds.png", "./PNG-cards-1.3/queen_of_diamonds.png", "./PNG-cards-1.3/king_of_diamonds.png", "./PNG-cards-1.3/ace_of_diamonds.png", "./PNG-cards-1.3/ace_of_spades.png", "./PNG-cards-1.3/king_of_spades.png", "./PNG-cards-1.3/queen_of_spades.png", "./PNG-cards-1.3/jack_of_spades.png", "./PNG-cards-1.3/ace_of_clubs.png", "./PNG-cards-1.3/king_of_clubs.png", "./PNG-cards-1.3/queen_of_clubs.png", "./PNG-cards-1.3/jack_of_clubs.png",
];

const cardbackimg = "./PNG-cards-1.3/backofcard.png"

const deckofcards = [];
const stockpile = [];
const wastepile = [];
const piles = [[],[],[],[],[],[],[]]

const foundationhearts = [];
const foundationdiamonds = [];
const foundationspades = [];
const foundationclubs = [];

let stockindex = 0;
createdeck();
shuffledeck();
dealdeck();
rendercardstart();


function createdeck(){
  for (x of filepaths){
    
    let imgpath = x;
    let val = x.substring(x.lastIndexOf("/")+1,x.indexOf("_"));
    
    let suit  = x.substring(x.lastIndexOf("_")+1,x.lastIndexOf("."));
    let color;
    if (suit == "hearts" || suit == "diamonds"){
      color = "red";
    }else{
      color = "black";
    }
    if (val == "king"){
      val = 13;
    } else if (val == "queen"){
      val = 12;
    }
    else if (val == "ace"){
      val = 14;
    }
    else if (val == "jack"){
      val = 11;
    }
    else{
      val = Number(val);
    }
    deckofcards.push(new Card(suit,imgpath,color,val));
  }
}
function imgtocard(imgpath){
  let val = imgpath.substring(imgpath.lastIndexOf("/")+1,imgpath.indexOf("_"));
  let suit  = imgpath.substring(imgpath.lastIndexOf("_")+1,imgpath.lastIndexOf("."));
  let color;
  if (suit == "hearts" || suit == "diamonds"){
      color = "red";
    }else{
      color = "black";
    }
    if (val == "king"){
      val = 13;
    } else if (val == "queen"){
      val = 12;
    }
    else if (val == "ace"){
      val = 14;
    }
    else if (val == "jack"){
      val = 11;
    }
    else{
      val = Number(val);
    }
    return new Card(suit,imgpath,color,val);
}
function shuffledeck(){
  //fisher-yates shuffle
  let currentIndex = deckofcards.length;
  while (currentIndex != 0){
    let randomIndex = Math.floor(Math.random()*currentIndex);
    currentIndex--;
    [deckofcards[currentIndex], deckofcards[randomIndex]] = [deckofcards[randomIndex], deckofcards[currentIndex]];
  }
}

function dealdeck(){
  let pilesize = 1;
  let index = 0;

  for (let y = 0; y<piles.length;y++){
    for (let x = 0;x<pilesize;x++){
      piles[y].push(deckofcards[index]);
      index++;
    }
    pilesize++;
  }
  for (let x = index;x<deckofcards.length;x++){
    stockpile.push(deckofcards[x]);
  }
}

function rendercardstart(){
  let num = 1;
  let id;
  let pileelement;
  let piletopimg;
  for(x of piles){
    //render in top card
    id = "pile" + num;
    pileelement = document.getElementById(id);
    piletopimg = piles[num-1][0].img;
    pileelement.innerHTML = '<img id = "topcard" draggable = "true" ondragstart = "drag(event)" src ="'+piletopimg+'">';
    
    //render in facedown cards
    for(let y = 0;y<piles[num-1].length-1;y++){
      pileelement.innerHTML = '<img class = "bottomcard" draggable = "false" src = "./PNG-cards-1.3/backofcard.png">'+ pileelement.innerHTML;
    }
    num++;
  }
}
  function flipstock(){
    
    if (0<stockpile.length){
      let current = stockpile[0];
      document.getElementById("wastepilediv").innerHTML = '<img class = "topwaste" draggable = "true" ondragstart = "drag(event)" src="' + current.img + '">';
      wastepile.push(stockpile[0]);
      stockpile.splice(0,1);
      if (stockpile.length==0){
        document.getElementById("stockpilebutton").innerHTML = 'Reset';
      }
    }
    else{
      if (wastepile.length>1){
        for (let x= 0;x<wastepile.length;x++){
          stockpile.push(wastepile[x]);
        }
        wastepile.splice(0,wastepile.length);
    
        document.getElementById("stockpilebutton").innerHTML = '<img class = "stockpile" src = "./PNG-cards-1.3/backofcard.png">';
        document.getElementById("wastepilediv").innerHTML = '<img class = "topwaste">';
      }
      else{
        document.getElementById("stockpilebutton").innerHTML = 'pile is empty';
      }
    }
    
  }
  const stockbutton = document.getElementById("stockpilebutton");
  stockbutton.addEventListener('click',flipstock);


//functions that take care of drop
function canStack(card1, card2){
  if(card1.color != card2.color && card2.val == card1.val-1){
    return true;
  }
  return false;
}

function canDeposit(card1, stacksuit){
  if (card1.suit == stacksuit){
    suitstackimg = card1.suit + "_stackimg";
    element = document.getElementById(suitstackimg);

    let initial = element.src.substring(element.src.lastIndexOf("/")+1,element.src.indexOf("icon"))
    
    if (initial == card1.suit && card1.value == 14){
      return true;
    }
    else{
      if (card1.suit =="hearts" && foundationhearts.length>0){
         let pileval = foundationhearts[foundationhearts.length-1].value;
         if (pileval == 14 && card1.value ==2){
          return true;
         }
         else if (card1.value == pileval+1){
          return true;
         }
         else{
          return false;
         }
      }
      else if(card1.suit == "spades" && foundationspades.length>0){
        let pileval = foundationspades[foundationspades.length-1].value
         if (pileval == 14 && card1.value ==2){
          return true;
         }
         else if (card1.value == pileval+1){
          return true;
         }
         else{
          return false;
         }
      }
      else if(card1.suit == "diamonds"&& foundationdiamonds.length>0){
        let pileval = foundationdiamonds[foundationdiamonds.length-1].value
         if (pileval == 14 && card1.value ==2){
          return true;
         }
         else if (card1.value == pileval+1){
          return true;
         }
         else{
          return false;
         }
      }
      else if (card1.suit == "clubs"&& foundationclubs.length>0){
        let pileval = foundationclubs[foundationclubs.length-1].value
         if (pileval == 14 && card1.value ==2){
          return true;
         }
         else if (card1.value == pileval+1){
          return true;
         }
         else{
          return false;
         }
      }
      else{
        return false;
      }
    }
  }
  return false;
}


function dragoverHandler(even){
  even.preventDefault();
}

function drag(even){
  even.dataTransfer.setData("img", even.target.src);
  console.log("this is the event target: "+ even.target);
}

function drop(even){
  even.preventDefault();
  const fetchData = even.dataTransfer.getData("img");
  
  const element = even.target;
  console.log(element);
  let card1 = imgtocard(fetchData);

  let test1= card1.img.substring(card1.img.indexOf("0/")+2,card1.img.length);
  console.log(" this is test 1: "+test1);

  let stacksuit;
  if(element.src.indexOf("icon")!=-1){
    stacksuit =element.src.substring(element.src.lastIndexOf("/")+1,element.src.indexOf("icon"));
  }
  else{
    stacksuit = element.src.substring(element.src.lastIndexOf("_")+1,element.src.lastIndexOf("."));
  }
  console.log(stacksuit);
  console.log(canDeposit(card1,stacksuit));
  if(canDeposit(card1,stacksuit)){
    element.src = fetchData;
    console.log("this is element.src"+element.src);
    if (stacksuit == "diamonds"){
      foundationdiamonds.push(card1);
    }
    else if (stacksuit == "spades"){
      foundationspades.push(card1);
    }
    else if (stacksuit == "clubs"){
      foundationclubs.push(card1);
    }
    else{
      foundationhearts.push(card1);
    }
    //find index of card in pile and 
    //add code here to add to remove from necessary piles and make cards disapper from those piles
  }
  
}
//make a seperate drop function for the stackablecards
//add pile and face up/down attributes to cards

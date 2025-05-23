function Card(suit, img, color, value){
  this.suit = suit;
  this.img = img;
  this.color = color;
  this.value = value;
  this.pile= undefined;
  this.face = undefined;
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
      deckofcards[index].pile = pilesize;
      piles[y].push(deckofcards[index]);
      index++;
    }
    pilesize++;
  }
  for (let x = index;x<deckofcards.length;x++){
    deckofcards[x].pile = "stock";
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
    if (piles[num-1].length != 0){
      piletopimg = piles[num-1][0].img;
      pileelement.innerHTML = '<img id = "topcard" draggable = "true" ondragstart = "drag(event)" src ="'+piletopimg+'">';
      
      //render in facedown cards
      for(let y = 1;y<piles[num-1].length;y++){
        if(piles[num-1][y].face != "up"){
          pileelement.innerHTML = '<img class = "bottomcard" draggable = "false" src = "./PNG-cards-1.3/backofcard.png">'+ pileelement.innerHTML;
        }
        else{
          pileelement.innerHTML = '<img class = "bottomcard" draggable = "true" ondragstart = "dragstack(event)" src = "'+ piles[num-1][y].img+'">'+ pileelement.innerHTML;
        }
      }
    }
    else{
      pileelement.innerHTML = '<img id = "topcard">'
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
  if(card1.color != card2.color && card2.value == card1.value+1){
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
}

function drop(even){
  even.preventDefault();
  const fetchData = even.dataTransfer.getData("img");
  
  const element = even.target;
  console.log(element);
  let card1 = imgtocard(fetchData);

  let test1= card1.img.substring(card1.img.indexOf("0/")+2,card1.img.length);
  test1 = "./" + test1;
  let tempcard = card1;
  tempcard.img = test1;
  console.log(" this is tempcard: "+tempcard);

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
      for (let i =0;i<deckofcards.length;i++){
        if (deckofcards[i].img==test1){
          tempcard.pile=deckofcards[i].pile;
          break;
        }
      }
      if(tempcard.pile=="stock"){  
        wastepile.splice(wastepile.length-1,1);
      }
      else{
        piles[tempcard.pile-1].splice(0,1);
      }
    }
    else if (stacksuit == "spades"){
      foundationspades.push(card1);
      for (let i =0;i<deckofcards.length;i++){
        if (deckofcards[i].img==test1){
          tempcard.pile=deckofcards[i].pile;
          break;
        }
      }
      if(tempcard.pile=="stock"){  
        wastepile.splice(wastepile.length-1,1);
      }
      else{
        piles[tempcard.pile-1].splice(0,1);
      }
    }
    else if (stacksuit == "clubs"){
      foundationclubs.push(card1);
      for (let i =0;i<deckofcards.length;i++){
        if (deckofcards[i].img==test1){
          tempcard.pile=deckofcards[i].pile;
          break;
        }
      }
      if(tempcard.pile=="stock"){  
        wastepile.splice(wastepile.length-1,1);
      }
      else{
        piles[tempcard.pile-1].splice(0,1);
      }
    }
    else{
      foundationhearts.push(card1);
      for (let i =0;i<deckofcards.length;i++){
        if (deckofcards[i].img==test1){
          tempcard.pile=deckofcards[i].pile;
          break;
        }
      }
      if(tempcard.pile=="stock"){  
        wastepile.splice(wastepile.length-1,1);
      }
      else{
        piles[tempcard.pile-1].splice(0,1);
      }
    }
    if(tempcard.pile == "stock"){
      if(wastepile.length>0){
        let wastecar = wastepile[wastepile.length-1];
        document.getElementById("wastepilediv").innerHTML = '<img class = "topwaste" draggable = "true" ondragstart = "drag(event)" src="' + wastecar.img + '">';
      }
      else{
        document.getElementById("wastepilediv").innerHTML = '<img class = "topwaste">';
      }
    }
    else{
      rendercardstart();
    }
  }
}
function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}
function dropstack(even, pilenum){
  even.preventDefault();
  const fetchData = even.dataTransfer.getData("img");
  const fetchData2 = even.dataTransfer.getData("text");
  
  if(isNumber(Number(fetchData2[0]))){
    let topstackindex = Number(fetchData2.substring(0,fetchData2.indexOf(" ")));
    let originalpile = Number(fetchData2.substring(fetchData2.indexOf(" ")+1,fetchData2.length));
    
    if (canStack(piles[originalpile-1][topstackindex],piles[pilenum-1][0])){
      for (let i =0;i<deckofcards.length;i++){
          if (deckofcards[i].suit==piles[originalpile-1][topstackindex].suit && deckofcards[i].value==piles[originalpile-1][topstackindex].value){
            deckofcards[i].pile = pilenum;
            break;
          }
      }
      piles[pilenum-1][0].face = "up";
      
      for (let i =topstackindex;i>=0;i--){
        piles[originalpile-1][i].pile = pilenum;
        piles[pilenum-1].unshift(piles[originalpile-1][i]);
        piles[originalpile-1].splice(i,1);
      }
      console.log("topstackindex: "+topstackindex+" pilenumber: "+originalpile);
      rendercardstart();
    }
  }

  else{
    //topcard is the one being added to the stack
    let topcard = imgtocard(fetchData);
    let bottomcard = imgtocard(even.target.src);
    let originalpile;
    for (let i =0;i<deckofcards.length;i++){
        if (deckofcards[i].suit==topcard.suit && deckofcards[i].value==topcard.value){
          originalpile = deckofcards[i].pile;
          break;
        }
    }
    bottomcard.pile = pilenum;
    
    if (canStack(topcard,bottomcard)){
      
      topcard.pile = pilenum;
      for (let i =0;i<deckofcards.length;i++){
        if (deckofcards[i].suit==topcard.suit && deckofcards[i].value==topcard.value){
          deckofcards[i].pile = pilenum;
          break;
        }
      }
      console.log(bottomcard);
      piles[pilenum-1][0].face = "up";
      console.log(topcard.pile);
      piles[pilenum-1].unshift(topcard);
      if (originalpile == "stock"){
        wastepile.pop();
        if(wastepile.length>0){
          document.getElementById("wastepilediv").innerHTML = '<img class = "topwaste" draggable = "true" ondragstart = "drag(event)" src="' + wastepile[wastepile.length-1].img + '">';
        }
        else{
          document.getElementById("wastepilediv").innerHTML = '<img class = "topwaste">';
        }
      }
      else{
        piles[originalpile-1].shift();
      }
      console.log("originalpile: "+ originalpile);
      rendercardstart();
    }
  }
}

function dragstack(even){
  topofstack = imgtocard(even.target.src);
  topofstack.face = "up";
  for (let i =0;i<deckofcards.length;i++){
    if (deckofcards[i].suit==topofstack.suit && deckofcards[i].value==topofstack.value){
      topofstack.pile = deckofcards[i].pile;
      break;
    }
  }
  let indexoftopofstack;
  for (let i = 0;i<piles[topofstack.pile-1].length;i++){
    if (piles[topofstack.pile-1][i].suit == topofstack.suit && piles[topofstack.pile-1][i].value == topofstack.value){
      indexoftopofstack = i;
      break;
    }
  }
  let cardstack = [];
  for(let i = 0;i<=indexoftopofstack;i++){
    cardstack.push(piles[topofstack.pile-1][i]);
  }
  let cardstackstr = "" + indexoftopofstack+" "+topofstack.pile;
  even.dataTransfer.setData("text", cardstackstr);
  console.log(cardstackstr);
}


//add conditions to win game and make sure that kings can create new stacks (do kings new stacks by modifying can stack function)

//after this make functions that simplify and optimize code and then use css to make it look better

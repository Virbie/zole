
let cards = []; // Array for card objects
let placedCards = [] // PRIEKS noliktam kartim
let placedCardsPlayer = [] // lai katrai kartij pieliktu kada speletaja vertibu
let container = document.getElementById("cardcontainer"); // Card container element
let placedCardsContainer = document.getElementById("kartisUzGalda") // kartis kas noliktas uz galda
let gajiensPecKartas = 1



let punktiDiv = document.getElementById("acisSpeletaji")



const mainButton = document.getElementById('KartisDala');
mainButton.addEventListener('click', () => {
  mainButton.style.display = 'none'; // Hide the button
  secondButton.style.display= 'inline-block';
  displayCards()
});

const secondButton = document.getElementById('SacSpeli');
secondButton.addEventListener('click', () => {
  secondButton.style.display = 'none'; // Hide the button
  Gajiens()
});

const velreizPoga = document.getElementById('velreiz')
velreizPoga.addEventListener('click', () =>{
  velreizPoga.style.display= 'none';
  displayCards()
  Gajiens()
})









let delayGajiens = 200
function Gajiens() {
console.log("atkal")
if (gajiensPecKartas === 9) {
raundaUzvaretajsParb();
punktiDiv.innerHTML = "";
punktiDiv.appendChild(document.createTextNode(raundaUzvaretajs));

gajiensPecKartas = 1;
velreizPoga.style.display = 'inline-block';
return; // No more moves
}

if (placedCards.length === 3) {
GajienaUzvaretajs(placedCards, placedCardsPlayer);
acisSumma(placedCards);
gajiensPecKartas += 1;

console.log(placedCards);
console.log(placedCardsPlayer);

placedCards = [];
placedCardsPlayer = [];
placedCardsContainer.innerHTML = "";

playerGajienaID = GajienaUzvaretajsPlayer;
console.log(GajienaUzvaretajsPlayer);

punktiDiv.innerHTML = "";
punktiDiv.appendChild(document.createTextNode(playerAcis));

setTimeout(Gajiens, delayGajiens); // Go to next move after clearing
return;
}

switch (playerGajienaID) {
case 1:
container.addEventListener("click", function playerClick(event) {
if (event.target.classList.contains("card")) {
  placedCards.push(parseInt(event.target.src.split("/").pop().replace(".png", "")));
  placedCardsPlayer.push(1);
  refresh();
  event.target.remove();
  playerGajienaID = 2;
  setTimeout(Gajiens, delayGajiens); // after click, move to bot2
}else{
  Gajiens()
}
}, { once: true });
break;

case 2:
Bots2(parseInt(placedCards[0])); 
placedCards.push(bot2PlacedNumber);
placedCardsPlayer.push(2);
refresh();
playerGajienaID = 3;
setTimeout(Gajiens, delayGajiens); // after bot2 move, move to bot3
break;

case 3:
Bots3(parseInt(placedCards[0])); 
placedCards.push(bot3PlacedNumber);
placedCardsPlayer.push(3);
refresh();
playerGajienaID = 1;
setTimeout(Gajiens, delayGajiens); // after bot3 move, back to player
break;
}
}



  
  
function displayCards() {
    Karsudalisana(); // Call the function from backend.js
    container.innerHTML = "";
    
    
    for (let i = 0; i < 8; i++) {
        
        const img = document.createElement("img");
        img.src = "./resources/" + player1[i] + ".png"; // Image source
        img.id = "card" + i; // Optional ID
        img.classList.add("card"); // Add card class
        img.width = 150;
        img.height = 250;

         // Save the card
        container.appendChild(img); // Add card to the container
    }
    

    // Handle card click
    
}









function clearPlacedCards(){
  placedCards = []
}

// sakas kartis uz galda paradisana 
function refresh() {
  
  placedCardsContainer.innerHTML = ""
  
  // Remove all previous images before adding new ones
  

  // Loop through placedCards and add the new images
  for (let i = 0; i < placedCards.length; i++) {
    
      const img = document.createElement("img");
      img.src = "./resources/" + placedCards[i] + ".png"; // Image source
      img.classList.add("placed"); // Add card class
      img.width = 150;
      img.height = 250;
      
      placedCardsContainer.appendChild(img);
       // Add card to the container
       
  }
  
}
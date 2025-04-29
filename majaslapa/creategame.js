
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
    arrangeCardsInArc();
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

function arrangeCardsInArc() {
    const cards = document.querySelectorAll(".card");
    const total = cards.length;
    const containerWidth = container.clientWidth;
    const centerX = containerWidth / 2;
    const baseY = window.innerHeight + 350;

    const radius = containerWidth * 0.45;
    const maxSpread = 80;
    const spread = total > 1 ? maxSpread * ((total - 1) / 7) : 0;
    const minAngle = -spread / 2;
    const maxAngle = spread / 2;
    const peakOffset = container.clientHeight * 0.05;

    cards.forEach((card, i) => {
        const angle = total === 1 ? 0 : minAngle + ((maxAngle - minAngle) / (total - 1)) * i;
        const radians = (angle * Math.PI) / 180;

        const x = centerX + radius * Math.sin(radians) - card.offsetWidth / 2;

        let arcOffset = 0;
        if (total > 1) {
            const midpoint = (total - 1) / 2;
            const distanceFromMid = Math.abs(i - midpoint);
            const factor = 1 - (distanceFromMid / midpoint);
            arcOffset = peakOffset * factor;
        }

        const y = baseY - radius * Math.cos(radians) - card.offsetHeight / 2 - arcOffset;

        const baseTransform = `rotate(${angle}deg) translateY(0px)`;
        card.style.left = `${x}px`;
        card.style.top = `${y}px`;
        card.style.transform = baseTransform;
        card.dataset.baseTransform = baseTransform; // Save for later
          });
       }

       document.querySelectorAll(".card").forEach((card) => {
        let bounceAnimationFrame = null;
        let bouncing = false;
        let baseTransform = '';
        let hoverOffset = -100;
    
        function startBounce() {
            if (bouncing) return;
            bouncing = true;
    
            let start = null;
            let direction = 1;
    
            function animateBounce(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
    
                const bounceY = hoverOffset + Math.sin(progress / 300) * 10; // bounce range
    
                card.style.transform = `rotate(0deg) translateY(${bounceY}px)`;
    
                if (bouncing) {
                    bounceAnimationFrame = requestAnimationFrame(animateBounce);
                }
            }
    
            bounceAnimationFrame = requestAnimationFrame(animateBounce);
        }
    
        function stopBounce() {
            bouncing = false;
            if (bounceAnimationFrame) {
                cancelAnimationFrame(bounceAnimationFrame);
                bounceAnimationFrame = null;
            }
        }
    
        card.addEventListener("mouseenter", () => {
            baseTransform = card.dataset.baseTransform || '';
            card.style.transition = "transform 0.4s ease-in-out";
            card.style.transform = `rotate(0deg) translateY(${hoverOffset}px)`;
    
            // Start bounce AFTER transition finishes
            setTimeout(() => {
                if (card.matches(':hover')) {
                    startBounce();
                }
            }, 400);
        });
    
        card.addEventListener("mouseleave", () => {
            stopBounce();
            card.style.transition = "transform 0.4s ease-in-out";
            card.style.transform = baseTransform;
        });
      });
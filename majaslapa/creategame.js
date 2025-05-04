
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
//test
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
    arrangeCardsInArc();
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

// Updated displayCards function
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
        container.appendChild(img); // Add card to the container
    }
    
    // Wait a brief moment for images to load before arranging
    setTimeout(() => {
        arrangeCardsInArc();
        setupCardHoverEffects();
    }, 50);
}

function setupCardHoverEffects() {
    document.querySelectorAll(".card").forEach((card) => {
        let bounceAnimationFrame = null;
        let bouncing = false;
        let hoverOffset = -30; // Smaller offset for more subtle effect
        
        function startBounce() {
            if (bouncing) return;
            bouncing = true;
            
            let start = null;
            
            function animateBounce(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                
                // Get original angle
                const angle = parseFloat(card.dataset.angle || 0);
                
                // Apply bounce with original rotation
                const bounceY = hoverOffset + Math.sin(progress / 300) * 3; // Reduced bounce amplitude
                card.style.transform = `rotate(${angle}deg) translateY(${bounceY}px)`;
                
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
            // Get original angle
            const angle = parseFloat(card.dataset.angle || 0);
            
            card.style.transition = "transform 0.3s ease-out";
            // Don't change z-index - keep original layering
            
            // Apply hover effect preserving rotation
            card.style.transform = `rotate(${angle}deg) translateY(${hoverOffset}px)`;
            
            // Start bounce after transition
            setTimeout(() => {
                if (card.matches(':hover')) {
                    startBounce();
                }
            }, 300);
        });
        
        card.addEventListener("mouseleave", () => {
            stopBounce();
            card.style.transition = "transform 0.3s ease-out";
            card.style.transform = card.dataset.baseTransform || '';
            
            // No need to reset z-index since we never changed it
        });
    });
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
    
    // Exit if no cards
    if (total === 0) return;
    
    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    
    // Calculate center point and base position
    const centerX = containerWidth / 2;
    const baseY = 200; // Position from the top
    
    // Adjust arc parameters based on number of cards
    const minRadius = 350; // Minimum radius
    const maxRadius = 500; // Maximum radius 
    const radius = minRadius + ((maxRadius - minRadius) * (1 - total/8)); // Dynamic radius
    
    // Increased spacing between cards
    const maxSpread = Math.min(75, total * 10); // Increased from 60 to 75 for wider spread
    const spread = total > 1 ? maxSpread : 0;
    const minAngle = -spread / 2;
    const maxAngle = spread / 2;
    
    // Flatter arc (less height difference between middle and outer cards)
    const peakOffset = 70; // Reduced from 80 to make arc flatter
    
    // Position each card
    cards.forEach((card, i) => {
        // Handle single card case
        if (total === 1) {
            // Center single card with no rotation
            card.style.position = 'absolute';
            card.style.left = `${centerX - 75}px`; // 75 is half card width
            card.style.top = `${baseY}px`;
            card.style.transform = 'rotate(0deg)';
            card.dataset.baseTransform = 'rotate(0deg)';
            card.dataset.angle = 0; // Store angle for hover effect
            card.style.zIndex = 10;
            return;
        }
        
        // Calculate the angle for this card - dynamically adjusted
        const angle = minAngle + ((maxAngle - minAngle) / (total - 1)) * i;
        const radians = (angle * Math.PI) / 180;
        
        // Calculate x position with improved spacing
        const x = centerX + radius * Math.sin(radians) - 75; // 75 is half card width
        
        // Calculate y position with flatter arc effect - using a gentler curve
        // This makes the middle and outer cards more level with each other
        let arcOffset = 0;
        if (total > 1) {
            const midpoint = (total - 1) / 2;
            const distanceFromMid = Math.abs(i - midpoint);
            // Using a linear function instead of squared for a flatter arc
            const factor = 1 - (distanceFromMid / midpoint); 
            arcOffset = peakOffset * factor;
        }
        
        // Calculate final y position - cards closer to middle rise slightly higher
        const y = baseY - arcOffset;
        
        // Set position with fixed pixel values
        card.style.position = 'absolute';
        card.style.left = `${Math.round(x)}px`;
        card.style.top = `${Math.round(y)}px`;
        
        // Adjust rotation - less dramatic when fewer cards
        // Cards should fan out, with rotation more extreme at edges
        const rotationFactor = Math.min(0.9, total / 7); // Reduced rotation factor slightly
        const rotationAngle = angle * rotationFactor;
        
        const baseTransform = `rotate(${rotationAngle}deg)`;
        card.style.transform = baseTransform;
        card.dataset.baseTransform = baseTransform;
        card.dataset.angle = rotationAngle; // Store angle for hover effect
        
        // Add z-index to create depth effect - middle cards appear in front
        const zIndex = Math.round(10 + (total / 2) - Math.abs(i - (total / 2)));
        card.style.zIndex = zIndex;
        card.dataset.zIndex = zIndex; // Store original z-index
    });
}
    //    document.querySelectorAll(".card").forEach((card) => {
    //     let bounceAnimationFrame = null;
    //     let bouncing = false;
    //     let baseTransform = '';
    //     let hoverOffset = -100;
    
    //     function startBounce() {
    //         if (bouncing) return;
    //         bouncing = true;
    
    //         let start = null;
    //         let direction = 1;
    
    //         function animateBounce(timestamp) {
    //             if (!start) start = timestamp;
    //             const progress = timestamp - start;
    
    //             const bounceY = hoverOffset + Math.sin(progress / 300) * 10; // bounce range
    
    //             card.style.transform = `rotate(0deg) translateY(${bounceY}px)`;
    
    //             if (bouncing) {
    //                 bounceAnimationFrame = requestAnimationFrame(animateBounce);
    //             }
    //         }
    
    //         bounceAnimationFrame = requestAnimationFrame(animateBounce);
    //     }
    
    //     function stopBounce() {
    //         bouncing = false;
    //         if (bounceAnimationFrame) {
    //             cancelAnimationFrame(bounceAnimationFrame);
    //             bounceAnimationFrame = null;
    //         }
    //     }
    
    //     card.addEventListener("mouseenter", () => {
    //         baseTransform = card.dataset.baseTransform || '';
    //         card.style.transition = "transform 0.4s ease-in-out";
    //         card.style.transform = `rotate(0deg) translateY(${hoverOffset}px)`;
    
    //         // Start bounce AFTER transition finishes
    //         setTimeout(() => {
    //             if (card.matches(':hover')) {
    //                 startBounce();
    //             }
    //         }, 400);
    //     });
    
    //     card.addEventListener("mouseleave", () => {
    //         stopBounce();
    //         card.style.transition = "transform 0.4s ease-in-out";
    //         card.style.transform = baseTransform;
    //     });
    //   });
    let playerGajienaID = 2   // Gajiens apzime vai paslaik ir tavs gajiens
    src="scoreboard.js"
   

    let trumpe = [13,14,15,16,17,18,19,20,21,22,23,24,25,26]
    let kreicis = [1,2,3,4]
    let pikis = [5,6,7,8]
    let sirsnina = [9,10,11,12]

    
    

    
    

    let foundArrayName = 0;
    

    // Sākums karsu dalisanai
    function Karsudalisana(){
        let player1 = [] // istais speletajs
        let player2 = [] // bot2
        let player3 = [] // bot3
        let galds   = []
        let kartis  = [];
    
        let test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
    
        let removeElement = (array, n) => {
            let newArray = [];
            for (let i = 0; i < array.length; i++) {
                if (i !== n) {
                    newArray.push(array[i]);
                }
            }
            return newArray;
        };
    
        for(let i = 0; i < 26; i++){
            let x = Math.floor(Math.random() * (26 - i));
            kartis[i] = test[x];
            test = removeElement(test, x);
        }
    
        for(let i = 0; i < 26; i++){
            if(i < 8) player1.push(kartis[i]);
            else if(i < 16) player2.push(kartis[i]);
            else if(i < 24) player3.push(kartis[i]);
            else galds.push(kartis[i]);
        }
    
        return {
            playerG1: player1,
            playerG2: player2,
            playerG3: player3,
            galds: galds
        };
    }
    
    module.exports = {
        Karsudalisana
      };











function GajienaUzvaretajs(value, value2){
    if(value.length === 3){

        const arrays = [kreicis, pikis, sirsnina, trumpe];

        let GajienaUzvaretajsPlayer = 0 // let kas pasaka kurs uzveraja konkretu gajienu
        console.log(value2)
        console.log(value)
        console.log(GajienaUzvaretajsPlayer)

        for (let i = 0; i < arrays.length; i++) {
            if (arrays[i].includes(value[0])) { // atrod masivu un karts veidu kas jaliek visiem cilvekiem
                foundArrayName = arrays[i];
                // Track the name of the array      
                break;
            }
        }

        if(foundArrayName == trumpe){
            let lielakais = 0;
            let lielakaisI = 0;
            for(let i = 0; i<value.length;i++){
                if(value[i]>lielakais){
                    lielakais = value[i]
                    lielakaisI = i
                }
            }
            GajienaUzvaretajsPlayer = value2[lielakaisI]
            console.log(GajienaUzvaretajsPlayer, lielakaisI)
        }



        if(foundArrayName == sirsnina){
            let lielakais = 0;
            let lielakaisI = 0;

            for(let i = 0;i<value.length;i++){
                if(value[i]<13 && value[i]>8 && value[i]>lielakais){
                    lielakais = value[i]
                    lielakaisI = i
                }
                if(value[i]>12&&value[i]>lielakais){
                    lielakais = value[i]
                    lielakaisI = i
                }
            }
        
            GajienaUzvaretajsPlayer = value2[lielakaisI]
            console.log(GajienaUzvaretajsPlayer, lielakaisI)
        }

        if(foundArrayName == pikis){
            let lielakais = 0;
            let lielakaisI = 0;

            for(let i = 0;i<value.length;i++){
                if(value[i]<9 && value[i]>4 && value[i]>lielakais){
                    lielakais = value[i]
                    lielakaisI = i
                }
                if(value[i]>12&&value[i]>lielakais){
                    lielakais = value[i]
                    lielakaisI = i
                }
            }
        
            GajienaUzvaretajsPlayer = value2[lielakaisI]
            console.log(GajienaUzvaretajsPlayer, lielakaisI)
        }


        if(foundArrayName == kreicis){
            let lielakais = 0;
            let lielakaisI = 0;

            for(let i = 0;i<value.length;i++){
                if(value[i]<5 && value[i]>0 && value[i]>lielakais){
                    lielakais = value[i]
                    lielakaisI = i
                }
                if(value[i]>12&&value[i]>lielakais){
                    lielakais = value[i]
                    lielakaisI = i
                }
            }
        
            GajienaUzvaretajsPlayer = value2[lielakaisI]
            console.log(GajienaUzvaretajsPlayer, lielakaisI)
        }
        
        return GajienaUzvaretajsPlayer
    }
}//raunda jeb gajiena uzvaretajs





// ✅ First, declare your variables
let acis = [0, 4, 10, 11, 0, 4, 10, 11, 0, 4, 10, 11, 0, 0, 0, 4, 10, 11, 2, 2, 2, 2, 3, 3, 3, 3];
let playerAcis = [0, 0, 0];  // player 1, 2, 3
let raundaUzvaretajs = "";

// ✅ Then, define the function
function acisSumma(value, value2) {
    
  for (let i = 0; i < value.length; i++) {
    playerAcis[value2 - 1] += acis[value[i] - 1];
  }
}



    let scoreboard = {
        player1Scoreboard: {lieliePunkti:0, maziePunkti:0},
        player2Scoreboard: {lieliePunkti:0, maziePunkti:0},
        player3Scoreboard: {lieliePunkti:0, maziePunkti:0},
    }



function raundaUzvaretajsParb(){
    let a = 0 
    let lielakaisI = 0
    for(let i = 0; i< 3; i++){
        if(playerAcis[i]>a){
            a = playerAcis[i]
            lielakaisI = i
        }
    }
    if(lielakaisI == 0){
        raundaUzvaretajs = "Tu uzvari!"
    }else{
        if(lielakaisI == 1){
            raundaUzvaretajs = "Player2 uzvar!"
        }else{
            if(lielakaisI ==2){
                raundaUzvaretajs = "Player3 uzvar!"
            }
        }
    } 
    y = lielakaisI +1 
    scoreboard["player" + y + "Scoreboard"].lieliePunkti += 1;
    for(let i = 1; i < 4; i++){
        scoreboard["player" + i + "Scoreboard"].maziePunkti += playerAcis[i-1];
    }

    playerAcis = ""
    console.log(scoreboard)
    
    
}

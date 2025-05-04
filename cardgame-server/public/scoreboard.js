//paslaik nezinu vai vispar bija jegas atdalit scoreboardu cita failu, bet nu ¯\_(ツ)_/¯



let GajienaUzvaretajsPlayer = 2 // let kas pasaka kurs uzveraja konkretu gajienu




function GajienaUzvaretajs(value, value2){
    if(value.length = 3){

        GajienaUzvaretajsPlayer = 0
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


    }
}//raunda jeb gajiena uzvaretajs





    let acis = [0,4,10,11,0,4,10,11,0,4,10,11,0,0,0,4,10,11,2,2,2,2,3,3,3,3]
    let playerAcis = [0,0,0]  // pirma pakape ir player1 utt
    let raundaUzvaretajs = ""
    
function acisSumma(value){
    for(let i = 0; i<value.length;i++){
        playerAcis[GajienaUzvaretajsPlayer-1] += acis[value[i]-1]
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

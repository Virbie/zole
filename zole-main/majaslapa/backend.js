    let playerGajienaID = 2   // Gajiens apzime vai paslaik ir tavs gajiens

   
    

    let trumpe = [13,14,15,16,17,18,19,20,21,22,23,24,25,26]
    let kreicis = [1,2,3,4]
    let pikis = [5,6,7,8]
    let sirsnina = [9,10,11,12]

    const arrays = [kreicis, pikis, sirsnina, trumpe];
    

    let GajienaUzvaretajsPlayer = 2 // let kas pasaka kurs uzveraja konkretu gajienu
    

    let foundArrayName = 0;
    



    let bot2PlacedNumber = 0;
    let bot3PlacedNumber = 0

function Bots2(value){
    bot2PlacedNumber = 0

    if(GajienaUzvaretajsPlayer == 2){
        let lielakais = 0;
        let lielakaisI = 0;
            for(let i = 0; i< player2.length;i++){
                if(player2[i]>lielakais){
                    lielakais = player2[i]
                    lielakaisI = i
                }
            }
            player2.splice(lielakaisI,1)
            bot2PlacedNumber =lielakais
            
        
    }else{


        for (let i = 0; i < arrays.length; i++) {
            if (arrays[i].includes(value)) { // atrod masivu un karts veidu kas jaliek visiem cilvekiem
                foundArrayName = arrays[i];
            // Track the name of the array
                
                break;
            }
        }





        if(foundArrayName == trumpe){ //izvada lielako karti ja pirma karts ir trumpe
            let lielakais = 0;
            let lielakaisI = 0;
            for(let i = 0; i< player2.length;i++){
                if(player2[i]>lielakais){
                    lielakais = player2[i]
                    lielakaisI = i
                }
            }
            player2.splice(lielakaisI,1) // nonem nolikto karti no bota2 rokas
            bot2PlacedNumber =lielakais
            
            
        }




        if(foundArrayName==sirsnina){ //izvada lielako karti no sirsninam
            let lielakais = 0
            let lielakaisI=0
            for(let i = 0;i<player2.length;i++){
                if(player2[i]<13 && player2[i]>8 && player2[i]>lielakais){
                    lielakais = player2[i]
                    lielakaisI = i
                }
            }
            if(lielakais == 0){
                lielakais = 27
                for(let i = 0; i< player2.length;i++){ // ja nav nevienas sirsninas, tad izvada mazako trumpi
                    if(player2[i]<lielakais && player2[i]>12){
                        lielakais = player2[i] // saja gadijuma lielakais ir mazakais ;)
                        lielakaisI = i
                    }
                }
                if(lielakais == 27){
                    lielakais=player2[0]
                    lielakaisI=0
                }
            }
            player2.splice(lielakaisI,1) // nonem nolikto karti no bota2 rokas
            bot2PlacedNumber =lielakais
        }





        if(foundArrayName==pikis){ //izvada lielako karti no pikiem
            let lielakais = 0
            let lielakaisI=0
            for(let i = 0;i<player2.length;i++){
                if(player2[i]<9 && player2[i]>4 && player2[i]>lielakais){
                    lielakais = player2[i]
                    lielakaisI = i
                }
            }
            if(lielakais == 0){
                lielakais = 27
                for(let i = 0; i< player2.length;i++){ // ja nav nevienas sirsninas, tad izvada mazako trumpi
                    if(player2[i]<lielakais && player2[i]>12){
                        lielakais = player2[i] // saja gadijuma lielakais ir mazakais ;)
                        lielakaisI = i
                    }
                }
                if(lielakais == 27){
                    lielakais=player2[0]
                    lielakaisI=0
                }
            }
            player2.splice(lielakaisI,1) // nonem nolikto karti no bota2 rokas
            bot2PlacedNumber =lielakais
        }



        if(foundArrayName==kreicis){ //izvada lielako karti no kreiciem
            let lielakais = 0
            let lielakaisI=0
            for(let i = 0;i<player2.length;i++){
                if(player2[i]<5 && player2[i]>0 && player2[i]>lielakais){
                    lielakais = player2[i]
                    lielakaisI = i
                }
            }
            if(lielakais == 0){
                lielakais = 27
                for(let i = 0; i< player2.length;i++){ // ja nav nevienas sirsninas, tad izvada mazako trumpi
                    if(player2[i]<lielakais && player2[i]>12){
                        lielakais = player2[i] // saja gadijuma lielakais ir mazakais ;)
                        lielakaisI = i
                    }
                }
                if(lielakais == 27){
                    lielakais=player2[0]
                    lielakaisI=0
                }
            }
            player2.splice(lielakaisI,1) // nonem nolikto karti no bota2 rokas
            bot2PlacedNumber =lielakais
        }
    }
}//beigas bot2 gajienam





function Bots3(value){
    bot3PlacedNumber = 0

    if(GajienaUzvaretajsPlayer == 3){
        let lielakais = 0;
            let lielakaisI = 0;
            for(let i = 0; i< player3.length;i++){
                if(player3[i]>lielakais){
                    lielakais = player3[i]
                    lielakaisI = i
                }
            }
            player3.splice(lielakaisI,1) // nonem nolikto karti no bota3 rokas
            bot3PlacedNumber =lielakais



            
    }else{

        
        for (let i = 0; i < arrays.length; i++) {
            if (arrays[i].includes(value)) { // atrod masivu un karts veidu kas jaliek visiem cilvekiem
                foundArrayName = arrays[i];
                // Track the name of the array
            
                break;
            }
        }





        if(foundArrayName == trumpe){ //izvada lielako karti ja pirma karts ir trumpe
            let lielakais = 0;
            let lielakaisI = 0;
            for(let i = 0; i< player3.length;i++){
                if(player3[i]>lielakais){
                    lielakais = player3[i]
                    lielakaisI = i
                }
            }
            player3.splice(lielakaisI,1) // nonem nolikto karti no bota2 rokas
            bot3PlacedNumber =lielakais
            
            
        }




        if(foundArrayName==sirsnina){ //izvada lielako karti no sirsninam
            let lielakais = 0
            let lielakaisI=0
            for(let i = 0;i<player3.length;i++){
                if(player3[i]<13 && player3[i]>8 && player3[i]>lielakais){
                    lielakais = player3[i]
                    lielakaisI = i
                }
            }
            if(lielakais == 0){
                lielakais = 27
                for(let i = 0; i< player3.length;i++){ // ja nav nevienas sirsninas, tad izvada mazako trumpi
                    if(player3[i]<lielakais && player3[i]>12){
                        lielakais = player3[i] // saja gadijuma lielakais ir mazakais ;)
                        lielakaisI = i
                    }
                }
                if(lielakais == 27){
                    lielakais=player3[0]
                    lielakaisI=0
                }
            }
            player3.splice(lielakaisI,1) // nonem nolikto karti no bota2 rokas
            bot3PlacedNumber =lielakais
        }





        if(foundArrayName==pikis){ //izvada lielako karti no pikiem
            let lielakais = 0
            let lielakaisI=0
            for(let i = 0;i<player3.length;i++){
                if(player3[i]<9 && player3[i]>4 && player3[i]>lielakais){
                    lielakais = player3[i]
                    lielakaisI = i
                }
            }
            if(lielakais == 0){
                lielakais = 27
                for(let i = 0; i< player3.length;i++){ // ja nav nevienas sirsninas, tad izvada mazako trumpi
                    if(player3[i]<lielakais && player3[i]>12){
                        lielakais = player3[i] // saja gadijuma lielakais ir mazakais ;)
                        lielakaisI = i
                    }
                }
                if(lielakais == 27){
                    lielakais=player3[0]
                    lielakaisI=0
                }
            }
            player3.splice(lielakaisI,1) // nonem nolikto karti no bota2 rokas
            bot3PlacedNumber =lielakais
        }



        if(foundArrayName==kreicis){ //izvada lielako karti no kreiciem
            let lielakais = 0
            let lielakaisI=0
            for(let i = 0;i<player3.length;i++){
                if(player3[i]<5 && player3[i]>0 && player3[i]>lielakais){
                    lielakais = player3[i]
                    lielakaisI = i
                }
            }
            if(lielakais == 0){
                lielakais = 27
                for(let i = 0; i< player3.length;i++){ // ja nav nevienas sirsninas, tad izvada mazako trumpi
                    if(player3[i]<lielakais && player3[i]>12){
                        lielakais = player3[i] // saja gadijuma lielakais ir mazakais ;)
                        lielakaisI = i
                    }
                }
                if(lielakais == 27){
                    lielakais=player3[0]
                    lielakaisI=0
                }
            }
            player3.splice(lielakaisI,1) // nonem nolikto karti no bota2 rokas
            bot3PlacedNumber =lielakais
        }
    }
}//beigas bot3 gajienam





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
    
    
    
}













    // Sākums karsu dalisanai
    let player1 = [] // istais speletajs
    let player2 = [] // bot2
    let player3 = [] // bot3
    let galds = []
    let kartis = [];

function Karsudalisana(){
    let test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
    
   
    let removeElement = (array, n) => {
    
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
    
    if (array[i] !== array[n]) {
    newArray.push(array[i]);
    }
    
    }
    return newArray;
    };
    
    
    for(i = 0; i < 26;i++){
    
    let x = Math.floor(Math.random()*(26-i))
    
    kartis[i] = test[x]
    
    test = removeElement(test, x);
    
    }
    
    for(i = 0; i< 26;i++){
        if(i<8){player1[i] = kartis[i]}
        else if(i<16){player2[i-8] = kartis[i]}
        else if(i<24){player3[i-16] = kartis[i]}
        else{galds[i-24] = kartis[i]}
    }
    
    
    
    
    return kartis
    
}
// beigas karsu dalisanai


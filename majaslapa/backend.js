let player1 = []
    let player2 = []
    let player3 = []
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
    console.log(player1, player2, player3,galds)
    
    
    
    return kartis
    

}

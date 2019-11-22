let figureArr = [[[0,0,0,0],[0,2,2,0],[0,2,2,0],[0,0,0,0]],
[[0,2,0,0],[0,2,2,0],[0,2,0,0],[0,0,0,0]],
[[0,2,2,0],[0,2,0,0],[0,2,0,0],[0,0,0,0]],
[[0,2,0,0],[0,2,0,0],[0,2,0,0],[0,2,0,0]],
[[0,2,0,0],[0,2,2,0],[0,0,2,0],[0,0,0,0]],
[[0,0,2,0],[0,2,2,0],[0,2,0,0],[0,0,0,0]],
[[0,2,2,0],[0,0,2,0],[0,0,2,0],[0,0,0,0]]];
let newArr = setZeros(), lineElem = 0, rowElem = 3, finalArr, storeArray = [], timer = 400, prod = -1, storeSpeed = timer, doTwice = false, randomObject = 0, keyPressed = false, score = 0, min = 120, max = 150, highScore = 0, gameOver = false;
newArr = newItem(newArr);
let newInterval = setInterval(function(){
    newArr = gravitation(newArr);
},timer);

//creates matrix with zero values
function setZeros(){
    let arr = [];
    for(let i = 0; i < 24; i++){
        arr.push([]);
        for(let j = 0; j < 10; j++){
            arr[i][j] = 0;
        }
    }
    return arr;
}

//creates new gameobject
function newItem(arr){
    storeArray = [];
    doTwice = false;
    prod = 1;
    finalArr = figureArr[randomObject = Math.floor(Math.random() * 7)];
    for(let i = 0; i < 4; i++){
        storeArray.push([...finalArr[i]]);
    }
    if(randomObject === 4 || randomObject === 5 || randomObject === 6 || randomObject === 2 || randomObject === 1){
        doTwice = true;
    }
    for(let i = 0; i < 4; i++){
        for(let j = 3; j < 7; j++){
            arr[i][j] = finalArr[i][j-3];
        }
        for(let s = 0; s < 4; s++){
            if(storeArray[i][s] === 2){
                showArrToggle(i,s);
            }
        }
    }
    lineElem = 0; 
    rowElem = 3;
    return arr;
}

//moves current gameobject right or left
function moveArr(arr, direction){
    for(let i = 0; i < arr.length; i++){
        if(!arr[i].includes(2)){
            continue;
        }
        for(let j = 0; j < 10; j++){
            if(arr[i][j] === 2 && ((direction === "left" && j === 0) || (direction === "right" && j === 9) || (direction === "left" && arr[i][j-1] === 1) || (direction === "right" && arr[i][j+1] === 1))){
                return arr;
            }
        }
    }
    if(direction === "left"){
        rowElem--;
    }else{
        rowElem++;
    }
    for(let i = 0; i < arr.length; i++){
        if(!arr[i].includes(2)){
            continue;
        }
        if(direction === "left"){
            for(let j = 0; j < 10; j++){
                if(arr[i][j] === 2){
                    arr[i][j] = 0;
                    arr[i][j-1] = 2;
                    if(i > 3){
                        arrToggle(i,j);
                        arrToggle(i,j-1);
                    }
                }
            }
        }else{
            for(let j = 9; j >= 0; j--){
                if(arr[i][j] === 2){
                    arr[i][j] = 0;
                    arr[i][j+1] = 2;
                    if(i > 3){
                        arrToggle(i,j);
                        arrToggle(i,j+1);
                    }
                }
            }
        }
    }
    return arr;
}

function rotateMatrix(arr){
    let rotArr = [];
    prod *= -1;
    if(doTwice){
        for(let i = 0; i < 4; i++){
            rotArr.push([]);
            for(let j = 3; j >= 0; j--){
                rotArr[i][3 - j] = finalArr[j][i];
            }
        }
    }else{
        for(let i = 0; i < 4; i++){
            rotArr.push([]);
            for(let j = 3; j >= 0; j--){
                rotArr[i][j] = finalArr[j][i];
            }
        }
    }
    let storeArr = [];
    for(let k = 0; k < 24; k++){
        storeArr.push([]);
        storeArr[k] = [...arr[k]];
    }
    for(let i = lineElem; i < lineElem + 4; i++){
        for(let j = rowElem; j < rowElem + 4; j++){
            if(storeArr[i][j] !== 1){
                storeArr[i][j] = rotArr[i - lineElem][j - rowElem];
            }else{
                return arr;
            }
        }
    }
    for(let i = 0; i < 24; i++){
        if(Object.keys(storeArr[i]).includes("-1") || Object.keys(storeArr[i]).includes("10")){
            return arr;
        }
    }
    for(let i = 0; i < 24; i++){
        for(let j = 0; j < 10; j++){
            if(arr[i][j] === 2){
                arrToggle(i,j);
            }
            if(storeArr[i][j] === 2){
                arrToggle(i,j);
            }
        }
    }
    finalArr = rotArr;
    return storeArr;
}
//moves gameobject down by Y axis
function gravitation(arr){
    for(let i = 23; i >= 0; i--){
        if(!arr[i].includes(2)){
            continue;
        }
        for(let j = 0; j < 10; j++){
            if((arr[i][j] === 2 && i+1 > 23) || (arr[i][j] === 2 && arr[i+1][j] === 1)){
                for(let k = 0; k < 24; k++){
                    while(arr[k].includes(2)){
                        arr[k][arr[k].indexOf(2)] = 1;
                    }
                }
                for(let i = 0; i < 4; i++){
                    for(let j = 0; j < 4; j++){
                        if(storeArray[i][j] === 2){
                            showArrToggle(i,j);
                        }
                    }
                }
                for(let k = 0; k < 24; k++){
                    if(!arr[k].includes(1)){
                        continue;
                    }
                    for(let s = 0; s < 10; s++){
                        if(arr[k][s] === 1){
                            if(k >= 4){
                                finalArrToggle(k,s);
                            }
                        }
                    }
                }
                for(let k = 23; k > 3; k--){
                    let wasActive = false;
                    if(!arr[k].includes(0)){
                        score += Math.floor(Math.random() * (+max - +min) + +min);  
                        let span = document.getElementById("score");
                        span.innerHTML = "Score: " + score;
                        if(score > highScore){
                            highScore = score;
                        }
                        let highScoreSpan = document.getElementById("highScore");
                        highScoreSpan.innerHTML = "High Score: " + highScore;
                        wasActive = true;
                        for(let l = 0; l < 10; l++){
                            arr[k][l] = 0;
                        }
                        for(let l = k - 1; l > 3; l--){
                            for(let f = 0; f < 10; f++){
                                arr[l+1][f] = arr[l][f];
                                arr[l][f] = 0;
                            }
                        }
                    }
                    if(wasActive){
                        k++;
                    }
                }
                
                for(let i = 0; i < 4; i++){
                    if(arr[i].includes(1)){
                        gameOver = true;
                        if(highScore === score){
                            document.getElementById("score").innerHTML = "New High Score!";
                        }else{
                            document.getElementById("score").innerHTML = "";
                        }
                        document.getElementById("gameOverText").innerHTML = 'Game Over! ' + "<br>" + "<br>" + 'Your Final Score is ' + score + '.';
                        clearInterval(newInterval);
                        for(let i = 0; i < 4; i++){
                            for(let s = 0; s < 4; s++){
                                if(storeArray[i][s] === 2){
                                    showArrToggle(i,s);
                                }
                            }
                        }
                        return arr;
                    }
                }
                arr = newItem(arr);
                console.log(arr);
                return arr;
            }
        }
    }
    lineElem++;
    if(timer < 400){
        score += 1;
        let span = document.getElementById("score");
            span.innerHTML = "Score: " + score;
            if(score > highScore){
                highScore = score;
            }
            let highScoreSpan = document.getElementById("highScore");
            highScoreSpan.innerHTML = "High Score: " + highScore;
    }
    for(let i = 23; i >= 0; i--){
        if(!arr[i].includes(2)){
            continue;
        }
        for(let j = 0; j < 10; j++){
            if(arr[i][j] === 2 && i+1 <= 23 && arr[i+1][j] !== 1){
                arr[i][j] = 0;
                arr[i+1][j] = 2;
                if(i > 3){
                    arrToggle(i,j);
                    arrToggle(i+1,j);
                }else if(i > 2){
                    arrToggle(i+1,j);
                }
            }
        }
    }
    for(let i = 4; i < 24; i++){
        for(let j = 0; j < 10; j++){
            if(arr[i][j] === 1){
                finalArrToggle(i,j);
            }else if(arr[i][j] === 0){
                arrDeleteClass(i,j);
            }
        }
    }
    return arr;
}
function showArrToggle(i,j){
    var element = document.getElementById("showDiv" + i + j);
    element.classList.toggle("mystyle");
}
function arrToggle(i,j){
    var element = document.getElementById("myDIV" + i + j);
    element.classList.toggle("mystyle");
}
function finalArrToggle(i,j){
    document.getElementById("myDIV" + i + j).classList.add("mystyleFinal");
}
function arrDeleteClass(i,j){
    var element = document.getElementById("myDIV" + i + j);
    element.classList.remove("mystyleFinal");
    element.classList.remove("mystyle");
}

document.body.onkeydown = function(e){
    if(e.keyCode === 39){
        newArr = moveArr(newArr, "right");
    }else if(e.keyCode === 37){
        newArr = moveArr(newArr, "left");
    }else if(e.keyCode === 38){
        newArr = rotateMatrix(newArr);
    }else if(e.keyCode === 40 && !keyPressed && !gameOver){
        storeSpeed = timer;
        keyPressed = true;
        timer = 60;
        clearInterval(newInterval);
        newInterval = setInterval(function(){
            newArr = gravitation(newArr);
        },timer);
    }
};
document.body.onkeyup = function(u){
    if(u.keyCode === 40){
        keyPressed = false;
        timer = 400;
        clearInterval(newInterval);
        newInterval = setInterval(function(){
            newArr = gravitation(newArr);
        },timer);
    }
}
function restartTheGame(){
    gameOver = false;
    document.getElementById("score").innerHTML = "Score: " + 0;
    document.getElementById("gameOverText").innerHTML = '';
    for(let i = 0; i < 4; i++){
        for(let s = 0; s < 4; s++){
            if(storeArray[i][s] === 2){
                showArrToggle(i,s);
            }
        }
    }
    newArr = setZeros();
    storeArray = [];
    let span = document.getElementById("score");
    span.innerHTML = "Score: " + 0;
    lineElem = 0, rowElem = 3, finalArr, timer = 400, prod = -1, storeSpeed = timer, doTwice = false, randomObject = 0, keyPressed = false, score = 0;
    newArr = newItem(newArr);
    clearInterval(newInterval);
    newInterval = setInterval(function(){
        newArr = gravitation(newArr);
    },timer);
}
//newArr = moveArr(newArr, "left");
//newArr = rotateMatrix(newArr);



function reduceArr(arr){
    return arr.reduce((obj,item) => {obj.hasOwnProperty(item) ? obj[item]++ : obj[item] = 1; return obj;},{});
}

/*
function f(a,b){
    return [a,b];
}

function decFunc(f){
    adder.calls = [];
    function adder(a,b){
        adder.calls.push(f.call(this,a,b));
    }
    return adder;
}
*/
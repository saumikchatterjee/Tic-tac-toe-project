let grid = document.getElementsByClassName("grid");
let grids = Array.from(grid);
let turn = 0;
let player = "X";
let ai = "O";
let pa = document.getElementById("win")
let div = document.getElementById("window")
let Message = document.getElementById("Message")
let retry = document.getElementById("retry")

function handleClick(){
    if (turn % 2 == 0 && this.innerHTML == "") {
        this.innerHTML = player;
        turn += 1;
        if (!checkForWinner() && !isBoardFull()) {
            aiMove();
            gamecheckstate();
        } else {
            setTimeout(function () {
                div.style.visibility = "visible";
                Message.textContent = "Match is Drawn";
            }, 500);
        }
    }
}

grids.forEach(ele=>{

ele.addEventListener("click",handleClick)
})


function aiMove() {
    let bestMove = findBestMove();
    if (bestMove != null) {
        grids[bestMove].innerHTML = ai;
        turn += 1;
    }
}

function findBestMove() {
    let bestVal = -Infinity;
    let bestMove = null;

    for (let i = 0; i < grids.length; i++) {
        if (grids[i].innerHTML === "") {
            grids[i].innerHTML = ai;
            let moveVal = minimax(0, false);
            grids[i].innerHTML = "";
            if (moveVal > bestVal) {
                bestMove = i;
                bestVal = moveVal;
            }
        }
    }
    return bestMove;
}

function minimax(depth, isMax) {
    let score = evaluate();
    if (score === 10) return score;
    if (score === -10) return score;
    if (isBoardFull()) return 0;

    if (isMax) {
        let best = -Infinity;
        for (let i = 0; i < grids.length; i++) {
            if (grids[i].innerHTML === "") {
                grids[i].innerHTML = ai;
                best = Math.max(best, minimax(depth + 1, !isMax));
                grids[i].innerHTML = "";
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < grids.length; i++) {
            if (grids[i].innerHTML === "") {
                grids[i].innerHTML = player;
                best = Math.min(best, minimax(depth + 1, !isMax));
                grids[i].innerHTML = "";
            }
        }
        return best;
    }
}


function evaluate() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (grids[a].innerHTML === grids[b].innerHTML && grids[b].innerHTML === grids[c].innerHTML) {
            if (grids[a].innerHTML === ai) return 10;
            if (grids[a].innerHTML === player) return -10;
        }
    }
    return 0;
}


function isBoardFull() {
    return grids.every(cell => cell.innerHTML !== "");
}


function checkForWinner() {
    let score = evaluate();
    console.log(score)
    if(score===10){
        console.log("AI has won")
        return true;
    }
    else if(score===-10){
        console.log("Player has won")
        return true;
    }
    return false;
}



function drawLine(a,b,c) {
    let line = document.createElement("div");
    line.className = "line";
    let cellA = grids[a].getBoundingClientRect();
    let cellC = grids[c].getBoundingClientRect();
    
    let table = document.querySelector("table").getBoundingClientRect();
    let angle = Math.atan2(cellC.top - cellA.top, cellC.left - cellA.left) * 180 / Math.PI;
    let length = Math.sqrt((cellC.left - cellA.left) ** 2 + (cellC.top - cellA.top) ** 2);
    
    line.style.width = `${length}px`;
    line.style.top = `${cellA.top + cellA.height / 2 - table.top - 2.5}px`;
    line.style.left = `${cellA.left + cellA.width / 2 - table.left}px`;
    line.style.transform = `rotate(${angle}deg)`;
    
    document.querySelector("table").appendChild(line);
   setTimeout(()=>{
    line.remove()
   },1000)
    
}





function gamecheckstate(){
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];
    

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (grids[a].innerHTML === grids[b].innerHTML && grids[b].innerHTML === grids[c].innerHTML) {
            if (grids[a].innerHTML === ai){
                drawLine(a,b,c)
                grids.forEach(ele=>{
                    ele.removeEventListener("click",handleClick)
                })
                setTimeout(function(){
                    div.style.visibility="visible";
                    Message.textContent="AI has won"
                    
                },1000)
                
            }
            if (grids[a].innerHTML === player){
                drawLine(a,b,c)
                grids.forEach(ele=>{
                    ele.removeEventListener("click",handleClick)
                })
                setTimeout(function(){
                    div.style.visibility="visible";
                    Message.textContent="Player has won"
                },1000)
                 

            }
        }
    }
    return 0;
}

retry.addEventListener("click",function(){
    location.reload()
})

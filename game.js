let grid = document.getElementsByClassName("grid");
let grids = Array.from(grid);
let turn = 0;
let player = "X";
let ai = "O";
let pa = document.getElementById("win")
let div = document.getElementById("window")
let Message = document.getElementById("Message")
let retry = document.getElementById("retry")
grids.forEach(ele => {
    ele.addEventListener("click", function() {
        if (turn % 2 == 0 && ele.innerHTML == "") {
            ele.innerHTML = player;
            turn += 1;
            if (!checkForWinner() && !isBoardFull()) {
                aiMove();
                gamecheckstate()
            }
            else{
                setTimeout(function(){
                     div.style.visibility="visible";
                     Message.textContent="Match is Drawn"
                },500)
            }
        }
    });
});

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
                setTimeout(function(){
                    div.style.visibility="visible";
                    Message.textContent="AI has won"
                    
                },500)
                
            }
            if (grids[a].innerHTML === player){
                setTimeout(function(){
                    div.style.visibility="visible";
                    Message.textContent="Player has won"
                },500)
                 

            }
        }
    }
    return 0;
}

retry.addEventListener("click",function(){
    location.reload()
})

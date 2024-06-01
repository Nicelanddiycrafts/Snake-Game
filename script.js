const board = document.querySelector(".board")
const scoree = document.querySelector(".score");
const hscorE = document.querySelector(".high-score");
const control = document.querySelectorAll(".con i");

let gameover = false;
let foodx, foody;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakebody = [];
let setIntervalId;
let score = 0;

let hscore = localStorage.getItem("high-score") || 0;
hscore.innerText = `High Score: ${hscore}`;
function ufp(){
    foodx = Math.floor(Math.random() * 30) + 1;
    foody = Math.floor(Math.random() * 30) + 1;
}

function handleGameOver(){
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

function changeDirection(e) {
   if(e.key === "ArrowUp" && velocityY != 1){
    velocityX= 0;
    velocityY= -1;
   }else if(e.key ==="ArrowDown" && velocityY != -1){
    velocityX= 0;
    velocityY= 1;
   }else if(e.key ==="ArrowLeft" && velocityX !=1){
    velocityX= -1;
    velocityY= 0;
   }else if(e.key ==="ArrowRight" && velocityX !=-1){
    velocityX= 1;
    velocityY= 0;
   }
}

control.forEach(function(button){
    button.addEventListener("click", function() {
        changeDirection({ key: button.dataset.key })
    })
});

function iGame() {
    if(gameover) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foody} / ${foodx}"></div>`;

    if(snakeX === foodx && snakeY=== foody){
        ufp();
        snakebody.push([foody, foodx]);
        score++;
        hscore = score >= hscore ? score : hscore;
        localStorage.setItem('high-score', hscore)
        scoree.innerText = `Score: ${score}`;
        hscorE.innerText = `High Score: ${hscore}`;
    }
    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1];
    }
    snakebody[0] = [snakeX, snakeY];
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameover = true;
    }
    for (let i = 0; i < snakebody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
        if (i !== 0 && snakebody[0][1] === snakebody[i][1] && snakebody[0][0] === snakebody[i][0]) {
            gameover = true;
        }
    }
    board.innerHTML = html;
}
ufp();
setIntervalId = setInterval(iGame, 100);
document.addEventListener("keyup", changeDirection);


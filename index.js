let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow","green" ,"purple"];
let started = false;
let level = 0;
let p = document.querySelector("p");
let h = document.querySelector("h2");
let highScore = 0;

document.addEventListener("keypress" , function() {
    if(started == false) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});


function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        endFlash();
    }
}

function levelUp() {
    userSeq = [];
    level++;
    h.innerText = `Level ${level}`;
    let ranIdx = Math.floor(Math.random() * 4);
    let ranColor = btns[ranIdx];
    let ranbtn = document.querySelector(`.${ranColor}`);
    gameSeq.push(ranColor);
    console.log(gameSeq);
    gameFlash(ranbtn);
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },250);
}

function endFlash() {
    document.body.style.background = "red";
    let newScore = level - 1;
    setTimeout(function() {
        document.body.style.background = "linear-gradient(120deg, #f6d365 0%, #fda085 100%)";
        document.querySelector("h2").innerText = `Game Over!  Your score was ${newScore}`;
    },250);
    highest(newScore);
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute('id');
    userSeq.push(userColor);
    
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function highest(newScore) {
    if(newScore >  highScore) {
        highScore = newScore;
    }
    p.innerText = `Highest Score: ${highScore}`;
}

function reset() {
    userSeq = [];
    gameSeq = [];
    level = 0;
    setTimeout(levelUp, 2000);
    document.querySelector("h2").innerText = "Game Reset";
}
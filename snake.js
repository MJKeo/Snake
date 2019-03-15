var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var score = 0;
var ended = false;
var buffer = 0;

var tail = []
var player = {x: 240, y: 240, length: 10, width: 10, color: "yellow", direction: "none", move: function() {
    if(this.direction == "left") {
        this.x = this.x - 10;
    }
    if(this.direction == "right") {
        this.x = this.x + 10;
    }
    if(this.direction == "up") {
        this.y = this.y - 10;
    }
    if(this.direction == "down") {
        this.y = this.y + 10;
    }

    if (this.y < 0 || this.x < 0 || this.y >= canvas.height || this.x >= canvas.width) {
        endGame();
    }
}}
var valid = false;
        var xCoord;
        var yCoord
        while (!valid) {
            valid = true;
            xCoord = Math.floor(Math.random() * 50) * 10;
            yCoord = Math.floor(Math.random() * 50) * 10;
            if (xCoord == 240 && yCoord == 240) {
                valid = false;
            }
        }
var coin = {x: xCoord, y: yCoord, length: 10, width: 10, color: "blue"}

document.addEventListener("keydown", keyDownHandler, false);

// main reiterating draw function
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    movePieces();
}
var drawInterval = setInterval(draw, 60)

// function to draw the player and its tail
function drawPlayer() {
    if (buffer > 0) {
        buffer--;
    }
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.length, player.width);
}

// function that checks coin collision and then draws it if necessary
function drawCoin() {
    ctx.fillStyle = coin.color;
    ctx.fillRect(coin.x, coin.y, coin.length, coin.width);
}

function movePieces() {
    if (isColliding(coin)) {
        // update score
        score++;
        var currentScoreLabel = document.getElementById("currentScoreLabel");
        currentScoreLabel.innerText = score;
        // save new tail spot
        var tempTail;
        if (tail.length == 0) {
            tempTail = {x: player.x, y: player.y, length: 10, width: 10, color: "yellow"}
        } else {
            tempTail = {x: tail[tail.length - 1].x, y: tail[tail.length - 1].y, length: 10, width: 10, color: "yellow"}
        }
        
        // determine new coin position
        var valid = false;
        var xCoord;
        var yCoord
        while (!valid) {
            valid = true;
            xCoord = Math.floor(Math.random() * 50) * 10;
            yCoord = Math.floor(Math.random() * 50) * 10;
            if (xCoord == player.x && yCoord == player.y) {
                valid = false;
            }
            tail.forEach(element => {
                if (xCoord == element.x && yCoord == element.y) {
                    valid = false;
                }
            });
        }

        // change coin location
        coin = {x: xCoord, y: yCoord, length: 10, width: 10, color: "blue"}
        drawCoin();

        drawPlayer();
        for (var i = tail.length - 1; i > 0; i--) {
            ctx.fillRect(tail[i].x, tail[i].y, tail[i].length, tail[i].width);
            tail[i].x = tail[i-1].x;
            tail[i].y = tail[i-1].y;
        }
        if (tail.length > 0) {
            ctx.fillRect(tail[0].x, tail[0].y, tail[0].length, tail[0].width);
            tail[0].x = player.x;
            tail[0].y = player.y;
        }
        tail.push(tempTail);
        ctx.fillRect(tempTail.x, tempTail.y, tempTail.length, tempTail.width);
        player.move();
        
    } else {
        drawCoin();
        drawPlayer();
        for (var i = tail.length - 1; i > 0; i--) {
            ctx.fillRect(tail[i].x, tail[i].y, tail[i].length, tail[i].width);
            tail[i].x = tail[i-1].x;
            tail[i].y = tail[i-1].y;
        }
        if (tail.length > 0) {
            ctx.fillRect(tail[0].x, tail[0].y, tail[0].length, tail[0].width);
            tail[0].x = player.x;
            tail[0].y = player.y;
        }

        player.move();
        tail.forEach(element => {
            if (isColliding(element)) {
                endGame();
            }
        });
    }
}

function isColliding(element) {
    if (player.x == element.x && player.y == element.y) {
        return true;
    }
    return false;
}

function endGame() {
    console.log("ended");
    clearInterval(drawInterval);
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width / 5, canvas.height / 4, 3 * canvas.width / 5, 3 * canvas.height / 6);
    ctx.fillStyle = "black";
    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", canvas.width / 4, 1.4 * canvas.height / 3);
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, canvas.width / 2.6, 1.2 * canvas.height / 2);

    // update best score label
    var bestScoreLabel = document.getElementById("bestScoreLabel");
    var bestScore = parseInt(bestScoreLabel.innerText);
    if (score > bestScore) {
        bestScore = score;
    }
    bestScoreLabel.innerText = bestScore;
    ended = true;
}

function restartGame() {
    score = 0;
    drawInterval = setInterval(draw, 60)
    tail = []
    player = {x: 240, y: 240, length: 10, width: 10, color: "yellow", direction: "none", move: function() {
        if(this.direction == "left") {
            this.x = this.x - 10;
        }
        if(this.direction == "right") {
            this.x = this.x + 10;
        }
        if(this.direction == "up") {
            this.y = this.y - 10;
        }
        if(this.direction == "down") {
            this.y = this.y + 10;
        }

        if (this.y < 0 || this.x < 0 || this.y >= canvas.height || this.x >= canvas.width) {
            endGame();
        }
    }}
    var valid = false;
        var xCoord;
        var yCoord
        while (!valid) {
            valid = true;
            xCoord = Math.floor(Math.random() * 50) * 10;
            yCoord = Math.floor(Math.random() * 50) * 10;
            if (xCoord == 240 && yCoord == 240) {
                valid = false;
            }
        }
    coin = {x: xCoord, y: yCoord, length: 10, width: 10, color: "blue"};
    ended = false;
    var currentScoreLabel = document.getElementById("currentScoreLabel");
    currentScoreLabel.innerText = 0;
}

function keyDownHandler(e) {
    if(e.key == "ArrowLeft" && player.direction != "right" && buffer == 0) {
        buffer = 1;
        player.direction = "left";
    } else if(e.key == "ArrowRight" && player.direction != "left" && buffer == 0) {
        buffer = 1;
        player.direction = "right";
    } else if(e.key == "ArrowUp" && player.direction != "down" && buffer == 0) {
        buffer = 1;
        player.direction = "up";
    } else if(e.key == "ArrowDown" && player.direction != "up" && buffer == 0) {
        buffer = 1;
        player.direction = "down";
    } else if (e.key == "Enter" && ended) {
        restartGame();
    }
}
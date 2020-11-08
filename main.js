'use strict';

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var ballX = canvas.width/2;
var ballY = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 11;
var paddleWidth = 74;
var paddleY = 0; //(paddleHeight*2);
var paddleX = (canvas.width-paddleWidth)/1;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var brickRowCount = 6;
var brickColumnCount = 3;
var brickWidth = 30;
var brickHeight = 25;
var brickPadding = 35;
var brickOffsetTop = 40;
var brickOffsetLeft = 40;
var score = 0;
var lives = 3;
var bricks = [];
var paused = false;

for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { ballX: 2, ballY: 2, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

var keys = {
    right: 39,
    left: 37,
    up: 38,
    down: 40,
    spacebar: 32
}

var setKeyState = (e, val) => {
    switch(e.keyCode) {
        case keys.right:
            rightPressed = val;
            break;
        case keys.left:
            leftPressed = val;
            break;
        case keys.up:
            upPressed = val;
            break;
        case keys.down:
            downPressed = val;
            break;
        case keys.spacebar:
            if(val) {
                paused = !paused;
                console.log(`Game paused = ${paused}`);
            }
    }
    //console.log(e.keyCode)
}

function keyDownHandler(e) {
    setKeyState(e, true);
}
function keyUpHandler(e) {
    setKeyState(e, false);
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(ballX > b.ballX && ballX < b.ballX+brickWidth && ballY > b.ballY && ballY < b.ballY+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        if(confirm("YOU WIN, this time...Play again?")) {
                            document.location.reload();
                        } else {
                            return;
                        }
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0097DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleY-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].ballX = brickX;
                bricks[c][r].ballY = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#3095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#8095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
    if(paused) {
        setTimeout(draw, 100);
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    // if the ball hits the right wall OR if the ball hits the left wall,
    // then reverse direction
    if(ballX + dx > canvas.width-ballRadius || ballX + dx < ballRadius) {
        dx = -dx;
    }

    // if the ball is within the X-bounds of the paddle AND
    // if the ball is within the Y-bounds of the paddle,
    // THEN we have made contact with the paddle AND reverse direction
    if(ballX > paddleX && ballX < paddleX + paddleWidth &&
        (canvas.height-ballY) > paddleY && (canvas.height-ballY) < paddleY + paddleHeight) {
        dy = -dy;
    }
    // if the ball hits the ceiling, reverse direction
    else if(ballY + dy < ballRadius) {
        dy = -dy;
    }
    // if the ball hits the floor
    else if(ballY + dy > canvas.height-ballRadius) {
        lives--;
        if(!lives) {
            if(confirm("You failed. Try again?")) {
                document.location.reload();
            } else {
                return;
            }
        }
        else {
            ballX = canvas.width/2;
            ballY = canvas.height-30;
            dx = 3;
            dy = -3;
            paddleX = (canvas.width-paddleWidth)/2;
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    if((upPressed) && (paddleY < canvas.height-paddleHeight)) {
        paddleY += 5;
    }
    else if(downPressed && paddleY > paddleHeight ) {
        paddleY -= 5;
    }

    ballX += dx;
    ballY += dy;
    requestAnimationFrame(draw);
}

draw();

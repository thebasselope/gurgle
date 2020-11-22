'use strict';
import { initKeyBindings } from './src/keyBinding.js';
import { initMouseBindings } from './src/mouseBinding.js';
import { reRender } from './src/draw.js';
import game from './src/gameState.js';

const { canvas, ctx, ball, bricks, brick, paddle, keyState } = game;

initKeyBindings(game);
initMouseBindings(canvas, paddle);

function draw() {
    if(game.paused) {
        setTimeout(draw, 100);
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    reRender(ctx, canvas, game);

    // if the ball hits the right wall OR if the ball hits the left wall,
    // then reverse direction
    if(ball.x + ball.directionX > canvas.width-ball.radius || ball.x + ball.directionX < ball.radius) {
        ball.directionX = -ball.directionX;
    }

    // if the ball is within the X-bounds of the paddle AND
    // if the ball is within the Y-bounds of the paddle,
    // THEN we have made contact with the paddle AND reverse direction
    if(ball.x >= paddle.x && ball.x <= paddle.x + paddle.width &&
      (canvas.height-ball.y) >= paddle.y && (canvas.height-ball.y-(ball.radius*2)) <= paddle.y + paddle.height) {
        ball.directionY = -ball.directionY;
    }
    else if(ball.y + ball.directionY < ball.radius) {
        ball.directionY = -ball.directionY;
    }
    else if(ball.y + ball.directionY > canvas.height-ball.radius) {
        game.lives--;
        if(!game.lives) {
            if(confirm('You failed. Try again?')) {
                document.location.reload();
            } else {
                return;
            }
        }
        else {
            ball.x = canvas.width/2;
            ball.y = canvas.height-30;
            ball.directionX = 1;
            ball.directionY = -1;
            paddle.x = (canvas.width-paddle.width)/2;
        }
    }

    if(keyState.right && paddle.x < canvas.width-paddle.width) {
        paddle.x += 7;
    }
    else if(keyState.left && paddle.x > 0) {
        paddle.x -= 7;
    }

    if((keyState.up) && (paddle.y < canvas.height-paddle.height)) {
        paddle.y += 5;
    }
    else if(keyState.down && paddle.y > paddle.height ) {
        paddle.y -= 5;
    }

    ball.x += ball.directionX;
    ball.y += ball.directionY;
    requestAnimationFrame(draw);
}

draw();

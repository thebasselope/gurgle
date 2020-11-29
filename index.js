'use strict';
import { initKeyBindings } from './src/keyBinding.js';
import { initMouseBindings } from './src/mouseBinding.js';
import { reRender } from './src/draw.js';
import { isBallTouchingPaddle } from './src/paddle.js';
import game from './src/gameState.js';

const { canvas, ctx, ball, bricks, brick, paddle, keyState } = game;

initKeyBindings(game);
initMouseBindings(canvas, paddle);

function draw() {
    if(game.paused) {
        setTimeout(draw, 100);
        return;
    }
    reRender(ctx, canvas, game);

    // if the ball hits the right wall OR if the ball hits the left wall,
    // then reverse direction
    if (ball.x + ball.directionX > canvas.width-ball.radius || ball.x + ball.directionX < ball.radius) {
      ball.directionX = -ball.directionX;
    }

    if (isBallTouchingPaddle(game)) {
      // Prevent the ball from constantly changing direction if it is "inside" the paddle
      // NOTE: a better solution to this would be to let the paddle force push the ball n pixels ahead or below
      if(!ball.contactPaddle) {
        ball.contactPaddle = true;
        const paddleIsFlat = !keyState.up && !keyState.down;
        const paddleAndBallAreMovingUp = ball.directionY > 0 && keyState.up;
        const paddleAndBallAreMovingDown = ball.directionY < 0 && keyState.down;
        if (paddleIsFlat || paddleAndBallAreMovingDown || paddleAndBallAreMovingUp) {
          ball.directionY = -ball.directionY;
        }
      }
    } else {
      ball.contactPaddle = false;
      if(ball.y + ball.directionY < ball.radius) {
          ball.directionY = -ball.directionY;
      }
      else if(ball.y + ball.directionY > canvas.height-ball.radius) {
          game.lives -= 1;
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
    else if(keyState.down && paddle.y >= 5) {
        paddle.y -= 5;
    }

    ball.x += ball.directionX;
    ball.y += ball.directionY;
    requestAnimationFrame(draw);
}

draw();

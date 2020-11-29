const collisionDetection = (game) => {
  const { brick, ball, bricks } = game;
  for (let c=0; c < brick.columnCount; c++) {
      for (let r=0; r < brick.rowCount; r++) {
          const b = bricks[c][r];
          if (b.status == 1) {
              if (ball.x > b.ball.x &&
                  ball.x < b.ball.x + brick.width &&
                  ball.y > b.ball.y &&
                  ball.y < b.ball.y + brick.height) {

                    ball.directionY = -ball.directionY;
                    b.status = 0;
                    game.score += 1;
                  // if (game.score == brick.rowCount * brick.columnCount) {
                  //     if (confirm('YOU WIN, this time...Play again?')) {
                  //         document.location.reload();
                  //     } else {
                  //         return;
                  //     }
                  // }
              }
          }
      }
  }
}

const drawBall = (ctx, game) => {
  const { ball } = game;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fillStyle = '#0097DD';
  ctx.fill();
  ctx.closePath();
}

const drawPaddle = (ctx, canvas, game) => {
const { paddle } = game;
  ctx.beginPath();
  //horizontal
  ctx.rect(paddle.x, canvas.height - paddle.y - paddle.height, paddle.width, paddle.height);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

const drawGridLines = (ctx, canvas) => {
  for(let i = 0; i < canvas.width; i += 50) {
    ctx.beginPath();
    ctx.rect(i, 0, 1, canvas.height);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
  }
  for(let i = 0; i < canvas.height; i += 50) {
    ctx.beginPath();
    ctx.rect(0, i, canvas.width, 1);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
  }
}

const drawBricks = (ctx, game) => {
  const { brick, bricks } = game;
  for (let c=0; c < brick.columnCount; c++) {
      for (let r=0; r < brick.rowCount; r++) {
          if( bricks[c][r].status == 1) {
              const brickX = (r * (brick.width + brick.padding)) + brick.offsetLeft;
              const brickY = (c * (brick.height + brick.padding)) + brick.offsetTop;
              bricks[c][r].ball.x = brickX;
              bricks[c][r].ball.y = brickY;
              ctx.beginPath();
              ctx.rect(brickX, brickY, brick.width, brick.height);
              ctx.fillStyle = '#3095DD';
              ctx.fill();
              ctx.closePath();
          }
      }
  }
}

const drawScore = (ctx, game) => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#8095DD';
  ctx.fillText('No Score: ' + game.score, 8, 20);
}

const drawLives = (ctx, canvas, game) => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Lives: ' + game.lives, canvas.width-65, 20);
}

export const reRender = (ctx, canvas, game) => {
  try {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionDetection(game);
    drawBall(ctx, game);
    drawPaddle(ctx, canvas, game);
    //drawGridLines(ctx, canvas);
    drawBricks(ctx, game);
    drawScore(ctx, game);
    drawLives(ctx, canvas, game);
  } catch(e) {
    alert(`An error occurred: ${e.message}`);
    throw e;
  }
}

export default reRender;

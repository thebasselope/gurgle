// const testimpact = (ballX,paddleX,paddleWidth,canvasHeight,paddleY,ballY,paddleHeight) => {
//   if(ballX > paddleX && ballX < paddleX + paddleWidth &&
//     (canvasHeight-ballY) > paddleY && (canvasHeight-ballY) < paddleY + paddleHeight) {
//     console.log(true)
//   } else {
//     console.log(false)
//   }
// }
// testimpact(21,20,30,100,50,50,10)

const testImpact2 = (game) => {
  const { ball, paddle, canvas } = game;

  const matchOnX = (ball.x >= paddle.x && ball.x <= paddle.x + paddle.width);
  const matchOnY_1 = canvas.height - ball.y >= paddle.y;
  const matchOnY_2 = canvas.height - ball.y <= paddle.y + paddle.height;
  const matchOnY = matchOnY_1 && matchOnY_2;

  const isMatched = matchOnX && matchOnY;
  console.log(isMatched);
  return isMatched;
}

// Succeeds
testImpact2({
  ball: {
    x: 21,
    y: 50,
    radius: 10,
  },
  paddle: {
    x: 20,
    y: 40,
    height:10,
    width:30,
  },
  canvas:{
    height:100,
    width:100,
  },
});

// Fails
testImpact2({
  ball: {
    x: 5,
    y: 5,
    radius: 10,
  },
  paddle: {
    x: 20,
    y: 40,
    height:10,
    width:30,
  },
  canvas:{
    height:100,
    width:100,
  },
});

export const isBallTouchingPaddle = (game) => {
  const { ball, paddle, canvas } = game;

  const matchOnX = (ball.x >= paddle.x && ball.x <= paddle.x + paddle.width);
  const matchOnY_1 = canvas.height - (ball.y + ball.radius) >= paddle.y;
  const matchOnY_2 = canvas.height - (ball.y - ball.radius) >= paddle.y;
  const matchOnY_3 = canvas.height - (ball.y + ball.radius) <= paddle.y + paddle.height;
  const matchOnY_4 = canvas.height - (ball.y - ball.radius) <= paddle.y + paddle.height;
  const matchOnY = (matchOnY_1 || matchOnY_2) && (matchOnY_3 || matchOnY_4);

  return matchOnX && matchOnY;
}

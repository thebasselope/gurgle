import { reRender } from './src/draw.js';
import { isBallTouchingPaddle } from './src/paddle.js';
import { getNewGameState } from './src/gameState.js';

const testSuite = [{
  ball: {
    x: 21,
    y: 190,
  },
  paddle: {
    x: 20,
    y: 178,
  },
}];

/*
{
  ball: {
    x: 5,
    y: 5,
  },
  paddle: {
    x: 20,
    y: 40,
  },
}
*/

var testResults = [];

const sleep = async(ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const testFrame = async(test) => {
  const game = getNewGameState();
  game.bricks = []
  game.brick.columnCount = 0;
  game.brick.rowCount = 0;
  const { canvas, ctx, paddle, ball } = game;

  _.merge(game,test);

  reRender(ctx, canvas, game);

  const isTouching = isBallTouchingPaddle(game);

  testResults.push({isTouching, paddle, ball})
  console.log({isTouching, paddle, ball})
  await sleep(500);
}

const isPaddleInBounds = (paddle) => {
  return paddle.y > 0 && paddle.y < 600 && paddle.x > 0 && paddle.x < 800;
}

const isBallInBounds = (ball) => {
  return ball.y > 0 && ball.y < 600 && ball.x > 0 && ball.x < 800;
}

testSuite.forEach( async(test) => {
  await testFrame(test);
  const subTest = _.merge({}, test);
  let i = 0;
  while(i < 40) {
          subTest.ball.y += 1;
          subTest.paddle.y += 1;
          await testFrame(subTest);
          i += 1
        }

        /**
         * isBallInBounds(subTest.ball) &&
        isPaddleInBounds(subTest.paddle)
         */
})

window.testResults = testResults
console.log(testResults)



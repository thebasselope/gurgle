import { getGameCanvas }  from './canvas.js';

const canvas = getGameCanvas();
const ctx =  canvas.getContext('2d');

export const getNewGameState = () => {
  const newGameState = {
    canvas,
    ctx,
    score: 0,
    lives: 5,
    bricks: [],
    ball:  {
      radius: 10,
      x: canvas.width/2,
      y: canvas.height-30,
      directionX: 2,
      directionY: -2,
    },
    brick: {
      rowCount: 5,
      columnCount: 4,
      width: 80,
      height: 25,
      padding: 65,
      offsetTop: 40,
      offsetLeft: 40,
    },
    paddle: {
      height: 15,
      width:74,
      y: 0,
      x: canvas.width-74,
    },
    keyState: {
      right: false,
      left: false,
      up: false,
      down: false,
      enter: false,
    },
    keyMap: {
      right: 39,
      left: 37,
      up: 38,
      down: 40,
      spacebar: 32,
      enter: 13,
    },
  };

  for (let c=0; c < newGameState.brick.columnCount; c += 1) {
    newGameState.bricks[c] = [];
    for(let r=0; r < newGameState.brick.rowCount; r += 1) {
      newGameState.bricks[c][r] = { ball: { x: 2, y: 2 }, status: 1 };
    }
  }
  return newGameState;
}

export const gameState = getNewGameState();

export default gameState;

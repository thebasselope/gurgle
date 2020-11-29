
const setKeyState = (e, val, gameState) => {
  const { keyMap, keyState, paddle, ball } = gameState;
  switch(e.keyCode) {
        case keyMap.right:
            keyState.right = val;
            break;
        case keyMap.left:
            keyState.left = val;
            break;
        case keyMap.up:
          keyState.up = val;
            break;
        case keyMap.down:
          keyState.down = val;
            break;
        case keyMap.spacebar:
            if(val) {
                gameState.paused = !gameState.paused;
                console.log(`Game paused = ${gameState.paused}`);
                console.log({paddle, ball})
            }
            //enter will turn paddle sideways
            //the first bug will probably be that the ball will go right through it when it's moving
        case keyMap.enter:
            keyState.enter = val;
            break;
    }
}

export const initKeyBindings = (gameState) => {
  document.addEventListener("keydown", (e) => setKeyState(e, true, gameState), false);
  document.addEventListener("keyup", (e) => setKeyState(e, false, gameState), false);
}

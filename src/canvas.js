export const getGameCanvas = () => {
  const body = document.getElementsByTagName('body')[0];
  let canvas = document.getElementById('gurle_canvas');
  if(!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'gurgle_canvas';
    body.appendChild(canvas);
    canvas.width = 600;
    canvas.height = 400;
  }

  return canvas;
}

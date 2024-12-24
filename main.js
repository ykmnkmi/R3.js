const START = 0;
const END = 1000;

const DURATION = 60 * 1000;

const HEIGHT = 500;
const WIDTH = 500;
const RADIUS = 100;

/** @type {HTMLInputElement} */
const range = document.querySelector('input');

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('canvas');

/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');
context.font = 'normal 16px "DM Mono"';
context.fontStretch = 'condensed';

/** @type {() => void} */
const clear = () => {
  context.clearRect(0, 0, WIDTH, HEIGHT);
};

/** @type {(position: number) => void} */
const drawCircle = (position) => {
  context.save();

  context.translate(WIDTH / 2, HEIGHT / 2);
  context.rotate(-Math.PI / 2);
  context.beginPath();
  context.arc(0, 0, RADIUS, 0, 2 * Math.PI * position);
  context.stroke();

  context.restore();
};

/** @type {(position: number) => void} */
const drawText = (position) => {
  context.save();

  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.fillText(2 * Math.PI * position, WIDTH / 2, HEIGHT / 2);

  context.restore();
};

/** @type {(position: number) => void} */
const draw = (position) => {
  clear();
  drawCircle(position);
  drawText(position);
};

const onInput = () => {
  const position = parseInt(range.value);
  draw(position / END);
};

range.addEventListener('input', onInput);
window.addEventListener('load', onInput);

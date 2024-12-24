const START = 0;
const END = 10000;

const SIDE = 640;
const HALF = 640 / 2;

const BASE_RADIUS = 1 / 6 * HALF;
const RADIUS = 3 / 6 * HALF;
const FULL_RADIUS = BASE_RADIUS + RADIUS;

const DURATION = 60 * 1000;

/** @type {HTMLInputElement} */
const scale = document.querySelector('#scale');

/** @type {HTMLInputElement} */
const range = document.querySelector('#progress');

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('canvas');

/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');
context.font = 'normal 16px "DM Mono"';
context.fontStretch = 'condensed';

/** @type {() => void} */
const clear = () => {
  context.clearRect(0, 0, SIDE, SIDE);
};

/** @type {() => void} */
const drawAxes = () => {
  context.save();

  context.strokeStyle = '#A0A0A0';

  context.beginPath();

  context.moveTo(0 + BASE_RADIUS, HALF);
  context.lineTo(SIDE - BASE_RADIUS - 10, HALF);
  context.moveTo(SIDE - BASE_RADIUS - 20, HALF - 10);
  context.lineTo(SIDE - BASE_RADIUS - 10, HALF);
  context.lineTo(SIDE - BASE_RADIUS - 20, HALF + 10);

  context.moveTo(HALF, SIDE - BASE_RADIUS);
  context.lineTo(HALF, 10 + BASE_RADIUS);
  context.moveTo(HALF - 10, 20 + BASE_RADIUS);
  context.lineTo(HALF, 10 + BASE_RADIUS);
  context.lineTo(HALF + 10, 20 + BASE_RADIUS);

  context.stroke();

  context.textAlign = 'right';
  context.textBaseline = 'middle';
  context.fillStyle = '#A0A0A0';
  context.fillText('X', SIDE - BASE_RADIUS - 5, HALF + 20);
  context.textAlign = 'left';
  context.fillText('Y', HALF + 20, 15 + BASE_RADIUS);

  const tickLength = 2;
  const tickSpacing = FULL_RADIUS / 6;

  for (let i = 1; i <= 6; i += 1) {
    const x = HALF + i * tickSpacing;
    const y = HALF - i * tickSpacing;

    context.moveTo(x, HALF - tickLength);
    context.lineTo(x, HALF + tickLength);
    context.moveTo(y, HALF - tickLength);
    context.lineTo(y, HALF + tickLength);

    context.moveTo(HALF - tickLength, x);
    context.lineTo(HALF + tickLength, x);
    context.moveTo(HALF - tickLength, y);
    context.lineTo(HALF + tickLength, y);
  }

  context.stroke();
  context.closePath();

  context.beginPath();
  context.fillStyle = '#FFFFFF';
  context.arc(HALF, HALF, 4, 0, 2 * Math.PI);
  context.fill();
  context.closePath();

  context.restore();
};

/** @type {(radius: number, angle: number) => void} */
const drawCircle = (radius, angle) => {
  context.save();

  context.translate(HALF, HALF);
  context.rotate(-Math.PI / 2);

  context.save();

  context.beginPath();
  context.strokeStyle = '#A0A0A0';
  context.arc(0, 0, BASE_RADIUS + radius, 0, 2 * Math.PI);
  context.stroke();
  context.closePath();

  context.restore();

  context.beginPath();
  context.arc(0, 0, BASE_RADIUS + radius, 0, 2 * Math.PI * angle);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.arc(0, 0, 1, 0, 2 * Math.PI);
  context.fill();
  context.closePath();

  context.restore();
};

/** @type {(radius: number, angle: number) => void} */
const drawSmallCircle = (radius, angle) => {
  angle = 2 * Math.PI * angle;

  const small_radius = (RADIUS - radius) / 2;
  radius = BASE_RADIUS + radius + small_radius;

  context.save();

  context.translate(HALF, HALF);
  context.rotate(-Math.PI / 2 + angle);

  context.beginPath();
  context.arc(radius, 0, small_radius, 0, 2 * Math.PI);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.arc(radius, 0, 1, 0, 2 * Math.PI);
  context.fill();
  context.closePath();

  context.restore();
};

/** @type {(radius: number, angle: number) => void} */
const drawText = (radius, angle) => {
  radius = radius.toFixed(0);
  angle = (360 * angle).toFixed(0);

  context.save();

  context.textBaseline = 'middle';
  context.textAlign = 'start';
  context.fillText(`${radius}:${angle}`, BASE_RADIUS, 2 * BASE_RADIUS);

  context.restore();
};

/** @type {(radius: number, angle: number) => void} */
const draw = (radius, angle) => {
  clear();
  drawAxes();
  drawCircle(radius, angle);
  drawSmallCircle(radius, angle);
  drawText(radius, angle);
};

const onInput = () => {
  const radius = parseInt(scale.value);
  const angle = parseInt(range.value);

  requestAnimationFrame(() => {
    draw(radius / END * RADIUS, angle / END);
  });
};

scale.addEventListener('input', onInput);
range.addEventListener('input', onInput);
window.addEventListener('load', onInput);

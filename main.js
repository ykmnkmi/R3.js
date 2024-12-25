const START = 0;
const END = 10000;

const SIDE = 640;
const HALF = 640 / 2;

const RADIUS = 4 / 6 * HALF;

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

  context.moveTo(0, HALF);
  context.lineTo(SIDE - 10, HALF);
  context.moveTo(SIDE - 20, HALF - 10);
  context.lineTo(SIDE - 10, HALF);
  context.lineTo(SIDE - 20, HALF + 10);

  context.moveTo(HALF, SIDE);
  context.lineTo(HALF, 10);
  context.moveTo(HALF - 10, 20);
  context.lineTo(HALF, 10);
  context.lineTo(HALF + 10, 20);

  context.stroke();

  context.textAlign = 'right';
  context.textBaseline = 'middle';
  context.fillStyle = '#A0A0A0';
  context.fillText('X', SIDE - 5, HALF + 20);
  context.textAlign = 'left';
  context.fillText('Y', HALF + 20, 15);

  const tickLength = 2;
  const tickSpacing = RADIUS / 6;

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
  radius = radius * RADIUS;

  context.save();

  context.translate(HALF, HALF);
  context.rotate(-Math.PI / 2);

  context.save();

  context.beginPath();
  context.strokeStyle = '#A0A0A0';
  context.arc(0, 0, radius, 0, 2 * Math.PI);
  context.stroke();
  context.closePath();

  context.restore();

  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI * angle);
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
  const small_radius = (1 - radius) * RADIUS * 0.5;
  radius = radius * RADIUS;

  angle = 2 * Math.PI * angle;

  context.save();

  context.translate(HALF, HALF);
  context.rotate(-Math.PI / 2 + angle);

  context.save();

  context.translate(radius + small_radius, 0);

  context.beginPath();
  context.strokeStyle = '#A0A0A0';
  context.moveTo(0, 0);
  context.lineTo(small_radius + 10, 0);
  context.moveTo(small_radius + 10 - 5, -5);
  context.lineTo(small_radius + 10, 0);
  context.lineTo(small_radius + 10 - 5, 5);
  context.stroke();
  context.closePath();

  context.restore();

  context.beginPath();
  context.arc(radius + small_radius, 0, small_radius, 0, 2 * Math.PI);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.arc(radius + small_radius, 0, 1, 0, 2 * Math.PI);
  context.fill();
  context.closePath();

  context.save();

  const small_angle = 2 * Math.PI * angle * (1 + radius / small_radius);

  context.translate(radius + small_radius, 0);
  context.rotate(2 * Math.PI * small_angle);

  context.beginPath();
  context.strokeStyle = '#FFA0A0';
  context.moveTo(0, 0);
  context.lineTo(small_radius + 10, 0);
  context.moveTo(small_radius + 10 - 5, -5);
  context.lineTo(small_radius + 10, 0);
  context.lineTo(small_radius + 10 - 5, 5);
  context.stroke();
  context.closePath();

  context.restore();

  context.restore();
};

/** @type {(radius: number, angle: number) => void} */
const drawText = (radius, angle) => {
  const small_radius = (1 - radius) * 0.5;
  radius = (radius / small_radius).toFixed(2);
  angle = (360 * angle).toFixed(2);

  context.save();

  context.textBaseline = 'middle';
  context.textAlign = 'start';
  context.fillText(`${radius}:${angle}`, 50, 50);

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
    draw(radius / END, angle / END);
  });
};

scale.addEventListener('input', onInput);
range.addEventListener('input', onInput);
window.addEventListener('load', onInput);

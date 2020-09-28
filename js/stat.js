'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_FONT = `16px PT Mono`;

const BAR_MAX_HEIGHT = 150;
const BAR_WIDTH = 40;
const BAR_GAP = 50;
const GAP = 10;
const FONT_GAP = 15;
const BAR_COLOR = 220;


const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.3)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;
  ctx.font = CLOUD_FONT;
  ctx.textBaseline = `hanging`;

  ctx.fillText(
      `Ура вы победили!`,
      CLOUD_X + GAP,
      CLOUD_Y + GAP
  );

  ctx.fillText(
      `Список результатов:`,
      CLOUD_X + GAP,
      CLOUD_Y + GAP + FONT_GAP + GAP
  );

  const filterNames = function (names) {
    names.forEach((name, index) => {
      if (name === `Вы`) {
        [names[0], names[index]] = [names[index], names[0]];
      }
    });
  };

  filterNames(players);

  const getRandomColor = function (min, max) {
    return Math.round(min + Math.random() * (max - min));
  };


  const maxTime = getMaxElement(times);
  for (let i = 0; i < players.length; i++) {

    let barHeight = Math.round((BAR_MAX_HEIGHT * times[i]) / maxTime);
    let timesRound = Math.round(times[i]);
    let randomColor = getRandomColor(0, 100);

    ctx.fillText(
        players[i],
        CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - FONT_GAP
    );
    ctx.fillText(
        `${timesRound}`,
        CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - GAP - FONT_GAP - GAP - barHeight - FONT_GAP
    );

    if (i === 0) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = `hsl(${BAR_COLOR}, ${randomColor}%, 50%)`;
    }

    ctx.fillRect(
        CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - FONT_GAP - GAP,
        BAR_WIDTH,
        -barHeight
    );

    ctx.fillStyle = `#000`;
  }
};

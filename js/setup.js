'use strict';

const WIZARD_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const WIZARD_SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

const COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const EYES_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

const FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];

const setupOpen = document.querySelector(`.setup-open`);
const setup = document.querySelector(`.setup`);
const setupClose = setup.querySelector(`.setup-close`);
const setupWizardForm = setup.querySelector(`.setup-wizard-form`);

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = function () {
  setup.classList.remove(`hidden`);

  setupClose.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = function () {
  setup.classList.add(`hidden`);

  setupClose.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

setupWizardForm.addEventListener(`submit`, function () {
  closePopup();
});

const setupWizard = setup.querySelector(`.setup-wizard`);

const setupWizardProp = function (item) {
  const setupWizardCoat = setup.querySelector(`.wizard-coat`);
  const setupWizardEyes = setup.querySelector(`.wizard-eyes`);
  const inputWizardCoat = setup.querySelector(`input[name="coat-color"]`);
  const inputWizardEyes = setup.querySelector(`input[name="eyes-color"]`);

  const coatColor = getRandomProp(COAT_COLORS);
  const eyesColor = getRandomProp(EYES_COLORS);

  if (item === setupWizardCoat) {
    item.style.fill = coatColor;
    inputWizardCoat.value = coatColor;
  } else if (item === setupWizardEyes) {
    item.style.fill = eyesColor;
    inputWizardEyes.value = eyesColor;
  }
};

setupWizard.addEventListener(`click`, function (evt) {
  const target = evt.target;
  setupWizardProp(target);
});

const setupFireball = setup.querySelector(`.setup-fireball-wrap`);

const setupFireballColor = function () {
  const setupFireballInput = setupFireball.querySelector(`input[name="fireball-color"]`);
  const color = getRandomProp(FIREBALL_COLORS);
  setupFireball.style.backgroundColor = color;
  setupFireballInput.value = color;
};

setupFireball.addEventListener(`click`, function () {
  setupFireballColor();
});

document.querySelector(`.setup-similar`).classList.remove(`hidden`);

const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

const getRandomProp = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

const getWizardProp = function () {
  let wizard = {
    name: `${getRandomProp(WIZARD_NAMES)} ${getRandomProp(WIZARD_SURNAMES)}`,
    coatColor: getRandomProp(COAT_COLORS),
    eyesColor: getRandomProp(EYES_COLORS)
  };
  return wizard;
};

const getWizardArray = function () {
  let result = [];
  for (let i = 0; i < 4; i++) {
    let wizard = getWizardProp();
    result.push(wizard);
  }
  return result;
};

const renderWizard = function (wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const wizards = getWizardArray();

const fragment = document.createDocumentFragment();
for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

// userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

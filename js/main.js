'use strict';

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIME_INTERVALS = ['12:00', '13:00', '14:00'];
var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO_ADDRESSES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_X = 50;
var PIN_Y = 70;
var NUMBER_OF_OBJECTS = 8;
var map = document.querySelector('.map');
var widghtMap = map.offsetWidth;
var similarContainerElement = document.querySelector('.map__pins');
var similarHousingTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var similarCardTemplate = document.querySelector('#card');

var chooseHousing = function () {
  return {
    author: {
      avatar: 'img/avatars/user' + 0 + getRandomInt(1, 8) + '.png'
    },
    offer: {
      title: 'Проверенное жильё',
      address: '600, 350',
      price: 3000,
      type: HOUSING_TYPES[Math.floor(Math.random() * HOUSING_TYPES.length)],
      rooms: 3,
      guests: 10,
      checkin: TIME_INTERVALS[Math.floor(Math.random() * TIME_INTERVALS.length)],
      checkout: TIME_INTERVALS[Math.floor(Math.random() * TIME_INTERVALS.length)],
      features: FACILITIES[Math.floor(Math.random() * FACILITIES.length)],
      description: '',
      photos: PHOTO_ADDRESSES[Math.floor(Math.random() * PHOTO_ADDRESSES.length)]
    },
    location: {
      x: getRandomInt(0 + PIN_X, widghtMap - PIN_X),
      y: getRandomInt(130 + PIN_Y, 630)
    }
  };
};

var getTag = function (pin) {
  var housingElement = similarHousingTemplate.cloneNode(true);
  var photo = housingElement.querySelector('img[src]');
  housingElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
  photo.src = pin.author.avatar;
  photo.alt = pin.offer.title;
  return housingElement;
};

var getObjects = function () {
  var results = [];
  for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
    results.push(chooseHousing());
  }
  return results;
};

var getFragment = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
    fragment.appendChild(getTag(pins[i]));
  }
  return fragment;
};

var getDescription = function (pin) {
  var cardElement = similarCardTemplate.cloneNode(true);
};

map.classList.remove('map--faded');
var objects = getObjects();
similarContainerElement.appendChild(getFragment(objects));
getDescription(objects[0]);

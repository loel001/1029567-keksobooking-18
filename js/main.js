'use strict';

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIME_INTERVALS = ['12:00', '13:00', '14:00'];
var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO_ADDRESSES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');
var height = map.offsetWidth;
var chooseHousing = function () {
  var objects = [];
  for (var i = 0; i < 8; i++) {
    objects.push({
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
        x: getRandomInt(0, height),
        y: getRandomInt(130, 630)
      }
    });
  }
  return objects;
};
map.classList.remove('map--faded');

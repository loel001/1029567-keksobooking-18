'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  window.util = {
    mapPin: mapPin,
    addressInput: addressInput,
    chooseRandom: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    randomLength: function (array) {
      return Math.floor(Math.random() * (array.length - 1));
    }
  };
})();

'use strict';
// модуль, который создаёт карточки

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIME_INTERVALS = ['12:00', '13:00', '14:00'];
  var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTO_ADDRESSES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var PIN_X = 50;
  var PIN_Y = 70;
  var NUMBER_OF_OBJECTS = 8;
  var map = document.querySelector('.map');
  var widghtMap = map.offsetWidth;
  var similarHousingTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin:not(.map__pin--main)');
  var similarCardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');
  var similarFiltersTemplate = document.querySelector('.map__filters-container');

  var getRandomLength = function (arr) {
    var res = [];
    var copyOfArray = Array.from(arr);
    var max = window.util.randomLength(copyOfArray) + 1;
    for (var i = 0; i < max; i++) {
      var currentElem = window.util.randomLength(copyOfArray);
      res.push(copyOfArray[currentElem]);
      copyOfArray.splice(currentElem, 1);
    }
    return res;
  };

  var chooseHousing = function () {
    return {
      author: {
        avatar: 'img/avatars/user' + 0 + window.util.getRandomInt(1, 8) + '.png'
      },
      offer: {
        title: 'Проверенное жильё',
        address: '600, 350',
        price: 3000,
        type: window.util.chooseRandom(HOUSING_TYPES),
        rooms: 3,
        guests: 10,
        checkin: window.util.chooseRandom(TIME_INTERVALS),
        checkout: window.util.chooseRandom(TIME_INTERVALS),
        features: getRandomLength(FACILITIES),
        description: '',
        photos: getRandomLength(PHOTO_ADDRESSES)
      },
      location: {
        x: window.util.getRandomInt(0 + PIN_X, widghtMap - PIN_X),
        y: window.util.getRandomInt(130 + PIN_Y, 630)
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

  var objects = getObjects();

  var getPhotoList = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (element) {
      var img = document.createElement('img');
      img.ClassName = 'popup__photo';
      img.src = element;
      img.width = 45;
      img.height = 40;
      img.alt = 'Фотография жилья';
      fragment.appendChild(img);
    });
    return fragment;
  };

  var getDescription = function (pin) {
    var cardElement = similarCardTemplate.cloneNode(true);
    var hoisingTitle = cardElement.querySelector('.popup__title');
    var housingAddress = cardElement.querySelector('.popup__text--address');
    var housingPrice = cardElement.querySelector('.popup__text--price');
    var housingType = cardElement.querySelector('.popup__type');
    var housingCapacity = cardElement.querySelector('.popup__text--capacity');
    var housingTime = cardElement.querySelector('.popup__text--time');
    var housingFeatures = cardElement.querySelector('.popup__features');
    var housingDescription = cardElement.querySelector('.popup__description');
    var housingPhoto = cardElement.querySelector('.popup__photo');
    var housingAvatar = cardElement.querySelector('.popup__avatar');
    var getHousingType = function (type) {
      var result = '';
      if (type === 'flat') {
        result = 'Квартира';
      }
      if (type === 'bungalo') {
        result = 'Бунгало';
      }
      if (type === 'house') {
        result = 'Дом';
      }
      if (type === 'palace') {
        result = 'Дворец';
      }
      return result;
    };
    hoisingTitle.textContent = pin.offer.title;
    housingAddress.textContent = pin.offer.address;
    housingPrice.textContent = 4900 + '₽/ночь';
    housingType.textContent = getHousingType(pin.offer.type);
    housingCapacity.textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    housingTime.textContent = 'заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    housingFeatures.textContent = pin.offer.features;
    housingDescription.textContent = pin.offer.description;
    housingPhoto.replaceWith(getPhotoList(pin.offer.photos));
    housingAvatar.src = pin.author.avatar;
    return cardElement;
  };

  // Для открытия и закрытия попапа по клику на аватарку
  var callObject = function (obj, i) {
    return function () {
      var popups = document.querySelectorAll('.popup:not(.map__pin--main)');
      for (var j = 0; j < popups.length; j++) {
        popups[j].remove();
      }
      similarFiltersTemplate.before(getDescription(obj[i]));
      var buttonPopupClose = document.querySelector('.popup__close');
      var popupAvatar = document.querySelector('.popup');
      buttonPopupClose.addEventListener('click', function () {
        popupAvatar.remove();
      });
      window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.cards.ESC_KEYCODE) {
          if (popupAvatar) {
            evt.preventDefault();
            popupAvatar.remove();
          }
        }
      });
    };
  };

  window.cards = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    map: map,
    widghtMap: widghtMap,
    objects: objects,
    getFragment: function (pins) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
        fragment.appendChild(getTag(pins[i]));
      }
      return fragment;
    },
    openPopupAvatar: function (obj) {
      var avatarPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < avatarPins.length; i++) {
        avatarPins[i].addEventListener('click', callObject(obj, i));
      }
    },
    getTagAddress: function (element) {
      var adFormDisabled = document.querySelector('.ad-form--disabled');
      var pin = element.getBoundingClientRect();
      var pointerHeight = 22;
      var pinCenterX = 0;
      var pinCenterY = 0;
      if (adFormDisabled) {
        pinCenterX = Math.floor(pin.left + (pin.right - pin.left) / 2 + pageXOffset);
        pinCenterY = Math.floor(pin.top + (pin.bottom - pin.top) / 2 + pageYOffset);
      } else {
        pinCenterX = Math.floor(pin.left + (pin.right - pin.left) / 2 + pageXOffset);
        pinCenterY = Math.floor(pin.top + (pin.bottom - pin.top) + pointerHeight + pageYOffset);
      }
      return {
        x: pinCenterX,
        y: pinCenterY
      };
    },
  };
  var coords = window.cards.getTagAddress(window.util.mapPin);
  window.util.addressInput.setAttribute('value', coords.x + ', ' + coords.y);
})();

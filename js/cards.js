'use strict';
// модуль, который создаёт карточки

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var widthMap = map.offsetWidth;
  var similarHousingTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin:not(.map__pin--main)');
  var similarCardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');
  var similarFiltersTemplate = document.querySelector('.map__filters-container');

  var getTag = function (pin) {
    var housingElement = similarHousingTemplate.cloneNode(true);
    var photo = housingElement.querySelector('img[src]');
    housingElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
    photo.src = pin.author.avatar;
    photo.alt = pin.offer.title;
    return housingElement;
  };

  var getPhotoList = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (element) {
      var img = document.createElement('img');
      img.className = 'popup__photo';
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
    var housingDescription = cardElement.querySelector('.popup__description');
    var housingPhoto = cardElement.querySelector('.popup__photo');
    var housingAvatar = cardElement.querySelector('.popup__avatar');
    var housingFeatures = cardElement.querySelectorAll('.popup__feature');
    var getHousingType = function (type) {
      switch (type) {
        case 'flat':
          return 'Квартира';
        case 'bungalo':
          return 'Бунгало';
        case 'house':
          return 'Дом';
        case 'palace':
          return 'Дворец';
        default:
          return null;
      }
    };
    housingFeatures.forEach(function (item) {
      var suffix = item.classList[1];
      var feature = suffix.substring(suffix.indexOf('--') + 2);
      if (pin.offer.features.indexOf(feature) === -1) {
        item.remove();
      }
    });
    hoisingTitle.textContent = pin.offer.title;
    housingAddress.textContent = pin.offer.address;
    housingPrice.textContent = pin.offer.price + '₽/ночь';
    housingType.textContent = getHousingType(pin.offer.type);
    housingCapacity.textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    housingTime.textContent = 'заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
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
    widthMap: widthMap,
    objects: [],
    getFragment: function (pins) {
      var fragment = document.createDocumentFragment();
      var numberOfObjects = pins.length > 5 ? 5 : pins.length;
      for (var i = 0; i < numberOfObjects; i++) {
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
    deletePopupAvatar: function () {
      var avatarPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var popupAvatar = document.querySelector('.popup');
      for (var i = 0; i < avatarPins.length; i++) {
        avatarPins[i].parentNode.removeChild(avatarPins[i]);
        if (popupAvatar) {
          popupAvatar.remove();
        }
      }
    },
    getTagAddress: function (element) {
      var half = 2;
      var adFormDisabled = document.querySelector('.ad-form--disabled');
      var pin = element.getBoundingClientRect();
      var pointerHeight = 16;
      var pinCenterX = 0;
      var pinCenterY = 0;
      var widtRunner = 12;
      var offsetPin = (window.innerWidth - widtRunner - widthMap) / half;
      if (adFormDisabled) {
        pinCenterX = Math.floor(pin.left + (pin.right - pin.left) / half + pageXOffset - offsetPin);
        pinCenterY = Math.floor(pin.top + (pin.bottom - pin.top) / half + pageYOffset);
      } else {
        pinCenterX = Math.floor(pin.left + (pin.right - pin.left) / half + pageXOffset - offsetPin);
        pinCenterY = Math.floor(pin.top + (pin.bottom - pin.top) + pointerHeight + pageYOffset);
      }
      return {
        x: pinCenterX,
        y: pinCenterY
      };
    },
    getPinAddress: function (element) {
      var pin = element.getBoundingClientRect();
      var pinCenterX = 0;
      var pinCenterY = 0;
      var half = 2;
      pinCenterX = Math.floor(pin.left + (pin.right - pin.left) / half + pageXOffset);
      pinCenterY = Math.floor(pin.top + (pin.bottom - pin.top) / half + pageYOffset);
      return {
        x: pinCenterX,
        y: pinCenterY
      };
    },
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };

  var coords = window.cards.getTagAddress(window.util.mapPin);
  window.util.addressInput.setAttribute('value', coords.x + ', ' + coords.y);

  var successHandler = function (photos) {
    window.cards.objects = photos;
  };
  var URL = 'https://js.dump.academy/keksobooking/data';
  window.dataload(URL, null, 'GET', successHandler, window.cards.errorHandler);

})();

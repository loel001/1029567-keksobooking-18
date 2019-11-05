'use strict';
// модуль, который создаёт карточки

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var WIDTH_IMG = 45;
  var HEIGHT_IMG = 40;
  var NUMBER_OF_CARDS = 5;
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
      img.width = WIDTH_IMG;
      img.height = HEIGHT_IMG;
      img.alt = 'Фотография жилья';
      fragment.appendChild(img);
    });
    return fragment;
  };

  var getDescription = function (pin) {
    var cardElement = similarCardTemplate.cloneNode(true);
    var housingButton = cardElement.querySelector('.popup__close');
    var hoisingTitle = cardElement.querySelector('.popup__title');
    var housingAddress = cardElement.querySelector('.popup__text--address');
    var housingPrice = cardElement.querySelector('.popup__text--price');
    var housingType = cardElement.querySelector('.popup__type');
    var housingCapacity = cardElement.querySelector('.popup__text--capacity');
    var housingTime = cardElement.querySelector('.popup__text--time');
    var housingDescription = cardElement.querySelector('.popup__description');
    var housingPhoto = cardElement.querySelector('.popup__photo');
    var housingPhotoWrap = cardElement.querySelector('.popup__photos');
    var housingAvatar = cardElement.querySelector('.popup__avatar');
    var housingFeatures = cardElement.querySelectorAll('.popup__feature');
    var housingFeaturesList = cardElement.querySelector('.popup__features');
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
    var fillСard = function (elementOffer, elementHTML) {
      if (elementOffer !== '') {
        elementHTML.textContent = elementOffer;
        cardElement.appendChild(elementHTML);
      }
      return cardElement;
    };
    cardElement.innerHTML = '';
    if (pin.author.avatar !== '') {
      housingAvatar.src = pin.author.avatar;
      cardElement.appendChild(housingAvatar);
    }
    cardElement.appendChild(housingButton);
    fillСard(pin.offer.title, hoisingTitle);
    fillСard(pin.offer.address, housingAddress);
    if (pin.offer.price > 0) {
      housingPrice.textContent = pin.offer.price + '₽/ночь';
      cardElement.appendChild(housingPrice);
    }
    if (pin.offer.type !== '') {
      housingType.textContent = getHousingType(pin.offer.type);
      cardElement.appendChild(housingType);
    }
    if (pin.offer.rooms > 0 && pin.offer.guests > 0) {
      housingCapacity.textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
      cardElement.appendChild(housingCapacity);
    }
    if (pin.offer.checkin !== '' && pin.offer.checkout !== '') {
      housingTime.textContent = 'заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
      cardElement.appendChild(housingTime);
    }
    if (pin.offer.features.length > 0) {
      housingFeatures.forEach(function (item) {
        var suffix = item.classList[1];
        var feature = suffix.substring(suffix.indexOf('--') + 2);
        if (pin.offer.features.indexOf(feature) === -1) {
          item.remove();
        } else {
          housingFeaturesList.appendChild(item);
        }
      });
      cardElement.appendChild(housingFeaturesList);
    }
    fillСard(pin.offer.description, housingDescription);
    if (pin.offer.photos.length > 0) {
      housingPhoto.replaceWith(getPhotoList(pin.offer.photos));
      cardElement.appendChild(housingPhotoWrap);
    }
    return cardElement;
  };

  // Для открытия и закрытия попапа по клику на аватарку
  var callObject = function (obj, i) {
    return function () {
      var popups = map.querySelectorAll('.popup:not(.map__pin--main)');
      popups.forEach(function (element) {
        element.remove();
      });
      similarFiltersTemplate.before(getDescription(obj[i]));
      var buttonPopupClose = document.querySelector('.popup__close');
      var popupAvatar = document.querySelector('.popup');
      var onKeydownEsc = function (evt) {
        if (evt.keyCode === window.cards.ESC_KEYCODE) {
          if (popupAvatar) {
            evt.preventDefault();
            popupAvatar.remove();
          }
        }
        document.removeEventListener('keydown', onKeydownEsc);
      };
      buttonPopupClose.addEventListener('click', function (evt) {
        evt.preventDefault();
        popupAvatar.remove();
      });
      document.addEventListener('keydown', onKeydownEsc);
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
      var numberOfObjects = pins.length > NUMBER_OF_CARDS ? NUMBER_OF_CARDS : pins.length;
      for (var i = 0; i < numberOfObjects; i++) {
        fragment.appendChild(getTag(pins[i]));
      }
      return fragment;
    },
    openPopupAvatar: function (obj) {
      var avatarPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      avatarPins.forEach(function (element, index) {
        element.addEventListener('click', callObject(obj, index));
      });
    },
    deletePopupAvatar: function () {
      var avatarPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var popupAvatar = document.querySelector('.popup');
      avatarPins.forEach(function (element) {
        element.parentNode.removeChild(element);
        if (popupAvatar) {
          popupAvatar.remove();
        }
      });
    },
    getTagAddress: function (element) {
      var adFormDisabled = document.querySelector('.ad-form--disabled');
      var pin = element.getBoundingClientRect();
      var pointerHeight = 16;
      var pinCenterX = 0;
      var pinCenterY = 0;
      var widtRunner = 16;
      var offsetPin = (window.innerWidth - widtRunner - widthMap) / 2;
      if (adFormDisabled) {
        pinCenterX = Math.floor(pin.left + (pin.right - pin.left) / 2 + pageXOffset - offsetPin);
        pinCenterY = Math.floor(pin.top + (pin.bottom - pin.top) / 2 + pageYOffset);
      } else {
        pinCenterX = Math.floor(pin.left + (pin.right - pin.left) / 2 + pageXOffset - offsetPin);
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
      pinCenterX = Math.floor(pin.left + (pin.right - pin.left) / 2 + pageXOffset);
      pinCenterY = Math.floor(pin.top + (pin.bottom - pin.top) / 2 + pageYOffset);
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
})();

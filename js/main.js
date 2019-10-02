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
var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
var similarFiltersTemplate = document.querySelector('.map__filters-container');
var formFieldsetHeader = document.querySelector('.ad-form-header');
var formFieldsetElement = document.querySelectorAll('.ad-form__element');
var formSelectElement = document.querySelectorAll('.map__filter');
var formFieldsetFeatures = document.querySelector('.map__features');
var mapPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var addressInput = document.querySelector('#address');
var roomSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');

var addDisabledAttribute = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('disabled', '');
  }
};

var removeDisabledAttribute = function (array) {
  array.forEach(function (element) {
    element.removeAttribute('disabled');
  });
};

var randomLength = function (array) {
  return Math.floor(Math.random() * (array.length - 1));
};

var getRandomLength = function (arr) {
  var res = [];
  var copyOfArray = Array.from(arr);
  var max = randomLength(copyOfArray) + 1;
  for (var i = 0; i < max; i++) {
    var currentElem = randomLength(copyOfArray);
    res.push(copyOfArray[currentElem]);
    copyOfArray.splice(currentElem, 1);
  }
  return res;
};

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
      features: getRandomLength(FACILITIES),
      description: '',
      photos: getRandomLength(PHOTO_ADDRESSES)
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

var getTagAddress = function (element) {
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
  return pinCenterX + ', ' + pinCenterY;
};

// Валидация для количества гостей взависимости от количества комнат
var updateSelect = function (rooms, guests) {
  for (var i = 0; i < guests.options.length; i++) {
    guests.options[i].setAttribute('disabled', '');
  }
  switch (rooms.value) {
    case '1':
      guests.querySelector('[value="1"]').removeAttribute('disabled');
      guests.querySelector('[value="1"]').setAttribute('selected', '');
      guests.querySelector('[value="2"]').removeAttribute('selected');
      guests.querySelector('[value="3"]').removeAttribute('selected');
      guests.querySelector('[value="0"]').removeAttribute('selected');
      break;
    case '2':
      guests.querySelector('[value="1"]').removeAttribute('disabled');
      guests.querySelector('[value="2"]').removeAttribute('disabled');
      guests.querySelector('[value="2"]').setAttribute('selected', '');
      guests.querySelector('[value="1"]').removeAttribute('selected');
      guests.querySelector('[value="3"]').removeAttribute('selected');
      guests.querySelector('[value="0"]').removeAttribute('selected');
      break;
    case '3':
      guests.querySelector('[value="1"]').removeAttribute('disabled');
      guests.querySelector('[value="2"]').removeAttribute('disabled');
      guests.querySelector('[value="3"]').removeAttribute('disabled');
      guests.querySelector('[value="3"]').setAttribute('selected', '');
      guests.querySelector('[value="1"]').removeAttribute('selected');
      guests.querySelector('[value="2"]').removeAttribute('selected');
      guests.querySelector('[value="0"]').removeAttribute('selected');
      break;
    case '100':
      guests.querySelector('[value="0"]').removeAttribute('disabled');
      guests.querySelector('[value="0"]').setAttribute('selected', '');
      guests.querySelector('[value="1"]').removeAttribute('selected');
      guests.querySelector('[value="2"]').removeAttribute('selected');
      guests.querySelector('[value="3"]').removeAttribute('selected');
      break;
  }
};

// удаление disabled у форм, появляются пины с аватарками, смена адреса пина(красного)
var addUponActivation = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  removeDisabledAttribute(formFieldsetElement);
  removeDisabledAttribute([formFieldsetHeader]);
  removeDisabledAttribute(formSelectElement);
  removeDisabledAttribute([formFieldsetFeatures]);
  addressInput.setAttribute('value', getTagAddress(mapPin));
  updateSelect(roomSelect, capacitySelect);
  similarContainerElement.appendChild(getFragment(objects));
};

// Добавление disabled у форм
var addBeforeActivation = function () {
  addDisabledAttribute(formFieldsetElement);
  addDisabledAttribute([formFieldsetHeader]);
  addDisabledAttribute(formSelectElement);
  addDisabledAttribute([formFieldsetFeatures]);
};

// Для открытия попапа по аватарки
var callObject = function (obj, i) {
  return function () {
    var popup = document.querySelectorAll('.popup');
    for (var j = 0; j < popup.length; j++) {
      popup[j].remove();
    }
    similarFiltersTemplate.before(getDescription(obj[i]));
    var buttonPopupClose = document.querySelector('.popup__close');
    var popupAvatar = document.querySelector('.popup');
    buttonPopupClose.addEventListener('click', function () {
      popupAvatar.remove();
    });
  };
};

var openPopupAvatar = function (obj) {
  var avatarPin = document.querySelectorAll('.map__pin');
  for (var i = 1; i < avatarPin.length; i++) {
    avatarPin[i].addEventListener('click', callObject(obj, i - 1));
  }
};

addressInput.setAttribute('value', getTagAddress(mapPin));
addBeforeActivation();
var objects = getObjects();

mapPin.addEventListener('mousedown', function () {
  addUponActivation();
  openPopupAvatar(objects);
});

mapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    evt.preventDefault();
    addUponActivation();
    openPopupAvatar(objects);
  }
});

roomSelect.addEventListener('change', function () {
  updateSelect(roomSelect, capacitySelect);
});


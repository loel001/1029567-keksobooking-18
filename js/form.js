'use strict';
// модуль, который работает с формой объявления

(function () {
  var MAIN_PIN_LEFT = 570;
  var MAIN_PIN_TOP = 375;
  var PIN_LEFT_INPUT = 600;
  var PIN_TOP_INPUT = 407;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;
  var ad = document.querySelector('.ad-form');
  var fieldsetHeader = ad.querySelector('.ad-form-header');
  var fieldsetElements = ad.querySelectorAll('.ad-form__element');
  var selectElements = window.filter.purification.querySelectorAll('.map__filter');
  var fieldsetFeatures = window.filter.purification.querySelector('.map__features');
  var roomSelect = ad.querySelector('#room_number');
  var capacitySelect = ad.querySelector('#capacity');
  var typeНousingSelect = ad.querySelector('#type');
  var priceНousingInput = ad.querySelector('#price');
  var timeInSelect = ad.querySelector('#timein');
  var timeOutSelect = ad.querySelector('#timeout');
  var cleaning = ad.querySelector('.ad-form__reset');
  var similarError = document.querySelector('#success')
      .content
      .querySelector('.success');

  window.form = {
    ad: ad,
    fieldsetHeader: fieldsetHeader,
    fieldsetElements: fieldsetElements,
    selectElements: selectElements,
    fieldsetFeatures: fieldsetFeatures,
    roomSelect: roomSelect,
    capacitySelect: capacitySelect,
    typeНousingSelect: typeНousingSelect,
    priceНousingInput: priceНousingInput,
    timeInSelect: timeInSelect,
    timeOutSelect: timeOutSelect,
    addDisabledAttribute: function (array) {
      array.forEach(function (element) {
        element.disabled = true;
      });
    },
    // Добавление disabled у форм перед активайией
    addBeforeActivation: function () {
      window.form.addDisabledAttribute(window.form.fieldsetElements);
      window.form.addDisabledAttribute([window.form.fieldsetHeader]);
      window.form.addDisabledAttribute(window.form.selectElements);
      window.form.addDisabledAttribute([window.form.fieldsetFeatures]);
    },
    removeDisabledAttribute: function (array) {
      array.forEach(function (element) {
        element.disabled = false;
      });
    },
    // Валидация для количества гостей взависимости от количества комнат
    updateSelect: function (rooms, guests) {
      var capacityOptions = ad.querySelectorAll('#capacity option');
      capacityOptions.forEach(function (element) {
        element.disabled = true;
      });
      switch (rooms.value) {
        case '1':
          guests.querySelector('[value="1"]').disabled = false;
          guests.querySelector('[value="1"]').selected = true;
          guests.querySelector('[value="2"]').selected = false;
          guests.querySelector('[value="3"]').selected = false;
          guests.querySelector('[value="0"]').selected = false;
          break;
        case '2':
          guests.querySelector('[value="1"]').disabled = false;
          guests.querySelector('[value="2"]').disabled = false;
          guests.querySelector('[value="2"]').selected = true;
          guests.querySelector('[value="1"]').selected = false;
          guests.querySelector('[value="3"]').selected = false;
          guests.querySelector('[value="0"]').selected = false;
          break;
        case '3':
          guests.querySelector('[value="1"]').disabled = false;
          guests.querySelector('[value="2"]').disabled = false;
          guests.querySelector('[value="3"]').disabled = false;
          guests.querySelector('[value="3"]').selected = true;
          guests.querySelector('[value="1"]').selected = false;
          guests.querySelector('[value="2"]').selected = false;
          guests.querySelector('[value="0"]').selected = false;
          break;
        case '100':
          guests.querySelector('[value="0"]').disabled = false;
          guests.querySelector('[value="0"]').selected = true;
          guests.querySelector('[value="1"]').selected = false;
          guests.querySelector('[value="2"]').selected = false;
          guests.querySelector('[value="3"]').selected = false;
          break;
      }
    },
    // Валидация для цены за ночь взависимости от типа жилья
    updatePrice: function (type, price) {
      switch (type.value) {
        case 'bungalo':
          price.placeholder = '0';
          price.min = '0';
          break;
        case 'flat':
          price.placeholder = MIN_PRICE_FLAT;
          price.min = MIN_PRICE_FLAT;
          break;
        case 'house':
          price.placeholder = MIN_PRICE_HOUSE;
          price.min = MIN_PRICE_HOUSE;
          break;
        case 'palace':
          price.placeholder = MIN_PRICE_PALACE;
          price.min = MIN_PRICE_PALACE;
          break;
      }
    },
    returnInactiveState: function () {
      ad.classList.add('ad-form--disabled');
      window.cards.map.classList.add('map--faded');
      window.form.addBeforeActivation();
      window.cards.deletePopupAvatar();
      ad.reset();
      window.filter.purification.reset();
    }
  };
  window.form.addBeforeActivation();

  roomSelect.addEventListener('change', function () {
    window.form.updateSelect(roomSelect, capacitySelect);
  });

  typeНousingSelect.addEventListener('change', function () {
    window.form.updatePrice(typeНousingSelect, priceНousingInput);
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.value = timeOutSelect.value;
  });

  timeInSelect.addEventListener('change', function () {
    timeOutSelect.value = timeInSelect.value;
  });

  // изменение полей формы при успешной отправки
  var replaceEntryField = function () {
    var pricePlaceholder = 1000;
    var photo = document.querySelector('.ad-form__photo img');
    if (photo) {
      photo.remove();
    }
    window.photo.previewAvatar.src = 'img/muffin-grey.svg';
    priceНousingInput.placeholder = pricePlaceholder;
    capacitySelect.querySelector('[value="1"]').disabled = false;
    capacitySelect.querySelector('[value="1"]').selected = true;
    capacitySelect.querySelector('[value="2"]').selected = false;
    capacitySelect.querySelector('[value="3"]').selected = false;
    capacitySelect.querySelector('[value="0"]').selected = false;
    window.util.mapPin.style = 'left: ' + MAIN_PIN_LEFT + 'px; top: ' + MAIN_PIN_TOP + 'px;';
    window.util.addressInput.value = PIN_LEFT_INPUT + ', ' + PIN_TOP_INPUT;
  };

  // сообщение при успешной отправки формы
  var getSuccessMessage = function () {
    var error = similarError.cloneNode(true);
    var messageError = error.querySelector('.success__message');
    messageError.textContent = 'Ваше объявление\nуспешно размещено!';
    messageError.style = 'white-space: pre-line';
    return error;
  };

  // отправка формы
  ad.addEventListener('submit', function (evt) {
    var successHandler = function () {
      window.form.returnInactiveState();
      window.cards.map.before(getSuccessMessage());
      replaceEntryField();
    };
    var URL = 'https://js.dump.academy/keksobooking';
    var data = new FormData(ad);
    window.load(URL, data, 'POST', successHandler, window.cards.errorHandler);
    evt.preventDefault();
  });

  // закрытие сообщения после отправления формы
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.cards.ESC_KEYCODE) {
      var success = document.querySelector('.success');
      if (success) {
        evt.preventDefault();
        success.remove();
      }
    }
  });

  document.addEventListener('click', function () {
    var success = document.querySelector('.success');
    if (success) {
      success.remove();
    }
  });

  cleaning.addEventListener('click', function () {
    window.form.returnInactiveState();
    replaceEntryField();
    timeOutSelect.querySelector('[value="12:00"]').disabled = false;
    timeOutSelect.querySelector('[value="12:00"]').selected = true;
    timeOutSelect.querySelector('[value="13:00"]').selected = false;
    timeOutSelect.querySelector('[value="14:00"]').selected = false;
  });
})();

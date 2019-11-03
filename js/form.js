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
  var capacityOptions = ad.querySelectorAll('#capacity option');
  var typeНousingSelect = ad.querySelector('#type');
  var priceНousingInput = ad.querySelector('#price');
  var timeInSelect = ad.querySelector('#timein');
  var timeOutSelect = ad.querySelector('#timeout');
  var cleaning = ad.querySelector('.ad-form__reset');
  var similarError = document.querySelector('#success')
      .content
      .querySelector('.success');
  var guestList = {
    1: [1],
    2: [2, 1],
    3: [3, 2, 1],
    100: [0]
  };

  window.form = {
    ad: ad,
    fieldsetHeader: fieldsetHeader,
    fieldsetElements: fieldsetElements,
    selectElements: selectElements,
    fieldsetFeatures: fieldsetFeatures,
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
    updateSelect: function () {
      var result = '';
      capacityOptions.forEach(function (element) {
        if (guestList[roomSelect.value].indexOf(+element.value) > -1) {
          result += element.outerHTML;
        }
      });
      capacitySelect.innerHTML = result;
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

  window.form.updateSelect();

  roomSelect.addEventListener('change', function () {
    window.form.updateSelect();
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
    window.form.updateSelect();
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
  });
})();

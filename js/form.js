'use strict';
// модуль, который работает с формой объявления

(function () {
  var MAIN_PIN_LEFT = 570;
  var MAIN_PIN_TOP = 375;
  var PIN_LEFT_INPUT = 600;
  var PIN_TOP_INPUT = 407;
  var formFieldsetHeader = document.querySelector('.ad-form-header');
  var formFieldsetElements = document.querySelectorAll('.ad-form__element');
  var formSelectElements = document.querySelectorAll('.map__filter');
  var formFieldsetFeatures = document.querySelector('.map__features');
  var roomSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var typeНousingSelect = document.querySelector('#type');
  var priceНousingInput = document.querySelector('#price');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var adForm = document.querySelector('.ad-form');
  var similarFormError = document.querySelector('#success')
      .content
      .querySelector('.success');
  var cleaningForm = document.querySelector('.ad-form__reset');

  window.form = {
    formFieldsetHeader: formFieldsetHeader,
    formFieldsetElements: formFieldsetElements,
    formSelectElements: formSelectElements,
    formFieldsetFeatures: formFieldsetFeatures,
    roomSelect: roomSelect,
    capacitySelect: capacitySelect,
    typeНousingSelect: typeНousingSelect,
    priceНousingInput: priceНousingInput,
    timeInSelect: timeInSelect,
    timeOutSelect: timeOutSelect,
    adForm: adForm,
    addDisabledAttribute: function (array) {
      for (var i = 0; i < array.length; i++) {
        array[i].setAttribute('disabled', '');
      }
    },
    // Добавление disabled у форм перед активайией
    addBeforeActivation: function () {
      window.form.addDisabledAttribute(window.form.formFieldsetElements);
      window.form.addDisabledAttribute([window.form.formFieldsetHeader]);
      window.form.addDisabledAttribute(window.form.formSelectElements);
      window.form.addDisabledAttribute([window.form.formFieldsetFeatures]);
    },
    removeDisabledAttribute: function (array) {
      array.forEach(function (element) {
        element.removeAttribute('disabled');
      });
    },
    // Валидация для количества гостей взависимости от количества комнат
    updateSelect: function (rooms, guests) {
      for (var i = 0; i < guests.options.length; i++) {
        guests.options[i].disabled = true;
      }
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
          price.setAttribute('min', 0);
          break;
        case 'flat':
          price.placeholder = '1000';
          price.setAttribute('min', 1000);
          break;
        case 'house':
          price.placeholder = '5000';
          price.setAttribute('min', 5000);
          break;
        case 'palace':
          price.placeholder = '10000';
          price.setAttribute('min', 10000);
          break;
      }
    },
    // Валидация для количества гостей взависимости от количества комнат
    updateTimeOut: function (timein, timeout) {
      for (var i = 0; i < timeout.options.length; i++) {
        timeout.options[i].setAttribute('disabled', '');
      }
      switch (timein.value) {
        case '12:00':
          timeout.querySelector('[value="12:00"]').removeAttribute('disabled');
          timeout.querySelector('[value="12:00"]').setAttribute('selected', '');
          timeout.querySelector('[value="13:00"]').removeAttribute('selected');
          timeout.querySelector('[value="14:00"]').removeAttribute('selected');
          break;
        case '13:00':
          timeout.querySelector('[value="13:00"]').removeAttribute('disabled');
          timeout.querySelector('[value="13:00"]').setAttribute('selected', '');
          timeout.querySelector('[value="12:00"]').removeAttribute('selected');
          timeout.querySelector('[value="14:00"]').removeAttribute('selected');
          break;
        case '14:00':
          timeout.querySelector('[value="14:00"]').removeAttribute('disabled');
          timeout.querySelector('[value="14:00"]').setAttribute('selected', '');
          timeout.querySelector('[value="12:00"]').removeAttribute('selected');
          timeout.querySelector('[value="13:00"]').removeAttribute('selected');
          break;
      }
    },
    returnInactiveState: function () {
      adForm.classList.add('ad-form--disabled');
      window.cards.map.classList.add('map--faded');
      window.form.addBeforeActivation();
      window.cards.deletePopupAvatar();
      adForm.reset();
    }
  };
  window.form.addBeforeActivation();

  roomSelect.addEventListener('change', function () {
    window.form.updateSelect(roomSelect, capacitySelect);
  });

  typeНousingSelect.addEventListener('change', function () {
    window.form.updatePrice(typeНousingSelect, priceНousingInput);
  });

  timeInSelect.addEventListener('change', function () {
    window.form.updateTimeOut(timeInSelect, timeOutSelect);
  });

  // изменение полей формы при успешной отправки
  var replaceEntryField = function () {
    var photo = document.querySelector('.ad-form__photo img');
    if (photo) {
      photo.remove();
    }
    window.photo.previewAvatar.src = 'img/muffin-grey.svg';
    window.form.updateTimeOut(timeInSelect, timeOutSelect);
    priceНousingInput.placeholder = '1000';
    capacitySelect.querySelector('[value="1"]').removeAttribute('disabled');
    capacitySelect.querySelector('[value="1"]').setAttribute('selected', '');
    capacitySelect.querySelector('[value="2"]').removeAttribute('selected');
    capacitySelect.querySelector('[value="3"]').removeAttribute('selected');
    capacitySelect.querySelector('[value="0"]').removeAttribute('selected');
    window.util.mapPin.style = 'left: ' + MAIN_PIN_LEFT + 'px; top: ' + MAIN_PIN_TOP + 'px;';
    window.util.addressInput.setAttribute('value', PIN_LEFT_INPUT + ', ' + PIN_TOP_INPUT);
  };

  // сообщение при успешной отправки формы
  var getSuccessMessage = function () {
    var formError = similarFormError.cloneNode(true);
    var messageError = formError.querySelector('.success__message');
    messageError.textContent = 'Ваше объявление\nуспешно размещено!';
    messageError.style = 'white-space: pre-line';
    return formError;
  };

  // отправка формы
  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm), function () {
      window.form.returnInactiveState();
      window.cards.map.before(getSuccessMessage());
      replaceEntryField();
    });
    evt.preventDefault();
  });

  // закрытие сообщения после отправления формы
  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.cards.ESC_KEYCODE) {
      var success = document.querySelector('.success');
      if (success) {
        evt.preventDefault();
        success.remove();
      }
    }
  });

  window.addEventListener('click', function () {
    var success = document.querySelector('.success');
    if (success) {
      success.remove();
    }
  });

  cleaningForm.addEventListener('click', function () {
    replaceEntryField();
    timeOutSelect.querySelector('[value="12:00"]').removeAttribute('disabled');
    timeOutSelect.querySelector('[value="12:00"]').setAttribute('selected', '');
    timeOutSelect.querySelector('[value="13:00"]').removeAttribute('selected');
    timeOutSelect.querySelector('[value="14:00"]').removeAttribute('selected');
  });
})();

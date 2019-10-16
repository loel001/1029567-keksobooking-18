'use strict';
// модуль, который работает с формой объявления

(function () {
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
      window.cards.deletePopupAvatar();
      adForm.reset();
      window.util.mapPin.style = 'left: ' + 570 + 'px; top: ' + 375 + 'px;';
      window.util.addressInput.setAttribute('value', 600 + ', ' + 407);
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
    window.form.updateTimeOut(timeInSelect, timeOutSelect);
    priceНousingInput.placeholder = '5000';
    capacitySelect.querySelector('[value="3"]').removeAttribute('disabled');
    capacitySelect.querySelector('[value="3"]').setAttribute('selected', '');
    capacitySelect.querySelector('[value="1"]').removeAttribute('selected');
    capacitySelect.querySelector('[value="2"]').removeAttribute('selected');
    capacitySelect.querySelector('[value="0"]').removeAttribute('selected');
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
})();

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

  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm), function () {
      adForm.classList.add('ad-form--disabled');
      window.cards.map.classList.add('map--faded');
      window.cards.deletePopupAvatar();
    });
    evt.preventDefault();
  });
})();

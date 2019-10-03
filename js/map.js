'use strict';
// модуль, который управляет карточками объявлений и пинами: добавляет на страницу нужную карточку, отрисовывает пины и осуществляет взаимодействие карточки и метки на карте;

(function () {
  var adForm = document.querySelector('.ad-form');
  var similarContainerElement = document.querySelector('.map__pins');

  // удаление disabled у форм, появляются пины с аватарками, смена адреса пина(красного)
  var addUponActivation = function () {
    window.cards.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.removeDisabledAttribute(window.form.formFieldsetElements);
    window.form.removeDisabledAttribute([window.form.formFieldsetHeader]);
    window.form.removeDisabledAttribute(window.form.formSelectElements);
    window.form.removeDisabledAttribute([window.form.formFieldsetFeatures]);
    window.util.addressInput.setAttribute('value', window.cards.getTagAddress(window.util.mapPin));
    window.form.updateSelect(window.form.roomSelect, window.form.capacitySelect);
    window.form.updatePrice(window.form.typeНousingSelect, window.form.priceНousingInput);
    window.form.updateTimeOut(window.form.timeInSelect, window.form.timeOutSelect);
    similarContainerElement.appendChild(window.cards.getFragment(window.cards.objects));
  };

  window.util.mapPin.addEventListener('mousedown', function () {
    var avatars = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (avatars.length === 0) {
      addUponActivation();
      window.cards.openPopupAvatar(window.cards.objects);
    }
  });

  window.util.mapPin.addEventListener('keydown', function (evt) {
    var avatars = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (evt.keyCode === window.cards.ENTER_KEYCODE) {
      if (avatars.length === 0) {
        evt.preventDefault();
        addUponActivation();
        window.cards.openPopupAvatar(window.cards.objects);
      }
    }
  });
})();

'use strict';
// модуль, который управляет карточками объявлений и пинами: добавляет на страницу нужную карточку, отрисовывает пины и осуществляет взаимодействие карточки и метки на карте;

(function () {
  var adForm = document.querySelector('.ad-form');
  var addressInput = document.querySelector('#address');

  // удаление disabled у форм, появляются пины с аватарками, смена адреса пина(красного)
  var addUponActivation = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    removeDisabledAttribute(formFieldsetElements);
    removeDisabledAttribute([formFieldsetHeader]);
    removeDisabledAttribute(formSelectElements);
    removeDisabledAttribute([formFieldsetFeatures]);
    addressInput.setAttribute('value', getTagAddress(mapPin));
    updateSelect(roomSelect, capacitySelect);
    updatePrice(typeНousingSelect, priceНousingInput);
    updateTimeOut(timeInSelect, timeOutSelect);
    similarContainerElement.appendChild(getFragment(objects));
  };

  mapPin.addEventListener('mousedown', function () {
    var avatars = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (avatars.length === 0) {
      addUponActivation();
      openPopupAvatar(objects);
    }
  });

  mapPin.addEventListener('keydown', function (evt) {
    var avatars = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (evt.keyCode === window.cards.ENTER_KEYCODE) {
      if (avatars.length === 0) {
        evt.preventDefault();
        addUponActivation();
        openPopupAvatar(objects);
      }
    }
  });
})();

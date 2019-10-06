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
    var pinCoords = window.cards.getTagAddress(window.util.mapPin);
    window.util.addressInput.setAttribute('value', pinCoords.x + ', ' + pinCoords.y);
    window.form.updateSelect(window.form.roomSelect, window.form.capacitySelect);
    window.form.updatePrice(window.form.typeНousingSelect, window.form.priceНousingInput);
    window.form.updateTimeOut(window.form.timeInSelect, window.form.timeOutSelect);
    similarContainerElement.appendChild(window.cards.getFragment(window.cards.objects));
  };

  window.util.mapPin.addEventListener('mousedown', function (evt) {
    var avatars = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    evt.preventDefault();
    if (avatars.length === 0) {
      addUponActivation();
      window.cards.openPopupAvatar(window.cards.objects);
    } else {
      var startCoords = window.cards.getTagAddress(window.util.mapPin);
      var dragged = false;
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;
        var newCoordsY = startCoords.y - moveEvt.clientY;
        var newCoordsX = startCoords.x - moveEvt.clientX;
        startCoords.x = moveEvt.clientX;
        startCoords.y = moveEvt.clientY;
        window.util.mapPin.style.top = (window.util.mapPin.offsetTop - newCoordsY) + 'px';
        window.util.mapPin.style.left = (window.util.mapPin.offsetLeft - newCoordsX) + 'px';
        if ((window.util.mapPin.offsetTop + 42) < 130 || (window.util.mapPin.offsetTop + 42) > 630) {
          window.util.mapPin.style.top = (window.util.mapPin.offsetTop + newCoordsY) + 'px';
        }
        if ((window.util.mapPin.offsetLeft + 31) < 0 || (window.util.mapPin.offsetLeft + 31) > window.cards.widghtMap) {
          window.util.mapPin.style.left = (window.util.mapPin.offsetLeft + newCoordsX) + 'px';
        }
        window.util.addressInput.setAttribute('value', newCoordsX + ', ' + newCoordsY);
      };
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (dragged) {
          var onClickPreventDefault = function (drugEvt) {
            drugEvt.preventDefault();
            window.util.mapPin.removeEventListener('click', onClickPreventDefault);
          };
          window.util.mapPin.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
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

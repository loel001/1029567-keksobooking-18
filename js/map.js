'use strict';
// модуль, который управляет карточками объявлений и пинами: добавляет на страницу нужную карточку, отрисовывает пины и осуществляет взаимодействие карточки и метки на карте;

(function () {
  var MAIN_PIN_X = 32;
  var MAIN_PIN_Y = 84;
  var MAX_MAP_Y = 630;
  var MIN_MAP_Y = 130;
  var half = 2;
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
    var mapPin = window.util.mapPin;
    var addressInput = window.util.addressInput;
    var widghtMap = window.cards.widghtMap;
    evt.preventDefault();
    if (avatars.length === 0) {
      addUponActivation();
      window.cards.openPopupAvatar(window.cards.objects);
    } else {
      var startCoords = window.cards.getTagAddress(mapPin);
      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;
        var bordersX = ['-' + MAIN_PIN_X + 'px', (widghtMap - MAIN_PIN_X) + 'px'];
        var bordersY = [MIN_MAP_Y + 'px', MAX_MAP_Y + 'px'];
        var shiftCoordsY = startCoords.y - moveEvt.clientY;
        var shiftCoordsX = startCoords.x - moveEvt.clientX;
        var newCoordsY = mapPin.offsetTop - shiftCoordsY + pageYOffset;
        var newCoordsX = mapPin.offsetLeft - shiftCoordsX + pageXOffset;
        if (((newCoordsY + MAIN_PIN_Y) >= MIN_MAP_Y && (newCoordsY + MAIN_PIN_Y) <= MAX_MAP_Y) &&
            (newCoordsX >= -MAIN_PIN_X && newCoordsX <= widghtMap - MAIN_PIN_X)) {
          startCoords.x = moveEvt.clientX + pageXOffset;
          startCoords.y = moveEvt.clientY + pageYOffset;
          mapPin.style.top = newCoordsY + 'px';
          mapPin.style.left = newCoordsX + 'px';
          addressInput.setAttribute('value', (newCoordsX + MAIN_PIN_X) + ', ' + (newCoordsY + MAIN_PIN_Y));
        }
        if (((newCoordsY + MAIN_PIN_Y) < MIN_MAP_Y) && (!bordersY.includes(mapPin.style.top)) && (!bordersX.includes(mapPin.style.left))) {
          startCoords.y = MIN_MAP_Y - MAIN_PIN_Y;
          mapPin.style.top = (MIN_MAP_Y - MAIN_PIN_Y) + 'px';
          addressInput.setAttribute('value', startCoords.x + ', ' + MIN_MAP_Y);
        }
        if (((newCoordsY + MAIN_PIN_Y) > MAX_MAP_Y) && (!bordersY.includes(mapPin.style.top)) && (!bordersX.includes(mapPin.style.left))) {
          startCoords.y = MAX_MAP_Y - MAIN_PIN_Y;
          mapPin.style.top = (MAX_MAP_Y - MAIN_PIN_Y) + 'px';
          addressInput.setAttribute('value', startCoords.x + ', ' + MAX_MAP_Y);
        }
        if ((newCoordsX < -MAIN_PIN_X) && (!bordersX.includes(mapPin.style.left)) && (!bordersY.includes(mapPin.style.top))) {
          startCoords.x = (window.innerWidth - widghtMap) / half;
          mapPin.style.left = -MAIN_PIN_X + 'px';
          addressInput.setAttribute('value', 0 + ', ' + startCoords.y);
        }
        if ((newCoordsX > widghtMap - MAIN_PIN_X) && (!bordersX.includes(mapPin.style.left)) && (!bordersY.includes(mapPin.style.top))) {
          startCoords.x = (window.innerWidth - widghtMap) / half + widghtMap;
          mapPin.style.left = (widghtMap - MAIN_PIN_X) + 'px';
          addressInput.setAttribute('value', widghtMap + ', ' + startCoords.y);
        }
      };
    }
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (drugEvt) {
          drugEvt.preventDefault();
          mapPin.removeEventListener('click', onClickPreventDefault);
        };
        mapPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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

  window.map = {
    adForm: adForm
  };
})();

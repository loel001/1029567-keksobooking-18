'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var mapPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var similarCardError = document.querySelector('#error')
      .content
      .querySelector('.error');

  window.util = {
    SUCCESS_CODE: SUCCESS_CODE,
    mapPin: mapPin,
    addressInput: addressInput,
    getDescription: function () {
      var cardError = similarCardError.cloneNode(true);
      var messageError = cardError.querySelector('.error__message');
      var buttonError = cardError.querySelector('.error__button');
      var error = document.querySelector('.error');
      var mapFaded = document.querySelector('.map--faded');
      messageError.textContent = 'Ошибка загрузки объявления';
      buttonError.textContent = 'Попробовать снова';
      buttonError.addEventListener('click', function (evt) {
        if ((error !== undefined) && (mapFaded === null)) {
          if (error) {
            evt.preventDefault();
            error.remove();
          }
        } else {
          evt.preventDefault();
          document.location.reload(true);
        }
      });
      return cardError;
    }
  };

  // закрытие сообщения об ошибке после отправления формы
  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.cards.ESC_KEYCODE) {
      var mapFaded = document.querySelector('.map--faded');
      var error = document.querySelector('.error');
      if ((error !== undefined) && (mapFaded === null)) {
        if (error) {
          evt.preventDefault();
          error.remove();
        }
      }
    }
  });

  window.addEventListener('click', function () {
    var mapFaded = document.querySelector('.map--faded');
    var error = document.querySelector('.error');
    if ((error !== undefined) && (mapFaded === null)) {
      if (error) {
        error.remove();
      }
    }
  });
})();

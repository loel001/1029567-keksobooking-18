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
    getDescriptionError: function () {
      var cardError = similarCardError.cloneNode(true);
      var messageError = cardError.querySelector('.error__message');
      var buttonError = cardError.querySelector('.error__button');
      var onShowError = function (evt) {
        if ((evt.type === 'click') || (evt.keyCode === window.cards.ESC_KEYCODE)) {
          var error = document.querySelector('.error');
          var mapFaded = document.querySelector('.map--faded');
          if ((error !== null) && (mapFaded === null)) {
            if (error) {
              evt.preventDefault();
              error.remove();
            }
          } else {
            evt.preventDefault();
            document.location.reload(true);
          }
        }
        document.removeEventListener('keydown', onShowError);
        document.removeEventListener('click', onShowError);
      };
      messageError.textContent = 'Ошибка загрузки объявления';
      buttonError.textContent = 'Попробовать снова';
      document.addEventListener('keydown', onShowError);
      document.addEventListener('click', onShowError);
      return cardError;
    }
  };
})();

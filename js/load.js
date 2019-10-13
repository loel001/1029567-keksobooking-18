'use strict';
// модуль, который будет загружать наши данные по сети

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var similarCardError = document.querySelector('#error')
      .content
      .querySelector('.error');

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        window.cards.map.before(getDescription());
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000; // 10s
    xhr.open('GET', URL);
    xhr.send();
  };

  var getDescription = function () {
    var cardError = similarCardError.cloneNode(true);
    var messageError = cardError.querySelector('.error__message');
    var buttonError = cardError.querySelector('.error__button');
    messageError.textContent = 'Ошибка загрузки объявления';
    buttonError.textContent = 'Попробовать снова';
    return cardError;
  };
})();

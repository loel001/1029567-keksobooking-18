'use strict';
// модуль, который будет загружать наши данные по сети

(function () {
  var TIMEOUT_INTERVAL = 10000;
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.SUCCESS_CODE) {
        onSuccess(xhr.response.filter(function (objects) {
          return objects.offer !== undefined;
        }));
      } else {
        window.cards.map.before(window.util.getDescription());
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_INTERVAL;
    xhr.open('GET', URL);
    xhr.send();
  };
})();

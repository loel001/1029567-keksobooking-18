'use strict';
// Загрузка данных с сервера
(function () {
  var TIMEOUT_INTERVAL = 10000;
  window.load = function (url, data, method, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.SUCCESS_CODE) {
        switch (url) {
          case 'https://js.dump.academy/keksobooking/data':
            onSuccess(xhr.response.filter(function (objects) {
              return objects.offer !== undefined;
            }));
            break;
          case 'https://js.dump.academy/keksobooking':
            onSuccess(xhr.response);
            break;
        }
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
    xhr.open(method, url);
    if (data !== null) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };
})();

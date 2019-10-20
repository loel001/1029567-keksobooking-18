'use strict';
// Загрузка данных с сервера
(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        window.cards.map.before(window.util.getDescription());
      }
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();

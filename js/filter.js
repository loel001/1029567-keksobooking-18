'use strict';

(function () {
  var selestHousingType = document.querySelector('#housing-type');

  selestHousingType.addEventListener('click', function () {
    renderPins(selestHousingType.options[selestHousingType.selectedIndex].value);
  });

  var renderPins = function (housingType) {
    console.log(housingType);
  };
})();

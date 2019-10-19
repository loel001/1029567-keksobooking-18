'use strict';

(function () {
  var selestHousingType = document.querySelector('#housing-type');

  selestHousingType.addEventListener('change', function () {
    renderPins(selestHousingType.options[selestHousingType.selectedIndex].value);
  });

  var renderPins = function (housingType) {
    window.cards.deletePopupAvatar();
    var cards = filterCards(housingType);
    window.map.similarContainerElement.appendChild(window.cards.getFragment(cards));
    window.cards.openPopupAvatar(cards);
  };

  var filterCards = function (housingType) {
    if (housingType === 'any') {
      return window.cards.objects;
    } else {
      return window.cards.objects.filter(function (object) {
        return object.offer.type === housingType;
      });
    }
  };
})();

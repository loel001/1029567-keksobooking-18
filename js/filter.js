'use strict';

(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var selectHousingType = window.cards.map.querySelector('#housing-type');
  var selectHousingPrice = window.cards.map.querySelector('#housing-price');
  var selectHousingRooms = window.cards.map.querySelector('#housing-rooms');
  var selectHousingGuests = window.cards.map.querySelector('#housing-guests');
  var purification = window.cards.map.querySelector('.map__filters');

  var getCriteries = function () {
    return {
      type: selectHousingType.value,
      price: selectHousingPrice.value,
      rooms: selectHousingRooms.value,
      guests: selectHousingGuests.value,
      features: getNewFeatures()
    };
  };

  purification.addEventListener('change', function () {
    renderPins(getCriteries());
  });

  var getNewFeatures = function () {
    var newFeaterus = [];
    var inputsFeatures = window.cards.map.querySelectorAll('.map__features input:checked');
    inputsFeatures.forEach(function (elem) {
      newFeaterus.push(elem.value);
    });
    return newFeaterus;
  };

  var renderPins = window.debounce(function (criteries) {
    window.cards.deletePopupAvatar();
    var cards = filterCards(criteries);
    window.map.similarContainer.appendChild(window.cards.getFragment(cards));
    window.cards.openPopupAvatar(cards);
  });

  var getLastCards = function (where, what) {
    for (var i = 0; i < what.length; i++) {
      if (where.indexOf(what[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var qualingPrice = function (element) {
    switch (selectHousingPrice.value) {
      case 'middle':
        return element.offer.price >= MIN_PRICE && element.offer.price <= MAX_PRICE;
      case 'low':
        return element.offer.price < MIN_PRICE;
      case 'high':
        return element.offer.price > MAX_PRICE;
      default:
        return true;
    }
  };

  var filterCards = function (criteries) {
    return window.cards.objects.filter(function (elem) {
      var isTypeEqual = criteries.type === 'any' ? true : elem.offer.type === criteries.type;
      var isPriceQual = qualingPrice(elem);
      var isRoomEqual = criteries.rooms === 'any' ? true : elem.offer.rooms === Number(criteries.rooms);
      var isGuestEqual = criteries.guests === 'any' ? true : elem.offer.guests === Number(criteries.guests);
      var isFeaturesEqual = criteries.features === [] ? true : getLastCards(elem.offer.features, criteries.features);
      return isTypeEqual && isPriceQual && isRoomEqual && isGuestEqual && isFeaturesEqual;
    });
  };

  window.filter = {
    purification: purification
  };
})();

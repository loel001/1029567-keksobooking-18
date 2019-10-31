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
      type: selectHousingType.options[selectHousingType.selectedIndex].value,
      price: selectHousingPrice.options[selectHousingPrice.selectedIndex].value,
      rooms: selectHousingRooms.options[selectHousingRooms.selectedIndex].value,
      guests: selectHousingGuests.options[selectHousingGuests.selectedIndex].value,
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
    window.map.containerElement.appendChild(window.cards.getFragment(cards));
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

  var filterCards = function (criteries) {
    var cardsRet = [];
    if (criteries.type === 'any') {
      cardsRet = window.cards.objects;
    } else {
      cardsRet = window.cards.objects.filter(function (object) {
        return object.offer.type === criteries.type;
      });
    }
    cardsRet = cardsRet.filter(function (object) {
      switch (criteries.price) {
        case 'middle':
          return object.offer.price >= MIN_PRICE && object.offer.price <= MAX_PRICE;
        case 'low':
          return object.offer.price < MIN_PRICE;
        case 'high':
          return object.offer.price > MAX_PRICE;
        default:
          return true;
      }
    });
    cardsRet = cardsRet.filter(function (object) {
      return criteries.rooms === 'any' ? true : object.offer.rooms === Number(criteries.rooms);
    });
    cardsRet = cardsRet.filter(function (object) {
      return criteries.guests === 'any' ? true : object.offer.guests === Number(criteries.guests);
    });
    cardsRet = cardsRet.filter(function (object) {
      return criteries.features === [] ? true : getLastCards(object.offer.features, criteries.features);
    });
    return cardsRet;
  };

  window.filter = {
    purification: purification
  };
})();

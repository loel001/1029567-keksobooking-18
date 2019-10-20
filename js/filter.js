'use strict';

(function () {
  var selestHousingType = document.querySelector('#housing-type');
  var selestHousingPrice = document.querySelector('#housing-price');
  var selestHousingRooms = document.querySelector('#housing-rooms');
  var selestHousingGuests = document.querySelector('#housing-guests');
  var fieldsetHousingFeatures = document.querySelector('.map__features');

  var getCriteries = function () {
    return {
      type: selestHousingType.options[selestHousingType.selectedIndex].value,
      price: selestHousingPrice.options[selestHousingPrice.selectedIndex].value,
      rooms: selestHousingRooms.options[selestHousingRooms.selectedIndex].value,
      guests: selestHousingGuests.options[selestHousingGuests.selectedIndex].value,
      features: getNewFeatures()
    };
  };

  selestHousingType.addEventListener('change', function () {
    renderPins(getCriteries());
  });

  selestHousingPrice.addEventListener('change', function () {
    renderPins(getCriteries());
  });

  selestHousingRooms.addEventListener('change', function () {
    renderPins(getCriteries());
  });

  selestHousingGuests.addEventListener('change', function () {
    renderPins(getCriteries());
  });

  fieldsetHousingFeatures.addEventListener('change', function () {
    renderPins(getCriteries());
  });

  var getNewFeatures = function () {
    var newFeaterus = [];
    var inputsFeatures = document.querySelectorAll('.map__features input:checked');
    inputsFeatures.forEach(function (elem) {
      newFeaterus.push(elem.value);
    });
    return newFeaterus;
  };

  var renderPins = window.debounce(function (criteries) {
    window.cards.deletePopupAvatar();
    var cards = filterCards(criteries);
    window.map.similarContainerElement.appendChild(window.cards.getFragment(cards));
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
          return object.offer.price >= 10000 && object.offer.price <= 50000;
        case 'low':
          return object.offer.price < 10000;
        case 'high':
          return object.offer.price > 50000;
        default:
          return true;
      }
    });
    cardsRet = cardsRet.filter(function (object) {
      if (criteries.rooms === 'any') {
        return true;
      } else {
        return object.offer.rooms === Number(criteries.rooms);
      }
    });
    cardsRet = cardsRet.filter(function (object) {
      if (criteries.guests === 'any') {
        return true;
      } else {
        return object.offer.guests === Number(criteries.guests);
      }
    });
    cardsRet = cardsRet.filter(function (object) {
      if (criteries.features === []) {
        return true;
      } else {
        return getLastCards(object.offer.features, criteries.features);
      }
    });
    return cardsRet;
  };
})();

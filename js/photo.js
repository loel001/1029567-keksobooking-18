'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = document.querySelector('.ad-form__photo');

  var getPhoto = function () {
    var fragment = document.createDocumentFragment();
    var img = document.createElement('img');
    img.src = '';
    img.width = 70;
    img.height = 70;
    img.alt = 'Фотография жилья';
    fragment.appendChild(img);
    return fragment;
  };

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  fileChooserPhoto.addEventListener('change', function () {
    var file = fileChooserPhoto.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var photo = document.querySelector('.ad-form__photo img');
      if (photo) {
        photo.remove();
      }
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewPhoto.appendChild(getPhoto());
        var photoHousing = document.querySelector('.ad-form__photo img');
        photoHousing.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  window.photo = {
    previewAvatar: previewAvatar
  };
})();

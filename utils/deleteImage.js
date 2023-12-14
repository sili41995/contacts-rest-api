const cloudinary = require('./cloudinary');

const { defaultAvatarsURL } = require('../constants');

const deleteImage = async (imageURL) => {
  if (imageURL === defaultAvatarsURL.contact) {
    return;
  }

  const imagePath = imageURL.split('/');
  const [imageName] = imagePath[imagePath.length - 1].split('.');
  const imageDir = imagePath[imagePath.length - 2];

  await cloudinary.api.delete_resources([`${imageDir}/${imageName}`], {
    type: 'upload',
    resource_type: 'image',
  });
};

module.exports = deleteImage;

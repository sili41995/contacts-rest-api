const fs = require('fs/promises');
const cloudinary = require('./cloudinary');

const uploadImage = async ({ path }) => {
  const result = await cloudinary.uploader.upload(path, {
    // public_id: '',
    folder: 'avatars',
    width: 200,
    height: 200,
    gravity: 'face',
    crop: 'thumb',
  });

  await fs.unlink(path);

  return result;
};

module.exports = uploadImage;

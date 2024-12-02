const axios = require('axios');

const postToInstagram = async (imageUrl, caption) => {
  const response = await axios.post(
    `https://graph.facebook.com/v12.0/instagram_account_id/media`,
    {
      image_url: imageUrl,
      caption: caption,
      access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
    }
  );
  return response.data;
};

module.exports = { postToInstagram };

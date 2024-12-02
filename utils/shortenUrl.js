const axios = require('axios');

const shortenUrl = async (url) => {
  const response = await axios.post(
    `https://api-ssl.bitly.com/v4/shorten`,
    { long_url: url },
    { headers: { Authorization: `Bearer ${process.env.BITLY_API_KEY}` } }
  );
  return response.data.link;
};

module.exports = { shortenUrl };

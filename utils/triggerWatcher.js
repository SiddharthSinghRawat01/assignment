const axios = require('axios');

const checkNewArticle = async (rssFeedUrl) => {
  const response = await axios.get(rssFeedUrl);
  const articles = parseRSS(response.data); // Implement RSS Parsing
  return articles[0]; // Return the latest article
};

module.exports = { checkNewArticle };

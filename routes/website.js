const express = require('express');
const { checkNewArticle } = require('../utils/triggerWatcher');
const { generateCaption } = require('../services/chatGPTService');
const { generateImage } = require('../services/imageService');
const { shortenUrl } = require('../utils/shortenUrl');

const router = express.Router();

router.post('/publish', async (req, res) => {
  try {
    const article = await checkNewArticle("https://rss.cnn.com/rss/cnn_latest.rss");
    const shortUrl = await shortenUrl(article.url);
    const caption = await generateCaption(article.title, article.description, shortUrl);
    const imageUrl = await generateImage(article.title);

    // Publish to WordPress (use WP REST API or plugin)
    const wordpressResponse = await publishToWordpress(article.title, caption, imageUrl);
    res.status(200).send(wordpressResponse);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;

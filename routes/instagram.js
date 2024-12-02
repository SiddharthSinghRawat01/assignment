const express = require('express');
const { checkNewArticle } = require('../utils/triggerWatcher');
const { generateCaption } = require('../services/chatGPTService');
const { generateImage } = require('../services/imageService');
const { postToInstagram } = require('../services/instagramService');
const { shortenUrl } = require('../utils/shortenUrl');

const router = express.Router();

router.post('/share', async (req, res) => {
  try {
    const article = await checkNewArticle("https://rss.cnn.com/rss/cnn_latest.rss");
    const shortUrl = await shortenUrl(article.url);
    const caption = await generateCaption(article.title, article.description, shortUrl);
    const imageUrl = await generateImage(article.title);

    const instagramResponse = await postToInstagram(imageUrl, caption);
    res.status(200).send(instagramResponse);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;

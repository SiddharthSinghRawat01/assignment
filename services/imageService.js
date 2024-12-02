const axios = require("axios");

const generateImage = async (prompt) => {
  const response = await axios.post(
    "https://api.openai.com/v1/images/generations",
    { prompt: prompt, size: "1024x1024" },
    { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
  );
  return response.data.data[0].url;
};

module.exports = { generateImage };

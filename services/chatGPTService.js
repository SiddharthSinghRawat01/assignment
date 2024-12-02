const { OpenAIApi, Configuration } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateCaption = async (articleTitle, articleDescription, url) => {
  try {
    const prompt = `Write a 2-3 sentence Instagram caption about this article:\nTitle: ${articleTitle}\nDescription: ${articleDescription}\nURL: ${url}`;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating caption:", error.message);
    throw error;
  }
};

module.exports = { generateCaption };

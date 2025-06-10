const { TranslationServiceClient } = require('@google-cloud/translate').v3;

// Initialize Google Cloud Translation client
const translationClient = new TranslationServiceClient();

const translateText = async (text, targetLanguage) => {
  const request = {
    parent: `projects/${process.env.GOOGLE_PROJECT_ID}/locations/global`,
    contents: [text],
    mimeType: 'text/plain',
    sourceLanguageCode: 'en', // or 'auto' for automatic detection
    targetLanguageCode: targetLanguage,
  };

  try {
    const [response] = await translationClient.translateText(request);
    return response.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};

module.exports = { translateText };
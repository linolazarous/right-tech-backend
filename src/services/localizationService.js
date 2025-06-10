const { TranslationServiceClient } = require('@google-cloud/translate').v3;

// Initialize Google Cloud Translation client
const translationClient = new TranslationServiceClient();

const translateContent = async (text, targetLanguage) => {
  const request = {
    parent: `projects/${process.env.GOOGLE_PROJECT_ID}/locations/global`,
    contents: [text],
    mimeType: 'text/plain',
    sourceLanguageCode: 'auto', // Automatic language detection
    targetLanguageCode: targetLanguage,
  };

  try {
    const [response] = await translationClient.translateText(request);
    return response.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Translation failed');
  }
};

module.exports = { translateContent };
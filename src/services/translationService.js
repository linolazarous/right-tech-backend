const { TranslationServiceClient } = require('@google-cloud/translate').v3;

const translationClient = new TranslationServiceClient();

exports.translateText = async (text, targetLanguage) => {
    const request = {
        parent: `projects/your-project-id/locations/global`,
        contents: [text],
        mimeType: 'text/plain',
        sourceLanguageCode: 'en',
        targetLanguageCode: targetLanguage,
    };
    
    const [response] = await translationClient.translateText(request);
    return response.translations[0].translatedText;
};
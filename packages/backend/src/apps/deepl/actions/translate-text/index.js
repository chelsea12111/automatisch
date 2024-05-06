import qs from 'qs';
import defineAction from '../../../../helpers/define-action.js';

const makeRequest = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  if (typeof data !== 'object') {
    throw new Error('Invalid response format');
  }

  return data;
};

export default defineAction({
  name: 'Translate text',
  key: 'translateText',
  description: 'Translates text from one language to another.',
  arguments: [
    {
      label: 'Text',
      key: 'text',
      type: 'string',
      required: true,
      description: 'Text to be translated.',
      variables: true,
      validate: text => text.trim().length > 0 || 'Text cannot be empty.'
    },
    {
      label: 'Target Language',
      key: 'targetLanguage',
      type: 'dropdown',
      required: true,
      description: 'Language to translate the text to.',
      variables: true,
      value: '',
      options: [
        // ... (same as before)
      ],
      validate: targetLanguage =>
        targetLanguage !== '' || 'Please select a target language.'
    }
  ],

  async run($) {
    const stringifiedBody = qs.stringify({
      text: $.step.parameters.text,
      target_lang: $.step.parameters.targetLanguage
    });

    try {
      const responseData = await makeRequest('/v2/translate', stringifiedBody);
      $.setActionItem({
        raw: responseData
      });
    } catch (error) {
      $.log(error);
      throw new Error('Failed to translate the text.');
    }
  }
});

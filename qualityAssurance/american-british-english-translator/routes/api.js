/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  //just for debugging
  // app.use((req, _res, next) => {
  //   console.log(req.body);
  //   next();
  // });

  app.route('/api/translate')
    .post((req, res) => {
      const body = req.body;
      let isNotValid = bodyValidation(body);
      if (isNotValid) {
        return res.json(isNotValid);
      };

      let result = {};
      let translation;
      let highlight;

      switch (body.locale) {
        case 'american-to-british':
          translation = translator.americanToBritish(body.text);
          result.text = body.text;

          highlight = translator.highlightTranslation(result.text, translation);

          result.translation = translation !== result.text ? highlight : "Everything looks good to me!";
          break;
        case 'british-to-american':
          translation = translator.britishToAmerican(body.text);
          result.text = body.text;

          highlight = translator.highlightTranslation(result.text, translation);

          result.translation = translation !== result.text ? highlight : "Everything looks good to me!";
          break;
        default:
          result.error = 'Invalid value for locale field';
      };
      res.json(result);
    });

  function bodyValidation(body) {
    if (body.text === undefined || !body.locale) {
      return { error: 'Required field(s) missing' };
    } else if (!body.text) {
      return { error: 'No text to translate' };
    };
  };

};

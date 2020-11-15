const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    //American ---> British
    toBritishSpelling(text) {
        let arr = text.split(/[\s\.]/);
        arr.forEach(word => {
            text = text.replace(word, americanToBritishSpelling[word] || word);
        });
        return text;
    };

    toBritishTitles(text) {
        let arr = text.split(/\s/);
        arr.forEach(word => {
            let translation = americanToBritishTitles[word.toLowerCase()];
            let titleCapitalize = word; //default value

            if (translation) {
                titleCapitalize = translation[0].toUpperCase() + translation.slice(1);

                let regex = new RegExp(word, 'gi');
                text = text.replace(regex, titleCapitalize);
            };
        });
        return text;
    };

    toBritishOnly(text) {
        for (let key in americanOnly) {
            let regex = new RegExp('\\b' + key + '\\b', 'gi');
            text = text.replace(regex, americanOnly[key]);
        };
        return text;
    };

    toBritishTime(text) {
        return text.replace(/(\d{2}):(\d{2})/g, '$1.$2');
    };

    americanToBritish(text) {
        let result;
        result = this.toBritishSpelling(text);
        result = this.toBritishTitles(result);
        result = this.toBritishOnly(result);
        result = this.toBritishTime(result);
        return result;
    };

    //British ---> American
    toAmericanSpelling(text) {
        return this.translateToAmerican(text, americanToBritishSpelling);
    };

    toAmericanTitles(text) {
        for (let key in americanToBritishTitles) {
            let regex = new RegExp('\\b' + americanToBritishTitles[key] + '\\b', 'i');

            let titleCapitalize = key[0].toUpperCase() + key.slice(1);
            text = text.replace(regex, titleCapitalize);
        };
        return text;
    };

    toAmericanOnly(text) {
        for (let key in britishOnly) {
            let regex = new RegExp('\\b' + key + '\\b', 'gi');
            text = text.replace(regex, britishOnly[key]);
        };
        return text;
    };

    toAmericanTime(text) {
        return text.replace(/(\d{1,2})\.(\d{2})/g, '$1:$2');
    };

    britishToAmerican(text) {
        let result;
        result = this.toAmericanSpelling(text);
        result = this.toAmericanTitles(result);
        result = this.toAmericanOnly(result);
        result = this.toAmericanTime(result);
        return result;
    };

    translateToAmerican(text, obj) {
        for (let key in obj) {
            let regex = new RegExp('\\b' + obj[key] + '\\b', 'gi');
            text = text.replace(regex, key);
        }
        return text;
    };

    highlightTranslation(original, translation) {
        let translationSplited = translation.split(/\s|(?=\.$)/);
        let titles = Object.values(americanToBritishTitles);

        translationSplited.forEach(word => {
            let regex = new RegExp('\\b' + word + '\\b', 'g');
            let isInclude = !original.match(regex) || titles.includes(word.toLowerCase()) || /\d{1,2}[\.:]\d{2}/.test(word);

            if (isInclude) {
                translation = translation.replace(word, `<span class="highlight">${word}</span>`);
            };
        });
        return translation;
    };
}

module.exports = Translator;
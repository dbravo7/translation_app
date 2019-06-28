"use strict";

function handleSubmitText() {
  $('#js-submit').click(event => {
    event.preventDefault();
    const text = $('#js-input-text').val();
    const target_code = $('#js-target-languages').val();

    if (text) {
      // Gets translated texts from respective APIs and displays them
      setTimeout(function() {
        getGoogleTranslate(text, target_code);
        getYandexTranslate(text, target_code);}, 500);
    }
  });
}

function getSourceCode() {
  $('#js-input-text').on('input', event => {
    let text = $('#js-input-text').val();
    if (text) {
      const key = config.Y_KEY; 
      const url = `https://translate.yandex.net/api/v1.5/tr.json/detect?key=${key}&text=${text}`;
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then(responseJson => displaySourceLang(responseJson.lang))
        .catch(error => {
          alert(`Something went wrong: ${error.message}`);
      });
    } 
  });
}

function getGoogleTranslate(text, lang='en') {
  const api_key = config.G_KEY; 
  const params = {
    key: api_key,
    q: text,
    target: lang
  };
  const query_string = formatQueryParams(params); 
  const url = `https://translation.googleapis.com/language/translate/v2?${query_string}&format=text`; 

  fetch(url) 
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => 
      displayGoogleTranslate(responseJson.data.translations[0].translatedText, lang))
    .catch(error => {
      $('#js-google-translate').text(`Error loading this translation`);
  });
}

function getYandexTranslate(text, lang='en') {
  const api_key = config.Y_KEY;
  const params = {
    key: api_key,
    text: text,
    lang: lang
  };
  const query_string = formatQueryParams(params);
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?${query_string}`;

  
  fetch(url) 
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayYandexTranslate(responseJson.text[0], lang))
    .catch(error => {
      $('#js-yandex-translate').text(`Error loading this translation: ${error.message}`);
  });
}

function formatQueryParams(params) {
  const query_items = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${params[key]}`);
    return query_items.join('&'); 
}

function displayYandexTranslate(yandex, lang) {
  let source_lang = $('#js-auto-detect').text();
  if (lang === 'en' && dictLanguages(source_lang)) {
    $('#js-yandex-translate').html(`${linkedTranslation(yandex, source_lang.toLowerCase())}`);
  } else {
    $('#js-yandex-translate').text(`${yandex}`);  
  }
}

function displayGoogleTranslate(google, lang) {
  let source_lang = $('#js-auto-detect').text();
  if (lang === 'en' && dictLanguages(source_lang)) {
    definitionsAvailable();
    $('#js-google-translate').html(`${linkedTranslation(google, source_lang.toLowerCase())}`);
  } else {  
    definitionsNotAvailable();
    $('#js-google-translate').text(`${google}`);
  }
}

function linkedTranslation(text, lang) {
  let text_arr = text.split(" ");
  let new_arr = [];
  text_arr.forEach(function(word) {
    new_arr.push(`<a href="https://www.linguee.com/english-${lang}/search?source=auto&query=${word}" 
    class="linked_word" target="_blank" value="${lang}">${word}</a>`);
  });
  return new_arr.join(" ");
}

function definitionsAvailable() {
  $('.definitions').text('Definitions are available. Click on a word to see its definition in a separate tab');
}

function definitionsNotAvailable() {
  $('.definitions').text('Definitions are not available for this language pair');
}

$(handleSubmitText); 
$(getSourceCode);

function dictLanguages(lang) {
  const languages = [
  "English",
  "German",
  "French",
  "Spanish",
  "Chinese",
  "Russian",
  "Japanese",
  "Portuguese",
  "Italian",
  "Dutch",
  "Polish",
  "Swedish",
  "Danish",
  "Finnish",
  "Greek",
  "Czech",
  "Romanian",
  "Hungarian",
  "Slovak",
  "Bulgarian",
  "Slovene",
  "Lithuanian",
  "Latvian",
  "Estonian",
  "Maltese"
];
  return languages.includes(lang); 
}

function displaySourceLang(source) {
  const languages = {
    az: "Azerbaijan",
    sq: "Albanian",
    am: "Amharic",
    en: "English",
    ar: "Arabic",
    hy: "Armenian",
    af: "Afrikaans",
    eu: "Basque",
    ba: "Bashkir",
    be: "Belarusian",
    bn: "Bengali",
    my: "Burmese",
    bg: "Bulgarian",
    bs: "Bosnian",
    cy: "Welsh",
    hu: "Hungarian",
    vi: "Vietnamese",
    ht: "Haitian (Creole)",
    gl: "Galician",
    nl: "Dutch",
    mrj: "Hill Mari",
    el: "Greek",
    ka: "Georgian",
    gu: "Gujarati",
    da: "Danish",
    he: "Hebrew",
    yi: "Yiddish",
    id: "Indonesian",
    ga: "Irish",
    it: "Italian",
    is: "Icelandic",
    es: "Spanish",
    kk: "Kazakh",
    kn: "Kannada",
    ca: "Catalan",
    ky: "Kyrgyz",
    zh: "Chinese",
    ko: "Korean",
    xh: "Xhosa",
    km: "Khmer",
    lo: "Laotian",
    la: "Latin",
    lv: "Latvian",
    lt: "Lithuanian",
    lb: "Luxembourgish",
    mg: "Malagasy",
    ms: "Malay",
    ml: "Malayalam",
    mt: "Maltese",
    mk: "Macedonian",
    mi: "Maori",
    mr: "Marathi",
    mhr: "Mari",
    mn: "Mongolian",
    de: "German",
    ne: "Nepali",
    no: "Norwegian",
    pa: "Punjabi",
    pap: "Papiamento",
    fa: "Persian",
    pl: "Polish",
    pt: "Portuguese",
    ro: "Romanian",
    ru: "Russian",
    ceb: "Cebuano",
    sr: "Serbian",
    si: "Sinhala",
    sk: "Slovakian",
    sl: "Slovenian",
    sw: "Swahili",
    su: "Sundanese",
    tg: "Tajik",
    th: "Thai",
    tl: "Tagalog",
    ta: "Tamil",
    tt: "Tatar",
    te: "Telugu",
    tr: "Turkish",
    udm: "Udmurt",
    uz: "Uzbek",
    uk: "Ukrainian",
    ur: "Urdu",
    fi: "Finnish",
    fr: "French",
    hi: "Hindi",
    hr: "Croatian",
    cs: "Czech",
    sv: "Swedish",
    gd: "Scottish",
    et: "Estonian",
    eo: "Esperanto",
    jv: "Javanese",
    ja: "Japanese"
  };

  $('#js-auto-detect').text(languages[source]);
}
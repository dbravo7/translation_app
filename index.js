"use strict";

function handleSubmitText() {
  $('#js-submit').click(event => {
    event.preventDefault();
    const text = $('#js-input-text').val();
    const target_code = $('#js-target-languages').val();
  
    // Gets language 2-3 letter code and displays it as 'auto detect'
    getSourceCode(text); 
    
    // Gets translated texts from respective APIs and displays them
    getGoogleTranslate(text);
    getYandexTranslate(text, target_code);
    
  });
}

function getSourceCode(text) {
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
    .then(responseJson => displayGoogleTranslate(responseJson.data.translations[0].translatedText))
    .catch(error => {
      $('#js-google-translate').text(`Error loading this translations`);
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
    .then(responseJson => displayYandexTranslate(responseJson.text[0]))
    .catch(error => {
      $('#js-yandex-translate').text(`Error loading this translation: ${error.message}`);
  });
}

function formatQueryParams(params) {
  const query_items = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${params[key]}`);
    return query_items.join('&'); 
}

function displayYandexTranslate(text) {
  $('#js-yandex-translate').text(`${text}`); 
}

function displayGoogleTranslate(google, yandex) {
  $('#js-google-translate').text(`${google}`);
}

function populateDisplayInput(text) {
  $('#js-display-input').text(`${text}`); 
}

function clearTranslations() {
  $('#js-clear-translations').click(() => {
    $('#js-google-translate').empty();
    $('#js-yandex-translate').empty(); 
  });
}


$(handleSubmitText); 
$(clearTranslations)

// retrieve translations
  // automatically detect source language 
  // user can choose target language 
  // convert to an array of words
  // compare arrays
// display results

// translate from English and to English 

// https://translate.yandex.net/api/v1.5/tr.json/translate?
// key=&text=我是你的朋友 &lang=en OR &lang=zh-en

// https://translate.yandex.net/api/v1.5/tr.json/detect?key=&text=我


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
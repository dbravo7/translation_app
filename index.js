"use strict";

function handleSubmitText() {
  $('#js-submit').on('click', event => {
    event.preventDefault();
    const text = $('#js-input-text').val();
    const target_lang = $('#target-languages').val();
    
    const source_code = getCode(text); 
    
    let google_translation = getGoogleTranslate(text);
    let yandex_translation = getYandexTranslate(text);
    populateDisplayInput(text); 
    displayBothTranslations(google_translation, yandex_translation);
    
  });
}

function getCode(text) {
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

function getGoogleTranslate(text) {

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

  
  return fetch(url) 
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {return responseJson.text[0];})
    .catch(error => {
      alert(`Something went wrong: ${error.message}`);
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

function populateDisplayInput(text) {
  $()
}
function displayBothTranslations(google, yandex) {
  $('#js-google-translate').text(`${google}`);
  $('#js-yandex-translate').text(`${yandex}`);
}

$(handleSubmitText); 

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
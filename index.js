"use strict";

function handleSubmitText() {
  $('#js-submit').on('click', event => {
    event.preventDefault();
    const text = $('#js-input-text').val();
    const target_lang = $('#target-languages').val();
    // source_lang is an array with language code at index 0 and language name at index 1 
    const source_code = getCode(text); 
    displaySourceLang(source_code); 
    
    let google_translation = getGoogleTranslate(text);
    let yandex_translation = getYandexTranslate(text);
  });
}

function getCode(text) {
  const key = config.Y_KEY; 
  const url = `https://translate.yandex.net/api/v1.5/tr.json/detect?key=${key}&text=${text}`;

  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {return responseJson.lang})
    .catch(error => {
      alert(`Something went wrong: ${error.message}`);
    });
  // https://translate.yandex.net/api/v1.5/tr.json/detect?
  // key=&text=我
}

function getGoogleTranslate(text) {

}

function getYandexTranslate(text, lang='en') {
  const api_key = config.Y_KEY;
  const params = {
    key: api_key,
    text: text,
    lang: lang
  }
  const query_string = formatQueryParams(params);
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate? + ${query_String}`;
}

function formatQueryParams(params) {
  const query_items = Object.keys(params)
    .map(key => `encodeURIComponent`)
}

function displaySourceLang(source) {
  const key = config.Y_KEY;
  const url = `https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=${key}`
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
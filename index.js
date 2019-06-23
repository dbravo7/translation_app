"use strict";

function handleSubmitText() {
  $('#js-submit').on('click', event => {
    event.preventDefault();
    const text = $('#js-input-text').val();
    const target_lang = $('#target-languages').val();
    // source_lang is an array with language code at index 0 and language name at index 1 
    const source_code = autoDetectCode(text); 
    displaySourceLang(source_code); 
    
    let google_translation = getGoogleTranslate(text);
    let yandex_translation = getYandexTranslate(text);
  });
}

function autoDetectLang(text) {
  const key = "trnsl.1.1.20190623T171226Z.fdebf1cca158169c.94adac83b45772c4a37ee06f3336196eb133db72";
  const url = `https://translate.yandex.net/api/v1.5/tr.json/detect?key=${key}&text=${text}`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(responseJson.lang))
    .catch(error => {
      alert(`Something went wrong: ${error.message}`);
    });
  // https://translate.yandex.net/api/v1.5/tr.json/detect?
  // key=trnsl.1.1.20190623T171226Z.fdebf1cca158169c.94adac83b45772c4a37ee06f3336196eb133db72&text=我
}

function getGoogleTranslate(text) {

}

function getYandexTranslate(text) {
  const key = "trnsl.1.1.20190623T171226Z.fdebf1cca158169c.94adac83b45772c4a37ee06f3336196eb133db72";
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?`;
}

$(handleSubmitText); 

// retrieve translations
  // automatically detect source language 
  // user can choose target language 
  // convert to an array of words
  // compare arrays
// display results

// translate from English and to English 

// google api key: AIzaSyBJU3j3ZIuBMBIYyJls_NkFgeAF0r3Eo6Es
// yandex key: trnsl.1.1.20190623T171226Z.fdebf1cca158169c.94adac83b45772c4a37ee06f3336196eb133db72

// https://translate.yandex.net/api/v1.5/tr.json/translate?
// key=trnsl.1.1.20190623T171226Z.fdebf1cca158169c.94adac83b45772c4a37ee06f3336196eb133db72&text=我是你的朋友 &lang=en

// https://translate.yandex.net/api/v1.5/tr.json/detect?key=trnsl.1.1.20190623T171226Z.fdebf1cca158169c.94adac83b45772c4a37ee06f3336196eb133db72&text=我
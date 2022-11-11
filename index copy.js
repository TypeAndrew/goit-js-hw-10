import './css/styles.css';
import Notiflix from 'notiflix';
let debounce = require('lodash.debounce'); 

const DEBOUNCE_DELAY = 300;

const fetchCountryInp = document.querySelector("input");
const countiesList = document.querySelector(".country-list");

fetchCountryInp.addEventListener("input", debounce(() => {
  fetchCountries()
    .then((countries) => renderUserList(countries))
    .catch((error) => showError(error));//console.log(error));
  //console.log("weqweqqwqwe");
}, 300)
);

function showError(error) {
  Notiflix.Notify.failure("Oops, there is no country with that name.");
}

function fetchCountries() {
  let keysForSearch = fetchCountryInp.value.trim()
  if ( keysForSearch=== "") {
    countiesList.innerHTML = "";
  
  }

  return fetch(`https://restcountries.com/v3.1/name/${fetchCountryInp.value.trim()}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function renderUserList(countries) {
    
  if (countries.length >= 10) {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    countiesList.innerHTML = "";
  } else if (countries.length === 0){
    Notiflix.Notify.error("Oops, there is no country with that name.");
    countiesList.innerHTML = "";
   
  } else  {
    const markup = countries
        .map((country) => {
        let leng ="";
        for (let i in country.languages) {
            if (country.languages.hasOwnProperty(i)) {
                leng += country.languages[i]+ "\n";
            }
        };
          if (countries.length === 1) {
          
            return `<li>
              <img class="gallery__image" src="${country.flags.png}" width= 30px height= 20px alt="" /><a>${country.name.official}</a>
              <p><b>столиця</b>: ${country.capital}</p>
              <p><b>населення</b>: ${country.population}</p>
              <p><a href="${country.flags.svg}">посилання на зображення прапора</a></p>
              <p><b>мови</b>: ${leng}</p>

            </li>`;
          } else {
            return `<li>
              <img class="gallery__image" src="${country.flags.png}" width= 30px height= 20px alt="" /><a>${country.name.official}</a>
              </li>`;
          }
    })
    .join("");
    countiesList.innerHTML = markup;
  }
}

let country = 'po'
 function test(){
     fetch(`https://restcountries.com/v3.1/name/${country}`).then(response => response.json()).then(data => console.log(data))
 }
 test()
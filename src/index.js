import './css/styles.css';
let debounce = require('lodash.debounce'); 

const DEBOUNCE_DELAY = 300;

const fetchCountryInp = document.querySelector("input");
const countiesList = document.querySelector(".country-list");

fetchCountryInp.addEventListener("input", debounce(() => {
  fetchCountries()
    .then((countries) => renderUserList(countries))
    .catch((error) => console.log(error));
  console.log("weqweqqwqwe");
}, 500)
);

function fetchCountries() {
  
  return fetch(`https://restcountries.com/v3.1/name/${fetchCountryInp.value}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function renderUserList(countries) {
    
    
    const markup = countries
        .map((country) => {
        let leng ="";
        for (let i in country.languages) {
            if (country.languages.hasOwnProperty(i)) {
                leng += country.languages[i]+ "\n";
            }
        };
        return `<li>
            <img class="gallery__image" src="${country.flags.png}" width= 30px height= 20px alt="" /><a>${country.name.official}</a>
            <p><b>столиця</b>: ${country.capital}</p>
            <p><b>населення</b>: ${country.population }</p>
            <p><a href="${country.flags.svg}">посилання на зображення прапора</a></p>
            <a class="gallery__item" >
            <img class="gallery__image" src="${country.flags.svg}" alt="Image description" />
            </a>
            <p><b>мови</b>: ${leng}</p>

            </li>`;
    })
    .join("");
  countiesList.innerHTML = markup;
}

let country = 'po'
 function test(){
     fetch(`https://restcountries.com/v3.1/name/${country}`).then(response => response.json()).then(data => console.log(data))
 }
 test()
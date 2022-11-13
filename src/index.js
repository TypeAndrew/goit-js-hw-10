import './css/styles.css';
import Notiflix from 'notiflix';
let debounce = require('lodash.debounce'); 
import  * as FC from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

class Countries extends FC.default{

  constructor() {  
    super(FC.fetchCountryInp);
    //this.fetchCountryInp = document.querySelector("input");
    this.countiesList = document.querySelector(".country-list");
  }
  
  showError(error) {
    Notiflix.Notify.failure("Oops, there is no country with that name.");
  }

  fetchCountries() {
    super.fetchCountries();
  }


  renderUserList(countries) {
    
    if (countries.length >= 10) {
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
      this.countiesList.innerHTML = "";
    } else if (countries.length === 0){
      Notiflix.Notify.error("Oops, there is no country with that name.");
      this.countiesList.innerHTML = "";
    
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
                <p>столиця: ${country.capital}</p>
                <p>населення</b>: ${country.population}</p>
                <p><a href="${country.flags.svg}">посилання на зображення прапора</a></p>
                <p>мови: ${leng}</p>

              </li>`;
            } else {
              return `<li>
                <img class="gallery__image" src="${country.flags.png}" width= 30px height= 20px alt="" /><a>${country.name.official}</a>
                </li>`;
            }
      })
      .join("");
      this.countiesList.innerHTML = markup;
    }
  }

  init() {
    this.fetchCountryInp.addEventListener("input", debounce(() => {
      let inputValue = this.fetchCountryInp.value.trim();
      if (inputValue !== "") {
        super.fetchCountries(`https://restcountries.com/v3.1/name/${inputValue}`)
          .then((countries) => this.renderUserList(countries))
          .catch((error) => this.showError(error));//console.log(error));
      };
    }, DEBOUNCE_DELAY)
    );
  }

}

let countries = new Countries();
countries.init();


/*let country = 'po'
 function test(){
     fetch(`https://restcountries.com/v3.1/name/${country}`).then(response => response.json()).then(data => console.log(data))
 }
 test()*/
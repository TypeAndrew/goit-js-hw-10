import './css/styles.css';
import Notiflix from 'notiflix';
let debounce = require('lodash.debounce'); 

const DEBOUNCE_DELAY = 300;

class Countries {

  constructor() {  
    this.fetchCountryInp = document.querySelector("input");
    this.countiesList = document.querySelector(".country-list");
  }
  
  showError(error) {
    Notiflix.Notify.failure("Oops, there is no country with that name.");
  }

  fetchCountries() {
    let keysForSearch = this.fetchCountryInp.value.trim()
    if ( keysForSearch=== "") {
      this.countiesList.innerHTML = "";
    
    }

    return fetch(`https://restcountries.com/v3.1/name/${this.fetchCountryInp.value.trim()}`).then(
      (response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      }
    );
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
      this.fetchCountries()
        .then((countries) => this.renderUserList(countries))
        .catch((error) => this.showError(error));//console.log(error));
      
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
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const fetchCountryInp = document.querySelector("input");
const countiesList = document.querySelector(".country-list");

fetchCountryInp.addEventListener("input", () => {
    fetchUsers()
        .then((countries) => renderUserList(countries))
        .catch((error) => console.log(error));
    console.log("weqweqqwqwe");
}

);

function fetchUsers() {
  return fetch("https://restcountries.com/v3.1/all").then(
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
            <p><b>повна назва країни</b>: ${country.name.official}</p>
            <p><b>столиця</b>: ${country.capital}</p>
            <p><b>населення</b>: ${country.population }</p>
            <p><a href="${country.flags.svg}">посилання на зображення прапора</a></p>
            <p><b>мови</b>: ${leng}</p>

            </li>`;
    })
    .join("");
  countiesList.innerHTML = markup;
}
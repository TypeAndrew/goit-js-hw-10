 export default class FetchCountries {
  
   constructor() {
    this.fetchCountryInp = document.querySelector("input");
  }
   
  fetchCountries(name) {
    
     
     let keysForSearch = this.fetchCountryInp.value.trim()
    if ( keysForSearch === "") {
      this.countiesList.innerHTML = "";
    
    }

    return fetch(name).then(
      (response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      }
    );
  }
  
}

 let fetchCountries = new FetchCountries();
//et a = 0;
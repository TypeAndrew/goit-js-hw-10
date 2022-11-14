 export  class FetchCountries {
   static fetchCountryInp;
   constructor() {
     this.fetchCountryInp = document.querySelector("input");
     this.countiesList = document.querySelector(".country-list");
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

 //let fetchCountries = new FetchCountries();
//et a = 0;
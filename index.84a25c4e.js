const n=document.querySelector("input"),e=document.querySelector(".country-list");n.addEventListener("input",(()=>{fetch("https://restcountries.com/v3.1/all").then((n=>{if(!n.ok)throw new Error(n.status);return n.json()})).then((n=>function(n){const t=n.map((n=>{let e="";for(let t in n.languages)n.languages.hasOwnProperty(t)&&(e+=n.languages[t]+"\n");return`<li>\n            <p><b>повна назва країни</b>: ${n.name.official}</p>\n            <p><b>столиця</b>: ${n.capital}</p>\n            <p><b>населення</b>: ${n.population}</p>\n            <p><a href="${n.flags.svg}">посилання на зображення прапора</a></p>\n            <p><b>мови</b>: ${e}</p>\n\n            </li>`})).join("");e.innerHTML=t}(n))).catch((n=>console.log(n))),console.log("weqweqqwqwe")}));
//# sourceMappingURL=index.84a25c4e.js.map

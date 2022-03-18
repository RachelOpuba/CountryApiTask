"use strict";

//Selectiing Elements
const conuntryInfo = document.querySelector(".row");
const region = document.querySelector(".drop-down");
const regionList = document.querySelector(".region-list");
const regions = document.querySelectorAll(".regions");
const inputEl = document.querySelector(".input");
const cardsHolder = document.querySelector(".cards-wraper");
const modal = document.querySelector(".modal-wrap");
const modalContent = document.querySelector(".modal-sec");
console.log(modalContent);
const backBtn = document.querySelector(".back-btn");

let countriesData = [];

//Fetching data from api
const loadCountries = async () => {
  try {
    const res = await fetch("https://restcountries.com/v2/all");
    countriesData = await res.json();
    displayCountries(countriesData);
  } catch (err) {
    console.error(err);
  }
};

//Displaying Data on page
const displayCountries = (countries) => {
  const html = countries
    .map(function (elem) {
      return `<div class="card-holder col-lg-3 col-md-4 col-sm-12 my-5">
          <div class="card mx-auto "  style="width: 14rem" id="cards">
            <img
              src=${elem.flag}
              class="card-img-top"
              alt="flag"
            />
            <div class="card-body">
              <h5 class="card-title py-2 country-name stretched-link">${elem.name}</h5>
              <p class="card-text py-1 my-0">
                <span class="bold-text">Population:</span> ${elem.population}
              </p>
              <p class="card-text py-1 my-0">
                <span class="bold-text">Region:</span>  ${elem.region}
              </p>
              <p class="card-text">
                <span class="bold-text py-1">Capital:</span>  ${elem.capital}
              </p>
            </div>
          </div>
        </div>`;
    })
    .join("");

  conuntryInfo.innerHTML = html;

  const cards = document.querySelectorAll(".card");
  const countryName = document.querySelector(".country-name");

  cards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      cardsHolder.classList.add("hide");
      modal.classList.add("show");

      const searchedDetails = e.target.innerHTML.toLowerCase();
      const filteredDetails = countriesData.filter(function (details) {
        return details.name.toLowerCase().includes(searchedDetails);
      });
      console.log(filteredDetails);
      let singleCountryDetails = filteredDetails
        .map(function (country) {
          console.log(country);
          return `<div class="modal-wraper d-flex justify-content-between">
          <div class="modal-flag">
            <img src=${country.flag} alt="" />
          </div>
          <div
            class="country-info d-flex flex-column justify-content-between ps-5 py-4"
          >
            <p class="card-title">${country.name}</p>
            <div
              class="text-holder d-flex justify-content-between align-items-center"
            >
              <div class="left-text">
                <p class="card-text py-1 my-0">
                  <span class="bold-text">Native Name:</span> ${
                    country.nativeName
                  }
                </p>
                <p class="card-text py-1 my-0">
                  <span class="bold-text">Population:</span> ${
                    country.population
                  }
                </p>
                <p class="card-text py-1 my-0">
                  <span class="bold-text">Region:</span> ${country.region}
                </p>
                <p class="card-text py-1 my-0">
                  <span class="bold-text">Sub Region:</span> ${
                    country.subregion
                  }
                </p>
                <p class="card-text py-1 my-0">
                  <span class="bold-text">Capital:</span> ${country.capital}
                </p>
              </div>

              <div class="right-text">
                <p class="card-text py-1 my-0">
                  <span class="bold-text">Top Levle Domain:</span> ${
                    country.topLevelDomain
                  }
                </p>
                <p class="card-text py-1 my-0 ">
                  <span class="bold-text">Currencies:</span> ${country.currencies.map(
                    (currencies) => currencies.name
                  )}
                </p>
                <p class="card-text py-1 my-0">
                  <span class="bold-text">Languages:</span> ${country.languages.map(
                    (languages) => languages.name
                  )}
                  
                </p>
              </div>
            </div>

            <div class="borders">
              <p class="card-text py-1 my-0">
                <span class="bold-text">Border Countries:</span> ${
                  country.borders
                }
              </p>
            </div>
          </div>
        </div>
`;
        })
        .join("");
      modalContent.innerHTML = singleCountryDetails;
    });
  });
};

loadCountries();

//Filtering by country-name..........
inputEl.addEventListener("keyup", function (e) {
  const searchedCountry = e.target.value.toLowerCase();
  const filteredCountries = countriesData.filter(function (country) {
    return country.name.toLowerCase().includes(searchedCountry);
  });
  displayCountries(filteredCountries);
});

//Displaying Region dropdown
region.addEventListener("click", function () {
  regionList.classList.toggle("select");
});

//Filtering by region
regions.forEach(function (filter) {
  filter.addEventListener("click", function (e) {
    const searchedRegion = e.target.innerHTML.toLowerCase();
    const filteredRegion = countriesData.filter(function (country) {
      return country.region.toLowerCase().includes(searchedRegion);
    });
    displayCountries(filteredRegion);
  });
});

backBtn.addEventListener("click", function () {
  modal.classList.remove("show");
  cardsHolder.classList.remove("hide");
});

console.log(backBtn);

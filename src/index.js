import './styles.css';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import countriesTemplate from './templates/CountriesTemplate.hbs';
import fetchCountries from './fetchCountries.js';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../node_modules/pnotify/dist/es/PNotifyButtons.js';
import { debounce } from 'lodash';

const countriesList = document.querySelector('.countries-list');
const input = document.querySelector('#input');
const searchQuery = 'https://restcountries.eu/rest/v2/name/';

input.addEventListener('input', _.debounce(inputCountry, 500));
function inputCountry(event) {
  clearList();
  if (!event.target.value) {
    return;
  }
  fetchCountries(searchQuery + event.target.value, arrayOfSearch);
}

function arrayOfSearch(arrayCountries) {
  PNotify.closeAll();
  if (arrayCountries.length > 10) {
    PNotify.error({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  } else if (arrayCountries.length > 1 && arrayCountries.length <= 10) {
    countriesList.insertAdjacentHTML(
      'beforeend',
      arrayCountries.reduce((acc, country) => {
        return (acc += `<li>${country.name}</li>`);
      }, ''),
    );
  } else if (arrayCountries.length === 1) {
    countriesList.insertAdjacentHTML(
      'beforeend',
      countriesTemplate(arrayCountries[0]),
    );
  } else {
    PNotify.error({ text: 'Country not found. Please enter again!' });
  }
}

function clearList() {
  countriesList.innerHTML = '';
}

import searchService from './services/apiService';
import { refs } from './utils/refs';
import photoCardTemplate from './templates/photo-card.hbs';
const debounce = require('lodash.debounce');

function searchFormSubmitHandler(event) {
  event.preventDefault();
  const form = event.target;
  const inputValue = form.value;
  searchService.searchQuery = inputValue;
  searchService.fetchImages().then(data => {
     const resultArr = Array.from(data);
      console.log(data);
    const markup = buildPhotoCardMarkup(data);
    console.log(markup);
    insertPhotoCards(markup);
  });
}

function buildPhotoCardMarkup(items) {
  return photoCardTemplate(items);
}

function insertPhotoCards(items) {
  refs.imagesList.insertAdjacentHTML('beforeend', items);
}

refs.searchForm.addEventListener(
  'input',
  debounce(searchFormSubmitHandler, 500),
);

// -- GLOBAL --
const bookmarksBtnEl = document.querySelector(".bookmarks-btn");
const errorEl = document.querySelector(".error");
const errorTextEl = document.querySelector(".error__text");
const jobDetailsEl = document.querySelector(".job-details");
const jobDetailsContentEl = document.querySelector(".job-details__content");
const jobListBookmarksEl = document.querySelector(".job-list--bookmarks");
const jobListSearchEl = document.querySelector(".job-list--search");
const numberEl = document.querySelector(".count__number");
const paginationEl = document.querySelector(".pagination");
const paginationBtnNextEl = document.querySelector(".pagination__button--next");
const paginationBtnBackEl = document.querySelector(".pagination__button--back");
const paginationNumberNextEl = document.querySelector(
  ".pagination__number--next"
);
const paginationNumberBackEl = document.querySelector(
  ".pagination__number--back"
);
const searchFormEl = document.querySelector(".search");
const searchInputEl = document.querySelector(".search__input");
const sortingEl = document.querySelector(".sorting");
const sortingBtnRelevantEl = document.querySelector(
  ".sorting__button--relevant"
);
const sortingBtnRecentEl = document.querySelector(".sorting__button--recent");
const spinnerSearchEl = document.querySelector(".spinner--search");
const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");

// -- SEARCH COMPONENT --

const submitHandler = (event) => {
  // prevent default behavior
  event.preventDefault();

  // get search text
  const searchText = searchInputEl.value;

  // validation (RE)
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    errorTextEl.textContent = "Your search may not contain numbers";
    errorEl.classList.add("error--visible");
    setTimeout(() => {
      errorEl.classList.remove("error--visible");
    }, 3500);
    return;
  }
  // blur input - suprotno od fokusa
  searchInputEl.blur();

  // render spinner
  spinnerSearchEl.classList.add("spinner--visible");

  // fetch search results
  fetch("https://bytegrad.com/course-assets/js/2/api/jobs")
    .then((res) => res.json())
    .then((data) => {
      // remove spinner
      spinnerSearchEl.remove();
      console.log(data);

      // iterate

      // new HTML
      //   const jobsItemHTML = `
      //   <li></li>

      //   `;
    });
};

searchFormEl.addEventListener("submit", submitHandler);

fetch("https://bytegrad.com/course-assets/js/2/api/jobs")
  .then((res) => res.json())
  .then((data) => {
    console.log(data.jobItems);
    data.jobItems.forEach((jobItem) => {
      console.log(jobItem.id);
    });
  });

import {
  BASE_API_URL,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
} from "../common.js";

// default import
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";

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
    renderError("You search may not contain numbers");
    return;
  }
  // blur input - suprotno od fokusa
  searchInputEl.blur();

  // remove previous job items
  jobListSearchEl.innerHTML = "";

  // render spinner
  renderSpinner("search");

  // fetch search results
  fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    .then((res) => {
      if (!res.ok) {
        // 4xx - 5xx status code errors, problem with resource
        throw new Error(
          "Resource issue (e.g. resource doesn't exist) or server issue"
        );
      }
      // parse a JSON
      return res.json();
    })
    .then((data) => {
      const { jobItems } = data;
      // remove spinner
      renderSpinner("search");

      numberEl.textContent = jobItems.length;

      // render job items in search job list
      renderJobList(jobItems);
    })

    .catch((error) => {
      // remove spinner
      renderSpinner("search");
      //Network or Fetch problem, misspell a particular variable, trying to parse something not JSON as JSON
      renderError(error.message);
    });
};

searchFormEl.addEventListener("submit", submitHandler);

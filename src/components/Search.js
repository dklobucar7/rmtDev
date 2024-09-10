import {
  BASE_API_URL,
  state,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  getData,
} from "../common.js";

// default import
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";

// -- SEARCH COMPONENT --

const submitHandler = async (event) => {
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
  try {
    // get data
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    // extract job items
    const { jobItems } = data;

    // update state
    state.searchJobItems = jobItems;

    // remove spinner
    renderSpinner("search");

    // render number of results
    numberEl.textContent = jobItems.length;

    // render job items in search job list
    renderJobList(jobItems);
    
  } catch (error) {
    // remove spinner
    renderSpinner("search");

    //Network or Fetch problem, misspell a particular variable, trying to parse something not JSON as JSON
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);

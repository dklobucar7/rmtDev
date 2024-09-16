import {
  jobDetailsContentEl,
  BASE_API_URL,
  state,
  getData,
} from "../common.js";

import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";

// -- ROUTER --

const loadHashChangeHandler = async () => {
  // get id from URL
  const id = window.location.hash.substring(1);

  if (id) {
    // remove previous job details content
    jobDetailsContentEl.innerHTML = "";

    // add spinner
    renderSpinner("job-details");

    try {
      // fetch job item data
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);

      // extract job item
      const { jobItem } = data;

      // update state
      state.activeJobItem = jobItem;

      // remove spinner
      renderSpinner("job-details");

      // render job details
      renderJobDetails(jobItem);
    } catch (error) {
      // remove spinner
      renderSpinner("job-details");

      // Network or Fetch problem, misspell a particular variable, trying to parse something not JSON as JSON
      renderError(error.message);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHashChangeHandler);
window.addEventListener("hashchange", loadHashChangeHandler);

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
        // 400 - 599 status errors
        console.log("Something went wrong");
        return;
      }
      return res.json();
    })
    .then((data) => {
      const { jobItems } = data;
      // remove spinner
      renderSpinner("search");

      numberEl.textContent = jobItems.length;

      // render job items in search job list

      jobItems.slice(0, 7).forEach((jobItem) => {
        const newJobItemHTML = `
                      <li class="job-item">
                          <a class="job-item__link" href="${jobItem.id}">
                              <div class="job-item__badge">${jobItem.badgeLetters}</div>
                              <div class="job-item__middle">
                                  <h3 class="third-heading">${jobItem.title}</h3>
                                  <p class="job-item__company">${jobItem.company}</p>
                                  <div class="job-item__extras">
                                      <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                                      <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                                      <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                                  </div>
                              </div>
                              <div class="job-item__right">
                                  <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                                  <time class="job-item__time">${jobItem.daysAgo}d</time>
                              </div>
                          </a>
                      </li>
                  `;
        jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHTML);
      });
    })
    //Network or Fetch error
    .catch((error) => console.log(error));
};

searchFormEl.addEventListener("submit", submitHandler);

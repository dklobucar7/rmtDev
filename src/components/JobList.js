import {
  BASE_API_URL,
  state,
  jobListSearchEl,
  jobDetailsContentEl,
  getData,
} from "../common.js";

// default import
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";

// -- JOB LIST COMPONENT --

const renderJobList = () => {
  // remove previous job items
  jobListSearchEl.innerHTML = "";

  // display job items
  state.searchJobItems.slice(0, 7).forEach((jobItem) => {
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
};

const clickHanlder = async (event) => {
  // prevent default behavior - anchor tag nas odmah šalje na ID, a mi to ne želimo, nego želimo ostati na istoj stranici
  event.preventDefault();

  // get clicked job item element
  const jobItemEl = event.target.closest(".job-item");

  //OPTIONAL CHAINING
  document
    .querySelector(".job-item--active")
    ?.classList.remove("job-item--active");

  // add active class - da je fokusirano koji smo redak kliknuli
  jobItemEl.classList.add("job-item--active");

  // empty the job details section
  jobDetailsContentEl.innerHTML = "";

  // render spinner
  renderSpinner("job-details");

  // get the id
  const id = jobItemEl.children[0].getAttribute("href");

  // mogli smo i ovako doći do ID-a
  // const id = document.querySelector(".job-item__link").getAttribute("href");

  // fetch job item data
  try {
    const data = await getData(`${BASE_API_URL}/jobs/${id}`);

    // extract job item
    const { jobItem } = data;

    // remove spinner
    renderSpinner("job-details");

    // render job details
    renderJobDetails(jobItem);
  } catch (error) {
    // remove spinner
    renderSpinner("job-details");

    ////Network or Fetch problem, misspell a particular variable, trying to parse something not JSON as JSON
    renderError(error.message);
  }
};

// job-list--search klasa
jobListSearchEl.addEventListener("click", clickHanlder);

// export default
export default renderJobList;

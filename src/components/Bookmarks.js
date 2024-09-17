import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";

import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  // don't continue if click was outside bookmark button
  if (!event.target.className.includes("bookmark")) return;

  // update state
  state.bookmarkJobItems.push(state.activeJobItem);

  // update bookmark icon - inicijalno ne postoji pa ovako je dohvaćamo preko document
  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");
};

const mouseEnterHandler = () => {
  // make bookmarks button look acitve
  bookmarksBtnEl.classList.add("bookmarks-btn--active");

  // make job list visible
  jobListBookmarksEl.classList.add("job-list--visible");

  // render bookmarks job list
  renderJobList("bookmarks");
};

const mouseLeaveHandler = () => {
  // make bookmarks button look inacitve
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");

  // make job list invisible
  jobListBookmarksEl.classList.remove("job-list--visible");
};

jobDetailsEl.addEventListener("click", clickHandler);
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
jobListBookmarksEl.addEventListener("mouseleave", mouseLeaveHandler);

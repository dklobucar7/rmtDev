import { DEFAULT_DISPLAY_TIME, errorTextEl, errorEl } from "../common.js";

const renderError = (message = "An error occurred") => {
  errorTextEl.textContent = message;
  errorEl.classList.add("error--visible");
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, DEFAULT_DISPLAY_TIME);
};

// default export
export default renderError;

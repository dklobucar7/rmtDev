import {
  state,
  paginationEl,
  paginationBtnNextEl,
  paginationBtnBackEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
  numberEl,
} from "../common.js";

// -- PAGINATION COMPONENT --

import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  // get clicked button element
  const clickedButtonEl = event.target.closest(".pagination__button");

  // stop function if no clicked button element
  if (!clickedButtonEl) return;

  // check if we clicked button--back or button--nex
  const nextPage = clickedButtonEl.className.includes("--next") ? true : false;

  // update state (single source of truth)
  nextPage ? state.currentPage++ : state.currentPage--;

  // render job items for that page
  renderJobList();

  
};

paginationEl.addEventListener("click", clickHandler);

// const clickHandler = (event) => {

//   // check if we clicked button--back or button--nex
//   const buttonEl = clickedButtonEl.className.includes("--next") ? true : false;
//   console.log(buttonEl);

//   // check how many page we can have
//   let numberOfPossiblePages = numberEl.textContent / 7;
//   console.log(numberOfPossiblePages);

//   if (buttonEl) {
//     // -- NEXT BUTTON --

//     // unhide back button
//     paginationBtnBackEl.classList.remove("pagination__button--hidden");

//     // counter for NEXT button
//     let counterNextEl = paginationNumberNextEl.textContent;

//     if (counterNextEl <= numberOfPossiblePages) {
//       counterNextEl++;
//       paginationNumberNextEl.textContent = counterNextEl;

//       // counter for BACK button
//       let counterBackEl = paginationNumberBackEl.textContent;
//       if (counterNextEl > 3) {
//         counterBackEl++;
//         paginationNumberBackEl.textContent = counterBackEl;
//       }
//     }
//     if(counterNextEl ==)
//   } else {
//     // -- BACK BUTTON --
//     // counter for BACK button
//     let counterBackEl = paginationNumberBackEl.textContent;

//     if (counterBackEl > 1) {
//       counterBackEl--;
//       console.log(counterBackEl);
//       paginationNumberBackEl.textContent = counterBackEl;

//       // counter for NEXT button
//       let counterNextEl = paginationNumberNextEl.textContent;
//       counterNextEl--;
//       paginationNumberNextEl.textContent = counterNextEl;
//     } else {
//       // hide back button
//       paginationBtnBackEl.classList.add("pagination__button--hidden");
//     }
//   }
// };

// paginationEl.addEventListener("click", clickHandler);

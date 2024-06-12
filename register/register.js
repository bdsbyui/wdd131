/* wdd131/register/register.js - Script for Unit 4's Registration Form */

import * as html from './Templates.js';

/**ADD_PARTICPANT()
 * Add section to form for each participant.
 * @param {number} count - The n-th particpant for this section.
 * @returns {number} The n-th participant for the next section, if added.
 */
function addParticipant(count) {

  // Display multiple sections in two colums if the window is over 600 pixels.
  if (window.innerWidth > 600 && count > 1) {
    document.querySelector("fieldset").classList.add("columns");
  }

  // Create and insert new section
  const newSection = html.participantSection(count);
  document
    .querySelector("#flex-basis-container")
    .insertAdjacentHTML("beforebegin", newSection);

  // Update and return participant count for the next section.
  count++;
  return count;
}


/**GLOBAL VALUES
 */
const form = document.querySelector("form");
// Count for first participant
let participantCount = 1;


/**EVENT LISTENERS
 */
// Add participant section upon page load.
document.addEventListener("DOMContentLoaded", () => {
  participantCount = addParticipant(participantCount)
});

// Add participant section with click on #add button.
form.querySelector("#add").addEventListener("click", () => {
  participantCount = addParticipant(participantCount);
});

// Hide form and display summary upon form submission.
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Create summary object.
  const summary = {};
  summary.submitter = document.querySelector("#adult_name").value;
  summary.participants = participantCount - 1;
  summary.s = summary.participants > 1 ? "s" : "";
  summary.fees = Array.from(document.querySelectorAll("[id^=fee]"))  
    .map(element => parseFloat(element.value))
    .reduce((subtotal, fee) => subtotal + fee, 0.);

  // Hide form and display summary.
  form.style.display = "none";
  document
    .querySelector("#summary")
    .innerHTML = html.submissionSummary(summary);
})

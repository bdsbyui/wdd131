/* wdd131/register/Templates.js - Templates for Unit 4's Registration Form */

export const participantSection = function(count) {
  return `
    <section class="participant${count}">
      <p>Participant ${count}</p>
      <div class="item">
        <label for="fname">First Name</label>
        <input id="fname${count}" type="text" name="fname" value=""/>
      </div>
      <div class="item activities">
        <label for="activity">Activity #</label>
        <input id="activity${count}" type="text" name="activity"/>
      </div>
      <div class="item">
        <label for="fee">Fee ($)<span>*</span></label>
        <input id="fee${count}" type="number" name="fee" required/>
      </div>
      <div class="item">
        <label for="date">Desired Date</label>
        <input id="date${count}" type="date" name="date"/>
      </div>
      <div class="item">
        <p>Grade</p>
        <select>
          <option selected value="" disabled selected></option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </select>
      </div>
    </section>
  `;
}

export const submissionSummary = function(summary) {
  return `<p>
    Thank you ${summary.submitter} for registering. You have registered 
    ${summary.participants} participant${summary.s} and owe $${summary.fees} in 
    fees.
  </p>`;
}

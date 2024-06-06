// form-demo.js

function validateForm(event) {
  const theForm = event.target;
  const errors = [];
  let isValid = true;

  // add our validations here
  if (theForm.payment.value === "credit") {
    if (theForm.ccNumber.value !== "1234123412341234") {
      isValid = false;
      errors.push("Invalid Credit Card Number");
    }
  }
  if (theForm.fullname.value !== "Bob") {
    isValid = false;
    errors.push("Your name is not Bob");
  }

  if (!isValid) {
    event.preventDefault();
    showErrors(errors);
    return false;
  }
}

function togglePaymentDetails() {
  const theForm = document.querySelector("#checkoutForm");
  const ccContainer = document.querySelector("#cc-container");
  const ppContainer = document.querySelector("#pp-container");
  
  ccContainer.classList.add("hide");
  ppContainer.classList.add("hide");
  
  theForm.ccNumber.required = false;
  theForm.ppUsername.required = false;
  
  if (theForm.payment.value === "credit") {
    ccContainer.classList.remove("hide");
    ccContainer.required = true;
  }
  if (theForm.payment.value === "paypal") {
    ppContainer.classList.remove("hide");
    ppContainer.required = true;
  }
}

function showErrors(errors) {
  const errorEl = document.querySelector(".errors");
  const html = errors.map((error) => `<p>${error}</p>`);
  errorEl.innerHTML = html.join("");
}

document
  .querySelector("#payment")
  .addEventListener("change", togglePaymentDetails);

document
  .querySelector("#checkoutForm")
  .addEventListener("submit", validateForm);
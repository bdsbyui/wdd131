// modules.js

import aCourse from "./Course.js";

document.querySelector("#enrollStudent").addEventListener("click", () => {
  aCourse.changeEnrollment(
    document.querySelector("#sectionNumber").value,
    true
  )
})
  
document.querySelector("#dropStudent").addEventListener("click", () => {
  aCourse.changeEnrollment(
    document.querySelector("#sectionNumber").value,
    false
  )
})

aCourse.init();

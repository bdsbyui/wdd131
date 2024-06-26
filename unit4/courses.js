// courses.js

const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
  sections: [
    {
      sectionNum: 1,
      roomNum: 'STC 353',
      enrolled: 26,
      days: 'TTh',
      instructor: 'Bro T'
    },
    {
      sectionNum: 2,
      roomNum: 'STC 347',
      enrolled: 28,
      days: 'TTh',
      instructor: 'Sis A'
    }
  ],
  changeEnrollment: function (sectionNum, enroll=true) {
    const sectionsIndex = this.sections.findIndex(
      (section) => section.sectionNum == sectionNum
    )
    if (sectionsIndex != -1) {
      if (enroll) this.sections[sectionsIndex].enrolled++;
      else this.sections[sectionsIndex].enrolled--;
    }
    renderSections(this);
  }
};

function renderSections(course) {
  document.querySelector("#sections").innerHTML = course.sections.map(
    (section) => {
      return `
        <tr>
          <td>${section.sectionNum}</td>
          <td>${section.roomNum}</td>
          <td>${section.enrolled}</td>
          <td>${section.days}</td>
          <td>${section.instructor}</td>
        </tr>
      `;
    }
  ).join("");
}

function setCourse(course) {
  document.querySelector("#courseName").innerHTML = course.name;
  document.querySelector("#courseCode").innerHTML = course.code;
  renderSections(course);
}

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

setCourse(aCourse);

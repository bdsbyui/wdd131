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
  ]
};

function templateSection(section) {
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

function setSections(course) {
  document
    .querySelector("#sections")
    .innerHTML = course.sections.map(templateSection).join("");
  ;
}

function setCourse(course) {
  document.querySelector("#courseName").innerHTML = course.name;
  document.querySelector("#courseCode").innerHTML = course.code;
  setSections(course);
}

setCourse(aCourse);
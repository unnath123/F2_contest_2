const form1 = document.getElementById("form1");
const formbutton = document.getElementById("formbtn");
const tableContainer = document.getElementById("table");
const search = document.getElementById("search-box");
let mode = 0;
let eindex = -1;
let studentData = [];


function addStudent() {
  const data = new FormData(form1);
  let newstudent = {
    name: "dummy name",
    email: "dummy@email.com",
    gpa: "0",
    age: "..",
    degree: "BE",
  };
  data.forEach((x, y) => (newstudent[x] = y ? y : newstudent[x]));
  studentData = [...studentData, newstudent];
  form1.reset();
  display(studentData);
}


function handleStudentEdit(i) {
  eindex = i;
  mode = 1;
  formbutton.value = "Edit Student";
  form1.name.value = studentData[i].name;
  form1.email.value = studentData[i].email;
  form1.gpa.value = studentData[i].gpa;
  form1.age.value = studentData[i].age;
  form1.degree.value = studentData[i].degree;
}


function estudent() {
  const data = new FormData(form1);
  data.forEach((x, y) => (studentData[eindex][x] = y));
  display(studentData);
  eindex = -1;
  handleReset();
}


function handleStudentDelete(i) {
  studentData = studentData.filter((_, index) => index !== i);
  display(studentData);
}


function display(data) {
  document.getElementById("tbody").remove();
  const newTbody = document.createElement("tbody");
  if (data.length > 0)
    data.forEach((student, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td  colspan="1"role="row">${i + 1}</td>
                <td colspan="5">${student.name}</td>
                <td colspan="5">${student.email}</td>
                <td colspan="2">${student.age}</td>
                <td colspan="2">${student.gpa}</td>
                <td colspan="3"><div class="cell-block">
                ${student.degree}
                <div>
                <img src="Vector (1).png" height="16" onclick="handleStudentEdit(${i})"></img>
                <img src="trash-2 1.png" height="16" width="16" background-color="black" onclick="handleStudentDelete(${i})"></img>
                </div>
                </div></td>
                `;
      newTbody.appendChild(row);
    });
  else {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td colspan="1" role="row"> </td>
                <td colspan="5"> </td>
                <td colspan="5"> </td>
                <td colspan="2"> </td>
                <td colspan="2"> </td>
                <td colspan="3"> </td>
                `;
    newTbody.appendChild(row);
  }
  newTbody.id = "tbody";
  tableContainer.append(newTbody);
}


function handleSearch() {
  if (!search.value) display(studentData);
  else {
    const regex = new RegExp(search.value, "gi");
    let newData = [...studentData];
    newData = newData.filter(
      (student) =>
        regex.test(student.name.degree) ||
        regex.test(student.email) ||
        regex.test(student.degree)
    );
    display(newData);
  }
}

// handling what to do when form1 is reset
function handleReset() {
  mode = 0;
  formbutton.value = "Add Student";
  form1.reset();
}

// main logic
document.onload = display(studentData);
search.addEventListener("keyup", handleSearch);
form1.addEventListener("reset", handleReset);
formbutton.addEventListener("click", () =>
  mode === 0 ? addStudent() : estudent()
);
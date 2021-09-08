window.onload = () => {
    document.getElementById("addEmployeeModal").addEventListener("click", AddEmployee, false);
    document.getElementById("openEmployeeModal").addEventListener("click", openModal, false);

    document.querySelectorAll(".close-myModal").forEach(e => {
        e.addEventListener("click", closeModal, false);
    });

    currentEmployees = JSON.parse(localStorage.getItem('employees'));

    if (currentEmployees == undefined) {
        localStorage.setItem('employees', JSON.stringify([]));
        localStorage.setItem('employeeNextId', JSON.stringify(0));
    } else {
        currentEmployees.forEach(e => {
            AppendTable(e);
        });
    }

    setDelete();
}

//Open modal function
function openModal() {
    document.getElementById('addEmployeeModal').style = "display:block";
    document.getElementById('addEmployeeModal').classList.add("show");
}

//Close modal function
function closeModal() {
    document.getElementById('addEmployeeModal').style = "display:none";
    document.getElementById('addEmployeeModal').classList.remove("show");
}

//Closing modal at outside click function
window.onclick = function(event) {
    if (event.target == document.getElementById('addEmployeeModal')) {
        closeModal();
    }
}

function AppendTable(employee) {
    tableContent = `<tr employeeId = ${employee.employeeId}>
    <td>1</td>
    <td><img src="${employee.picture}" class="picture"></td>
    <td>${employee.Name}</td>
    <td>${employee.email}</td>
    <td>${employee.gender}</td>
    <td>${employee.birthDate}</td>
    <td><div class="delete-container"><a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE5C9;</i></a></div></td>
    </tr>`
    console.log(employee);
    document.getElementById("tableEmployees").innerHTML += tableContent;
}

function AddEmployee() {
    Name = document.getElementById("name-input").value;
    email = document.getElementById("email-input").value;
    gender = document.getElementById("gender-input").value;
    birthDate = document.getElementById("birthdate-input").value;
    // picture = document.getElementById("imgPreview").src;

    employeeId = JSON.parse(localStorage.getItem('employeeNextId'));
    allEmployees = JSON.parse(localStorage.getItem('employees'));

    newEmployee = new Employee(employeeId++, Name, email, gender, birthDate, picture);
    allEmployees.push(newEmployee);

    localStorage.setItem('employeeNextId', JSON.stringify(employeeId));
    localStorage.setItem('employees', JSON.stringify(allEmployees));

    AppendTable(newEmployee);
    setDelete();
    closeModal();
}

//Delete event set on click
function setDelete() {
    document.querySelectorAll(".delete").forEach(e => {
        e.addEventListener("click", deleteEmployeeRow, false);
    });
}

//Delete employee function
function deleteEmployeeRow(htmlDeleteElement) {
    if (confirm('Are you sure to delete this employee?')) {
        rowToBeDeleted = htmlDeleteElement.target.closest("tr");
        employeeToDeleteId = rowToBeDeleted.getAttribute("employeeId");

        rowToBeDeleted.remove();

        allEmployees = JSON.parse(localStorage.getItem('employees'));
        allEmployees = allEmployees.filter(e => e.employeeId != employeeToDeleteId);

        localStorage.setItem('employees', JSON.stringify(allEmployees));
    }
}

function Employee(employeeId, Name, email, gender, birthDate, picture) {
    this.employeeId = employeeId;
    this.Name = Name;
    this.email = email;
    this.birthDate = moment(birthDate).format('D MMMM YYYY');
    this.gender = gender;
    this.picture = picture;
}
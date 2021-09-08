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
    document.getElementById('myModal').style = "display:block";
    document.getElementById('myModal').classList.add("show");
}

//Close modal function
function closeModal() {
    document.getElementById('myModal').style = "display:none";
    document.getElementById('myModal').classList.remove("show");
}

//Closing modal at outside click function
window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
        closeModal();
    }
}

function AppendTable(employee) {
    tableContent = `<tr employeeId = ${employee.employeeId}>
    <td>1</td>
    <td><img src="${employee.picture}" class="picture"></td>
    <td>${employee.Name}</td>
    <td>${employee.email}</td>
    <td>${employee.sex}</td>
    <td>${employee.birthDate}</td>
    <td><div class="delete-container"><a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE5C9;</i></a></div></td>
    </tr>`
    console.log(employee);
    document.getElementById("tableEmployees").innerHTML += tableContent;
}

function AddEmployee() {
    Name = document.getElementById("name-input").value;
    email = document.getElementById("email-input").value;
    sex = document.getElementById("sex-input").value;
    birthDate = document.getElementById("birthdate-input").value;
    // picture = document.getElementById("imgPreview").src;

    formIsValid = validateEmployeeFields(Name, email, sex, birthDate);

    if (formIsValid) {
        employeeId = JSON.parse(localStorage.getItem('employeeNextId'));
        allEmployees = JSON.parse(localStorage.getItem('employees'));

        newEmployee = new Employee(employeeId++, Name, email, sex, birthDate, picture);
        allEmployees.push(newEmployee);

        localStorage.setItem('employeeNextId', JSON.stringify(employeeId));
        localStorage.setItem('employees', JSON.stringify(allEmployees));

        AppendTable(newEmployee);
        setDelete();
        closeModal();
    }
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

// Employee constructor
function Employee(employeeId, Name, email, sex, birthDate, picture) {
    this.employeeId = employeeId;
    this.Name = Name;
    this.email = email;
    this.birthDate = moment(birthDate).format('D MMMM YYYY');
    this.sex = sex;
    this.picture = picture;
}

//Validators
// https://www.codegrepper.com/code-examples/javascript/javascript+funtion+to+calculate+age+above+18
function validateAgeAtLeast16(dateStr) {
    birthdate = new Date(dateStr);
    dateDifference = new Date(Date.now() - birthdate.getTime());
    personAge = dateDifference.getUTCFullYear() - 1970;
    return personAge >= 16;
}

function validateEmployeeFields(employeeName, employeeEmail, employeeSex, employeeBirthdate) {
    if (employeeName == "") {
        // alert("Numele este un camp obligatoriu !")
        return false;
    }

    if (employeeEmail == "") {
        // alert("Email-ul nu este valid !")
        // alert("Email-ul este un camp obligatoriu !")
        return false;
    } else {
        // regex validation for email:  https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(employeeEmail)) {
            // alert("Email-ul introdus nu este valid !")
            return false;
        }
    }
    if (employeeSex == "") {
        // alert("Trebuie sa selectati sex-ul angajatului !")
        return false;
    }
    if (employeeBirthdate == "") {
        // alert("Data nasterii este un camp obligatoriu !")
        return false;
    } else if (!validateAgeAtLeast16(employeeBirthdate)) {
        alert("Employee must be at least 16 years old!");
        return false;
    }
    return true;
}
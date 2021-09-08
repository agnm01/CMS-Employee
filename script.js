window.onload = () => {
    document.getElementById("addEmployeeButton").addEventListener("click", AddEmployee, false);
    document.getElementById("openEmployeeModal").addEventListener("click", openModal, false);
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


function AddEmployee() {​​​​​​​​
    lastName = document.getElementById("last-name").value;
    firstName = document.getElementById("first-name").value;
    email = document.getElementById("email-input").value;
    gender = document.getElementById("gender-input").value;
    birthDate = document.getElementById("birthdate-input").value;
    picture = document.getElementById("imgPreview").src;
}
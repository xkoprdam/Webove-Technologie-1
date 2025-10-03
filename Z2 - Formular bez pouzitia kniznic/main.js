console.log('loaded');

function displayError(msg, errfieldID) {
    let err = document.getElementById(errfieldID);
    err.style.visibility = 'visible';
    err.innerHTML = msg;
}

function hideError(errfieldID) {
    let err = document.getElementById(errfieldID);
    err.style.visibility = 'hidden';
    err.innerHTML = "";
}

function validateIsEmpty(msg, inputID, errfieldID) {
    let inputfield = document.getElementById(inputID);

    if (!inputfield.value) {
        displayError(msg, errfieldID);
        inputfield.style.border = '2px solid red';
    } else {
        hideError(errfieldID);
        inputfield.style.border = '';
    }
}

const radioButtons = document.querySelectorAll('input[name="sex"]');
const radioGroup = document.getElementById('radio-group');

radioGroup.addEventListener('change', function() {
    const atLeastOneChecked = [...radioButtons].some(button => button.checked);

    if (atLeastOneChecked) {
        radioGroup.removeAttribute('required');
    } else {
        radioGroup.setAttribute('required', 'required');
    }
});

function toggleCheckboxVisibility() {
    const radioFemale = document.getElementById('female');
    const likeLabel = document.getElementById("fesak");

    if (radioFemale.checked) {
        likeLabel.style.visibility = "visible";
    } else {
        likeLabel.style.visibility = "hidden";
    }
}

function validateEmail(email) {
    // Regular expression for a valid email address
    const emailRegex = /^[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // console.log(email + " is " + emailRegex.test(email));

    if (!emailRegex.test(email.value)) {
        displayError("Nesprávny formát", 'err-email');
        email.style.border = '2px solid red';
        return false;
    } else {
        hideError('err-email');
        email.style.border = '';
        return true;
    }
}

function validatePhone(phone) {

    const phoneRegex = /^\+\d{12}$/;

    console.log(phone + " is " + phoneRegex.test(phone));

    if (!phone.value || phoneRegex.test(phone.value)) {
        hideError('err-phone');
        phone.style.border = '';
        return true;
    }
    else {
        displayError("Nesprávny formát", 'err-phone');
        phone.style.border = '2px solid red';
        return false;
    }
}


let birthdate = document.getElementById('birthdate');
birthdate.addEventListener("change", (event) => {
    let bday = new Date(event.target.value); // hodnota input fieldu od pouzivatela cize jeho datum narodenia
    let today = new Date();

    let age = today.getFullYear() - bday.getFullYear();
    let month = today.getMonth() - bday.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < bday.getDate())) {
        age -= 1;
    }

    let ageinput = document.getElementById('age');
    ageinput.value = age;
    ageinput.setAttribute('disabled', 'true');

});


const manufacturerSelect = document.getElementById("manufacturer");
const teamSelect = document.getElementById("team");
const driverSelect = document.getElementById("driver");


const teamsByManufacturer = {
    Ferrari:    ["Scuderia Ferrari", "Alfa Romeo", "Haas"],
    Honda:      ["Red Bull Racing", "Alphatauri"],
    Mercedes:   ["Mercedes", "McLaren", "Aston Martin", "Williams"],
    Renault:    ["Alpine"]
};

const driversByTeam = {
    "Scuderia Ferrari": ["Charles Leclerc", "Carlos Sainz"],
    "Alfa Romeo":       ["Valtteri Bottas", "Zhou Guanyu"],
    Haas:               ["Kevin Magnussen", "Nico Hülkenberg"],
    "Red Bull Racing":  ["Max Verstappen", "Sergio Pérez"],
    Alphatauri:         ["Yuki Tsunoda", "Daniel Ricciardo", "Nyck de Vries", "Liam Lawson"],
    Alpine:             ["Pierre Gasly", "Esteban Ocon"],
    Mercedes:           ["Lewis Hamilton", "George Russel"],
    McLaren:            ["Lando Norris", "Oscar Piastri"],
    "Aston Martin":     ["Fernando Alonso", "Lance Stroll"],
    Williams:           ["Alexander Albon", "Logan Sargeant"]
};

// Function to update the teams select element based on the selected manufacturer
function updateTeams() {
    const selectedManufacturer = manufacturerSelect.value;
    const teams = teamsByManufacturer[selectedManufacturer] || [];

    // Clear the existing options
    teamSelect.innerHTML = '<option disabled="" selected="" value="">Vyberte...</option>';

    // Add options for the selected teams
    teams.forEach((team) => {
        const option = document.createElement("option");
        option.value = team;
        option.textContent = team;
        teamSelect.appendChild(option);
    });

    // Show the teams select element if there are teams to choose from
    if (teams.length > 0) {
        teamSelect.classList.remove("default-hidden");
        document.querySelector("#team-label").classList.remove("default-hidden");
    } else {
        teamSelect.classList.add("default-hidden");
        document.querySelector("#team-label").classList.add("default-hidden");
    }

    // Call the updateDrivers function to update the drivers select based on the selected team
    updateDrivers();
}

// Function to update the drivers select element based on the selected team
function updateDrivers() {
    const selectedTeam = teamSelect.value;
    const drivers = driversByTeam[selectedTeam] || [];

    // Clear the existing options
    driverSelect.innerHTML = '<option disabled="" selected="" value="">Vyberte...</option>';

    // Add options for the selected drivers
    drivers.forEach((driver) => {
        const option = document.createElement("option");
        option.value = driver;
        option.textContent = driver;
        driverSelect.appendChild(option);
    });

    // Show the drivers select element if there are drivers to choose from
    if (drivers.length > 0) {
        driverSelect.classList.remove("default-hidden");
        document.querySelector("#driver-label").classList.remove("default-hidden");
    } else {
        driverSelect.classList.add("default-hidden");
        document.querySelector("#driver-label").classList.add("default-hidden");
    }
}

// Add event listeners to the select elements
manufacturerSelect.addEventListener("change", updateTeams);
teamSelect.addEventListener("change", updateDrivers);

// Initially call the updateTeams function to populate the teams select element
updateTeams();

const maxChars = 100;
const checkbox = document.getElementById('checkbox-additional-text');
const textarea = document.getElementById('additional-text');
const charcount= document.getElementById('char-count');

checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        textarea.style.visibility = 'visible';
        charcount.style.visibility = 'visible';
    } else {
        textarea.style.visibility = 'hidden';
        charcount.style.visibility = 'hidden';
    }
});

textarea.addEventListener("input", function() {
    const text = textarea.value;
    const length = text.length;

    charcount.textContent = length + " / " + maxChars;

    if (length > maxChars) {
        textarea.classList.add("max-char-exceeded");
    } else {
        textarea.classList.remove("max-char-exceeded");
    }

    // Truncate the text if it exceeds the character limit
    if (length > maxChars) {
        textarea.value = text.substring(0, maxChars);
    }
});


var summary = document.getElementById("summary");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

const form = document.getElementById('formular');
const modalContent = document.querySelector('.modal-content');


btn.onclick = function() {

    const name = document.getElementById('firstname').value;
    const surname = document.getElementById('surname').value;
    let sex = null;

    if (document.getElementById('male').checked) {
        sex = 'muž';
    } else if (document.getElementById('female').checked) {
        sex = 'žena';
    } else if (document.getElementById('other').checked) {
        sex = 'iné';
    }

    const birthdate = document.getElementById('birthdate').value;
    const age = document.getElementById('age').value;
    const driver = document.getElementById('driver').value;
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    if (!name || !surname || !sex || !birthdate || !age ||
        !driver || !validateEmail(email) || !validatePhone(phone) ) {
        return;
    }

    modalContent.innerHTML = `
        <h3>Sumár</h3>
        <br>
        <p>Meno: <b>${name}</b></p>
        <p>Priezvisko: <b>${surname}</b></p>
        <p>Pohlavie: <b>${sex}</b></p>
        <p>Dátum narodenia: <b>${birthdate}</b></p>
        <p>Vek: <b>${age}</b></p>
        <p>Obľúbený jazdec: <b>${driver}</b></p>
        <p>e-mail: <b>${email.value}</b></p>
        <p>telefónne číslo: <b>${phone.value}</b></p>
        <br>
    `;
    summary.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    summary.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == summary) {
        summary.style.display = "none";
    }
}

function validateForm() {
    console.log('Cau degesko');
}

const check_in_form = document.getElementById("check-in-form");
const check_in_button = document.getElementById("check-in-button");
const login_form = document.getElementById("new-password-form");
const generatedUsename = document.getElementById("generated-username");
const welcomeMessage = document.getElementById("welcome");
const roomList = document.getElementById("room-list");

const updateDom = array => {
  array.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `room number ${item.room_num} is ${
      item.occupied === "0" ? "unoccupied" : `occupied by ${item.guinea_name}`
    }`;
    roomList.appendChild(li);
  });
};

const updateButton = num => {
  if (num === 0) {
    check_in_button.disabled = true;
    check_in_button.textContent = "sorry, we're full!";
  }
};

// const updatePassword = array => {
//   const password = document.getElementById("password-input");
//   const badCharacters = "drop table";

//   const error = "";

//   if(array.value = "") {
//     error = "Please enter a password";
//     alert(error);
//     return false;

//   } else if ((array.value.length < 5) || (array.value.length > 10)) {
//     error = "Your password is the wrong length";
//     alert(error);
//     return false;

//   } else if ()

// }

const getRooms = () => {
  roomList.innerHTML = "";
  fetch("/rooms")
    .then(res => res.json())
    .then(response => updateDom(response));
};

const getFreeRooms = () => {
  fetch("/frees")
    .then(res => res.json())
    .then(response => updateButton(response));
};

function passwordData(url = "", data = {}) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  });
}

document.getElementById("login-button").addEventListener("click", () => {
  passwordData("/createusers", {
    password: "password"
  })
    .then(data => console.log(JSON.stringify(data)))
    .catch(error => console.log(error));
});

//   fetch("/createuser")
//   .then(res => res.json())
//   .then(response => updatePassword(response));
// };

getRooms();
getFreeRooms();
passwordData();

const updateLoginPage = loginData => {
  const { guinea_id, guinea_name, room_num } = loginData;
  welcomeMessage.textContent = `Welcome, ${guinea_name}! Your room number is ${room_num} and your username for your stay is ${guinea_name +
    guinea_id}. Please enter a password below:`;
  generatedUsename.value = guinea_name + guinea_id;
  check_in_form.style.display = "none";
  login_form.style.display = "block";
  login_form.setAttribute("aria-hidden", "false");
  getRooms();
};

const fetchCheckin = guineaData => {
  fetch("/check-in", {
    method: "POST",
    body: JSON.stringify(guineaData)
  })
    .then(res => res.json())
    .then(json => updateLoginPage(json));
};

getRooms();
getFreeRooms();
login_form.style.display = "none";


check_in_form.addEventListener("submit", event => {
  event.preventDefault();
  const values = {};
  values.name = event.target.elements.name.value;
  values.colour = event.target.elements.colour.value;
  values.gender = event.target.elements.gender.value;
  console.log(values);
  fetchCheckin(values);
});

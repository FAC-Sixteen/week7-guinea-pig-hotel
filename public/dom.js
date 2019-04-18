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

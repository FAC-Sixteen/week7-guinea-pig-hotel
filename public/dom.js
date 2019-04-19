const check_in_form = document.getElementById("check-in-form");
const check_in_button = document.getElementById("check-in-button");
const new_login_form = document.getElementById("new-password-form");
const login_form = document.getElementById("login-form");
const generatedUsename = document.getElementById("generated-username");
const welcomeMessage = document.getElementById("welcome");
const roomList = document.getElementById("room-list");
const errorMessage = document.getElementById("error-message");

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

const passwordData = data => {
  fetch("/createusers", {
    method: "POST",
    body: JSON.stringify(data)
  });
  // .then(res => res.json())
  // .then(response => console.log(response.body))
  // .catch(error => console.log(error));
};

new_login_form.addEventListener("submit", e => {
  e.preventDefault();
  let user = {
    username: e.target["new-username"].value,
    password: e.target["new-password"].value
  };

  passwordData(user);
});

//   fetch("/createuser")
//   .then(res => res.json())
//   .then(response => updatePassword(response));
// };

getRooms();
getFreeRooms();

const updateLoginPage = loginData => {
  const { guinea_id, guinea_name, room_num } = loginData;
  welcomeMessage.textContent = `welcome, ${guinea_name}! your room number is ${room_num} and your username for your stay is ${guinea_name +
    guinea_id}. please enter a password below:`;
  generatedUsename.value = guinea_name + guinea_id;
  check_in_form.style.display = "none";
  new_login_form.style.display = "block";
  new_login_form.setAttribute("aria-hidden", "false");
  getRooms();
};

const incorrectLogin = loginData => {
  const { username, password } = loginData;
  if (username === false) {
    errorMessage.textContent =
      "user does not exist, please enter another username";
  } else if (password === false) {
    errorMessage.textContent =
      "incorrect password, please enter the correct password";
  }
};

const fetchCheckin = guineaData => {
  fetch("/check-in", {
    method: "POST",
    body: JSON.stringify(guineaData)
  })
    .then(res => res.json())
    .then(json => updateLoginPage(json))
    .catch(() => console.log("no data"));
};

const fetchLogin = loginData => {
  console.log(JSON.stringify(loginData));
  fetch("/log-in", {
    method: "POST",
    body: JSON.stringify(loginData)
  })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      incorrectLogin(json);
    })
    .catch(() => console.log("no data"));
};

new_login_form.style.display = "none";

check_in_form.addEventListener("submit", event => {
  event.preventDefault();
  const values = {};
  values.name = event.target.elements.name.value;
  values.colour = event.target.elements.colour.value;
  values.gender = event.target.elements.gender.value;
  console.log(values);
  fetchCheckin(values);
});

login_form.addEventListener("submit", event => {
  event.preventDefault();
  const values = {};
  values.username = event.target.elements.username.value;
  values.password = event.target.elements.password.value;
  console.log(values);
  fetchLogin(values);
});

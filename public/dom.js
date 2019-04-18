const check_in_button = document.getElementById("check-in-button");

const updateDom = array => {
  const roomList = document.getElementById("room-list");
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

// check_in_button.addEventListener("click", () => {
//   document.getElementById("generated-username").value = "hello";
// });

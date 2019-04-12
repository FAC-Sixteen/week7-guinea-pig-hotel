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
  const button = document.getElementById("submit-button");
  if (num === 0) {
    button.disabled = true;
    button.textContent = "sorry, we're full!";
  }
};

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
getRooms();
getFreeRooms();

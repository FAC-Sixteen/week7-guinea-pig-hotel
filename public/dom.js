const updateDom = array => {
  const roomList = document.getElementById("room-list");
  array.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `room number ${item.room_num} is ${
      item.occupied === "0" ? "unoccupied" : "occupied"
    }`;
    roomList.appendChild(li);
  });
};

const getRooms = () => {
  fetch("/rooms")
    .then(res => res.json())
    .then(response => updateDom(response));
};
getRooms();

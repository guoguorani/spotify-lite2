const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "http://localhost:3000/login";
}

// console.log(`Bearer ${token}`);

function profile() {
  window.location.href = "http://localhost:3000/users-view";
}

const songsTableBody = document.querySelector("#songs-table-body");
const logoutBtn = document.querySelector("#logout-btn");
const artistsList = document.querySelector("#artists-list");
const userProfile = document.querySelector("#user-profile");

logoutBtn.addEventListener("click", (e) => {
  localStorage.removeItem("token");
  window.location.href = "http://localhost:3000/login-view";
});

userProfile.addEventListener("click", (e) => {
  window.location.href = "http://localhost:3000/profile-view";
});

fetch("http://localhost:3000/user/songs", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    // console.log("data:", data);
    data.forEach((song) => {
      // console.log("1", song);
      const row = document.createElement("tr");
      const titleCell = document.createElement("td");
      titleCell.textContent = song.title;
      const artistCell = document.createElement("td");
      artistCell.textContent = song.artist;
      const languageCell = document.createElement("td");
      languageCell.textContent = song.language;
      row.appendChild(titleCell);
      row.appendChild(artistCell);
      row.appendChild(languageCell);
      songsTableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error(error);
  });

fetch("http://localhost:3000/user/artists", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    // console.log("data:", data);
    data.forEach((artist) => {
      const artistItem = document.createElement("li");
      artistItem.textContent = artist;
      artistsList.appendChild(artistItem);
    });
  })
  .catch((error) => {
    console.error(error);
  });

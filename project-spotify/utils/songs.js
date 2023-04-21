function displaySongs(songs) {
  var results = document.querySelector("#results");
  results.innerHTML = "";
  var table = document.createElement("table");
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var th1 = document.createElement("th");
  th1.textContent = "Title";
  var th2 = document.createElement("th");
  th2.textContent = "Artist";
  var th3 = document.createElement("th");
  th3.textContent = "Language";
  var th4 = document.createElement("th");
  th4.textContent = "Genre";
  headerRow.appendChild(th1);
  headerRow.appendChild(th2);
  headerRow.appendChild(th3);
  headerRow.appendChild(th4);
  thead.appendChild(headerRow);
  table.appendChild(thead);
  var tbody = document.createElement("tbody");
  songs.forEach(function (song) {
    var row = document.createElement("tr");
    var title = document.createElement("td");
    title.textContent = song.title;
    var likebtn = document.createElement("button");
    likebtn.textContent = "like";
    title.appendChild(likebtn);
    var artist = document.createElement("td");
    artist.textContent = song.artist;
    var followbtn = document.createElement("button");
    followbtn.textContent = "follow";
    artist.appendChild(followbtn);
    var language = document.createElement("td");
    language.textContent = song.language;
    var genre = document.createElement("td");
    genre.textContent = song.genre.join(", ");
    likebtn.addEventListener("click", function (event) {
      var row = event.target.closest("tr");
      // var song = row.querySelector("td:nth-child(1)").textContent;
      // console.log(song._id);

      fetch("/user/songs/like", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ songId: song._id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          likebtn.style.backgroundColor = "red";
          likebtn.textContent = "liked";
        })
        .catch((error) => console.error(error));
    });

    followbtn.addEventListener("click", function (event) {
      var row = event.target.closest("tr");
      var artist = row.querySelector("td:nth-child(2)").textContent;
      // console.log('artist', song.artist);

      fetch("/user/artists/follow", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ artistName: song.artist }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          followbtn.style.backgroundColor = "red";
          followbtn.textContent = "followed";
        })
        .catch((error) => console.error(error));
    });

    var likebtnContainer = document.createElement("td");

    row.appendChild(title);
    // row.appendChild(likebtn);
    row.appendChild(artist);
    row.appendChild(language);
    row.appendChild(genre);
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  results.appendChild(table);
}

function filterSongs() {
  var search = document.querySelector("#search").value;
  var language = document.querySelector("#language").value;
  var genre = document.querySelector("#genre").value;

  fetch(`/search/songs?search=${search}&language=${language}&genre=${genre}`)
    .then((response) => response.json())
    .then((data) => displaySongs(data))
    .catch((error) => console.error(error));
}

var userProfile = document.querySelector("#user-profile-button");
userProfile.addEventListener("click", function (event) {
  window.location.href = "http://localhost:3000/users-view";
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("/songs")
    .then((response) => response.json())
    .then((data) => displaySongs(data))
    .catch((error) => console.error(error));

  var form = document.querySelector("#search-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    filterSongs();
  });
});

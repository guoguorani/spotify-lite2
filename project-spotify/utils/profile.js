const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "http://localhost:3000/login";
}

// console.log(`Bearer ${token}`);

function profile() {
  window.location.href = "http://localhost:3000/users-view";
}

const logoutBtn = document.querySelector("#logout-btn");
const userProfile = document.querySelector("#user-profile");

logoutBtn.addEventListener("click", (e) => {
  localStorage.removeItem("token");
  window.location.href = "http://localhost:3000/login-view";
});

function renderUser(user) {
  const { name, email, password } = user;
  const nameElement = document.createElement("p");
  nameElement.textContent = `Name: ${name}`;
  const emailElement = document.createElement("p");
  emailElement.textContent = `Email: ${email}`;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", (e) => {
    document.querySelector("#user-edit-form").style.display = "block";
  });

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = name;
  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.value = email;
  const pswInput = document.createElement("input");
  pswInput.type = "password";
  pswInput.value = password;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save Changes";
  saveBtn.addEventListener("click", (e) => {
    const userData = {
      username: nameInput.value,
      email: emailInput.value,
      password: pswInput.value,
    };
    fetch("http://localhost:3000/user/info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        renderUser(data);
        nameElement.textContent = `Name: ${data.name}`; // update the name element with the new name data
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  });

  logoutBtn.addEventListener("click", (e) => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/login-view";
  });
  

  userProfile.innerHTML = "";
  userProfile.appendChild(nameElement);
  userProfile.appendChild(emailElement);
  userProfile.appendChild(editBtn);
  const editFormContainer = document.createElement("div");
  editFormContainer.id = "user-edit-form";
  editFormContainer.style.display = "none";
  editFormContainer.appendChild(nameInput);
  editFormContainer.appendChild(emailInput);
  editFormContainer.appendChild(pswInput);
  editFormContainer.appendChild(saveBtn);
  userProfile.appendChild(editFormContainer);
}

fetch("http://localhost:3000/user/info", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    renderUser(data);
  })
  .catch((error) => {
    console.error(error);
  });

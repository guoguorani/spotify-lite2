const form = document.getElementById("signup-form");

function login() {
  window.location.href = "login.html";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      console.log(data);
      alert("Sign up successful");
      form.reset();

      // const decoded_real_jwt = jwt.verify(signed_jwt, process.env.JWT_KEY);
      // const email= decoded_real_jwt.email

      window.location.href = "http://localhost:3000/login-view";
      // url
      // get request
    })
    .catch((error) => {
      console.error(error);
      alert("Sign up failed");
    });
});

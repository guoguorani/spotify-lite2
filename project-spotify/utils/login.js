const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorMsg = document.querySelector("#error-msg");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log(data.token);
      window.location.href = "http://localhost:3000/songs-view";
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    errorMsg.textContent = error.message;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("auth-form");
  const formTitle = document.getElementById("form-title");
  const toggleAuth = document.getElementById("toggle-auth");
  const nameField = document.getElementById("name");
  const errorMessage = document.getElementById("error-message"); // For displaying error message

  let isLogin = false;

  // Toggling between login and signup form
  toggleAuth.addEventListener("click", (e) => {
    e.preventDefault();
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? "Login" : "Sign Up";
    nameField.style.display = isLogin ? "none" : "block";
    toggleAuth.innerHTML = isLogin
      ? 'New user? <a href="#" id="switch-to-signup">Sign up here</a>'
      : 'Already have an account? <a href="#" id="switch-to-login">Login here</a>';
  });

  // Handling form submission (Login or Signup)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Resetting error message
    errorMessage.textContent = "";
    errorMessage.style.display = "none";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simple validation for empty fields
    if (!email || !password) {
      errorMessage.textContent = "Please enter both email and password.";
      errorMessage.style.display = "block";
      return;
    }

    const data = { email, password };

    if (isLogin) {
      // Login logic - send POST request to check credentials
      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();

        if (result.success) {
          alert("Login successful!");
          window.location.href = "guest_home.html"; // Redirect to home after login
        } else {
          errorMessage.textContent = result.message;
          errorMessage.style.display = "block";
        }
      } catch (error) {
        console.error("Error logging in:", error);
        errorMessage.textContent = "An error occurred while logging in.";
        errorMessage.style.display = "block";
      }
    } else {
      // Sign-up logic - send POST request to create a new user
      const name = document.getElementById("name").value;

      if (!name || !email || !password) {
        errorMessage.textContent = "Please fill in all fields.";
        errorMessage.style.display = "block";
        return;
      }

      const newUser = { name, email, password };

      try {
        const response = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        const result = await response.json();

        if (result.success) {
          alert("Signup successful! You can now log in.");
          window.location.href = "guest_home.html"; // Redirect to home after signup
        } else {
          errorMessage.textContent = result.message;
          errorMessage.style.display = "block";
        }
      } catch (error) {
        console.error("Error signing up:", error);
        errorMessage.textContent = "An error occurred while signing up.";
        errorMessage.style.display = "block";
      }
    }
  });
});












// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("auth-form");
//   const formTitle = document.getElementById("form-title");
//   const toggleAuth = document.getElementById("toggle-auth");
//   const nameField = document.getElementById("name");
//   const errorMessage = document.getElementById("error-message"); // For displaying error message

//   let isLogin = false;

//   // Toggling between login and signup form
//   toggleAuth.addEventListener("click", (e) => {
//     e.preventDefault();
//     isLogin = !isLogin;
//     formTitle.textContent = isLogin ? "Login" : "Sign Up";
//     nameField.style.display = isLogin ? "none" : "block";
//     toggleAuth.innerHTML = isLogin
//       ? 'New user? <a href="#" id="switch-to-signup">Sign up here</a>'
//       : 'Already have an account? <a href="#" id="switch-to-login">Login here</a>';
//   });

//   // Handling form submission (Login or Signup)
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     // Resetting error message
//     errorMessage.textContent = "";
//     errorMessage.style.display = "none";

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     // Simple validation for empty fields
//     if (!email || !password) {
//       errorMessage.textContent = "Please enter both email and password.";
//       errorMessage.style.display = "block";
//       return;
//     }

//     if (isLogin) {
//       // Login logic
//       const user = JSON.parse(localStorage.getItem("user"));

//       if (user && user.email === email && user.password === password) {
//         alert("Login successful!");
//         window.location.href = "guest_home.html"; // Redirect to home after login
//       } else {
//         errorMessage.textContent = "Invalid credentials! Please check your email or password.";
//         errorMessage.style.display = "block";
//       }
//     } else {
//       // Sign-up logic
//       const name = document.getElementById("name").value;

//       if (!name || !email || !password) {
//         errorMessage.textContent = "Please fill in all fields.";
//         errorMessage.style.display = "block";
//         return;
//       }

//       localStorage.setItem("user", JSON.stringify({ name, email, password }));
//       alert("Signup successful! You can now log in.");
//       window.location.href = "guest_home.html"; // Redirect to home after signup
//     }
//   });
// });

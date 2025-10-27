const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('pwd');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('loginFrom');

const validUser = {
    email: "Eamelyne",
    password: "nailong hit4m"
};

function checkInput() {
  submitBtn.disabled = !(emailInput.value.trim() !== "" && passwordInput.value.trim() !== "");
}

emailInput.addEventListener('input', checkInput);
passwordInput.addEventListener('input', checkInput);

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const enteredEmail = emailInput.value.trim();
  const enteredPassword = passwordInput.value;

  if (enteredEmail === validUser.email && enteredPassword === validUser.password) {

  window.location.href ="Playlist.html";
  }
});
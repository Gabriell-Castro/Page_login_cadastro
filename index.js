const btnSubmit = document.querySelector(".btnSubmit");

function submitForm(e) {
  e.preventDefault();

  const email = document.querySelector("input[type='email']").value.trim();
  const password = document
    .querySelector("input[type='password']")
    .value.trim();
  const role = document.querySelector("#roleSelect").value;

  if (!email || !password) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userFound = users.find((user) => user.email === email);

  if (!userFound) {
    alert("E-mail não cadastrado!");
    return;
  }

  if (userFound.password !== password) {
    alert("Senha inválida!");
    return;
  }

  localStorage.setItem("userRole", role);
  window.location.href = "/pages/toDoList/toDoList.html";
}

btnSubmit.addEventListener("click", submitForm);

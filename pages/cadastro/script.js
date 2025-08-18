const buttonSubmit = document.querySelector("button[type='submit']");

buttonSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  const nameInput = document.querySelector('input[type="text"]').value;
  const emailInput = document.querySelector('input[type="email"]').value;
  const passwordInput = document.querySelector('input[type="password"]').value;
  const confirmPasswordInput = document.querySelector(
    'input[type="password"][name="confirmPassword"]'
  ).value;

  const user = {
    name: nameInput,
    email: emailInput,
    password: passwordInput,
    confirmPassword: confirmPasswordInput,
  };
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (emailInput && nameInput && passwordInput && confirmPasswordInput) {
    if (passwordInput !== confirmPasswordInput) {
      alert("Senhas não conferem");
      return;
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    alert("preencha todos os campos");
    return;
  }

  mensagem(() => {
    window.location.href = "../../index.html";
  });
});

const mensagem = (callback) => {
  const msg = document.querySelector(".mensagem");

  msg.classList.remove("saindo");
  msg.classList.remove("entrando");

  void msg.offsetWidth;

  msg.classList.add("entrando");

  setTimeout(() => {
    msg.classList.remove("entrando");
    msg.classList.add("saindo");

    if (callback) {
      setTimeout(callback, 400);
    }
  }, 2500);
};

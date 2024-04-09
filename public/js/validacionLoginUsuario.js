function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
window.addEventListener("load", function () {
  let formulario = document.querySelector("form.form-login");

  formulario.addEventListener("submit", function (event) {
    let errores = [];

    let email = document.getElementById("emailDelUsuario");
    if (email.value == "") {
      errores.push("El campo email es obligatorio");
    } else if (!validarEmail(email.value)) {
      errores.push("Correo electrónico inválido");
    }

    let password = document.getElementById("passwordDelUsuario");
    if (password.value == "") {
      errores.push("El campo contaseña obligatorio");
    }

    if (errores.length > 0) {
      event.preventDefault();
      let ulErrores = document.querySelector(".errores ul");
      errores.forEach((error) => {
        ulErrores.innerHTML += `<li>${error}</li>`;
      });
      ulErrores.style.color = "blue";
    }
  });
});

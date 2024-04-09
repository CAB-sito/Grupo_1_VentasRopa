function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

window.addEventListener("load", function () {
  let formulario = document.querySelector("form.formCrearUsuario");

  formulario.addEventListener("submit", function (event) {
    let errores = [];
    let nombre = document.getElementById("nombreDelUsuario");
    if (nombre.value == "") {
      errores.push("El campo nombre es obligatorio");
    } else if (nombre.value.length < 2) {
      errores.push("Nombre debe tener como mínimo 2 caracteres");
    }

    let apellido = document.getElementById("apellidoDelUsuario");
    if (apellido.value == "") {
      errores.push("El campo apellido es obligatorio");
    } else if (apellido.value.length < 2) {
      errores.push("Apellido debe tener como mínimo 2 caracteres");
    }

    let email = document.getElementById("emailDelUsuario");
    if (email.value == "") {
      errores.push("El campo email es obligatorio");
    } else if (!validarEmail(email.value)) {
      errores.push("Correo electrónico inválido");
    }

    let password = document.getElementById("passwordDelUsuario");
    if (password.value == "") {
      errores.push("El campo contraseña es obligatorio");
    } else if (password.value.length < 8) {
      errores.push("Contraseña debe tener como mínimo 8 caracteres");
    }

    let imagen = document.getElementById("imagenDelUsuario");
    let file = imagen.files[0];
    let extencionesAceptadas = [".jpg", ".jpeg", ".png", ".gif"];
    if (!file) {
      errores.push("Tienes que subir una imagen");
    } else {
      let fileExtension = "." + file.name.split(".").pop().toLowerCase();
      if (!extencionesAceptadas.includes(fileExtension)) {
        errores.push(
          "Las extensiones de archivo permitidas son " +
            extencionesAceptadas.join(",")
        );
      }
    }

    if (errores.length > 0) {
      event.preventDefault();
      let ulErrores = document.querySelector(".errores ul");
      errores.forEach((error) => {
        console.log(error);
        ulErrores.innerHTML += `<li>${error}</li>`;
      });
      ulErrores.style.color = "blue";
    }
  });
});

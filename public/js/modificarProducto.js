window.addEventListener("load", function () {

    let formulario = document.querySelector("form.formCrearProducto")
    

    formulario.addEventListener("submit", function(event){
        let errores = [];
        
        let nombre = document.getElementById("nombreDelProducto")
        if (nombre.value == "") {
            errores.push("El campo nombre del producto es obligatorio")
        }else if(nombre.value.length < 5){
            errores.push("El campo nombre del producto debe tener como mínimo 5 caracteres")
        };

        let description = document.getElementById("descripciónDelProducto")
  if (description.value == "") {
            errores.push("El campo descripción del producto es obligatorio")
        } else if(description.value.length < 20){
            errores.push("El campo descrpción del producto debe tener como mínimo 20 caracteres")
        };

        let imagen = document.getElementById("imagenDelProducto");
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

        let price =  document.getElementById("precioDelProducto")
        if (price.value == "") {
            errores.push("Debes ponerle precio al producto")
        };

        let color = document.getElementById("colorDelProducto");
        if (color.value == "") {
            errores.push("Debe elegir un color")
        };

        if(errores.length > 0){
            event.preventDefault()
            let ulErrores = document.querySelector("div.errores");
            for(let i = 0; i < errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores[i]+ "</li>"
            }
            ulErrores.style.color = "green"
        }
    })})
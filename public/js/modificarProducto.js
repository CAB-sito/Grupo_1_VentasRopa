window.addEventListener("load", function () {

    let formulario = document.querySelector("form.formCrearProducto")
    let errores = [];

    formulario.addEventListener("submit", function(event){

        let nombre = document.getElementById("nombreDelProducto")
        if (nombre.value == "") {
            errores.push("Campo obligatorio")
        }else if(nombre.value.length < 5){
            errores.push("Debe tener como mínimo 5 caracteres")
        };

        let description = document.getElementById("descripciónDelProducto")
  if (description.value == "") {
            errores.push("Campo obligatorio")
        } else if(description.value.length < 20){
            errores.push("Debe tener como mínimo 20 caracteres")
        };

        let imagen = document.getElementById("imagenDelProducto");
       imagen.custom((value, {req})=>{
        let file = req.file;
        let extencionesAceptadas= ['.jpg', '.jpeg' , '.png' , '.gif'];
        if(!file){
            errores.push('Tienes que subir una imagen');
        }else{
          let fileExtension = path.extname(file.originalname);
          if(!extencionesAceptadas.includes(fileExtension)){
            errores.push('Las extensiones de archivo permitidas son ' + extencionesAceptadas.join(','))    
          }
        }
        return true;
      })

        let price =  document.getElementById("precioDelProducto")
        if (price.value == "") {
            errores.push("Campo obligatorio")
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
            ulErrores.style.color = "red"
        }
    })})
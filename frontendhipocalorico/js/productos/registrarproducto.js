/**
 * Configura el aspecto de la página para ingresar un nuevo registro
 */
function activaNuevo() {
    $("#nuevo").show(500);
    $("#reference").focus();
    $("#editar").hide();
    $("#nuevoRegistro").hide(500)
    $("#listado").hide(500);
    $("#availability option[value=true]").attr("selected",true);
}

/**
 * Esta función ejecuta la petición asincrona al servidor, envia una
 * petición al ws de tipo POST para insertar un producto
 */
function registrar() {

    //crea un objeto javascript
    let datos = {
        reference: $("#reference").val(),
        brand: $("#brand").val(),
        category: $("#category").val(),
        objetivo: $("#objetivo").val(),
        description: $("#description").val(),
        availability: $("#availability").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
        photography: $("#photography").val()
    }

    if (validar()) {

        //convierte el objeto javascript a json antes de agregarlo a los datos de la petición
        let datosPeticion = JSON.stringify(datos);

        $.ajax({
            // la URL para la petición (url: "url al recurso o endpoint")
            url: "http://localhost:8090/api/supplements/new",
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            //si el metodo del servicio recibe datos, es necesario definir el parametro adicional
            data: datosPeticion,

            // especifica el tipo de petición http: POST, GET, PUT, DELETE
            type: 'POST',

            contentType: "application/JSON",

            // el tipo de información que se espera de respuesta
            //dataType: 'json',

            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function (respuesta) {
                //escribe en la consola del desarrollador para efectos de depuración
                console.table(respuesta);
                Swal.fire('Registro ingresado correctamente...');
                listarPro();
                estadoInicialPro();
            },

            // código a ejecutar si la petición falla;
            // son pasados como argumentos a la función
            // el objeto de la petición en crudo y código de estatus de la petición
            error: function (xhr, status) {
                $("#mensajes").show(1000);
                $("#mensajes").html("Error peticion POST..." + status);
            }
        });
    }
}
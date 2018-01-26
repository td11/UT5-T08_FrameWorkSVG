$(function () {

    // When the user clicks on <span> (x), close the modal
    $("div .close").onclick = function () {
        $(".modal").style.display='none';
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == $("#modalpeliculas")) {
            $("body .modal").css('display', 'none');
        }
    }
    
});

function ventanaModal(elemento) {
    limpiarVentanaModal();
    var id = $(elemento).attr("id");
    $("body .modal").css('display', 'block');
    $.getJSON("JS/datosimagenes.json", function (json) {
        console.log(json.datosImagenes[0].titulo);
        $(".modal-header #tituloPelicula").append("<span>"+json.datosImagenes[parseInt(id)].titulo+"</span>");
        $(".modal-body").append("<p>"+json.datosImagenes[parseInt(id)].sinopsis+"</p>");
    });

}

/* Cerrar modal */
function cerrarModal(){
    $("body .modal").css('display', 'none');
}

/* Vaciar ventana modal */
function limpiarVentanaModal(){
    $( ".modal-header #tituloPelicula span" ).remove();
    $("#contenido p").remove();
}


/* Slider */
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}

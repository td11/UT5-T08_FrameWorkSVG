var votos = 0;

/* Inicio */
$(function () {

    // When the user clicks on <span> (x), close the modal
    $("div .close").onclick = function () {
        $(".modal").style.display = 'none';
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == $("#modalpeliculas")) {
            $("body .modal").css('display', 'none');
        }
    }
    

});



/* control de votos */
function votar(){
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {
        'packages': ['corechart']
    });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);
    
    mostrarGrafico();
    

}

/* Cargar google chart*/
function cargarGrafico(){
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {
        'packages': ['corechart']
    });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

}


/* Cargar ventana modal */
function ventanaModal(elemento) {
    limpiarVentanaModal();
    var id = $(elemento).attr("id");
    $("body .modal").css('display', 'block');
    $.getJSON("JS/datosimagenes.json", function (json) {
        console.log(json.datosImagenes[0].titulo);
        $(".modal-header #tituloPelicula").append("<span>" + json.datosImagenes[parseInt(id)].titulo + "</span>");
        $(".modal-body").append("<p>" + json.datosImagenes[parseInt(id)].sinopsis + "</p>");
    });
}



/* Cerrar modal */
function cerrarModal() {
    $("body .modal").css('display', 'none');
}

/* Vaciar ventana modal */
function limpiarVentanaModal() {
    $(".modal-header #tituloPelicula span").remove();
    $("#contenido p").remove();
}

function mostrarGrafico(){
    $("#contenido p").css('display','none');
    $("#contenido form").css('display','none');
    $('#chart_div').css('display','block');
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


/* Graficos */


// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');

    $.getJSON("JS/datosimagenes.json", function (json) {
        for (var i = 0; i > 10; i++) {
            data.addRows([[json.datosImagenes[i].titulo, 1],]);
        }
    });

    // Set chart options
    var options = {
        'title': 'Votaciones Mejor Pelicula del año',
        'width': 400,
        'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}



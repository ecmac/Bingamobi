var myLat, myLon;
var busLat, busLon;

var conn = new WebSocket("ws://localhost:8080/Processador/websocketendpoint");

conn.onclose = function(){
    var p = document.getElementById('mensagem');
    document.getElementById('buses').disabled = true;
    document.getElementById('botao').disabled = true;
    p.innerHTML = 'Erro na conexão. Recarregue a página.';
}

conn.onmessage = function(res){
    var msg = res.data;
    var posArray = msg.split(',');
    busLat = posArray[0];
    busLon = posArray[1];
}

var x = document.getElementById("loc");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else {
    x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    myLat = position.coords.latitude;
    myLon = position.coords.longitude;
    x.innerHTML = "Latitude: " + myLat +
    "<br>Longitude: " + myLon;
}

var linhas = ["Linha1", "Linha2"];

function initList(){

    var select = document.getElementById('buses');
    for(var i=0; i<linhas.length; i++){
        var option = document.createElement("OPTION");
        option.innerHTML = linhas[i];
        select.appendChild(option);
    }

}

function iniciar(){
    getLocation();
    initList();
}

function waitForBus(){

    var select = document.getElementById('buses');
    var bus = select.options[select.selectedIndex].text;

    var p = document.getElementById('mensagem');
    p.innerHTML = "Aguardando " + bus;
}

function isClose(){
    var p = document.getElementById('mensagem');
    p.innerHTML = "CHEGANDO";
    p.setAttribute('class', 'chegando');
}
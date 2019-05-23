var map;
function loadMapScenario() {
    map = new Microsoft.Maps.Map(document.getElementById('map'), {});
}

var linhas = [];
var dataQueue = [];

/* POPULAÇÃO "ALEATÓRIA" PRA TESTAR */
for(var u=0; u<2; u++){
    var idAux = "Linha" + u
    var lat = -8 + 0.05*Math.random();
    var lon = -34.9 + 0.05*Math.random();
    linhas[u] = {id: idAux, pos: {latitude: lat, longitude: lon, altitude: 0, altitudeReference: -1}};
    console.log(lat + "," + lon);
}

linhas[2] = {id: "teste", undefined}; 

function initFilter(){

    loadMapScenario();

    //ler para linhas

    for(var i=0; i<linhas.length; i++){
        var li = document.createElement("LI");
        var input = document.createElement("INPUT");
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', linhas[i].id);
        input.checked = false;
        li.appendChild(input);
        var span = document.createElement("SPAN");
        span.innerHTML = linhas[i].id;
        li.appendChild(span);
        document.getElementById('lista').appendChild(li);

        input.addEventListener('change', function(){
            togglePushpin(this.id, this.checked);
        });

        addPushpin(linhas[i].pos, linhas[i].id, false);
    }
}


function markAll(b){
    for(var i=0; i<linhas.length; i++){
        var checkbox = document.getElementById(linhas[i].id);
        var event = document.createEvent("HTMLEvents");
        checkbox.checked = b;
        event.initEvent('change', false, true);
        checkbox.dispatchEvent(event);
    }
}

function addPushpin(pos, id, show){

    /*var pos = {latitude: -8, longitude: -34, altitude: 0, altitudeReference: -1};*/

    var pushpin = new Microsoft.Maps.Pushpin(pos, null);
    pushpin.busID = id;
    map.entities.push(pushpin);
    pushpin.setOptions({visible: show});
}

function togglePushpin(id, b){
    for(var i=0; i<map.entities.getLength(); i++){
        var pushpin = map.entities.get(i);
        if(pushpin instanceof Microsoft.Maps.Pushpin && pushpin.busID==id){
            pushpin.setOptions({visible: b});
        }
    }
}

function movePushpin(id, posLatLong){

    for(var i=0; i<map.entities.getLength(); i++){
        var pushpin = map.entities.get(i);
        if(pushpin instanceof Microsoft.Maps.Pushpin && pushpin.busID==id){
            pushpin.setLocation(posLatLong);
        }
    }
}

/**
 * ATÉ AQUI
 * COM CERTEZA
 * FUNCIONAM
 */

function consumeQueue(){
    while(true){
        var jsonStr = dataQueue.shift();
        var json = JSON.parse(jsonStr);
        
    }
}

function createFilter(bus){
    
}
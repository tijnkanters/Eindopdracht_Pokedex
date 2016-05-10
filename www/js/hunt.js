$('#button_hunt').on('tap', function() {
    myPlace = null;
    getLocation();
});

$('#button_hunt2').on('tap', function() {
    myPlace = null;
    getLocation();
});

var myPlace;

// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onSuccess = function(position) {
    myPlace = { x: position.coords.latitude, y: position.coords.longitude };
    hunt();
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}


var cords = [
    { xt: 51.691731, yt: 5.292241, xb: 51.689666, yb: 5.296044, name: "Centraal Station" },//Centraal Station
    { xt: 51.689676, yt: 5.284956, xb: 51.686892, yb: 5.286989, name: "Avans" },//Avans
    { xt: 51.688394, yt: 5.307463, xb: 51.687560, yb: 5.309574, name: "Sint Jan" },//Sint Jan
    { xt: 51.701827, yt: 5.288650, xb: 51.700141, yb: 5.291638, name: "Brabant Hallen" },//Brabant Hallen
    { xt: 51.686905, yt: 5.271795, xb: 51.683423, yb: 5.279225, name: "Jeroen bosch" },//Jeroen bosch
    { xt: 51.689511, yt: 5.302342, xb: 51.688470, yb: 5.304600, name: "Marktplein" },//Marktplein
    { xt: 51.700062, yt: 5.258154, xb: 51.696719, yb: 5.263030, name: "Beatrixpark" },//Beatrixpark
    { xt: 51.677419, yt: 5.319756, xb: 51.673370, yb: 5.327322, name: "Petelaarse Schans" },//Petelaarse Schans
    { xt: 51.693486, yt: 5.296459, xb: 51.693116, yb: 5.297233, name: "Grass Company" },//Grass Company
    { xt: 51.633824, yt: 5.409716, xb: 51.632043, yb: 5.413037, name: "Lieseindse Straat" },//Lieseindse Straat
];

function getLocation() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function hunt() {
    var found = false;
    //    { xt: 51.693486, yt: 5.296459, xb: 51.693116, yb: 5.297233 },//Grass Company
    for (var i = 0; i < cords.length; i++) {
        if (myPlace.x <= cords[i].xt && myPlace.x >= cords[i].xb && myPlace.y >= cords[i].yt && myPlace.y <= cords[i].yb) {
            //correct cordinates catch pokemon
            navigator.vibrate(1000);
            var random = Math.floor(Math.random() * total_pokemons) + 1;
            var pokemon = pokelist[random];
            pokemon.x = myPlace.x;
            pokemon.y = myPlace.y;
            pokemon.caughtAt = cords[i].name;
            pokemon.id = random + 1;
            
            var myPokemon = localStorage.getArray("myPokemon");
            if (!myPokemon) {
                myPokemon = [];
            }
            myPokemon.push(pokemon);

            localStorage.setArray("myPokemon", myPokemon);
            
            alert("You caught a wild " + pokemon.name + " at " + cords[i].name + "!");//vervangen door iets gui
            found = true;
            loadMyPokemon();
            break;
        }
    }
    if (!found) {
        //not in correct coordinates
        alert("There are no pokemon near your position!");
    }
}
document.addEventListener("deviceready", setup, false);
var localStorage = window.localStorage;

// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
    
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}


// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onSuccess = function (position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var linksonderX = 51.687155;
    var linksonderY = 5.285308;

    var rechtsbovenX = 51.689461;
    var rechtsbovenY = 5.287856;


    if (latitude > linksonderX && latitude < rechtsbovenX && longitude > linksonderY && longitude < rechtsbovenY) {
        alert('Yes you are at school!');
    }
    else {
        alert('Go to school you little wenka');
    }
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);


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

Storage.prototype.setArray = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getArray = function (key) {
    return JSON.parse(this.getItem(key))
}

function setup() {
    loadPokedex();
}


$(document).on("swiperight", function () {
    console.log($.mobile.activePage);
    if ($.mobile.activePage.is("#pokemonDetail")) {
        $.mobile.navigate("#pokedex", { transition: "fade" });
    }
    else {
        $.mobile.activePage.find('#menuPanel').panel("open");
    }

});

$(document).on("pagehide", function (event) {
    clearDetails();
});

$('#pokedexListView').on('click', 'li a.pokemonListItem', loadPokemonDetails);
$('#label_hunt').on('click', hunt);
var total_pokemons = 721;
var poke_id = 0;
var pokelist = [];
var list = localStorage.getArray("list");

function loadPokedex() {
    var listContent = '';

    if (!list) {
        $.getJSON('http://pokeapi.co/api/v2/pokemon/?limit=' + total_pokemons, function (data) {

            $.each(data.results, function () {
                pokelist.push(this);
            });

            for (poke_id; poke_id < 50; poke_id++) {
                listContent += '<li><a href="#" class="pokemonListItem" rel="' + pokelist[poke_id].url + '">#' + (poke_id + 1) + ' ' + capitalizeFirstLetter(pokelist[poke_id].name) + '</a></li>';
            }

            debugger;
            localStorage.setArray("list", pokelist);
            $('#loading').hide();
            $('#pokedexListView').html(listContent);
            $('#pokedexListView').listview("refresh");
        });
    } else {
        $.getJSON('http://pokeapi.co/api/v2/pokemon/?limit=' + total_pokemons, function (data) {
            if (data.results.length != list.length) {
                localStorage.clear();
                localStorage.setArray("list", data.results);
                pokelist = data.results;
            } else {
                pokelist = list;
            }
            for (poke_id; poke_id < 50; poke_id++) {
                listContent += '<li><a href="#" class="pokemonListItem" rel="' + pokelist[poke_id].url + '">#' + (poke_id + 1) + ' ' + capitalizeFirstLetter(pokelist[poke_id].name) + '</a></li>';
            }
            $('#loading').hide();
            $('#pokedexListView').html(listContent);
            $('#pokedexListView').listview("refresh");
        });

    }

};

function hunt() {




    var place = { x: 51.693300, y: 5.297000 };//Grass Company test data TODO: get cords from geo
    var found = false;
    //    { xt: 51.693486, yt: 5.296459, xb: 51.693116, yb: 5.297233 },//Grass Company
    for (var i = 0; i < cords.length; i++) {
        if (place.x <= cords[i].xt && place.x >= cords[i].xb && place.y >= cords[i].yt && place.y <= cords[i].yb) {
            //correct cordinates catch pokemon

            var random = Math.floor(Math.random() * total_pokemons) + 1;
            var pokemon = pokelist[random];

            var imageUrl = "http://pokeunlock.com/wp-content/uploads/2015/01/" + random + ".png";

            alert("A wild " + pokemon.name + " appeared at " + cords[i].name + "!");//vervangen door iets gui
            found = true;
            break;
        }
    }
    if (!found) {
        //not in correct coordinates
        alert("There are no pokemon near you!");
    }
}

function formatPokemonId(id) {
    var r = "" + id;
    while (r.length < 3) {
        r = "0" + r;
    }
    return r;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadPokemonDetails() {

    var url = $(this).attr('rel');

    $.mobile.navigate("#pokemonDetail", { transition: "slide" });

    $.getJSON(url, function (data) {

        var pokemonId = formatPokemonId(data.id);
        var pokemonName = capitalizeFirstLetter(data.name);

        $('#pokemon_name').html(pokemonName);
        $('#internet_container').html('<a href="#" onclick="window.open(\'http://www.pokemon.com/us/pokedex/' + pokemonName + '\', \'_system\');">Check on the internet</a>');

        var imageUrl = "http://pokeunlock.com/wp-content/uploads/2015/01/" + pokemonId + ".png";

        $('#image_container').append('<img src="' + imageUrl + '" class="pokemon-image" />');
    });
};

function clearDetails() {

    $('#pokemon_name').html("Loading...");
    $('#image_container').empty();
    $('#internet_container').empty();
}

$(document).ready(function () {
    var win = $(window);

    // Each time the user scrolls
    win.scroll(function () {
        // End of the document reached?
        if ($(document).height() - win.height() == win.scrollTop()) {
            $('#loading').show();
            var addNumbers = poke_id + 50;
            for (poke_id; poke_id < addNumbers; poke_id++) {
                if (poke_id == total_pokemons) {
                    break;
                }
                $('#pokedexListView').append('<li><a href="#" class="pokemonListItem ui-btn ui-btn-icon-right ui-icon-carat-r" rel="' + pokelist[poke_id].url + '">#' + poke_id + ' ' + pokelist[poke_id].name + '</a></li>');

            }
            $('#loading').hide();
        }
    });
});
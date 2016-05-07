document.addEventListener("deviceready", setup, false);
var localStorage = window.localStorage;

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
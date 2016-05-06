document.addEventListener("deviceready", setup, false);

function setup() {
    loadCompendium();
}

$(document).on('click', '#open_menu', function () {
    $.mobile.activePage.find('#menu').panel("open");
});

$(document).on("swiperight", function () {
    $.mobile.activePage.find('#menu').panel("open");
});

var total_pokemons = 721;
var poke_id = 0;
var i = 0;
var pokelist = [];

function loadCompendium() {
	var listContent = '';



	$.getJSON('http://pokeapi.co/api/v2/pokemon/?limit=' + total_pokemons, function (data) {

		$.each(data.results, function () {
			pokelist.push(this);
		});
		console.log(pokelist);
		for (i = 0; i < 50; i++) {
			listContent += '<li><a href="#" class="pokemonListItem" rel="' + pokelist[i].url + '">#' + i + ' ' + pokelist[i].name + '</a></li>';
		}


		$('#compendiumListView').html(listContent);
		$('#compendiumListView').listview("refresh");
	});
};

$(document).ready(function () {
	var win = $(window);

	// Each time the user scrolls
	win.scroll(function () {
		// End of the document reached?
		if ($(document).height() - win.height() == win.scrollTop()) {
			var addNumbers=i+50;
			for (i; i < addNumbers; i++) {
				if(i==total_pokemons){
					break;
				}
				$('#compendiumListView').append('<li><a href="#" class="pokemonListItem" rel="' + pokelist[i].url + '">#' + i + ' ' + pokelist[i].name + '</a></li>');

			}
		}
	});
});
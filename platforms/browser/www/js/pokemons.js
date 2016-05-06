document.addEventListener("deviceready", setup, false);

function setup() {
    loadCompendium();
}

$(document).on("swiperight", function () {
    $.mobile.activePage.find('#menuPanel').panel("open");
});

var total_pokemons = 721;
var poke_id = 0;
var i = 1;
var pokelist = [];

function loadCompendium() {
	var listContent = '';



	$.getJSON('http://pokeapi.co/api/v2/pokemon/?limit=' + total_pokemons, function (data) {

		$.each(data.results, function () {
			pokelist.push(this);
		});
		console.log(pokelist);
		for (i; i < 51; i++) {
			listContent += '<li><a href="#" class="pokemonListItem" rel="' + pokelist[i].url + '">#' + i + ' ' + pokelist[i].name + '</a></li>';
		}

$('#loading').hide();
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
			$('#loading').show();
			var addNumbers=i+50;
			for (i; i < addNumbers; i++) {
				if(i==total_pokemons+1){
					break;
				}
				$('#compendiumListView').append('<li><a href="#" class="pokemonListItem ui-btn ui-btn-icon-right ui-icon-carat-r" rel="' + pokelist[i].url + '">#' + i + ' ' + pokelist[i].name + '</a></li>');

			}
			$('#loading').hide();
		}
	});
});
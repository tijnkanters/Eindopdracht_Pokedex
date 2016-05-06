document.addEventListener("deviceready", setup, false);

function setup(){
    loadCompendium();
}

$(document).on('click', '#open_menu', function(){   
    $.mobile.activePage.find('#menu').panel("open");       
});

$(document).on("swiperight", function() {
    $.mobile.activePage.find('#menu').panel("open");    
});

var total_pokemons = 721;
var poke_id = 0;

function loadCompendium() {
	var listContent = '';

	$.getJSON('http://pokeapi.co/api/v2/pokemon/?limit=' + total_pokemons, function(data) {

		$.each(data.results, function() {
			poke_id++;
			listContent += '<li><a href="#" class="pokemonListItem" rel="' + this.url + '">#' + poke_id + ' ' + this.name + '</a></li>';
		});

		$('#compendiumListView').html(listContent);
		$('#compendiumListView').listview("refresh");
	});
};
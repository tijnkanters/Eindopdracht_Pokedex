document.addEventListener("deviceready", setup, false);

function setup(){
    loadCompendium();
}

var poke_id = 0;

function loadCompendium() {
	var listContent = '';

	$.getJSON('http://pokeapi.co/api/v2/pokemon/?limit=100', function(data) {

		$.each(data.results, function() {
			poke_id++;
			listContent += '<li><a href="#" class="pokemonListItem" rel="' + this.url + '">#' + poke_id + ' ' + this.name + '</a></li>';
		});

		$('#compendiumListView').html(listContent);
		$('#compendiumListView').listview("refresh");
	});
};
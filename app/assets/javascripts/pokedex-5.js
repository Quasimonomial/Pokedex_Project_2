Pokedex.Views = {};

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();
    // this.$el = ;
  },

  addPokemonToList: function (pokemon) {
    this.$el.append(JST['pokemonListItem']({pokemon: pokemon}));
  },

  refreshPokemon: function (options) {
    this.collection.fetch({
      success: this.render.bind(this)
    })
  },

  render: function () {
    this.$el.empty();
    this.collection.each(this.addPokemonToList.bind(this));
  },

  selectPokemonFromList: function (event) {
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
  },

  refreshPokemon: function (options) {
  },

  render: function () {
  },

  selectToyFromList: function (event) {
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
  }
});

$(function () {
  var pokemonIndex = new Pokedex.Views.PokemonIndex();
  pokemonIndex.refreshPokemon();
  $("#pokedex .pokemon-list").html(pokemonIndex.$el);
});
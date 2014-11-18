Pokedex.Views = {};

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li": "selectPokemonFromList"
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
    
    var $target = $(event.currentTarget);
    var id = $target.data("id");
    var pokemon = this.collection.get(id);
    var pokeDetail = new Pokedex.Views.PokemonDetail({model: pokemon});
    pokeDetail.refreshPokemon();
    $('#pokedex .pokemon-detail').html(pokeDetail.$el);
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
  },

  refreshPokemon: function (options) {
    this.render();
    
    this.model.fetch({
      success: function(){
        this.render();
      }.bind(this)
    });
  },

  render: function () {
    //console.log(model);
    
    var content = JST['pokemonDetail']({pokemon: this.model})
    this.$el.html(content);
    
    this.model.toys().each(function(toy){
      var content = JST["toyListItem"]({toy: toy})
      this.$el.find('.toys').append(content);
        
    }.bind(this))
    
    // this.model.fetch({
    //   success: (function() {
    //     this.renderToysList(this.model.toys());
    //   }).bind(this)
    // });
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
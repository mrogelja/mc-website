Template.realisations.helpers({
  realisations: function() {
    return Realisations.find();
  },
  isModulo: function(mod, a){
    return a % mod == 0;
  },
  zoom: function(){
    return Session.get("selected_realisation") !== false;
  }
});

Template.realisation_thumb.events({
  "click [data-realisation]" : function(event){
    Session.set("selected_realisation", this._id);
    Router.go('realisation', { _id : this._id});
  }
});

Template.realisation_thumb.helpers({
  selected: function(){
    return this._id ==  Session.get("selected_realisation", this._id);
  }
});


Template.realisation.helpers({
});

var savingTimer;

Template.realisation.events({
  "click [data-edit]" : function(event){
    Meteor.call("setRealisationEditable", this._id, true);
  },
  "click [data-stopedit]" : function(event){
    Meteor.call("setRealisationEditable", this._id, false);
  },
  "blur [contenteditable]" : function(event){
    console.log('save');

    var value = $(event.currentTarget).text(),
      key = $(event.currentTarget).attr('data-is');

    Meteor.call("updateRealisation", this._id, key, _.unescape(value.trim()));
  }
});



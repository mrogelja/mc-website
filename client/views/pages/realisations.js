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


Template.realisation.rendered = function(){
};

Template.realisation.events({
  "click [data-edit]" : function(event){
    Meteor.call("setRealisationEditable", this._id, true);
  },
  "click [data-stopedit]" : function(event){
    Meteor.call("setRealisationEditable", this._id, false);
  },
  "blur [contenteditable]" : function(event){
    var value,
      key = $(event.currentTarget).attr('data-is'),
      type =  $(event.currentTarget).attr('data-type');

    if (type == 'rte') {
      value = $(event.currentTarget).find('textarea')[0].value;
    } else {
      value = $(event.currentTarget).text().trim();
    }

    Meteor.call("updateRealisation", this._id, key, value);
  },
  "click .corner.label" : function(event){
    $(event.currentTarget).popup({
      hoverable: true,
      position: 'top left'
    }).popup('show');
  }
});


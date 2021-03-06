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

Template.realisations.events({
  "click [data-add]" : function(){
    Meteor.call("addRealisation", function(err, data){
      Router.go('realisation', { _id : data});
    });
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
  $('.ui.checkbox').checkbox();
};

Template.realisation.helpers({
  editable : function(){
    return this.editable && Meteor.userId();
  },
  publishedAt: function(){
    return moment(this.published_at).format("YYYY-MM-DD");
  }
});

Template.realisation.events({
  "click [data-edit]" : function(event){
    Meteor.call("setRealisationEditable", this._id, true);
  },
  "click [data-stopedit]" : function(event){
    Meteor.call("setRealisationEditable", this._id, false);
  },
  "click [data-delete]" : function (event){
     var $this = this;
     $($(event.currentTarget).attr('data-modal')).modal({
       onDeny : function() {
         switch ($(this).attr("data-action")) {
           case "delete":
             Meteor.call("deleteRealisation", $this._id);
             Router.go('realisations');
             break;
         }
       }
     }).modal('show');
  },

  "change input[data-is]" : function(event){
    var value, key = $(event.currentTarget).attr('data-is');

    switch (event.currentTarget.type){
      case "checkbox":
        value = event.currentTarget.checked;
        break;

      case "date":
        value = new Date(event.currentTarget.value);
        break;

      default:
        value = event.currentTarget.value;
    }

    if (key) {
      console.log(value);
      Meteor.call("updateRealisation", this._id, key, value);
    }
  }
});


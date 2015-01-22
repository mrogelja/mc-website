Realisations = new Mongo.Collection('realisations');

Meteor.methods({
  setRealisationEditable: function(id, editable){
    check(id, String);
    check(editable, Boolean);

    Realisations.update(id, {$set: {editable : editable}});
  }
});
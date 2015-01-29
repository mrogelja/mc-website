Realisations = new Mongo.Collection('realisations');

Meteor.methods({
  setRealisationEditable: function(id, editable){
    check(id, String);
    check(editable, Boolean);

    Realisations.update(id, {$set: {editable : editable}});
  },

  updateRealisation: function(id, key, value){
    check(id, String);
    check(key, String);
    check(value, Match.Any);

    var updateSet = {};
    updateSet[key] = value;

    Realisations.update(id, {$set: updateSet});
  },

  addRealisation: function(){
    return Realisations.insert({
      title: "Nouvelle réalisation",
      img: "/images/wireframe/dummy.png",
      img_full: "/images/wireframe/dummy.png",
      editable: true
    });
  }
});
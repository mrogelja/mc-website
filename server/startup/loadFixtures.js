function loadFixture(fixtures, collection) {
  var i;

  for (i = 0; i < fixtures.length; i+= 1) {
    collection.insert(fixtures[i]);
  }
}

Meteor.startup(function () {
  if (Realisations.find().count() == 0){
    loadFixture(Fixtures['realisations'], Realisations);
  }

  if (Posts.find().count() == 0){
    loadFixture(Fixtures['posts'], Posts);
  }

  if (Pages.find().count() == 0){
    loadFixture(Fixtures['pages'], Pages);
  }
//
//  exec = Npm.require('child_process').exec;
//
//  exec('find . -name "*.*"', function(error,stdout,stderr){
//    console.log(error);
//    console.log(stdout);
//  });
});

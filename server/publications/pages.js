Meteor.publish("pages", function () {
    return Pages.find();
});

Meteor.methods({
  updatePage: function(id, key, value){
    check(id, String);
    check(key, String);
    check(value, Match.Any);

    var updateSet = {};
    updateSet[key] = value;

    Pages.update(id, {$set: updateSet});
  }
});
Meteor.publish("posts", function () {
  if (!this.userId) {
    return Posts.find({
      $and: [
        { published : true },
        { $or: [
          { published_at : { $exists : false }},
          { published_at : { $lt : new Date() } }
        ] }
      ]
    });

  } else {
    return Posts.find();
  }
});

Meteor.methods({
  setPostEditable: function(id, editable){
    check(id, String);
    check(editable, Boolean);

    Posts.update(id, {$set: {editable : editable}});
  },

  updatePost: function(id, key, value){
    check(id, String);
    check(key, String);
    check(value, Match.Any);

    var updateSet = {};
    updateSet[key] = value;

    Posts.update(id, {$set: updateSet});
  },

  addPost: function(){
    return Posts.insert({
      title: "Nouveau billet",
      resume: "Résumé...",
      img: "/images/wireframe/dummy.png",
      img_full: "/images/wireframe/dummy.png",
      editable: true,
      createdAt: new Date()
    });
  },

  deletePost: function(id){
    check(id, String);

    Posts.remove({_id: id});
  }
});
Meteor.subscribe('images');

Template.filesystem.helpers({
   images: function(){
     return Images.find();
   },

  selected: function(){
    return this._id == Session.get("selected_image");
  },

  isSelection: function(){
    return Session.get("selected_image") != false;
  }
});

Template.filesystem.rendered = function(){
  Session.set("selected_image", null);
};

Template.filesystem.events({
  'dropped #dropzone': function(event) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        console.log(fileObj);
        //If !err, we have inserted new doc with ID fileObj._id, and
        //kicked off the data upload using HTTP
      });
    });
  },
  'click tr.item' : function(event, tmpl){
    Session.set("selected_image", this._id);
  }
});
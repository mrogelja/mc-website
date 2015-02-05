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
  'click [data-action]' : function(event){
    var action = $(event.currentTarget).attr('data-action');

    switch (action) {
      case 'remove':
        $(event.currentTarget).html($(event.currentTarget).attr('data-confirm'));
        $(event.currentTarget).attr('data-action', 'confirm-remove');
        return false;
      case 'confirm-remove':
        Images.remove({_id: this._id});
        return false;
        break;
    }
  },
  'dropped .dropzone': function(event) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file);
    });
  },
  'change input[type="file"]': function(event){
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file);
    });
  },
  'click tr.item' : function(){
    Session.set("selected_image", this._id);
  },
  'click [data-upload]' : function(event){
     var input = $(event.currentTarget).find('input[type="file"]')[0];
     input.click();
  }
});
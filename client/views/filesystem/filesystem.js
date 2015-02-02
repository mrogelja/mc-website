Meteor.subscribe('images');

Template.filesystem.helpers({
   images: function(){
     console.log(Images.find().count());
     return Images.find();
   }
});

Template.filesystem.events({
  'dropped #dropzone': function(event, temp) {
    console.log('files dropped');
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        console.log(fileObj);
        //If !err, we have inserted new doc with ID fileObj._id, and
        //kicked off the data upload using HTTP
      });
    });
  }
});
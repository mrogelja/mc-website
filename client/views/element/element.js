Template.block_element.helpers({
  editable: function(){
    if (typeof this.editable != "undefined"){
      return this.editable;
    } else {
      return Session.get('page_editable');
    }
  },

  rte : function(){
    return this.type == 'rte';
  },

  image: function(){
    return this.type == 'image';
  },

  imagePickerId: function(){
    return this.blockId + "-image-picker";
  }
});

Template.block_element.rendered = function(){
  if(!this.data.updateMethod) {
    throw new Error("Vous devez déclarer le paramètre « updateMethod » ");
  }
}

Template.block_element.events({
   "blur [contenteditable='true']" : function(event){
     var value,
       type =  $(event.currentTarget).attr('data-type');

     if (type == 'image') {
       // On s'en occupe ailleurs.
       return;
     } else if (type == 'rte') {
       value = $(event.currentTarget).find('textarea')[0].value;
     } else {
       value = $(event.currentTarget).text().trim();
     }

     Meteor.call(this.updateMethod, this.blockId, this.key, value);
   },
   "click [data-changeimage]" : function(event){
     var $this = this;

     $($(event.currentTarget).attr('data-modal')).modal({
       onApprove : function() {
         var image = Images.findOne({_id : Session.get("selected_image")});

         if(image){
           Meteor.call($this.updateMethod, $this.blockId, $this.key, image.getFileRecord().url());
         }

         Session.set("selected_image", false);
       }
     }).modal('show');
   },

   "dropped .dropzone-image" : function(event){
     var $this = this;

     FS.Utility.eachFile(event, function(file) {
       Images.insert(file, function (err, fileObj) {
         var cursor = Images.find(fileObj._id);

         var liveQuery = cursor.observe({
           changed: function(newImage, oldImage) {
             if (newImage.isUploaded()) {
               liveQuery.stop();

               Meteor.call($this.updateMethod, $this.blockId, $this.key, newImage.url({brokenIsFine: true}));
             }
           }
         });
       });
     });
   }
});
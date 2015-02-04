Template.page_element.helpers({
  pageEditable: function(){
    return Session.get('page_editable');
  },

  rte : function(){
    return this.type == 'rte';
  },

  image: function(){
    return this.type == 'image';
  },

  imagePickerId: function(){
    return this.pageId + "-image-picker";
  }
});

Template.page_element.events({
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

     Meteor.call("updatePage", this.pageId, this.key, value);
   },
   "click [data-changeimage]" : function(event){
     var $this = this;

     $($(event.currentTarget).attr('data-modal')).modal({
       onApprove : function() {
         var image = Images.findOne({_id : Session.get("selected_image")});

         if(image){
           Meteor.call("updatePage", $this.pageId, $this.key, image.getFileRecord().url());
         }
       }
     }).modal('show');
   }
});
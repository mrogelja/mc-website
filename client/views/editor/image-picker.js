Template.image_picker.helpers({
  selectedImage: function(){
    return !!Session.get("selected_image");
  }
});

Template.image_picker.events({
   "click [date-imagechange]": function(){
     console.log($(event.currentTarget).attr('data-modal'));
     $($(event.currentTarget).attr('data-modal')).modal({
       onApprove : function() {
         var image = Images.findOne({_id : Session.get("selected_image")});

         if(image){
           tmpl.editor.replaceSelection('![' + alt + '](' + image.getFileRecord().url()+ ')');
         }
       }
     }).modal('show');

     $("input[name='image_alt']").on('change', function(event){
       alt = event.currentTarget.value;
     });
   }
});


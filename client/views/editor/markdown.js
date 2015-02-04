Template.markdown_editor.rendered = function() {
  this.textarea =  this.find("textarea");
  this.editor   =  CodeMirror.fromTextArea(this.textarea, {
    lineNumbers: false,
    lineWrapping: true,
    mode: "markdown"
  });

  var textarea = this.textarea;

  this.editor.on("change", function(doc) {
    textarea.value = doc.getValue();
  });

  this.$('.ui.sticky').each(function(){
    $(this).sticky({
       context : $(this).parent(".editor")
    });
  });
};


Template.markdown_editor.events({
  "click .shortcuts .icon" : function(event, tmpl){
    var selection = tmpl.editor.getSelection(), alt;

    switch ($(event.currentTarget).attr('data-do')) {
      case 'bold':
        selection = "**" + selection + "**";
        break;
      case 'italic':
        selection = "*" + selection + "*";
        break;
      case 'strikethrough':
        selection = "~~" + selection + "~~";
        break;
      case 'quote':
        selection = ">" + selection;
        break;
      case 'orderedlist':
        selection = " * " + selection.replace(/\n/g, "\n * ");
        break;
      case 'image':
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
        break;
    }

    tmpl.editor.replaceSelection(selection);
    event.stopPropagation();
    return false;
  }
});
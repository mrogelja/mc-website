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
}


Template.markdown_editor.events({
  "click .shortcuts .icon" : function(event, tmpl){
    var selection = tmpl.editor.getSelection();

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
        var $this = this;
        $($(event.currentTarget).attr('data-modal')).modal({
          onDeny : function() {
            switch ($(this).attr("data-action")) {
              case "delete":
                Meteor.call("deletePost", $this._id);
                Router.go('blog');
                break;
            }
          }
        }).modal('show');
        break;
    }

    tmpl.editor.replaceSelection(selection);
  }
});
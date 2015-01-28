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
        console.log()
        selection = " * " + selection.replace(/\n/g, "\n * ");
        break;
    }

    tmpl.editor.replaceSelection(selection);
  }
});
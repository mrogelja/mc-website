Template.page_element.helpers({
  pageEditable: function(){
    return Session.get('page_editable');
  }
});

Template.page_element.events({
   "blur [contenteditable='true']" : function(event){
     var value,
       type =  $(event.currentTarget).attr('data-type');

     if (type == 'rte') {
       value = $(event.currentTarget).find('textarea')[0].value;
     } else {
       value = $(event.currentTarget).text().trim();
     }

     Meteor.call("updatePage", this.pageId, this.key, value);
   }
});
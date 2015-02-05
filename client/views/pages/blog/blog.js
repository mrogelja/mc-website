Template.blog.helpers({
  posts: function() {
    return Posts.find();
  }
});

Template.blog.events({
  "click [data-add]" : function(){
    Meteor.call("addPost", function(err, data){
      Router.go('post', { _id : data});
    });
  }
});


Template.post_thumb.events({
  "click [data-post]" : function(event){
    Router.go('post', { _id : this._id});
  }
});



Template.post.rendered = function(){
  $('.ui.checkbox').checkbox();
};

Template.post.helpers({
  editable : function(){
    return this.editable && Meteor.userId();
  },
  publishedAt: function(){
    return moment(this.published_at).format("YYYY-MM-DD");
  }
});

Template.post.events({
  "click [data-edit]" : function(event){
    Meteor.call("setPostEditable", this._id, true);
  },
  "click [data-stopedit]" : function(event){
    Meteor.call("setPostEditable", this._id, false);
  },
  "click [data-delete]" : function (event){
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
  },

  "change input[data-is]" : function(event){
    var value, key = $(event.currentTarget).attr('data-is');

    switch (event.currentTarget.type){
      case "checkbox":
        value = event.currentTarget.checked;
        break;

      case "date":
        value = new Date(event.currentTarget.value);
        break;

      default:
        value = event.currentTarget.value;
    }

    if (key) {
      Meteor.call("updatePost", this._id, key, value);
    }
  }
});


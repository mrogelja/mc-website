////
// Route HOME
////
Router.route('/', { name: 'home' });

////
// Route REALISATIONS
////

Router.route('/realisations', {
  name: 'realisations',
  waitOn: function() {
    return Meteor.subscribe('realisations');
  },
  onAfterAction: function() {
    Session.set("selected_realisation", false);
    Session.set("page_title", "");
  }
});

Router.route('/realisations/:_id', {
  name: 'realisation',
  waitOn: function() {
    return Meteor.subscribe('realisations');
  },
  data: function () {
    return Realisations.findOne({_id: this.params._id});
  },
  onAfterAction: function(){
    if(this.data()){
      SEO.set({
        title: this.data().title,
        meta: {
          'description': this.data().resume
        }
      });
    }
  }
});

////
// Route BLOG
////

Router.route('/blog', {
  name: 'blog',
  waitOn: function() {
    return Meteor.subscribe('posts');
  },
  onAfterAction: function() {
    Session.set("page_title", "");
  }
});

Router.route('/blog/:_id', {
  name: 'post',
  waitOn: function() {
    return Meteor.subscribe('posts');
  },
  data: function () {
    return Posts.findOne({_id: this.params._id});
  },
  onAfterAction: function(){
    if(this.data()){
      SEO.set({
        title: this.data().title,
        meta: {
          'description': this.data().resume
        }
      });
    }
  }
});

Router.route('/contact', {
  name: 'contact'
});






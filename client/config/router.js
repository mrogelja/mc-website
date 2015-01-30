Meteor.subscribe('pages');

Router.onBeforeAction(function() {
  var page = Pages.findOne({route : this.route.getName()});

  if (page) {
    SEO.set(page.seo);
    this.state.set('page', page);
  }

  Session.set("page_editable", false);

  this.next();
});

Router.configure({
  layoutTemplate:  'basicLayout',
  loadingTemplate: 'loading'
});

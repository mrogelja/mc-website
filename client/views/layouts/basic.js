Template.basicLayout.rendered = function(){
  var currentPath = Router.current().route.path(this);

  var selectedAnchor = this.$('header nav ul li a[href="'+currentPath+'"]');

  Meteor.defer(function(){
    Session.set("nav_underline_width", selectedAnchor.width() + "px");
    Session.set("nav_underline_left", selectedAnchor.position().left + "px");
  });
};

Template.basicLayout.events({
  'click nav ul li a' : function(event){
    var anchor = $(event.target);
    Session.set("nav_underline_width", anchor.width() + "px");
    Session.set("nav_underline_left", anchor.position().left + "px");
  }
});

Template.basicLayout.helpers({
  navUnderlineWidth: function () {
    return Session.get("nav_underline_width");
  },
  navUnderlineLeft:  function(){
    return Session.get("nav_underline_left");
  },
  pageTitre: function(){
    var seo = SeoCollection.findOne({route_name : Router.current().route.getName(this)}) ;

    if (seo) {
      return seo.page_title;
    } else {
      return Session.get('page_title');
    }
  }
});
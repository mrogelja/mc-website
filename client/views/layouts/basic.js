Template.basicLayout.rendered = function(){
  var currentPath = Router.current().route.path(this);

  var selectedAnchor = this.$('header nav ul li a[href="'+currentPath+'"]');

  setTimeout(function(){
    Session.set("nav_underline_width", selectedAnchor.width() + "px");
    Session.set("nav_underline_left", selectedAnchor.position().left + "px");
  }, 100);
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
    return Session.get("page_title");
  }
});
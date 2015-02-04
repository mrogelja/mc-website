var ANIMATION_DURATION = 300;
Template.basicLayout.rendered = function(){
  var currentPath = Router.current().route.path(this);

  var selectedAnchor = this.$('header nav ul li a[href="'+currentPath+'"]');

  Meteor.defer(function(){
    if(selectedAnchor.length > 0) {
      Session.set("nav_underline_width", selectedAnchor.width() + "px");
      Session.set("nav_underline_left", selectedAnchor.position().left + "px");
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = "//assets.pinterest.com/js/pinit.js";
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, "script", "twitter-wjs");
  });
};

Template.basicLayout.events({
  'click nav ul li a' : function(event){
    var anchor = $(event.target);
    Session.set("nav_underline_width", anchor.width() + "px");
    Session.set("nav_underline_left", anchor.position().left + "px");
  },
  "click [data-page-edit]": function() {
    Session.set("page_editable", true);
  },
  "click [data-page-stopedit]": function() {
    Session.set("page_editable", false);
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
    var page = Pages.findOne({route : Router.current().route.getName()}) ;

    if (page) {
      return page.title;
    } else {
      return Session.get('page_title');
    }
  },
  pageEditable: function(){
    return Session.get("page_editable");
  },
  page: function(){
    return Iron.controller().state.get('page');
  }
});
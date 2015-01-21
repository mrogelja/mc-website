Router.route('/', {
  name: 'home',
  onAfterAction: function(){
    Session.set("page_title", "Accueil");
    SEO.set({
      title: "Accueil",
      meta: {
        'description': "Bienvenue sur le site de MC."
      }
    });
  }
});

Router.route('/realisations', {
  name: 'realisations',
  waitOn: function() {
    return Meteor.subscribe('realisations');
  },
  onAfterAction: function(){
    Session.set("page_title", "Réalisations");
    SEO.set({
      title: "Réalisations",
      meta: {
        'description': "Bienvenue sur le site de MC."
      }
    });
  }
});

Router.route('/blog', {
  name: 'blog',
  onAfterAction: function(){
    Session.set("page_title", "Blog");
    SEO.set({
      title: "Blog",
      meta: {
        'description': "Bienvenue sur le site de MC."
      }
    });
  }
});

Router.route('/contact', {
  name: 'contact',
  onAfterAction: function(){
    Session.set("page_title", "Contact");
    SEO.set({
      title: "Contact",
      meta: {
        'description': "Bienvenue sur le site de MC."
      }
    });
  }
});




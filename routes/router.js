////
// Route HOME
////

Router.route('/', { name: 'home' });

if (Meteor.isServer) {
  SeoCollection.update(
    {
      route_name: 'home'
    },
    {
      $set: {
        route_name: 'home',
        title: 'Accueil',
        page_title : 'Hello !',
        meta: {
          'description': 'Bienvenue sur le site de MC.'
        }
      }
    },
    {
      upsert: true
    }
  );
}
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

if (Meteor.isServer) {
  SeoCollection.update(
    {
      route_name: 'realisations'
    },
    {
      $set: {
        route_name: 'realisations',
        title: 'Réalisations',
        page_title : 'Mes réalisations',
        meta: {
          'description': 'Toutes mes réalisations'
        }
      }
    },
    {
      upsert: true
    }
  );
}

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
    var r = Meteor.subscribe('posts');
    console.log(r);
    return r;
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

if (Meteor.isServer) {
  SeoCollection.update(
    {
      route_name: 'blog'
    },
    {
      $set: {
        route_name: 'blog',
        title: 'Blog',
        page_title : 'Le blog',
        meta: {
          'description': 'Tout ce qui me passe dans les doigts'
        }
      }
    },
    {
      upsert: true
    }
  );
}

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

if (Meteor.isServer) {
  SeoCollection.update(
    {
      route_name: 'contact'
    },
    {
      $set: {
        route_name: 'contact',
        title: 'Contact',
        page_title : 'Me contacter',
        meta: {
          'description': 'Tout ce qu\'il faut pour me contacter'
        }
      }
    },
    {
      upsert: true
    }
  );
}






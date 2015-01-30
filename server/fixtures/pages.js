// The "||" notation doesn't work yet
Fixtures = typeof Fixtures !== "undefined" ? Fixtures : {};

Fixtures.pages = [
  {
    "route_name" : "home",
    "title" : "Hello !",
    "elements"  : {
      "img"   : "/images/home/rabbit.jpg",
      "presentation" : "Bonjour, moi c'est Marie-Claire."
    },
    "seo": {
      title: 'Accueil',
      meta: {
        'description': 'Bienvenue sur le site de MC.'
      }
    }
  },
  {
    "route" : "realisations",
    "title" : "Mes créations",
    "elements"  : {},
    "seo": {
      title: 'Réalisations & créations',
      meta: {
        'description': 'Toutes mes réalisations'
      }
    }
  },
  {
    "route" : "blog",
    "title" : "Le blog",
    "elements"  : {},
    "seo": {
      title: 'Le blog',
      meta: {
        'description': 'Tout ce qui me passe dans les doigts'
      }
    }
  },
  {
    "route" : "contact",
    "title" : "Me contacter",
    "elements"  : {},
    "seo": {
      title: 'Le blog',
      meta: {
        'description': "Tout ce qu'il faut pour me contacter"
      }
    }
  }
];

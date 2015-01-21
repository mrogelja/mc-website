Template.realisations.helpers({
  realisations: function() {
    return Realisations.find();
  },
  isModulo: function(mod, a){
    return a % mod == 0;
  }
});

Template.realisation.events({
  "click a[data-realisation]" : function(event){
    $('[data-realisation]').each(function(){
      if (this != event.currentTarget) {
        $(this).hide();
      }
    });

    var id = this._id;
    setTimeout(function(){
      Router.go('realisation', { _id : id});
    }, 1000);

  }
})
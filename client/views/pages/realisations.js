Template.realisations.helpers({
  realisations: function() {
    return Realisations.find();
  },
  isModulo: function(mod, a){
    return a % mod == 0;
  }
});
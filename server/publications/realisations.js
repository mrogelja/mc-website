Meteor.publish("realisations", function () {
//  Meteor._sleepForMs(1000);
  if (!this.userId) {
    return Realisations.find({
      $and: [
        { published : true },
        { $or: [
          { published_at : { $exists : false }},
          { published_at : { $lt : new Date() } }
        ] }
      ]
    });

  } else {
    return Realisations.find();
  }
});
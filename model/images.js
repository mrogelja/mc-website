Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/upload"})]
});

Images.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return !!userId; //(userId === doc.metadata.owner);
  },
  remove: function(userId, doc) {
    return false;
  },
  download: function(userId) {
    return !!userId;
  }
});
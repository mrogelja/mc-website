Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {
    path: typeof process != "undefined" ? process.env.UPLOAD_DIR || "~/upload" : "~/upload"
  })]
});

Images.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return !!userId; //(userId === doc.metadata.owner);
  },
  remove: function(userId, doc) {
    return !!userId;
  },
  download: function(userId) {
    return !!userId;
  }
});
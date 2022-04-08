module.exports = function(app) {
  app.dataSources.itoloh.automigrate('Content', function(err) {
    if (err) throw err;

    app.models.Content.create([{
      userId: 1,
      fileName: 'c://',
      kOfContent: "photo",
      caption: "mantap"
    }, {
      userId: 1,
      fileName: 'c://',
      kOfContent: "video",
      caption: "waduh"
    }], function(err, contents) {
      if (err) throw err;

      console.log('Models created: \n', contents);
    });
  });
};
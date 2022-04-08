module.exports = function(app) {
  app.dataSources.itoloh.automigrate('Pengguna', function(err) {
    if (err) throw err;

    app.models.Pengguna.create([{
      username: "kurniawan",
      email: "kurniawan@gmail.com",
      password: "123456"
    }, {
      username: "prima",
      email: "prima@gmail.com",
      password: "123456"
    }], function(err, penggunas) {
      if (err) throw err;

      console.log('Models created: \n', penggunas);
    });
  });
};
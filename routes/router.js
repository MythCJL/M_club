module.exports = function(app) {
  app.use('/', require('./index'));
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/logout', require('./logout'));
  app.use('/create', require('./create'));
  app.use('/topic', require('./topic'));
  app.use('/user', require('./user'));
  app.use('/edit', require('./edit'));

  app.use(function(req, res) {
    if(!res.headerSent) {
      res.status(404).render('error');
    }
  });
};
module.exports = {
  port: 3000,
  session: {
    secret: 'club',
    key: 'club',
    maxAge: 2592000000
  },
  mongodb: {
    url: 'mongodb://localhost:27017/club'
  }
};
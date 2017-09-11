module.exports = {
	port: 3000,
	session: {
		secret: 'community',
		key: 'community',
		maxAge: 2592000000
	},
	mongodb: {
		url: 'mongodb://localhost:27017/community'
	}
};
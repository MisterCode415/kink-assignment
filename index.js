const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const path = require('path');
const winston = require('winston');
const bodyParser = require('body-parser');

const PORT = 3000;

const logger = winston.createLogger({
	transports: [new (winston.transports.Console)()],
});

const app = express();

// Static assets.
app.use(express.static(path.join(__dirname, 'public')));

// allow for POST data to be parsed
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logger.
app.use(morgan(':method :url :status :response-time ms', {
	stream: {
		write: message => logger.info(message.trim()),
	},
}));

// Configure templating engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');
nunjucks.configure(app.get('views'), {
	autoescape: true,
	express: app,
});

app.get('/', (request, response) => {
	const options = { pageTitle: 'Homepage' };
	return response.render('home', options);
});

app.post('/', (request, response) => {
	// ES6 doesn't support spreading so this was failing ESLINT
	// const options = { pageTitle: 'Homepage', formData: { ...request.body, timestamp: new Date().toDateString() } };	
	const options = { pageTitle: 'Homepage', formData: { username: request.body.username, comment: request.body.comment, timestamp: new Date().toDateString() } };	
	return response.render('home', options);
});

app.listen(PORT, () => {
	logger.log({ level: 'info', message: `listening on ${PORT}` });
});

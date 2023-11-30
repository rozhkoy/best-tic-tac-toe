require('dotenv').config();
const express = require('express');
const sequelize = require('./database/databaseConection');
const databaseModels = require('./database/models');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const admin = require('firebase-admin');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const ws = require('ws');
const cookieParser = require('cookie-parser');
const routerV1 = require('./routes/v1/rest/index');
const logger = require('morgan');
const swaggerFile = require('./swagger-output.json');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173',
	})
);
admin.initializeApp({
	credential: admin.credential.cert({
		type: process.env.TYPE,
		project_id: process.env.PROJECT_ID,
		private_key_id: process.env.PRIVATE_KEY_ID,
		private_key: process.env.PRIVATE_KEY,
		client_email: process.env.CLIENT_EMAIL,
		client_id: process.env.CLIENT_ID,
		auth_uri: process.env.AUTH_URI,
		token_uri: process.env.TOKEN_URI,
		auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
		universe_domain: process.env.UNIVERSE_DOMAIN,
	}),
});
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api/v1', routerV1);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));

app.use((_, res, __) => {
	res.status(404).json({
		status: 'error',
		code: 404,
		data: 'Not found',
	});
});

app.use((err, _, res, __) => {
	console.log(err.stack);
	res.status(500).json({
		status: 'fail',
		code: 500,
		message: err.message,
		data: 'Internal Server Error',
	});
});

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync({ alter: true });
		const server = app.listen(PORT, () => console.log(`Port: ${PORT}`));
		app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));

		const webSocketServer = new ws.Server({ noServer: true });
		webSocketServer.on('connection', (socket, req) => webSocketListener(webSocketServer, socket, req));
		server.on('upgrade', (request, socket, head) => {
			webSocketServer.handleUpgrade(request, socket, head, (socket) => {
				webSocketServer.emit('connection', socket, request);
			});
		});
	} catch (e) {
		console.log(e);
	}
};

start();

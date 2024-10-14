import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// import swaggerUi from 'swagger-ui-express';
// import fs from 'node:fs';
import expressOasGenerator from 'express-oas-generator';

import router from './routes.js';

const server = express();

expressOasGenerator.handleResponses(app, {});

server.use(morgan('tiny'));

server.use(express.json());

server.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
  })
);

server.use('/api', router);

// const swaggerJson = JSON.parse(fs.readFileSync('openapi.json'));

// server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

expressOasGenerator.handleRequests();

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default server;

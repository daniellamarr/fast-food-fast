import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import Route from './routes/route';

const app = express();

const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

Route(app);

const port = process.env.PORT || 6060;

const server = app.listen(port);

export default server;

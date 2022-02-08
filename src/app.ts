require('express-async-errors');
import helmet from 'helmet';
import { errorLogger, infoLogger } from './middleware/logger';

import compression from 'compression';
import express from 'express';
import { Application } from 'express';
import {jokesRoute } from './routes/jokes.route'
import * as memoryMongo from './store/inMemoryMongoHandler'
import config from 'config';

const port = config.port || 3000;
const app: Application = express();

app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/jokes', jokesRoute);

app.use(errorLogger);
infoLogger('config: ' + JSON.stringify(config))
if(config.mongoConnection.useInMemoryMongo) {
    infoLogger('using in memory db');
    memoryMongo.connect().then(() => {
        memoryMongo.initializeWithMockJokes().then(() => {
            infoLogger('initialization completed.')
        })
    });
}


app.listen(port, () => {
    infoLogger(`app listening on localhost:${port}`)
    global.root = `localhost:${port}`
})
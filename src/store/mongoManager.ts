const config = require('config');
import mongoose from 'mongoose';
import inMemoryMongo from './inMemoryMongoHandler';
import {MongoConenctionOptions} from './models/mognoConnectionOptions.model';
import { JokeSchema } from './schemas/joke.schema';

//import degli schema

// import * as anagraficaSchemas from './schemas/anagrafica.schema';
const connOptions = new MongoConenctionOptions(config.mongoConnection);
const useInMemoryConnection = connOptions.useInMemoryMongo;
const mongoConnectionString: string = connOptions.connectionString;
const mongoDbName: string = connOptions.dbName;
const dbAuthSource: string = connOptions.authSource;
const dbUser: string = connOptions.user;
const dbPass: string = connOptions.password;
const { infoLogger } = require('../middleware/logger');
const mongoRetryDelay: number = config.mongoRetryDelay || 50000;

function connectMongoose() {
    if(useInMemoryConnection) {
        inMemoryMongo.connect();
    }  
    else {
        mongoose.connect(mongoConnectionString + mongoDbName, {
            authSource: dbAuthSource,
            user: dbUser,
            pass: dbPass   
        });
    }
  }
  
  if (process.env.NODE_ENV !== 'test') {    
    infoLogger(mongoConnectionString);
    const db: mongoose.Connection = mongoose.connections[0];
  
    db.on('connecting', function () {
      infoLogger('connecting to MongoDB...');
    });
    db.on('error', function (error) {
      infoLogger('Error in MongoDb connection: ' + error);
      setTimeout(() => {
        connectMongoose();
      }, mongoRetryDelay);
    });
    db.on('connected', function () {
      infoLogger('MongoDB: connected to: ' + mongoDbName);
      if (dbUser) {
        infoLogger('user: ' + dbUser);
      }
    });
    db.once('open', function () {
      infoLogger('MongoDB: connection opened!');
    });
    db.on('reconnected', function () {
      infoLogger('MongoDB: reconnected to ' + mongoDbName);
    });
    db.on('disconnected', function () {
      infoLogger('MongoDB: disconnected from ' + mongoDbName);
    });
    //connectMongoose();
  }
  

  const MongoJokes: mongoose.Model<any> = mongoose.model(
    'MongoJokes',
    JokeSchema,
    'MongoJokes',
  );


  export {MongoJokes}
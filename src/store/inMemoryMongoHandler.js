const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const {InfoLogger} = require('../middleware/logger.ts');
const { infoLogger, errorLogger } = require('../middleware/logger');
const {readJokes} = require('./mockup/jsonMockReader');
const jokeService = require('../services/jokes.service');

let mongod;



// Connect to the in-memory database.
const connect = async () => {
  if(!mongod) {
    mongod = await MongoMemoryServer.create();
  }
  const uri = await mongod.getUri();
  

  const mongooseOpts = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  };
  try{
      await mongoose.connect(uri, mongooseOpts);
      infoLogger('connected to in memory mongodb.')
  }
  catch (e){
    errorLogger(e);
  }
};

const closeConnection = async () => {
    await mongoose.connection.close();
}


// Drop database, close the connection and stop mongod.
const closeDatabase = async () => {
  await mongoose.connection.close();
  await mongod.stop();
};

// Remove all the data for all db collections.
 
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];

    await collection.deleteMany();
  }
};
const initializeWithMockJokes = async () => {
  const jokes= await readJokes();
  await jokeService.insertManyJokes(jokes);
}

module.exports = {
  connect,
  closeConnection,
  closeDatabase,
  clearDatabase,
  initializeWithMockJokes
};

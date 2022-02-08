module.exports = {
  name: 'Jokes App - Development',
  port: 3001,
  mongoConnection: {
    useInMemoryMongo: true,
    connectionString:'localhost:2017',
    dbName: 'jokes',
    authSource:'',
    user:'',
    password:''
  }
 };

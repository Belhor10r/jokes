export class MongoConenctionOptions {
    constructor(item?: any) {
        if (item) {
          for (const key of Object.keys(this)) {
            this[key] = item[key];
          }
        }
      }
    useInMemoryMongo:boolean = true;
    connectionString:string= 'localhost:2017';
    dbName:string = 'defaultDB';
    authSource:string;
    user:string;
    password:string;

}
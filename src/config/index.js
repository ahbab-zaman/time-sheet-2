const configs = {

    nodeEnv: process.env.NODE_ENV || 'development',
    serverPort: process.env.SERVER_PORT || 1001,

    
    databasePort: process.env.DATABASE_PORT,
    databaseHost: process.env.DATABASE_HOST,
    databaseUsername: process.env.DATABASE_USERNAME,
    databasePassword: process.env.DATABASE_PASSWORD,
    databaseName: process.env.DATABASE_NAME,
    
  };
  
module.exports = configs;
  
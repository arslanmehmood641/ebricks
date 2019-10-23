# changes in serverName.json

"database": {
      "host": "mesmer-test-db-kwtli.mongodb.net",
      
      "port": "27017",
      
      "userName": "mesmer",
      
      "password": "aPpSiGhT!401",
      
      "dbName": "qa-test-harness",
      
      "connectionType": "replica"
    }

username,password,hostname,dbname and connectionType will change according to connection string.

## changes in database.json file 

let dbConnectionURL;

    if (dbConfig.get('connectionType') === 'directed') {

      dbConnectionURL = `mongodb://${dbConfig.get('host')}:${dbConfig.get('port')}/${dbConfig.get('dbName')}`;

    } else {

      dbConnectionURL = `mongodb+srv://${dbConfig.get('userName')}:${dbConfig.get('password')}@${dbConfig.get('host')}/${dbConfig.get('dbName')}`;

    }


## update mongoose packege

"mongoose": "4.13.7" replace it with "mongoose": "^5.7.6"

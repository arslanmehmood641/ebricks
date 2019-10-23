# changes in serverName.json

"database": {
      "host": "mesmer-test-db-kwtli.mongodb.net",
      "port": "27017",
      "userName": "mesmer",
      "password": "aPpSiGhT!401",
      "dbName": "qa-test-harness",
      "connectionType": "replica"
    }

username,password,hostname and dbname will change according to connection string.

## changes in database.json file 

let dbConnectionURL;
    if (dbConfig.get('connectionType') === 'directed') {

    const dbConnectionURL = `mongodb://${dbConfig.get('host')}:${dbConfig.get('port')}/${dbConfig.get('dbName')}`;
      dbConnectionURL = `mongodb://${dbConfig.get('host')}:${dbConfig.get('port')}/${dbConfig.get('dbName')}`;

    } else {

      dbConnectionURL = `mongodb+srv://${dbConfig.get('userName')}:${dbConfig.get('password')}@${dbConfig.get('host')}/${dbConfig.get('dbName')}`;

    }

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# boostPT-api

INSTRUCTIONS FOR RUNNING API

1. Install Postgresql and create a root account with administrative privileges
 - Ubuntu instructions:
    $ sudo apt-get update
    $ sudo apt-get install postgresql postgresql-contrib 

    Access the interactive prompt: 
    $ psql [database]

    Create a root user if it does not exist:
    createuser root

    Set password for root:
      \password root
      *This may need to be 4 or more characters long!

    You should be all set to connect your server to the database with no administrative restrictions

2. Build ENV File
 - Run 'npm run buildEnv' in the terminal from 
   the root directory of BoostPT-api. An env file should 
   appear in the root directory. 

3. Add your password to Env
 - in .env, add your root password to Local_Password.

4. Run setup script
 - In the root directory, run 'npm run setup'

5. Run database setup script
 - From the root directory, run 'npm run db:setup:rest-server'. 
   You should see a message saying that you have succesfully 
   connected to the postgres database

6. Run npm start
 - From the root directory, run 'npm start'. You should 
   see a successful connection to port 8000 and
   a successful connection to postgres boostpt 

7. Ethereum contract setup
 - Windows: cd into solidity folder from root directory, run ../node_modules/.bin/truffle.cmd compile
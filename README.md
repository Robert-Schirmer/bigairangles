# Setup

## Database connection:

Use the `db.sql` script to setup a local database and configure your `.env` file to point to it.

Or connect to the remote database

Login to gcloud CLI using `gcloud config set account ${account_email}`. Select the correct cloud project using `gcloud config set account ${account_email}`. Download the gcloud proxy script to connect to the MySQL cloud instance and start it before running the project https://cloud.google.com/sql/docs/mysql/connect-admin-proxy?authuser=4#install.


## Install project dependencies and run:
```sh
npm install
npm run dev
```

# Env Deploy

Env is stored in secrets as a base64 encoded string. Create the string from a local `.env` file by running `npm run base64-env` and save the output from the file `.env.base64` to the `ENV_FILE` secret.

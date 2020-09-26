<img align="right" width="100" height="100" src="assets/illustration.svg">

# Toolbox
A toolbox containing various tools to help with daily / repetitive tasks.

## MySQL
MySQL is a toolbox with the tools to more easily perform the daily / repetitive tasks through a single command rather than an copy-pasting etc.

### Size
Get the size of a local or remote database, this is determined by summing the `data_length` and `index_length` columns in `information_schema.TABLES` and transforming it into a human-readable format.

`toolbox mysql size [-h|--host=127.0.0.1] [-P|--port=3306] <-u|--username> <-p|--password> <database>`

If you want to get the size of a remote database which is only accessible over SSH you can use the `--ssh-host`, `--ssh-port` and `--ssh-username` options to open an SSH tunnel through which the connection with the remote database will be set up.

### Dump
Perform a database dump of a local or remote database.

`toolbox mysql dump [-h|--host=127.0.0.1] [-P|--port=3306] <-u|--username> <-p|--password> <database>`

If you want to perform a database dump of a remote database which is only accessible over SSH you can use the `--ssh-host`, `--ssh-port` and `--ssh-username` options to open an SSH tunnel through which the connection with the remote database will be set up.

If you want to import the database dump directly as a database locally you are in luck, the database dump is piped into stdout so you can easily pipe yourself.

`toolbox mysql dump [-h|--host=127.0.0.1] ... | mysql -h 127.0.0.1 -u <username> -p<password> <database>`

Or write it to a file after compressing it?

`toolbox mysql dump [-h|--host=127.0.0.1] ... | gzip > our_database.sql.gz`

## Ideas
- Database Tasks
  - Dumping a local / remote database to a file
  - Synchronizing a local / remote database with another local / remote database
  - Anonymizing a database (either when dumping or synchronizing)

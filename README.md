# Toolbox
A toolbox containing various tools to help with daily / repetitive tasks.

## MySQL
MySQL is a toolbox with the tools to more easily perform the daily / repetitive tasks through a single command rather than an copy-pasting etc.

### Size
Get the size of a local or remote database, this is determined by summing the `data_length` and `index_length` columns in `information_schema.TABLES` and transforming it into a human-readable format.

`toolbox mysql size [-h|--host=127.0.0.1] [-P|--port=3306] <-u|--username> <-p|--password> <database>`

If you want to get the size of a remote database which is only accessible over SSH you can use the `--ssh-host`, `--ssh-port` and `--ssh-username` options to open an SSH tunnel through which the connection with the remote database will be set up.

## Ideas
- Database Tasks
  - Dumping a local / remote database to a file
  - Synchronizing a local / remote database with another local / remote database
  - Anonymizing a database (either when dumping or synchronizing)
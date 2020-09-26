import executeQuery from './execute-query';
import getDatabaseSize from './get-database-size';
import getDatabaseDump from './get-database-dump';

export interface Connection {
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    ssh?: SSH
};

export interface SSH {
    host: string,
    port: number,
    username: string
};

export {
    executeQuery,
    getDatabaseSize,
    getDatabaseDump
};
import { Connection } from './';
import executeQuery from './execute-query';

/**
 * Get the size of a database in bytes
 */
export default async (connection: Connection): Promise<number> => {
    const { database } = connection;
    const query: string = `SELECT SUM(data_length + index_length) FROM information_schema.TABLES WHERE table_schema = '${database}';`;
    return parseInt(await executeQuery(connection, query));
};
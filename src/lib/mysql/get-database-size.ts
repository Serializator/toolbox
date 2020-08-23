import { exec } from 'child_process';

/**
 * Get the size of a database in bytes
 */
export default async (host: string, port: number, username: string, password: string, database: string): Promise<number> => {
    const query: string = `SELECT SUM(data_length + index_length) FROM information_schema.TABLES WHERE table_schema = '${database}';`;
    const command: string = `mysql -h ${host} -P ${port} -u ${username} -p${password} ${database} -sN -e "${query}"`;
    const options: Record<string, any> = { encoding: 'utf8' };
    
    return new Promise((resolve, reject) => {
        exec(command, options, (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(parseInt(stdout));
        });
    });
};
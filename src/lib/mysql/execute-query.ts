import { Connection } from './';
import { exec } from 'child_process';

export default async ({ host, port, username, password, database }: Connection, query: string): Promise<string>  => {
    const command: string = `mysql -h ${host} -P ${port} -u ${username} -p${password} ${database} -sN -e "${query}"`;
    const options: Record<string, any> = { encoding: 'utf8' };
    
    return new Promise((resolve, reject) => {
        exec(command, options, (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(stdout);
        });
    });
};
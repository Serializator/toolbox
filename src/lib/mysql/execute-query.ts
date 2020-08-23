import { Connection, SSH } from './';
import { exec } from 'child_process';
import tunnel from 'tunnel-ssh';
import getPort from 'get-port';

const concatenateCommand = (host: string, port: number, username: string, password: string, database: string, query: string): string => {
    return `mysql -h ${host} -P ${port} -u ${username} -p${password} ${database} -sN -e "${query}"`;
};

const performQuery = (command: string): Promise<string> => {
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

const withTunneledPort = (connection: Connection): Promise<number> => {
    const { ssh } = connection;

    return new Promise<number>(async (resolve, reject) => {
        const config = {
            ...ssh,
            dstHost: connection.host,
            dstPort: connection.port,
            localHost: '127.0.0.1',
            localPort: await getPort()
        };

        tunnel(config, err => {
            if (err) {
                reject(err);
                return;
            }
            
            resolve(config.localPort);
        });
    });
};

export default async (connection: Connection, query: string): Promise<string>  => {
    const { host, port, username, password, database, ssh } = connection;

    if (typeof ssh !== 'undefined') {
        return withTunneledPort(connection).then(tunneledPort => {
            return performQuery(concatenateCommand('127.0.0.1', tunneledPort, username, password, database, query));
        });
    } else {
        return performQuery(concatenateCommand(host, port, username, password, database, query));
    }
};
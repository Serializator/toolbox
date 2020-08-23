import { createCommand } from 'commander';
import { Connection, getDatabaseSize } from '../../lib/mysql';
import prettyBytes from 'pretty-bytes';
import prettyTime from 'pretty-time';

const program = createCommand();

program.arguments('<database>')
    .option('-h, --host <host>', 'a description for the "host" option', '127.0.0.1')
    .option('-P, --port <port>', 'a description for the "port" option', '3306')
    .requiredOption('-u, --username <username>', 'a description for the "username" option')
    .requiredOption('-p, --password <password>', 'a description for the "password" option')
    .option('--ssh-host <sshHost>', 'a description for the "sshHost" option')
    .option('--ssh-port <sshPort>', 'a description for the "sshPort" option', '22')
    .option('--ssh-user, --ssh-username <sshUsername>', 'a description for the "sshUsername" option')
    .parse(process.argv);

(async () => {
    const { host, port, username, password, sshHost, sshPort, sshUsername } = program.opts();
    const [ database ] = program.args;

    if (typeof database === 'undefined') {
        // TODO: check if this can be done with Commander natively
        console.error("error: required argument 'database' not specified");
        return;
    }

    try {
        const connection: Connection = { host, port, username, password, database }
        
        if (typeof sshHost !== 'undefined' || typeof sshUsername !== 'undefined') {
            if (typeof sshHost === 'undefined') {
                console.error("error: argument 'ssh_host' is not specified");
                return;
            }

            if (typeof sshUsername === 'undefined') {
                console.error("error: argument 'ssh_username' is not specified");
                return;
            }

            connection.ssh = {
                host: sshHost,
                port: sshPort,
                username: sshUsername
            };
        }
        
        const start = process.hrtime();
        const size: number = await getDatabaseSize(connection);
        const delta = process.hrtime(start);

        console.log(`${database} is ${prettyBytes(size)}, it took ${prettyTime(delta)}`);
    } catch ({ message }) {
        // TODO: prettify the message, do not print the raw error message from MySQL (including the executed query)
        console.error(message);
    }
})();
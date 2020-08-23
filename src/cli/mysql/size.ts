import { createCommand } from 'commander';
import getDatabaseSize from '../../lib/mysql/get-database-size';
import prettyBytes from 'pretty-bytes';

const program = createCommand();

program.arguments('<database>')
    .option('-h, --host <host>', 'a description for the "host" option', '127.0.0.1')
    .option('-P, --port <port>', 'a description for the "port" option', '3306')
    .requiredOption('-u, --username <username>', 'a description for the "username" option')
    .requiredOption('-p, --password <password>', 'a description for the "password" option')
    .parse(process.argv);

(async () => {
    const { host, port, username, password } = program.opts();
    const [ database ] = program.args;

    if (typeof database === 'undefined') {
        // TODO: check if this can be done with Commander natively
        console.error("error: required argument 'database' not specified");
        return;
    }

    try {
        const size: number = await getDatabaseSize(host, port, username, password, database);
        console.log(`${database} is ${prettyBytes(size)}`);
    } catch ({ message }) {
        // TODO: prettify the message, do not print the raw error message from MySQL (including the executed query)
        console.error(message);
    }
})();
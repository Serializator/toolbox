import { spawn } from 'child_process';
import { Readable } from 'stream';
import { Connection } from './';

const createCommand = (connection: Connection): string => {
    let command = `mysqldump --single-transaction --quick -h ${connection.host} -P ${connection.port} -u ${connection.username} -p'${connection.password}' ${connection.database}`;

    if (connection.ssh) {
        const { ssh } = connection;
        command = `ssh ${ssh.username}@${ssh.host} -p ${ssh.port} "${command}"`;
    }

    return command;
};

const withSed = (readable: Readable, script: string): Readable => {
    const childProcess = spawn('sed', ['-e', script], {
        env: {
            LANG: 'c',
            LC_CTYPE: 'C',
            LC_ALL: 'C'
        }
    });

    readable.pipe(childProcess.stdin);
    return childProcess.stdout;
};

const replaceDefiner = (readable: Readable): Readable => {
    return withSed(readable, 's/DEFINER[ ]*=[ ]*[^*]*\\*/\\*/');
};

const replaceRowFormat = (readable: Readable): Readable => {
    return withSed(readable, 's/ROW_FORMAT=FIXED/ROW_FORMAT=DYNAMIC/');
};

const replaceEngine = (readable: Readable): Readable => {
    return withSed(readable, '/ROW_FORMAT/!s/^) ENGINE=InnoDB/) ENGINE=InnoDB ROW_FORMAT=DYNAMIC/');
};

const filterAlterDatabaseQuery = (readable: Readable): Readable => {
    const childProcess = spawn('grep', ['-v', "'ALTER DATABASE'"]);
    readable.pipe(childProcess.stdin);
    return childProcess.stdout;
};

export default (connection: Connection): Readable => {
    let process = spawn('/bin/sh', ['-c', createCommand(connection)]);
    let stdout = process.stdout;

    // TODO: add error handling

    stdout = replaceDefiner(stdout);
    stdout = replaceRowFormat(stdout);
    stdout = replaceEngine(stdout);
    stdout = filterAlterDatabaseQuery(stdout);

    return stdout;
};
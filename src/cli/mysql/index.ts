import { createCommand } from 'commander';
const program = createCommand();

// we use the ".js" extension here because "executableFile" is actually referencing the built ".ts" version of the module
program.command('size', 'get the size of a local / remote database', { executableFile: `${__dirname}/size.js` })
    .command('dump', 'get database dump from a local / remote database', { executableFile: `${__dirname}/dump.js` })
    .parse(process.argv);
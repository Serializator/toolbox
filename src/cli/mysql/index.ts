import { createCommand } from 'commander';
const program = createCommand();

program.command('size', 'get the size of a local / remote database', { executableFile: `${__dirname}/size.js` })
    .parse(process.argv);
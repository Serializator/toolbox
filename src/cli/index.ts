import { createCommand } from 'commander';
const program = createCommand()

program.version('0.0.1')
    .command('mysql', 'a toolbox to work with MySQL databases', { executableFile: `${__dirname}/mysql/index.js` })
    .parse(process.argv);
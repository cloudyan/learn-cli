#!/usr/bin/env node --experimental-json-modules

import program from 'commander';
import pkg from '../package.json';
import updateCheck from '../src/update.mjs';

program.version(pkg.version, '-v, --version');

program
  .command('upgrade')
  .description('Check the js-cli version.')
  .action(() => {
    updateCheck()
  })

program.parse(process.argv);

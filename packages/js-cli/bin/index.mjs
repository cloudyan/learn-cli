#!/usr/bin/env node --experimental-json-modules

import program from 'commander';
import pkg from '../package.json';
import updateCheck from '../src/update.mjs';
import setMirror from '../src/mirror.mjs';

program.version(pkg.version, '-v, --version');

program
  .command('upgrade')
  .description('Check the js-cli version.')
  .action(() => {
    updateCheck()
  })

program
  .command('mirror <template_mirror>')
  .description('Set the template mirror.')
  .action((tplMirror) => {
    setMirror(tplMirror);
  })

program.parse(process.argv);

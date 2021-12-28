#!/usr/bin/env node --experimental-json-modules

import program from 'commander';
import pkg from '../package.json';
import updateCheck from '../src/update.mjs';
import setMirror from '../src/mirror.mjs';
import dlTemplate from '../src/download.mjs';
import initProject from '../src/init.mjs';

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

program
  .command('download')
  .description('Download template from mirror.')
  .action(() => {
    dlTemplate();
  })

program
  .name('js-cli')
  .usage('<commands> [options]')
  .command('init <project_name>')
  .action(project => {
    initProject(project);
  })


program.parse(process.argv);

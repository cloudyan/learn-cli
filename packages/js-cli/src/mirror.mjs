import symbols from 'log-symbols';
import fse from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import defineConfig from './config.mjs';
import { __dirname } from './utils.mjs';

const configPath = path.resolve(__dirname, '../config.json');

async function setMirror(link) {
  const exists = await fse.pathExists(configPath);
  if (!exists) {
    await defineConfig();
  }
  mirrorAction(link);
}

async function mirrorAction(link) {
  try {
    const jsonConfig = await fse.readJson(configPath);
    jsonConfig.mirror = link;
    await fse.writeJson(configPath, jsonConfig);
    console.log(symbols.success, 'Set the mirror successful.');
  } catch(err) {
    console.log(symbols.error, chalk.red(`Set the mirror failed. ${err}`));
    process.exit();
  }
}

export default setMirror;

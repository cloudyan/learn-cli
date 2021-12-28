import fse from 'fs-extra';
import path from 'path';
import { __dirname } from './utils.mjs';

const jsonConfig = {
  "name": "js-cli",
  "mirror": "https://zpfz.vercel.app/download/files/frontend/tpl/js-plugin-cli/",
}

const configPath = path.resolve(__dirname, '../config.json');

async function defineConfig() {
  try {
    await fse.outputJSON(configPath, jsonConfig);
  } catch(err) {
    console.error(err);
    process.exit();
  }
}


export default defineConfig;

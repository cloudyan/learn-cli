import download from 'download';
import ora from 'ora';
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';
import defineConfig from './config.mjs';
import { __dirname } from './utils.mjs';

const configPath = path.resolve(__dirname, '../config.json');
const tplPath = path.resolve(__dirname, '../template');

async function dlTemplate() {
  const exists = await fse.pathExists(configPath);
  if (!exists) {
    await defineConfig()
  }
  await dlAction();
}

async function dlAction() {
  try {
    await fse.remove(tplPath);
  } catch(err) {
    console.error(err);
    process.exit();
  }

  const jsonConfig = await fse.readJson(configPath);
  const dlSpinner = ora(chalk.cyan('Downloading template...'));

  dlSpinner.start();

  try {
    await download(
      `${jsonConfig.mirror}template.zip`,
      path.resolve(__dirname, '../template'),
      {
        extract: true,
      },
    )
  } catch(err) {
    dlSpinner.text = chalk.red(`Download template failed. ${err}`);
    dlSpinner.fail();
    process.exit();
  }

  dlSpinner.text = `Download template successful.`;

  dlSpinner.succeed();
}

export default dlTemplate;

import fse from 'fs-extra';
import ora from 'ora';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import inquirer from 'inquirer';
import handlebars from 'handlebars';
import path from 'path';
import dlTemplate from './download.mjs';
import { __dirname } from './utils.mjs';

async function initProject(projectName) {
  try {
    const exists = await fse.pathExists(projectName);

    if (exists) {
      console.log(logSymbols.error, chalk.red(`The project already exists.`));
    } else {
      inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Set a global name for javascript plugin?',
          default: 'Default',
        }
      ]).then(async (answers) => {
        const initSpinner = ora(chalk.cyan('Initializing project...'));
        initSpinner.start();
        const templatePath = path.resolve(__dirname, '../template/');
        const processPath = process.cwd();

        const LCProjectName = projectName.toLowerCase();
        const targetPath = `${processPath}/${LCProjectName}`;

        const exists = await fse.pathExists(templatePath);
        if (!exists) {
          await dlTemplate();
        }
        try {
          await fse.copy(templatePath, targetPath);
        } catch(err) {
          console.log(logSymbols.error, chalk.red(`Copy template failed. ${err}`));
          process.exit();
        }

        const multiMeta = {
          project_name: LCProjectName,
          global_name: answers.name,
        };
        const multiFiles = [
          `${targetPath}/package.json`,
          `${targetPath}/gulpfile.js`,
          `${targetPath}/test/index.html`,
          `${targetPath}/src/index.js`,
        ];

        for (let i = 0; i<multiFiles.length; i++) {
          try {
            const multiFilesContent = await fse.readFile(multiFiles[i], 'utf8');
            const multiFilesResult = await handlebars.compile(multiFilesContent)(multiMeta);
            await fse.outputFile(multiFiles[i], multiFilesResult);
          } catch(err) {
            initSpinner.text = chalk.red(`Initialize project failed. ${err}`);
            initSpinner.fail();
            process.exit();
          }
        }

        initSpinner.text = `Initialize project successful.`;
        initSpinner.succeed();
        console.log(`
    To get started:
      cd ${chalk.yellow(LCProjectName)}
      ${chalk.yellow('npm install')} or ${chalk.yellow('yarn install')}
      ${chalk.yellow('npm run dev')} or ${chalk.yellow('yarn run dev')}
        `)
      }).catch(error => {
        if (error.isTtyError) {
          console.log(logSymbols.error, chalk.red(`Prompt couldn't be rendered in the current environment.`))
        } else {
          console.log(logSymbols.error, chalk.red(error));
        }
      })
    }

  } catch(err) {
    console.error(err);
    process.exit();
  }
}

export default initProject;

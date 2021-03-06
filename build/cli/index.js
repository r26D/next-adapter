#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const path_1 = require("path");
const customize_1 = require("../customize");
const update_1 = __importDefault(require("./update"));
let projectDirectory = '';
const packageJson = () => require('@r26d/next-adapter/package.json');
const program = new commander_1.Command(packageJson().name)
    .version(packageJson().version)
    .arguments('<project-directory>')
    .usage(`${chalk_1.default.green('<project-directory>')} [options]`)
    .description('Generate static Next.js files into your project.')
    .option('-c, --customize', 'Select template files you want to add to your project')
    .option('-f, --force', 'Allows replacing existing files')
    .action((inputProjectDirectory, options) => {
    projectDirectory = inputProjectDirectory;
})
    .allowUnknownOption()
    .parse(process.argv);
async function run() {
    if (typeof projectDirectory === 'string') {
        projectDirectory = projectDirectory.trim();
    }
    const resolvedProjectRoot = (0, path_1.resolve)(projectDirectory);
    (0, customize_1.runAsync)({ projectRoot: resolvedProjectRoot, force: program.force, yes: !program.customize });
}
run()
    .then(update_1.default)
    .catch(async (reason) => {
    console.log();
    console.log('Aborting installation.');
    if (reason.command) {
        console.log(`  ${chalk_1.default.magenta(reason.command)} has failed.`);
    }
    else {
        console.log(chalk_1.default.red('An unexpected error was encountered. Please report it as a bug:'));
        console.log(reason);
    }
    console.log();
    await (0, update_1.default)();
    process.exit(1);
});
//# sourceMappingURL=index.js.map
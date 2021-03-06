"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAsync = void 0;
const chalk_1 = __importDefault(require("chalk"));
const prompts_1 = __importDefault(require("prompts"));
const manifest_1 = require("./manifest");
__exportStar(require("./manifest"), exports);
function logReady() {
    console.log();
    console.log(chalk_1.default.reset(`\u203A Your Expo + Next.js project has all of the required customizations.`));
    console.log(chalk_1.default.reset(`\u203A Start your project with \`${chalk_1.default.bold(`yarn next dev`)}\` to test it.`));
    console.log();
}
async function runNonInteractiveFlowAsync(projectRoot) {
    const customizations = manifest_1.manifest.filter(({ type }) => type === 'required');
    for (const customization of customizations) {
        if (await customization.onEnabledAsync({ projectRoot, force: false })) {
            await customization.onSelectAsync({ projectRoot, force: true });
        }
    }
    logReady();
}
async function runAsync({ projectRoot, force, yes: nonInteractive, }) {
    if (nonInteractive) {
        await runNonInteractiveFlowAsync(projectRoot);
        return;
    }
    const values = [];
    for (const customization of manifest_1.manifest) {
        const enabled = await customization.onEnabledAsync({ projectRoot, force });
        values.push({
            title: customization.name,
            value: customization.name,
            // @ts-ignore: broken types
            disabled: !force && !enabled,
            message: force && !enabled ? chalk_1.default.red('This will overwrite the existing file') : '',
        });
    }
    if (!values.filter(({ disabled }) => !disabled).length) {
        logReady();
        console.log(chalk_1.default.dim(`\u203A To regenerate the files run: ${chalk_1.default.bold('next-expo --force')}`));
        console.log();
        return;
    }
    const { answer } = await (0, prompts_1.default)({
        type: 'multiselect',
        name: 'answer',
        message: 'Which Next.js files would you like to generate?\n',
        hint: '- Space to select. Return to submit',
        // @ts-ignore: broken types
        warn: 'File exists, use --force to overwrite it.',
        limit: values.length,
        instructions: '',
        choices: values,
    });
    if (!answer) {
        console.log('\n\u203A Exiting...\n');
        return;
    }
    await Promise.all(answer
        .map((item) => {
        const customization = manifest_1.manifest.find(({ name }) => name === item);
        if (customization)
            return customization.onSelectAsync({ projectRoot, force });
        else
            throw new Error('failed to find customization matching: ' + item);
    })
        .filter(Boolean));
}
exports.runAsync = runAsync;
//# sourceMappingURL=index.js.map
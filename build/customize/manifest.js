"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const config_1 = require("@expo/config");
const package_manager_1 = require("@expo/package-manager");
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const resolve_from_1 = __importDefault(require("resolve-from"));
const generatedTag = `@generated: @r26d/next-adapter@${require('@r26d/next-adapter/package.json').version}`;
function createJSTag() {
    return `// ${generatedTag}`;
}
function createBashTag() {
    return `# ${generatedTag}`;
}
async function copyFileAsync(from, to, force, tag) {
    if (!force && (await fs_extra_1.default.pathExists(to))) {
        throw new Error(`Cannot overwrite file at "${to}" without the \`force\` option`);
    }
    if (await fs_extra_1.default.pathExists(from)) {
        if (tag) {
            const contents = await fs_extra_1.default.readFile(from, 'utf8');
            await fs_extra_1.default.ensureDir(path_1.default.dirname(to));
            await fs_extra_1.default.writeFile(to, `${tag}\n${contents}`);
        }
        else {
            await fs_extra_1.default.copy(from, to, { overwrite: true, recursive: true });
        }
    }
    else {
        throw new Error(`Expected template file for ${from} doesn't exist at path: ${to}`);
    }
}
async function projectHasLatestFileAsync(destinationPath, tag) {
    if (await fs_extra_1.default.pathExists(destinationPath)) {
        const contents = await fs_extra_1.default.readFile(destinationPath, 'utf8');
        return contents.includes(tag);
    }
    return false;
}
const packageRoot = path_1.default.join(__dirname, '../../');
function getDependencies(projectRoot) {
    const dependencies = ['react-native-web', 'next'].filter(dependency => !resolve_from_1.default.silent(projectRoot, dependency));
    const devDependencies = ['@r26d/next-adapter', 'babel-preset-expo'].filter(dependency => !resolve_from_1.default.silent(projectRoot, dependency));
    return { dependencies, devDependencies };
}
exports.manifest = [
    {
        name: 'Install Next.js dependencies',
        type: 'required',
        destinationPath: (projectRoot) => '',
        description: 'Ensure your project has all of the required dependencies',
        async onEnabledAsync({ projectRoot }) {
            const { dependencies, devDependencies } = getDependencies(projectRoot);
            const all = [...dependencies, ...devDependencies];
            return !!all.length;
        },
        async onSelectAsync({ projectRoot }) {
            const { dependencies, devDependencies } = getDependencies(projectRoot);
            const all = [...dependencies, ...devDependencies];
            if (!all.length) {
                console.log(chalk_1.default.magenta.dim(`\u203A All of the required dependencies are installed already`));
                return;
            }
            else {
                console.log(chalk_1.default.magenta(`\u203A Installing the missing dependencies: ${all.join(', ')}`));
            }
            const packageManager = (0, package_manager_1.createForProject)(projectRoot);
            if (dependencies.length)
                await packageManager.addAsync(...dependencies);
            if (devDependencies.length)
                await packageManager.addDevAsync(...devDependencies);
        },
    },
    {
        name: 'pages/index.js',
        type: 'required',
        destinationPath: projectRoot => path_1.default.resolve(projectRoot, './pages/index.js'),
        templatePath: path_1.default.resolve(packageRoot, 'template/pages/index.js'),
        description: 'the first page for your Next.js project.',
        async onEnabledAsync({ projectRoot }) {
            const destinationPath = this.destinationPath(projectRoot);
            return !(await projectHasLatestFileAsync(destinationPath, createJSTag()));
        },
        async onSelectAsync({ projectRoot, force }) {
            console.log(chalk_1.default.magenta(`\u203A Creating ${this.description}`));
            const destinationPath = this.destinationPath(projectRoot);
            await copyFileAsync(this.templatePath, destinationPath, force, createJSTag());
        },
    },
    {
        name: 'pages/_document.js',
        type: 'required',
        destinationPath: projectRoot => path_1.default.resolve(projectRoot, './pages/_document.js'),
        templatePath: path_1.default.resolve(packageRoot, 'template/pages/_document.js'),
        description: 'a custom Next.js Document that ensures CSS-in-JS styles are setup.',
        async onEnabledAsync({ projectRoot }) {
            const destinationPath = this.destinationPath(projectRoot);
            return !(await projectHasLatestFileAsync(destinationPath, createJSTag()));
        },
        async onSelectAsync({ projectRoot, force }) {
            console.log(chalk_1.default.magenta(`\u203A Creating ${this.description}`));
            const destinationPath = this.destinationPath(projectRoot);
            await copyFileAsync(this.templatePath, destinationPath, force, createJSTag());
        },
    },
    {
        name: 'babel.config.js',
        type: 'required',
        destinationPath: projectRoot => path_1.default.resolve(projectRoot, './babel.config.js'),
        templatePath: path_1.default.resolve(packageRoot, 'template/babel.config.js'),
        description: 'a universal Babel preset for loading projects in iOS, Android, and Next.js.',
        async onEnabledAsync({ projectRoot }) {
            const destinationPath = this.destinationPath(projectRoot);
            return !(await projectHasLatestFileAsync(destinationPath, createJSTag()));
        },
        async onSelectAsync({ projectRoot, force }) {
            console.log(chalk_1.default.magenta(`\u203A Creating ${this.description}`));
            const destinationPath = this.destinationPath(projectRoot);
            // TODO: Bacon: Handle the fact that this file will probably exist
            await copyFileAsync(this.templatePath, destinationPath, force, createJSTag());
        },
    },
    {
        name: 'next.config.js',
        type: 'required',
        destinationPath: projectRoot => path_1.default.resolve(projectRoot, './next.config.js'),
        templatePath: path_1.default.resolve(packageRoot, 'template/next.config.js'),
        description: 'the Next.js config with Expo support.',
        async onEnabledAsync({ projectRoot }) {
            const destinationPath = this.destinationPath(projectRoot);
            return !(await projectHasLatestFileAsync(destinationPath, createJSTag()));
        },
        async onSelectAsync({ projectRoot, force }) {
            console.log(chalk_1.default.magenta(`\u203A Creating ${this.description}`));
            const destinationPath = this.destinationPath(projectRoot);
            await copyFileAsync(this.templatePath, destinationPath, force, createJSTag());
        },
    },
    {
        name: 'Add build script',
        type: 'required',
        destinationPath: projectRoot => '',
        description: 'the build script required for deploying to now.',
        async onEnabledAsync({ projectRoot, force }) {
            if (force)
                return true;
            const pkg = await readPackageJsonAsync(projectRoot);
            const hasNowBuildScript = pkg.scripts.build && pkg.scripts.build.trim() === 'next build';
            return !hasNowBuildScript;
        },
        async onSelectAsync({ projectRoot, force }) {
            const pkg = await readPackageJsonAsync(projectRoot);
            if (!force && pkg.scripts.build) {
                console.warn(chalk_1.default.yellow(`\u203A A build script already exists.`));
                return;
            }
            pkg.scripts.build = 'next build';
            console.log(chalk_1.default.magenta(`\u203A Adding a build script to your \`${chalk_1.default.bold(`package.json`)}\` for deployment to now.`));
            await fs_extra_1.default.writeFile(path_1.default.resolve(projectRoot, 'package.json'), JSON.stringify(pkg, null, 2));
        },
    },
    {
        name: 'Update git ignore',
        type: 'required',
        destinationPath: projectRoot => path_1.default.resolve(projectRoot, '.gitignore'),
        templatePath: path_1.default.resolve(packageRoot, 'template/default-gitignore'),
        description: 'Ensure Next.js and Expo generated folders are ignored in .gitignore',
        async onEnabledAsync({ projectRoot }) {
            const destinationPath = this.destinationPath(projectRoot);
            if (!(await fs_extra_1.default.pathExists(destinationPath))) {
                return true;
            }
            const contents = await fs_extra_1.default.readFile(destinationPath, 'utf8');
            return !contents.includes(createBashTag());
        },
        async onSelectAsync({ projectRoot, force }) {
            const destinationPath = this.destinationPath(projectRoot);
            // Ensure a default expo .gitignore exists
            if (!(await fs_extra_1.default.pathExists(destinationPath))) {
                console.log(chalk_1.default.magenta(`\u203A Creating a default .gitignore for a universal Expo project with Next.js support`));
                await copyFileAsync(this.templatePath, destinationPath, true, createBashTag());
            }
            // Ensure the .gitignore has the required fields
            let contents = await fs_extra_1.default.readFile(destinationPath, 'utf8');
            if (contents.includes(createBashTag())) {
                console.warn(chalk_1.default.yellow('The .gitignore already appears to contain expo generated files'));
                return;
            }
            console.log(chalk_1.default.magenta(`\u203A Adding the generated folders to your .gitignore`));
            const ignore = [
                '',
                createBashTag(),
                '/.expo/*',
                '# Expo Web',
                '/web-build/*',
                '# Expo Native',
                '*.jks',
                '*.p8',
                '*.p12',
                '*.key',
                '*.mobileprovision',
                '*.orig.*',
                '# Next.js',
                '/.next/*',
                '/out/',
                '# Next.js production',
                '/build/',
                '# Next.js dependencies',
                '/.pnp',
                '.pnp.js',
                '# @end @r26d/next-adapter',
                '',
            ];
            contents += ignore.join('\n');
            await fs_extra_1.default.writeFile(destinationPath, contents);
        },
    },
];
async function readPackageJsonAsync(projectRoot) {
    const pkg = (0, config_1.getPackageJson)(projectRoot);
    if (!pkg.scripts)
        pkg.scripts = {};
    return pkg;
}
//# sourceMappingURL=manifest.js.map
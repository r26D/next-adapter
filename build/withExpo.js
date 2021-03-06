"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = require("@expo/config/paths");
const addons_1 = require("@expo/webpack-config/addons");
function withExpo(nextConfig = {}) {
    return {
        ...nextConfig,
        pageExtensions: (0, paths_1.getBareExtensions)(['web']),
        webpack(config, options) {
            // Prevent define plugin from overwriting Next.js environment.
            process.env.EXPO_WEBPACK_DEFINE_ENVIRONMENT_AS_KEYS = 'true';
            const webpack5 = (options.config || {}).webpack5;
            const expoConfig = (0, addons_1.withUnimodules)(config, {
                projectRoot: nextConfig.projectRoot || process.cwd(),
            }, {
                supportsFontLoading: false,
                webpack5: webpack5 !== false,
            });
            // Use original public path
            (expoConfig.output || {}).publicPath = (config.output || {}).publicPath;
            // TODO: Bacon: use commonjs for RNW babel maybe...
            if (typeof nextConfig.webpack === 'function') {
                return nextConfig.webpack(expoConfig, options);
            }
            return expoConfig;
        },
    };
}
exports.default = withExpo;
//# sourceMappingURL=withExpo.js.map
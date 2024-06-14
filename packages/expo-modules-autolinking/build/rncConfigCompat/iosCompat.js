"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDependencyConfigImplIosAsync = void 0;
const fast_glob_1 = __importDefault(require("fast-glob"));
const path_1 = __importDefault(require("path"));
async function resolveDependencyConfigImplIosAsync(packageRoot, reactNativeConfig) {
    const platformReactNativeConfig = reactNativeConfig?.dependency?.platforms?.ios;
    if (platformReactNativeConfig === null) {
        // Skip autolinking for this package.
        return null;
    }
    const podspecPath = (await (0, fast_glob_1.default)('*.podspec', { cwd: packageRoot, absolute: true }))?.[0];
    if (!podspecPath) {
        return null;
    }
    const packageJson = require(path_1.default.join(packageRoot, 'package.json'));
    return {
        podspecPath,
        version: packageJson.version,
        configurations: platformReactNativeConfig?.configurations || [],
        scriptPhases: platformReactNativeConfig?.scriptPhases || [],
    };
}
exports.resolveDependencyConfigImplIosAsync = resolveDependencyConfigImplIosAsync;
//# sourceMappingURL=iosCompat.js.map
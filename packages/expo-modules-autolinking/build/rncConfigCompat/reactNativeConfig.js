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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadReactNativeConfigAsync = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const require_from_string_1 = __importDefault(require("require-from-string"));
const resolve_from_1 = __importDefault(require("resolve-from"));
const utils_1 = require("./utils");
let tsMain = undefined;
/**
 * Load the `react-native.config.js` or `react-native.config.ts` from the package.
 */
async function loadReactNativeConfigAsync(packageRoot) {
    const configJsPath = path_1.default.join(packageRoot, 'react-native.config.js');
    if (await (0, utils_1.fileExistsAsync)(configJsPath)) {
        try {
            return require(configJsPath);
        }
        catch {
            return null;
        }
    }
    const configTsPath = path_1.default.join(packageRoot, 'react-native.config.ts');
    if (await (0, utils_1.fileExistsAsync)(configTsPath)) {
        if (tsMain === undefined) {
            const tsPath = resolve_from_1.default.silent(packageRoot, 'typescript');
            if (tsPath) {
                tsMain = await Promise.resolve(`${tsPath}`).then(s => __importStar(require(s)));
            }
        }
        else if (tsMain == null) {
            return null;
        }
        const configContents = await promises_1.default.readFile(configTsPath, 'utf8');
        const transpiledContents = tsMain?.transpileModule(configContents, {
            compilerOptions: {
                module: tsMain.ModuleKind.NodeNext,
                moduleResolution: tsMain.ModuleResolutionKind.NodeNext,
                target: tsMain.ScriptTarget.ESNext,
            },
        });
        const outputText = transpiledContents?.outputText;
        let config;
        try {
            config = outputText ? (0, require_from_string_1.default)(outputText) : null;
        }
        catch { }
        return config?.default ?? config ?? null;
    }
    return null;
}
exports.loadReactNativeConfigAsync = loadReactNativeConfigAsync;
//# sourceMappingURL=reactNativeConfig.js.map
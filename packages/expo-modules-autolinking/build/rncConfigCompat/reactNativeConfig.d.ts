import type { RncConfigCompatReactNativeConfig } from './rncConfigCompat.types';
/**
 * Load the `react-native.config.js` or `react-native.config.ts` from the package.
 */
export declare function loadReactNativeConfigAsync(packageRoot: string): Promise<RncConfigCompatReactNativeConfig | null>;

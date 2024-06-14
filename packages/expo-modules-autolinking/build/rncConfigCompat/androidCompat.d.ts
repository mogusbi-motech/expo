import type { RncConfigCompatDependencyConfigAndroid, RncConfigCompatReactNativeConfig } from './rncConfigCompat.types';
export declare function resolveDependencyConfigImplAndroidAsync(packageRoot: string, reactNativeConfig: RncConfigCompatReactNativeConfig | null): Promise<RncConfigCompatDependencyConfigAndroid | null>;
/**
 * Parse the `RncConfigCompatDependencyConfigAndroid.packageName`
 */
export declare function parsePackageNameAsync(manifestPath: string | null, gradlePath: string | null): Promise<string | null>;
/**
 * Parse the Java or Kotlin class name to for `ReactPackage` or `TurboReactPackage`.
 */
export declare function parseNativePackageClassName(packageRoot: string, androidDir: string): Promise<string | null>;
export declare function parseNativePackageClassNameFromFileAsync(filePath: string): Promise<string>;
export declare function parseLibraryNameAsync(androidDir: string, packageJson: any): Promise<string | null>;
export declare function parseComponentDescriptorsAsync(packageRoot: string, pacakgeJson: any): Promise<string[]>;
export declare function parseComponentDescriptorsFromFileAsync(filePath: string): Promise<string | null>;

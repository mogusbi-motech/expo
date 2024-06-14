import type { SupportedPlatform } from '../types';

/**
 * Options for 'rnc-config-compat' command.
 */
export interface RncConfigCompatOptions {
  platform: SupportedPlatform;
  projectRoot: string;
  searchPaths: string[];
}

/**
 * Dependency configuration for Android platform.
 */
export type RncConfigCompatDependencyConfigAndroid = {
  sourceDir: string;
  packageImportPath: string;
  packageInstance: string;
  dependencyConfiguration?: string;
  buildTypes: string[];
  libraryName?: string | null;
  componentDescriptors?: string[] | null;
  cmakeListsPath?: string | null;
  cxxModuleCMakeListsModuleName?: string | null;
  cxxModuleCMakeListsPath?: string | null;
  cxxModuleHeaderName?: string | null;
};

/**
 * Dependency configuration for iOS platform.
 */
export type RncConfigCompatDependencyConfigIos = {
  podspecPath: string;
  version: string;
  configurations: string[];
  scriptPhases: any[];
};

/**
 * Dependency configuration.
 */
export type RncConfigCompatDependencyConfig = {
  root: string;
  name: string;
  platforms: {
    android?: RncConfigCompatDependencyConfigAndroid;
    ios?: RncConfigCompatDependencyConfigIos;
  };
};

/**
 * Result of 'rnc-config-compat' command.
 */
export type RncConfigCompatResult = {
  root: string;
  reactNativePath: string;
  dependencies: Record<string, RncConfigCompatDependencyConfig>;
  project: {
    ios?: {
      sourceDir: string;
    };
  };
};

/**
 * The `react-native.config.js` config
 */
export type RncConfigCompatReactNativeConfig = Record<string, any>;

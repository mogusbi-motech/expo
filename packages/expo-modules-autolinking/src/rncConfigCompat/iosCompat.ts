import glob from 'fast-glob';
import path from 'path';

import type {
  RncConfigCompatDependencyConfigIos,
  RncConfigCompatReactNativeConfig,
} from './rncConfigCompat.types';

export async function resolveDependencyConfigImplIosAsync(
  packageRoot: string,
  reactNativeConfig: RncConfigCompatReactNativeConfig | null
): Promise<RncConfigCompatDependencyConfigIos | null> {
  const platformReactNativeConfig = reactNativeConfig?.dependency?.platforms?.ios;
  if (platformReactNativeConfig === null) {
    // Skip autolinking for this package.
    return null;
  }

  const podspecPath = (await glob('*.podspec', { cwd: packageRoot, absolute: true }))?.[0];
  if (!podspecPath) {
    return null;
  }
  const packageJson = require(path.join(packageRoot, 'package.json'));

  return {
    podspecPath,
    version: packageJson.version,
    configurations: platformReactNativeConfig?.configurations || [],
    scriptPhases: platformReactNativeConfig?.scriptPhases || [],
  };
}

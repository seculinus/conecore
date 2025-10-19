import { createSystem, defineConfig } from "@chakra-ui/react";
import { mergeConfigs } from "@chakra-ui/react";

export function extendSystem(baseSystem, extension) {
  // Extract the base config safely
  const baseConfig = baseSystem._config || baseSystem.config || baseSystem;
  
  // Safely get globalCss from both base and extension
  const baseGlobalCss = baseConfig.globalCss || {};
  const extensionGlobalCss = extension.globalCss || {};
  
  // Manually merge globalCss to ensure proper deep merge
  const mergedGlobalCss = {
    ...baseGlobalCss,
    ...extensionGlobalCss,
  };

  // Create extension with merged globalCss
  const extensionWithMergedCss = {
    ...extension,
    globalCss: mergedGlobalCss,
  };

  // Deep merge base config + extension
  const merged = mergeConfigs({}, baseConfig, extensionWithMergedCss);

  // Rebuild system from merged config
  return createSystem(merged);
}
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("cjs");

const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith("@firebase/") || moduleName.startsWith("firebase/")) {
    const nextContext = {
      ...context,
      isESMImport: true,
    };
    return defaultResolveRequest
      ? defaultResolveRequest(nextContext, moduleName, platform)
      : context.resolveRequest(nextContext, moduleName, platform);
  }
  return defaultResolveRequest
    ? defaultResolveRequest(context, moduleName, platform)
    : context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./src/global.css" });

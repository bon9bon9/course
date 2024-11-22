const cracoAlias = require("craco-alias");

module.export = {
  plugins : [
    {
      plugin: cracoAlias,
      options: {
        source :"tsconfig",
        baseUrl : ".",
        tsConfigPath : "tsconfig.paths.json",
        debug : false
      }
    }
  ]
}
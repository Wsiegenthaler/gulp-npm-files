var fs = require('fs');
var p = require('path');

module.exports = function(devDependencies, packageJsonFilePath) {
  packageJsonFilePath = packageJsonFilePath || './package.json';

  var nodeModulesPath = p.dirname(packageJsonFilePath) + '/node_modules/';

  var buffer = fs.readFileSync(packageJsonFilePath);
  var packages = JSON.parse(buffer.toString());
  var keys = [];

  for (key in packages.dependencies) {
    keys.push(nodeModulesPath + key + '/**/*');
  }

  if (devDependencies) {
    for (key in packages.devDependencies) {
      keys.push(nodeModulesPath + key + '/**/*');
    }
  }

  return keys;
};

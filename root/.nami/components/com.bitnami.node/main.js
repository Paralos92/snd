'use strict';

const _ = require('lodash');

$app.preUnpackFiles = function() {
  if ($file.exists($file.join($app.installation.root, 'python'))) {
    $app.packaging.components.python.selected = false;
  }
};

$app.postInstallation = function() {
  // Node search for global modules in lib/node
  $file.link($file.join($app.installdir, 'lib/node_modules'), $file.join($app.installdir, 'lib/node'));
  $file.append(
    $file.join($app.installdir, 'lib/node_modules/npm/npmrc'),
    `prefix = ${$app.installdir}`,
    {atNewLine: true}
  );
};

$app.preUninstallation = function() {
  _.forEach(['scripts', 'node_modules', 'bin', 'etc', 'lib'], function(folder) {
    $file.delete($file.join($app.installdir, folder));
  });
};

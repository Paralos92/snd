'use strict';

const path = require('path');
const componentFunctions = require('./lib/component')($app);
const volumeFunctions = require('./lib/volume')($app);

$app.postInstallation = function() {
  $os.addGroup($app.systemUser);
  $os.addUser($app.systemUser, {gid: $app.systemGroup});
  $file.mkdir($app.tmpDir, {owner: $app.systemUser, group: $app.systemGroup});
  componentFunctions.normalizeDirectories($app.applicationDirectories);
  if (!volumeFunctions.isInitialized($app.persistDir)) {
    volumeFunctions.prepareDataToPersist($app.dataToPersist);
  } else {
    volumeFunctions.restorePersistedData($app.dataToPersist);
  }
  // Create Symbolic link to php.ini in lib to automatically detect the configuration
  if (!$file.exists(path.join($app.installdir, 'lib/php.ini'))) {
    $file.link(path.join($app.confDir, 'php.ini'), path.join($app.installdir, 'lib/php.ini'));
  }
  componentFunctions.createExtraConfigurationFiles([
    {type: 'monit', path: $app.monitFile, params: {service: 'php', pidFile: $app.pidFile}},
    {type: 'logrotate', path: $app.logrotateFile, params: {logPath: $file.join($app.logsDir, '*')}},
  ]);
};

$app.exports = {
  configure: $app.helpers.configure,
  composerExecute: $app.helpers.composerExecute,
  pearExecute: $app.helpers.pearExecute,
  execute: $app.helpers.execute,
  resize: $app.helpers.resize,
};

'use strict';

const _ = require('lodash');
const hostFunctions = require('./lib/host');


/**
 * Change configuration to adapt it to host memory
 * @function runtimes.php~resize
 * @param {Object} [options]
 * @param {Object} [options.memory] - Max memory to use. Uses maximum available by default. (Supports M or G)
 * @example
 * resize({memory: '2G'});
 */
$app.helpers.resize = function(options) {
  const sizes = {
    'micro': {
      max_children: 5, start_servers: 1, min_spare_servers: 1, max_spare_servers: 3,
    },
    'small': {
      max_children: 10, start_servers: 2, min_spare_servers: 2, max_spare_servers: 5,
    },
    'medium': {
      max_children: 25, start_servers: 4, min_spare_servers: 4, max_spare_servers: 10,
    },
    'large': {
      max_children: 50, start_servers: 5, min_spare_servers: 5, max_spare_servers: 30,
    },
    'xlarge': {
      max_children: 50, start_servers: 5, min_spare_servers: 5, max_spare_servers: 30,
    },
    '2xlarge': {
      max_children: 50, start_servers: 5, min_spare_servers: 5, max_spare_servers: 30,
    },
  };
  const machineSize = hostFunctions.getMachineSize(options);
  $file.mkdir($file.join($app.confDir, 'bitnami'));
  $hb.renderToFile('memory.conf.tpl', $file.join($app.confDir, 'bitnami/memory.conf'), sizes[machineSize]);
  if (!$file.contains($app.confFile, `include=${$app.confDir}/bitnami/memory.conf`)) {
    $file.puts($app.confFile, '# Memory settings\n' +
               `include=${$app.confDir}/bitnami/memory.conf`, {atNewLine: true});
  }
};

/**
 * Execute a php script with the parameters given
 * @function runtimes.php~execute
 * @param {string} script - Script to execute.
 * @param {string|string[]} args - Arguments. It can be either a string or an array containing them.
 * @param {Object} options - Options passed to the runProgram method.
 * @example
 * // Executes the script 'niceScript.php' with the parameters 'echo hello world' in the application directory
 * execute('niceScript.php', 'echo hello world', {cwd: $app.installdir});
 * @example
 * // Executes the script 'install.php' with root permissions located in '/opt/bitnami/application/'
 * // with parameters 'user = user', 'password = bitnami'.
 * // Standard data streams will be retrieved as an object with code, stdout and stderr atributes
 * execute('install.php', '--user=user --password=bitnami',
 *         {cwd: '/opt/bitnami/application/', runAs: 'root', retrieveStdStreams: true});
 */
$app.helpers.execute = function(script, args, options) {
  if (arguments.length === 2 && _.isPlainObject(args)) {
    options = arguments[1];
    args = [];
  }
  options = _.defaults(options || {}, {env: {PATH: `${$app.binDir}:${process.env.PATH}`}});
  let _args = '';
  if (!_.isEmpty(args)) {
    _args = _.isArray(args) ? _.flatten([script, args]) : `${script} ${args}`;
  } else {
    _args = script;
  }
  return $os.runProgram($file.join($app.binDir, 'php'), _args, options);
};

/**
 * Configure the php properties
 * @function runtimes.php~configure
 * @param {Object[]} properties - Object array of properties to configure
 * @example
 * // Configure the memory_limit value
 * configure({'memory_limit': '256M'});
 * // Configure the upload_max_filesize and post_max_size values
 * configure({upload_max_filesize: '40M', post_max_size: '40M'})
 * configure([
 *   {name: 'upload_max_filesize', value: '40M'},
 *   {name: 'post_max_size', value: '40M'}
 * ]);
 * @example
 * // Configure several extensions at the same time
 * configure([ {name: 'extension', value: ['cURL', 'DOM', 'Enchant']} ]);
 * configure({extension: ['cURL', 'DOM', 'Enchant']});
 */
$app.helpers.configure = function(properties) {
  let _properties = {}; // this object will store the standarized input
  if (_.isArray(properties)) {
    // if the parameters are an array, they will be converted into a single object
    properties = _.each(properties, function(property) {
      _properties[property.name] = property.value;
    });
  } else {
    _properties = properties;
  }
  _.each(_properties, function(value, name) {
    _properties[name] = _.isArray(value) ? value : [value]; // all object values must be an array
  });
  _.each(_properties, function(value, name) {
    _.each(value, function(v) {
      const entryRegExp = new RegExp(`^(;)?\\s*${name}\\s*=.*${v}$`, 'm');
      const entryExists = $file.read($file.join($app.confDir, 'php.ini')).match(entryRegExp);
      if (_.isNull(entryExists)) {
        $file.puts($file.join($app.confDir, 'php.ini'), `${name} = ${v}`);
      } else if (!_.isEmpty(entryExists[0])) {
        $file.substitute(
          $file.join($app.confDir, 'php.ini'),
          entryRegExp,
          `${name} = ${v}`,
          {abortOnUnmatch: true, global: false}
        );
      }
    });
  });
};

/**
 * Execute a composer command.
 * @function runtimes.php~composerExecute
 * @param {string} command - The command to execute (command + options + arguments)
 * @param {Object} options - Other options to runProgram
 * @example
 * // To install the defined dependencies for your project
 * composerExecute('install', {cwd: $app.installdir});
 * @example
 * // To install or update one dependency
 * composerExecute('update monolog/monolog', {cwd: $app.installdir});
 */
$app.helpers.composerExecute = function(command, args, options) {
  return this.execute($file.join($app.binDir, 'composer'), _.union(command, args), options);
};

/**
 * Execute a pear command.
 * @function runtimes.php~pearExecute
 * @param {string} command - The command to execute (command + options + arguments)
 * @param {Object} options - Other options to runProgram
 * @example
 * // To install the defined dependencies for your project
 * pearExecute('install', {cwd: $app.installdir});
 * @example
 * // To install or update one dependency
 * pearExecute('update monolog/monolog', {cwd: $app.installdir});
 */
$app.helpers.pearExecute = function(command, args, options) {
  return this.execute($file.join($app.binDir, 'pear'), _.union(command, args), options);
};

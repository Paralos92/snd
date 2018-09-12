'use strict';

const _ = require('lodash');

/**
 * Log functions
 * @namespace base-functions.log
 */

/**
 * Wait until a file content contains a given pattern
 * @function base-functions.log~waitForEntry
 * @param {string} file - File path to check its content
 * @param {string|RegExp} pattern - Glob like pattern or regexp to match
 * @param {Object} [options] - Options object
 * @param {string} [options.encoding] - Encoding used to read the file
 * @param {string} [options.timeout=180] - Timeout
 * @param {string} [options.interval=3] - Interval between retries, in seconds
 * @example
 * // Wait until the app log file matches 'running'
 * waitForEntry($app.logFile, /running/, {timeout: 60});
 */
function waitForEntry(file, pattern, options) {
  options = _.defaults(options || {}, {timeout: 180, interval: 3});

  let matches = false;
  let waited = 0;

  while (!matches) {
    matches = $file.contains(file, pattern, options.encoding);
    if (!matches) $util.sleep(options.interval);
    waited += options.interval;
    if (waited > options.timeout) throw new Error(`Log entry not found after ${options.timeout} s.`);
  }

  return matches;
}

module.exports = {
  waitForEntry,
};

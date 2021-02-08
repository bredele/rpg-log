const csv = require('rpg-csv')
const fs = require('fs')
const mkdirp = require('mkdirp')
const { join } = require('path')

/**
 * Create log with record.
 * 
 * @param {Array} record 
 * @param {String} path 
 * @returns {Object} record
 * @public
 */

module.exports = function(record, path) {
   await writeCsvLog(path, record)
   await writeJsonLog(path, record)
}

/**
 * Write CSV log.
 * 
 * @param {String} path 
 * @param {Array} record 
 * @returns {Promise}
 * @private
 */

async function writeCsvLog(path, record) {
  const result = csv(record)
  const name = (new Date()).toLocaleDateString().replace(/\//g, '-')
  const file = join(path, `${name}.csv`)
  if (await exist(file)) {
    await fs.appendFile(file, result)
  } else {
    await create(file, `${csv.columns}\n${result}`)
  }
}

/**
 * Write JSON log.
 * 
 * @param {String} path 
 * @param {Array} record 
 * @returns {Promise}
 * @private
 */

async function writeJsonLog(path, record) {
  const folder = join(path, 'records')
  mkdirp(folder)
  await create(join(folder, `${new Date().getTime()}.json`), JSON.stringify(record))
}

/**
 * Check if file exist.
 * 
 * @param {String} file 
 * @returns {Promise<Boolean>}
 * @private
 */

async function exist(file) {
  return fs.promises.access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}

/**
 * Create file.
 * 
 * @param {*} file 
 * @param {*} content 
 * @returns {Promise}
 * @private
 */

async function create(file, content) {
  return fs.promises.writeFile(file, content)
}

/**
 * Append to existing file.
 * 
 * @param {String} file 
 * @param {String} content 
 * @returns {Promise}
 * @private
 */

async function append(file, content) {
  return fs.promises.appendFile(file, content)
}
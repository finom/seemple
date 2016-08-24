const { parseRawCommit } = require('conventional-changelog/lib/git')

module.exports = function (pluginConfig, {commits}, cb) {
  let type = null

  commits

  .map((commit) => parseRawCommit(`${commit.hash}\n${commit.message}`))

  .filter((commit) => !!commit)

  .every((commit) => {
    if (commit.breaks.length) {
      type = 'prerelease'
      return false
    }

    if (commit.type === 'feat') type = 'prerelease'

    if (!type && commit.type === 'fix') type = 'prerelease'

    return true
});console.log(type)

  cb(null, type)
}

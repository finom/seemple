const SemanticReleaseError = require('@semantic-release/error');
const RegClient = require('npm-registry-client');
const npmlog = require('npmlog');

module.exports = function (pluginConfig, {pkg, npm, plugins, options}, cb) {
  npmlog.level = npm.loglevel || 'warn'
  let clientConfig = {log: npmlog}
  // disable retries for tests
  if (pluginConfig && pluginConfig.retry) clientConfig.retry = pluginConfig.retry
  const client = new RegClient(clientConfig)

  client.get(`${npm.registry}${pkg.name.replace('/', '%2F')}`, {
    auth: npm.auth
  }, (err, data) => {
    if (err && (
      err.statusCode === 404 ||
      /not found/i.test(err.message)
    )) {
      return cb(null, {})
    }

    if (err) return cb(err)

    let version = data['dist-tags'][npm.tag]

    if (!version &&
      options &&
      options.fallbackTags &&
      options.fallbackTags[npm.tag] &&
      data['dist-tags'][options.fallbackTags[npm.tag]]) {
      version = data['dist-tags'][options.fallbackTags[npm.tag]]
    }

    if (!version) {
      return cb(new SemanticReleaseError(
`There is no release with the dist-tag "${npm.tag}" yet.
Tag a version manually or define "fallbackTags".`, 'ENODISTTAG'))
    }
console.log('data.versions[version].gitHead', data.versions[version].gitHead);
    cb(null, {
      version,
      gitHead: data.versions[version]._shasum,
      get tag () {
        npmlog.warn('deprecated', 'tag will be removed with the next major release')
        return npm.tag
      }
    })
  })
}

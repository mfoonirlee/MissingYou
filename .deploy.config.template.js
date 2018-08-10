module.exports = {
  host: 'host',
  port: 'port',
  username: 'username',
  privateKey: require('fs').readFileSync('/keys/private_key'),
  from: './build',
  to: '/share/html',
}

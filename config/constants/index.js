module.exports = (() => {
  const branch = 'master' //process.env.CIRCLE_BRANCH || 'master'

  // for security reason don't let to require any arbitrary file defined in process.env
  if (['master', 'qa'].indexOf(branch) < 0) {
    return require('./develop')
  }

  return require('./' + branch)
})()

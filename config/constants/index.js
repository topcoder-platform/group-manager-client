module.exports = (() => {
  const branch = process.env.CIRCLE_BRANCH || 'develop'

  // for security reason don't let to require any arbitrary file defined in process.env
  if (['master', 'qa'].indexOf(branch) < 0) {
    return require('./develop')
  }

  return require('./' + branch)
})()

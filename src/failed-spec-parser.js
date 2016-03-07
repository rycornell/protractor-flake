export default function (output = '') {
  let match = null
  let CUCUMBERJS_TEST = /^\d+ scenarios?/m
  let failedSpecs = new Set()

  if (CUCUMBERJS_TEST.test(output)) {
    let FAILED_LINES = /(.*?):\d+ # Scenario:.*/g
    while (match = FAILED_LINES.exec(output)) { // eslint-disable-line no-cond-assign
      failedSpecs.add(match[1])
    }
  } else {
    // jasmine2-reporter
    let FAILED_LINES = /at Object\.<anonymous> \((([A-Z]:\\)?.*?):.*\)/g
    while (match = FAILED_LINES.exec(output)) { // eslint-disable-line no-cond-assign
      // windows output includes stack traces from
      // webdriver so we filter those out here
      if (!/node_modules/.test(match[1])) {
        failedSpecs.add(match[1])
      }
    }
  }

  return [...failedSpecs]
}

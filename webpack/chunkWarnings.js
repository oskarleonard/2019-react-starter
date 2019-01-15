// This file should contain all the reducers in app/reducers/asyncReducers.js

// Warnings will log warnings for any path that is included in the main.js-bundle
// Errors will break the build

// A good workflow when moving reducers from main.js to a separate bundle
// is to first add it as a warning, do the work to move it, and when the
// warning dissapears, add it to errors instead to avoid regressions

module.exports = {
  warnings: [],
  errors: ['redux/employeeReducer'],
};

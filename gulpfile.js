/* eslint-env node */
/* eslint-disable no-var, no-console, strict */

'use strict'

var gulp = require('gulp')

require('./gulp/eslint')
require('./gulp/jest')
require('./gulp/stylelint')

gulp.task('test', ['eslint', 'stylelint', 'jest'])

const queryUtils = require('./queryUtils')
const assert = require('assert')

assert.equal(queryUtils.buildRegex(undefined), null)
assert.equal(queryUtils.buildRegex(null), null)
assert.equal(queryUtils.buildRegex(' '), null)

assert.deepEqual(queryUtils.buildRegex('coffee'), /.*coffee.*/)
assert.deepEqual(queryUtils.buildRegex('coffee '), /.*coffee.*/)
assert.deepEqual(queryUtils.buildRegex('  coffee'), /.*coffee.*/)

assert.deepEqual(queryUtils.buildRegex('coffee tea'), /.*coffee.*tea.*/)

assert.deepEqual(queryUtils.buildQuery(undefined), {})
assert.deepEqual(queryUtils.buildQuery('coffee'), {$or: [{title: /.*coffee.*/}, {memo: /.*coffee.*/}]})
assert.deepEqual(queryUtils.buildQuery('coffee tea'), {$or: [{title: /.*coffee.*tea.*/}, {memo: /.*coffee.*tea.*/}]})

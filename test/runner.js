/* global describe,it,beforeEach */

'use strict';

var strictEqual = require('assert').strictEqual;
var path = require('path');
var exec = require('child_process').exec;
var grunt = require('grunt');

var execOptions = {
	cwd: path.join(__dirname, '..')
};
var tmp = 'tmp/test/';
var fixtures = 'test/fixtures/expected/';

describe('grunt-robots-txt', function () {
	beforeEach(function (done) {
		exec('grunt prepare', execOptions, function () {
			done();
		});
	});

	var files = [
		'ua-one-disallow-one',
		'ua-one-disallow-two',
		'ua-two-disallow-one',
		'ua-two-disallow-two',
		'ua-one-allow-one',
		'ua-one-allow-two',
		'ua-two-allow-one',
		'ua-two-allow-two',
		'aio'
	];

	files.forEach(function (file) {
		it(file, function (done) {
			var actual = grunt.file.read(tmp + file + '/robots.txt');
			var expected = grunt.file.read(fixtures + file + '.txt');
			strictEqual(actual, expected);
			done();
		});
	});
});

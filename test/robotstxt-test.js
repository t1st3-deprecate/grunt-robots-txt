'use strict';

var grunt = require('grunt');

var tmp = 'tmp/test/';
var fixtures = 'test/fixtures/expected/';

exports.robotstxt = {
	robotsCreated: function (test) {
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

		test.expect(files.length);

		files.forEach(function (file) {
			var actual = grunt.file.read(tmp + file + '/robots.txt');
			var expected = grunt.file.read(fixtures + file + '.txt');
			test.equal(actual, expected, 'task output should equal ' + file);
		});

		test.done();
	}
};

'use strict';

/*
 * grunt-robots-txt
 * https://github.com/T1st3/grunt-robots-txt
 *
 * Copyright (c) 2014 T1st3
 * Licensed under the MIT license.
 */

var fs, path, _, chalk;
path = require('path');
fs = require('fs');
_ = require('lodash');
chalk = require('chalk');

module.exports = function (grunt) {
	return grunt.registerMultiTask('robotstxt', 'Generates robots.txt', function () {
		var policy, items, str, root, rootWarnMess, robotsPath;
		root = path.normalize(this.data.dest || '.');
		rootWarnMess = 'No "dest" parameter defined. Using current directory.';
		if (root === '.') {
			grunt.log.subhead(rootWarnMess);
		}
		policy = this.data.policy || {'ua': '*', 'disallow': ''};
		str = '';
		items = _.map(policy, function (p) {
			if (p.ua) {
				str += 'User-agent: ' + p.ua + '\n';
				if (!p.disallow) {
					str += 'Disallow: \n\n';
				} else {
					if (typeof(p.disallow) === 'string') {
						str += 'Disallow: ' + p.disallow + '\n\n';
					}
					if (typeof(p.disallow) === 'object') {
						_.map(p.disallow, function (d) {
							str += 'Disallow: ' + d + '\n';
						});
						str += '\n';
					}
				}
			}
		});
		robotsPath = path.join(root, 'robots.txt');
		grunt.file.write(robotsPath, str);
		grunt.log.writeln(chalk.green('>>') + ' Robots.txt created successfully');
		if (grunt.task.current.errorCount) {
			return false;
		} else {
			return true;
		}
	});
};

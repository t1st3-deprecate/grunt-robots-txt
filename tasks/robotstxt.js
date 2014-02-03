'use strict';

/*
 * grunt-robots-txt
 * https://github.com/T1st3/grunt-robots-txt
 *
 * Copyright (c) 2014 T1st3
 * Licensed under the MIT license.
 */

var fs, path, _, chalk, updateNotifier, notifier;
path = require('path');
fs = require('fs');
_ = require('lodash');
chalk = require('chalk');
updateNotifier = require('update-notifier');

module.exports = function (grunt) {
	return grunt.registerMultiTask('robotstxt', 'Generates robots.txt', function () {
		notifier = updateNotifier({
			packagePath: '../package.json',
			packageName: 'grunt-robots-txt'
		});
		if (notifier.update) {
			notifier.notify();
		}
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
				if (p.disallow) {
					if (typeof(p.disallow) === 'string') {
						str += 'Disallow: ' + p.disallow + '\n';
					}
					if (typeof(p.disallow) === 'object') {
						_.map(p.disallow, function (d) {
							str += 'Disallow: ' + d + '\n';
						});
					}
				}
				if (p.allow) {
					if (typeof(p.allow) === 'string') {
						str += 'Allow: ' + p.allow + '\n';
					}
					if (typeof(p.allow) === 'object') {
						_.map(p.allow, function (d) {
							str += 'Allow: ' + d + '\n';
						});
					}
				}
			}
			if (p.sitemap) {
				if (typeof(p.sitemap) === 'string') {
					str += 'Sitemap: ' + p.sitemap + '\n';
				}
				if (typeof(p.sitemap) === 'object') {
					_.map(p.sitemap, function (d) {
						str += 'Sitemap: ' + d + '\n';
					});
				}
			}
			if (p.crawldelay && typeof(p.crawldelay) === 'number') {
				str += 'Crawl-delay: ' + p.crawldelay;
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

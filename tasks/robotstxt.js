'use strict';

/*
* grunt-robots-txt
* https://github.com/t1st3/grunt-robots-txt
*
* Copyright (c) 2014 t1st3
* Licensed under the MIT license.
*/

var path = require('path');
var _ = require('lodash');
var chalk = require('chalk');
var updateNotifier = require('update-notifier');
var pkg = require('../package.json');

module.exports = function (grunt) {
	return grunt.registerMultiTask('robotstxt', 'Generates robots.txt', function () {
		updateNotifier({pkg: pkg}).notify();
		var root = path.normalize(this.data.dest || '.');
		var rootWarnMess = 'No "dest" parameter defined. Using current directory.';
		if (root === '.') {
			grunt.log.subhead(rootWarnMess);
		}
		var policy = this.data.policy || {ua: '*', disallow: ''};
		var str = '';
		var n = 0;
		_.map(policy, function (p) {
			if (p.ua) {
				if (n !== 0) {
					str += '\n';
				}
				n += 1;
				str += 'User-agent: ' + p.ua;
				if (p.disallow) {
					if (typeof (p.disallow) === 'string') {
						str += '\nDisallow: ' + p.disallow;
					}
					if (typeof (p.disallow) === 'object') {
						_.map(p.disallow, function (d) {
							str += '\nDisallow: ' + d;
						});
					}
				}
				if (p.allow) {
					if (typeof (p.allow) === 'string') {
						str += '\nAllow: ' + p.allow;
					}
					if (typeof (p.allow) === 'object') {
						_.map(p.allow, function (d) {
							str += '\nAllow: ' + d;
						});
					}
				}
			}
			if (p.sitemap) {
				if (typeof (p.sitemap) === 'string') {
					str += '\nSitemap: ' + p.sitemap;
				}
				if (typeof (p.sitemap) === 'object') {
					_.map(p.sitemap, function (d) {
						str += '\nSitemap: ' + d;
					});
				}
			}
			if (p.crawldelay && typeof (p.crawldelay) === 'number') {
				str += '\nCrawl-delay: ' + p.crawldelay;
			}
			if (p.host && typeof (p.host) === 'string') {
				str += '\nHost: ' + p.host;
			}
		});
		var robotsPath = path.join(root, 'robots.txt');
		grunt.file.write(robotsPath, str);
		grunt.log.writeln(chalk.green('>>') + ' Robots.txt created successfully');
		if (grunt.task.current.errorCount) {
			return false;
		}
		return true;
	});
};

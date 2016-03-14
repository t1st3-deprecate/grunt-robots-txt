'use strict';

/*
* grunt-robots-txt
* https://github.com/t1st3/grunt-robots-txt
*
* Copyright (c) 2014 t1st3
* Licensed under the MIT license.
*/

var fs, path, _, chalk, updateNotifier;
path = require('path');
fs = require('fs');
_ = require('lodash');
chalk = require('chalk');
updateNotifier = require('update-notifier');

module.exports = function (grunt) {
  return grunt.registerMultiTask('robotstxt', 'Generates robots.txt', function () {
    var pkg, policy, items, str, root, rootWarnMess, robotsPath, n;
    pkg = require('../package.json');
    updateNotifier({pkg: pkg}).notify();
    root = path.normalize(this.data.dest || '.');
    rootWarnMess = 'No "dest" parameter defined. Using current directory.';
    if (root === '.') {
      grunt.log.subhead(rootWarnMess);
    }
    policy = this.data.policy || {'ua': '*', 'disallow': ''};
    str = '';
    n = 0;
    items = _.map(policy, function (p) {
      if (p.ua) {
        if (n !== 0) {
          str += '\n';
        }
        n += 1;
        str += 'User-agent: ' + p.ua;
        if (p.disallow) {
          if (typeof(p.disallow) === 'string') {
            str += '\nDisallow: ' + p.disallow;
          }
          if (typeof(p.disallow) === 'object') {
            _.map(p.disallow, function (d) {
              str += '\nDisallow: ' + d;
            });
          }
        }
        if (p.allow) {
          if (typeof(p.allow) === 'string') {
            str += '\nAllow: ' + p.allow;
          }
          if (typeof(p.allow) === 'object') {
            _.map(p.allow, function (d) {
              str += '\nAllow: ' + d;
            });
          }
        }
      }
      if (p.sitemap) {
        if (typeof(p.sitemap) === 'string') {
          str += '\nSitemap: ' + p.sitemap;
        }
        if (typeof(p.sitemap) === 'object') {
          _.map(p.sitemap, function (d) {
            str += '\nSitemap: ' + d;
          });
        }
      }
      if (p.crawldelay && typeof(p.crawldelay) === 'number') {
        str += '\nCrawl-delay: ' + p.crawldelay;
      }
      if (p.host && typeof(p.host) === 'string') {
        str += '\nHost: ' + p.host;
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

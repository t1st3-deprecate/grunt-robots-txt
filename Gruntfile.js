/*
 * grunt-robots-txt
 * https://github.com/T1st3/grunt-robots-txt
 *
 * Copyright (c) 2014 T1st3
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
	
	require('time-grunt')(grunt);

	require('load-grunt-tasks')(grunt, {
		scope: 'devDependencies',
		config: 'package.json',
		pattern: ['grunt-*']
	});
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'tasks/**/*.js',
				'test/**/*.js'
			]
		},
		jscs: {
			src: ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js'],
			options: {
				config: '.jscs.json'
			}
		},
		clean: {
			tests: ['tmp']
		},
		robotstxt: {
			uaOneDisallowOne: {
				dest: 'tmp/test/ua-one-disallow-one',
				policy: [
					{
						ua: '*',
						disallow: '/private/'
					}
				]
			},
			uaOneDisallowTwo: {
				dest: 'tmp/test/ua-one-disallow-two',
				policy: [
					{
						ua: '*',
						disallow: ['/private/', '/admin/']
					}
				]
			},
			uaTwoDisallowOne: {
				dest: 'tmp/test/ua-two-disallow-one',
				policy: [
					{
						ua: 'googlebot',
						disallow: '/private/'
					},
					{
						ua: 'BadBot',
						disallow: '/admin/'
					}
				]
			},
			uaTwoDisallowTwo: {
				dest: 'tmp/test/ua-two-disallow-two',
				policy: [
					{
						ua: 'googlebot',
						disallow: ['/private/', '/admin/']
					},
					{
						ua: 'BadBot',
						disallow: ['/private1/', '/admin1/']
					}
				]
			}
		},
		nodeunit: {
			tests: ['test/*_test.js']
		}
	});
	
	grunt.loadTasks('tasks');
	
	grunt.registerTask('default', [
		'jshint',
		'jscs',
		'clean',
		'robotstxt:uaOneDisallowOne',
		'robotstxt:uaOneDisallowTwo',
		'robotstxt:uaTwoDisallowOne',
		'robotstxt:uaTwoDisallowTwo',
		'nodeunit'
	]);
};

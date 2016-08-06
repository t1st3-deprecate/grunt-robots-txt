/*
 * grunt-robots-txt
 * https://github.com/t1st3/grunt-robots-txt
 *
 * Copyright (c) 2014 t1st3
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
			},
			uaOneAllowOne: {
				dest: 'tmp/test/ua-one-allow-one',
				policy: [
					{
						ua: '*',
						allow: '/private/'
					}
				]
			},
			uaOneAllowTwo: {
				dest: 'tmp/test/ua-one-allow-two',
				policy: [
					{
						ua: '*',
						allow: ['/private/', '/admin/']
					}
				]
			},
			uaTwoAllowOne: {
				dest: 'tmp/test/ua-two-allow-one',
				policy: [
					{
						ua: 'googlebot',
						allow: '/private/'
					},
					{
						ua: 'BadBot',
						allow: '/admin/'
					}
				]
			},
			uaTwoAllowTwo: {
				dest: 'tmp/test/ua-two-allow-two',
				policy: [
					{
						ua: 'googlebot',
						allow: ['/private/', '/admin/']
					},
					{
						ua: 'BadBot',
						allow: ['/private1/', '/admin1/']
					}
				]
			},
			aio: {
				dest: 'tmp/test/aio',
				policy: [
					{
						ua: 'googlebot',
						disallow: '/test/',
						allow: ['/private/', '/admin/']
					},
					{
						ua: 'BadBot',
						disallow: '/new/',
						allow: ['/private1/', '/admin1/']
					},
					{
						sitemap: ['http://example.com/sitemap.xml', 'http://alernate.org/sitemap.xml']
					},
					{
						crawldelay: 100
					},
					{
						host: 'www.example.org'
					}
				]
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('prepare', [
		'robotstxt:uaOneDisallowOne',
		'robotstxt:uaOneDisallowTwo',
		'robotstxt:uaTwoDisallowOne',
		'robotstxt:uaTwoDisallowTwo',
		'robotstxt:uaOneAllowOne',
		'robotstxt:uaOneAllowTwo',
		'robotstxt:uaTwoAllowOne',
		'robotstxt:uaTwoAllowTwo',
		'robotstxt:aio'
	]);

	grunt.registerTask('default', [
		'prepare'
	]);
};

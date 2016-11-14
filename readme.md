grunt-robots-txt
================

**UNMAINTAINED** | This project is not maintained anymore (as of 2016 November 14).

**Grunt plugin for generating robots.txt.**

[![NPM version](https://img.shields.io/npm/v/grunt-robots-txt.svg)](https://www.npmjs.com/package/grunt-robots-txt)
[![Dependency Status](https://david-dm.org/t1st3/grunt-robots-txt.png?theme=shields.io)](https://david-dm.org/t1st3/grunt-robots-txt)
[![Build Status](https://travis-ci.org/t1st3/grunt-robots-txt.png?branch=master)](https://travis-ci.org/t1st3/grunt-robots-txt)


Installation
----------

Install npm package:

```
npm install grunt-robots-txt
```


Add this line to your project's `Gruntfile.js`:

```
grunt.loadNpmTasks('grunt-robots-txt');
```


Configuration
----------

`robotstxt` is a multitask, so you can use `robotstxt:dist` and register some other tasks than "dist":

```
	grunt.initConfig({
	
		robotstxt: {
			dist: {
				dest: 'src/',
				policy: [
					{
						ua: 'googlebot',
						disallow: '/private/'
					},
					{
						ua: 'googlebot-news',
						disallow: ['/other/', '/another/'],
						allow: '/new/'
					},
					{
						ua: 'googlebot-third',
						allow: ['/new1/', 'new2']
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
```

Options
----------


* **dest**: `String` *('./' by default)*

	Path where robots.txt will be created


* **policy**: `Object` *('' by default)*

	Hash of your policy.
	Note that you can give an array of values for `disallow` in order to create multiple `Disallow` lines for the concerned User-agent. Same is possible for `Allow` and `Sitemap` lines.

	There can be only 1 `Crawl-delay` option, and only 1 `Host` option. If you supply more, only th last one will be added to the robots.txt file.

	As `Sitemap`, `Crawl-delay` and `Host` are non-standard, if you don't supply any of these in your config, your robots.txt will not include these options by default.



Build from sources
----------

There is a build process (which involves Grunt) for this Grunt task. Basically, the process will check the code with [JSHint](http://jshint.com) and [JSCS](https://npmjs.org/package/jscs), and execute some tests.

You can launch this process with the `grunt` command:

```
grunt
```

Or if you just want to test (and not check code):

```
grunt test
```


[![devDependency Status](https://david-dm.org/t1st3/grunt-robots-txt/dev-status.png?theme=shields.io)](https://david-dm.org/t1st3/grunt-robots-txt#info=devDependencies)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)



License
-----------

This plugin for Grunt is released under the [MIT License](https://github.com/t1st3/grunt-robots-txt/blob/master/license).

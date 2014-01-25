grunt-robots-txt
================

**Grunt plugin for generating robots.txt.**

[![NPM version](https://badge.fury.io/js/grunt-robots-txt.png)](http://badge.fury.io/js/grunt-robots-txt)
[![Dependency Status](https://david-dm.org/t1st3/grunt-robots-txt.png?theme=shields.io)](https://david-dm.org/t1st3/grunt-robots-txt)
[![Build Status](https://travis-ci.org/T1st3/grunt-robots-txt.png?branch=master)](https://travis-ci.org/T1st3/grunt-robots-txt)


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
						disallow: ['/other/', '/another/']
					}
				]
			}
		}
	
	});
```

Options
----------


* **dest**: `String` *(`./` by default)*

	Path where robots.txt will be created


* **policy**: `Object` *(`{ua: '*', disallow: ''}` by default)*

	Hash of your policy.
	Note that you can give an array of values for `disallow` in order to create multiple `Disallow` lines for the concerned User-agent.



Build from sources
----------

There is a build process (which involves Grunt) for this Grunt task. Basically, the process will check the code with [JSHint](http://jshint.com) and [JSCS](https://npmjs.org/package/jscs), and execute some tests.

You can launch this process with the `grunt` command:

```
grunt
```

[![devDependency Status](https://david-dm.org/t1st3/grunt-robots-txt/dev-status.png?theme=shields.io)](https://david-dm.org/t1st3/grunt-robots-txt#info=devDependencies)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)



License
-----------

This generator is released under the [MIT License](https://github.com/T1st3/grunt-robots-txt/blob/master/LICENSE).
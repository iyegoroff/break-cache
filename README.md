break-cache
=========
[![npm version](https://badge.fury.io/js/break-cache.svg)](https://badge.fury.io/js/break-cache)
[![Build Status](https://travis-ci.org/iyegoroff/break-cache.svg?branch=master)](https://travis-ci.org/iyegoroff/break-cache)
[![Coverage Status](https://coveralls.io/repos/github/iyegoroff/break-cache/badge.svg?branch=master)](https://coveralls.io/github/iyegoroff/break-cache?branch=master)
[![Dependency Status](https://david-dm.org/iyegoroff/break-cache/status.svg)](https://david-dm.org/iyegoroff/break-cache)
[![devDependency Status](https://david-dm.org/iyegoroff/break-cache/dev-status.svg)](https://david-dm.org/iyegoroff/break-cache#info=devDependencies)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/break-cache)

Searches strings inside input file and adds (or updates) current timestamp to these strings as URL query parameter.

## Installation

```bash
$ npm i break-cache
```

## Usage

### CLI

```bash
$ break-cache --input file [--match pattern] [--output file] [--param name]
```

options:<br/>
`-i, --input` - input file<br/> 
`-m, --match` - regexp for searching URLs inside input file<br/>
`-o, --output` - output file (default: STDOUT)<br/>
`-p, --param` - timestamp query parameter name (default: t)<br/>

### API

```javascript
const breakCache = require('break-cache');

// options: { input: string, match?: RegExp, output?: string, param?: string }
// streamOrCallback?: stream.Writable | ((err, data) => void)
breakCache(options, stream);
```

## Example

```bash
$ break-cache README.md -m \.svg -o README.md
```
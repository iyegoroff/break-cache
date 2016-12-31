#!/usr/bin/env node

const fs = require('fs');
const querystring = require('querystring');
const prmzfy = require('prmzfy');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const optionDefs = [
    {
        name: 'input',
        alias: 'i',
        type: String,
        typeLabel: '[underline]{file}',
        description: 'input file'
    },
    {
        name: 'match',
        alias: 'm',
        type: RegExp,
        typeLabel: '[underline]{regexp}',
        description: 'regexp for searching URLs inside input file'
    },
    {
        name: 'output',
        alias: 'o',
        type: String,
        typeLabel: '[underline]{file}',
        description: 'output file (default: STDOUT)'
    },
    {
        name: 'param',
        alias: 'p',
        type: String,
        typeLabel: '[underline]{name}',
        description: 'timestamp query parameter name (default: t)'
    }
];

const sections = [
    {
        header: 'Generic cache breaker',
        content: 'Adds timestamps to matched URLs.'
    },
    {
        header: 'Syntax',
        content: '$ break-cache ' +
            '[bold]{-i} [underline]{file} ' +
            '[[bold]{-m} [underline]{pattern}] ' +
            '[[bold]{-o} [underline]{file}] ' +
            '[[bold]{-p} [underline]{name}]'
    },
    {
        header: 'Options',
        optionList: optionDefs
    },
    {
        header: 'Example',
        content: '$ break-cache README.md -m \\.svg -o README.md'
    }
];

const options = commandLineArgs(optionDefs);
const usage = commandLineUsage(sections);

const api = (options) => {
    return options;
};

console.log(usage);
api(options);

module.exports = api;

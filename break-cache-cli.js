#!/usr/bin/env node

const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const breakCache = require('./break-cache');

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
        type: String,
        typeLabel: '[underline]{pattern}',
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
        header: 'Break cache',
        content: 'Adds timestamps to matched URLs.'
    },
    {
        header: 'Syntax',
        content: '$ break-cache ' +
            '[bold]{--input} [underline]{file} ' +
            '[[bold]{--match} [underline]{pattern}] ' +
            '[[bold]{--output} [underline]{file}] ' +
            '[[bold]{--param} [underline]{name}]'
    },
    {
        header: 'Options',
        optionList: optionDefs
    },
    {
        header: 'Examples',
        content: [
            'These commands are equivalent:',
            '',
            '$ break-cache README.md -m \\\\.svg -o README.md',
            '$ break-cache README.md -m \'\\.svg\' -o README.md'
        ]
    }
];

try {
    breakCache(commandLineArgs(optionDefs), process.stdout);
} catch (e) {
    console.log(commandLineUsage(sections));
}

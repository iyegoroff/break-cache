const t = require('tap');
const fs = require('fs');
const stream = require('stream');
const prmzfy = require('prmzfy');
const breakCache = require('../break-cache');

const readFile = prmzfy(fs.readFile);

t.test('should throw error if "input" option is omitted', t => {
    t.throws(() => breakCache({}), new Error('input file is required'));
    t.end();
});

t.test('should pipe output to stream if "output" is omitted', t => {
    const output = stream.Writable();

    output._write = data => {
        t.equal(data.toString(), 'this is just text');
        t.end();
    };

    breakCache({ input: 'test/fixtures/plain.txt' }, output);
});

t.test('should use custom timestamp param name', t => {
    const output = stream.Writable();

    output._write = data => {
        t.match(data.toString(), /<link href="some-resource.css\?timestamp=\d+" rel="stylesheet">/);
        t.end();
    };

    breakCache({ input: 'test/fixtures/with-link.txt', match: '\\.css', param: 'timestamp' }, output);
});

t.test('should add timestamps and create new file', t => {
    const output = 'test/temp/html.txt';

    prmzfy(breakCache)({ input: 'test/fixtures/html.txt', match: '\\.(css|js)', output })
        .then(() => readFile(output))
        .then(data => {
            t.match(data.toString(), require('./fixtures/expected/html'));
            t.end();
        })
        .catch(err => t.fail(err.toString()));
});

t.test('should update file with timestamps', t => {
    const output = 'test/temp/readme.txt';

    prmzfy(breakCache)({ input: 'test/fixtures/readme.txt', match: '\\.svg', output })
        .then(() => readFile(output))
        .then(data => {
            t.match(data.toString(), require('./fixtures/expected/readme'));
            t.end();
        })
        .catch(err => t.fail(err.toString()));
});

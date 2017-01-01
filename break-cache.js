const fs = require('fs');
const stream = require('stream');
const prmzfy = require('prmzfy');

const readFile = prmzfy(fs.readFile);
const writeFile = prmzfy(fs.writeFile);

module.exports = (options, streamOrCallback) => {
    const input = options.input;
    const match = options.match;
    const output = options.output;
    const param = options.param || 't';

    if (!input) {
        throw new Error('input file is required');
    }

    const time = Date.now();

    readFile(input)
        .then(data => data.toString()
            .split(new RegExp(`(?=${(match || '').replace(/([^\\])\(([^?])/g, '$1(?:$2')})`, 'g'))
            .map((str, i) => {
                const updated = str.replace(new RegExp(`(\\?|&)${param}=\\d+`), `$1${param}=${time}`);

                if (updated === str) {
                    return updated
                        .replace(new RegExp(`(${match})`), `$1?${param}=${time}`)
                        .replace(new RegExp(`(${match}\\?${param}=${time})\\?`), '$1&');
                } else {
                    return updated;
                }
            })
            .join('')
        )
        .then(data => {
            if (output) {
                const streamOrCallbackIsFunction = typeof streamOrCallback === 'function';

                writeFile(output, data)
                    .then(() => {
                        if (streamOrCallbackIsFunction) {
                            streamOrCallback(null, data);
                        }
                    })
                    .catch(err => {
                        if (streamOrCallbackIsFunction) {
                            streamOrCallback(err);
                        }
                    });
            } else if (streamOrCallback instanceof stream.Writable) {
                streamOrCallback.write(data);
            }
        });
};

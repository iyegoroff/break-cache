define({
    tunnel: 'NullTunnel',

    reporters: ['Console'],

    suites: ['tests/unit/index'],

    excludeInstrumentation: /^(?:tests|node_modules)\//
});

const webpack = require( 'webpack' );

const plugins = [
    new webpack.NoEmitOnErrorsPlugin()
];

module.exports = {
    entry: './src/index.js',
    target: 'node',
    externals: {
        'sham-ui-templates': 'sham-ui-templates',
        'sham-ui-templates/lib/compiler/sourceNode': 'sham-ui-templates/lib/compiler/sourceNode',
        '@babel/core': '@babel/core',
        'fs': 'fs',
        'sham-ui': 'sham-ui',
        'find-babel-config': 'find-babel-config'
    },
    output: {
        path: __dirname,
        filename: 'index.js',
        publicPath: '/',
        library: 'sham-ui-test-helper',
        libraryTarget: 'umd',
    },
    plugins: plugins,
    module: {
        rules: [ {
            test: /(\.js)$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/,
            include: __dirname
        }, {
            test: /\.sht/,
            loader: 'sham-ui-templates-loader?{}'
        } ]
    }
};

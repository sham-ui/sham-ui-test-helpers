const webpack = require( 'webpack' );

const env = process.env.WEBPACK_ENV;
const plugins = [
    new webpack.NoEmitOnErrorsPlugin()
];

if ( env === 'build' ) {
    plugins.push( new webpack.optimize.UglifyJsPlugin( { minimize: true } ) );
}

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: 'index.js',
        publicPath: '/'
    },
    plugins: plugins,
    module: {
        loaders: [ {
            test: /(\.js)$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/,
            include: __dirname
        }, {
            test: /\.sht/,
            loader: 'sham-ui-templates-loader'
        } ]
    }
};

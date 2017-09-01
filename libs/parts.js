const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

exports.devServer = function(options) {
    return {
        devServer: {
            historyApiFallback: true,
            contentBase: __dirname + '/build',
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: options.host, // Defaults to `localhost`
            port: options.port // Defaults to 8080
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    };
}

exports.commonConfig = function(buildPath){
    return {
        devtool : "source-map",
        output :{
            path : buildPath,
            filename : "[name].[chunkhash].js",
            chunkFilename : "[chunkhash].js"
        }
    }
}

exports.clean = function(buildPath) {
    return {
        plugins: [
            new CleanWebpackPlugin([buildPath], {
                // Without `root` CleanWebpackPlugin won't point to our
                // project and will fail to work.
                root: process.cwd()
            })
        ]
    };
}

exports.setFreeVariable = function(key, value) {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    };
}

exports.minify = function(){
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    };
}

exports.babel = function() {
    return {
        module: {
            loaders: [
                { test: /\.js$/,loader: 'babel-loader',exclude: /node_modules/},
                { test: /\.jsx$/,loader: 'babel-loader',exclude: /node_modules/}
            ]
        }
    };
}

exports.extractVendorBundle = function (generatedVendorJSName) {
    return new webpack.optimize.CommonsChunkPlugin({
        name: generatedVendorJSName,
        filename : generatedVendorJSName+".[hash].js"
    })
}

exports.createExtractedCSSFile = function () {
    return new ExtractTextPlugin('[name].[chunkhash].css');
}

exports.extractCSS = function (cssFiles) {
    return {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        include: cssFiles
    }
}

exports.createIndexHTML = function(module){
    return new HtmlWebpackPlugin({
        filename : module.generatedIndexHTMLFile,
        template : module.indexHTMLTemplateFileLocation,
        chunks : [module.generatedVendorJSName, module.generatedIndexJSName, module.generatedVendorCSSName, module.generatedIndexCSSName]
    })
}

exports.getJquery = function () {
    return new webpack.ProvidePlugin({
        $ : "jquery",
        jQuery : "jquery"
    })
}

exports.tsLoader = function(){
    return{
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader']
    }
}

exports.angularTemplateLoader = function(){
    return{
        test: /\.ts$/,
        loaders: ['angular2-template-loader']
    }
}

exports.rawLoaderForNg2Templates = function () {
    return{
        test : /\.tpl.ng.(html|css)$/,
        loader : "raw-loader",
        exclude : /\.async\.(html|css)/
    }
}

exports.urlLoaderForImagesAndFontAwesome = function () {
    return{
        test: /\.(woff|png|jpg|gif|eot|svg|ttf|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }
}

exports.fileLoaderForOtherMediaTypes = function () {
    return{
        test: /\.(woff|png|jpg|gif)$/,
        loader: "file-loader"
    }
}
const path = require("path");
const merge = require("webpack-merge");
const appConfig = require("./libs/app.config");
const moduleConfig = require("./libs/module.config");
const parts = require("./libs/parts");

const STATIC_ASSET_PATH = __dirname;
const APP_PATHS = appConfig.getPaths(STATIC_ASSET_PATH);

const modules = moduleConfig.getEntries(APP_PATHS.appBase, APP_PATHS.projectBase);

var exportsArray = [];
var buildOutputArray = [];

var entryObjTest = {};
var commonPluginArrTest = [];
var extractCSSLoadersTest = [];
var tempCSSExtractionArrTest = [];

for (var i = 0; i < modules.length; i++) {
    var entryObj = {};
    var commonPluginArr = [];
    var extractCSSLoaders = [];
    var tempCSSExtractionArr = [];

    var _module = modules[i];

    if (_module.hasOwnProperty("generatedIndexJSName")) {
        entryObj[_module.generatedIndexJSName] = _module.indexJSLocation;
        entryObjTest[_module.generatedIndexJSName] = _module.indexJSLocation;
    }

    if (_module.hasOwnProperty("generatedIndexCSSName")) {
        entryObj[_module.generatedIndexCSSName] = _module.cssFiles;
        entryObjTest[_module.generatedIndexCSSName] = _module.cssFiles;
    }

    if (_module.hasOwnProperty("generatedIndexHTMLFile")) {
        commonPluginArr.push(parts.createIndexHTML(_module))
        commonPluginArrTest.push(parts.createIndexHTML(_module))
    }

    if (_module.hasOwnProperty("generatedVendorJSName")) {
        entryObj[_module.generatedVendorJSName] = _module.jsVendors;
        commonPluginArrTest.push(parts.extractVendorBundle(_module.generatedVendorJSName))
        entryObjTest[_module.generatedVendorJSName] = _module.jsVendors;
    }

    if (_module.hasOwnProperty("generatedVendorCSSName")) {
        entryObj[_module.generatedVendorCSSName] = _module.vendorCSSFiles;
        entryObjTest[_module.generatedVendorCSSName] = _module.vendorCSSFiles;
    }

    if (_module.hasOwnProperty("cssFiles")) {
        var tempCSSFiles = [];

        var tempCSSFilesTest = [];
        for (var j = 0; j < _module.cssFiles.length; j++) {
            if (tempCSSExtractionArr.indexOf(_module.cssFiles[j]) < 0) {
                tempCSSFiles.push((_module.cssFiles[j]));
            }

            if (tempCSSExtractionArrTest.indexOf(_module.cssFiles[j]) < 0) {
                tempCSSFilesTest.push((_module.cssFiles[j]));
            }
        }
        if (tempCSSFiles.length > 0) {
            extractCSSLoaders.push(
                parts.extractCSS(tempCSSFiles)
            )
        }
        if (tempCSSFilesTest.length > 0) {
            extractCSSLoadersTest.push(
                parts.extractCSS(tempCSSFilesTest)
            )
        }
        tempCSSExtractionArr = tempCSSExtractionArr.concat(_module.cssFiles);
        tempCSSExtractionArrTest = tempCSSExtractionArrTest.concat(_module.cssFiles);
    }

    if (_module.hasOwnProperty("vendorCSSFiles")) {
        var tempVendorCSSFiles = [];

        var tempVendorCSSFilesTest = [];
        for (var j = 0; j < _module.vendorCSSFiles.length; j++) {
            if (tempCSSExtractionArr.indexOf(_module.vendorCSSFiles[j]) < 0) {
                tempVendorCSSFiles.push((_module.vendorCSSFiles[j]));
            }

            if (tempCSSExtractionArrTest.indexOf(_module.vendorCSSFiles[j]) < 0) {
                tempVendorCSSFilesTest.push((_module.vendorCSSFiles[j]));
            }
        }
        if (tempVendorCSSFiles.length > 0) {
            extractCSSLoaders.push(
                parts.extractCSS(tempVendorCSSFiles)
            )
        }
        if (tempVendorCSSFilesTest.length > 0) {
            extractCSSLoadersTest.push(
                parts.extractCSS(tempVendorCSSFilesTest)
            )
        }
        tempCSSExtractionArr = tempCSSExtractionArr.concat(_module.vendorCSSFiles);
        tempCSSExtractionArrTest = tempCSSExtractionArrTest.concat(_module.vendorCSSFiles);
    }

    var buildOutputPath = _module.hasOwnProperty("buildOutputDir") ? _module.buildOutputDir : APP_PATHS.build;
    buildOutputArray.push(buildOutputPath);

    var common = {
        entry: entryObj,
        resolve: {
            extensions: ["", ".js", ".ts"]
        },
        output: {
            path: buildOutputPath,
            filename: "[name].js",
            publicPath: "/site/"
        },
        plugins: commonPluginArr,
        module: {
            loaders: []
        }
    }

    common.plugins.push(parts.createExtractedCSSFile());
    common.plugins.push(parts.getJquery());
    common.module.loaders = extractCSSLoaders;
    common.module.loaders.push(parts.tsLoader());
    common.module.loaders.push(parts.urlLoaderForImagesAndFontAwesome());
    common.module.loaders.push(parts.fileLoaderForOtherMediaTypes());
    exportsArray.push(common);
}

var commonTest = {
    entry: entryObjTest,
    output: {
        path: APP_PATHS.build,
        filename: "[name].js",
        publicPath: "/site/"
    },
    plugins: commonPluginArrTest,
    module: {
        loaders: []
    }
}

commonTest.plugins.push(parts.createExtractedCSSFile());
commonTest.plugins.push(parts.getJquery());
commonTest.module.loaders = extractCSSLoadersTest;

var configs = [];

switch (process.env.npm_lifecycle_event) {
    case "test":
        console.log("In test lifecycle event");
        configs.push(merge(commonTest,
            {
                devtool: "source-map"
            },
            parts.babel()
        ));
        break;
    case "start":
        console.log("In start lifecycle event");
        for (var i = 0; i < exportsArray.length; i++) {
            configs.push(merge(exportsArray[i],
                {
                    devtool: "source-map"
                },
                parts.devServer({
                    host: process.env.HOST,
                    port: process.env.POST
                }),
                parts.babel()
            ))
        }
        break;
    default :
        console.log("In default/build lifecycle event");
        for (var i = 0; i < exportsArray.length; i++) {
            configs.push(merge(exportsArray[i],
                parts.commonConfig(buildOutputArray[i]),
                parts.clean(buildOutputArray[i]),
                parts.setFreeVariable(
                    "process.env.NOVE_ENV",
                    "production"
                ),
                parts.minify(),
                parts.babel()
            ))
        }
}

module.exports = configs
const path = require("path");

const moduleConfig = {
    getEntries : function (appBasePath, projectBasePath) {
        return [
            {
                generatedIndexJSName : "gen.angular1app.index",
                indexJSLocation : path.join(appBasePath, "angular1app", "angular1app.index.js"),

                generatedVendorJSName : "gen.angular1app.vendor",
                jsVendors : ["angular"],

                generatedIndexCSSName : "gen.blogpost.style",
                cssFiles : [path.join(appBasePath, "angular1app", "styles", "angular1app.style.css")],

                generatedVendorCSSName : "gen.angular1app.vendor.style",
                vendorCSSFiles : [path.join(projectBasePath, "node_modules", "bootstrap", "dist", "css", "bootstrap.css")],

                generatedIndexHTMLFile : "gen.angular1app.index.html",
                indexHTMLTemplateFileLocation : path.join(appBasePath, "angular1app", "angular1app.index.html")
            },
            {
                generatedIndexJSName : "gen.angular2app.index",
                indexJSLocation : path.join(appBasePath, "angular2app", "angular2app.index.ts"),

                generatedIndexCSSName : "gen.angular2app.style",
                cssFiles : [path.join(appBasePath, "angular2app", "styles", "angular2app.style.css")],

                generatedVendorJSName : "gen.angular2app.jsvendor",
                jsVendors : path.join(appBasePath, "angular2app", "angular2app.jsvendor.ts"),

                generatedVendorCSSName : "gen.angular2app.css.vendor",
                vendorCSSFiles : [path.join(projectBasePath, "node_modules", "bootstrap", "dist", "css", "bootstrap.css")],

                generatedIndexHTMLFile : "gen.angular2app.index.html",
                indexHTMLTemplateFileLocation : path.join(appBasePath, "angular2app", "angular2app.index.html")
            },
            {
                generatedIndexJSName : "gen.reactapp.index",
                indexJSLocation : path.join(appBasePath, "reactapp", "reactapp.index.js"),

                generatedIndexCSSName : "gen.reactapp.style",
                cssFiles : [path.join(appBasePath, "reactapp", "styles", "reactapp.style.css")],

                generatedVendorJSName : "gen.reactapp.jsvendor",
                jsVendors : path.join(appBasePath, "reactapp", "reactapp.jsvendor.js"),

                generatedVendorCSSName : "gen.reactapp.css.vendor",
                vendorCSSFiles : [path.join(projectBasePath, "node_modules", "bootstrap", "dist", "css", "bootstrap.css")],

                generatedIndexHTMLFile : "gen.reactapp.index.html",
                indexHTMLTemplateFileLocation : path.join(appBasePath, "reactapp", "reactapp.index.html")
            }
        ]
    }
}

module.exports = moduleConfig;
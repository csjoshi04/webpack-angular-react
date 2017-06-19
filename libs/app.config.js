const path = require("path");

const appConfig = {
    getPaths : function (staticProjectPath) {
        return {
            appBase : path.join(staticProjectPath, "app"),
            build : path.join(staticProjectPath, "build"),
            projectBase : staticProjectPath
        }
    }
}

module.exports = appConfig;
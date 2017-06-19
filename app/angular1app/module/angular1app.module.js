const Angular1AppComponent = require("../component/angular1app.component");
const Angular1AppService = require("../service/angular1app.service");

const angular1app = angular.module("angular1app",[]);

angular1app.component("angular1appComponent",Angular1AppComponent);
angular1app.service("Angular1AppService",Angular1AppService);

module.exports = angular1app;
class Angular1AppController{
    constructor(angular1appService){
        this.dataService = angular1appService;
        this.name = this.dataService.getName();
        this.myName = "";
    }
}

Angular1AppController.$inject = ["Angular1AppService"]

module.exports = Angular1AppController;
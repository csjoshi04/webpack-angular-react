import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    template: require('./app.component.tpl.ng.html'),
})
export class AppComponent {
    name:string = "Angular 2/4(latest) App works with your superbuild";
    myName:string = "";
}

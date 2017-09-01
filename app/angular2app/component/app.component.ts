import { Component } from '@angular/core';

require('file?name=[name].[ext]!./app.component.tpl.html');

@Component({
    selector: 'my-app',
    templateUrl: './app.component.tpl.html',
})
export class AppComponent {
    name:string = "Angular 2/4(latest) App works with your superbuild";
    myName:string = "";
}

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './module/angular2app.module';
//import 'file?name=[name].[ext]!./template/main.component.tpl.html';
//if (process.env.ENV === 'production') {
//    enableProdMode();
//}
platformBrowserDynamic().bootstrapModule(AppModule);

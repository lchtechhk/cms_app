import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
// import { BannersComponent } from './banners/banners';
// import { ProductComponent } from './product/product';
// import { FooterComponent } from './footer/footer';
// import { SlidingTabsComponent } from './sliding-tabs/sliding-tabs';
// import { HeaderComponent } from './header/header';
@NgModule({
    declarations: [
        // BannersComponent,
        // ProductComponent,
        // FooterComponent,
        // SlidingTabsComponent,
        // HeaderComponent,
    ],
    imports: [
        // IonicPageModule.forChild(ProductComponent),
        TranslateModule.forChild()],
    exports: [
        // BannersComponent,
        // ProductComponent,
        // FooterComponent,
        // SlidingTabsComponent,
        // HeaderComponent,
    ]
})
export class ComponentsModule { }

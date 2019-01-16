import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globalization } from '@ionic-native/globalization';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProductPage } from '../pages/product/product';
import { TabsPage } from '../pages/tabs/tabs';
import { Tab2Page } from '../pages/tab2/tab2'
import { SpecialPage } from '../pages/special/special'
import { LanguagePage } from '../pages/language/language';
import { SharedDataProvider } from '../providers/shared-data/shared-data';
import { ConfigProvider } from '../providers/config/config';
import { TranslateService } from '@ngx-translate/core';
import { OrderPage } from '../pages/order/order'
import { CartPage } from '../pages/cart/cart';
import { MyAccountPage } from '../pages/my-account/my-account';
import { ShippingAddressPage } from '../pages/shipping-address/shipping-address';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { ThankYouPage } from '../pages/thank-you/thank-you';

export interface PageInterface {
  title: string;
  component?: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = ProductPage;
  // rootPage:any = ThankYouPage;
  pages: PageInterface[] = [
    { title: 'Shop', component: ProductPage, icon: 'home' },
    // { title: 'Shop', component: TabsPage, icon: 'home' },
    { title: 'My Order', component: MyOrdersPage, icon: 'contacts' },
    // { title: 'Special', component: SpecialPage, icon: 'shuffle' },
  ];

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public shared: SharedDataProvider,
    public translate: TranslateService,
    public config: ConfigProvider,
    public modalCtrl: ModalController,
    public globalization :Globalization) {
    platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.shared.initial_language();
    });
  }
  openLanguagePage() {
    let modal = this.modalCtrl.create(LanguagePage);
    modal.present();
  }
  openLoginPage() {
    // let modal = this.modalCtrl.create(LoginPage);
    // modal.present();
    this.nav.push(LoginPage);
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this 
    if(page == 'my_account'){
      this.nav.push(MyAccountPage);
    }else {
      this.nav.setRoot(page.component);
    }
  }
  logOut() {
    this.shared.logOut();
  }
}


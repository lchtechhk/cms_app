// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MyOrdersPage } from '../my-orders/my-orders';
import { CartPage } from '../cart/cart';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';

import { ConfigProvider } from '../../providers/config/config';
import { ProductPage } from '../../pages/product/product'




@Component({
  selector: 'page-thank-you',
  templateUrl: 'thank-you.html',
})
export class ThankYouPage {
  array = new Array;
  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
     public navParams: NavParams) {
    this.array = this.navCtrl.getViews();
  }
  openHome() {
    if (this.config.homePage == 1) { this.navCtrl.setRoot(ProductPage); }
  }
  openOrders() { this.navCtrl.setRoot(MyOrdersPage); }

  ionViewDidLoad() {
    // let c = 0;
    // for (let value of this.navCtrl.getViews().reverse()) {
    //   if (c <= 4){ this.navCtrl.removeView(value);console.log(value);}
    //   // if (value.component.name == "OrderPage") { this.navCtrl.removeView(value); }
    //   // if (value.component.name == "ShippingMethodPage") { this.navCtrl.removeView(value); }
    //   // if (value.component.name == "ShippingAddressPage") { this.navCtrl.removeView(value); }
    //   // if (value.component.name == "BillingAddressPage") { this.navCtrl.removeView(value); }
    //   // if (value.component.name == "CartPage") { this.navCtrl.removeView(value); }
    //  // console.log(value);
    //   c++
    // }

  }
  openCart() {
    this.navCtrl.push(CartPage);
  }
  openSearch() {
  }
  ionViewWillEnter() {
  }
}

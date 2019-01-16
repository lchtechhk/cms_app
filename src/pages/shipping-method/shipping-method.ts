// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingProvider } from '../../providers/loading/loading';
// import { OrderPage } from '../order/order';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-shipping-method',
  templateUrl: 'shipping-method.html',
})
export class ShippingMethodPage {
  shippingMethod = new Array;
  selectedMethod = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shared: SharedDataProvider,
    public httpClient: HttpClient,
    public config: ConfigProvider,
    public loading: LoadingProvider,
  ) {
    this.loading.show();
    var dat: { [k: string]: any } = {};

    dat.street_address = this.shared.orderDetails.delivery_street_address;
    dat.products_weight = this.calculateWeight();
    dat.products_weight_unit = 'g'
    dat.products = this.shared.cartProducts;
    dat.language_id = config.langId;
    this.httpClient.post(this.config.url + 'getrate', dat).subscribe((data:any) => {
      this.loading.hide();
      if (data.success == 1) {
        var m = data.data.shippingMethods;
        this.shippingMethod = Object.keys(m).map(function (key) { return m[key]; });
        // this.shared.orderDetails.total_tax = data.data.tax;
      }
    });
  }
  //================================================================================
  //calcualting products total weight
  calculateWeight = function () {
    var pWeight = 0;
    var totalWeight = 0;
    for (let value of this.shared.cartProducts) {
      pWeight = parseFloat(value.weight);
      if (value.unit == 'kg') {
        pWeight = parseFloat(value.weight) * 1000;
      }
      //  else {
      totalWeight = totalWeight + pWeight
      //   }
      //  console.log(totalWeight);
    }
    return totalWeight;
  };
  setMethod(data) {
    this.selectedMethod = false;
    this.shared.orderDetails.shipping_cost = data.rate;
    this.shared.orderDetails.shipping_method = data.name + '(' + data.shipping_method + ')';
    // console.log(this.shared.orderDetails);
  }
  openOrderPage() {
    // this.navCtrl.push(OrderPage);
  }
}

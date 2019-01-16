// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { LoadingProvider } from '../../providers/loading/loading';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { HttpClient } from '@angular/common/http';
import { ShippingMethodPage } from '../shipping-method/shipping-method'
import { OrderPage } from '../order/order';

@Component({
  selector: 'page-shipping-address',
  templateUrl: 'shipping-address.html',
})
export class ShippingAddressPage {


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    public httpClient: HttpClient,
    public shared: SharedDataProvider,
    public modalCtrl: ModalController,
    public loading: LoadingProvider, ) {

    this.loading.show();
    var dat: { [k: string]: any } = {};
    dat.customers_id = this.shared.customerData.customers_id;
    this.httpClient.post(this.config.url + 'getalladdress', dat).subscribe((data:any) => {
      this.loading.hide();
      if (data.success == 1) {
        var allShippingAddress = data.data;
        for (let value of allShippingAddress) {
          if (value.default_address != null || allShippingAddress.length == 1) {
            this.shared.orderDetails.delivery_firstname = value.firstname;
            this.shared.orderDetails.delivery_lastname = value.lastname;
            this.shared.orderDetails.delivery_street_address = value.street;
          }

        }
      }
      if (data.success == 0) { }
    });
    this.shared.orderDetails.customers_telephone = this.shared.customerData.customers_telephone;
  
    this.shared.orderDetails.delivery_firstname = "1";
    this.shared.orderDetails.delivery_lastname = "2";
    this.shared.orderDetails.delivery_street_address ="3";
    this.shared.orderDetails.customers_telephone ="4";
  }
  submit() {
    this.shared.orderDetails.billing_firstname = this.shared.orderDetails.delivery_firstname;
    this.shared.orderDetails.billing_lastname = this.shared.orderDetails.delivery_lastname;
    this.shared.orderDetails.billing_street_address = this.shared.orderDetails.delivery_street_address;
    this.navCtrl.push(OrderPage);
  }

}

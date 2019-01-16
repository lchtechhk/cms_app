// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { AlertProvider } from '../../providers/alert/alert';
import { LoadingProvider } from '../../providers/loading/loading';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { ProductDetailPage } from '../product-detail/product-detail';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  orderDetail: { [k: string]: any } = {};;
  products = [];
  constructor(
    public navCtrl: NavController,
    public config: ConfigProvider,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public shared: SharedDataProvider,
    public alert: AlertProvider,
    public loading: LoadingProvider) {
    this.orderDetail = this.navParams.get('data');
    this.products = this.orderDetail.data;
    console.log(this.orderDetail);
    console.log(this.products);
  }
  getSingleProductDetail(id) {
    this.loading.show();

    var dat: { [k: string]: any } = {};
    if (this.shared.customerData != null)
      dat.customers_id = this.shared.customerData.customers_id;
    else
      dat.customers_id = null;
    dat.products_id = id;
    dat.language_id = this.config.langId;
    this.httpClient.post(this.config.url + 'getallproducts', dat).subscribe((data:any) => {
      this.loading.hide();
      if (data.success == 1) {
        this.navCtrl.push(ProductDetailPage, { data: data.product_data[0] });
      }
    });
  }
  ionViewDidLoad() {
    this.orderDetail = this.navParams.get('data');
  }

}

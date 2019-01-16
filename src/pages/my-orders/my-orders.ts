// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { NavController,Platform, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { OrderDetailPage } from '../order-detail/order-detail';
import { CartPage } from '../cart/cart';
import { HttpClient } from '@angular/common/http';
import { ProductPage } from '../product/product';


@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',
})
export class MyOrdersPage {
  orders = new Array;
  httpRunning = true;
  public unregisterBackButtonAction: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public translate: TranslateService,
    public alert: AlertProvider,
    public loading: LoadingProvider,
    public platform: Platform, 
    public alertProvider: AlertProvider
  ) {
  }
  ionViewDidLoad() {
    this.httpRunning = true;
    this.getOrders();
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
      // Unregister the custom back button action for this page
      this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(()=>{
    }); 
  }   

  getOrders() {
    this.httpRunning = true;
    this.orders = [];
    this.loading.show();
    var dat: { [k: string]: any } = {};
    dat.customers_id = this.shared.customerData.customers_id; //Production
    dat.language_id = this.config.langId;

    this.httpClient.post(this.config.url + 'getorders', dat).subscribe((data:any) => {
      console.log('hi --'+ JSON.stringify(data));
      this.loading.hide();
      this.httpRunning = false;
      //$rootScope.address=response.data.data;
      if (data.success == 1) {
        this.orders = [];
        this.orders = data.data;
      }
      // $scope.$broadcast('scroll.refreshComplete');
    },
      function (response) {
        this.loading.hide();
        this.alert.show("Server Error while Loading Orders");
        console.log(response);
      });
  };

  showOrderDetail(order) {

    this.navCtrl.push(OrderDetailPage, { 'data': order });

  }
  openCart() {
    this.navCtrl.push(CartPage);
  }
  openSearch() {
    // this.navCtrl.push(SearchPage);
  }
  openProductsPage() {
    this.navCtrl.push(ProductPage, { sortOrder: 'newest' });
  }
}

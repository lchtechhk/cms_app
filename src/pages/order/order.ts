// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Content } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { TranslateService } from '@ngx-translate/core';
import { ThankYouPage } from '../thank-you/thank-you';
import { HttpClient } from '@angular/common/http';


declare var braintree;


@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  @ViewChild(Content) content: Content;
  total: any;
  orderDetail = {};//include shipping address, billing address,  shipping methods.
  products = [];
  couponArray = [];
  couponApplied = 0;
  tokenFromServer = null;
  discount = 0;
  productsTotal = 0;
  totalAmountWithDisocunt = 0;
  nonce = '';
  stripeCard = {
    number: '',
    expMonth: 1,
    expYear: 2020,
    cvc: ''
  };

  paymentMethods = [];
  paypalClientId = "";
  paypalEnviroment = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public loading: LoadingProvider,
    public alert: AlertProvider,
    public actionSheetCtrl: ActionSheetController,
    public translate: TranslateService,
) {
    // shared.orderDetails.payment_method = 'cash_on_delivery';
    this.totalPrice();
  }

  totalPrice() {
    var price = 0;
    for (let value of this.shared.cartProducts) {
      price = price + value.total;
    }
    this.total = price;
  };

  //============================================================================================  
  //placing order
  proceedToCheckOut = function () {
    this.loading.autoHide(1000);
    this.orderDetail.customers_id = this.shared.customerData.customers_id;
    this.orderDetail.customers_name = this.orderDetail.delivery_firstname + " " + this.orderDetail.delivery_lastname;
    this.orderDetail.delivery_name = this.orderDetail.delivery_firstname + " " + this.orderDetail.delivery_lastname;
    this.orderDetail.email = this.shared.customerData.email;
    this.orderDetail.products = this.products;
    this.orderDetail.language_id = this.config.langId;
    this.orderDetail.totalPrice = this.total;
    var dat = this.orderDetail;
    console.log('orderDetail : ' + JSON.stringify(this.orderDetail));
    this.httpClient.post(this.config.url + 'addtoorder', dat).subscribe((data:any) => {
      //this.loading.hide();
      if (data.success == 1) {
        this.shared.emptyCart();
        this.products = [];
        this.orderDetail = {};
        this.shared.orderDetails = {};
        this.navCtrl.setRoot(ThankYouPage);
      }
      if (data.success == 0) { this.alert.show(data.message); }
    }, err => {

      this.translate.get("Server Error").subscribe((res) => {
        this.alert.show(res + " " + err.status);
      });

    });
  };

  ngOnInit() {
    this.shared.orderDetails.payment_method = 'cash_on_delivery';
    this.orderDetail = this.shared.orderDetails;
    this.products = this.shared.cartProducts

  }
  openHomePage() {
    this.navCtrl.popToRoot();
  }
  private subTotal(price, discount_price, qty): number {
    let total: number = 0;

    if (qty != null) {
      if (discount_price != null) {
        total = discount_price * qty;
      } else {
        total = price * qty
      }
      return total;
    }
    return null;
  }
  // private totalPrice(): number {
  //   let total = 0;
  //   this.storage_product.forEach(element => {
  //     this.order_product.some((value) => {
  //       if (element.products_id == value.products_id && value.products_status) {
  //         if (value.discount_price != null) {
  //           total += element.qty * value.discount_price;
  //         } else {
  //           total += element.qty * value.products_price;
  //         }
  //         return;
  //       }
  //     })
  //   });
  //   return total;
  // }
}

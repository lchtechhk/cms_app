// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { NavController, Events, ModalController } from 'ionic-angular';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { ConfigProvider } from '../../providers/config/config';
import { Toast } from '@ionic-native/toast';
import { ProductDetailPage } from '../product-detail/product-detail';
import { LoadingProvider } from '../../providers/loading/loading';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { ShippingAddressPage } from '../shipping-address/shipping-address';
import { trigger, style, animate, transition } from '@angular/animations';
import { ProductPage } from '../product/product';
import { HttpClient } from '@angular/common/http';
import { ObjectUtils } from '../../providers/ObjectUtils';
@Component({
  selector: 'page-cart',
  animations: [
    trigger(
      'animate', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('500ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('700ms', style({ opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: 'cart.html',
})
export class CartPage {
  total: any;

  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
    public httpClient: HttpClient,
    public loading: LoadingProvider,
    public toast: Toast,
    public storage: Storage,
    public events: Events,
    public modalCtrl: ModalController,
    private ObjectUtils : ObjectUtils,
  ) {
    let cart_id_array = this.getIdsByCardProduct();
    if(cart_id_array.length > 0){
      let data = {"categories_id":"","page_number":0,"type":"newest","language_id":"1","products_ids":cart_id_array};
      this.shared.findByProduectsById(data);
    }
    
  }
  getIdsByCardProduct(){
    let data = [];
    if(this.ObjectUtils.isFilledArray(this.shared.cartProducts)){
      this.shared.cartProducts.forEach(element => {
        data.push(element.products_id);
      });
    }
    // console.log('data : ' + JSON.stringify(data));
    return data;
  }
  totalPrice() {
    var price = 0;
    for (let value of this.shared.cartProducts) {
        var pp = value.final_price * value.customers_basket_quantity;
      if(value.products_status == 1)price = price + pp;
   }
    this.total = price;
  };
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
  removeCart(id) {
    this.shared.removeCart(id);
    this.totalPrice();
  }
  qunatityPlus = function (q) {
    this.toast.show(`Product Quantity is Limited!`, 'short', 'center');
    q.customers_basket_quantity++;
    q.subtotal = q.final_price * q.customers_basket_quantity;
    q.total = q.subtotal;
    if (q.customers_basket_quantity > q.quantity) {
      q.customers_basket_quantity--;
      this.toast.show(`Product Quantity is Limited!`, 'short', 'center');
    }
    this.totalPrice();
    this.shared.cartTotalItems();
    this.storage.set('cartProducts', this.shared.cartProducts);
  }
  //function decreasing the quantity
  qunatityMinus = function (q) {
    if (q.customers_basket_quantity == 1) {
      return 0;
    }
    q.customers_basket_quantity--;
    q.subtotal = q.final_price * q.customers_basket_quantity;
    q.total = q.subtotal;
    this.totalPrice();

    this.shared.cartTotalItems();
    this.storage.set('cartProducts', this.shared.cartProducts);
  }
  ionViewDidLoad() {
    this.totalPrice()
  }
  proceedToCheckOut() {

    if (this.shared.customerData.customers_id == null || this.shared.customerData.customers_id == undefined) {
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
    }
    else {
      this.navCtrl.push(ShippingAddressPage);
    }
  }
  openProductsPage() {
    this.navCtrl.push(ProductPage, { sortOrder: 'newest' });
  }
  ionViewDidLeave() {
   // this.storage.set('cartProducts', this.shared.cartProducts);
  }
  ionViewWillEnter() {
    // if (this.config.admob == 1) this.shared.showAd();
  }

}

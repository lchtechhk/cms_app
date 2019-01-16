import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams, InfiniteScroll, Content, ActionSheetController, Slides } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { HttpClient } from '@angular/common/http';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { LoadingProvider } from '../../providers/loading/loading';
import { TranslateService } from '@ngx-translate/core';
import { share } from 'rxjs/operator/share';
import { CartPage } from '../cart/cart';
import { AlertProvider } from '../../providers/alert/alert';
/**
 * Generated class for the Tab1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})

export class ProductPage {
  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;
  scrollTopButton = false;
  side = "right";
  // tabs : any = [{name:"ALL"}];
  pageNumber :number = 3; //tab show max qty in view
  
  @ViewChild(InfiniteScroll) infinite: InfiniteScroll;
  products = new Array;
  productView = 'grid';
  selectedTab = '';
  categoryId = '';
  categoryName = '';
  page = 0;
  applyFilter = false;
  filters = [];
  selectedFilters = [];
  sortOrder = 'newest';

  httpRunning = true;
  public unregisterBackButtonAction: any;
  constructor(
    public platform: Platform, 
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public loading: LoadingProvider,
    public translate: TranslateService,
    public httpClient: HttpClient,
    public actionSheet: ActionSheetController,
    public alertProvider: AlertProvider,
  ) {
    if (shared.dir == "rtl") this.side = "left";

    if (this.navParams.get('id') != undefined) this.selectedTab = this.categoryId = this.navParams.get('id');
    if (this.navParams.get('name') != undefined) this.categoryName = this.navParams.get('name');
    if (this.navParams.get('sortOrder') != undefined) this.sortOrder = this.navParams.get('sortOrder');
    this.getProducts(null);
    // this.getFilters(this.categoryId);
  }
  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
      // Unregister the custom back button action for this page
      this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(()=>{
      this.alertProvider.multiple_show(this.translate.instant("leave?"),null,this.translate.instant("no"),this.translate.instant("exit"),()=>{
        this.platform.exitApp();
      });
    }); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 00 configured in app.component.ts file */
  }   

  getProducts(infiniteScroll) {
    this.httpRunning = true;
    if (this.page == 0) { this.loading.show(); }
    var data: { [k: string]: any } = {};
    if (this.shared.customerData != null)//in case user is logged in customer id will be send to the server to get user liked products
      data.customers_id = this.shared.customerData.customers_id;
    // if (this.applyFilter == true) {
    //   data.filters = this.selectedFilters;
    //   data.price = { minPrice: this.price.lower, maxPrice: this.price.upper };
    // }
    data.categories_id = this.selectedTab;
    data.page_number = this.page;
    data.type = this.sortOrder;
    data.language_id = this.config.langId;
    console.log('data : ' + JSON.stringify(data));
    this.httpClient.post(this.config.url + 'getallproducts', data).subscribe((data: any) => {
      this.httpRunning = false;
      // console.log(data.product_data.length + "   " + JSON.stringify(data));
      this.infinite.complete();
      if (this.page == 0) { this.products = new Array; this.loading.hide(); this.scrollToTop(); }
      if (data.success == 1) {
        this.page++;
        var prod = data.product_data;
        for (let value of prod) {
          this.products.push(value);
        }
      }
      if (data.success == 1 && data.product_data.length == 0) { this.infinite.enable(false); }
      if (data.success == 0) { this.infinite.enable(false); }

    }, (error: any) => {
      this.httpRunning = false;
    });

  }

   //changing tab
   changeTab(c) {
    this.applyFilter = false;
    this.infinite.enable(true);
    this.page = 0;
    if (c == '') this.selectedTab = c
    else this.selectedTab = c.id;
    this.getProducts(null);
    // this.getFilters(this.selectedTab);
  }
  ngOnChanges() {

  }

  // getSortProducts(value) {

  //   if (value == 'Newest') value = 'newest';
  //   else if (value == 'A - Z') value = 'a to z';
  //   else if (value == 'Z - A') value = 'z to a';
  //   else if (value == 'Price : high - low') value = 'high to low';
  //   else if (value == 'low to high') value = 'low to high';
  //   else if (value == 'Top Seller') value = 'top seller';
  //   else if (value == 'Special Products') value = 'special';
  //   else if (value == 'Most Liked') value = 'most liked';
  //   else value = value;

  //   //console.log(value);
  //   if (value == this.sortOrder) return 0;
  //   else {
  //     this.sortOrder = value;
  //     // this.infinite.enable(true);
  //     this.page = 0;
  //     this.getProducts(null);
  //   }
  // }
  // openSortBy() {
  //   var buttonArray = [];
  //   this.translate.get(this.sortArray).subscribe((res) => {

  //     for (let key in res) {
  //       buttonArray.push({ text: res[key], handler: () => { this.getSortProducts(key) } });
  //     }
  //     buttonArray.push(
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           //console.log('Cancel clicked');
  //         }
  //       }
  //     );

  //     var actionSheet = this.actionSheet.create({
  //       buttons: buttonArray
  //     });
  //     actionSheet.present();
  //   });


  // }
  // changeLayout() {
  //   if (this.productView == 'list') this.productView = "grid";
  //   else this.productView = "list";

  //   this.scrollToTop();
  // }
  scrollToTop() {
    this.content.scrollToTop(700);
    this.scrollTopButton = false;
  }
  onScroll(e) {
    if (e.scrollTop >= 1200) this.scrollTopButton = true;
    if (e.scrollTop < 1200) this.scrollTopButton = false;
    //else this.scrollTopButton=false;
      // console.log(e);
      // console.log('scrollTopButton : ' + e.scrollTop + '---'+this.scrollTopButton);
  }
  openCart() {
    this.navCtrl.push(CartPage);
  }
  // ionViewDidLoad() {
   // console.log("loaded");

  //  try {
  //   setTimeout(() => {
  //     let ind = 0;
  //     this.shared.subCategories.forEach((value, index) => {
  //       if (this.selectedTab == value.id) { ind = index; }
  //     });
  //     this.slides.slideTo(ind, 1000, true);
  //   }, 100);
  // } catch (error) {

  // }
  // }
}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductPage } from '../../pages/product/product'
import { Tab2Page } from '../../pages/tab2/tab2'
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
 
  tab1Root: any = ProductPage;
  tab2Root: any = Tab2Page;
  myIndex: number;
 
  constructor(navParams: NavParams) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;
  }
}
import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { LoadingProvider } from '../../providers/loading/loading';
import { ConfigProvider } from '../../providers/config/config';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';


import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  formData = { email: 'test123@gmail.com', password: '1234567' };
  errorMessage = '';
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public httpClient: HttpClient,
     public viewCtrl: ViewController,
     public config: ConfigProvider,
     public shared: SharedDataProvider,
     public loading: LoadingProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.loading.show();
    this.errorMessage = '';
    console.log('formData : ' + this.formData);
    this.httpClient.post(this.config.url + 'processlogin', this.formData).subscribe((data:any) => {
      this.loading.hide();
      if (data.success == 1) {
        this.shared.login(data.data[0]);
        this.openPage();
        console.log('login successful');
      }else
      if (data.success == 0) {
        this.errorMessage = data.message;
        console.log('login fail : ' + this.errorMessage);
      }else{
        console.log('Dont know');
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(TabsPage);
  }
}

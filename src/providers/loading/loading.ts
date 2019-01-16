import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { ConfigProvider } from '../config/config';

@Injectable()
export class LoadingProvider {
  loading;
  constructor(
    public loadingCtrl: LoadingController,
    public config: ConfigProvider,
  ) {

  }

  show() {
    this.loading = this.loadingCtrl.create({
      duration: 10000
    });
    this.loading.present();
  }
  hide() {
    try {
      this.loading.dismiss();
    } catch (error) { }
  }
  autoHide(time) {
    this.loading = this.loadingCtrl.create({
      duration: time
    });
    this.loading.present();
  }
}

import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';



@Injectable()
export class AlertProvider {
 
  constructor(
    public alertCtrl: AlertController,
    public translate: TranslateService,
  ) {

  }

  multiple_show(title,message,left_text,right_text,right_funtion) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: left_text,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: right_text,
          handler: right_funtion
        }
      ]
    });
    alert.present();
  }

  // show(text) {
  //   let alert = this.alertCtrl.create({
  //     title: this.alertText,
  //     subTitle: text,
  //     buttons: [this.okText]
  //   });
  //   alert.present();
  // }

  // showWithTitle(text, title) {
  //   let alert = this.alertCtrl.create({
  //     title: title,
  //     subTitle: text,
  //     buttons: [this.okText]
  //   });
  //   alert.present();
  // }
}

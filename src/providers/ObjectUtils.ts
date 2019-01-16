import { Injectable } from '@angular/core';
import { Platform, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class ObjectUtils {
  constructor(private platform: Platform,private storage: Storage, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController) { };

    public isEmptyField(x): boolean {
        if (x == undefined || x == "") {
          return true
        }
        return false;
    }

    public isFilledArray(array){
        if(!this.isEmptyField(array) && array.length > 0){
            return true;
        }
        return false;
    }
}
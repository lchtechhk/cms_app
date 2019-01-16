// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { ConfigProvider } from '../../providers/config/config';
import { Platform, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertProvider } from '../../providers/alert/alert';
import { LoadingProvider } from '../../providers/loading/loading';
import { CartPage } from '../cart/cart';
import { HttpClient } from '@angular/common/http';
import { ObjectUtils} from '../../providers/ObjectUtils'


@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  myAccountData = {
    customers_firstname: '',
    customers_lastname: '',
    customers_telephone: '',
    currentPassword: '',
    password: '',
    customers_dob: '',
    customers_old_picture:''
  };
  profilePicture = '';
  passwordData: { [k: string]: any } = {};
  constructor(
    public httpClient: HttpClient,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public translate: TranslateService,
    public platform: Platform,
    private camera: Camera,
    public navCtrl: NavController,
    public alert: AlertProvider,
    public loading: LoadingProvider,
    public objectUtils:ObjectUtils) {
  }

  //============================================================================================  
  //function updating user information
  updateInfo = function () {
    //this.shared.customerData.password="1234"
    let currenrtPassword = this.myAccountData.currentPassword;
    let newPassword = this.myAccountData.password;
    // console.log(currenrtPassword + "  " + newPassword);
    // console.log(this.shared.customerData.password);
    if (newPassword != "" && currenrtPassword == "") {

      this.translate.get("Please Enter Current Password").subscribe((res) => {
        this.alert.show(res);
      });

    }
    else if (currenrtPassword != "" && currenrtPassword != this.shared.customerData.password) {

      this.translate.get("Please Enter Current Password Correctly").subscribe((res) => {
        this.alert.show(res);
      });

    }
    else if (newPassword != undefined && newPassword != "" && currenrtPassword != this.shared.customerData.password) {

      this.translate.get("Please Enter Current Password Correctly").subscribe((res) => {
        this.alert.show(res);
      });

    }
    else {
      this.loading.show();
      this.myAccountData.customers_id = this.shared.customerData.customers_id;

      if (this.profilePicture == this.config.imgUrl + this.shared.customerData.customers_picture) { //console.log("old picture");
        // this.myAccountData.customers_picture=$rootScope.customerData.customers_picture;
        this.myAccountData.customers_old_picture = this.shared.customerData.customers_picture;
      }
      else if (this.profilePicture == '')
        this.myAccountData.customers_picture = null;
      else
        this.myAccountData.customers_picture = this.profilePicture;

      var dat = this.myAccountData;
      //  console.log("post data  "+JSON.stringify(data));
      this.httpClient.post(this.config.url + 'updatecustomerinfo', dat).subscribe((data:any) => {

        this.loading.hide();
        if (data.success == 1) {
          //   document.getElementById("updateForm").reset();
          this.alert.show(data.message);
          this.shared.customerData.customers_firstname = this.myAccountData.customers_firstname;
          this.shared.customerData.customers_lastname = this.myAccountData.customers_lastname;
          this.shared.customerData.customers_telephone = this.myAccountData.customers_telephone;
          this.shared.customerData.customers_picture = data.data[0].customers_picture;

          this.shared.customerData.customers_dob = this.myAccountData.customers_dob;
          if (this.myAccountData.password != '')
            this.shared.customerData.password = this.myAccountData.password;

          this.shared.login(this.shared.customerData);

          this.myAccountData.currentPassword = "";
          this.myAccountData.password = "";
        }
      }
        , error => {
          this.loading.hide();
          this.alert.show("Error while Updating!");
        });
    }
  }
  openCamera() {
    this.loading.autoHide(1000);
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 100,
      targetHeight: 100,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }
    this.platform.ready().then(() => {
      this.camera.getPicture(options).then((imageData) => {
        this.profilePicture = 'data:image/jpeg;base64,' + imageData;
      }, (err) => { });
    });
  }
  //============================================================================================  

  ionViewWillEnter() {
    this.myAccountData.customers_firstname = this.shared.customerData.customers_firstname;
    this.myAccountData.customers_lastname = this.shared.customerData.customers_lastname;

    this.profilePicture = this.config.imgUrl + this.shared.customerData.customers_picture;
    this.myAccountData.customers_old_picture = this.shared.customerData.customers_picture;
    this.myAccountData.customers_telephone = this.shared.customerData.customers_telephone;
    this.myAccountData.customers_dob = this.shared.customerData.customers_dob;
  }
  openCart() {
    this.navCtrl.push(CartPage);
  }
}

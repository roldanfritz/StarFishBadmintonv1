import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { PlayerService } from '../../services/player';
import { AuthService } from '../../services/auth';
import { OnboardingPage } from '../onboarding/onboarding';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileService } from '../../services/file';
import { FilePath } from '@ionic-native/file-path';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  currentPlayer : any = null;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public ps: PlayerService, public auth: AuthService,
    public modalCtrl: ModalController, private camera: Camera, private alertCtrl:AlertController,
    private fs: FileService, private filePath: FilePath, private photoViewer: PhotoViewer) {
    
  }

  ionViewDidEnter(){
    this.ps.getCurrentUser().then((res)=>
      {
        res.subscribe((player)=>{
          this.currentPlayer = player;
          console.log(!this.currentPlayer.onboardComplete);
          if(!this.currentPlayer.onboardComplete)
          {
            const onboard = this.modalCtrl.create(OnboardingPage, this.currentPlayer);
            onboard.present();
          }
        })
      });
  }
  public takeFromGallery()
  {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }
    this.camera.getPicture(options).then(imageData=>
      {
        let captureDataUrl = 'data:image/jpeg;base64,'+imageData;

        let playerId = this.currentPlayer.uid;
        this.uploadFile(playerId, captureDataUrl);
      },(error)=>
      {
        const alert = this.alertCtrl.create({
          message: error
        });
        alert.present();
      });
  }


  public takePicture()
  {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then(imageData=>
      {
        let captureDataUrl = 'data:image/jpeg;base64,'+imageData;

        let playerId = this.currentPlayer.uid;
        this.uploadFile(playerId, captureDataUrl);
      },(error)=>
      {
        const alert = this.alertCtrl.create({
          message: error
        });
        alert.present();
      });
  }

  public viewPhoto()
  {
    this.photoViewer.show(this.currentPlayer.profilePic,this.currentPlayer.name, {
      share: true
    });
  }

  logout(){
    this.auth.logout();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  async uploadFile(playerId,captureDataUrl)
  {
    
    const uploadRef = await this.fs.uploadPhoto(playerId,captureDataUrl);
    
    const downloadUrl = await uploadRef.ref.getDownloadURL();

    await this.ps.updatePlayer(playerId, {
      profilePic: downloadUrl
    });

    this.alertCtrl.create({
      message: "Profile picture uploaded!"
    }).present();
  }

}

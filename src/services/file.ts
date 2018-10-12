import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase';

@Injectable()
export class FileService{
    constructor(public afs: AngularFireStorage){}

    uploadPhoto(userId,imageData)
    {
        let ref = this.afs.storage.ref('profilePics/'+userId);
        return ref.putString(imageData, firebase.storage.StringFormat.DATA_URL);
    }
}
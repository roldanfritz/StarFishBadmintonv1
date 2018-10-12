import { Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";


@Injectable()
export class PlayerService{
    constructor(public af: AngularFirestore, public afAuth: AngularFireAuth){}

    async getPlayer(uid:string) : Promise<any>
    {
        return await this.af.collection('players').doc(uid).valueChanges();
    }

    async createPlayer(uid: string, email: string, name: string, profilePic: string){
        return await this.af.collection('players').doc(uid).set({
            uid: uid,
            email: email,
            name: name,
            profilePic: profilePic,
            onboardComplete: false
        });
    }

    async getCurrentUser(): Promise<any>
    {
        const currUser = await this.afAuth.auth.currentUser;
        if(!currUser) return;
        return this.getPlayer(currUser.uid);
    }

    updatePlayer(playerId, updateObj) 
    {
        return this.af.collection('players').doc(playerId).update(updateObj);
    }
}
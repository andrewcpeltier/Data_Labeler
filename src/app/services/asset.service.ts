import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor() { }

  getAssetReferenceByName(assetName: string): firebase.storage.Reference {
    return firebase.storage().ref().child('Assets/' + assetName + '.png');
  }
}

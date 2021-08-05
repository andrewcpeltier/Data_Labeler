import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireObject, AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Classifications } from '../models/Classifications';

/*
https://grokonez.com/frontend/angular/angular-8/angular-8-firebase-tutorial-crud-operations-angular-fire-example

Look at the code that gathers the customer data from the database. It looks really clean and it could be
the answer that you're looking for.

  Image Path, Num Imgs
{'TestImages/test', 3}
{'FaceImages/face', 12346}
*/

@Injectable({
  providedIn: 'root'
})

export class ImageLabelService {

  // Replace this with something better
  public static TEST_IMAGE_COUNT = 4000;
  private ranDBPath = '/classifications';
  private moveDBPath = '/move_classifications';
  ranClassRep: AngularFireList<Classifications> = null;
  moveClassRep: AngularFireList<Classifications> = null;


  constructor(private db: AngularFireDatabase) {
    this.ranClassRep = this.db.list(this.ranDBPath);
    this.moveClassRep = this.db.list(this.moveDBPath);
  }

  addClassification(classify: Classifications): void {
    this.ranClassRep.push(classify);
  }

  updateClassification(key: string, value: any): Promise<void> {
    return this.ranClassRep.update(key, value);
  }

  getClassificationList(): AngularFireList<Classifications> {
    return this.ranClassRep;
  }

  addMovementClassification(classify: Classifications): void {
    this.moveClassRep.push(classify);
  }

  updateMovementClassification(key: string, value: any): Promise<void> {
    return this.moveClassRep.update(key, value);
  }

  getMovementClassificationList(): AngularFireList<Classifications> {
    return this.moveClassRep;
  }
}

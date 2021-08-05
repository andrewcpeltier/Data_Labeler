import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';
  usersRef: AngularFireList<Users> = null;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = this.db.list(this.dbPath);
  }

  createNewUser(user: Users): void {
    this.usersRef.push(user);
  }

  updateUser(key: string, value: any): Promise<void> {
    return this.usersRef.update(key, value);
  }

  getUserList(): AngularFireList<Users> {
    return this.usersRef;
  }

  getUsersCurrentImageReference(position: number): firebase.storage.Reference {
    return firebase.storage().ref().child('RandomImages/RanImg' + position + '.png');
  }
  getUsersCurrentMvReference(position: number): firebase.storage.Reference {
    return firebase.storage().ref().child('MovementImages/cat.jpg');
  }
}

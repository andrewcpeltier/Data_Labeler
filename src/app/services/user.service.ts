import { Injectable } from '@angular/core';
import { AngularFireObject, AngularFireList, AngularFireDatabase } from '@angular/fire/database';
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
}

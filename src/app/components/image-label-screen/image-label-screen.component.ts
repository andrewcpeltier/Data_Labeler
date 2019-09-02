import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ImageLabelService } from 'src/app/services/image-label.service';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { DataImageDialogComponent } from '../data-image-dialog/data-image-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/models/Users';
import { map } from 'rxjs/operators';
import { Classifications } from 'src/app/models/Classifications';

@Component({
  selector: 'app-image-label-screen',
  templateUrl: './image-label-screen.component.html',
  styleUrls: ['./image-label-screen.component.css']
})
export class ImageLabelScreenComponent implements OnInit {

  isLoggedIn: boolean;
  viewImage: HTMLImageElement;
  currentUser: Users;
  currentImage: number;
  usersLabels: Array<Classifications> = new Array<Classifications>();
  classifications = ['Man', 'Woman', 'Other'];

  constructor(private authService: AuthService,
              private router: Router,
              private imageService: ImageLabelService,
              private userService: UserService,
              public dialog: MatDialog) { }

  ngOnInit() {
    // Check to see if we are logged in
    this.isLoggedIn = this.authService.isLoggedIn();
    this.viewImage = document.getElementById('viewImage') as HTMLImageElement;

    // Send back to home if notng ser
    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
    } else {
      const userID = this.authService.getUserID();
      this.initCurrentUser(userID);
    }
  }

  initCurrentUser(userID: string) {
    // Get users from Firebase
    this.userService.getUserList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    // Set current user to matching user ID if existing user
    ).subscribe(users => {
      for (const user of users) {
        if (user.userID === userID) { this.currentUser = user; }
      }
    // Add new user to Firebase if current user does not exist
      if (!this.currentUser) {
        const newUser = new Users();
        newUser.userID = userID;
        newUser.imagePos = 1;
        this.userService.createNewUser(newUser);
      }
    // Set the current image on the screen based on user's image position
      const userStorageRef = firebase.storage().ref().child('RandomImages/RanImg' + this.currentUser.imagePos + '.png');
      userStorageRef.getDownloadURL().then(url => {
        this.viewImage.src = url;
      });
      this.currentImage = this.currentUser.imagePos + 1;
      this.getClassifications();
    });
  }

  openImageDialog() {
    const config = new MatDialogConfig();
    const dialogRef = this.dialog.open(DataImageDialogComponent, config);

    dialogRef.componentInstance.imagePath = this.viewImage.src;
  }

  classButtonClick(option: number) {
    // If the image classification exists, update the classification
    let existingLabel = false;
    for (const label of this.usersLabels) {
      if (label.userID === this.currentUser.userID && label.imageName === this.viewImage.src) {
        existingLabel = true;
        this.imageService.updateClassification(label.key, { label: this.classifications[option] });
      }
    }
    // If the image classification doesn't exist, add the classification
    if (!existingLabel) {
      const newLabel = new Classifications();
      newLabel.userID = this.currentUser.userID;
      newLabel.imageName = this.viewImage.src;
      newLabel.label = this.classifications[option];
      this.imageService.addClassification(newLabel);
    }
    // If there is another image in the database, update user and image to next image
    if (this.currentUser.imagePos < ImageLabelService.TEST_IMAGE_COUNT) {
      const userStorageRef = firebase.storage().ref().child('RandomImages/RanImg' + (this.currentUser.imagePos + 1) + '.png');
      userStorageRef.getDownloadURL().then(url => {
        this.viewImage.src = url;
      });
      this.userService.updateUser(this.currentUser.key, { imagePos: this.currentUser.imagePos + 1 });
      this.currentImage++;
    // Otherwise, update both to first image
    } else {
      const userStorageRef = firebase.storage().ref().child('RandomImages/RanImg' + 1 + '.png');
      userStorageRef.getDownloadURL().then(url => {
        this.viewImage.src = url;
      });
      this.userService.updateUser(this.currentUser.key, { imagePos: 1 });
      this.currentImage = 1;
    }
  }

  getClassifications() {
    // Get classifications from the database
    this.imageService.getClassificationList().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
    ).subscribe(classifications => {
    // Find classifications from this user
      for (const cl of classifications) {
        if (cl.userID === this.currentUser.userID) {
    // Store user classifications locally to be checked for updates
          let imageExists = false;
          for (const label of this.usersLabels) {
            if (label.imageName === this.viewImage.src) { imageExists = true; }
          }
          if (!imageExists) { this.usersLabels.push(cl); }
        }
      }
    });
  }

  previous() {
    if (this.currentImage !== 1) {
      const userStorageRef = firebase.storage().ref().child('RandomImages/RanImg' + (this.currentUser.imagePos - 1) + '.png');
      userStorageRef.getDownloadURL().then(url => {
        this.viewImage.src = url;
      });
      this.userService.updateUser(this.currentUser.key, { imagePos: this.currentUser.imagePos - 1 });
      this.currentImage--;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Classifications } from 'src/app/models/Classifications';
import { Users } from 'src/app/models/Users';
import { AuthService } from 'src/app/services/auth.service';
import { ImageLabelService } from 'src/app/services/image-label.service';
import { UserService } from 'src/app/services/user.service';
import { DataImageDialogComponent } from '../data-image-dialog/data-image-dialog.component';

@Component({
  selector: 'app-movement-label-screen',
  templateUrl: './movement-label-screen.component.html',
  styleUrls: ['./movement-label-screen.component.css']
})
export class MovementLabelScreenComponent implements OnInit {
  isLoggedIn: boolean;
  populated: boolean;
  viewImage: HTMLImageElement;
  currentUser: Users;
  currentImage: number;
  usersLabels: Array<Classifications> = new Array<Classifications>();
  classifications = ['Man', 'Woman', 'Other'];
  subscriptions: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private imageService: ImageLabelService,
              private userService: UserService,
              public dialog: MatDialog) { }

  ngOnInit() {
    // Check to see if we are logged in
    this.isLoggedIn = this.authService.isLoggedIn();
    this.viewImage = document.getElementById('viewImage') as HTMLImageElement;

    // Send back to home if not logged in
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
        newUser.mvImagePos = 1;
        this.userService.createNewUser(newUser);
      }
    // Set the current image on the screen based on user's image position
      const userStorageRef = this.userService.getUsersCurrentMvReference(this.currentUser.mvImagePos);
      userStorageRef.getDownloadURL().then(url => {
        this.viewImage.src = url;
      });
      this.currentImage = this.currentUser.mvImagePos + 1;
      this.getClassifications();
    });
  }

  getClassifications() {
    // Get classifications from the database
    this.imageService.getMovementClassificationList().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
    ).subscribe(classifications => {
      if (!this.populated) {
        // Find classifications from this user
        for (const cl of classifications) {
          if (cl.userID === this.currentUser.userID) {
            // Store user classifications locally to be checked for updates
            let imageExists = false;
            for (const label of this.usersLabels) {
              if (label.imageName === this.viewImage.src) { imageExists = true; }
            }
            if (!imageExists) { this.usersLabels.push(cl); }
            this.populated = true;
          }
        }
      }
    });
  }

  classButtonClick(option: number) {

    // If the image classification exists, update the classification
    let existingLabel = false;
    for (const label of this.usersLabels) {
      if (label.userID === this.currentUser.userID && label.imageName === this.viewImage.src) {
        existingLabel = true;
        this.imageService.updateMovementClassification(label.key, { label: this.classifications[option] });
      }
    }
    // If the image classification doesn't exist, add the classification
    if (!existingLabel) {
      const newLabel = new Classifications();
      newLabel.userID = this.currentUser.userID;
      newLabel.imageName = this.viewImage.src;
      newLabel.label = this.classifications[option];
      this.imageService.addMovementClassification(newLabel);
      this.usersLabels.push(newLabel);
    }

    // If there is another image in the database, update user and image to next image
    if (this.currentUser.mvImagePos < ImageLabelService.TEST_IMAGE_COUNT) {
      const userStorageRef = this.userService.getUsersCurrentMvReference(this.currentUser.mvImagePos + 1);
      userStorageRef.getDownloadURL().then(url => {
        this.viewImage.src = url;
      });
      this.userService.updateUser(this.currentUser.key, { mvImagePos: this.currentUser.mvImagePos + 1 });
      this.currentImage++;

    // Otherwise, update both to first image
    } else {
      const userStorageRef = this.userService.getUsersCurrentMvReference(1);
      userStorageRef.getDownloadURL().then(url => {
        this.viewImage.src = url;
      });
      this.userService.updateUser(this.currentUser.key, { mvImagePos: 1 });
      this.currentImage = 1;
    }
  }

  openImageDialog() {
    const config = new MatDialogConfig();
    const dialogRef = this.dialog.open(DataImageDialogComponent, config);

    dialogRef.componentInstance.imagePath = this.viewImage.src;
  }

  previous() {
    if (this.currentImage !== 1) {
      const userStorageRef = this.userService.getUsersCurrentMvReference(this.currentUser.mvImagePos - 1);
      userStorageRef.getDownloadURL().then(url => {
        this.viewImage.src = url;
      });
      this.userService.updateUser(this.currentUser.key, { mvImagePos: this.currentUser.mvImagePos - 1 });
      this.currentImage--;
    }
  }
}

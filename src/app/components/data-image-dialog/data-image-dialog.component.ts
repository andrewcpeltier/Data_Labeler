import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-image-dialog',
  templateUrl: './data-image-dialog.component.html',
  styleUrls: ['./data-image-dialog.component.css']
})
export class DataImageDialogComponent implements OnInit {

  imagePath: string;

  constructor(public dialogRef: MatDialogRef<DataImageDialogComponent>) {}

  ngOnInit() {}

  confirmSelection() {
    this.dialogRef.close();
  }
}

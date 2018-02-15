import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
    username: string;
    password: string;
    error: any;
    constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

    ngOnInit(){
      if(this.dialogRef.componentInstance.hasOwnProperty('err') === true){
        this.error = this.dialogRef.componentInstance['err'];
      }
    }
}

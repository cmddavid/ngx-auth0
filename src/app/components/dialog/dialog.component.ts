import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
    error: any;
    loginForm: FormGroup;
    constructor(public dialogRef: MatDialogRef<DialogComponent>, private formBuilder: FormBuilder) {
      let formBuilderObj:any = {
        username: [null,[Validators.required,Validators.email,Validators.minLength(5)]],
        password: [null,[Validators.required,Validators.minLength(4)]]
      };
      this.loginForm = this.formBuilder.group(formBuilderObj);
    }

    post(formObj){
      this.dialogRef.close(formObj);
    }

    ngOnInit(){
      if(this.dialogRef.componentInstance.hasOwnProperty('err') === true){
        this.error = this.dialogRef.componentInstance['err'];
      }
    }
}

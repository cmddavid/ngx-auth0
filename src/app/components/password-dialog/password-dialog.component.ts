import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordDialogComponent implements OnInit {
  error: any;
  passwordForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<PasswordDialogComponent>, private formBuilder: FormBuilder) {
    let formBuilderObj:any = {
      email: [null,[Validators.required,Validators.email,Validators.minLength(5)]]
    };
    this.passwordForm = this.formBuilder.group(formBuilderObj);
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

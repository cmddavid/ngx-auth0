import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
    username: string;
    password: string;
    constructor(public dialogRef: MdDialogRef<DialogComponent>) {}
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
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
    constructor(public dialogRef: MatDialogRef<DialogComponent>) {}
}

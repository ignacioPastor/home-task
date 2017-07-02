import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetDataAssigned } from './set-data-assigned';

@NgModule({
  declarations: [
    SetDataAssigned,
  ],
  imports: [
    IonicPageModule.forChild(SetDataAssigned),
  ],
  exports: [
    SetDataAssigned
  ]
})
export class SetDataAssignedModule {}

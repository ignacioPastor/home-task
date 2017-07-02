import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetData } from './set-data';

@NgModule({
  declarations: [
    SetData,
  ],
  imports: [
    IonicPageModule.forChild(SetData),
  ],
  exports: [
    SetData
  ]
})
export class SetDataModule {}

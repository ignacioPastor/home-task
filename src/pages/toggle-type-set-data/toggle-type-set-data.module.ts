import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToggleTypeSetData } from './toggle-type-set-data';

@NgModule({
  declarations: [
    ToggleTypeSetData,
  ],
  imports: [
    IonicPageModule.forChild(ToggleTypeSetData),
  ],
  exports: [
    ToggleTypeSetData
  ]
})
export class ToggleTypeSetDataModule {}

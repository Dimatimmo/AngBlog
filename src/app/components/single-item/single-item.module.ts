import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HideAdminButtonsDirective } from '../../directive/hide-admin-buttons.directive'

@NgModule({
  declarations: [HideAdminButtonsDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SingleItemModule { }

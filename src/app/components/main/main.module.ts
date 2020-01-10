import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { AddItemComponent } from '../add-item/add-item.component'
import { SingleItemComponent } from '../single-item/single-item.component';

@NgModule({
  imports: [
    MainRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MainComponent,
    AddItemComponent,
    SingleItemComponent
  ],
  providers: [MainComponent, AddItemComponent],
})
export class MainModule { }

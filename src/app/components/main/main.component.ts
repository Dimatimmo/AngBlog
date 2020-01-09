import { Component, OnInit } from '@angular/core';

import { FirebaseService } from "../../services/firebase.service";
import {Router} from "@angular/router";
import { ItemService } from '../../services/item.service';
import { Item } from '../../interfaces/item';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;


  constructor(private firebaseService: FirebaseService, private router: Router, public itemService: ItemService ) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      console.log(items)
      this.items = items;
    });

  }

  deleteItem(event, item: Item) {
    this.clearState();
    this.itemService.deleteItem(item);
  }

  editItem(event, item: Item) {
    this.editState = true;
    this.itemToEdit = item;
  }

  clearState() {
    this.editState = false;
    this.itemToEdit = null;
  }

  updateItem(item: Item) {
    this.itemService.updateItem(item);
    this.clearState();
  }

  onSelect(item: Item) {
     this.router.navigate([item.id],{
      queryParams: item
    });
  }

  prevent(event){
    event.preventDefault();
  }
}

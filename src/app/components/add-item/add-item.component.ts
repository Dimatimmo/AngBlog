import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../services/item.service';
import { Item } from '../../interfaces/Item';
import { FirebaseService } from "../../services/firebase.service";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  item: Item = {
    id: '',
    title: '',
    description: '',
    time: new Date().getTime()
  }
  modalStatus: boolean = false;
  constructor(private firebaseService: FirebaseService, private itemService: ItemService, public afs: AngularFirestore) {
   }

  ngOnInit() {
  }

  onSubmit() {
    if(this.item.title !="" && this.item.description != ""){
      this.itemService.addItem(this.item);
      this.item.title = "";
      this.item.description ="";
      this.item.time = new Date().getTime();
      this.modalStatus = false;
    }
  }

  showModal() {
    this.modalStatus = true;
  }
  closeModal(){
    this.modalStatus = false;
  }
}

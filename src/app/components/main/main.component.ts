import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { FirebaseService } from "../../services/firebase.service";
import {Router} from "@angular/router";
import { ItemService } from '../../services/item.service';
import { Item } from '../../interfaces/item';
import { AddItemComponent } from '../add-item/add-item.component'
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  downloadResponse;

  constructor(private firebaseService: FirebaseService,
              private router: Router,
              public itemService: ItemService,
              private addItemComponent:AddItemComponent,
              public afs: AngularFirestore,
              private storage: AngularFireStorage ) { }

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

  uploadImage(event, item) {
    const file = event.target.files[0];
    const path = `items/${file.name}`;
    const fileRef = this.storage.ref(path);
    const task = this.storage.upload(path, file);
    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files')
    } else {
      // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges()
    .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(downloadURLResponse => {
              item.image = downloadURLResponse;
            });
          }),
     )
    .subscribe();
    }
  }

  prevent(event){
    event.preventDefault();
  }

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ItemService} from '../../services/item.service';
import { Item } from '../../interfaces/Item';
import { FirebaseService } from "../../services/firebase.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';



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
    image:'',
    time: new Date()
  }
  modalStatus: boolean = false;

  @ViewChild('fileUploader', undefined) fileUploader:ElementRef;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private firebaseService: FirebaseService, private itemService: ItemService, public afs: AngularFirestore, private storage: AngularFireStorage) {
   }

  ngOnInit() {
  }

  uploadImage(event) {
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
               this.item.image = downloadURLResponse;
            });
          }),
     )
    .subscribe();
    // this.fileUploader.nativeElement.value = null;
    }
  }

  onSubmit() {
    if(this.item.title !="" && this.item.description != ""){
      this.itemService.addItem(this.item);
      this.item.title = "";
      this.item.description ="";
      this.item.time = new Date();
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

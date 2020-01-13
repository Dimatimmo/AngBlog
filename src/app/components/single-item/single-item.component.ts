import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router, ParamMap} from "@angular/router";
import { PostService } from '../../services/post.service';
import { MainComponent } from '../main/main.component';
import { FirebaseService } from '../../services/firebase.service'
import { Item } from 'src/app/interfaces/item';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {
  item;
  editState: boolean = false;
  itemToEdit: Item;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  status = this.firebaseService.currentUser.role === 'admin';
  constructor(private route: ActivatedRoute,
              private postService:PostService,
              private router: Router,
              private firebaseService:FirebaseService,
              private mainComponent: MainComponent,
              private storage: AngularFireStorage) {
  }


  ngOnInit() {
    this.route.queryParams.subscribe(item => this.item = item);
    console.log(this.item)
  }

  deleteItem(event, item: Item) {
    this.clearState();
    this.postService.deleteItem(item);
    this.router.navigate(['/']);
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
    this.postService.updateItem(item);
    this.clearState();
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

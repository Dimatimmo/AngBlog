import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router, ParamMap} from "@angular/router";
import { ItemService } from '../../services/item.service';
import { MainComponent } from '../main/main.component';
import { FirebaseService } from '../../services/firebase.service'
import { Item } from 'src/app/interfaces/item';


@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {
  item;
  editState: boolean = false;
  itemToEdit: Item;
  constructor(private route: ActivatedRoute,
              private itemService:ItemService,
              private router: Router,
              private firebaseService:FirebaseService,
              private mainComponent: MainComponent) {
  }


  ngOnInit() {
    this.route.queryParams.subscribe(item => this.item = item);
    console.log(this.item)
  }

  deleteItem(event, item: Item) {
    this.clearState();
    this.itemService.deleteItem(item);
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
    this.itemService.updateItem(item);
    this.clearState();
  }

  prevent(event){
    event.preventDefault();
  }
}

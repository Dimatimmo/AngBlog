import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { ItemService } from '../../services/item.service';
import { MainComponent } from '../main/main.component';
import { Item } from 'src/app/interfaces/item';


@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {
  items: Item[];
  item;
  constructor(private route: ActivatedRoute, private itemService:ItemService, public mainComponent: MainComponent) {

  }

  onChanges() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });


    // this.itemService.getItems().subscribe(items => {
    //   this.items = items;
    //   console.log(this.items);
    // });
    // this.route.paramMap.subscribe(params => {
    //   this.item = this.items[+params.get('id')];
    // });


  }


}

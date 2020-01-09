import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router, ParamMap} from "@angular/router";
import { ItemService } from '../../services/item.service';
import { MainComponent } from '../main/main.component';
import { Item } from 'src/app/interfaces/item';


@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {
  public itemId;
  public item;
  public items;
  constructor(private route: ActivatedRoute, private itemService:ItemService, public mainComponent: MainComponent,  private router: Router) {

  }


  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.itemId = id;
    });

    this.itemService.getItems().subscribe(items => {
       this.items = items;
       console.log(this.item);
    })

    // this.route.paramMap.subscribe(params => {
    //   this.item = this.items[+params.get('id')];
    // });


  }


}

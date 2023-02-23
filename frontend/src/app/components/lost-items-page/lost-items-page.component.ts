import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/shared/models/Item';


@Component({
  selector: 'app-lost-items-page',
  templateUrl: './lost-items-page.component.html',
  styleUrls: ['./lost-items-page.component.css']
})
export class LostItemsPageComponent {

  items: Item[] = [];

  constructor(private itemService:ItemsService, activatedRoute: ActivatedRoute) {
    let ItemsObservable: Observable<Item[]>;

    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm){
        ItemsObservable = this.itemService.getLostItemsBySearchTerm(params.searchTerm);
      }
      else{
        ItemsObservable = itemService.getLostItems();
      }
    ItemsObservable.subscribe((serverItems) => {
      this.items = serverItems;
    })
  })
  }


}

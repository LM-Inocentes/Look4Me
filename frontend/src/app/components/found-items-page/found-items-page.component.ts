import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/shared/models/Item';



@Component({
  selector: 'app-found-items-page',
  templateUrl: './found-items-page.component.html',
  styleUrls: ['./found-items-page.component.css']
})
export class FoundItemsPageComponent{


  items: Item[] = [];

  constructor(private itemService:ItemsService, activatedRoute: ActivatedRoute) {
    let ItemsObservable: Observable<Item[]>;

    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm){
        ItemsObservable = this.itemService.getFoundItemsBySearchTerm(params.searchTerm);
      }
      else{
        ItemsObservable = itemService.getFoundItems();
      }
    ItemsObservable.subscribe((serverItems) => {
      this.items = serverItems;
    })
  })
  }
}

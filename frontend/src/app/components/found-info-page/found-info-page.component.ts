import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { UserService } from 'src/app/services/user.service';
import { Item } from 'src/app/shared/models/Item';
import { User } from 'src/app/shared/models/User';


@Component({
  selector: 'app-found-info-page',
  templateUrl: './found-info-page.component.html',
  styleUrls: ['./found-info-page.component.css']
})
export class FoundInfoPageComponent {
  item = {} as Item;
  user!:User;

  constructor(private activatedRoute:ActivatedRoute, private itemService: ItemsService,
     private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    this.activatedRoute.params.subscribe((params) => {
        this.itemService.getItemByID(params.itemID).subscribe(serverItem => {
        this.item = serverItem;
      });
    })
  }

  postDelete(){
    this.itemService.deleteItemByID(this.item.id)
    .subscribe(_ => this.router.navigateByUrl('/found-items'));
  }

  itemFound(){

  }
}

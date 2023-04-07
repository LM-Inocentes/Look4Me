import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { UserService } from 'src/app/services/user.service';
import { Item } from 'src/app/shared/models/Item';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-lost-info-page',
  templateUrl: './lost-info-page.component.html',
  styleUrls: ['./lost-info-page.component.css']
})
export class LostInfoPageComponent implements OnInit{
  item = {} as Item;
  user!:User;

  constructor(private activatedRoute:ActivatedRoute, private itemService: ItemsService,
     private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      console.log(this.user);
    });
    this.activatedRoute.params.subscribe((params) => {
        this.itemService.getItemByID(params.itemID).subscribe(serverItem => {
        this.item = serverItem;
        console.log(this.item);
      });
    })
  }
  get isPoster(){
    return (this.item.poster_email===this.user.email)||("admin@gmail.com"===this.user.email);
  }
  get isAdmin(){
    return ("admin@gmail.com"===this.user.email);
  }
  get isAuth(){
    return this.user.token;
  }
  isClaimed(){
    this.itemService.claimPost(this.item.id, this.user)
    .subscribe(_ => {
      this.router.navigateByUrl('/lost-items/info/'+this.item.id);
      this.ngOnInit();
    });
  }
  get alreadyClaimed(){
    return this.item.retriever_id;
  }
  get accessAdmin(){
    return ("admin@gmail.com"===this.user.email);
  }
  get accessClaim(){
    return (this.item.retriever_id===this.user.id);
  }
  postDelete(){
    this.itemService.deleteItemByID(this.item.id)
    .subscribe(_ => {
      this.router.navigateByUrl('/lost-items');
      this.ngOnInit();
    });
  }
}

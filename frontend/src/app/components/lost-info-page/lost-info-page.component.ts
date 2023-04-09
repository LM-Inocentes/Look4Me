import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { UserService } from 'src/app/services/user.service';
import { Item } from 'src/app/shared/models/Item';
import { User } from 'src/app/shared/models/User';
import { UserRequest } from 'src/app/shared/models/UserRequest';

@Component({
  selector: 'app-lost-info-page',
  templateUrl: './lost-info-page.component.html',
  styleUrls: ['./lost-info-page.component.css']
})
export class LostInfoPageComponent implements OnInit{
  item = {} as Item;
  user!:User;
  findReq = {} as UserRequest;

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

  get existReq(){
    if(this.findReq){
      return false;
    }
    return true;
  }

  get isPoster(){
    return (this.item.poster_email===this.user.email)||("642d959eb62173ebc88f3447"===this.user.id);
  }
  get isAdmin(){
    return ("642d959eb62173ebc88f3447"===this.user.id);
  }
  get isAuth(){
    return this.user.token;
  }
  isClaimed(){
    const request:UserRequest = {
      id: this.item.id,
      type: this.item.type,
      name: this.item.name,
      img: this.item.img,
      imgName: this.item.imgName,
      characteristic: this.item.characteristic,
      loc: this.item.loc,
      date: this.item.date,
      more_info: this.item.more_info,
      status: true,

      poster_id: this.item.poster_id,
      poster_email: this.item.poster_email,
      poster_name: this.item.poster_name,
      poster_contactinfo: this.item.poster_contactinfo,
      poster_date: "",

      request_id: this.user.id,
      request_email: this.user.email,
      request_name: this.user.Fullname,
      request_contactinfo: this.user.contactinfo,
      request_date: new Date().toLocaleString(),
    }

    this.itemService.claimPost(this.item.id, this.user).subscribe(_ => {
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
  get accessOwner(){
    return (this.item.returned_id===this.user.id);
  }

  postDelete(){
    this.itemService.deleteItemByID(this.item.id)
    .subscribe(_ => {
      this.router.navigateByUrl('/lost-items');
      this.ngOnInit();
    });
  }
}

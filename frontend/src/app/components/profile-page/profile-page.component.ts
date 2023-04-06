import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { UserService } from 'src/app/services/user.service';
import { Item } from 'src/app/shared/models/Item';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  user!: User;
  posts: Item[] = [];
  requests: Item[] = [];

  constructor(private itemService: ItemsService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    this.itemService.getUserPosts(this.user.email).subscribe((userPosts) => {
      this.posts = userPosts;
    });
    this.itemService.getUserRequests(this.user.id).subscribe((userRequests) => {
      this.requests = userRequests;
    });
  }
}

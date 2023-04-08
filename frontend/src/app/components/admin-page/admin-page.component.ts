import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { UserService } from 'src/app/services/user.service';
import { Item } from 'src/app/shared/models/Item';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  users!: User[];
  admin!: User;
  posts: Item[] = [];
  requests: Item[] = [];
  itemUrl!:string;
  userForms!: FormGroup[];
  edit = false;
  isSubmitted = false;

  constructor(private itemService: ItemsService, private router: Router, private userService:
    UserService) { }

    ngOnInit(): void {
      this.userService.userObservable.subscribe((newUser) => {
        this.admin = newUser;
      });
      this.userService.getUsers().subscribe((USERS) => {
        this.users = USERS;
        this.userForms = this.createForms();
      });

   /*   this.itemService.getUserPosts(this.user.id).subscribe((userPosts) => {
        this.posts = userPosts;
      });
      this.itemService.getUserRequests(this.user.id).subscribe((userRequests) => {
        this.requests = userRequests;
      });
*/
   // setTimeout(() => { this.ngOnInit() }, 1000 * 100);
  }
  createForms(): FormGroup[] {
    return this.users.map(user => {
      return new FormGroup({
        Fullname: new FormControl(user.Fullname, Validators.required),
        email: new FormControl(user.email, [Validators.required, Validators.email]),
        contactinfo: new FormControl(user.contactinfo, Validators.required),
        password: new FormControl(user.password, [Validators.required, Validators.minLength(6)])
      });
    });
  }

  onSubmit(form: FormGroup): void {
    console.log(form.value);
  }
  Edit(){
    this.edit = !this.edit;
  }

}

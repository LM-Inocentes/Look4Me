import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { UserService } from 'src/app/services/user.service';
import { IItem } from 'src/app/shared/interfaces/IItem';
import { User } from 'src/app/shared/models/User';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-post-found-page',
  templateUrl: './post-found-page.component.html',
  styleUrls: ['./post-found-page.component.css']
})
export class PostFoundPageComponent implements OnInit {
selectedFile!: ImageSnippet;

  user!:User;
  itemForm!:FormGroup;
  isSubmitted = false;
  returnUrl = 'home';
  img!: File;
  imgName!: string;


  constructor(private userService:UserService, private itemService:ItemsService ,private formBuilder:FormBuilder , private router:Router) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    console.log(this.user);
  }

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      characteristic: ['', Validators.required],
      loc_found: ['', Validators.required],
      date_found: ['', Validators.required],
      more_info: ['', Validators.required],
    });
  }

  get form()
  {
    return this.itemForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.itemForm.invalid && this.imgName) return;

    const fv= this.itemForm.value;

      const item :IItem = {
        poster_email: this.user.email,
        poster_contactinfo: this.user.contactinfo,
        type: true,
        name: fv.name,
        img: "",
        characteristic: fv.characteristic,
        loc_found: fv.loc_found,
        date_found: fv.date_found,
        more_info: fv.more_info,
        status: false,
      };
      console.log(item);

    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, this.img);
      this.itemService.postItem(item, this.selectedFile.file).subscribe(_ => {
        this.router.navigateByUrl(this.returnUrl);
      })
    });
    reader.readAsDataURL(this.img);
  }

  processFile(imageInput: any) {
    this.img = imageInput.files[0];
    this.imgName = this.img.name;
  }

}

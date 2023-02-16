import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
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
  selector: 'app-post-item-page',
  templateUrl: './post-item-page.component.html',
  styleUrls: ['./post-item-page.component.css']
})
export class PostItemPageComponent implements OnInit{

  selectedFile!: ImageSnippet;

  user!:User;
  itemForm!:FormGroup;
  isSubmitted = false;
  returnUrl = 'home';
  img!: File;


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
/*
    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', imageBlob);
    this.itemService.upload(file).subscribe();
*/
    this.isSubmitted = true;
    if(this.itemForm.invalid) return;

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

    this.itemService.postItem(item).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.itemService.upload(this.selectedFile.file).subscribe(
        (res) => {

        },
        (err) => {

        })
    });

    reader.readAsDataURL(file);
  }

}

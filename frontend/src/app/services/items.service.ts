import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IItem } from '../shared/interfaces/IItem';
import { Item } from '../shared/models/Item';
import { POST_ITEM_URL, UPLOAD_ITEM_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor(private http:HttpClient) { }

  upload(image: File): Observable<any> {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post(UPLOAD_ITEM_URL, formData);
  }

  postItem(postItem :IItem): Observable<Item>{
    return this.http.post<Item>(POST_ITEM_URL, postItem);
  }
}

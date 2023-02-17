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

  postItem(item :IItem, image:File): Observable<Item>{
    const formData = new FormData();

    formData.append('image', image);
    formData.append('poster_email', item.poster_email);
    formData.append('name', item.name);
    formData.append('poster_contactinfo', item.poster_contactinfo);
    formData.append('type', item.type.toString());
    formData.append('characteristic', item.characteristic);
    formData.append('img', item.img);
    formData.append('loc_found', item.loc_found);
    formData.append('date_found', item.date_found);
    formData.append('status', item.status.toString());
    formData.append('more_info', item.more_info);

    return this.http.post<Item>(POST_ITEM_URL+'2', formData);
  }
}

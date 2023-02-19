import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { IItem } from '../shared/interfaces/IItem';
import { Item } from '../shared/models/Item';
import { GET_FOUND_ITEM_SEARCH_URL, GET_FOUND_ITEM_URL, GET_LOST_ITEM_SEARCH_URL, GET_LOST_ITEM_URL, POST_ITEM_URL, UPLOAD_ITEM_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor(private http:HttpClient, private toastrService: ToastrService) { }

  postItem(item :IItem, image:File): Observable<Item>{
    const formData = new FormData();

    formData.append('image', image);
    formData.append('poster_email', item.poster_email);
    formData.append('name', item.name);
    formData.append('poster_contactinfo', item.poster_contactinfo);
    formData.append('type', item.type.toString());
    formData.append('characteristic', item.characteristic);
    formData.append('img', item.img);
    formData.append('loc', item.loc);
    formData.append('date', item.date);
    formData.append('status', item.status.toString());
    formData.append('more_info', item.more_info);

    return this.http.post<Item>(POST_ITEM_URL, formData).pipe(
      tap({
        next: (item) => {
          if(item.type){
            this.toastrService.success(
              `Found Item: ${item.name}`,
              'Posted Successfully'
            )
          }
          else{
            this.toastrService.success(
              `Lost Item: ${item.name}`,
              'Posted Successfully'
            )
          }
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Post Failed');
        }

      })
    );;
  }

  getLostItems(): Observable<Item[]>{
    return this.http.get<Item[]>(GET_LOST_ITEM_URL);
  }
  getFoundItems(): Observable<Item[]>{
    return this.http.get<Item[]>(GET_FOUND_ITEM_URL);
  }

  getFoundItemsBySearchTerm(searchTerm: string) {
    return this.http.get<IItem[]>(GET_FOUND_ITEM_SEARCH_URL + searchTerm);
  }

  getLostItemsBySearchTerm(searchTerm: string) {
    return this.http.get<IItem[]>(GET_LOST_ITEM_SEARCH_URL + searchTerm);
  }
}

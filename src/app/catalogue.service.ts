import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host:string="http://localhost:8080"

  constructor(private http:HttpClient) { }

  public getRessource(url){
    return this.http.get(this.host+url);
  }

  uploadPhotProducts(file:File, idProducts):Observable<HttpEvent<{}>> {

      let formdata:FormData=new FormData();
      formdata.append('file', file);
      const req=new HttpRequest('POST', this.host+'/uploadPhoto/'+idProducts, formdata,{
          reportProgress:true, //pour la progression de upload
          responseType:'text' //reponse http du format txt
    });
      return this.http.request(req);
  }
}

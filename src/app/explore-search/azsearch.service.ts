import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'



// const httpParams = new HttpParams({
//   fromObject: {

//     search: '*',
//     scoringProfile: 'base',
//     scoringParameter: null,
//     $count: 'true',
//     $top: '10',
//     $skip: '0',
//     $orderby: null,
//     $filter: null
//   }
// });



interface HttpOptions  {
  headers: HttpHeaders;
  params: HttpParams;
}

@Injectable({
  providedIn: 'root'
})
export class AzsearchService {
  private baseSearchServiceUrl = 'https://' + environment.SearchServiceName + '.search.windows.net/indexes/' + environment.SearchServiceIndexName + '/';
  //private documentSearchUrl = this.baseSearchServiceUrl + 'docs/:id?&api-version=' + environment.ApiVersion;
  private suggestionsSearchUrl = this.baseSearchServiceUrl + 'docs/' + '?&api-version=' + environment.ApiVersion;

  constructor(private http: HttpClient) { }
  public SuggestSearch(searchData:string): Observable<any> {

    let httpParams = new HttpParams({
      fromObject: {
        search: searchData,
        $count: 'true',
        $top: '7',
        $skip: '0',
        suggesterName: 'namesuggester',
      }
    });

    var httpOptions:HttpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'api-key': environment.SearchQueryKey }),
      params: httpParams
    };

    return this.http.get<any>(this.suggestionsSearchUrl, httpOptions)
  }
  public GetSearchdata(searchData:string): Observable<any> {
    let httpParams = new HttpParams({
      fromObject: {
        search: searchData,
        $count: 'true',
        $top: '7',
        $skip: '0',
      }
    });

    var httpOptions:HttpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'api-key': environment.SearchQueryKey }),
      params: httpParams
    };
    return this.http.get<any>(this.suggestionsSearchUrl, httpOptions)
  }
}

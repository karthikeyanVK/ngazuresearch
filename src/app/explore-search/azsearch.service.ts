import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'api-key': environment.SearchQueryKey }),
  params: {
    search: '*',
    //facet: ['CountryRegion,count:5', 'StateProvince,count:5'],
    scoringProfile: 'base',
    scoringParameter: null,
    $count: true,
    $top: 10,
    $skip: 0,
    $orderby: null,
    $filter: null
  }
};



@Injectable({
  providedIn: 'root'
})
export class AzsearchService {
  private baseSearchServiceUrl = 'https://' + environment.SearchServiceName + '.search.windows.net/indexes/' + environment.SearchServiceIndexName + '/';
  //private documentSearchUrl = this.baseSearchServiceUrl + 'docs/:id?&api-version=' + environment.ApiVersion;
  private suggestionsSearchUrl = this.baseSearchServiceUrl + 'docs/suggest' + '?&api-version=' + environment.ApiVersion;

  constructor(private http: HttpClient) { }
  public SuggestSearch(): Observable<any> {
    return this.http.get<any>(this.suggestionsSearchUrl,  httpOptions)
  }
}

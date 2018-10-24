import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AzsearchService } from './azsearch.service';
import { map, debounceTime } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';

export interface RealEstate {
  street: string;
  source: number;
  city: number;
  description: string;
  status: string
}



@Component({
  selector: 'app-explore-search',
  templateUrl: './explore-search.component.html',
  styleUrls: ['./explore-search.component.css']
})
export class ExploreSearchComponent implements OnInit {

  textCtrl = new FormControl();
  options: string[] = [];
  displayedColumns: string[] = ['source', 'street', 'city', 'description', 'status'];
  dataSource = new MatTableDataSource<RealEstate>();
  changesrc: RealEstate[] = []
  searchData: string
  constructor(private azSearchService: AzsearchService) { }

  ngOnInit() {
    console.log("Search works ?");
    this.textCtrl.valueChanges
      .pipe(
        debounceTime(200),
    ).subscribe(data => this.SuggestSearch(data));
  }

  private SuggestSearch(searchData: any) {
    this.azSearchService.SuggestSearch(searchData).pipe(map(data => this.extractDescription(data.value))).subscribe(data => {
      console.log(data);
    });
  }
  private LoadSearchData(searchData:any)
  {
    this.azSearchService.SuggestSearch(searchData).pipe(map(data => this.extractGridData(data.value))).subscribe(data => {
      this.dataSource.data = this.changesrc;
      console.log(data);
    });
  }

  private extractGridData(data: any): any {
    return data.map(v => {
      this.options.push(v.description);
      var data: RealEstate = {
        source: v.source, street: v.street, city: v.city, status: v.status, description: v.description
      };

      this.changesrc.push(data);
      return v;
    });
  }

  private extractDescription(data: any): any {
    return data.map(v => {
      this.options.push(v.street);     
    });
  }
}

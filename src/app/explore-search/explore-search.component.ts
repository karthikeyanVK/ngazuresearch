import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { observable } from 'rxjs'
import { FormControl } from '@angular/forms';
import { AzsearchService } from './azsearch.service';
import { pluck, map } from 'rxjs/operators';
import { from } from 'rxjs';
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

  myControl = new FormControl();
  options: string[] = [];
  displayedColumns: string[] = ['source', 'street', 'city', 'description', 'status'];
  dataSource = new MatTableDataSource<RealEstate>();
  changesrc: RealEstate[] = []

  constructor(private azSearchService: AzsearchService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    console.log("Search works ?");
    this.azSearchService.SuggestSearch().pipe(map(data => this.extractDescription(data.value))).subscribe(data => {
      this.dataSource.data = this.changesrc;
      this.changeDetectorRefs.detectChanges();
      console.log(data)
    });
  }

  private extractDescription(data: any): any {
    return data.map(v => {
      this.options.push(v.description);
      var data: RealEstate = {
        source: v.source, street: v.street, city: v.city, status: v.status, description: v.description
      };

      this.changesrc.push(data);
      return v;
    });
  }
}

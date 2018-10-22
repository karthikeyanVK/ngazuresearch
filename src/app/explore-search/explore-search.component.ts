import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { observable } from 'rxjs'
import { FormControl } from '@angular/forms';
import { AzsearchService } from './azsearch.service';
import { pluck, map } from 'rxjs/operators';
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  street: string;
  source: number;
  city: number;
  description: string;
  status: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { source: 1, street: 'Hydrogen', city: 1.0079, status: 'H', description: '' },
  { source: 2, street: 'Helium', city: 4.0026, status: 'He', description: '' },
  { source: 3, street: 'Lithium', city: 6.941, status: 'Li', description: '' },
  { source: 4, street: 'Beryllium', city: 9.0122, status: 'Be', description: '' },
  { source: 5, street: 'Boron', city: 10.811, status: 'B', description: 'sdfafda' },
  { source: 6, street: 'Carbon', city: 12.0107, status: 'C', description: '' },
  { source: 7, street: 'Nitrogen', city: 14.0067, status: 'N', description: '' },
  { source: 8, street: 'Oxygen', city: 15.9994, status: 'O', description: '' },
  { source: 9, street: 'Fluorine', city: 18.9984, status: 'F', description: '' },
  { source: 10, street: 'Neon', city: 20.1797, status: 'Ne', description: '' },
];

@Component({
  selector: 'app-explore-search',
  templateUrl: './explore-search.component.html',
  styleUrls: ['./explore-search.component.css']
})
export class ExploreSearchComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = [];
  displayedColumns: string[] = ['source', 'street', 'city', 'description', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  changesrc:PeriodicElement[] = []

  constructor(private azSearchService: AzsearchService,private changeDetectorRefs: ChangeDetectorRef) { }

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
      var data:PeriodicElement =  {
        source: v.source, street: v.street, city: v.city, status: v.status, description: v.description
      };
      
      this.changesrc.push(data);
      return v;
    });
  }
}

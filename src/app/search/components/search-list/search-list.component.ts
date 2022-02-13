import { Component, OnInit, Input } from '@angular/core';
import { Repos } from '../../../shared/models/search.interface';


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  @Input() repos: Repos[]|[];

  constructor() { 
    this.repos=[];
  }

  ngOnInit(): void {
  }

}
